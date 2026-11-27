import type { CollectionConfig } from 'payload'

import { admins, anyone, editors } from '../access'
import { revalidateDocument } from '../hooks/revalidate'

/*
 * Site translations (task 163). Each row is one English text from the site (a heading,
 * a paragraph, a button label) with its German, French, Russian and Arabic versions.
 * Pages are written once in English; when a visitor reads /de, /fr, /ru or /ar, every
 * text with a translation here is shown in that language, and anything without one
 * stays in English. Editors fix a translation by editing its row.
 */
export const Translations: CollectionConfig = {
  slug: 'translations',
  admin: {
    group: 'Settings',
    useAsTitle: 'source',
    defaultColumns: ['source', 'de', 'fr', 'updatedAt'],
    listSearchableFields: ['source', 'de', 'fr', 'ru', 'ar'],
    description:
      'Each row is an English text from the site and its translations. Leave a language empty to show English.',
  },
  access: { read: anyone, create: editors, update: editors, delete: admins },
  hooks: { afterChange: [revalidateDocument(null, 'translations')] },
  fields: [
    {
      name: 'source',
      label: 'English',
      type: 'textarea',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Exactly as it appears in English on the site.' },
    },
    { name: 'de', label: 'German', type: 'textarea' },
    { name: 'fr', label: 'French', type: 'textarea' },
    { name: 'ru', label: 'Russian', type: 'textarea' },
    { name: 'ar', label: 'Arabic', type: 'textarea', admin: { rtl: true } },
  ],
}
