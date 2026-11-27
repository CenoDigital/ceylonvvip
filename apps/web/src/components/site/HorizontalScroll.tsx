'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState, type ReactNode } from 'react'

import { cn } from '@ceylonvvip/ui-brand'

import { SwipeHint } from './SwipeHint'

gsap.registerPlugin(useGSAP)

/** Page scroll (px) per pixel the row slides: long enough to read each place (task 168). */
const SCROLL_PER_PX = 2.4

const pad = (n: number) => String(n).padStart(2, '0')

/*
 * Sideways gallery (tasks 165, 166 and 168: "Where our guests ask to go"). On every
 * screen the panel stays in place (sticky) while the page scrolls, and the row of places
 * slides sideways with the scroll, each photo drifting slightly inside its frame. The row
 * also follows a mouse drag or a finger swipe (which move the page by the matching
 * amount), and a Drag or Swipe hint with an "01 / 05" counter shows that it moves. With
 * reduced motion, or before the script runs, it is a native swipe row with snap points
 * that a mouse can drag and the arrow keys scroll.
 */
export function HorizontalScroll({
  header,
  children,
  count,
  labels = {},
  className,
}: {
  header: ReactNode
  children: ReactNode
  /** Number of items, for the counter. */
  count: number
  /** Translated: swipe, drag. */
  labels?: { swipe?: string; drag?: string }
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLUListElement>(null)
  const [current, setCurrent] = useState(0)

  useGSAP(
    (_context, contextSafe) => {
      const el = root.current
      const row = track.current
      if (!el || !row || !contextSafe) return
      const rtl = getComputedStyle(el).direction === 'rtl'
      const distance = () => Math.max(0, row.scrollWidth - row.clientWidth)
      const toIndex = (progress: number) => Math.min(count - 1, Math.round(progress * (count - 1)))

      // Drag with a mouse (touch swipes are handled natively or below).
      let drag: { x: number; y: number; scroll: number; left: number; id: number } | null = null
      let horizontal: boolean | undefined
      let active = false
      const onDown = contextSafe((e: PointerEvent) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return
        if (!active && e.pointerType !== 'mouse') return // native swipe row
        drag = {
          x: e.clientX,
          y: e.clientY,
          scroll: window.scrollY,
          left: row.scrollLeft,
          id: e.pointerId,
        }
        horizontal = undefined
      })
      const onMove = contextSafe((e: PointerEvent) => {
        if (!drag || drag.id !== e.pointerId) return
        const dx = e.clientX - drag.x
        const dy = e.clientY - drag.y
        if (horizontal === undefined) {
          if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
          horizontal = Math.abs(dx) > Math.abs(dy)
          if (!horizontal) {
            drag = null
            return
          }
          row.setPointerCapture(e.pointerId)
          row.dataset.dragging = ''
        }
        e.preventDefault()
        const along = rtl ? -dx : dx
        if (active)
          window.scrollTo({ top: drag.scroll - along * SCROLL_PER_PX, behavior: 'instant' })
        else row.scrollLeft = drag.left - dx
      })
      const onUp = contextSafe((e: PointerEvent) => {
        if (!drag || drag.id !== e.pointerId) return
        drag = null
        delete row.dataset.dragging
      })
      // Native swipe row (no scroll-driven slide): keep the counter in step.
      const onScroll = contextSafe(() => {
        if (active) return
        const max = row.scrollWidth - row.clientWidth
        setCurrent(max > 0 ? toIndex(Math.abs(row.scrollLeft) / max) : 0)
      })
      row.addEventListener('pointerdown', onDown)
      row.addEventListener('pointermove', onMove)
      row.addEventListener('pointerup', onUp)
      row.addEventListener('pointercancel', onUp)
      row.addEventListener('scroll', onScroll, { passive: true })
      const unlisten = () => {
        row.removeEventListener('pointerdown', onDown)
        row.removeEventListener('pointermove', onMove)
        row.removeEventListener('pointerup', onUp)
        row.removeEventListener('pointercancel', onUp)
        row.removeEventListener('scroll', onScroll)
      }

      // Full motion for everyone, whatever the system setting (task 169).
      const wanted = document.documentElement.classList.contains('motion')
      if (!wanted) return unlisten
      let live = true
      let unsize: (() => void) | undefined
      void import('gsap/ScrollTrigger').then(
        contextSafe(({ ScrollTrigger }) => {
          if (!live) return
          gsap.registerPlugin(ScrollTrigger)
          active = true
          el.dataset.hscrollActive = ''
          // The panel inside is sticky (CSS), so the section is made taller: scrolling
          // through that extra height slides the row. (A ScrollTrigger pin is not used:
          // its spacer transform broke position fixed.)
          const size = () =>
            void (el.style.height = `${window.innerHeight + distance() * SCROLL_PER_PX}px`)
          size()
          ScrollTrigger.addEventListener('refreshInit', size)
          unsize = () => ScrollTrigger.removeEventListener('refreshInit', size)
          const slide = gsap.to(row, {
            x: () => (rtl ? distance() : -distance()),
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (self) => setCurrent(toIndex(self.progress)),
            },
          })
          for (const img of row.querySelectorAll('img')) {
            gsap.fromTo(
              img,
              { xPercent: rtl ? 7 : -7, scale: 1.18 },
              {
                xPercent: rtl ? -7 : 7,
                scale: 1.18,
                ease: 'none',
                scrollTrigger: {
                  trigger: img.parentElement,
                  containerAnimation: slide,
                  start: 'left right',
                  end: 'right left',
                  scrub: true,
                },
              },
            )
          }
          ScrollTrigger.refresh()
        }),
      )
      return () => {
        live = false
        active = false
        unlisten()
        unsize?.()
        delete el.dataset.hscrollActive
        el.style.height = ''
      }
    },
    { scope: root, dependencies: [count] },
  )

  return (
    <div ref={root} data-hscroll className={cn('group/hs', className)}>
      <div className="flex flex-col gap-32 group-data-[hscroll-active]/hs:sticky group-data-[hscroll-active]/hs:top-0 group-data-[hscroll-active]/hs:h-svh group-data-[hscroll-active]/hs:justify-center lg:gap-56">
        {header}
        <ul
          ref={track}
          // Keyboard users scroll the swipe row with the arrow keys once it has focus.
          tabIndex={0}
          className={cn(
            'outline-none focus-visible:ring-1 focus-visible:ring-brand',
            'cursor-grab select-none data-[dragging]:cursor-grabbing [&_img]:pointer-events-none',
            '-mx-24 flex snap-x snap-mandatory scroll-px-24 gap-20 overflow-x-auto px-24 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            'sm:gap-32 lg:-mx-64 lg:scroll-px-64 lg:gap-48 lg:px-64',
            // A mouse drag moves the native row freely; snapping would fight it.
            'data-[dragging]:snap-none',
            // Scroll-driven: the track slides as one piece, so it must not clip itself,
            // and vertical swipes over it still scroll the page.
            'group-data-[hscroll-active]/hs:touch-pan-y group-data-[hscroll-active]/hs:snap-none group-data-[hscroll-active]/hs:overflow-visible group-data-[hscroll-active]/hs:pb-0',
          )}
        >
          {children}
        </ul>
        {count > 1 ? (
          <div aria-hidden className="flex items-center gap-24">
            <SwipeHint swipe={labels.swipe} drag={labels.drag} />
            <span className="text-small text-muted-foreground tabular-nums">
              {pad(current + 1)} / {pad(count)}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
