'use client'

import Image from 'next/image'
import { useId, useRef, useState, type KeyboardEvent } from 'react'

import { Icon, cn } from '@ceylonvvip/ui-brand'
import { mediaSrc } from '@/lib/media-url'

export interface CarouselVehicle {
  id: string | number
  name: string
  summary?: string | null
  image?: { url: string; alt: string; focalX?: number | null; focalY?: number | null } | null
}

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Figma 01 Home / Fleet: one vehicle at a time. Large photo, number, name and summary,
 * an "01 of 05" counter with previous and next buttons, and a tab row of names with a
 * 2px line over the active one. Tabs follow the ARIA tabs pattern (arrow keys move).
 */
export function FleetCarousel({
  vehicles,
  labels = {},
}: {
  vehicles: CarouselVehicle[]
  /** Translated: of, previous, next. */
  labels?: { of?: string; previous?: string; next?: string }
}) {
  const [index, setIndex] = useState(0)
  const id = useId()
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  const count = vehicles.length
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
  const v = vehicles[index]
  if (!v) return null
  const round =
    'flex size-48 items-center justify-center rounded-full border border-foreground transition-colors hover:bg-accent outline-ring focus-visible:outline-2'

  return (
    <div className="flex flex-col gap-28 lg:gap-48" aria-roledescription="carousel">
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${index}`}
        className="relative aspect-[342/260] w-full overflow-hidden bg-placeholder lg:aspect-auto lg:h-720"
      >
        {v.image ? (
          <Image
            key={v.id}
            src={mediaSrc(v.image.url)!}
            alt={v.image.alt}
            fill
            sizes="(min-width: 1024px) 1312px, 100vw"
            className="object-cover"
            style={{ objectPosition: `${v.image.focalX ?? 50}% ${v.image.focalY ?? 50}%` }}
          />
        ) : null}
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
