'use client'

import type Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/*
 * Smooth scrolling (Lenis) with any mouse or trackpad, at any window width, for the
 * premium feel the client asked for (tasks 161 and 170). Phones keep their own native
 * scrolling; it is off only when motion is off (the test cookie). It moves the real
 * page scroll, so anchors, IntersectionObservers and ScrollTrigger keep working.
 */
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const wanted =
      document.documentElement.classList.contains('motion') &&
      // Full motion for everyone, whatever the system setting (task 169).
      // Any mouse or trackpad, at any window width (task 170: narrow desktop windows too).
      matchMedia('(pointer: fine)').matches
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
