import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

/** Prestige/Spec: small label and value under a hairline (vehicle specs). */
export function Spec({
  label,
  value,
  className,
}: {
  label: ReactNode
  value: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col items-start gap-8 border-t border-border pt-16', className)}>
      <dt className="text-label-caps text-muted-foreground">{label}</dt>
      <dd className="text-small text-foreground">{value}</dd>
    </div>
  )
}
