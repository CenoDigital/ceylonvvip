import { localePath } from '@/lib/i18n'
import { pathFor } from '@/payload/paths'

/** The shape of the cms-schema `link` group as stored by Payload. */
export interface CmsLink {
  type?: 'internal' | 'url' | 'phone' | 'whatsapp' | 'email' | null
  label?: string | null
  reference?: { relationTo: string; value: unknown } | null
  url?: string | null
  phone?: string | null
  message?: string | null
  email?: string | null
  newTab?: boolean | null
}

export interface ResolvedLink {
  href: string
  external: boolean
}

const digits = (phone: string) => phone.replace(/[^\d+]/g, '')

/** WhatsApp click-to-chat URL, with an optional pre-filled message. */
export function whatsappHref(phone: string, message?: string | null): string {
  const number = digits(phone).replace(/^\+/, '')
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}

/** Turns a CMS link into an href. Returns null when the link is incomplete. */
export function resolveLink(link: CmsLink | null | undefined): ResolvedLink | null {
  if (!link?.type) return null
  switch (link.type) {
    case 'internal': {
      const ref = link.reference
      const doc =
        ref && typeof ref.value === 'object' ? (ref.value as { slug?: string | null }) : null
      if (!ref || !doc) return null
      const collection = ref.relationTo === 'services' ? 'services' : 'pages'
      return { href: localePath(pathFor(collection, doc.slug)), external: false }
    }
    case 'url':
      return link.url
        ? {
            // Site paths like /fleet follow the visitor's language; anchors and URLs stay.
            href: link.url.startsWith('/') ? localePath(link.url) : link.url,
            external: Boolean(link.newTab) || /^https?:/.test(link.url),
          }
        : null
    case 'phone':
      return link.phone ? { href: `tel:${digits(link.phone)}`, external: false } : null
    case 'whatsapp':
      return link.phone ? { href: whatsappHref(link.phone, link.message), external: true } : null
    case 'email':
      return link.email ? { href: `mailto:${link.email}`, external: false } : null
  }
}

/** Props for an <a> from a CMS link: href, plus target and rel for external ones. */
export function linkProps(link: CmsLink | null | undefined) {
  const resolved = resolveLink(link)
  if (!resolved) return null
  return resolved.external
    ? { href: resolved.href, target: '_blank', rel: 'noopener noreferrer' }
    : { href: resolved.href }
}
