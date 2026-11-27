/**
 * Seeds the CMS with the content shown in Figma (01 Home and the site chrome), so the
 * site can be compared with the design and the e2e tests have real pages.
 *
 *   pnpm --filter web seed        (src/seed/run.ts)
 *   SEED_ON_EMPTY=true            (staging: once, when the database has no pages)
 *
 * Idempotent: documents are matched by slug and updated. All copy is taken word for
 * word from the Figma file; nothing here is invented. Never run it against production.
 */
import type { Payload } from 'payload'

import { SERVICE_HERO_PHOTOS, seedMedia } from './media'
import { seedPages } from './pages'

const p = (text: string) => ({
  type: 'paragraph',
  version: 1,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  children: [{ type: 'text', version: 1, text, format: 0, detail: 0, mode: 'normal', style: '' }],
})
const rich = (...paras: string[]) => ({
  root: {
    type: 'root',
    version: 1,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    children: paras.map(p),
  },
})

const WHATSAPP = '+94 77 953 2747'
const whatsappLink = { type: 'whatsapp' as const, phone: WHATSAPP }

// 01 Home / Services: title and note for each of the seven services.
const SERVICES: Array<[string, string]> = [
  ['Airport Transfers', 'Already waiting when you land'],
  ['Island Tours', 'The island, at your pace'],
  ['Wedding and Honeymoon', 'The day, and the days after'],
  ['Activities', 'Rivers, coast and hills'],
  ['Security and Bodyguards', 'Discreet, and always near'],
  ['Elder Care', 'Care that travels with you'],
  ['Hotels and Ayurveda', '5-star and Ayurvedic stays'],
]

async function upsert(
  payload: Payload,
  collection: 'pages' | 'services' | 'vehicles',
  slug: string,
  data: Record<string, unknown>,
) {
  const { docs } = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    draft: true,
  })
  const body = { ...data, slug, _status: 'published' } as never
  return docs[0]
    ? payload.update({
        collection,
        id: docs[0].id,
        data: body,
        context: { disableRevalidate: true },
      })
    : payload.create({ collection, data: body, context: { disableRevalidate: true } })
}

