import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

export interface FeatureProps {
  /** Figma: Prestige/Feature/Large, Small or Title. */
  variant?: 'large' | 'small' | 'title'
  title: ReactNode
  text?: ReactNode
  className?: string
}

/** Title (and text) under a 1px ink line. */
export function Feature({ variant = 'large', title, text, className }: FeatureProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-start border-t border-foreground',
        variant === 'title' ? 'pt-24' : 'gap-12 pt-28',
        className,
      )}
    >
      <h3
        className={cn('text-foreground', variant === 'large' ? 'font-display text-h3' : 'text-h4')}
      >
        {title}
      </h3>
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
