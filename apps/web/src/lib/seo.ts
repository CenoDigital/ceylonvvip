import type { Metadata } from 'next'

import type { Media, SeoDefault, SiteSetting } from '@ceylonvvip/db'

import { getSiteUrl } from './site-url'
import {
  currentLocale,
  DEFAULT_LOCALE,
  LOCALE_TAGS,
  LOCALES,
  localePath,
  type Locale,
} from './i18n'
import { isProductionSite } from './site-env'

const OG_LOCALES: Record<Locale, string> = {
  en: 'en_GB',
  de: 'de_DE',
  fr: 'fr_FR',
  ru: 'ru_RU',
  ar: 'ar_AR',
}

export const absolute = (path: string) =>
  /^https?:\/\//.test(path) ? path : `${getSiteUrl()}${path.startsWith('/') ? '' : '/'}${path}`

export interface SeoFields {
  title?: string | null
  description?: string | null
  image?: unknown
  canonical?: string | null
  noindex?: boolean | null
  nofollow?: boolean | null
}

/**
 * Task 169: a page without its own SEO description uses its hero intro, the sentence
 * that already sums the page up, so every page has a meta description for search results.
 */
export function introOf(layout: unknown): string | undefined {
  if (!Array.isArray(layout)) return undefined
  const hero = layout.find(
    (b): b is { blockType: 'hero'; intro?: unknown } =>
      Boolean(b) && typeof b === 'object' && (b as { blockType?: unknown }).blockType === 'hero',
  )
  return typeof hero?.intro === 'string' && hero.intro.trim() ? hero.intro.trim() : undefined
}

const asMedia = (value: unknown): Media | null =>
  value && typeof value === 'object' && 'url' in value ? (value as Media) : null

function shareImage(media: Media | null) {
  if (!media?.url) return undefined
  const og = media.sizes?.og
  return og?.url
    ? {
        url: absolute(og.url),
        width: og.width ?? 1200,
        height: og.height ?? 630,
        alt: media.alt ?? '',
      }
    : {
        url: absolute(media.url),
        width: media.width ?? undefined,
        height: media.height ?? undefined,
        alt: media.alt ?? '',
      }
}

/**
 * Next.js metadata for a page or service. Title: SEO title, else the document title,
 * through the SEO Defaults template ("%s | CeylonVVIP"). Description: SEO description,
 * else a fallback (like a service summary), else the site default. Share image: SEO
 * image, else the document's main image, else the site default.
 */
export function buildMetadata({
  title,
  path,
  seo,
  fallbackDescription,
  fallbackImage,
  defaults,
  settings,
  isHome = false,
}: {
  title: string
  path: string
  seo?: SeoFields | null
  fallbackDescription?: string | null
  fallbackImage?: unknown
  defaults: SeoDefault
  settings: SiteSetting
  isHome?: boolean
}): Metadata {
  const siteName = settings.siteName || 'CeylonVVIP'
  const pageTitle = seo?.title || title
  const fullTitle =
    isHome && !seo?.title ? siteName : (defaults.titleTemplate || '%s').replace('%s', pageTitle)
  const description =
    seo?.description || fallbackDescription || defaults.defaultDescription || undefined
  const image = shareImage(
    asMedia(seo?.image) ?? asMedia(fallbackImage) ?? asMedia(settings.ogDefault),
  )
  // Each language has its own URL (task 163); the CMS canonical applies to English only.
  const locale = currentLocale()
  const canonical =
    (locale === DEFAULT_LOCALE && seo?.canonical) || absolute(localePath(path, locale))
  const languages = Object.fromEntries([
    ...LOCALES.map((l) => [LOCALE_TAGS[l], absolute(localePath(path, l))]),
    ['x-default', absolute(localePath(path, DEFAULT_LOCALE))],
  ])
  const indexable = isProductionSite() && !seo?.noindex

  return {
    metadataBase: new URL(getSiteUrl()),
    title: { absolute: fullTitle },
    description,
    alternates: { canonical, languages },
    robots: { index: indexable, follow: isProductionSite() && !seo?.nofollow },
    openGraph: {
      type: 'website',
      siteName,
      title: fullTitle,
      description,
      url: canonical,
      locale: OG_LOCALES[locale],
      images: image ? [image] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description,
      images: image ? [image.url] : undefined,
    },
    verification: {
      google: defaults.verification?.google || undefined,
      other: defaults.verification?.bing
        ? { 'msvalidate.01': defaults.verification.bing }
        : undefined,
    },
  }
}
