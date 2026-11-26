import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/blocks'
import { SiteChrome } from '@/components/site/SiteChrome'
import { getPage, getSlugs } from '@/lib/data'
import { HOME_SLUG } from '@/payload/paths'

type Props = { params: Promise<{ slug?: string[] }> }

// Pages are built at deploy time and rebuilt on publish (revalidateTag/revalidatePath).
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getSlugs('pages').catch(() => [])
  return slugs.map((slug) => ({ slug: slug === HOME_SLUG ? [] : [slug] }))
}

const slugFrom = (parts?: string[]) => (parts?.length ? parts.join('/') : HOME_SLUG)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPage(slugFrom((await params).slug))
  // Full SEO metadata (templates, canonical, Open Graph, schema) arrives with task 148.
  return page
    ? { title: page.seo?.title || page.title, description: page.seo?.description ?? undefined }
    : {}
}

export default async function CmsPage({ params }: Props) {
  const slug = slugFrom((await params).slug)
  const page = await getPage(slug)
  if (!page) notFound()
  const { isEnabled: draft } = await draftMode()
  return (
    <SiteChrome>
      <main id="main" data-draft={draft || undefined}>
        <RenderBlocks blocks={page.layout as never} />
      </main>
    </SiteChrome>
  )
}
