import type { CollectionConfig } from 'payload'

import { blurDataURL } from '../../lib/blur'

import { anyone, editors } from '../access'

/** Images and files. Stored on Cloudflare R2 when S3_* is configured, else on local disk. */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content', defaultColumns: ['filename', 'alt', 'updatedAt'] },
  access: { read: anyone, create: editors, update: editors, delete: editors },
  hooks: {
    // A blurred preview of each new or replaced photo (task 166).
    beforeChange: [
      async ({ data, req }) => {
        const file = req.file
        if (file?.data && file.mimetype?.startsWith('image/') && !file.mimetype.includes('svg')) {
          try {
            data.blurDataURL = await blurDataURL(file.data)
          } catch (error) {
            req.payload.logger.warn({ err: error }, 'Could not make a blurred preview.')
          }
        }
        return data
      },
    ],
  },
  upload: {
    // Local disk only (no S3_*). An absolute MEDIA_DIR keeps the seed and the standalone
    // server (which runs from its own folder) looking in the same place, as in CI.
    staticDir: process.env.MEDIA_DIR || 'media',
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
      // Made automatically on upload; shown blurred while the photo loads.
      name: 'blurDataURL',
      type: 'text',
      admin: { hidden: true },
    },
    {
      name: 'credit',
      type: 'text',
      admin: { description: 'Photographer or source, if it must be credited.' },
    },
  ],
}
