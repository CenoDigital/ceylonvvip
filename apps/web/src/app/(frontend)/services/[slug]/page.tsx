import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/blocks'
import { RichText, Section } from '@/blocks/shared'
import { SiteChrome } from '@/components/site/SiteChrome'
import { getService, getSlugs } from '@/lib/data'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getSlugs('services').catch(() => [])
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getService((await params).slug)
  return service
    ? {
        title: service.seo?.title || service.title,
        description: service.seo?.description ?? service.summary ?? undefined,
      }
    : {}
}

/** A service sales page: its sections, with the body text as a fallback when it has none. */
export default async function ServicePage({ params }: Props) {
  const service = await getService((await params).slug)
  if (!service) notFound()
  const hasSections = Boolean(service.layout?.length)
  return (
    <SiteChrome>
      <main id="main">
        {hasSections ? (
          <RenderBlocks blocks={service.layout as never} />
        ) : (
          <Section>
            <h1 className="font-display text-title text-foreground">{service.title}</h1>
            <RichText data={service.body} className="mt-40" />
          </Section>
        )}
      </main>
    </SiteChrome>
  )
}
