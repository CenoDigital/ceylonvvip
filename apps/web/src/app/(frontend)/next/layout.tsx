import { Outfit } from 'next/font/google'
import type { ReactNode } from 'react'

import '../globals.css'

// Root layout for the developer routes under /next (component gallery, preview).
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-outfit',
})

export default function NextToolsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>{children}</body>
    </html>
  )
}
