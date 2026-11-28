'use client'

import Image from 'next/image'
import { useId, useMemo, useState, useTransition, type FormEvent } from 'react'

import { bookingSchema, todayInColombo, type DetailQuestion } from '@ceylonvvip/validation'
import {
  Alert,
  Button,
  Chip,
  DateField,
  Field,
  Stepper,
  TextAreaField,
  TimeField,
  Toast,
  VehicleOption,
  cn,
  linkUnderlineClass,
} from '@ceylonvvip/ui-brand'

import { submitBooking } from '@/app/(frontend)/actions/booking'
import { fill } from '@/lib/fill'

export interface BookingFormProps {
  form: {
    id: number
    serviceLabel: string
    vehicleLabel: string | null
    noPreferenceLabel: string | null
    noPreferenceDetail: string | null
    dateLabel: string
    timeLabel: string | null
    adultsLabel: string
    adultsHint: string | null
    childrenLabel: string | null
    childrenHint: string | null
    submitLabel: string
    detailsToggleLabel: string | null
    note: string | null
    consentLabel: string | null
    details: Array<
      DetailQuestion & {
        placeholder: string | null
        width: string
        services: string[]
        /** Shown in the main form instead of behind "Add details". */
        upfront?: boolean
      }
    >
  }
  services: Array<{ id: string; label: string }>
  vehicles: Array<{
    id: string
    name: string
    seats: number
    luggage: number | null
    image: { src: string; alt: string } | null
  }>
  preselectService: string | null
  successMessage: string | null
  /** Interface text in the page language (lib/ui-strings), English text → translation. */
  ui?: Record<string, string>
  /** BCP 47 language of the page, like "de", for dates. */
  lang?: string
  dir?: 'ltr' | 'rtl'
}

/**
 * Figma Prestige/Booking/Form ("Booking v2"): service chips, vehicle cards, date and
 * time, guests, then Continue on WhatsApp. Errors show under each field (Prestige/Field
 * Error) with an Alert on top, as in Figma.
 */
