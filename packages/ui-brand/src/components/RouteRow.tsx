import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

export interface RouteRowProps {
  route: ReactNode
  /** Usually the price, like "Price on request". */
  note?: ReactNode
  /** Active: bronze line and note (linked to the active pin on the route map). */
  active?: boolean
  className?: string
}

/** Prestige/Route/Row: a place in a route list, separated by hairlines. */
export function RouteRow({ route, note, active = false, className }: RouteRowProps) {
  return (
    <li
      aria-current={active || undefined}
      className={cn(
        'flex items-center gap-16 border-t py-18',
        active ? 'border-b-2 border-brand' : 'border-border',
        className,
      )}
    >
      <span className="min-w-0 flex-1 text-h4 text-foreground">{route}</span>
      {note ? (
        <span
          className={cn(
            'shrink-0 text-small whitespace-nowrap',
            active ? 'text-brand' : 'text-muted-foreground',
          )}
        >
          {note}
        </span>
      ) : null}
    </li>
  )
}
