/**
 * Figma pages 02 to 10, word for word: the six service pages, Fleet, About and
 * Contact. Called from ./figma.ts. Sections without copy in Figma are left out
 * rather than invented (for example FAQs that have no answer in the design).
 */
import type { Payload } from 'payload'

type Ref = { id: number | string }
type Upsert = (
  collection: 'pages' | 'services' | 'vehicles',
  slug: string,
  data: Record<string, unknown>,
) => Promise<Ref & { slug?: string | null }>

// Booking heading per service page, word for word from Figma.
const BOOKING_HEADINGS: Record<string, string> = {
  'airport-transfers': 'Book your transfer.',
  'island-tours': 'Plan your island tour.',
  'wedding-honeymoon': 'Plan your wedding car.',
  activities: 'Plan an activity.',
  'security-bodyguards': 'Arrange security.',
  'elder-care': 'Arrange elder care.',
}

const p = (text: string) => ({
  type: 'paragraph',
  version: 1,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  children: [{ type: 'text', version: 1, text, format: 0, detail: 0, mode: 'normal', style: '' }],
})
export const rich = (...paras: string[]) => ({
  root: {
    type: 'root',
    version: 1,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    children: paras.map(p),
  },
})

const quote = {
  label: 'Request a private quote',
  appearance: 'link',
  link: { type: 'url', url: '#booking' },
}

interface ServicePage {
  slug: string
  number: string
  title: string
  /** Booking form chip label, from Figma Prestige/Booking/Form. */
  chip: string
  heading: string
  intro: string
  features: Array<[string, string]>
  list?: {
    eyebrow: string
    heading: string
    intro?: string
    rows: Array<[string, string?]>
    footnote?: string
  }
  onBoard?: { eyebrow: string; items: string[] }
  detail: { heading: string; paras: string[]; faqs: Array<[string, string]> }
}

