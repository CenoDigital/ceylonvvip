/*
 * schema.org JSON-LD for search engines, built from CMS data only. Pure functions, so
 * they are unit tested; the <JsonLd> component renders the result.
 * Types: Organization + TravelAgency (LocalBusiness), WebSite, BreadcrumbList on every
 * page, Service + Offer on service pages, FAQPage wherever FAQs are shown.
 */

type Thing = Record<string, unknown>

export interface BusinessInput {
  siteUrl: string
  name: string
  legalName?: string | null
  businessType?: string | null
  priceRange?: string | null
  description?: string | null
  logo?: string | null
  image?: string | null
  phone?: string | null
  email?: string | null
  address?: {
    street?: string | null
    city?: string | null
    region?: string | null
    postcode?: string | null
    country?: string | null
  } | null
  geo?: { latitude?: number | null; longitude?: number | null } | null
  openingHours?: Array<{
    days?: string[] | null
    opens?: string | null
    closes?: string | null
    allDay?: boolean | null
  }> | null
  sameAs?: string[]
}

const clean = <T extends Thing>(obj: T): T =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && !v.length),
    ),
  ) as T

const DAY: Record<string, string> = {
  Mo: 'Monday',
  Tu: 'Tuesday',
  We: 'Wednesday',
  Th: 'Thursday',
  Fr: 'Friday',
  Sa: 'Saturday',
  Su: 'Sunday',
}

export const businessId = (siteUrl: string) => `${siteUrl}/#business`

/** The business: Organization and TravelAgency (a LocalBusiness), with address and hours. */
export function businessSchema(b: BusinessInput): Thing {
  const type = b.businessType || 'TravelAgency'
  return clean({
    '@type': type === 'Organization' ? 'Organization' : ['Organization', type],
    '@id': businessId(b.siteUrl),
    name: b.name,
    legalName: b.legalName,
    url: b.siteUrl,
    description: b.description,
    logo: b.logo,
    image: b.image ?? b.logo,
    telephone: b.phone,
    email: b.email,
    priceRange: b.priceRange,
    address: b.address
      ? clean({
          '@type': 'PostalAddress',
          streetAddress: b.address.street,
          addressLocality: b.address.city,
          addressRegion: b.address.region,
          postalCode: b.address.postcode,
          addressCountry: b.address.country,
        })
      : undefined,
    geo:
      b.geo?.latitude != null && b.geo?.longitude != null
        ? { '@type': 'GeoCoordinates', latitude: b.geo.latitude, longitude: b.geo.longitude }
        : undefined,
    openingHoursSpecification: (b.openingHours ?? [])
      .filter((h) => h.days?.length)
      .map((h) =>
        clean({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: (h.days ?? []).map((d) => DAY[d] ?? d),
          opens: h.allDay ? '00:00' : h.opens,
          closes: h.allDay ? '23:59' : h.closes,
        }),
      ),
    sameAs: b.sameAs,
  })
}

export function websiteSchema(siteUrl: string, name: string): Thing {
  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name,
    publisher: { '@id': businessId(siteUrl) },
  }
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>): Thing {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export interface PriceInput {
  displayMode?: string | null
  amount?: number | null
  currency?: string | null
  label?: string | null
}

/** Service with Offers. "On request" prices are listed without a price, as schema.org allows. */
export function serviceSchema(s: {
  siteUrl: string
  url: string
  name: string
  description?: string | null
  image?: string | null
  prices?: PriceInput[]
}): Thing {
  const offers = (s.prices ?? []).map((p) =>
    clean({
      '@type': 'Offer',
      name: p.label,
      ...(p.displayMode !== 'onRequest' && p.amount != null
        ? p.displayMode === 'from'
          ? {
              priceSpecification: {
                '@type': 'PriceSpecification',
                minPrice: p.amount,
                priceCurrency: p.currency,
              },
            }
          : { price: p.amount, priceCurrency: p.currency }
        : {}),
      availability: 'https://schema.org/InStock',
    }),
  )
  return clean({
    '@type': 'Service',
    '@id': `${s.url}#service`,
    name: s.name,
    url: s.url,
    description: s.description,
    image: s.image,
    provider: { '@id': businessId(s.siteUrl) },
    areaServed: { '@type': 'Country', name: 'Sri Lanka' },
    offers,
  })
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>): Thing | null {
  const items = faqs.filter((f) => f.question && f.answer)
  if (!items.length) return null
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

/** One @graph document for the page. */
export function graph(...things: Array<Thing | null | undefined>): Thing {
  return { '@context': 'https://schema.org', '@graph': things.filter(Boolean) }
}

/** Plain text of a Lexical rich text value, for FAQ answers. */
export function richTextToPlain(value: unknown): string {
  const out: string[] = []
  const walk = (node: unknown) => {
    if (!node || typeof node !== 'object') return
    const n = node as { text?: string; children?: unknown[]; type?: string }
    if (typeof n.text === 'string') out.push(n.text)
    n.children?.forEach(walk)
    if (n.type === 'paragraph') out.push('\n')
  }
  walk((value as { root?: unknown })?.root ?? value)
  return out.join('').replace(/\n+/g, ' ').trim()
}
