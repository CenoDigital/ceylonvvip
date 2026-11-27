'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@ceylonvvip/ui-brand'

gsap.registerPlugin(useGSAP)

export interface PreviewImage {
  key: string
  src: string
  alt: string
}

/*
 * Cursor-following photo preview (client feedback 2026-11-27; Figma Home Services
 * "hover preview"). Rows inside carry data-preview="<key>"; hovering one shows its
 * photo in a 220 by 280 card that trails the cursor with a slight tilt, and fades
 * between photos as the cursor moves down the list. Desktop with a mouse only, and off
 * with reduced motion. The card lives in a portal on <body> so section transforms
 * cannot trap it.
 */
export function CursorPreview({
  images,
  children,
  className,
}: {
  images: PreviewImage[]
  children: ReactNode
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<string | null>(null)
  // True once in the browser (the portal needs document.body).
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  useGSAP(
    () => {
      const el = root.current
      const c = card.current
      if (!el || !c || !images.length) return
      const fine = matchMedia('(pointer: fine) and (min-width: 1024px)').matches
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!fine || reduced) return

      gsap.set(c, { xPercent: -50, yPercent: -60, scale: 0.7, autoAlpha: 0 })
      const xTo = gsap.quickTo(c, 'x', { duration: 0.55, ease: 'power3' })
      const yTo = gsap.quickTo(c, 'y', { duration: 0.55, ease: 'power3' })
      const tilt = gsap.quickTo(c, 'rotation', { duration: 0.9, ease: 'power3' })
      let lastX = 0
      let shown = false

      const show = () => {
        if (shown) return
        shown = true
        gsap.to(c, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power3.out' })
      }
      const hide = () => {
        shown = false
        setActive(null)
        gsap.to(c, { autoAlpha: 0, scale: 0.7, duration: 0.35, ease: 'power2.in' })
      }
      const move = (e: PointerEvent) => {
        xTo(e.clientX)
        yTo(e.clientY)
        tilt(gsap.utils.clamp(-7, 7, (e.clientX - lastX) * 0.5))
        lastX = e.clientX
      }
      const over = (e: PointerEvent) => {
        const row = (e.target as Element).closest<HTMLElement>('[data-preview]')
        const key = row && el.contains(row) ? row.dataset.preview : undefined
        if (key && images.some((i) => i.key === key)) {
          if (!shown) {
            // Start at the cursor, not where the card was last left.
            gsap.set(c, { x: e.clientX, y: e.clientY })
            lastX = e.clientX
          }
          setActive(key)
          show()
        } else {
          hide()
        }
      }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerover', over)
      el.addEventListener('pointerleave', hide)
      window.addEventListener('scroll', hide, { passive: true })
      return () => {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerover', over)
        el.removeEventListener('pointerleave', hide)
        window.removeEventListener('scroll', hide)
      }
    },
    { dependencies: [images.length, mounted], scope: root },
  )

  return (
    <div ref={root} className={cn('relative', className)}>
      {children}
      {mounted && images.length
        ? createPortal(
            <div
              ref={card}
              aria-hidden
              className="pointer-events-none invisible fixed top-0 left-0 z-40 h-280 w-220 overflow-hidden bg-placeholder shadow-[0_30px_60px_-30px_rgba(26,22,18,0.55)]"
            >
              {images.map((img) => (
                <Image
                  key={img.key}
                  src={img.src}
                  alt=""
                  fill
                  sizes="220px"
                  className={cn(
                    'object-cover transition-[opacity,transform] duration-500 ease-out',
                    active === img.key ? 'scale-100 opacity-100' : 'scale-110 opacity-0',
                  )}
                />
              ))}
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}