const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'airport-transfers',
    chip: 'Airport Transfer',
    number: '01',
    title: 'Airport Transfers',
    heading: 'Airport transfers, island-wide.',
    intro:
      'Exclusive private transfers from Bandaranaike International Airport (CMB) to anywhere in Sri Lanka. Your driver is already waiting.',
    features: [
      [
        'Met at arrivals',
        'Your driver waits at arrivals with your name, and helps with your luggage.',
      ],
      ['Free waiting time', 'No charge for waiting, however long the queue at immigration.'],
      [
        'Flight tracked',
        'We follow your flight, so an early or late landing never costs you anything.',
      ],
    ],
    list: {
      eyebrow: 'Routes',
      heading: 'From the airport to anywhere on the island.',
      intro: 'Every transfer is private and priced for you. Ask your travel manager for a quote.',
      rows: [
        'Colombo',
        'Negombo',
        'Kandy',
        'Galle',
        'Sigiriya',
        'Dambulla',
        'Nuwara Eliya',
        'Ella',
        'Trincomalee',
        'Yala',
        'Mirissa',
        'Tangalle',
        'Anuradhapura',
        'Aluthgama and Bentota',
      ].map((place) => [`Airport to ${place}`, 'Price on request']),
      footnote: 'And every other place in Sri Lanka.',
    },
    onBoard: {
      eyebrow: 'Complimentary on board',
      items: [
        'Hot fresh towels',
        'Welcome drink and king coconut',
        'Fresh flowers and a garland',
        'Driver in uniform, speaks English',
      ],
    },
    detail: {
      heading: 'Airport transfers from Colombo airport (CMB), anywhere in Sri Lanka.',
      paras: [
        'Bandaranaike International Airport (CMB), near Negombo, is where most international guests arrive in Sri Lanka. Our private airport transfer service meets you inside arrivals with your name, helps with your luggage and drives you directly to your hotel, villa or meeting, whether in Colombo, Galle, Kandy, Bentota or the far south.',
        'We track every flight, so there is no charge for waiting or for delays. Transfers run day and night, including to the airport for your departure.',
      ],
      faqs: [
        [
          'How do I find my driver at Colombo airport?',
          'Your driver waits inside arrivals with a sign showing your name.',
        ],
        [
          'Is there a charge if my flight is late?',
          'No. We track your flight, and waiting time is free.',
        ],
        [
          'Can you drive us from the airport to Galle, Kandy or Ella?',
          'Yes. We drive from the airport to anywhere in Sri Lanka.',
        ],
        [
          'Do you take guests to the airport for departure?',
          'Yes, at any hour of the day or night.',
        ],
      ],
    },
  },
  {
    slug: 'island-tours',
    chip: 'Island Tour',
    number: '02',
    title: 'Island Tours',
    heading: 'Island tours, made around you.',
    intro:
      'Anywhere in Sri Lanka, with your own vehicle and English-speaking driver. Name the places you wish to see, and the route is planned around you.',
    features: [
      [
        'Tailored, never packaged',
        'Your days are planned around your pace, your hotels and the places you want to see.',
      ],
      [
        'Your own driver',
        'One English-speaking driver in uniform stays with you for the whole journey.',
      ],
      ['5-star stays', 'We can arrange 5-star and Ayurvedic hotels anywhere on the island.'],
    ],
    list: {
      eyebrow: 'Signature places',
      heading: 'Where guests ask to go.',
      rows: [
        ['Sigiriya', 'The rock fortress'],
        ['Kandy', 'The hill capital'],
        ['Ella', 'Tea country and cool hills'],
        ['Galle', 'The old Dutch fort'],
        ['Mirissa', 'Quiet southern beaches'],
        ['Yala', 'Leopards on safari'],
      ],
    },
    detail: {
      heading: 'Private island tours of Sri Lanka, with your own driver.',
      paras: [
        'A CeylonVVIP island tour is planned around you: the places you want to see, the pace you prefer and the hotels you choose. Popular journeys combine the Sigiriya rock fortress and the hill capital of Kandy with tea country around Ella, the beaches of the south and the old Dutch fort at Galle. You travel in a private vehicle with an English-speaking driver, and your travel manager can arrange 5-star hotels and activities along the way.',
      ],
      faqs: [
        [
          'How many days do I need for a Sri Lanka tour?',
          'It depends on the places you choose. Share your dates and we suggest a route that fits.',
        ],
        [
          'Can we choose our own hotels?',
          'Yes. Choose your own, or we arrange 5-star hotels for you.',
        ],
        [
          'Which vehicle is best for a family tour?',
          'The Toyota Prado 150 or Toyota Voxy, depending on the number of guests and bags.',
        ],
      ],
    },
  },
  {
    slug: 'wedding-honeymoon',
    chip: 'Wedding',
    number: '03',
    title: 'Wedding and Honeymoon',
    heading: 'Weddings and honeymoons.',
    intro:
      'Decorated BMW and Prado for your wedding day, and a private VVIP car for couples travelling the island.',
    features: [
      ['Decorated to your wishes', 'Decoration is arranged to the requirement of each couple.'],
      ['Two wedding cars', 'A white BMW 520d and a white Toyota Prado 150.'],
      ['Honeymoon journeys', 'A private car and driver for couples, from the coast to the hills.'],
    ],
    list: {
      eyebrow: 'Options',
      heading: 'For your day, and the days after.',
      rows: [
        ['Wedding day hire', 'BMW 520d or Prado 150, decorated'],
        ['Honeymoon journey', 'Private car for couples, island-wide'],
        ['Hotel bookings', '5-star stays arranged for you'],
      ],
    },
    detail: {
      heading: 'Wedding cars and honeymoon travel in Sri Lanka.',
      paras: [
        'For your wedding day, CeylonVVIP provides a white BMW 520d and a white Toyota Prado 150, decorated to your wishes, with drivers in uniform. Couples marrying in Bentota, Aluthgama, Galle or anywhere on the island can book one car or both. After the celebration, our honeymoon journeys give couples a private car and driver from the coast to the hills, with 5-star hotels arranged by your travel manager.',
      ],
      faqs: [
        [
          'Can the car be decorated in our wedding colours?',
          'Yes. Decoration follows your wishes, from fresh flowers to ribbons in your colours.',
        ],
        ['Can we book both the BMW and the Prado?', 'Yes, one car or both.'],
      ],
    },
  },
  {
    slug: 'activities',
    chip: 'Activity',
    number: '04',
    title: 'Activities',
    heading: 'Activities, arranged privately.',
    intro: 'Bentota River Safari, water sports and hiking, with private transport there and back.',
    features: [
      ['Bentota River Safari', 'A quiet boat trip on the Bentota river, close to Aluthgama.'],
      ['Water sports', 'On the coast near Bentota, arranged around your day.'],
      ['Hiking', 'Walks in the hills, with your driver waiting when you return.'],
    ],
    detail: {
      heading: 'Activities near Bentota and across Sri Lanka.',
      paras: [
        'Based in Aluthgama, a short drive from Bentota, we arrange the Bentota River Safari, water sports on the coast and hikes in the hills, with private transport there and back. Your travel manager plans each activity around the rest of your day.',
      ],
      faqs: [
        [
          'Do you arrange transport to the activity?',
          'Yes. We arrange private transport to and from each activity.',
        ],
      ],
    },
  },
  {
    slug: 'security-bodyguards',
    chip: 'Security',
    number: '05',
    title: 'Security and Bodyguards',
    heading: 'Discreet protection.',
    intro:
      'Bodyguards from our own company, for guests who require privacy and safety at every step.',
    features: [
      ['Our own team', 'Bodyguards come from our own company, not an outside agency.'],
      ['Discretion first', 'Your plans, your guests and your details stay with us.'],
      ['Door to door', 'Security travels with your vehicle and driver for the whole journey.'],
    ],
    detail: {
      heading: 'Private bodyguards and security in Sri Lanka.',
      paras: [
        'For diplomats, business leaders and high-profile guests, CeylonVVIP provides bodyguards and security from our own company. Security travels with your vehicle and driver, from the airport to your hotel and every meeting in between, and your plans stay strictly private.',
      ],
      faqs: [['Are the bodyguards your own staff?', 'Yes. They come from our own company.']],
    },
  },
  {
    slug: 'elder-care',
    chip: 'Elder Care',
    number: '06',
    title: 'Elder Care',
    heading: 'Care on the journey.',
    intro:
      'A caregiver for elderly guests throughout the journey, so the whole family travels at ease.',
    features: [
      ['A caregiver with you', 'A caregiver travels with elderly guests for the whole journey.'],
      ['Calm, comfortable vehicles', 'Spacious seats and a smooth ride, chosen for comfort.'],
      ['An unhurried pace', 'Routes planned with rest stops whenever you need them.'],
    ],
    detail: {
      heading: 'Travel in Sri Lanka with elderly family members.',
      paras: [
        'CeylonVVIP provides caregivers who travel with elderly guests throughout the journey, so families can see Sri Lanka together without worry. Routes are planned with rest stops whenever needed, in calm, comfortable vehicles.',
      ],
      faqs: [
        [
          'Can a caregiver stay with us for the whole trip?',
          'Yes, for the whole trip or for selected days.',
        ],
      ],
    },
  },
]

