import Link from 'next/link'

import type { Faq, Pricing, Service, Testimonial, Vehicle } from '@ceylonvvip/db'
import {
  Icon,
  Enquiry,
  FaqRow,
  Feature,
  FeatureSignature,
  IndexRow,
  NextLink,
  PageHero,
  RouteRow,
  Spec,
  Step,
  cn,
} from '@ceylonvvip/ui-brand'

import { getCollection, getGlobal } from '@/lib/data'
import { resolveLink } from '@/lib/links'
import { pathFor } from '@/payload/paths'

import { BookingBlock } from './BookingBlock'
import { FleetCarousel } from './FleetCarousel'
import { CmsImage, Cta, Header, RichText, Section, asMedia, type BlockHeader } from './shared'

/* One renderer per CMS block (see src/payload/blocks). Variants follow Figma. */

type Block = { blockType: string; id?: string | null } & Record<string, unknown>

const docs = <T,>(value: unknown): T[] =>
  Array.isArray(value) ? value.filter((v): v is T => Boolean(v) && typeof v === 'object') : []

async function itemsFor<T>(
  block: Block,
  collection: 'services' | 'vehicles' | 'testimonials',
): Promise<T[]> {
  if (block.source === 'chosen') return docs<T>(block.items)
  return (await getCollection(collection)) as T[]
}

const formatPrice = (p: Pricing) =>
  p.displayMode === 'onRequest' || p.amount == null
    ? null
    : `${p.displayMode === 'from' ? 'From ' : ''}${p.currency ?? ''} ${p.amount.toLocaleString('en')}${p.unit ? ` ${p.unit}` : ''}`.trim()

async function HeroBlockView({ block, first }: { block: Block; first: boolean }) {
  const ctas = docs<{ cta?: Parameters<typeof Cta>[0]['cta'] }>(block.ctas)
  const action = ctas.length ? (
    <div className="flex flex-wrap items-center gap-24 lg:gap-40" data-hero-action>
      {ctas.map((c, i) => (
        <Cta key={i} cta={c.cta} />
      ))}
    </div>
  ) : undefined
  const image =
    block.mediaType === 'image' && asMedia(block.image) ? (
      // Figma: Home photo 1440 by 820 with a caption row; page photos 1440 by 760.
      <figure>
        <div
          className={cn(
            'relative aspect-[390/440] w-full overflow-hidden',
            block.variant === 'home' ? 'lg:aspect-[1440/820]' : 'lg:aspect-[1440/760]',
          )}
        >
          <CmsImage media={block.image} sizes="100vw" priority={first} />
        </div>
        {block.variant === 'home' && block.caption ? (
          <figcaption className="flex justify-between gap-24 px-24 pt-20 text-small text-muted-foreground lg:px-64">
            <span>{String(block.caption)}</span>
            <span aria-hidden className="hidden lg:inline">
              Scroll
            </span>
          </figcaption>
        ) : null}
      </figure>
    ) : null
  const Heading = first ? 'h1' : 'h2'
  // The preset picked in the CMS; heroes default to their own intro.
  const anim = (block.settings as { anim?: string | null } | undefined)?.anim || 'hero-intro'
  const animate = anim === 'none' ? undefined : anim

  if (block.variant === 'home') {
    return (
      <section data-animate={animate}>
        {/* Figma 01 Home / Hero: centred, D/Hero 120 in 1100px, lead 520px, 40/40/48 gaps. */}
        <div className="flex flex-col items-center px-24 pt-72 pb-48 text-center lg:px-64 lg:pt-136 lg:pb-96">
          {block.eyebrow ? (
            <p className="text-label-caps text-brand">{String(block.eyebrow)}</p>
          ) : null}
          <Heading className="mt-24 max-w-1100 font-display text-hero whitespace-pre-line text-foreground lg:mt-40">
            {String(block.heading ?? '')}
          </Heading>
          {block.intro ? (
            <p className="mt-24 max-w-520 text-lead text-muted-foreground lg:mt-40">
              {String(block.intro)}
            </p>
          ) : null}
          {action ? <div className="mt-36 lg:mt-48">{action}</div> : null}
        </div>
        {image}
      </section>
    )
  }
  return (
    <section data-animate={animate}>
      <PageHero
        label={block.eyebrow ? String(block.eyebrow) : undefined}
        title={String(block.heading ?? '')}
        text={block.intro ? String(block.intro) : undefined}
        action={action}
      />
      {image}
    </section>
  )
}

