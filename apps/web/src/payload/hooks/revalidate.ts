import { revalidatePath, revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

import { pathFor, type RoutableCollection } from '../paths'

// On publish, rebuild only the pages that show this document (on-demand ISR).
// Outside a Next.js request (migrations, scripts, tests) there is nothing to revalidate.
function safely(fn: () => void) {
  try {
    fn()
  } catch {
    // No Next.js request scope here.
  }
}

/** Revalidate the document's own page and anything tagged with its collection. */
export const revalidateDocument =
  (collection: RoutableCollection | null, tag: string): CollectionAfterChangeHook =>
  ({ doc, previousDoc, context }) => {
    if (context?.disableRevalidate) return doc
    const published = doc?._status === undefined || doc._status === 'published'
    const wasPublished = previousDoc?._status === 'published'
    if (!published && !wasPublished) return doc
    safely(() => {
      revalidateTag(tag, 'max')
      if (collection) {
        revalidatePath(pathFor(collection, doc?.slug))
        if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
          revalidatePath(pathFor(collection, previousDoc.slug))
        }
      }
    })
    return doc
  }

export const revalidateOnDelete =
  (collection: RoutableCollection | null, tag: string): CollectionAfterDeleteHook =>
  ({ doc }) => {
    safely(() => {
      revalidateTag(tag, 'max')
      if (collection) revalidatePath(pathFor(collection, doc?.slug))
    })
    return doc
  }

/** Globals appear on every page (header, footer, settings). */
export const revalidateGlobal =
  (tag: string): GlobalAfterChangeHook =>
  ({ doc }) => {
    safely(() => revalidateTag(tag, 'max'))
    return doc
  }