// 08 Fleet / Vehicles. Seats and bag counts are the largest numbers in the Figma text,
// used only to filter the booking form.
const VEHICLES = [
  {
    slug: 'bmw-520d',
    name: 'BMW 520d',
    seats: 3,
    luggage: 4,
    bestFor: 'Airport transfers, weddings and couples',
    guests: '2, plus 1 in front',
    bags: '4 bags',
    colours: 'White, beige interior',
    summary: '2 guests, plus 1 in front. 4 bags. White with beige interior.',
  },
  {
    slug: 'toyota-prado-150',
    name: 'Toyota Prado 150',
    seats: 5,
    luggage: 6,
    bestFor: 'Families, island tours and weddings',
    guests: '2, plus 2 child seats and 1 in front',
    bags: '5 to 6 bags',
    colours: 'White, beige interior',
  },
  {
    slug: 'toyota-voxy',
    name: 'Toyota Voxy',
    seats: 3,
    luggage: 5,
    bestFor: 'Small groups and families',
    guests: '3',
    bags: '4 to 5 bags',
    colours: 'White, black interior',
  },
  {
    slug: 'audi-a3',
    name: 'Audi A3',
    seats: 2,
    luggage: 3,
    bestFor: 'Business VIPs and couples',
    guests: '2',
    bags: '3 bags',
    colours: 'Black, black interior',
  },
  {
    slug: 'honda-vezel',
    name: 'Honda Vezel',
    seats: 3,
    luggage: 4,
    bestFor: 'Couples and short trips',
    guests: '3, with 2 in the back and 1 in front',
    bags: '3 to 4 bags',
    colours: 'Black, white interior',
  },
]

