import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/blocks'
import { SiteChrome } from '@/components/site/SiteChrome'
import { PageSchema } from '@/components/seo/PageSchema'
import { getGlobal, getPage } from '@/lib/data'
import { buildMetadata } from '@/lib/seo'

/*
 * The services index (task 160): the CMS page with the slug "services", built from
 * blocks like any page, so editors can change it. Each service card opens
 * /services/<slug>.
 */
const SLUG = 'services'

// Rendered on request (data still comes from the tagged cache). Not prerendered: the
// build has no database, so a build-time render would bake in a 404.
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const [page, defaults, settings] = await Promise.all([
    getPage(SLUG),
    getGlobal('seo-defaults'),
    getGlobal('site-settings'),
  ])
  if (!page) return {}
  return buildMetadata({
    title: page.title,
    path: '/services',
    seo: page.seo,
    fallbackImage: page.image,
    defaults,
    settings,
  })
}

export default async function ServicesIndex() {
  const page = await getPage(SLUG)
  if (!page) notFound()
  return (
    <SiteChrome>
      <main id="main">
        <RenderBlocks blocks={page.layout as never} />
      </main>
      <PageSchema doc={page} kind="page" path="/services" />
    </SiteChrome>
  )
}
