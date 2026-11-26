import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import type { Tab } from 'payload'

import { MEDIA_COLLECTION } from './media'

/** Schema.org types an editor can pick, with each collection's default (see the plan's SEO system). */
export const SCHEMA_TYPES = [
  { value: 'WebPage', label: 'Web page' },
  { value: 'AboutPage', label: 'About page' },
  { value: 'ContactPage', label: 'Contact page' },
  { value: 'Service', label: 'Service' },
  { value: 'Product', label: 'Product (vehicle)' },
  { value: 'TouristTrip', label: 'Tour' },
  { value: 'Article', label: 'Article' },
] as const

export type SchemaType = (typeof SCHEMA_TYPES)[number]['value']

/**
 * The SEO tab every routable document gets: snippet preview with character counters,
 * share image, canonical override, robots, sitemap toggle, focus keyword and schema type.
 */
export function seoTab({ defaultSchema = 'WebPage' }: { defaultSchema?: SchemaType } = {}): Tab {
  return {
    name: 'seo',
    label: 'SEO',
    fields: [
      OverviewField({
        titlePath: 'seo.title',
        descriptionPath: 'seo.description',
        imagePath: 'seo.image',
      }),
      MetaTitleField({
        hasGenerateFn: false,
        overrides: {
          admin: {
            description:
              'Shown in Google results. About 50 to 60 characters. Leave empty to use the page title.',
          },
        },
      }),
      MetaDescriptionField({
        hasGenerateFn: false,
        overrides: {
          admin: {
            description: 'About 100 to 150 characters. Leave empty to use the site default.',
          },
        },
      }),
      MetaImageField({
        relationTo: MEDIA_COLLECTION,
        hasGenerateFn: false,
        overrides: {
          admin: {
            description:
              'For social sharing, 1200 by 630. Falls back to the main image, then the site default.',
          },
        },
      }),
      PreviewField({
        hasGenerateFn: false,
        titlePath: 'seo.title',
        descriptionPath: 'seo.description',
      }),
      {
        name: 'canonical',
        label: 'Canonical URL',
        type: 'text',
        admin: { description: 'Only if this content officially lives at another address.' },
      },
      {
        type: 'row',
        fields: [
          { name: 'noindex', label: 'Hide from search engines (noindex)', type: 'checkbox' },
          { name: 'nofollow', label: 'Do not follow links (nofollow)', type: 'checkbox' },
          { name: 'excludeFromSitemap', label: 'Leave out of the sitemap', type: 'checkbox' },
        ],
      },
      {
        name: 'focusKeyword',
        type: 'text',
        admin: { description: 'For your reference only; not shown on the site.' },
      },
      {
        name: 'schemaType',
        label: 'Schema type',
        type: 'select',
        defaultValue: defaultSchema,
        options: SCHEMA_TYPES.map((t) => ({ ...t })),
      },
    ],
  }
}
