import type { ReactNode } from 'react'

import { Icon, type IconName } from '../icons/Icon'
import { cn } from '../lib/cn'

export interface FeatureProps {
  /** Figma: Prestige/Feature/Large, Small or Title. */
  variant?: 'large' | 'small' | 'title'
  title: ReactNode
  text?: ReactNode
  /** "01", "02": a bronze numeral above the title (large and title variants). */
  number?: string
  /** Small variant: an icon in a gold ring. */
  icon?: IconName
  /** The title's heading level: h3 under a section heading, h2 when the section has none. */
  as?: 'h2' | 'h3'
  className?: string
}

/*
 * Feature items without rules (client feedback 2026-11-27: too many hairlines).
 * Small: a parchment card with a gold-ringed icon. Large and title: a bronze numeral
 * leads instead of a line.
 */
export function Feature({
  variant = 'large',
  title,
  text,
  number,
  icon,
  as: Heading = 'h3',
  className,
}: FeatureProps) {
  if (variant === 'small') {
    return (
      <div
        data-animate-item
        className={cn(
          'group flex h-full flex-col gap-20 bg-card p-28 transition-colors duration-500 lg:p-36',
          'hover:bg-accent',
          className,
        )}
      >
        {icon ? (
          <span className="flex size-52 items-center justify-center rounded-full border border-brand/45 text-brand transition-transform duration-500 group-hover:-translate-y-2">
            <Icon name={icon} size={22} />
          </span>
        ) : null}
        <div className="flex flex-col gap-10">
          <Heading className="text-h4 text-foreground">{title}</Heading>
          {text ? <p className="text-small text-muted-foreground">{text}</p> : null}
        </div>
      </div>
    )
  }
  return (
    <div className={cn('flex flex-col items-start gap-16', className)}>
      {number ? (
        <span className="font-display text-h3 leading-none text-brand tabular-nums">{number}</span>
      ) : null}
      <Heading
        className={cn('text-foreground', variant === 'large' ? 'font-display text-h3' : 'text-h4')}
      >
        {title}
      </Heading>
      {variant !== 'title' && text ? (
        <p
          className={cn('text-muted-foreground', variant === 'large' ? 'text-body' : 'text-small')}
        >
          {text}
        </p>
      ) : null}
    </div>
  )
}
