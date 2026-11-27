import type { MetadataRoute } from 'next'

import config from '@payload-config'
import { getPayload, type Where } from 'payload'

import { LOCALE_TAGS, LOCALES, pathInLocale } from '@/lib/locales'
import { absolute } from '@/lib/seo'
import { isProductionSite } from '@/lib/site-env'
import { pathFor } from '@/payload/paths'

// Built per request from the database, so it is always current (and the Docker build,
// which has no database, never bakes in an empty one).
export const dynamic = 'force-dynamic'

/** Every published page and service, except those marked noindex or left out of the sitemap. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isProductionSite() && process.env.SITEMAP_PREVIEW !== 'true') return []
  const payload = await getPayload({ config })
  const where: Where = {
    and: [
      { _status: { equals: 'published' } },
      // "Not true" must include unset values, which SQL inequality would drop.
      { or: [{ 'seo.noindex': { equals: false } }, { 'seo.noindex': { exists: false } }] },
      {
        or: [
          { 'seo.excludeFromSitemap': { equals: false } },
          { 'seo.excludeFromSitemap': { exists: false } },
        ],
      },
    ],
  }
  const [pages, services] = await Promise.all([
    payload.find({
      collection: 'pages',
      where,
      select: { slug: true, updatedAt: true },
      pagination: false,
      limit: 5000,
    }),
    payload.find({
      collection: 'services',
      where,
      select: { slug: true, updatedAt: true },
      pagination: false,
      limit: 5000,
    }),
  ])
  // Every page in every language, each listing its translations (task 163).
  const entries = [
    ...pages.docs.map((p) => ({
      path: pathFor('pages', p.slug),
      lastModified: p.updatedAt,
      priority: pathFor('pages', p.slug) === '/' ? 1 : 0.7,
    })),
    ...services.docs.map((s) => ({
      path: pathFor('services', s.slug),
      lastModified: s.updatedAt,
      priority: 0.8,
    })),
  ]
  return entries.flatMap(({ path, lastModified, priority }) => {
    const languages = Object.fromEntries(
      LOCALES.map((l) => [LOCALE_TAGS[l], absolute(pathInLocale(path, l))]),
    )
    return LOCALES.map((l) => ({
      url: absolute(pathInLocale(path, l)),
      lastModified,
      priority,
      alternates: { languages },
    }))
  })
}
