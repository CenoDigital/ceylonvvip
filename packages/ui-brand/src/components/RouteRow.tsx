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
        // Below lg (phones, and the two columns on tablets): the place keeps at least 60%
        // of the row, so a short note ("On request") stays at the right as in Figma and a
        // long one drops below the place and wraps.
        // From lg up: one line, the note never wraps (as before).
        'flex flex-wrap items-center gap-x-16 gap-y-6 py-18 lg:flex-nowrap',
        ruled && 'border-t',
        ruled && (active ? 'border-b-2 border-brand' : 'border-border'),
        className,
      )}
    >
      <span className="min-w-0 grow basis-[60%] text-h4 text-foreground lg:basis-0">{route}</span>
      {note ? (
        <span
          className={cn(
            'min-w-0 text-small lg:shrink-0 lg:whitespace-nowrap',
            active ? 'text-brand' : 'text-muted-foreground',
          )}
        >
          {note}
        </span>
      ) : null}
    </li>
  )
}
