import type { CollectionConfig } from 'payload'

import { pathFor, type RoutableCollection } from './paths'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL ?? ''

/** URL the admin opens for Preview and Live Preview: switches on draft mode, then shows the page. */
export function previewURL(collection: RoutableCollection, slug?: string | null): string {
  const params = new URLSearchParams({ path: pathFor(collection, slug) })
  return `${serverURL}/next/preview?${params}`
}

/** Admin options that give a collection Preview and Live Preview at phone and desktop widths. */
export function previewAdmin(
  collection: RoutableCollection,
): NonNullable<CollectionConfig['admin']> {
  return {
    preview: (doc) => previewURL(collection, doc?.slug as string | undefined),
    livePreview: {
      url: ({ data }) => previewURL(collection, data?.slug as string | undefined),
      breakpoints: [
        { name: 'mobile', label: 'Phone', width: 390, height: 844 },
        { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
      ],
    },
  }
}
