import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

export interface SectionHeaderProps {
  /** Bronze label above the title, like "Services". */
  label?: ReactNode
  title?: ReactNode
  /** Heading level for the title; sections use h2. */
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

/** Prestige/Section/Header: bronze label with a light title (D/H2, M/H2 on mobile). */
export function SectionHeader({ label, title, as: Heading = 'h2', className }: SectionHeaderProps) {
  if (!label && !title) return null
  return (
    <div className={cn('flex max-w-620 flex-col items-start gap-20', className)}>
      {label ? <p className="text-label-caps text-brand">{label}</p> : null}
      {title ? <Heading className="font-display text-h2 text-foreground">{title}</Heading> : null}
    </div>
  )
}
