import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

export interface StepProps {
  number: string
  title: ReactNode
  text?: ReactNode
  className?: string
}

/** Prestige/Step: numbered step with title and one line of detail, hairline above. */
export function Step({ number, title, text, className }: StepProps) {
  return (
    <li
      className={cn(
        'flex items-start gap-20 border-t border-border py-20 lg:gap-32 lg:py-24',
        className,
      )}
    >
      <span className="shrink-0 text-small text-brand lg:w-56">{number}</span>
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <h3 className="text-h4 text-foreground">{title}</h3>
        {text ? <p className="text-small text-muted-foreground">{text}</p> : null}
      </div>
    </li>
  )
}
