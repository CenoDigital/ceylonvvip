import type { MetadataRoute } from 'next'

import config from '@payload-config'
import { getPayload, type Where } from 'payload'

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
  return [
    ...pages.docs.map((p) => ({
      url: absolute(pathFor('pages', p.slug)),
      lastModified: p.updatedAt,
      priority: pathFor('pages', p.slug) === '/' ? 1 : 0.7,
    })),
    ...services.docs.map((s) => ({
      url: absolute(pathFor('services', s.slug)),
      lastModified: s.updatedAt,
      priority: 0.8,
    })),
  ]
}
