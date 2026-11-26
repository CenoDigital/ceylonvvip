import type { CollectionConfig } from 'payload'

import { anyone, editors } from '../access'

/** Images and files. Stored on Cloudflare R2 when S3_* is configured, else on local disk. */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content', defaultColumns: ['filename', 'alt', 'updatedAt'] },
  access: { read: anyone, create: editors, update: editors, delete: editors },
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    focalPoint: true,
    crop: true,
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 960 },
      { name: 'wide', width: 1920 },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt text',
      type: 'text',
      required: true,
      admin: {
        description:
          'Describe the image for people who cannot see it. Required for accessibility and SEO.',
      },
    },
    { name: 'caption', type: 'text' },
    {
      name: 'credit',
      type: 'text',
      admin: { description: 'Photographer or source, if it must be credited.' },
    },
  ],
}
