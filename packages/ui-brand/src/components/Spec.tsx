import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

/** Prestige/Spec: small label and value (vehicle specs). No rule above. */
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
    <div className={cn('flex flex-col items-start gap-8', className)}>
      <dt className="text-label-caps text-muted-foreground">{label}</dt>
      <dd className="text-small text-foreground">{value}</dd>
    </div>
  )
}
