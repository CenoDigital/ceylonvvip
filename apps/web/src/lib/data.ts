import 'server-only'

import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { getPayload, type Payload } from 'payload'
import { cache } from 'react'

import type { Config, Page, Service } from '@ceylonvvip/db'

import { HOME_SLUG } from '@/payload/paths'

/*
 * All page data goes through here. Published content is cached and tagged with the
 * same tags the Payload hooks revalidate (pages, services, vehicles, global:<slug>),
 * so a publish rebuilds only what changed. Draft mode (Preview) skips the cache.
 */

const payload = cache((): Promise<Payload> => getPayload({ config }))

async function isDraft() {
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
}

type GlobalSlug = keyof Config['globals']

export function getGlobal<S extends GlobalSlug>(slug: S): Promise<Config['globals'][S]> {
  return unstable_cache(
    async () => (await payload()).findGlobal({ slug, depth: 2 }) as Promise<Config['globals'][S]>,
    ['global', slug],
    { tags: [`global:${slug}`, 'pages', 'services'] },
  )()
}

const DEPTH = 2

async function findBySlug<C extends 'pages' | 'services'>(
  collection: C,
  slug: string,
  draft: boolean,
) {
  const result = await (
    await payload()
  ).find({
    collection,
    where: { slug: { equals: slug } },
    depth: DEPTH,
    limit: 1,
    draft,
    overrideAccess: draft,
  })
  return (result.docs[0] ?? null) as (C extends 'pages' ? Page : Service) | null
}

export async function getPage(slug: string = HOME_SLUG): Promise<Page | null> {
  if (await isDraft()) return findBySlug('pages', slug, true)
  return unstable_cache(() => findBySlug('pages', slug, false), ['page', slug], {
    tags: ['pages', 'vehicles', 'services', 'faqs', 'testimonials', 'pricing', 'forms'],
  })()
}

export async function getService(slug: string): Promise<Service | null> {
  if (await isDraft()) return findBySlug('services', slug, true)
  return unstable_cache(() => findBySlug('services', slug, false), ['service', slug], {
    tags: ['services', 'vehicles', 'faqs', 'pricing'],
  })()
}

/** Published slugs, for static generation. */
export const getSlugs = unstable_cache(
  async (collection: 'pages' | 'services') => {
    const { docs } = await (
      await payload()
    ).find({
      collection,
      where: { _status: { equals: 'published' } },
      select: { slug: true },
      limit: 1000,
      pagination: false,
    })
    return docs.map((d) => d.slug).filter((s): s is string => Boolean(s))
  },
  ['slugs'],
  { tags: ['pages', 'services'] },
)

/** Lists for blocks that show "all published" items, in their set order. */
export const getCollection = unstable_cache(
  async (collection: 'services' | 'vehicles' | 'testimonials' | 'faqs', topic?: string) => {
    const { docs } = await (
      await payload()
    ).find({
      collection,
      where: {
        ...(collection === 'services' || collection === 'vehicles'
          ? { _status: { equals: 'published' } }
          : {}),
        ...(topic ? { topic: { equals: topic } } : {}),
      },
      sort: collection === 'testimonials' ? '-createdAt' : 'order',
      depth: 1,
      limit: 100,
      pagination: false,
    })
    return docs
  },
  ['collection'],
  { tags: ['services', 'vehicles', 'testimonials', 'faqs', 'forms'] },
)

/** The first booking form, used when a Form block does not name one. */
export const getFirstForm = unstable_cache(
  async () => {
    const { docs } = await (
      await payload()
    ).find({ collection: 'forms', sort: 'createdAt', limit: 1, depth: 0 })
    return docs[0] ?? null
  },
  ['first-form'],
  { tags: ['forms'] },
)
