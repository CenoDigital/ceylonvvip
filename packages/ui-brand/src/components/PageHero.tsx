import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

export interface PageHeroProps {
  /** Bronze label, like "Services, 02". */
  label?: ReactNode
  title: ReactNode
  text?: ReactNode
  /** Usually a LinkUnderline (desktop only in Figma). */
  action?: ReactNode
  className?: string
}

/**
 * Prestige/Hero/Page: label, large title (D/Title 96, M/Hero 44), short text and a link.
 * Mobile stacks with 24px gutters; desktop puts the text beside the title from 1024px.
 */
export function PageHero({ label, title, text, action, className }: PageHeroProps) {
  return (
    <header
      className={cn(
        'flex flex-col items-start gap-20 px-24 pt-64 pb-40',
        'lg:gap-40 lg:px-64 lg:pt-120 lg:pb-80',
        className,
      )}
    >
      {label ? <p className="text-label-caps text-brand">{label}</p> : null}
      <div className="flex w-full flex-col gap-20 lg:flex-row lg:items-end lg:gap-96">
        <h1 className="min-w-0 flex-1 font-display text-title whitespace-pre-line text-foreground">
          {title}
        </h1>
        {text || action ? (
          <div className="flex flex-col items-start gap-28 lg:w-400 lg:shrink-0">
            {text ? <p className="text-lead text-muted-foreground lg:text-body">{text}</p> : null}
            {action ? <div className="hidden lg:block">{action}</div> : null}
          </div>
        ) : null}
      </div>
    </header>
  )
}
