import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

/** Prestige/Banner/Resume: shown when a guest returns with an unsent request on their device. */
export function BannerResume({
  label = 'Continue your request',
  summary,
  actions,
  className,
}: {
  label?: ReactNode
  summary: ReactNode
  /** Continue (LinkUnderline) and Start again. */
  actions?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-start gap-12 border-l-2 border-brand bg-muted p-20',
        className,
      )}
    >
      <p className="text-label-caps text-brand">{label}</p>
      <p className="text-h4 text-foreground">{summary}</p>
      {actions ? <div className="flex items-center gap-24">{actions}</div> : null}
    </div>
  )
}

/** Prestige/Legal/Section: numbered section of a legal page. */
export function LegalSection({
  number,
  title,
  children,
  className,
}: {
  number: string
  title: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('flex flex-col gap-16 border-t border-border pt-32 pb-40', className)}>
      <p className="text-small text-brand">{number}</p>
      <h2 className="font-display text-h3 text-foreground">{title}</h2>
      <div className="text-body text-muted-foreground">{children}</div>
    </section>
  )
}

/**
 * Prestige/Toast: short confirmation for 3 seconds at the bottom of the screen, above
 * the thumb bar. Announced politely to screen readers.
 */
export function Toast({ message, className }: { message: ReactNode; className?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'dark inline-flex items-center gap-12 rounded-full bg-background py-14 pr-24 pl-20 text-small text-foreground',
        className,
      )}
    >
      <span aria-hidden className="size-8 shrink-0 rounded-full bg-brand" />
      {message}
    </div>
  )
}

/** Prestige/Alert: message at the top of a form or screen, for errors and connection problems. */
export function Alert({
  title,
  text,
  className,
}: {
  title: ReactNode
  text?: ReactNode
  className?: string
}) {
  return (
    <div
      role="alert"
      className={cn('flex flex-col gap-6 border-l-2 border-destructive bg-muted p-16', className)}
    >
      <p className="text-h4 text-foreground">{title}</p>
      {text ? <p className="text-small text-muted-foreground">{text}</p> : null}
    </div>
  )
}
