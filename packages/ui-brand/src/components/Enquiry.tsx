import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

export interface EnquiryProps {
  label?: ReactNode
  title: ReactNode
  text?: ReactNode
  /** The primary action, usually a Button. Full width on mobile. */
  action?: ReactNode
  /** Secondary line beside the button, like "or call +94 ...". */
  aside?: ReactNode
  className?: string
}

/** Prestige/Enquiry: closing call to action used at the end of every page. */
export function Enquiry({ label, title, text, action, aside, className }: EnquiryProps) {
  return (
    <section
      className={cn(
        'flex flex-col items-center border-t border-border px-24 py-120 text-center lg:px-64 lg:py-200',
        className,
      )}
    >
      {label ? <p className="text-label-caps text-brand">{label}</p> : null}
      <h2 className="mt-24 max-w-342 font-display text-h1 whitespace-pre-line text-foreground lg:mt-36 lg:max-w-900">
        {title}
      </h2>
      {text ? (
        <p className="mt-20 max-w-300 text-body text-muted-foreground lg:mt-28 lg:max-w-480">
          {text}
        </p>
      ) : null}
      {action || aside ? (
        <div className="mt-36 flex w-full flex-col items-center gap-20 lg:mt-48 lg:w-auto lg:flex-row lg:gap-40 [&>*:first-child]:w-full lg:[&>*:first-child]:w-auto">
          {action}
          {aside ? <p className="text-small text-muted-foreground">{aside}</p> : null}
        </div>
      ) : null}
    </section>
  )
}
