import { cta, iconOptions, link, media } from '@ceylonvvip/cms-schema'
import type { Block, Field } from 'payload'

import { LINKABLE } from '../linkable'

/*
 * The page block library. Variant names follow the Figma sections that use each block
 * (01 Home to 10 Contact). Blocks with no Figma design yet have a single `default`
 * variant; their variants get added once designed.
 */

// Section settings shared by every block, taken from Figma: sections are either the
// page background (ivory) or the card colour (parchment), with 0 to 200px padding.
// Field names are short because Postgres limits identifiers to 63 characters.
const PADDING = [
  { value: 'none', label: 'None (0)' },
  { value: 'sm', label: 'Small (80)' },
  { value: 'md', label: 'Medium (120)' },
  { value: 'lg', label: 'Large (160)' },
  { value: 'xl', label: 'Extra large (200)' },
]

// Presets from the Figma motion spec. hero-intro is only offered on the Hero.
const ANIMATIONS = [
  { value: 'none', label: 'None' },
  { value: 'fade-up', label: 'Fade up' },
  { value: 'stagger-children', label: 'Stagger items' },
  { value: 'reveal-mask', label: 'Reveal image' },
  { value: 'image-parallax', label: 'Image parallax' },
  { value: 'counter', label: 'Count up numbers' },
  { value: 'line-draw', label: 'Draw lines' },
]

function settings({ animation = 'fade-up', hero = false } = {}): Field {
  return {
    name: 'settings',
    label: 'Section settings',
    type: 'group',
    admin: { hideGutter: true },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'bg',
            label: 'Background',
            type: 'select',
            defaultValue: 'default',
            options: [
              { value: 'default', label: 'Ivory (page)' },
              { value: 'card', label: 'Parchment (card)' },
            ],
          },
          {
            name: 'pt',
            label: 'Space above',
            type: 'select',
            defaultValue: 'lg',
            options: PADDING,
          },
          {
            name: 'pb',
            label: 'Space below',
            type: 'select',
            defaultValue: 'lg',
            options: PADDING,
          },
          {
            name: 'anim',
            label: 'Animation',
            type: 'select',
            defaultValue: animation,
            options: hero
              ? [...ANIMATIONS, { value: 'hero-intro', label: 'Hero intro' }]
              : ANIMATIONS,
          },
        ],
      },
      {
        name: 'anchor',
        type: 'text',
        admin: { description: 'Optional id for links to this section, like #booking.' },
        validate: (v: unknown) =>
          !v || /^[a-z0-9-]+$/.test(String(v)) || 'Lowercase letters, numbers and hyphens.',
      },
    ],
  }
}

function variant(options: string[], labels: Record<string, string> = {}): Field {
  return {
    name: 'variant',
    type: 'select',
    required: true,
    defaultValue: options[0],
    options: options.map((value) => ({ value, label: labels[value] ?? value })),
    admin: options.length === 1 ? { hidden: true } : undefined,
  }
}

/** Prestige/Section/Header: a small eyebrow line above the heading. */
const header: Field = {
  name: 'header',
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          admin: { description: 'Small line above, like "Services".' },
        },
        { name: 'heading', type: 'text' },
      ],
    },
    { name: 'intro', type: 'textarea' },
  ],
}

const ctaField = (name = 'cta') => cta({ name, relationTo: LINKABLE })

const pick = (
  relationTo: 'services' | 'vehicles' | 'faqs' | 'testimonials' | 'pricing',
  label: string,
): Field[] => [
  {
    name: 'source',
    type: 'radio',
    defaultValue: 'all',
    options: [
      { value: 'all', label: `All published ${label}, in their set order` },
      { value: 'chosen', label: `Only the ${label} I choose` },
    ],
  },
  {
    name: 'items',
    label,
    type: 'relationship',
    relationTo,
    hasMany: true,
    admin: { condition: (_, s) => s?.source === 'chosen' },
  },
]

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [
    variant(['page', 'home'], { page: 'Page hero', home: 'Home hero' }),
    { name: 'eyebrow', type: 'text', admin: { description: 'Like "Services, 02".' } },
    { name: 'heading', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    {
      name: 'mediaType',
      type: 'radio',
      defaultValue: 'image',
      options: [
        { value: 'image', label: 'Image' },
        { value: 'video', label: 'Video' },
        { value: 'slider', label: 'Image slider' },
        { value: 'none', label: 'None' },
      ],
      admin: { layout: 'horizontal' },
    },
    { ...media({ name: 'image' }), admin: { condition: (_, s) => s?.mediaType === 'image' } },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, s) => s?.mediaType === 'video',
        description: 'MP4, muted and looping.',
      },
    },
    {
      name: 'slides',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: { condition: (_, s) => s?.mediaType === 'slider' },
    },
    { name: 'ctas', label: 'Buttons', type: 'array', maxRows: 2, fields: [ctaField()] },
    settings({ animation: 'hero-intro', hero: true }),
  ],
}

