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
 * between photos as the cursor moves down the list. Any screen with a mouse, and off
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
      // Any mouse or trackpad, at any window width (not touch screens).
      const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
      // Shown whatever the system's reduced-motion setting (task 169).
      if (!fine) return

      // The card sits up and to the right of the cursor, so it never covers the row's name.
      gsap.set(c, { xPercent: 12, yPercent: -85, scale: 0.7, autoAlpha: 0 })
      const xTo = gsap.quickTo(c, 'x', { duration: 0.55, ease: 'power3' })
      const yTo = gsap.quickTo(c, 'y', { duration: 0.55, ease: 'power3' })
      const tilt = gsap.quickTo(c, 'rotation', { duration: 0.9, ease: 'power3' })
      let lastX = 0
      let shown = false

      const show = () => {
        if (shown) return
        shown = true
        gsap.to(c, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(1.6)' })
      }
      // The photo stays in the card while it fades out: clearing it first showed an empty
      // ivory card for the length of the fade, often while scrolling.
      const hide = () => {
        shown = false
        gsap.to(c, { autoAlpha: 0, scale: 0.7, duration: 0.35, ease: 'power2.in' })
      }
      let current: string | null = null
      let px = -1
      let py = -1
      // The card only appears once its photo has loaded, so it is never empty. A photo
      // still loading shows as soon as it arrives, if the pointer is still on its row.
      const ready = (key: string) => {
        const img = c.querySelector<HTMLImageElement>(`img[data-key="${CSS.escape(key)}"]`)
        if (!img || (img.complete && img.naturalWidth > 0)) return Boolean(img)
        img.addEventListener('load', () => px >= 0 && update(px, py), { once: true })
        return false
      }
      // Which row is under the pointer, checked on every move and after every scroll,
      // so the card never stays hidden over a row (smooth scrolling moves rows under a
      // still cursor without any pointerover event).
      const update = (x: number, y: number) => {
        const hit = document.elementFromPoint(x, y)
        const row = hit?.closest<HTMLElement>('[data-preview]')
        const key = row && el.contains(row) ? row.dataset.preview : undefined
        if (key && images.some((i) => i.key === key) && ready(key)) {
          if (!shown) {
            // Start at the cursor, not where the card was last left.
            gsap.set(c, { x, y })
            lastX = x
          }
          if (key !== current) {
            current = key
            setActive(key)
          }
          show()
        } else if (shown) {
          current = null
          hide()
        }
      }
      const move = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return
        px = e.clientX
        py = e.clientY
        xTo(px)
        yTo(py)
        tilt(gsap.utils.clamp(-7, 7, (px - lastX) * 0.5))
        lastX = px
        update(px, py)
      }
      const leave = () => {
        px = -1
        current = null
        hide()
      }
      const scrolled = () => {
        if (px >= 0) update(px, py)
      }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      window.addEventListener('scroll', scrolled, { passive: true })
      return () => {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', leave)
        window.removeEventListener('scroll', scrolled)
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
                  data-key={img.key}
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
