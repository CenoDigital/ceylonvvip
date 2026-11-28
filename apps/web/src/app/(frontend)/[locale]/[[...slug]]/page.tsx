import type { Metadata } from 'next'
import { draftMode } from 'next/headers'

import { RenderBlocks } from '@/blocks'
import { SiteChrome } from '@/components/site/SiteChrome'
import { PageSchema } from '@/components/seo/PageSchema'
import { getGlobal, getPage, getSlugs } from '@/lib/data'
import { redirectOrNotFound } from '@/lib/redirects'
import { applyLocale } from '@/lib/i18n-server'
import { buildMetadata, introOf } from '@/lib/seo'
import { HOME_SLUG, pathFor } from '@/payload/paths'

type Props = { params: Promise<{ locale: string; slug?: string[] }> }

// Pages are built at deploy time and rebuilt on publish (revalidateTag/revalidatePath).
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getSlugs('pages').catch(() => [])
  return slugs.map((slug) => ({ slug: slug === HOME_SLUG ? [] : [slug] }))
}

const slugFrom = (parts?: string[]) => (parts?.length ? parts.join('/') : HOME_SLUG)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await applyLocale(params)
  const slug = slugFrom((await params).slug)
  const [page, defaults, settings] = await Promise.all([
    getPage(slug),
    getGlobal('seo-defaults'),
    getGlobal('site-settings'),
  ])
  if (!page) return {}
  return buildMetadata({
    title: page.title,
    path: pathFor('pages', page.slug),
    seo: page.seo,
    fallbackDescription: introOf(page.layout),
    fallbackImage: page.image,
    defaults,
    settings,
    isHome: slug === HOME_SLUG,
  })
}

export default async function CmsPage({ params }: Props) {
  await applyLocale(params)
  const parts = (await params).slug
  const slug = slugFrom(parts)
  const page = await getPage(slug)
  if (!page) return redirectOrNotFound(`/${parts?.join('/') ?? ''}`)
  const { isEnabled: draft } = await draftMode()
  return (
    <SiteChrome>
      <main id="main" data-draft={draft || undefined}>
        <RenderBlocks blocks={page.layout as never} />
      </main>
      <PageSchema doc={page} kind="page" path={pathFor('pages', page.slug)} />
    </SiteChrome>
  )
}
