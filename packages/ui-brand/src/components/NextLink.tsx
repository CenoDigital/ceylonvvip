import type { ReactNode } from 'react'

import { Icon } from '../icons/Icon'
import { cn } from '../lib/cn'

export interface NextLinkProps {
  href: string
  title: ReactNode
  /** Number shown before the title on desktop, like "03". */
  number?: string
  label?: ReactNode
  className?: string
}

/** Prestige/Next: large link to the next service page, hairlines above and below. */
export function NextLink({ href, title, number, label = 'Next', className }: NextLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'group flex items-center gap-16 border-y border-border px-24 py-32 text-foreground',
        'focus-visible:bg-accent focus-visible:outline-none',
        'lg:justify-between lg:px-64 lg:py-56',
        className,
      )}
    >
      <span className="flex min-w-0 flex-1 flex-col items-start gap-8 lg:flex-none lg:flex-row lg:items-center lg:gap-48">
        <span className="text-label-caps text-muted-foreground">{label}</span>
        <span className="font-display text-h3 lg:text-h1">
          {number ? <span className="hidden lg:inline">{number}&nbsp;&nbsp;</span> : null}
          {title}
        </span>
      </span>
      <Icon
        name="arrow-right"
        size={32}
        className="size-22 shrink-0 transition-transform duration-300 group-hover:translate-x-6 rtl:group-hover:-translate-x-6 lg:size-32 motion-reduce:transition-none"
      />
    </a>
  )
}