export const RichText: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  fields: [
    variant(['detail', 'statement', 'story'], {
      detail: 'In detail (section header and text)',
      statement:
        'Statement (large centred text; the eyebrow shows below, separate words with commas)',
      story: 'Story (About)',
    }),
    header,
    { name: 'content', type: 'richText', required: true },
    {
      name: 'faqLabel',
      label: 'Questions label',
      type: 'text',
      admin: { description: 'Small line above the questions, like "Questions guests ask".' },
    },
    {
      name: 'faqs',
      label: 'Questions under the text',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
    },
    settings(),
  ],
}

export const ServicesGrid: Block = {
  slug: 'servicesGrid',
  interfaceName: 'ServicesGridBlock',
  fields: [
    variant(['index'], { index: 'Numbered index rows' }),
    header,
    ...pick('services', 'services'),
    settings({ animation: 'stagger-children' }),
  ],
}

export const VehicleShowcase: Block = {
  slug: 'vehicleShowcase',
  interfaceName: 'VehicleShowcaseBlock',
  fields: [
    variant(['specs', 'teaser'], { specs: 'Full specs (Fleet page)', teaser: 'Teaser (Home)' }),
    header,
    ...pick('vehicles', 'vehicles'),
    ctaField(),
    settings(),
  ],
}

export const FleetComparison: Block = {
  slug: 'fleetComparison',
  interfaceName: 'FleetComparisonBlock',
  fields: [
    variant(['default']),
    header,
    ...pick('vehicles', 'vehicles'),
    {
      name: 'compare',
      type: 'select',
      hasMany: true,
      defaultValue: ['class', 'seats', 'luggage'],
      options: ['class', 'seats', 'luggage', 'features'].map((value) => ({ value, label: value })),
    },
    settings(),
  ],
}

export const FeatureList: Block = {
  slug: 'featureList',
  interfaceName: 'FeatureListBlock',
  fields: [
    variant(['large', 'small', 'signature', 'title'], {
      large: 'Large (title and text)',
      small: 'Small (title and text, in columns)',
      signature: 'Signature (photo, title, text and button)',
      title: 'Titles only',
    }),
    header,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          admin: {
            description:
              'Small bronze line above the title (Signature variant), like "Signature experience".',
          },
        },
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
        { name: 'icon', type: 'select', options: iconOptions },
        media({ name: 'image', description: 'Used by the Signature variant.' }),
        ctaField(),
      ],
    },
    settings({ animation: 'stagger-children' }),
  ],
}

export const Stats: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  fields: [
    variant(['default']),
    header,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'prefix', type: 'text' },
            { name: 'value', type: 'number', required: true },
            { name: 'suffix', type: 'text', admin: { description: 'Like + or %.' } },
          ],
        },
        { name: 'label', type: 'text', required: true },
      ],
    },
    settings({ animation: 'counter' }),
  ],
}

export const ImageText: Block = {
  slug: 'imageText',
  interfaceName: 'ImageTextBlock',
  fields: [
    variant(['bleed', 'inset'], {
      bleed: 'Photo to the page edge (Wedding cars, Travel manager)',
      inset: 'Photo within the margins (Visit)',
    }),
    header,
    { name: 'content', type: 'richText' },
    {
      name: 'details',
      type: 'array',
      admin: { description: 'Optional rows under a line, like Address, Hours, Email.' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'text' },
      ],
    },
    media({
      name: 'image',
      description: 'Until a photo is added, the parchment placeholder shows.',
    }),
    {
      name: 'imagePosition',
      type: 'radio',
      defaultValue: 'left',
      options: [
        { value: 'left', label: 'Image on the left' },
        { value: 'right', label: 'Image on the right' },
      ],
      admin: { layout: 'horizontal' },
    },
    ctaField(),
    settings({ animation: 'reveal-mask' }),
  ],
}

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  fields: [
    variant(['default']),
    header,
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true, required: true },
    settings({ animation: 'reveal-mask' }),
  ],
}

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [variant(['default']), header, ...pick('testimonials', 'testimonials'), settings()],
}

export const Faq: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    variant(['list'], { list: 'Expandable rows' }),
    header,
    {
      name: 'source',
      type: 'radio',
      defaultValue: 'topic',
      options: [
        { value: 'topic', label: 'All FAQs with a topic' },
        { value: 'chosen', label: 'Only the FAQs I choose' },
      ],
    },
    { name: 'topic', type: 'text', admin: { condition: (_, s) => s?.source === 'topic' } },
    {
      name: 'items',
      label: 'FAQs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      admin: { condition: (_, s) => s?.source === 'chosen' },
    },
    settings(),
  ],
}

export const PricingTable: Block = {
  slug: 'pricingTable',
  interfaceName: 'PricingTableBlock',
  fields: [
    variant(['default']),
    header,
    {
      name: 'items',
      label: 'Prices',
      type: 'relationship',
      relationTo: 'pricing',
      hasMany: true,
      required: true,
    },
    settings(),
  ],
}

