import { z } from 'zod'

/*
 * Booking request validation, shared by the browser (instant errors) and the server
 * (the only check that counts). Built from the form's own extra questions.
 */

export interface DetailQuestion {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'number' | 'textarea'
  required?: boolean | null
}

export const MAX_GUESTS = 30

const isoDate = /^\d{4}-\d{2}-\d{2}$/
const hhmm = /^([01]\d|2[0-3]):[0-5]\d$/

/** Today's date (YYYY-MM-DD) in Sri Lanka, so "today" is the guest's travel day. */
export function todayInColombo(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Colombo' }).format(now)
}

function detailSchema(q: DetailQuestion) {
  let field: z.ZodType<string, string>
  switch (q.type) {
    case 'email':
      field = z.email({ message: 'Enter a valid email address.' })
      break
    case 'tel':
      field = z
        .string()
        .regex(/^\+?[\d\s()-]{7,20}$/, 'Enter a phone number with the country code.')
      break
    case 'number':
      field = z.string().regex(/^\d{1,6}$/, 'Enter a number.')
      break
    default:
      field = z.string().max(q.type === 'textarea' ? 2000 : 200, 'This is too long.')
  }
  const trimmed = z.string().trim()
  return q.required
    ? trimmed.min(1, `${q.label} is needed.`).pipe(field)
    : trimmed.pipe(z.union([z.literal(''), field])).optional()
}

export function bookingSchema(
  details: DetailQuestion[] = [],
  options: { withTime?: boolean; withConsent?: boolean } = {},
) {
  return z.object({
    form: z.union([z.string(), z.number()]),
    service: z.string().min(1, 'Choose a service.'),
    vehicle: z.string().optional(),
    date: z
      .string()
      .regex(isoDate, 'Choose the date of your journey.')
      .refine((d) => d >= todayInColombo(), 'Choose a date from today onwards.'),
    time: options.withTime
      ? z.union([z.literal(''), z.string().regex(hhmm, 'Choose a time.')]).optional()
      : z.string().optional(),
    adults: z.coerce.number().int().min(1, 'At least one adult.').max(MAX_GUESTS),
    children: z.coerce.number().int().min(0).max(MAX_GUESTS).default(0),
    details: z
      .object(Object.fromEntries(details.map((q) => [q.name, detailSchema(q)])))
      .default({}),
    consent: options.withConsent
      ? z.literal(true, { message: 'Please agree before continuing.' })
      : z.boolean().optional(),
    // Honeypot: hidden from people; bots fill it in.
    website: z.string().max(0).optional(),
    page: z.string().max(300).optional(),
  })
}

export type BookingInput = z.infer<ReturnType<typeof bookingSchema>>
