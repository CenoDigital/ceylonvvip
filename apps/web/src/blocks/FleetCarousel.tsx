'use client'

import Image from 'next/image'
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'

import { Icon, cn } from '@ceylonvvip/ui-brand'
import { SwipeHint } from '@/components/site/SwipeHint'
import { mediaSrc } from '@/lib/media-url'

export interface CarouselVehicle {
  id: string | number
  name: string
  summary?: string | null
  image?: {
    url: string
    alt: string
    focalX?: number | null
    focalY?: number | null
    blurDataURL?: string | null
  } | null
}

const pad = (n: number) => String(n).padStart(2, '0')
/** How far (px) a swipe or drag must travel to change the vehicle. */
const SWIPE = 56

/**
 * Figma 01 Home / Fleet: one vehicle at a time. Large photo, number, name and summary,
 * an "01 of 05" counter with previous and next buttons, and a tab row of names with a
 * 2px line over the active one. Tabs follow the ARIA tabs pattern (arrow keys move).
 *
 * Task 168: every photo sits in one sliding row (so each is already loaded when chosen,
 * and none is hidden by the page's photo reveal), and the row follows a finger swipe or
 * a mouse drag. A small Swipe or Drag hint shows that it moves.
 */
export function FleetCarousel({
  vehicles,
  labels = {},
}: {
  vehicles: CarouselVehicle[]
  /** Translated: of, previous, next, swipe, drag. */
  labels?: { of?: string; previous?: string; next?: string; swipe?: string; drag?: string }
}) {
  const [index, setIndex] = useState(0)
  const [drag, setDrag] = useState(0)
  const [rtl, setRtl] = useState(false)
  const id = useId()
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  const frame = useRef<HTMLDivElement>(null)
  const start = useRef<{ x: number; y: number; id: number; horizontal?: boolean } | null>(null)
  const count = vehicles.length

  useEffect(() => {
    if (frame.current) setRtl(getComputedStyle(frame.current).direction === 'rtl')
  }, [])

  const go = (i: number, focus = false) => {
    const next = (i + count) % count
    setIndex(next)
    if (focus) tabs.current[next]?.focus()
  }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(index + 1, true)
    else if (e.key === 'ArrowLeft') go(index - 1, true)
    else return
    e.preventDefault()
  }

  const onDown = (e: ReactPointerEvent) => {
    if (count < 2 || (e.pointerType === 'mouse' && e.button !== 0)) return
    start.current = { x: e.clientX, y: e.clientY, id: e.pointerId }
  }
  const onMove = (e: ReactPointerEvent) => {
    const s = start.current
    if (!s || s.id !== e.pointerId) return
    const dx = e.clientX - s.x
    const dy = e.clientY - s.y
    if (s.horizontal === undefined) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      // A mostly vertical move is a page scroll, not a swipe.
      s.horizontal = Math.abs(dx) > Math.abs(dy)
      if (!s.horizontal) {
        start.current = null
        return
      }
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    setDrag(dx)
  }
  const onUp = (e: ReactPointerEvent) => {
    const s = start.current
    start.current = null
    if (!s || s.id !== e.pointerId || !s.horizontal) return
    const dx = e.clientX - s.x
    setDrag(0)
    if (Math.abs(dx) < SWIPE) return
    // Dragging the photo left shows the next one (right in Arabic).
    go(index + (dx < 0 !== rtl ? 1 : -1))
  }

  const v = vehicles[index]
  if (!v) return null
  const round =
    'flex size-48 items-center justify-center rounded-full border border-foreground transition-colors hover:bg-accent outline-ring focus-visible:outline-2'
  const offset = `calc(${rtl ? index * 100 : -index * 100}% + ${drag}px)`

  return (
    // data-no-reveal: the page's heading and photo reveals leave this carousel alone.
    <div data-no-reveal className="flex flex-col gap-28 lg:gap-48" aria-roledescription="carousel">
      <div
        ref={frame}
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${index}`}
        className={cn(
          'relative aspect-[342/260] w-full touch-pan-y overflow-hidden bg-placeholder select-none lg:aspect-auto lg:h-720',
          count > 1 && 'cursor-grab active:cursor-grabbing',
        )}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div
          className={cn(
            'flex h-full w-full',
            !drag && 'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
          )}
          style={{ transform: `translateX(${offset})` }}
        >
          {vehicles.map((item, i) => (
            <div
              key={item.id}
              className="relative h-full w-full shrink-0"
              aria-hidden={i !== index}
            >
              {item.image ? (
                <Image
                  src={mediaSrc(item.image.url)!}
                  alt={i === index ? item.image.alt : ''}
                  fill
                  draggable={false}
                  // The chosen photo and its neighbours load right away, so a swipe never
                  // shows an empty frame; the rest load once the carousel is near.
                  loading={Math.abs(i - index) <= 1 || i === count - 1 ? 'eager' : 'lazy'}
                  placeholder={item.image.blurDataURL ? 'blur' : 'empty'}
                  blurDataURL={item.image.blurDataURL ?? undefined}
                  sizes="(min-width: 1024px) 1312px, 100vw"
                  className="pointer-events-none object-cover"
                  style={{
                    objectPosition: `${item.image.focalX ?? 50}% ${item.image.focalY ?? 50}%`,
                  }}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-20 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 flex-col gap-8 lg:flex-row lg:items-center lg:gap-32">
          <div className="flex items-center gap-16 lg:gap-32">
            <span className="text-numeral text-brand">{pad(index + 1)}</span>
            <h3 className="font-display text-h3 text-foreground">{v.name}</h3>
          </div>
          {v.summary ? <p className="text-small text-muted-foreground">{v.summary}</p> : null}
        </div>
        {count > 1 ? (
          <div className="flex items-center gap-16">
            <SwipeHint swipe={labels.swipe} drag={labels.drag} />
            <p className="text-small text-muted-foreground" aria-live="polite">
              {pad(index + 1)} {labels.of ?? 'of'} {pad(count)}
            </p>
            <button
              type="button"
              className={round}
              aria-label={labels.previous ?? 'Previous vehicle'}
              onClick={() => go(index - 1)}
            >
              <Icon name="arrow-left" size={18} />
            </button>
            <button
              type="button"
              className={round}
              aria-label={labels.next ?? 'Next vehicle'}
              onClick={() => go(index + 1)}
            >
              <Icon name="arrow-right" size={18} />
            </button>
          </div>
        ) : null}
      </div>

      {count > 1 ? (
        <div
          role="tablist"
          aria-label="Vehicles"
          className="-mx-24 flex gap-32 overflow-x-auto border-t border-border px-24 [scrollbar-width:none] lg:mx-0 lg:gap-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
          onKeyDown={onKey}
        >
          {vehicles.map((item, i) => (
            <button
              key={item.id}
              ref={(el) => {
                tabs.current[i] = el
              }}
              id={`${id}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-controls={`${id}-panel`}
              tabIndex={i === index ? 0 : -1}
              onClick={() => go(i)}
              className={cn(
                '-mt-px min-h-44 shrink-0 border-t-2 pt-20 text-left text-nav-caps whitespace-nowrap transition-colors lg:flex-1',
                'focus-visible:bg-accent focus-visible:outline-none',
                i === index
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
