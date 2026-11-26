import type { GroupField } from 'payload'

import { iconOptions } from './icons'
import { link } from './link'

/** The two call-to-action styles in Figma: Prestige/Button/Solid and Prestige/Link/Underline. */
export const CTA_APPEARANCES = ['button', 'link'] as const

export interface CtaOptions {
  name?: string
  label?: string
  relationTo?: string[]
  required?: boolean
}

export function cta({
  name = 'cta',
  label = 'Call to action',
  relationTo = [],
  required = false,
}: CtaOptions = {}): GroupField {
  return {
    name,
    label,
    type: 'group',
    fields: [
      { name: 'label', type: 'text', required },
      {
        name: 'appearance',
        type: 'select',
        defaultValue: 'button',
        options: [
          { value: 'button', label: 'Button (solid)' },
          { value: 'link', label: 'Link (underlined)' },
        ],
      },
      { name: 'icon', type: 'select', options: iconOptions },
      { ...link({ relationTo, withLabel: false, required }), label: false },
    ],
  }
}
