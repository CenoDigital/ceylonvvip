import type { Metadata } from 'next'
import { Jost, Noto_Kufi_Arabic, Outfit } from 'next/font/google'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { isLocale, isRtl, LOCALE_TAGS, LOCALES, setRequestLocale } from '@/lib/i18n'
import { motionBootScript } from '@/lib/motion'

import '../globals.css'

// Outfit is the one typeface (Figma font/display and font/text): Light, Regular, Medium.
// Self-hosted by next/font, subset to Latin, swapped in without layout shift.
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-outfit',
})
// Outfit has no Cyrillic or Arabic letters. Russian falls back to Jost (the same
// geometric family feel) and Arabic to Noto Kufi Arabic; each loads only on its pages.
// Not preloaded (task 169): a preload would fetch them on every page, English included,
// competing with the first photo; the browser fetches them when Russian or Arabic text shows.
const jost = Jost({
  subsets: ['cyrillic'],
  weight: ['300', '400', '500'],
  display: 'swap',
  preload: false,
  variable: '--font-cyrillic',
})
const kufi = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500'],
  display: 'swap',
  preload: false,
  variable: '--font-arabic',
})

export const metadata: Metadata = {
  title: 'CeylonVVIP',
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const fonts = [
    outfit.variable,
    locale === 'ru' ? jost.variable : '',
    locale === 'ar' ? kufi.variable : '',
  ].join(' ')
  return (
    <html
      lang={LOCALE_TAGS[locale]}
      dir={isRtl(locale) ? 'rtl' : 'ltr'}
      className={fonts}
      suppressHydrationWarning
    >
      <head>
        {/* Before the first paint: turns motion on (see lib/motion.ts). */}
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
