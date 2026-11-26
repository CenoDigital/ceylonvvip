import { describe, expect, it } from 'vitest'

import { fillTemplate, whatsappUrl } from './booking-message'

describe('fillTemplate', () => {
  const template = [
    'Hello, I would like to book {service}.',
    'Date: {date} {time}',
    'Pickup: {pickup}',
    'Guests: {adults} adults, {children} children',
  ].join('\n')

  it('fills every placeholder', () => {
    expect(
      fillTemplate(template, {
        service: 'Airport Transfers',
        date: '14 December',
        time: '09:30',
        pickup: 'CMB',
        adults: 2,
        children: 1,
      }),
    ).toBe(
      'Hello, I would like to book Airport Transfers.\nDate: 14 December 09:30\nPickup: CMB\nGuests: 2 adults, 1 children',
    )
  })

  it('leaves out lines whose placeholders are all empty', () => {
    expect(
      fillTemplate(template, {
        service: 'Island Tours',
        date: '2 January',
        adults: 4,
        children: 0,
      }),
    ).toBe(
      'Hello, I would like to book Island Tours.\nDate: 2 January\nGuests: 4 adults, 0 children',
    )
  })

  it('keeps lines without placeholders', () => {
    expect(fillTemplate('Thank you.\n{missing}', {})).toBe('Thank you.')
  })
})

describe('whatsappUrl', () => {
  it('builds a wa.me link with the message encoded', () => {
    expect(whatsappUrl('+94 77 953 2747', 'Hi & hello')).toBe(
      'https://wa.me/94779532747?text=Hi%20%26%20hello',
    )
  })
})