export function BookingForm({
  form,
  services,
  vehicles,
  preselectService,
  successMessage,
  ui = {},
  lang,
  dir,
}: BookingFormProps) {
  const tr = (text: string) => ui[text] ?? text
  const trErrors = (e: Record<string, string>) =>
    Object.fromEntries(Object.entries(e).map(([k, v]) => [k, tr(v)]))
  const id = useId()
  // One or more services (task 174).
  const [selected, setSelected] = useState<string[]>(preselectService ? [preselectService] : [])
  const [vehicle, setVehicle] = useState('none')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [details, setDetails] = useState<Record<string, string>>({})
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [pending, startTransition] = useTransition()

  const questions = useMemo(
    () =>
      form.details.filter(
        (q) => !q.services.length || q.services.some((s) => selected.includes(s)),
      ),
    [form.details, selected],
  )
  const upfront = questions.filter((q) => q.upfront)
  const later = questions.filter((q) => !q.upfront)
  const toggleService = (sid: string) =>
    setSelected((list) => (list.includes(sid) ? list.filter((x) => x !== sid) : [...list, sid]))
  const schema = useMemo(
    () =>
      bookingSchema(questions, {
        withTime: Boolean(form.timeLabel),
        withConsent: Boolean(form.consentLabel),
      }),
    [questions, form.timeLabel, form.consentLabel],
  )

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const website = new FormData(e.currentTarget).get('website')
    const input = {
      form: form.id,
      services: selected,
      vehicle,
      date,
      time,
      adults,
      children,
      details,
      consent: form.consentLabel ? consent : undefined,
      website: typeof website === 'string' ? website : '',
      page: window.location.pathname,
    }
    const parsed = schema.safeParse(input)
    if (!parsed.success) {
      const next: Record<string, string> = {}
      for (const issue of parsed.error.issues) next[issue.path.join('.')] ??= issue.message
      setErrors(trErrors(next))
      if (Object.keys(next).some((k) => k.startsWith('details.'))) setShowDetails(true)
      setFormError(null)
      return
    }
    setErrors({})
    startTransition(async () => {
      const result = await submitBooking(input)
      if (!result.ok) {
        setErrors(trErrors(result.errors))
        setFormError(result.formError ?? null)
        return
      }
      setSent(true)
      if (result.whatsapp) window.location.assign(result.whatsapp)
    })
  }

  function renderQuestion(q: (typeof questions)[number]) {
    const common = {
      label: q.label,
      placeholder: q.placeholder ?? undefined,
      required: q.required ?? false,
      error: errors[`details.${q.name}`],
      value: details[q.name] ?? '',
      className: q.width === 'half' ? undefined : 'lg:col-span-2',
    }
    return q.type === 'textarea' ? (
      <TextAreaField
        key={q.name}
        {...common}
        onChange={(e) => setDetails((d) => ({ ...d, [q.name]: e.target.value }))}
      />
    ) : (
      <Field
        key={q.name}
        {...common}
        type={q.type === 'number' ? 'text' : q.type}
        inputMode={q.type === 'number' ? 'numeric' : undefined}
        autoComplete={
          q.type === 'email'
            ? 'email'
            : q.type === 'tel'
              ? 'tel'
              : q.name === 'name'
                ? 'name'
                : undefined
        }
        onChange={(e) => setDetails((d) => ({ ...d, [q.name]: e.target.value }))}
      />
    )
  }

  const errorCount = Object.keys(errors).length
  const today = todayInColombo()
  const label = 'text-label-caps text-muted-foreground'

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-32"
      aria-describedby={formError || errorCount ? `${id}-alert` : undefined}
    >
      {form.detailsToggleLabel && later.length ? (
        <div className="flex gap-6" aria-hidden>
          <span className="h-2 flex-1 bg-foreground" />
          <span
            className={cn(
              'h-2 flex-1 transition-colors duration-300',
              showDetails ? 'bg-foreground' : 'bg-border',
            )}
          />
        </div>
      ) : null}

      {formError || errorCount ? (
        <div id={`${id}-alert`}>
          <Alert
            title={
              formError ??
              (errorCount === 1
                ? tr('One answer needs attention')
                : fill(tr('{count} answers need attention'), { count: errorCount }))
            }
            text={formError ? undefined : tr('They are marked in red below.')}
          />
        </div>
      ) : null}

      <fieldset className="flex min-w-0 flex-col gap-12">
        <legend className={cn(label, 'mb-12', errors.services && 'text-destructive')}>
          {form.serviceLabel}
        </legend>
        <div className="flex flex-wrap gap-8">
          {services.map((s) => (
            <Chip
              key={s.id}
              type="checkbox"
              name={`${id}-service`}
              value={s.id}
              label={s.label}
              checked={selected.includes(s.id)}
              onChange={() => toggleService(s.id)}
            />
          ))}
        </div>
        {errors.services ? <p className="text-small text-destructive">{errors.services}</p> : null}
      </fieldset>

      {form.vehicleLabel && vehicles.length ? (
        <fieldset className="flex min-w-0 flex-col gap-12">
          <legend className={cn(label, 'mb-12')}>{form.vehicleLabel}</legend>
          <div className="-mx-24 flex snap-x gap-16 overflow-x-auto px-24 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
            {vehicles.map((v) => (
              <VehicleOption
                key={v.id}
                className="w-229 shrink-0 snap-start sm:w-auto"
                name={`${id}-vehicle`}
                value={v.id}
                vehicle={v.name}
                detail={
                  v.luggage != null
                    ? fill(tr('Up to {guests} guests, {bags} bags'), {
                        guests: v.seats,
                        bags: v.luggage,
                      })
                    : fill(tr('Up to {guests} guests'), { guests: v.seats })
                }
                image={
                  v.image ? (
                    <Image
                      src={v.image.src}
                      alt={v.image.alt}
                      fill
                      sizes="(min-width: 1024px) 240px, 229px"
                      className="object-cover"
                    />
                  ) : undefined
                }
                checked={vehicle === v.id}
                onChange={() => setVehicle(v.id)}
              />
            ))}
            {form.noPreferenceLabel ? (
              <VehicleOption
                className="w-229 shrink-0 snap-start sm:w-auto"
                name={`${id}-vehicle`}
                value="none"
                vehicle={form.noPreferenceLabel}
                detail={form.noPreferenceDetail ?? undefined}
                checked={vehicle === 'none'}
                onChange={() => setVehicle('none')}
              />
            ) : null}
          </div>
        </fieldset>
      ) : null}

      <div className="grid gap-32 sm:grid-cols-2">
        <DateField
          label={form.dateLabel}
          min={today}
          value={date}
          onChange={setDate}
          error={errors.date}
          required
          placeholder={tr('Select a date')}
          lang={lang}
          dir={dir}
        />
        {form.timeLabel ? (
          <TimeField
            label={form.timeLabel}
            value={time}
            onChange={setTime}
            error={errors.time}
            placeholder={tr('Select a time')}
            labels={{
              hour: tr('Hour'),
              minute: tr('Minute'),
              clear: tr('Clear'),
              done: tr('Done'),
            }}
          />
        ) : null}
      </div>

      <div className="grid gap-0 lg:grid-cols-2 lg:gap-32">
        <Stepper
          label={form.adultsLabel}
          hint={form.adultsHint ?? undefined}
          name="adults"
          value={adults}
          min={1}
          max={30}
          onChange={setAdults}
        />
        {form.childrenLabel ? (
          <Stepper
            label={form.childrenLabel}
            hint={form.childrenHint ?? undefined}
            name="children"
            value={children}
            min={0}
            max={30}
            onChange={setChildren}
          />
        ) : null}
      </div>

      {upfront.length ? (
        <div className="grid min-w-0 gap-32 lg:grid-cols-2">{upfront.map(renderQuestion)}</div>
      ) : null}

      {showDetails && later.length ? (
        <fieldset className="grid min-w-0 gap-32 lg:grid-cols-2">
          <legend className="sr-only">{form.detailsToggleLabel ?? 'Details'}</legend>
          {later.map(renderQuestion)}
        </fieldset>
      ) : null}

      {form.consentLabel ? (
        <label className="flex min-h-44 items-start gap-12 text-small text-foreground">
          <input
            type="checkbox"
            className="mt-4 size-18 accent-[var(--primary)]"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
          />
          <span>
            {form.consentLabel}
            {errors.consent ? (
              <span className="mt-4 block text-destructive">{errors.consent}</span>
            ) : null}
          </span>
        </label>
      ) : null}

      {/* Honeypot: invisible to people and screen readers; bots fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col items-stretch gap-20 lg:flex-row lg:items-center lg:gap-32">
        <Button type="submit" disabled={pending} aria-busy={pending}>
          {form.submitLabel}
        </Button>
        {form.detailsToggleLabel && later.length && !showDetails ? (
          <button
            type="button"
            className={cn(
              linkUnderlineClass,
              'self-center border-foreground border-b lg:self-auto',
            )}
            onClick={() => setShowDetails(true)}
          >
            {form.detailsToggleLabel}
          </button>
        ) : null}
      </div>
      {form.note ? <p className="text-small text-muted-foreground">{form.note}</p> : null}
      {sent && successMessage ? (
        <div className="fixed inset-x-0 bottom-120 z-50 flex justify-center px-24 lg:bottom-48">
          <Toast message={successMessage} />
        </div>
      ) : null}
    </form>
  )
}
