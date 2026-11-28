import type { ReactNode } from 'react'

import { Icon } from '../icons/Icon'
import { cn } from '../lib/cn'

export interface IndexRowProps {
  number: string
  title: ReactNode
  /** Shown on desktop only, as in Figma. */
  note?: ReactNode
  href: string
  className?: string
  /** Key of the photo a surrounding CursorPreview shows on hover. */
  'data-preview'?: string
}

/** Prestige/Index/Row: numbered service row with note and arrow, hairline above. */
export function IndexRow({
  number,
  title,
  note,
  href,
  className,
  'data-preview': preview,
}: IndexRowProps) {
  return (
    <a
      href={href}
      data-preview={preview}
      className={cn(
        'group flex items-center gap-16 border-t border-border py-22 text-foreground',
        'transition-colors duration-300 ease-power2-out focus-visible:bg-accent focus-visible:outline-none',
        'lg:gap-0 lg:py-36',
        className,
      )}
    >
      <span className="shrink-0 text-small text-brand lg:w-120 lg:text-numeral">{number}</span>
      <span className="min-w-0 flex-1 font-display text-h3 lg:text-h2">{title}</span>
      {note ? (
        <span className="hidden w-300 shrink-0 text-small text-muted-foreground lg:block">
          {note}
        </span>
      ) : null}
      <Icon
        name="arrow-right"
        size={20}
        className="size-18 shrink-0 transition-transform duration-300 group-hover:translate-x-4 rtl:group-hover:-translate-x-4 lg:size-20"
      />
    </a>
  )
}
