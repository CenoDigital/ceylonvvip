import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

export interface RouteRowProps {
  route: ReactNode
  /** Usually the price, like "Price on request". */
  note?: ReactNode
  /** Active: bronze line and note (linked to the active pin on the route map). */
  active?: boolean
  /** Hairline above the row (default). Off in grids of places. */
  ruled?: boolean
  className?: string
  /** Key of the photo a surrounding CursorPreview shows on hover. */
  'data-preview'?: string
}

/** Prestige/Route/Row: a place in a route list, separated by hairlines. */
export function RouteRow({
  route,
  note,
  active = false,
  ruled = true,
  className,
  'data-preview': preview,
}: RouteRowProps) {
  return (
    <li
      data-preview={preview}
      aria-current={active || undefined}
      className={cn(
        'flex items-center gap-16 py-18',
        ruled && 'border-t',
        ruled && (active ? 'border-b-2 border-brand' : 'border-border'),
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
