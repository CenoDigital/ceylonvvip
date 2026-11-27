import { cache } from 'react'

/*
 * Languages (task 163). English lives at the root (/fleet); the others under a prefix
 * (/de/fleet). The proxy rewrites unprefixed paths to /en internally, so every page
 * route sits under [locale]. The current locale is request-scoped (React cache), so
 * links and data can read it without passing it through every component.
 */

import { DEFAULT_LOCALE, pathInLocale, type Locale } from './locales'

export * from './locales'

const store = cache(() => ({ locale: DEFAULT_LOCALE as Locale }))

/** Sets the locale for this request (called by the [locale] layout and pages). */
export function setRequestLocale(locale: Locale) {
  store().locale = locale
}

/** The locale of this request; English outside a page render (hooks, scripts). */
export function currentLocale(): Locale {
  try {
    return store().locale
  } catch {
    return DEFAULT_LOCALE
  }
}

/** A site path in a locale (default: this request's): "/fleet" → "/de/fleet". */
export function localePath(path: string, locale: Locale = currentLocale()): string {
  return pathInLocale(path, locale)
}

// Keys that hold identifiers, not text, and are never translated.
const KEEP = new Set([
  'id',
  'slug',
  'url',
  'href',
  'anchor',
  'phone',
  'number',
  'blockType',
  'variant',
  'relationTo',
  'filename',
  'mimeType',
  'type',
  'icon',
  'appearance',
  'anim',
  'bg',
  'pt',
  'pb',
  'mediaType',
  'source',
  'side',
  'kind',
  'action',
  'format',
  'mode',
  'style',
  'direction',
  '_status',
  'email',
])

/**
 * A copy of `value` with every string that has a translation replaced. Walks objects
 * and arrays (CMS documents, Lexical rich text), skipping identifier keys.
 */
export function translateDeep<T>(value: T, map: ReadonlyMap<string, string>): T {
  if (!map.size) return value
  const walk = (v: unknown, key?: string): unknown => {
    if (typeof v === 'string') return key && KEEP.has(key) ? v : (map.get(v) ?? v)
    if (Array.isArray(v)) return v.map((x) => walk(x))
    if (v && typeof v === 'object') {
      const out: Record<string, unknown> = {}
      for (const [k, x] of Object.entries(v)) out[k] = KEEP.has(k) ? x : walk(x, k)
      return out
    }
    return v
  }
  return walk(value) as T
}