export const ProcessSteps: Block = {
  slug: 'processSteps',
  interfaceName: 'ProcessStepsBlock',
  fields: [
    variant(['steps'], { steps: 'Numbered steps' }),
    header,
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
      ],
    },
    settings({ animation: 'stagger-children' }),
  ],
}

export const CtaBanner: Block = {
  slug: 'ctaBanner',
  interfaceName: 'CtaBannerBlock',
  labels: { singular: 'CTA Banner', plural: 'CTA Banners' },
  fields: [
    variant(['enquiry', 'next'], {
      enquiry: 'Enquiry (heading, text and concierge button)',
      next: 'Next page (link to the next service)',
    }),
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'text', type: 'textarea', admin: { condition: (_, s) => s?.variant === 'enquiry' } },
    { ...ctaField(), admin: { condition: (_, s) => s?.variant === 'enquiry' } },
    {
      name: 'showPhone',
      label: 'Show the phone number from Contact & Business',
      type: 'checkbox',
      defaultValue: true,
      admin: { condition: (_, s) => s?.variant === 'enquiry' },
    },
    {
      ...link({ name: 'next', label: 'Next page', relationTo: LINKABLE, withLabel: false }),
      admin: { condition: (_, s) => s?.variant === 'next' },
    },
    settings(),
  ],
}

export const FormBlock: Block = {
  slug: 'form',
  interfaceName: 'FormBlock',
  fields: [
    variant(['booking'], { booking: 'Booking form' }),
    header,
    {
      name: 'service',
      label: 'Pre-select a service',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        description: 'Leave empty on general pages. On a service page, choose that service.',
      },
    },
    settings({ animation: 'none' }),
  ],
}

export const MapBlock: Block = {
  slug: 'map',
  interfaceName: 'MapBlock',
  fields: [
    variant(['default']),
    header,
    {
      name: 'useBusinessAddress',
      label: 'Use the map pin from Contact & Business',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      type: 'row',
      admin: { condition: (_, s) => !s?.useBusinessAddress },
      fields: [
        { name: 'latitude', type: 'number', min: -90, max: 90 },
        { name: 'longitude', type: 'number', min: -180, max: 180 },
      ],
    },
    { name: 'zoom', type: 'number', min: 3, max: 20, defaultValue: 14 },
    settings({ animation: 'none' }),
  ],
}

export const LogoStrip: Block = {
  slug: 'logoStrip',
  interfaceName: 'LogoStripBlock',
  fields: [
    variant(['default']),
    header,
    {
      name: 'logos',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true },
        media({ name: 'logo', required: true }),
        { name: 'url', type: 'text' },
      ],
    },
    settings(),
  ],
}

// Figma 01 Home / Destinations: places guests ask for, three to a row with photos.
export const Destinations: Block = {
  slug: 'destinations',
  interfaceName: 'DestinationsBlock',
  fields: [
    variant(['columns'], { columns: 'Photo columns' }),
    header,
    ctaField(),
    {
      name: 'items',
      label: 'Places',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'line',
          type: 'text',
          admin: { description: 'One short line, like "Tea country and cool hills".' },
        },
        media({ name: 'photo' }),
      ],
    },
    settings(),
  ],
}

// Figma Prestige/Route/Row lists: Airport routes, Island Tours places, Wedding options,
// About booking and payment. Header on the left, rows on the right.
export const RouteList: Block = {
  slug: 'routeList',
  interfaceName: 'RouteListBlock',
  fields: [
    variant(['rows'], { rows: 'Rows beside the header' }),
    header,
    {
      name: 'items',
      label: 'Rows',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'note',
          type: 'text',
          admin: { description: 'Shown at the right, like "Price on request".' },
        },
      ],
    },
    { name: 'footnote', type: 'text', admin: { description: 'Small line under the rows.' } },
    settings(),
  ],
}

export const Spacer: Block = {
  slug: 'spacer',
  interfaceName: 'SpacerBlock',
  fields: [
    {
      name: 'size',
      type: 'select',
      defaultValue: 'md',
      options: PADDING.filter((p) => p.value !== 'none'),
    },
    { name: 'divider', label: 'Show a thin line', type: 'checkbox' },
  ],
}

export const pageBlocks: Block[] = [
  Hero,
  RichText,
  ServicesGrid,
  VehicleShowcase,
  FleetComparison,
  FeatureList,
  Stats,
  ImageText,
  Gallery,
  Testimonials,
  Faq,
  PricingTable,
  ProcessSteps,
  CtaBanner,
  FormBlock,
  MapBlock,
  LogoStrip,
  Destinations,
  RouteList,
  Spacer,
]

/** Blocks that have a Figma design. The others are flagged for design. */
export const DESIGNED_BLOCKS = [
  'hero',
  'richText',
  'servicesGrid',
  'vehicleShowcase',
  'featureList',
  'faq',
  'processSteps',
  'ctaBanner',
  'form',
  'destinations',
  'routeList',
  'imageText',
]
