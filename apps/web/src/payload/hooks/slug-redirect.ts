import type { CollectionAfterChangeHook } from 'payload'

import { pathFor, type RoutableCollection } from '../paths'

/**
 * When a published page or service gets a new slug, the old address keeps working:
 * a permanent (301) redirect from the old path to the document is created. Any
 * redirect that starts at the new path is removed, so the new address is never
 * redirected away (no loops).
 */
export const redirectOldSlug =
  (collection: Extract<RoutableCollection, 'pages' | 'services'>): CollectionAfterChangeHook =>
  async ({ doc, previousDoc, req, context }) => {
    if (context?.disableSlugRedirect) return doc
    const was = previousDoc?._status === 'published' ? previousDoc.slug : null
    if (!was || !doc?.slug || was === doc.slug || doc._status !== 'published') return doc

    const from = pathFor(collection, was)
    const to = pathFor(collection, doc.slug)
    const { payload } = req
    await payload.delete({
      collection: 'redirects',
      where: { from: { equals: to } },
      req,
      overrideAccess: true,
    })
    const existing = await payload.find({
      collection: 'redirects',
      where: { from: { equals: from } },
      limit: 1,
      req,
      overrideAccess: true,
    })
    const data = {
      from,
      type: '301' as const,
      to: { type: 'internal' as const, reference: { relationTo: collection, value: doc.id } },
    }
    if (existing.docs[0]) {
      await payload.update({
        collection: 'redirects',
        id: existing.docs[0].id,
        data,
        req,
        overrideAccess: true,
      })
    } else {
      await payload.create({ collection: 'redirects', data, req, overrideAccess: true })
    }
    payload.logger.info(`Slug changed: ${from} now redirects to ${to}`)
    return doc
  }
