import type { CollectionSlug, Field, GroupField } from 'payload'

export const LINK_TYPES = ['internal', 'url', 'phone', 'whatsapp', 'email'] as const
export type LinkType = (typeof LINK_TYPES)[number]

export interface LinkOptions {
  name?: string
  label?: string
  /** Collections an internal link may point to. Without any, internal links are hidden. */
  relationTo?: string[]
  /** Ask for a visible label. Off when the parent supplies its own label. */
  withLabel?: boolean
  required?: boolean
}

const typeLabels: Record<LinkType, string> = {
  internal: 'Page on this site',
  url: 'Web address',
  phone: 'Phone number',
  whatsapp: 'WhatsApp',
  email: 'Email address',
}

/**
 * A link that can point to a page, service or vehicle on the site, an external URL,
 * a phone number, a WhatsApp chat or an email address. Used by cta, menus and blocks.
 */
export function link({
  name = 'link',
  label = 'Link',
  relationTo = [],
  withLabel = true,
  required = false,
}: LinkOptions = {}): GroupField {
  // Every type stays in the schema (so the database enum never needs changing); internal
  // links are only usable once there are collections to link to.
  const types = LINK_TYPES
  const show = (type: LinkType) => (_: unknown, sibling: { type?: string }) =>
    sibling?.type === type

  const fields: Field[] = [
    {
      name: 'type',
      type: 'radio',
      required: true,
      defaultValue: relationTo.length > 0 ? 'internal' : 'url',
      options: types.map((value) => ({ value, label: typeLabels[value] })),
      validate: (value: unknown) =>
        value !== 'internal' ||
        relationTo.length > 0 ||
        'Internal links are not available here yet.',
      admin: { layout: 'horizontal' },
    },
  ]
  if (relationTo.length > 0) {
    fields.push({
      name: 'reference',
      label: 'Page',
      type: 'relationship',
      relationTo: relationTo as CollectionSlug[],
      required,
      admin: { condition: show('internal') },
    })
  }
  fields.push(
    {
      name: 'url',
      label: 'Web address',
      type: 'text',
      required,
      admin: { condition: show('url'), placeholder: 'https://' },
      validate: (value: unknown, { siblingData }: { siblingData: { type?: string } }) => {
        if (siblingData?.type !== 'url' || !value) return true
        return /^(https?:\/\/|\/)/.test(String(value)) || 'Start with https:// or /'
      },
    },
    {
      name: 'phone',
      label: 'Phone number',
      type: 'text',
      required,
      admin: {
        condition: (_, sibling) => sibling?.type === 'phone' || sibling?.type === 'whatsapp',
        description: 'International format, for example +94 77 123 4567.',
      },
      validate: (value: unknown, { siblingData }: { siblingData: { type?: string } }) => {
        if (!['phone', 'whatsapp'].includes(siblingData?.type ?? '') || !value) return true
        return (
          /^\+\d[\d\s-]{6,}$/.test(String(value)) || 'Use international format, starting with +'
        )
      },
    },
    {
      name: 'message',
      label: 'Pre-filled message',
      type: 'textarea',
      admin: { condition: show('whatsapp') },
    },
    {
      name: 'email',
      label: 'Email address',
      type: 'email',
      required,
      admin: { condition: show('email') },
    },
    {
      name: 'newTab',
      label: 'Open in a new tab',
      type: 'checkbox',
      admin: { condition: show('url') },
    },
  )
  if (withLabel) {
    fields.unshift({ name: 'label', type: 'text', required })
  }

  return { name, label, type: 'group', fields }
}
