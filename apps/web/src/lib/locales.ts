/*
 * Site languages and their URL rules (task 163), with no server-only code, so client
 * components (the language switch) can use them too. See lib/i18n.ts for the
 * request-scoped locale.
 */

export const LOCALES = ['en', 'de', 'fr', 'ru', 'ar'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  ru: 'Русский',
  ar: 'العربية',
}

/** BCP 47 tags for <html lang> and hreflang. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: 'en-GB',
  de: 'de',
  fr: 'fr',
  ru: 'ru',
  ar: 'ar',
}

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (LOCALES as readonly string[]).includes(value)

export const isRtl = (locale: Locale) => locale === 'ar'

/** "/de/fleet" → "/fleet"; paths without a locale prefix are returned as they are. */
export function stripLocale(path: string): string {
  const m = /^\/([a-z]{2})(?=\/|$|\?|#)/.exec(path)
  if (m && isLocale(m[1])) return path.slice(3) || '/'
  return path
}

/** A site path in a given locale: "/fleet" → "/de/fleet"; English stays unprefixed. */
export function pathInLocale(path: string, locale: Locale): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path
  if (/^\/(api|admin|next|_next)(\/|$)/.test(path)) return path
  const clean = stripLocale(path)
  if (locale === DEFAULT_LOCALE) return clean
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}
