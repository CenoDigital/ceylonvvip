import { notFound } from 'next/navigation'

import { isProductionSite } from '@/lib/site-env'

import { Gallery } from './Gallery'

// Every Prestige component with Figma's sample content, for design review and the
// visual regression tests at 360, 390, 768, 1024 and 1440. Never shown on the live site;
// CI, which tests the production build, opts in with UI_GALLERY=true.
export const dynamic = 'force-dynamic'

export const metadata = { title: 'Components', robots: { index: false, follow: false } }

export default function ComponentsPage() {
  if (isProductionSite() && process.env.UI_GALLERY !== 'true') notFound()
  return <Gallery />
}
