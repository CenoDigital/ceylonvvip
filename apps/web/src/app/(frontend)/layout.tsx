import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import type { ReactNode } from 'react'

import './globals.css'

// Outfit is the one typeface (Figma font/display and font/text): Light, Regular, Medium.
// Self-hosted by next/font, subset to Latin, swapped in without layout shift.
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'CeylonVVIP',
}

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>{children}</body>
    </html>
  )
}
