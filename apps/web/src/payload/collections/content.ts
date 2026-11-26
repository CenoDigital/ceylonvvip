import { link, media, seoTab, slugField } from '@ceylonvvip/cms-schema'
import type { CollectionConfig } from 'payload'

import { anyone, editors, publishedOrEditors } from '../access'
import { revalidateDocument, revalidateOnDelete } from '../hooks/revalidate'
import { LINKABLE } from '../linkable'
import { RESERVED_PAGE_SLUGS } from '../paths'
import { previewAdmin } from '../preview'

// Drafts with autosave, scheduled publishing and up to 50 saved versions per document.
const drafts: CollectionConfig['versions'] = {
  drafts: { autosave: { interval: 1500 }, schedulePublish: true },
  maxPerDoc: 50,
}

const editorial = { read: publishedOrEditors, create: editors, update: editors, delete: editors }
const reference = { read: anyone, create: editors, update: editors, delete: editors }

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    ...previewAdmin('pages'),
  },
  access: editorial,
  versions: drafts,
  hooks: {
    afterChange: [revalidateDocument('pages', 'pages')],
    afterDelete: [revalidateOnDelete('pages', 'pages')],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField({ reserved: RESERVED_PAGE_SLUGS }),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          // The page block library (task 144) is added here as the `layout` field.
          fields: [
            media({
              name: 'image',
              label: 'Main image',
              description: 'Used for sharing and listings.',
            }),
          ],
        },
        seoTab({ defaultSchema: 'WebPage' }),
      ],
    },
  ],
}

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    ...previewAdmin('services'),
  },
  access: editorial,
  versions: drafts,
  hooks: {
    afterChange: [revalidateDocument('services', 'services')],
    afterDelete: [revalidateOnDelete('services', 'services')],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    {
      name: 'order',
      type: 'number',
      admin: { position: 'sidebar', description: 'Lower numbers show first.' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'summary',
              type: 'textarea',
              admin: { description: 'One or two lines for cards and menus.' },
            },
            media({ name: 'image', label: 'Main image' }),
            { name: 'body', type: 'richText' },
          ],
        },
        {
          label: 'Related',
          fields: [
            { name: 'vehicles', type: 'relationship', relationTo: 'vehicles', hasMany: true },
            { name: 'pricing', type: 'relationship', relationTo: 'pricing', hasMany: true },
            {
              name: 'faqs',
              label: 'FAQs',
              type: 'relationship',
              relationTo: 'faqs',
              hasMany: true,
            },
          ],
        },
        seoTab({ defaultSchema: 'Service' }),
      ],
    },
  ],
}

export const Vehicles: CollectionConfig = {
  slug: 'vehicles',
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'class', 'seats', '_status'],
    description:
      'Shown on the Fleet page and in booking forms. Vehicles have no page of their own.',
    ...previewAdmin('vehicles'),
  },
  access: editorial,
  versions: drafts,
  hooks: {
    afterChange: [revalidateDocument('vehicles', 'vehicles')],
    afterDelete: [revalidateOnDelete('vehicles', 'vehicles')],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    slugField({ from: 'name' }),
    {
      name: 'order',
      type: 'number',
      admin: { position: 'sidebar', description: 'Lower numbers show first.' },
    },
    {
      name: 'class',
      type: 'text',
      admin: { description: 'For example: Executive sedan, Luxury SUV, Van.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'seats', label: 'Passenger seats', type: 'number', min: 1, required: true },
        { name: 'luggage', label: 'Large bags', type: 'number', min: 0 },
      ],
    },
    { name: 'summary', type: 'textarea' },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'feature', type: 'text', required: true }],
    },
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
    { name: 'pricing', type: 'relationship', relationTo: 'pricing', hasMany: true },
  ],
}

export const PRICE_MODES = ['onRequest', 'from', 'exact'] as const

export const Pricing: CollectionConfig = {
  slug: 'pricing',
  labels: { singular: 'Price', plural: 'Pricing' },
  admin: {
    group: 'Content',
    useAsTitle: 'label',
    defaultColumns: ['label', 'displayMode', 'amount', 'currency'],
    description: 'Prices are not confirmed yet, so every item defaults to On request.',
  },
  access: reference,
  hooks: { afterChange: [revalidateDocument(null, 'pricing')] },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: { description: 'For example: Airport transfer, sedan.' },
    },
    {
      name: 'displayMode',
      label: 'Show price as',
      type: 'radio',
      required: true,
      defaultValue: 'onRequest',
      options: [
        { value: 'onRequest', label: 'On request' },
        { value: 'from', label: 'From a price' },
        { value: 'exact', label: 'Exact price' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'amount',
          type: 'number',
          min: 0,
          admin: { condition: (_, s) => s?.displayMode !== 'onRequest' },
          validate: (value: unknown, { siblingData }: { siblingData: { displayMode?: string } }) =>
            siblingData?.displayMode === 'onRequest' ||
            typeof value === 'number' ||
            'Enter the price.',
        },
        {
          name: 'currency',
          type: 'select',
          options: ['USD', 'EUR', 'GBP', 'LKR'].map((c) => ({ value: c, label: c })),
          admin: { condition: (_, s) => s?.displayMode !== 'onRequest' },
          validate: (value: unknown, { siblingData }: { siblingData: { displayMode?: string } }) =>
            siblingData?.displayMode === 'onRequest' || Boolean(value) || 'Choose a currency.',
        },
      ],
    },
    {
      name: 'unit',
      type: 'text',
      admin: {
        condition: (_, s) => s?.displayMode !== 'onRequest',
        description: 'For example: per transfer, per day.',
      },
    },
    { name: 'notes', type: 'textarea' },
  ],
}

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: {
    group: 'Content',
    useAsTitle: 'question',
    defaultColumns: ['question', 'topic', 'order'],
  },
  access: reference,
  hooks: { afterChange: [revalidateDocument(null, 'faqs')] },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'richText', required: true },
    {
      name: 'topic',
      type: 'text',
      index: true,
      admin: { description: 'FAQs with the same topic are grouped.' },
    },
    { name: 'order', type: 'number' },
  ],
}

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { group: 'Content', useAsTitle: 'name', defaultColumns: ['name', 'rating', 'updatedAt'] },
  access: reference,
  hooks: { afterChange: [revalidateDocument(null, 'testimonials')] },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'name', label: 'Guest name', type: 'text', required: true },
    { name: 'role', type: 'text', admin: { description: 'For example: Honeymoon guest, UK.' } },
    { name: 'rating', type: 'number', min: 1, max: 5 },
    media({ name: 'photo' }),
    {
      name: 'verified',
      label: 'This is a real guest review',
      type: 'checkbox',
      admin: {
        description: 'Only real reviews may be shown with review stars in Google (schema).',
      },
    },
  ],
}

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: { group: 'Settings', useAsTitle: 'from', defaultColumns: ['from', 'type', 'updatedAt'] },
  access: reference,
  hooks: { afterChange: [revalidateDocument(null, 'redirects')] },
  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Old address on this site, starting with /.' },
      validate: (value: unknown) =>
        (typeof value === 'string' && /^\/[^\s]*$/.test(value) && !value.startsWith('//')) ||
        'Start with / and use no spaces.',
    },
    {
      ...link({
        name: 'to',
        label: 'Send visitors to',
        relationTo: LINKABLE,
        withLabel: false,
        required: true,
      }),
    },
    {
      name: 'type',
      type: 'radio',
      defaultValue: '301',
      options: [
        { value: '301', label: 'Permanent (301)' },
        { value: '302', label: 'Temporary (302)' },
      ],
      admin: { layout: 'horizontal' },
    },
  ],
}
