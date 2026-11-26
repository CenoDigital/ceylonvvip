import { describe, expect, it } from 'vitest'

import {
  breadcrumbSchema,
  businessSchema,
  faqSchema,
  graph,
  richTextToPlain,
  serviceSchema,
} from './schema'

const site = 'https://ceylonvvip.com'

describe('businessSchema', () => {
  it('describes the business as an Organization and TravelAgency with address and hours', () => {
    const b = businessSchema({
      siteUrl: site,
      name: 'CeylonVVIP',
      legalName: 'Gainbuild (Pvt) Ltd',
      phone: '+94 77 953 2747',
      address: {
        street: '133/A, Warapitiya',
        city: 'Dharga Town, Aluthgama',
        country: 'Sri Lanka',
      },
      openingHours: [{ days: ['Mo', 'Su'], allDay: true }],
    })
    expect(b['@type']).toEqual(['Organization', 'TravelAgency'])
    expect(b.address).toMatchObject({ '@type': 'PostalAddress', addressCountry: 'Sri Lanka' })
    expect(b.openingHoursSpecification).toEqual([
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ])
    // Empty values are left out rather than sent as null.
    expect(b).not.toHaveProperty('email')
  })
})

describe('serviceSchema', () => {
  it('lists prices as offers, with "on request" prices left without a price', () => {
    const s = serviceSchema({
      siteUrl: site,
      url: `${site}/services/airport-transfers`,
      name: 'Airport Transfers',
      prices: [
        { label: 'Sedan', displayMode: 'onRequest' },
        { label: 'Van', displayMode: 'from', amount: 80, currency: 'USD' },
        { label: 'SUV', displayMode: 'exact', amount: 120, currency: 'USD' },
      ],
    })
    expect(s.provider).toEqual({ '@id': `${site}/#business` })
    expect(s.offers).toEqual([
      { '@type': 'Offer', name: 'Sedan', availability: 'https://schema.org/InStock' },
      {
        '@type': 'Offer',
        name: 'Van',
        priceSpecification: { '@type': 'PriceSpecification', minPrice: 80, priceCurrency: 'USD' },
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'SUV',
        price: 120,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    ])
  })
})

describe('faqSchema and breadcrumbs', () => {
  it('builds FAQPage only when there are answered questions', () => {
    expect(faqSchema([])).toBeNull()
    expect(faqSchema([{ question: 'Q?', answer: 'A.' }])).toMatchObject({
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Q?', acceptedAnswer: { '@type': 'Answer', text: 'A.' } },
      ],
    })
  })

  it('numbers breadcrumb items from 1', () => {
    expect(
      breadcrumbSchema([
        { name: 'Home', url: site },
        { name: 'Fleet', url: `${site}/fleet` },
      ]).itemListElement,
    ).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: site },
      { '@type': 'ListItem', position: 2, name: 'Fleet', item: `${site}/fleet` },
    ])
  })

  it('wraps everything in one @graph and drops empty parts', () => {
    expect(graph({ '@type': 'WebSite' }, null)).toEqual({
      '@context': 'https://schema.org',
      '@graph': [{ '@type': 'WebSite' }],
    })
  })

  it('reads plain text from rich text answers', () => {
    const value = {
      root: { children: [{ type: 'paragraph', children: [{ text: 'Yes, at any hour.' }] }] },
    }
    expect(richTextToPlain(value)).toBe('Yes, at any hour.')
  })
})
