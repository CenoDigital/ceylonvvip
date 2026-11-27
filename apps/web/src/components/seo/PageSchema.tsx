import type { Faq, Media, Page, Pricing, Service } from '@ceylonvvip/db'

import { getCollection, getGlobal } from '@/lib/data'
import {
  breadcrumbSchema,
  businessSchema,
  faqSchema,
  graph,
  richTextToPlain,
  serviceSchema,
  websiteSchema,
} from '@/lib/schema'
import { absolute } from '@/lib/seo'
import { getSiteUrl } from '@/lib/site-url'

type Block = { blockType: string } & Record<string, unknown>

const media = (v: unknown) => (v && typeof v === 'object' && 'url' in v ? (v as Media) : null)

/** Every FAQ shown on the page: FAQ blocks (chosen or by topic) and FAQs under rich text. */
async function faqsOn(blocks: Block[]): Promise<Faq[]> {
  const found: Faq[] = []
  for (const b of blocks) {
    if (b.blockType === 'faq') {
      if (b.source === 'chosen')
        found.push(...((b.items as Faq[]) ?? []).filter((f) => typeof f === 'object'))
      else found.push(...((await getCollection('faqs', (b.topic as string) || undefined)) as Faq[]))
    }
    if (b.blockType === 'richText')
      found.push(...((b.faqs as Faq[]) ?? []).filter((f) => typeof f === 'object'))
  }
  const seen = new Set<number>()
  return found.filter((f) => !seen.has(f.id) && seen.add(f.id))
}

/** JSON-LD for a page or service, as one @graph script in the page. */
export async function PageSchema({
  doc,
  kind,
  path,
}: {
  doc: Page | Service
  kind: 'page' | 'service'
  path: string
}) {
  const [contact, settings, defaults] = await Promise.all([
    getGlobal('contact-business'),
    getGlobal('site-settings'),
    getGlobal('seo-defaults'),
  ])
  const name = settings.siteName || 'CeylonVVIP'
  const siteUrl = getSiteUrl()
  const url = absolute(path)
  const logo = media(settings.logos?.light)?.url

  const business = businessSchema({
    siteUrl,
    name,
    legalName: defaults.organisation?.legalName || contact.registeredName,
    businessType: defaults.organisation?.businessType,
    priceRange: defaults.organisation?.priceRange,
    description: defaults.defaultDescription,
    logo: logo ? absolute(logo) : null,
    phone: contact.phones?.[0]?.number ?? contact.whatsapp,
    email: contact.emails?.[0]?.email,
    address: contact.address,
    geo: contact.mapPin,
    openingHours: contact.openingHours,
    sameAs: (contact.social ?? []).map((s) => s.url),
  })

  const crumbs = [{ name, url: absolute('/') }]
  if (path !== '/') {
    if (kind === 'service') crumbs.push({ name: doc.title, url })
    else crumbs.push({ name: doc.title, url })
  }

  const blocks = ((doc as Page).layout ?? []) as unknown as Block[]
  const faqs = await faqsOn(blocks)

  const service =
    kind === 'service'
      ? serviceSchema({
          siteUrl,
          url,
          name: doc.title,
          description: (doc as Service).seo?.description || (doc as Service).summary,
          image: media((doc as Service).image)?.url
            ? absolute(media((doc as Service).image)!.url!)
            : null,
          prices: (((doc as Service).pricing ?? []) as Pricing[]).filter(
            (p) => typeof p === 'object',
          ),
        })
      : null

  const data = graph(
    business,
    websiteSchema(siteUrl, name),
    breadcrumbSchema(crumbs),
    service,
    faqSchema(faqs.map((f) => ({ question: f.question, answer: richTextToPlain(f.answer) }))),
  )

  return (
    <script
      type="application/ld+json"
      // JSON.stringify escapes quotes; "<" is escaped so the content can never close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
