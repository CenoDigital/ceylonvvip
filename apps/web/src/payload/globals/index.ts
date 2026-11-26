import { cta, iconOptions, link, media } from '@ceylonvvip/cms-schema'
import type { Field, GlobalConfig, TextFieldSingleValidation } from 'payload'

import { admins, anyone, editors } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'
import { LINKABLE } from '../linkable'

// Every global is public to read (the site renders from it). Editors change content
// globals; admins change settings that affect SEO, tracking or bookings.
const contentAccess = { read: anyone, update: editors }
const settingsAccess = { read: anyone, update: admins }

const linkField = (name = 'link') => link({ name, relationTo: LINKABLE })
const ctaField = (name = 'cta') => cta({ name, relationTo: LINKABLE })

const hex: TextFieldSingleValidation = (value) =>
  !value || /^#[0-9a-f]{6}$/i.test(String(value)) || 'Use a hex colour like #846429'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Settings' },
  access: settingsAccess,
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'CeylonVVIP' },
    {
      name: 'logos',
      type: 'group',
      fields: [
        media({ name: 'light', label: 'Logo for light backgrounds' }),
        media({ name: 'dark', label: 'Logo for dark backgrounds' }),
        media({ name: 'mobile', label: 'Compact logo for mobile' }),
      ],
    },
    {
      name: 'icons',
      type: 'group',
      label: 'Favicon and app icons',
      fields: [
        media({ name: 'favicon', description: 'SVG or 48 by 48 PNG.' }),
        media({
          name: 'appleTouchIcon',
          label: 'Apple touch icon',
          description: '180 by 180 PNG.',
        }),
      ],
    },
    media({
      name: 'ogDefault',
      label: 'Default share image',
      description: '1200 by 630. Used when a page has none.',
    }),
    {
      name: 'brandColour',
      label: 'Brand colour override',
      type: 'text',
      validate: hex,
      admin: { description: 'Leave empty to use the design system colour (bronze #846429).' },
    },
    {
      name: 'translate',
      label: 'Google Translate',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        {
          name: 'languages',
          type: 'select',
          hasMany: true,
          options: [
            { value: 'de', label: 'German' },
            { value: 'fr', label: 'French' },
            { value: 'it', label: 'Italian' },
            { value: 'es', label: 'Spanish' },
            { value: 'ru', label: 'Russian' },
            { value: 'zh-CN', label: 'Chinese (Simplified)' },
            { value: 'ja', label: 'Japanese' },
            { value: 'ar', label: 'Arabic' },
            { value: 'hi', label: 'Hindi' },
            { value: 'nl', label: 'Dutch' },
          ],
          admin: { condition: (_, sibling) => Boolean(sibling?.enabled) },
        },
      ],
    },
  ],
}

export const ContactBusiness: GlobalConfig = {
  slug: 'contact-business',
  label: 'Contact & Business',
  admin: { group: 'Settings' },
  access: contentAccess,
  fields: [
    {
      name: 'whatsapp',
      label: 'WhatsApp number',
      type: 'text',
      required: true,
      admin: {
        description:
          'International format, for example +94 77 123 4567. Used by every WhatsApp button.',
      },
      validate: (v: unknown) =>
        !v || /^\+\d[\d\s-]{6,}$/.test(String(v)) || 'Start with + and the country code',
    },
    {
      name: 'phones',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'number', type: 'text', required: true },
      ],
    },
    {
      name: 'emails',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'email', type: 'email', required: true },
      ],
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'street', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'region', type: 'text' },
        { name: 'postcode', type: 'text' },
        { name: 'country', type: 'text', defaultValue: 'Sri Lanka' },
      ],
    },
    {
      name: 'mapPin',
      label: 'Map pin',
      type: 'group',
      admin: { description: 'From Google Maps: right-click the place and copy the two numbers.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'latitude', type: 'number', min: -90, max: 90 },
            { name: 'longitude', type: 'number', min: -180, max: 180 },
          ],
        },
      ],
    },
    {
      name: 'openingHours',
      type: 'array',
      fields: [
        {
          name: 'days',
          type: 'select',
          hasMany: true,
          required: true,
          options: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => ({ value: d, label: d })),
        },
        { name: 'opens', type: 'text', admin: { placeholder: '08:00' } },
        { name: 'closes', type: 'text', admin: { placeholder: '20:00' } },
        { name: 'allDay', label: 'Open 24 hours', type: 'checkbox' },
      ],
    },
    {
      name: 'social',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            'Instagram',
            'Facebook',
            'TikTok',
            'YouTube',
            'LinkedIn',
            'TripAdvisor',
            'X',
          ].map((p) => ({
            value: p.toLowerCase(),
            label: p,
          })),
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'registeredName',
      label: 'Registered business name',
      type: 'text',
      defaultValue: 'Gainbuild (Pvt) Ltd',
    },
  ],
}

const navLink: Field[] = [
  linkField(),
  { name: 'description', type: 'text', admin: { description: 'Short line shown in dropdowns.' } },
]

