import { revalidatePath, revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

import { LOCALES } from '@/lib/locales'
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
        revalidatePath('/sitemap.xml')
        // Every language version of the page (task 163); /en is the internal English path.
        for (const l of LOCALES) {
          revalidatePath(`/${l}${pathFor(collection, doc?.slug)}`.replace(/\/$/, ''))
          if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
            revalidatePath(`/${l}${pathFor(collection, previousDoc.slug)}`.replace(/\/$/, ''))
          }
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
