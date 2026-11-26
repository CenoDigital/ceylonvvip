'use server'

import config from '@payload-config'
import { headers } from 'next/headers'
import { getPayload } from 'payload'

import { fillTemplate, whatsappUrl } from '@ceylonvvip/core'
import { bookingSchema, type DetailQuestion } from '@ceylonvvip/validation'

/*
 * Booking request: validate again on the server (the browser check is only for speed),
 * refuse bots (honeypot, rate limit), store the request, email an alert when mail is set
 * up, then return the WhatsApp link with the message from Booking Settings.
 */

export type BookingResult =
  | { ok: true; whatsapp: string; message: string }
  | { ok: false; errors: Record<string, string>; formError?: string }

// Five requests per address in ten minutes. Kept in memory: one app container serves
// the site, and a restart only resets the window.
const WINDOW_MS = 10 * 60 * 1000
const LIMIT = 5
const hits = new Map<string, number[]>()

function rateLimited(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000)
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k)
  return recent.length > LIMIT
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`))

export async function submitBooking(raw: unknown): Promise<BookingResult> {
  const h = await headers()
  const ip = h.get('cf-connecting-ip') ?? h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local'
  if (rateLimited(ip)) {
    return {
      ok: false,
      errors: {},
      formError: 'Too many requests. Please wait a few minutes, or message us on WhatsApp.',
    }
  }

  const payload = await getPayload({ config })
  const formId = (raw as { form?: unknown })?.form
  const form = formId
    ? await payload
        .findByID({ collection: 'forms', id: formId as number, depth: 0 })
        .catch(() => null)
    : null
  if (!form)
    return {
      ok: false,
      errors: {},
      formError: 'This form is no longer available. Please reload the page.',
    }

  const details = (form.details ?? []) as unknown as DetailQuestion[]
  const parsed = bookingSchema(details, {
    withTime: Boolean(form.timeLabel),
    withConsent: Boolean(form.consentLabel),
  }).safeParse(raw)
  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path.join('.')
      if (!errors[key]) errors[key] = issue.message
    }
    // A filled honeypot is a bot: answer as if it worked, store nothing.
    if (errors.website) return { ok: true, whatsapp: '', message: '' }
    return { ok: false, errors }
  }
  const data = parsed.data

  const [service, vehicle, contact, settings] = await Promise.all([
    payload.findByID({ collection: 'services', id: data.service, depth: 0 }).catch(() => null),
    data.vehicle && data.vehicle !== 'none'
      ? payload.findByID({ collection: 'vehicles', id: data.vehicle, depth: 0 }).catch(() => null)
      : null,
    payload.findGlobal({ slug: 'contact-business' }),
    payload.findGlobal({ slug: 'booking-settings' }),
  ])
  if (!service || service._status !== 'published')
    return { ok: false, errors: { service: 'Choose a service.' } }

  // Only questions that apply to the chosen service are kept.
  const applicable = (form.details ?? []).filter(
    (q) =>
      !q.services?.length ||
      q.services.some((s) => String(typeof s === 'object' ? s.id : s) === String(service.id)),
  )
  const answers = Object.fromEntries(
    applicable
      .map((q) => [q.name, (data.details as Record<string, string | undefined>)[q.name] ?? ''])
      .filter(([, v]) => v),
  ) as Record<string, string>

  const values = {
    service: service.title,
    vehicle: vehicle?.name ?? '',
    date: formatDate(data.date),
    time: data.time ?? '',
    adults: data.adults,
    children: data.children,
    page: data.page ?? '',
    ...answers,
  }
  const fallback = [
    `Booking request: {service}`,
    'Vehicle: {vehicle}',
    'Date: {date} {time}',
    'Guests: {adults} adults, {children} children',
    ...applicable.map((q) => `${q.label}: {${q.name}}`),
  ].join('\n')
  const message = fillTemplate(settings.whatsappTemplate || fallback, values)
  const summary = `${service.title}, ${values.date}, ${data.adults + data.children} guests`

  await payload.create({
    collection: 'form-submissions',
    overrideAccess: true,
    data: {
      summary,
      status: 'new',
      form: form.id,
      service: service.id,
      vehicle: vehicle?.id,
      date: data.date,
      time: data.time ?? '',
      adults: data.adults,
      children: data.children,
      details: answers,
      message,
      page: data.page,
    },
  })

  const recipients = (form.notify ?? []).map((n) => n.email).filter(Boolean)
  if (recipients.length && process.env.SMTP_HOST) {
    // The request is already stored, so a mail problem never loses it.
    await payload
      .sendEmail({ to: recipients, subject: `New booking request: ${summary}`, text: message })
      .catch((error: unknown) => payload.logger.error({ err: error }, 'Booking alert email failed'))
  }

  if (!contact.whatsapp)
    return {
      ok: false,
      errors: {},
      formError: 'WhatsApp is not set up yet. Please call us instead.',
    }
  return { ok: true, whatsapp: whatsappUrl(contact.whatsapp, message), message }
}
