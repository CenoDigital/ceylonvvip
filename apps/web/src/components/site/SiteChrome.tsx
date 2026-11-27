import type { ReactNode } from 'react'

import { FloatConcierge, SiteFooter, type FooterColumn, type NavLink } from '@ceylonvvip/ui-brand'

import { getGlobal, t } from '@/lib/data'
import { localePath } from '@/lib/i18n'
import { linkProps, resolveLink, whatsappHref, type CmsLink } from '@/lib/links'

import { Analytics } from './Analytics'
import { Motion } from './Motion'
import { SmoothScroll } from './SmoothScroll'
import { Header, type HeaderData } from './Header'

const toNav = (
  label: string | null | undefined,
  link: CmsLink | null | undefined,
): NavLink | null => {
  const resolved = resolveLink(link)
  return label && resolved ? { label, href: resolved.href } : null
}

const present = <T,>(x: T | null | undefined): x is T => Boolean(x)

/**
 * Header, footer, mobile bar and concierge button, built entirely from the Header,
 * Footer, Mobile Action Bar, Contact & Business and Site Settings globals.
 */
export async function SiteChrome({ children }: { children: ReactNode }) {
  const [header, footer, bar, contact, settings, seo] = await Promise.all([
    getGlobal('header'),
    getGlobal('footer'),
    getGlobal('mobile-action-bar'),
    getGlobal('contact-business'),
    getGlobal('site-settings'),
    getGlobal('seo-defaults'),
  ])

  const nav = (header.navigation ?? []).map((item) => {
    const children = (item.children ?? []).map((c) => toNav(c.link?.label, c.link)).filter(present)
    // A dropdown links to its first item on desktop; the mobile menu lists its items.
    const self =
      item.kind === 'dropdown'
        ? children[0]
          ? { label: item.label, href: children[0].href }
          : null
        : toNav(item.label, item.link)
    return {
      side: item.side ?? 'left',
      self,
      children: item.kind === 'dropdown' ? children : self ? [self] : [],
    }
  })

  const cta = header.ctas?.[0]?.cta
  const ctaLink = cta ? resolveLink(cta.link) : null
  const whatsapp = contact.whatsapp ? whatsappHref(contact.whatsapp) : undefined
  const phone = contact.phones?.[0]?.number

  const data: HeaderData = {
    siteName: settings.siteName ?? 'CeylonVVIP',
    left: nav
      .filter((n) => n.side === 'left')
      .map((n) => n.self)
      .filter(present),
    right: nav
      .filter((n) => n.side === 'right')
      .map((n) => n.self)
      .filter(present),
    all: nav.flatMap((n) => n.children),
    concierge:
      cta?.label && ctaLink
        ? { label: cta.label, href: ctaLink.href, external: ctaLink.external }
        : undefined,
    language: settings.translate?.enabled ? 'EN' : undefined,
    languageLabel: await t('Language'),
    homeHref: localePath('/'),
    menuNote: [contact.availability, phone].filter(Boolean).join(', ') || undefined,
    bar: (bar.buttons ?? [])
      .map((b) => {
        if (b.action === 'menu') return { label: b.label, icon: b.icon ?? undefined, menu: true }
        const href = resolveLink(b.link)?.href
        return href ? { label: b.label, icon: b.icon ?? undefined, href } : null
      })
      .filter(present),
  }

  const address = contact.address
  const contactColumn: FooterColumn = {
    heading: footer.contactHeading ?? '',
    items: [
      ...[address?.street, address?.city, address?.country]
        .filter(Boolean)
        .map((label) => ({ label: label as string })),
      ...(contact.availability || phone ? [{ label: '' }] : []),
      ...(contact.availability ? [{ label: contact.availability }] : []),
      ...(phone ? [{ label: phone, href: `tel:${phone.replace(/[^\d+]/g, '')}` }] : []),
    ],
  }

  const columns: FooterColumn[] = [
    ...(footer.columns ?? []).map((col, i) => ({
      heading: col.heading,
      // Figma's mobile footer keeps the first column and Contact only.
      desktopOnly: i > 0,
      items: (col.links ?? [])
        .map((l) => toNav(l.link?.label, l.link))
        .filter(present)
        .map((l) => ({ label: l.label, href: l.href })),
    })),
    ...(contactColumn.heading && contactColumn.items.length ? [contactColumn] : []),
  ]

  const year = new Date().getFullYear()
  return (
    <>
      <Header data={data} />
      {children}
      <SiteFooter
        tagline={footer.tagline ?? undefined}
        columns={columns}
        copyright={footer.copyright?.replace('{year}', String(year)) ?? undefined}
        legal={(footer.legalLinks ?? []).map((l) => toNav(l.link?.label, l.link)).filter(present)}
        credit={
          footer.credit?.label && footer.credit.url
            ? { label: footer.credit.label, href: footer.credit.url }
            : undefined
        }
      />
      <Motion />
      <SmoothScroll />
      <Analytics ga4={seo.analytics?.ga4} metaPixel={seo.analytics?.metaPixel} />
      {whatsapp ? <FloatConcierge href={whatsapp} label={cta?.label ?? undefined} /> : null}
    </>
  )
}

export { linkProps }
