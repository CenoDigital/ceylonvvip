import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import type { ReactNode } from 'react'

import type { Media } from '@ceylonvvip/db'
import { Button, LinkUnderline, SectionHeader, cn } from '@ceylonvvip/ui-brand'

import { linkProps, type CmsLink } from '@/lib/links'

/*
 * Pieces every block renderer shares: the section wrapper (background, spacing,
 * anchor, animation preset), images, rich text, CTAs and the section header.
 */

export interface SectionSettings {
  bg?: 'default' | 'card' | null
  pt?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | null
  pb?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | null
  anim?: string | null
  anchor?: string | null
}

// Figma section spacing: desktop 80, 120, 160, 200; phones about 0.6x of that
// (01 Home / Mobile: 200 to 120, 160 to 96, 120 to 64).
const PT = {
  none: 'pt-0',
  sm: 'pt-48 lg:pt-80',
  md: 'pt-64 lg:pt-120',
  lg: 'pt-96 lg:pt-160',
  xl: 'pt-120 lg:pt-200',
}
const PB = {
  none: 'pb-0',
  sm: 'pb-48 lg:pb-80',
  md: 'pb-64 lg:pb-120',
  lg: 'pb-96 lg:pb-160',
  xl: 'pb-120 lg:pb-200',
}

export function Section({
  settings,
  children,
  className,
  bleed = false,
  as: Tag = 'section',
}: {
  settings?: SectionSettings | null
  children: ReactNode
  className?: string
  /** Full width with no side gutters (photos, signature features). */
  bleed?: boolean
  as?: 'section' | 'div'
}) {
  const s = settings ?? {}
  return (
    <Tag
      id={s.anchor ?? undefined}
      data-animate={s.anim && s.anim !== 'none' ? s.anim : undefined}
      className={cn(
        s.bg === 'card' ? 'bg-card' : 'bg-background',
        PT[s.pt ?? 'lg'],
        PB[s.pb ?? 'lg'],
        !bleed && 'px-24 lg:px-64',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export interface BlockHeader {
  eyebrow?: string | null
  heading?: string | null
  intro?: string | null
}

export function Header({ header, className }: { header?: BlockHeader | null; className?: string }) {
  if (!header?.eyebrow && !header?.heading && !header?.intro) return null
  return (
    <div className={cn('flex flex-col gap-20 lg:gap-28', className)}>
      <SectionHeader label={header.eyebrow} title={header.heading} />
      {header.intro ? (
        <p className="max-w-620 text-body text-muted-foreground">{header.intro}</p>
      ) : null}
    </div>
  )
}

export const asMedia = (value: unknown): Media | null =>
  value && typeof value === 'object' && 'url' in value ? (value as Media) : null

/** A Media library image with its alt text and focal point. */
export function CmsImage({
  media,
  sizes,
  priority = false,
  className,
}: {
  media: unknown
  sizes: string
  priority?: boolean
  className?: string
}) {
  const m = asMedia(media)
  if (!m?.url) return null
  return (
    <Image
      src={m.url}
      alt={m.alt ?? ''}
      fill
      sizes={sizes}
      priority={priority}
      className={cn('object-cover', className)}
      style={{ objectPosition: `${m.focalX ?? 50}% ${m.focalY ?? 50}%` }}
    />
  )
}

export function RichText({ data, className }: { data: unknown; className?: string }) {
  if (!data || typeof data !== 'object') return null
  return (
    <div
      className={cn(
        'max-w-760 text-body text-muted-foreground',
        '[&_h2]:font-display [&_h2]:text-h2 [&_h2]:text-foreground [&_h3]:text-h3 [&_h3]:text-foreground',
        '[&_p+p]:mt-20 [&_h2]:mt-48 [&_h3]:mt-32 [&_h2+p]:mt-20 [&_h3+p]:mt-16',
        '[&_ul]:mt-16 [&_ul]:list-disc [&_ul]:pl-20 [&_a]:text-foreground [&_a]:underline',
        className,
      )}
    >
      <LexicalRichText data={data as Parameters<typeof LexicalRichText>[0]['data']} />
    </div>
  )
}

export interface CmsCta {
  label?: string | null
  appearance?: 'button' | 'link' | null
  link?: CmsLink | null
}

/** A cta field as Figma's solid button or underlined link. */
export function Cta({ cta, className }: { cta?: CmsCta | null; className?: string }) {
  const props = linkProps(cta?.link)
  if (!cta?.label || !props) return null
  return cta.appearance === 'link' ? (
    <LinkUnderline {...props} className={className}>
      {cta.label}
    </LinkUnderline>
  ) : (
    <Button {...props} className={className}>
      {cta.label}
    </Button>
  )
}
