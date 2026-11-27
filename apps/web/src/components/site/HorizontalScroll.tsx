'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, type ReactNode } from 'react'

import { cn } from '@ceylonvvip/ui-brand'

gsap.registerPlugin(useGSAP)

/*
 * Sideways gallery (tasks 165 and 166: "Where our guests ask to go"). On every screen
 * the panel stays in place (sticky) while the page scrolls, and the row of places
 * slides sideways with the scroll, each photo drifting slightly inside its frame, so
 * mouse, trackpad and touch users all move it just by scrolling down (and back by
 * scrolling up). With reduced motion, or before the script runs, it is a native swipe
 * row with snap points that the arrow keys also scroll.
 */
export function HorizontalScroll({
  header,
  children,
  className,
}: {
  header: ReactNode
  children: ReactNode
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLUListElement>(null)

  useGSAP(
    (_context, contextSafe) => {
      const el = root.current
      const row = track.current
      if (!el || !row || !contextSafe) return
      const wanted =
        document.documentElement.classList.contains('motion') &&
        !matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!wanted) return
      let live = true
      let unsize: (() => void) | undefined
      void import('gsap/ScrollTrigger').then(
        contextSafe(({ ScrollTrigger }) => {
          if (!live) return
          gsap.registerPlugin(ScrollTrigger)
          el.dataset.hscrollActive = ''
          const rtl = getComputedStyle(el).direction === 'rtl'
          const distance = () => Math.max(0, row.scrollWidth - row.clientWidth)
          // The panel inside is sticky (CSS), so the section is made taller by the
          // sideways distance: scrolling through that extra height slides the row.
          // (A ScrollTrigger pin is not used: its spacer transform broke position fixed.)
          const size = () => void (el.style.height = `${window.innerHeight + distance()}px`)
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
              scrub: 0.6,
              invalidateOnRefresh: true,
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
        unsize?.()
        delete el.dataset.hscrollActive
        el.style.height = ''
      }
    },
    { scope: root },
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
            '-mx-24 flex snap-x snap-mandatory scroll-px-24 gap-20 overflow-x-auto px-24 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            'sm:gap-32 lg:-mx-64 lg:scroll-px-64 lg:gap-48 lg:px-64',
            // Scroll-driven: the track slides as one piece, so it must not clip itself.
            'group-data-[hscroll-active]/hs:snap-none group-data-[hscroll-active]/hs:overflow-visible group-data-[hscroll-active]/hs:pb-0',
          )}
        >
          {children}
        </ul>
      </div>
    </div>
  )
}
