/**
 * Where each document lives on the site. Decided 2026-11-27: services at
 * /services/<slug>; vehicles have no pages of their own and appear on /fleet.
 */
export const HOME_SLUG = 'home'

/** Page slugs that would clash with app routes or the services section. */
export const RESERVED_PAGE_SLUGS = [
  'admin',
  'api',
  'next',
  'services',
  'media',
  'sitemap',
  'robots',
]

export type RoutableCollection = 'pages' | 'services' | 'vehicles'

export function pathFor(collection: RoutableCollection, slug?: string | null): string {
  switch (collection) {
    case 'pages':
      return !slug || slug === HOME_SLUG ? '/' : `/${slug}`
    case 'services':
      return `/services/${slug ?? ''}`
    case 'vehicles':
      return '/fleet'
  }
}
