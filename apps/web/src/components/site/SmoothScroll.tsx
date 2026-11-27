'use client'

import type Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/*
 * Smooth scrolling (Lenis) on desktop with a mouse or trackpad, for the premium feel
 * the client asked for (task 161). Phones keep their own native scrolling, and it is
 * off with reduced motion or when motion is off (the test cookie). It moves the real
 * page scroll, so anchors, IntersectionObservers and ScrollTrigger keep working.
 */
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const wanted =
      document.documentElement.classList.contains('motion') &&
      matchMedia('(pointer: fine) and (min-width: 1024px)').matches &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!wanted) return
    let cancelled = false
    void import('lenis').then(({ default: LenisClass }) => {
      if (cancelled) return
      lenis.current = new LenisClass({
        autoRaf: true,
        anchors: true,
        lerp: 0.1,
        // Let popovers, dialogs and inner scroll areas (the time picker) scroll natively.
        prevent: (node: HTMLElement) =>
          Boolean(
            node.closest(
              '[data-radix-popper-content-wrapper], [role="dialog"], [role="listbox"], [data-lenis-prevent]',
            ),
          ),
      })
    })
    return () => {
      cancelled = true
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [])

  // A new page has a new height.
  useEffect(() => {
    lenis.current?.resize()
  }, [pathname])

  return null
}
