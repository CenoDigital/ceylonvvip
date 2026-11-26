import type { Metadata } from 'next'

import type { Media, SeoDefault, SiteSetting } from '@ceylonvvip/db'

import { isProductionSite } from './site-env'

/** The public origin, from NEXT_PUBLIC_SERVER_URL (set per environment in Coolify). */
export const siteUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(
  /\/$/,
  '',
)

export const absolute = (path: string) =>
  /^https?:\/\//.test(path) ? path : `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}`

export interface SeoFields {
  title?: string | null
  description?: string | null
  image?: unknown
  canonical?: string | null
  noindex?: boolean | null
  nofollow?: boolean | null
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
  const canonical = seo?.canonical || absolute(path)
  const indexable = isProductionSite() && !seo?.noindex

  return {
    metadataBase: new URL(siteUrl),
    title: { absolute: fullTitle },
    description,
    alternates: { canonical },
    robots: { index: indexable, follow: isProductionSite() && !seo?.nofollow },
    openGraph: {
      type: 'website',
      siteName,
      title: fullTitle,
      description,
      url: canonical,
      locale: 'en_GB',
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
