import 'server-only'

import { notFound } from 'next/navigation'

import { isLocale, setRequestLocale, type Locale } from './i18n'

/** Reads [locale] from route params, rejects unknown ones and sets it for this request. */
export async function applyLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  return locale
}
