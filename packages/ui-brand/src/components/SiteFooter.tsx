import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

export interface FooterColumn {
  heading: string
  /** Links, or plain lines (an address) when href is missing. Empty label adds a gap. */
  items: Array<{ label: string; href?: string }>
  /** Hide this column on phones (Figma's mobile footer drops the CeylonVVIP column). */
  desktopOnly?: boolean
}

export interface SiteFooterProps {
  tagline?: ReactNode
  columns: FooterColumn[]
  copyright?: ReactNode
  legal?: Array<{ label: string; href: string }>
  credit?: { label: string; href: string }
  className?: string
}

/**
 * Prestige/Footer: ink footer with the giant CEYLONVVIP wordmark fitted to the width.
 * Uses the dark theme colours (ivory on ink, gold labels).
 */
export function SiteFooter({
  tagline,
  columns,
  copyright,
  legal = [],
  credit,
  className,
}: SiteFooterProps) {
  return (
    <footer
      className={cn(
        'dark flex flex-col gap-48 bg-background px-24 pt-80 pb-40 text-foreground',
        'lg:gap-72 lg:px-64 lg:pt-120 lg:pb-48',
        className,
      )}
    >
      <div className="flex flex-col gap-48 lg:flex-row">
        {tagline ? (
          <p className="font-display text-h3 whitespace-pre-line lg:flex-1">{tagline}</p>
        ) : (
          <div className="lg:flex-1" />
        )}
        {columns.map((col) => (
          <div
            key={col.heading}
            className={cn(
              'flex flex-col gap-16 lg:w-220 lg:gap-20',
              col.desktopOnly && 'hidden lg:flex',
            )}
          >
            <p className="text-label-caps text-brand">{col.heading}</p>
            <ul className="text-small leading-[1.9] text-muted-foreground">
              {col.items.map((item, i) => (
                <li key={`${item.label}-${i}`} className={item.label ? undefined : 'h-[1.9em]'}>
                  {item.href ? (
                    <a href={item.href} className="transition-colors hover:text-foreground">
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-20 lg:pt-24">
        {/* The wordmark scales with the viewport so it always fills the width. */}
        <p
          aria-hidden
          className="text-center font-display text-[clamp(56px,14.9vw,215px)] leading-none font-light whitespace-nowrap"
        >
          CEYLONVVIP
        </p>
      </div>
      <div className="flex flex-col gap-24 text-small text-muted-foreground lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col lg:contents">
          {copyright ? <p>{copyright}</p> : null}
          {legal.length ? (
            <p className="flex gap-18">
              {legal.map((l) => (
                <a
                  key={`${l.label}-${l.href}`}
                  href={l.href}
                  className="transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
            </p>
          ) : null}
        </div>
        {credit ? (
          <a
            href={credit.href}
            target="_blank"
            rel="noopener"
            className="transition-colors hover:text-foreground"
          >
            {credit.label}
          </a>
        ) : null}
      </div>
    </footer>
  )
}
