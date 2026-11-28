import { describe, expect, it } from 'vitest'

import { bookingSchema, todayInColombo } from './booking'

const tomorrow = () => {
  const d = new Date(`${todayInColombo()}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + 1)
  return d.toISOString().slice(0, 10)
}

const valid = {
  form: 1,
  services: ['3'],
  vehicle: 'none',
  date: tomorrow(),
  time: '09:30',
  adults: 2,
  children: 0,
  details: {},
}

describe('bookingSchema', () => {
  it('accepts a complete request', () => {
    expect(bookingSchema([], { withTime: true }).safeParse(valid).success).toBe(true)
  })

  it('needs a service, a date from today and at least one adult', () => {
    const result = bookingSchema().safeParse({
      ...valid,
      services: [],
      date: '2020-01-01',
      adults: 0,
    })
    expect(result.success).toBe(false)
    const paths = result.error?.issues.map((i) => i.path.join('.'))
    expect(paths).toEqual(expect.arrayContaining(['services', 'date', 'adults']))
  })

  it('checks extra questions by type, and only requires the required ones', () => {
    const schema = bookingSchema([
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'flightNumber', label: 'Flight number', type: 'text' },
    ])
    expect(schema.safeParse({ ...valid, details: { email: 'not-an-email' } }).success).toBe(false)
    expect(schema.safeParse({ ...valid, details: { email: 'guest@example.com' } }).success).toBe(
      true,
    )
  })

  it('accepts several services together', () => {
    expect(bookingSchema().safeParse({ ...valid, services: ['1', '3'] }).success).toBe(true)
  })

  it('rejects a filled honeypot', () => {
    expect(bookingSchema().safeParse({ ...valid, website: 'https://spam.example' }).success).toBe(
      false,
    )
  })

  it('requires consent only when the form asks for it', () => {
    expect(bookingSchema([], { withConsent: true }).safeParse(valid).success).toBe(false)
    expect(
      bookingSchema([], { withConsent: true }).safeParse({ ...valid, consent: true }).success,
    ).toBe(true)
  })
})