function RichTextView({ block }: { block: Block }) {
  const header = block.header as BlockHeader
  if (block.variant === 'statement') {
    return (
      // Figma Manifesto: centred H1 statement (1000px) with spaced labels below. The
      // eyebrow field holds the labels, separated by commas.
      <Section
        settings={block.settings as never}
        className="flex flex-col items-center gap-36 text-center lg:gap-56"
      >
        <RichText
          data={block.content}
          className="max-w-1000 font-display text-h1 text-foreground [&_p+p]:mt-28"
        />
        {header?.eyebrow ? (
          <p className="flex flex-wrap justify-center gap-x-72 gap-y-12 text-label-caps text-brand">
            {header.eyebrow.split(',').map((word) => (
              <span key={word}>{word.trim()}</span>
            ))}
          </p>
        ) : null}
      </Section>
    )
  }
  // Figma "In detail" and "Story": header in a 420px column, lead text beside it, and
  // optionally "Questions guests ask" with open FAQ rows under the text.
  const faqs = docs<Faq>(block.faqs)
  return (
    <Section settings={block.settings as never} className="border-t border-border">
      <div className="flex flex-col gap-32 lg:flex-row lg:items-start lg:gap-96">
        <Header header={header} className="lg:w-420 lg:shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col gap-32 lg:gap-40">
          <RichText
            data={block.content}
            className="max-w-none text-body lg:text-lead [&_p+p]:mt-16"
          />
          {faqs.length ? (
            <div className="flex flex-col gap-8">
              {block.faqLabel ? (
                <p className="text-label-caps text-brand">{String(block.faqLabel)}</p>
              ) : null}
              <div>
                {faqs.map((f) => (
                  <FaqRow
                    key={f.id}
                    question={f.question}
                    answer={<RichText data={f.answer} />}
                    open
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  )
}

function RouteListView({ block }: { block: Block }) {
  const rows = docs<{ id?: string; name: string; note?: string | null }>(block.items)
  return (
    <Section settings={block.settings as never}>
      <div className="flex flex-col gap-32 lg:flex-row lg:items-start lg:gap-96">
        <Header header={block.header as BlockHeader} className="lg:w-420 lg:shrink-0" />
        <div className="min-w-0 flex-1">
          <ul className="border-b border-border">
            {rows.map((r, i) => (
              <RouteRow key={r.id ?? i} route={r.name} note={r.note ?? undefined} />
            ))}
          </ul>
          {block.footnote ? (
            <p className="mt-8 text-small text-muted-foreground">{String(block.footnote)}</p>
          ) : null}
        </div>
      </div>
    </Section>
  )
}

async function ServicesGridView({ block }: { block: Block }) {
  const services = await itemsFor<Service>(block, 'services')
  if (block.variant === 'cards') {
    // Services page: every service as a photo card, each opening its own page.
    return (
      <Section settings={block.settings as never}>
        <Header header={block.header as BlockHeader} className="mb-40 lg:mb-72" />
        <ul className="grid gap-x-32 gap-y-56 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-48 lg:gap-y-80">
          {services.map((s, i) => (
            <li key={s.id} data-animate-item>
              <Link href={pathFor('services', s.slug)} className="group flex flex-col gap-24">
                <div className="relative aspect-[4/5] overflow-hidden bg-placeholder">
                  <CmsImage
                    media={s.image}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                </div>
                <div className="flex items-start gap-20 border-t border-border pt-20">
                  <span className="text-label-caps text-brand tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-8">
                    <span className="font-display text-h3 text-foreground">{s.title}</span>
                    {s.summary ? (
                      <span className="text-small text-muted-foreground">{s.summary}</span>
                    ) : null}
                  </span>
                  <Icon
                    name="arrow-up-right"
                    size={20}
                    className="mt-4 shrink-0 transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 motion-reduce:transition-none"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    )
  }
  return (
    <Section settings={block.settings as never}>
      <Header header={block.header as BlockHeader} className="mb-40 lg:mb-72" />
      <div className="border-b border-border">
        {services.map((s, i) => (
          <IndexRow
            key={s.id}
            number={String(i + 1).padStart(2, '0')}
            title={s.title}
            note={s.summary ?? undefined}
            href={pathFor('services', s.slug)}
          />
        ))}
      </div>
    </Section>
  )
}

/** Figma section header with its action link at the right (Fleet, Destinations). */
function HeaderRow({ block }: { block: Block }) {
  return (
    <div className="flex flex-col items-start gap-24 lg:flex-row lg:items-end lg:justify-between">
      <Header header={block.header as BlockHeader} />
      <Cta cta={block.cta as never} />
    </div>
  )
}

async function VehicleShowcaseView({ block }: { block: Block }) {
  const vehicles = await itemsFor<Vehicle>(block, 'vehicles')
  const specs = block.variant === 'specs'
  if (!specs) {
    // Figma 01 Home / Fleet: one vehicle at a time.
    const slides = vehicles.map((v) => {
      const m = asMedia(docs<unknown>(v.gallery)[0])
      return {
        id: v.id,
        name: v.name,
        summary: v.summary,
        image: m?.url
          ? { url: m.url, alt: m.alt ?? v.name, focalX: m.focalX, focalY: m.focalY }
          : null,
      }
    })
    return (
      <Section settings={block.settings as never} className="flex flex-col gap-28 lg:gap-48">
        <HeaderRow block={block} />
        <FleetCarousel vehicles={slides} />
      </Section>
    )
  }
  // Figma 08 Fleet / Vehicles: per vehicle a 680px photo, then "01 of 05" and the name in
  // a 420px column beside four specs, then the block's enquiry link.
  const SPEC_LABELS = [
    ['bestFor', 'Best for'],
    ['guests', 'Guests'],
    ['luggage', 'Luggage'],
    ['colours', 'Colours'],
  ] as const
  return (
    <Section settings={block.settings as never} className="flex flex-col gap-96 lg:gap-120">
      <Header header={block.header as BlockHeader} />
      {vehicles.map((v, i) => {
        const photo = docs<unknown>(v.gallery)[0]
        const specList = SPEC_LABELS.filter(([key]) => v.specs?.[key])
        return (
          <article key={v.id} className="flex flex-col gap-28 lg:gap-36">
            <div className="relative aspect-[342/260] w-full overflow-hidden bg-placeholder lg:aspect-auto lg:h-680">
              <CmsImage media={photo} sizes="(min-width: 1024px) 1312px, 100vw" />
            </div>
            <div className="flex flex-col gap-28 lg:flex-row lg:gap-48">
              <div className="flex flex-col gap-12 lg:w-420 lg:shrink-0">
                <p className="text-small text-brand">
                  {String(i + 1).padStart(2, '0')} of {String(vehicles.length).padStart(2, '0')}
                </p>
                <h3 className="font-display text-h2 text-foreground">{v.name}</h3>
              </div>
              {specList.length ? (
                <dl className="grid flex-1 grid-cols-2 gap-24 lg:grid-cols-4 lg:gap-32">
                  {specList.map(([key, label]) => (
                    <Spec key={key} label={label} value={v.specs?.[key] ?? ''} />
                  ))}
                </dl>
              ) : null}
            </div>
            <Cta cta={block.cta as never} className="self-start" />
          </article>
        )
      })}
    </Section>
  )
}

async function FleetComparisonView({ block }: { block: Block }) {
  const vehicles = await itemsFor<Vehicle>(block, 'vehicles')
  const compare = (block.compare as string[] | undefined) ?? ['class', 'seats', 'luggage']
  const labels: Record<string, string> = {
    class: 'Class',
    seats: 'Guests',
    luggage: 'Bags',
    features: 'On board',
  }
  const value = (v: Vehicle, key: string) =>
    key === 'features'
      ? (v.features ?? []).map((f) => f.feature).join(', ')
      : String(v[key as keyof Vehicle] ?? '')
  return (
    <Section settings={block.settings as never}>
      <Header header={block.header as BlockHeader} className="mb-40" />
      <div className="overflow-x-auto">
        <table className="w-full min-w-600 text-left text-small">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="py-16 pr-24 text-label-caps text-muted-foreground" />
              {compare.map((k) => (
                <th
                  key={k}
                  scope="col"
                  className="py-16 pr-24 text-label-caps text-muted-foreground"
                >
                  {labels[k]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id} className="border-b border-border">
                <th scope="row" className="py-16 pr-24 text-h4 font-light text-foreground">
                  {v.name}
                </th>
                {compare.map((k) => (
                  <td key={k} className="py-16 pr-24 text-foreground">
                    {value(v, k)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}

function FeatureListView({ block }: { block: Block }) {
  const items = docs<{
    id?: string
    label?: string | null
    title: string
    text?: string | null
    image?: unknown
    cta?: unknown
  }>(block.items)
  const variant = (block.variant as 'large' | 'small' | 'signature' | 'title') ?? 'large'
  if (variant === 'signature') {
    return (
      <Section settings={block.settings as never} bleed className="flex flex-col gap-96 lg:gap-160">
        <Header header={block.header as BlockHeader} className="px-24 lg:px-64" />
        {items.map((item, i) => (
          <FeatureSignature
            key={item.id ?? i}
            imageSide={i % 2 ? 'right' : 'left'}
            label={item.label ?? undefined}
            title={item.title}
            text={item.text ?? undefined}
            image={<CmsImage media={item.image} sizes="(min-width: 1024px) 50vw, 100vw" />}
            action={<Cta cta={item.cta as never} />}
          />
        ))}
      </Section>
    )
  }
  const cols =
    variant === 'small'
      ? 'lg:grid-cols-4'
      : variant === 'title'
        ? 'grid-cols-2 lg:grid-cols-5'
        : 'lg:grid-cols-3'
  return (
    <Section settings={block.settings as never}>
      <Header header={block.header as BlockHeader} className="mb-32 lg:mb-56" />
      <div className={cn('grid gap-32 lg:gap-x-48 lg:gap-y-56', cols)}>
        {items.map((item, i) => (
          <Feature
            key={item.id ?? i}
            variant={variant}
            title={item.title}
            text={item.text ?? undefined}
          />
        ))}
      </div>
    </Section>
  )
}

function DestinationsView({ block }: { block: Block }) {
  const items = docs<{ id?: string; name: string; line?: string | null; photo?: unknown }>(
    block.items,
  )
  return (
    <Section settings={block.settings as never} className="flex flex-col gap-32 lg:gap-80">
      <HeaderRow block={block} />
      <ul className="grid gap-32 lg:grid-cols-3 lg:gap-48">
        {items.map((place, i) => (
          <li key={place.id ?? i} className="flex flex-col gap-20">
            <div className="relative h-420 w-full overflow-hidden bg-placeholder lg:h-560">
              <CmsImage media={place.photo} sizes="(min-width: 1024px) 33vw, 100vw" />
            </div>
            <div className="flex flex-col gap-6">
              <h3 className="text-h4 text-foreground">{place.name}</h3>
              {place.line ? <p className="text-small text-muted-foreground">{place.line}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function StatsView({ block }: { block: Block }) {
  const items = docs<{
    id?: string
    prefix?: string | null
    value: number
    suffix?: string | null
    label: string
  }>(block.items)
  return (
    <Section settings={block.settings as never}>
      <Header header={block.header as BlockHeader} className="mb-40 lg:mb-56" />
      <dl className="grid grid-cols-2 gap-32 lg:grid-cols-4">
        {items.map((s, i) => (
          <div key={s.id ?? i} className="flex flex-col gap-8 border-t border-foreground pt-24">
            <dd
              className="order-1 font-display text-h1 text-foreground tabular-nums"
              data-count={s.value}
            >
              {s.prefix}
              {s.value.toLocaleString('en')}
              {s.suffix}
            </dd>
            <dt className="order-2 text-small text-muted-foreground">{s.label}</dt>
          </div>
        ))}
      </dl>
    </Section>
  )
}

function ImageTextView({ block }: { block: Block }) {
  // Figma Wedding cars / Travel manager (bleed: photo to the page edge, 720 by 820) and
  // Contact Visit (inset: photo within the margins, 760 by 560, with detail rows).
  const bleed = block.variant !== 'inset'
  const right = block.imagePosition === 'right'
  const details = docs<{ id?: string; title: string; text?: string | null }>(block.details)
  return (
    <Section settings={block.settings as never} bleed={bleed}>
      <div
        className={cn(
          'flex flex-col gap-40 lg:flex-row lg:items-center',
          bleed ? 'lg:gap-120' : 'lg:gap-96',
          right && 'lg:flex-row-reverse',
          bleed && (right ? 'lg:pl-64' : 'lg:pr-64'),
        )}
      >
        <div
          className={cn(
            'relative w-full shrink-0 overflow-hidden bg-placeholder',
            bleed
              ? 'aspect-[390/440] lg:aspect-auto lg:h-820 lg:w-1/2'
              : 'aspect-[4/3] lg:aspect-auto lg:h-560 lg:w-760',
          )}
        >
          <CmsImage media={block.image} sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
        <div
          className={cn(
            'flex min-w-0 flex-1 flex-col items-start gap-24',
            bleed && 'px-24 lg:px-0',
          )}
        >
          <Header header={block.header as BlockHeader} />
          <RichText data={block.content} />
          {details.length ? (
            <div className="mt-8 flex w-full flex-col gap-32">
              {details.map((d, i) => (
                <Feature
                  key={d.id ?? i}
                  variant="small"
                  title={d.title}
                  text={d.text ?? undefined}
                />
              ))}
            </div>
          ) : null}
          <Cta cta={block.cta as never} />
        </div>
      </div>
    </Section>
  )
}

function GalleryView({ block }: { block: Block }) {
  const images = docs<unknown>(block.images)
  return (
    <Section settings={block.settings as never}>
      <Header header={block.header as BlockHeader} className="mb-40" />
      <div className="grid grid-cols-2 gap-12 lg:grid-cols-3 lg:gap-24">
        {images.map((img, i) => (
          <div key={i} className="relative aspect-square overflow-hidden bg-placeholder">
            <CmsImage media={img} sizes="(min-width: 1024px) 33vw, 50vw" />
          </div>
        ))}
      </div>
    </Section>
  )
}

async function TestimonialsView({ block }: { block: Block }) {
  const items = await itemsFor<Testimonial>(block, 'testimonials')
  return (
    <Section settings={block.settings as never}>
      <Header header={block.header as BlockHeader} className="mb-40 lg:mb-56" />
      <div className="grid gap-48 lg:grid-cols-2 lg:gap-96">
        {items.map((t) => (
          <figure key={t.id} className="flex flex-col gap-20 border-t border-foreground pt-28">
            <blockquote className="font-display text-quote text-foreground">{t.quote}</blockquote>
            <figcaption className="text-small text-muted-foreground">
              {t.name}
              {t.role ? `, ${t.role}` : ''}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}

async function FaqView({ block }: { block: Block }) {
  const faqs =
    block.source === 'chosen'
      ? docs<Faq>(block.items)
      : ((await getCollection('faqs', (block.topic as string) || undefined)) as Faq[])
  return (
    <Section settings={block.settings as never}>
      <div className="flex flex-col gap-32 lg:flex-row lg:gap-96">
        <Header header={block.header as BlockHeader} className="lg:w-416 lg:shrink-0" />
        <div className="border-b border-border lg:flex-1">
          {faqs.map((f, i) => (
            <FaqRow
              key={f.id}
              question={f.question}
              answer={<RichText data={f.answer} />}
              open={i === 0}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

function PricingTableView({ block }: { block: Block }) {
  const prices = docs<Pricing>(block.items)
  return (
    <Section settings={block.settings as never}>
      <Header header={block.header as BlockHeader} className="mb-40" />
      <ul className="border-b border-border">
        {prices.map((p) => (
          <li key={p.id} className="flex items-center gap-16 border-t border-border py-18">
            <span className="min-w-0 flex-1 text-h4 text-foreground">{p.label}</span>
            <span className="shrink-0 text-small text-muted-foreground">
              {formatPrice(p) ?? 'Price on request'}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function ProcessStepsView({ block }: { block: Block }) {
  const steps = docs<{ id?: string; title: string; text?: string | null }>(block.steps)
  const list = (columns: boolean) => (
    <ol className={cn('grid border-b border-border', columns && 'lg:grid-cols-2 lg:gap-x-96')}>
      {steps.map((s, i) => (
        <Step
          key={s.id ?? i}
          number={String(i + 1).padStart(2, '0')}
          title={s.title}
          text={s.text ?? undefined}
        />
      ))}
    </ol>
  )
  if (asMedia(block.image)) {
    // Figma 01 Home / Your journey: photo to the page edge (700 by 900), steps beside it.
    return (
      <Section settings={block.settings as never} bleed>
        <div className="flex flex-col gap-48 lg:flex-row lg:items-center lg:gap-140 lg:pr-64">
          <div className="relative aspect-[390/440] w-full shrink-0 overflow-hidden bg-placeholder lg:aspect-[700/900] lg:w-[48.6%]">
            <CmsImage media={block.image} sizes="(min-width: 1024px) 49vw, 100vw" />
          </div>
          <div className="min-w-0 flex-1 px-24 lg:px-0">
            <Header header={block.header as BlockHeader} className="mb-40" />
            {list(false)}
          </div>
        </div>
      </Section>
    )
  }
  return (
    <Section settings={block.settings as never}>
      <Header header={block.header as BlockHeader} className="mb-40 lg:mb-72" />
      {list(true)}
    </Section>
  )
}

async function CtaBannerView({ block }: { block: Block }) {
  if (block.variant === 'next') {
    const next = resolveLink(block.next as never)
    if (!next) return null
    return (
      <NextLink
        href={next.href}
        title={String(block.heading ?? '')}
        number={(block.eyebrow as string) ?? undefined}
      />
    )
  }
  const contact = block.showPhone ? await getGlobal('contact-business') : null
  const phone = contact?.phones?.[0]?.number
  return (
    <Enquiry
      label={(block.eyebrow as string) ?? undefined}
      title={String(block.heading ?? '')}
      text={(block.text as string) ?? undefined}
      action={<Cta cta={block.cta as never} />}
      aside={
        phone ? (
          <>
            or call <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a>
          </>
        ) : undefined
      }
    />
  )
}

async function MapView({ block }: { block: Block }) {
  const contact = block.useBusinessAddress ? await getGlobal('contact-business') : null
  const lat = contact ? contact.mapPin?.latitude : (block.latitude as number | undefined)
  const lng = contact ? contact.mapPin?.longitude : (block.longitude as number | undefined)
  if (lat == null || lng == null) return null
  const zoom = (block.zoom as number) ?? 14
  return (
    <Section settings={block.settings as never}>
      <Header header={block.header as BlockHeader} className="mb-40" />
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-placeholder lg:aspect-[16/7]">
        <iframe
          title="Map"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
          src={`https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`}
        />
      </div>
    </Section>
  )
}

function LogoStripView({ block }: { block: Block }) {
  const logos = docs<{ id?: string; name: string; logo?: unknown; url?: string | null }>(
    block.logos,
  )
  return (
    <Section settings={block.settings as never}>
      <Header header={block.header as BlockHeader} className="mb-40" />
      <ul className="flex flex-wrap items-center gap-x-48 gap-y-24">
        {logos.map((l, i) => {
          const media = asMedia(l.logo)
          const img = media?.url ? (
            // eslint-disable-next-line @next/next/no-img-element -- logos keep their own aspect ratio
            <img
              src={media.url}
              alt={l.name}
              className="h-40 w-auto opacity-80 grayscale"
              loading="lazy"
            />
          ) : (
            l.name
          )
          return (
            <li key={l.id ?? i}>
              {l.url ? (
                <a href={l.url} target="_blank" rel="noopener noreferrer">
                  {img}
                </a>
              ) : (
                img
              )}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

const SPACER = {
  sm: 'h-48 lg:h-80',
  md: 'h-64 lg:h-120',
  lg: 'h-96 lg:h-160',
  xl: 'h-120 lg:h-200',
}

function SpacerView({ block }: { block: Block }) {
  return (
    <div
      aria-hidden
      className={cn('px-24 lg:px-64', SPACER[(block.size as keyof typeof SPACER) ?? 'md'])}
    >
      {block.divider ? <hr className="relative top-1/2 border-border" /> : null}
    </div>
  )
}

export async function RenderBlocks({ blocks }: { blocks?: Block[] | null }) {
  if (!blocks?.length) return null
  return (
    <>
      {blocks.map((block, i) => {
        const key = block.id ?? `${block.blockType}-${i}`
        switch (block.blockType) {
          case 'hero':
            return <HeroBlockView key={key} block={block} first={i === 0} />
          case 'richText':
            return <RichTextView key={key} block={block} />
          case 'servicesGrid':
            return <ServicesGridView key={key} block={block} />
          case 'vehicleShowcase':
            return <VehicleShowcaseView key={key} block={block} />
          case 'fleetComparison':
            return <FleetComparisonView key={key} block={block} />
          case 'featureList':
            return <FeatureListView key={key} block={block} />
          case 'stats':
            return <StatsView key={key} block={block} />
          case 'imageText':
            return <ImageTextView key={key} block={block} />
          case 'gallery':
            return <GalleryView key={key} block={block} />
          case 'testimonials':
            return <TestimonialsView key={key} block={block} />
          case 'faq':
            return <FaqView key={key} block={block} />
          case 'pricingTable':
            return <PricingTableView key={key} block={block} />
          case 'processSteps':
            return <ProcessStepsView key={key} block={block} />
          case 'ctaBanner':
            return <CtaBannerView key={key} block={block} />
          case 'form':
            return <BookingBlock key={key} block={block} />
          case 'map':
            return <MapView key={key} block={block} />
          case 'logoStrip':
            return <LogoStripView key={key} block={block} />
          case 'routeList':
            return <RouteListView key={key} block={block} />
          case 'destinations':
            return <DestinationsView key={key} block={block} />
          case 'spacer':
            return <SpacerView key={key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
