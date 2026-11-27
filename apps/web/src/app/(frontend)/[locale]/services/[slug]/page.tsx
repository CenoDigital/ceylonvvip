import type { Metadata } from 'next'

import { RenderBlocks } from '@/blocks'
import { RichText, Section } from '@/blocks/shared'
import { SiteChrome } from '@/components/site/SiteChrome'
import { PageSchema } from '@/components/seo/PageSchema'
import { getGlobal, getService, getSlugs } from '@/lib/data'
import { redirectOrNotFound } from '@/lib/redirects'
import { applyLocale } from '@/lib/i18n-server'
import { buildMetadata } from '@/lib/seo'
import { pathFor } from '@/payload/paths'

type Props = { params: Promise<{ locale: string; slug: string }> }

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getSlugs('services').catch(() => [])
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await applyLocale(params)
  const [service, defaults, settings] = await Promise.all([
    getService((await params).slug),
    getGlobal('seo-defaults'),
    getGlobal('site-settings'),
  ])
  if (!service) return {}
  return buildMetadata({
    title: service.title,
    path: pathFor('services', service.slug),
    seo: service.seo,
    fallbackDescription: service.summary,
    fallbackImage: service.image,
    defaults,
    settings,
  })
}

/** A service sales page: its sections, with the body text as a fallback when it has none. */
export default async function ServicePage({ params }: Props) {
  await applyLocale(params)
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return redirectOrNotFound(`/services/${slug}`)
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
      <PageSchema doc={service} kind="service" path={pathFor('services', service.slug)} />
    </SiteChrome>
  )
}