export const Header: GlobalConfig = {
  slug: 'header',
  admin: { group: 'Navigation' },
  access: contentAccess,
  fields: [
    {
      name: 'navigation',
      type: 'array',
      fields: [
        {
          name: 'kind',
          type: 'radio',
          defaultValue: 'link',
          options: [
            { value: 'link', label: 'Link' },
            { value: 'dropdown', label: 'Dropdown' },
          ],
          admin: { layout: 'horizontal' },
        },
        { name: 'label', type: 'text', required: true },
        { ...linkField(), admin: { condition: (_, s) => s?.kind === 'link' } },
        {
          name: 'children',
          label: 'Dropdown items',
          type: 'array',
          fields: navLink,
          admin: { condition: (_, s) => s?.kind === 'dropdown' },
        },
      ],
    },
    { name: 'ctas', label: 'Buttons', type: 'array', maxRows: 2, fields: [ctaField()] },
    {
      name: 'announcement',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox' },
        { name: 'text', type: 'text', admin: { condition: (_, s) => Boolean(s?.enabled) } },
        { ...linkField(), admin: { condition: (_, s) => Boolean(s?.enabled) } },
      ],
    },
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: { group: 'Navigation' },
  access: contentAccess,
  fields: [
    {
      name: 'columns',
      type: 'array',
      maxRows: 5,
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'links', type: 'array', fields: [linkField()] },
      ],
    },
    { name: 'legalLinks', type: 'array', fields: [linkField()] },
    { name: 'newsletterText', type: 'textarea' },
    {
      name: 'copyright',
      type: 'text',
      admin: { description: '{year} becomes the current year.' },
    },
  ],
}

export const MobileActionBar: GlobalConfig = {
  slug: 'mobile-action-bar',
  label: 'Mobile Action Bar',
  admin: { group: 'Navigation' },
  access: contentAccess,
  fields: [
    {
      name: 'buttons',
      type: 'array',
      maxRows: 4,
      admin: { description: 'Shown in the sticky bar on phones, in this order.' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'icon', type: 'select', options: iconOptions },
        {
          name: 'action',
          type: 'radio',
          defaultValue: 'link',
          options: [
            { value: 'link', label: 'Link' },
            { value: 'menu', label: 'Open the menu' },
          ],
          admin: { layout: 'horizontal' },
        },
        { ...linkField(), admin: { condition: (_, s) => s?.action === 'link' } },
      ],
    },
  ],
}

export const SeoDefaults: GlobalConfig = {
  slug: 'seo-defaults',
  label: 'SEO Defaults',
  admin: { group: 'Settings' },
  access: settingsAccess,
  fields: [
    {
      name: 'titleTemplate',
      type: 'text',
      required: true,
      defaultValue: '%s | CeylonVVIP',
      admin: { description: '%s is replaced by the page title.' },
    },
    { name: 'defaultDescription', type: 'textarea' },
    {
      name: 'organisation',
      label: 'Organisation schema',
      type: 'group',
      fields: [
        { name: 'legalName', type: 'text' },
        { name: 'businessType', type: 'text', defaultValue: 'TravelAgency' },
        { name: 'priceRange', type: 'text' },
      ],
    },
    {
      name: 'verification',
      type: 'group',
      fields: [
        { name: 'google', label: 'Google Search Console', type: 'text' },
        { name: 'bing', label: 'Bing Webmaster', type: 'text' },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      admin: { description: 'Loaded only after the visitor accepts cookies.' },
      fields: [
        {
          name: 'ga4',
          label: 'GA4 measurement ID',
          type: 'text',
          admin: { placeholder: 'G-XXXXXXXXXX' },
        },
        { name: 'metaPixel', label: 'Meta Pixel ID', type: 'text' },
      ],
    },
  ],
}

export const BOOKING_FIELDS = [
  'service',
  'vehicle',
  'date',
  'time',
  'pickup',
  'dropoff',
  'passengers',
  'luggage',
  'flightNumber',
  'name',
  'email',
  'phone',
  'notes',
] as const

export const BookingSettings: GlobalConfig = {
  slug: 'booking-settings',
  label: 'Booking Settings',
  admin: { group: 'Settings' },
  access: settingsAccess,
  fields: [
    {
      name: 'whatsappTemplate',
      label: 'WhatsApp message template',
      type: 'textarea',
      admin: { description: `Placeholders: ${BOOKING_FIELDS.map((f) => `{${f}}`).join(', ')}.` },
    },
    {
      name: 'successMessage',
      type: 'textarea',
      admin: { description: 'Shown after the form is sent, while WhatsApp opens.' },
    },
    {
      name: 'visibleFields',
      type: 'select',
      hasMany: true,
      defaultValue: [...BOOKING_FIELDS],
      options: BOOKING_FIELDS.map((value) => ({ value, label: value })),
    },
    {
      name: 'requiredFields',
      type: 'select',
      hasMany: true,
      defaultValue: ['service', 'date', 'name', 'phone'],
      options: BOOKING_FIELDS.map((value) => ({ value, label: value })),
    },
  ],
}

// Every global shows on many pages, so a change revalidates everything tagged with it.
export const globals: GlobalConfig[] = [
  SiteSettings,
  ContactBusiness,
  Header,
  Footer,
  MobileActionBar,
  SeoDefaults,
  BookingSettings,
].map((g) => ({
  ...g,
  hooks: {
    ...g.hooks,
    afterChange: [...(g.hooks?.afterChange ?? []), revalidateGlobal(`global:${g.slug}`)],
  },
}))