export async function seedFigma(payload: Payload) {
  if (process.env.SITE_ENV === 'production' && !process.env.CI) {
    throw new Error('The Figma seed never runs on the live site.')
  }

  const photos = await seedMedia(payload)

  const services = []
  for (const [i, [title, summary]] of SERVICES.entries()) {
    const slug = title.toLowerCase().replace(/ and /g, '-').replace(/\s+/g, '-')
    services.push(
      await upsert(payload, 'services', slug, {
        title,
        summary,
        order: i + 1,
        // The photo under each service page's hero in Figma; Hotels and Ayurveda has no
        // page in Figma, so it uses the hotel photo from Home's signature benefits.
        image: photos[SERVICE_HERO_PHOTOS[slug] ?? 'hotelSuite'].id,
      }),
    )
  }
  const servicesBySlug = Object.fromEntries(services.map((s) => [s.slug, s]))

  // 01 Home / Fleet: the one vehicle Figma gives details for.
  await upsert(payload, 'vehicles', 'bmw-520d', {
    name: 'BMW 520d',
    order: 1,
    seats: 3,
    luggage: 4,
    summary: '2 guests, plus 1 in front. 4 bags. White with beige interior.',
    gallery: [photos.bmw.id],
  })

  const fleet = await upsert(payload, 'pages', 'fleet', { title: 'Fleet' })
  const contact = await upsert(payload, 'pages', 'contact', { title: 'Contact' })
  const about = await upsert(payload, 'pages', 'about', { title: 'About' })
  // The services index (task 160); its sections are filled in by seedPages.
  const servicesPage = await upsert(payload, 'pages', 'services', { title: 'Services' })

  const internal = (relationTo: 'pages' | 'services', value: { id: number }) => ({
    type: 'internal' as const,
    reference: { relationTo, value: value.id },
  })

  await upsert(payload, 'pages', 'home', {
    title: 'Home',
    layout: [
      {
        blockType: 'hero',
        variant: 'home',
        eyebrow: 'Aluthgama, Sri Lanka',
        heading: 'Travel like royalty.\nFeel like family.',
        intro:
          'Private, safe and made just for you. Chauffeured journeys across Sri Lanka for diplomats, business leaders and VVIP families.',
        // Figma 01 Home / Hero image (1440 by 820) with its caption.
        mediaType: 'image',
        image: photos.coastRoad.id,
        caption: 'The coast road, Bentota',
        ctas: [
          { cta: { label: 'Speak to your concierge', appearance: 'button', link: whatsappLink } },
          {
            cta: {
              label: 'View services',
              appearance: 'link',
              link: { type: 'url', url: '#services' },
            },
          },
        ],
      },
      {
        blockType: 'richText',
        variant: 'statement',
        header: { eyebrow: 'Exclusive, Prestigious, Private' },
        content: rich(
          'One travel manager, one private vehicle, and the whole of Sri Lanka, arranged quietly around you.',
        ),
        settings: { pt: 'xl', pb: 'xl' },
      },
      {
        blockType: 'featureList',
        variant: 'signature',
        settings: { pt: 'none', pb: 'xl' },
        items: [
          {
            label: 'Signature experience',
            title: 'A real Sri Lankan gem, in your hands.',
            text: 'Ceylon gems have been prized for centuries. As our guest, you are invited to see and hold genuine natural stones, cut and polished or rough, from the island’s many varieties.',
            image: photos.sapphires.id,
            cta: { label: 'Ask about the gem experience', appearance: 'link', link: whatsappLink },
          },
          {
            label: 'Hotels and Ayurveda',
            title: 'Your hotels, arranged for you.',
            text: 'Share your dates and the kind of stay you prefer. Your travel manager books 5-star hotels and Ayurvedic treatment hotels anywhere on the island, and times every transfer around your stay.',
            image: photos.hotelSuite.id,
            cta: {
              label: 'Request a hotel or Ayurvedic stay',
              appearance: 'link',
              link: whatsappLink,
            },
          },
          {
            label: 'Your travel manager',
            title: 'One person, from first message to final mile.',
            text: 'Your travel manager arranges your vehicles, drivers, hotels and timings, and is with you on WhatsApp, any time of day.',
            image: photos.travelManager.id,
            cta: { label: 'Speak to your travel manager', appearance: 'link', link: whatsappLink },
          },
        ],
      },
      {
        blockType: 'servicesGrid',
        variant: 'index',
        source: 'all',
        header: {
          eyebrow: 'Services',
          heading: 'Every journey, arranged privately.',
          intro:
            'Seven private services, one point of contact. Tell your travel manager what you need and the rest is taken care of.',
        },
        settings: { anchor: 'services', anim: 'stagger-children' },
      },
      {
        blockType: 'processSteps',
        variant: 'steps',
        header: { eyebrow: 'Your journey', heading: 'From the first message to the flight home.' },
        image: photos.rearCabin.id,
        settings: { pt: 'none', pb: 'xl', anim: 'stagger-children' },
        steps: [
          {
            title: 'Before you fly',
            text: 'Share your plans and flight number. Driver, vehicle and quote are confirmed in writing.',
          },
          {
            title: 'Arrival',
            text: 'Met at arrivals with your name. We track your flight, so waiting is free.',
          },
          { title: 'On the road', text: 'A garland, hot towels and king coconut served in glass.' },
          {
            title: 'Your stay',
            text: 'Hotels, activities, security and care arranged around you, with your travel manager a message away.',
          },
          {
            title: 'Departure',
            text: 'Driven back to the airport on time, with your bags taken care of.',
          },
        ],
      },
      {
        blockType: 'vehicleShowcase',
        variant: 'teaser',
        source: 'all',
        header: { eyebrow: 'The fleet', heading: 'Five vehicles. One standard.' },
        cta: { label: 'See the fleet', appearance: 'link', link: internal('pages', fleet) },
        settings: { bg: 'card' },
      },
      {
        blockType: 'destinations',
        variant: 'columns',
        header: { eyebrow: 'Island-wide', heading: 'Where our guests ask to go.' },
        cta: {
          label: 'Plan an island tour',
          appearance: 'link',
          link: internal('services', servicesBySlug['island-tours']!),
        },
        settings: { pt: 'xl' },
        items: [
          {
            name: 'Sigiriya',
            line: 'The rock fortress, at first light',
            photo: photos.sigiriya.id,
          },
          { name: 'Ella', line: 'Tea country and cool hills', photo: photos.ella.id },
          { name: 'Galle', line: 'The old Dutch fort by the sea', photo: photos.galle.id },
        ],
      },
      {
        blockType: 'featureList',
        variant: 'small',
        header: { eyebrow: 'Included for every guest' },
        settings: { pt: 'md', anim: 'stagger-children' },
        items: [
          {
            title: 'A garland welcome',
            text: 'Fresh flowers and a garland as you arrive, with hot towels and a welcome drink.',
          },
          {
            title: 'King coconut',
            text: 'Fresh juice served in a glass bottle, the moment you arrive.',
          },
          { title: 'Flight tracked', text: 'Waiting time and delays never cost you anything.' },
          {
            title: 'Care and security',
            text: 'Caregivers for elderly guests, and bodyguards from our own team.',
          },
        ],
      },
      {
        blockType: 'richText',
        variant: 'detail',
        header: { eyebrow: 'In detail', heading: 'Private chauffeur service in Sri Lanka.' },
        content: rich(
          'CeylonVVIP is a private chauffeur and travel service based in Aluthgama, on Sri Lanka’s south-west coast. We meet guests at Bandaranaike International Airport (CMB) and drive them anywhere on the island, in a private vehicle with an English-speaking driver in uniform.',
          'Guests come to us for airport transfers, tailored island tours, wedding cars, bodyguards and care for elderly travellers. One travel manager arranges everything, including 5-star and Ayurvedic hotels, and stays in touch on WhatsApp, 24 hours a day.',
        ),
      },
      {
        blockType: 'ctaBanner',
        variant: 'enquiry',
        eyebrow: 'Private enquiries',
        heading: 'Tell us where you wish to go.',
        text: 'Your travel manager replies quickly, any time of day, and confirms every detail in writing.',
        cta: { label: 'Speak to your concierge', appearance: 'button', link: whatsappLink },
        showPhone: true,
      },
    ],
  })

  const svc = (slug: string) => ({
    link: { label: servicesBySlug[slug]!.title, ...internal('services', servicesBySlug[slug]!) },
  })
  const serviceLinks = services.map((s) => svc(s.slug ?? ''))
  await payload.updateGlobal({
    slug: 'header',
    context: { disableRevalidate: true },
    data: {
      navigation: [
        { side: 'left', kind: 'link', label: 'Services', link: internal('pages', servicesPage) },
        { side: 'left', kind: 'link', label: 'Fleet', link: internal('pages', fleet) },
        { side: 'right', kind: 'link', label: 'About', link: internal('pages', about) },
        { side: 'right', kind: 'link', label: 'Contact', link: internal('pages', contact) },
      ],
      ctas: [{ cta: { label: 'Concierge', appearance: 'link', link: whatsappLink } }],
    } as never,
  })
  await payload.updateGlobal({
    slug: 'footer',
    context: { disableRevalidate: true },
    data: {
      tagline: 'Travel like royalty,\nfeel like family.',
      columns: [
        { heading: 'Services', links: serviceLinks.slice(0, 6) },
        {
          heading: 'CeylonVVIP',
          links: [
            { link: { label: 'Fleet', ...internal('pages', fleet) } },
            { link: { label: 'About', ...internal('pages', about) } },
            { link: { label: 'Contact', ...internal('pages', contact) } },
          ],
        },
      ],
      contactHeading: 'Contact',
      copyright: '{year} CeylonVVIP. Gainbuild (Pvt) Ltd.',
    } as never,
  })
  await payload.updateGlobal({
    slug: 'contact-business',
    context: { disableRevalidate: true },
    data: {
      whatsapp: WHATSAPP,
      phones: [{ number: WHATSAPP }],
      emails: [{ email: 'bookings@ceylonvvip.com' }],
      availability: 'Available 24 hours',
      address: {
        street: '133/A, Warapitiya',
        city: 'Dharga Town, Aluthgama',
        country: 'Sri Lanka',
      },
    } as never,
  })
  await payload.updateGlobal({
    slug: 'mobile-action-bar',
    context: { disableRevalidate: true },
    data: {
      buttons: [
        { label: 'Menu', icon: 'menu', action: 'menu' },
        { label: 'Concierge', icon: 'whatsapp', action: 'link', link: whatsappLink },
      ],
    } as never,
  })
  await seedPages(
    payload,
    (c, slug, data) => upsert(payload, c, slug, data),
    whatsappLink,
    WHATSAPP,
    photos,
  )
  payload.logger.info('Seeded the Figma pages 01 to 10 and the site chrome.')
}
