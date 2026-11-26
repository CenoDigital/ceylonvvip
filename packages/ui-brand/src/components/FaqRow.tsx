import type { ReactNode } from 'react'

import { Icon } from '../icons/Icon'
import { cn } from '../lib/cn'

export interface FaqRowProps {
  question: ReactNode
  answer: ReactNode
  open?: boolean
  className?: string
}

/**
 * Prestige/FAQ/Row: question with an expandable answer, separated by hairlines.
 * Native <details>, so it works without JavaScript and with the keyboard.
 */
export function FaqRow({ question, answer, open, className }: FaqRowProps) {
  return (
    <details open={open} className={cn('group border-t border-border py-24', className)}>
      <summary
        className={cn(
          'flex min-h-44 cursor-pointer list-none items-center gap-24 text-h4 text-foreground',
          'focus-visible:bg-accent focus-visible:outline-none [&::-webkit-details-marker]:hidden',
        )}
      >
        <span className="min-w-0 flex-1">{question}</span>
        <Icon
          name="chevron-down"
          size={18}
          className="shrink-0 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
        />
      </summary>
      <div className="pt-12 text-body text-muted-foreground">{answer}</div>
    </details>
  )
}