const enquiry = (whatsapp: unknown) => ({
  blockType: 'ctaBanner',
  variant: 'enquiry',
  eyebrow: 'Private enquiries',
  heading: 'Tell us where you wish to go.',
  text: 'Your travel manager replies quickly, any time of day, and confirms every detail in writing.',
  cta: { label: 'Speak to your concierge', appearance: 'button', link: whatsapp },
  showPhone: true,
})

async function faq(payload: Payload, question: string, answer: string, topic: string) {
  const { docs } = await payload.find({
    collection: 'faqs',
    where: { question: { equals: question } },
    limit: 1,
  })
  const data = { question, answer: rich(answer), topic } as never
  return docs[0]
    ? payload.update({ collection: 'faqs', id: docs[0].id, data })
    : payload.create({ collection: 'faqs', data })
}

export async function seedPages(
  payload: Payload,
  upsert: Upsert,
  whatsapp: unknown,
  phone: string,
) {
  for (const [i, v] of VEHICLES.entries()) {
    await upsert('vehicles', v.slug, {
      name: v.name,
      order: i + 1,
      seats: v.seats,
      luggage: v.luggage,
      summary: v.summary ?? null,
      specs: { bestFor: v.bestFor, guests: v.guests, luggage: v.bags, colours: v.colours },
    })
  }

  const services: Record<string, Ref> = {}
  for (const s of SERVICE_PAGES)
    services[s.slug] = await upsert('services', s.slug, { title: s.title, shortLabel: s.chip })

  // Figma Prestige/Booking/Form ("Booking v2"), labels word for word.
  const { docs: forms } = await payload.find({
    collection: 'forms',
    where: { title: { equals: 'Booking' } },
    limit: 1,
  })
  const formData = {
    title: 'Booking',
    serviceLabel: 'Service',
    vehicleLabel: 'Vehicle',
    noPreferenceLabel: 'No preference',
    noPreferenceDetail: 'We suggest the best fit for your group',
    dateLabel: 'Date',
    timeLabel: 'Time',
    dateTimeLabel: 'Date and time',
    adultsLabel: 'Adults',
    adultsHint: 'Age 12 and over',
    childrenLabel: 'Children',
    childrenHint: 'Under 12',
    submitLabel: 'Continue on WhatsApp',
    detailsToggleLabel: 'Add details, optional',
    note: 'Your request opens in WhatsApp, ready to send. No payment is taken here.',
  } as never
  const bookingForm = forms[0]
    ? await payload.update({ collection: 'forms', id: forms[0].id, data: formData })
    : await payload.create({ collection: 'forms', data: formData })
  const internal = (relationTo: 'pages' | 'services', value: Ref) => ({
    type: 'internal',
    reference: { relationTo, value: value.id },
  })

  for (const [i, s] of SERVICE_PAGES.entries()) {
    const next = SERVICE_PAGES[(i + 1) % SERVICE_PAGES.length]!
    const faqs = []
    for (const [q, a] of s.detail.faqs) faqs.push((await faq(payload, q, a, s.title)).id)
    await upsert('services', s.slug, {
      title: s.title,
      layout: [
        {
          blockType: 'hero',
          variant: 'page',
          eyebrow: `Services, ${s.number}`,
          heading: s.heading,
          intro: s.intro,
          mediaType: 'none',
          ctas: [{ cta: quote }],
        },
        {
          blockType: 'featureList',
          variant: 'large',
          items: s.features.map(([title, text]) => ({ title, text })),
          settings: { pt: 'md', anim: 'stagger-children' },
        },
        ...(s.list
          ? [
              {
                blockType: 'routeList',
                variant: 'rows',
                header: { eyebrow: s.list.eyebrow, heading: s.list.heading, intro: s.list.intro },
                items: s.list.rows.map(([name, note]) => ({ name, note })),
                footnote: s.list.footnote,
                settings: { pt: 'none' },
              },
            ]
          : []),
        ...(s.onBoard
          ? [
              {
                blockType: 'featureList',
                variant: 'title',
                header: { eyebrow: s.onBoard.eyebrow },
                items: s.onBoard.items.map((title) => ({ title })),
                settings: { pt: 'none' },
              },
            ]
          : []),
        {
          blockType: 'richText',
          variant: 'detail',
          header: { eyebrow: 'In detail', heading: s.detail.heading },
          content: rich(...s.detail.paras),
          faqLabel: 'Questions guests ask',
          faqs,
        },
        {
          blockType: 'form',
          variant: 'booking',
          // Figma service pages / Booking: same label and intro, one heading per service.
          header: BOOKING_HEADINGS[s.slug]
            ? {
                eyebrow: 'Private quote',
                heading: BOOKING_HEADINGS[s.slug],
                intro:
                  'Three answers are all we need. Your request opens in WhatsApp, ready to send to your travel manager.',
              }
            : undefined,
          form: bookingForm.id,
          service: services[s.slug]!.id,
          settings: { bg: 'card', anchor: 'booking', anim: 'none' },
        },
        {
          blockType: 'ctaBanner',
          variant: 'next',
          eyebrow: next.number,
          heading: next.title,
          next: internal('services', services[next.slug]!),
        },
      ],
    })
  }

  // Services index (task 160). Figma has no frame for it, so the hero reuses the Home
  // Services header word for word; each card opens its service page.
  await upsert('pages', 'services', {
    title: 'Services',
    layout: [
      {
        blockType: 'hero',
        variant: 'page',
        eyebrow: 'Services',
        heading: 'Every journey, arranged privately.',
        intro:
          'Seven private services, one point of contact. Tell your travel manager what you need and the rest is taken care of.',
        mediaType: 'none',
      },
      {
        blockType: 'servicesGrid',
        variant: 'cards',
        source: 'all',
        settings: { pt: 'sm', anim: 'stagger-children' },
      },
      enquiry(whatsapp),
    ],
  })

  await upsert('pages', 'fleet', {
    title: 'Fleet',
    layout: [
      {
        blockType: 'hero',
        variant: 'page',
        eyebrow: 'The fleet',
        heading: 'Five vehicles. One standard.',
        intro:
          'Every vehicle arrives with an English-speaking driver in uniform, a garland welcome, hot fresh towels and a welcome drink.',
        mediaType: 'none',
        ctas: [{ cta: { label: 'Enquire about a vehicle', appearance: 'link', link: whatsapp } }],
      },
      {
        blockType: 'vehicleShowcase',
        variant: 'specs',
        source: 'all',
        cta: { label: 'Enquire about this vehicle', appearance: 'link', link: whatsapp },
        settings: { pt: 'none', pb: 'sm' },
      },
      {
        blockType: 'richText',
        variant: 'detail',
        header: { eyebrow: 'In detail', heading: 'Luxury car hire with driver in Sri Lanka.' },
        content: rich(
          'Every CeylonVVIP vehicle is chauffeur-driven. Choose the BMW 520d or Audi A3 for executive travel, the Toyota Prado 150 for families and longer island tours, or the Toyota Voxy and Honda Vezel for small groups. Each comes with an English-speaking driver in uniform, a garland welcome, hot towels and a welcome drink.',
        ),
      },
      {
        blockType: 'imageText',
        variant: 'bleed',
        header: { eyebrow: 'For weddings', heading: 'BMW and Prado, decorated for the day.' },
        content: rich(
          'Decoration is arranged to your wishes, from fresh flowers to ribbons in your colours.',
        ),
        cta: {
          label: 'Wedding and honeymoon',
          appearance: 'link',
          link: internal('services', services['wedding-honeymoon']!),
        },
        settings: { bg: 'card' },
      },
      enquiry(whatsapp),
    ],
  })

  await upsert('pages', 'about', {
    title: 'About',
    layout: [
      {
        blockType: 'hero',
        variant: 'page',
        eyebrow: 'About CeylonVVIP',
        heading: 'Hosted, not only driven.',
        intro:
          'We look after VVIP guests in Sri Lanka: diplomats, business travellers, top professionals and private families, with our own drivers, vehicles and security team, based in Aluthgama.',
        mediaType: 'none',
        ctas: [{ cta: { label: 'Speak to your concierge', appearance: 'link', link: whatsapp } }],
      },
      {
        blockType: 'richText',
        variant: 'story',
        header: { eyebrow: 'Our story', heading: 'Travel like royalty, feel like family.' },
        content: rich(
          'CeylonVVIP began in Aluthgama with a simple idea: the most discerning visitors to Sri Lanka deserve one trusted host for the whole journey. Our own drivers, our own vehicles and our own security team keep every detail in our hands, and every guest is treated as family.',
        ),
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
            cta: { label: 'Ask about the gem experience', appearance: 'link', link: whatsapp },
          },
          {
            label: 'Hotels and Ayurveda',
            title: 'Your hotels, arranged for you.',
            text: 'Share your dates and the kind of stay you prefer. Your travel manager books 5-star hotels and Ayurvedic treatment hotels anywhere on the island, and times every transfer around your stay.',
            cta: { label: 'Request a hotel or Ayurvedic stay', appearance: 'link', link: whatsapp },
          },
        ],
      },
      {
        blockType: 'imageText',
        variant: 'bleed',
        header: {
          eyebrow: 'Your travel manager',
          heading: 'One person, from first message to final mile.',
        },
        content: rich(
          'One person looks after your vehicles, drivers, hotels and timings, from first message to final mile, and confirms each detail in writing.',
        ),
        settings: { pt: 'none' },
      },
      {
        blockType: 'featureList',
        variant: 'small',
        header: { eyebrow: 'Guest benefits', heading: 'Included for every guest.' },
        settings: { bg: 'card' },
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
        blockType: 'featureList',
        variant: 'large',
        header: { eyebrow: 'Booking and payment', heading: 'Clear terms, agreed in writing.' },
        settings: { pb: 'md' },
        items: [
          {
            title: 'A 25% deposit',
            text: '25% of the luxury tour cost confirms your booking. Hotels and special bookings are arranged with you directly.',
          },
          { title: '75% on arrival', text: 'The balance is paid on your first day in Sri Lanka.' },
          {
            title: 'Free cancellation',
            text: 'Tell us at least 7 days before your tour and we refund your full deposit within 7 days.',
          },
        ],
      },
      {
        blockType: 'routeList',
        variant: 'rows',
        items: [
          { name: 'Payment', note: 'Bank transfer or cash' },
          { name: 'Currencies', note: 'US dollars, rupees or euros' },
          { name: 'Extra charges', note: 'Always discussed with you first' },
        ],
        settings: { pt: 'none' },
      },
      enquiry(whatsapp),
    ],
  })

  const contactFaqs = [
    (
      await faq(
        payload,
        'How do I confirm a booking?',
        'Pay a 25% deposit of the luxury tour cost. The balance is paid on your first day in Sri Lanka.',
        'Contact',
      )
    ).id,
  ]
  await upsert('pages', 'contact', {
    title: 'Contact',
    layout: [
      {
        blockType: 'hero',
        variant: 'page',
        eyebrow: 'Contact',
        heading: 'Speak to your concierge.',
        intro:
          'Available 24 hours. Fill in the form and your request opens in WhatsApp, ready to send to your travel manager.',
        mediaType: 'none',
        ctas: [
          { cta: { label: `Call ${phone}`, appearance: 'link', link: { type: 'phone', phone } } },
        ],
      },
      {
        blockType: 'form',
        variant: 'booking',
        // Figma 10 Contact / Booking (82:3484).
        header: {
          eyebrow: 'Private quote',
          heading: 'Tell us about your journey.',
          intro:
            'Three steps: fill in what you know, press Continue on WhatsApp, then press Send in WhatsApp.',
        },
        form: bookingForm.id,
        settings: { bg: 'card', pt: 'md', anchor: 'booking', anim: 'none' },
      },
      {
        blockType: 'imageText',
        variant: 'inset',
        header: { eyebrow: 'Visit', heading: 'Aluthgama, on the south-west coast.' },
        details: [
          { title: 'Address', text: '133/A, Warapitiya, Dharga Town, Aluthgama, Sri Lanka' },
          { title: 'Hours', text: 'Available 24 hours, every day' },
          { title: 'WhatsApp and phone', text: phone },
          { title: 'Email', text: 'bookings@ceylonvvip.com' },
        ],
      },
      {
        blockType: 'faq',
        variant: 'list',
        header: { eyebrow: 'Questions', heading: 'Questions guests ask.' },
        source: 'chosen',
        items: contactFaqs,
        settings: { pt: 'none' },
      },
    ],
  })
}
