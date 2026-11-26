import { slugify } from '@ceylonvvip/core'
import type { TextField } from 'payload'

export interface SlugOptions {
  /** Field the slug is generated from when left empty. */
  from?: string
  /** Slugs that would clash with app routes. */
  reserved?: string[]
}

/** URL slug: generated from the title when empty, lowercase with hyphens, unique. */
export function slugField({ from = 'title', reserved = [] }: SlugOptions = {}): TextField {
  return {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description: 'The address of this page. Filled in from the title if left empty.',
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          const source = typeof value === 'string' && value.trim() ? value : data?.[from]
          return typeof source === 'string' ? slugify(source) : value
        },
      ],
    },
    validate: (value: unknown) => {
      if (typeof value !== 'string' || !value) return 'Add a title or a slug.'
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(value))
        return 'Use lowercase letters, numbers and hyphens.'
      if (reserved.includes(value)) return `"${value}" is used by the site itself. Choose another.`
      return true
    },
  }
}
