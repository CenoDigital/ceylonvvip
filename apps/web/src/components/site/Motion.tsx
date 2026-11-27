'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import type { SplitText as SplitTextPlugin } from 'gsap/SplitText'
import { usePathname } from 'next/navigation'

import { motion as m } from '@ceylonvvip/tokens'

import { countFrame, gsapEase, seconds } from '@/lib/motion'

gsap.registerPlugin(useGSAP)

declare global {
  interface Window {
    __motion?: boolean
  }
}

/*
 * Plays the animation preset each block picked in the CMS (its `data-animate`). The
 * hero intro is CSS (globals.css) so it starts with the first paint, before any JS.
 * Sections start when they scroll into view (an IntersectionObserver, which costs
 * nothing at load); ScrollTrigger is only loaded for desktop parallax. Only opacity,
 * transform and clip-path move, so nothing shifts layout (CLS stays 0). Reduced motion:
 * every preset becomes a short fade.
 *
 * On top of the presets, every heading on every page reveals line by line as it scrolls
 * into view (SplitText, masked lines rising), and section labels fade in, so text moves
 * the same way across the whole site (task 161).
 */

// Undo steps GSAP cannot revert itself (counter text), run when the presets are reverted.
let cleanups: Array<() => void> = []

type Preset = (section: HTMLElement, tl: gsap.core.Timeline) => void

const kids = (el: Element) => Array.from(el.children) as HTMLElement[]
const without = (all: HTMLElement[], inner: Element[]) =>
  all.filter((el) => !inner.some((i) => el === i || el.contains(i)))

const rise = (targets: gsap.TweenTarget, position: gsap.Position = 0) => ({
  targets,
  vars: {
    opacity: 0,
    y: m.fadeUp.rise,
    duration: seconds(m.fadeUp.duration),
    ease: gsapEase(m.fadeUp.ease),
  },
  position,
})

const fadeUp: Preset = (section, tl) => {
  const r = rise(kids(section))
  tl.from(r.targets, r.vars, r.position)
}

const staggerChildren: Preset = (section, tl) => {
  const marked = Array.from(section.querySelectorAll<HTMLElement>('[data-animate-item]'))
  const list = section.querySelector('ul, ol, dl, .grid')
  const items = marked.length ? marked : list ? kids(list) : kids(section)
  const others = without(kids(section), items)
  if (others.length) {
    const r = rise(others)
    tl.from(r.targets, r.vars, r.position)
  }
  tl.from(
    items,
    {
      opacity: 0,
      y: m.fadeUp.rise,
      duration: seconds(m.staggerChildren.duration),
      ease: gsapEase(m.staggerChildren.ease),
      stagger: seconds(m.staggerChildren.stagger),
    },
    others.length ? 0.15 : 0,
  )
}

const revealMask: Preset = (section, tl) => {
  const imgs = Array.from(section.querySelectorAll('img'))
  const frames = [...new Set(imgs.map((i) => i.parentElement!))]
  const text = [
    ...without(kids(section), frames),
    ...frames.flatMap((f) => without(kids(f.parentElement!), [f]).filter((el) => !el.contains(f))),
  ].filter((el) => !el.querySelector('img'))
  const vars = { duration: seconds(m.revealMask.duration), ease: gsapEase(m.revealMask.ease) }
  tl.fromTo(
    frames,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', ...vars },
  )
  tl.from(imgs, { scale: 1.15, ...vars }, 0)
  if (text.length) {
    const r = rise(text, 0.3)
    tl.from(r.targets, r.vars, r.position)
  }
}

const counter: Preset = (section, tl) => {
  const numbers = Array.from(section.querySelectorAll<HTMLElement>('[data-count]'))
  const r = rise(kids(section))
  tl.from(r.targets, r.vars, r.position)
  for (const el of numbers) {
    const target = Number(el.dataset.count)
    const finalText = el.textContent ?? ''
    if (!Number.isFinite(target)) continue
    const state = { v: 0 }
    el.textContent = countFrame(finalText, target, 0)
    tl.to(
      state,
      {
        v: target,
        duration: seconds(m.counter.duration),
        ease: gsapEase(m.counter.ease),
        onUpdate: () => void (el.textContent = countFrame(finalText, target, state.v)),
        onComplete: () => void (el.textContent = finalText),
      },
      0.1,
    )
    // Put the real number back if the page changes before the count finishes.
    cleanups.push(() => void (el.textContent = finalText))
  }
}

const lineDraw: Preset = (section, tl) => {
  const lines = Array.from(section.querySelectorAll<HTMLElement>('hr, [data-line]'))
  const r = rise(kids(section))
  tl.from(r.targets, r.vars, r.position)
  if (lines.length)
    tl.from(
      lines,
      {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: seconds(m.lineDraw.duration),
        ease: gsapEase(m.lineDraw.ease),
        stagger: 0.08,
      },
      0,
    )
}

const PRESETS: Record<string, { preset: Preset; start: string }> = {
  'fade-up': { preset: fadeUp, start: m.fadeUp.start },
  'stagger-children': { preset: staggerChildren, start: m.staggerChildren.start },
  'reveal-mask': { preset: revealMask, start: m.revealMask.start },
  counter: { preset: counter, start: m.counter.start },
  'line-draw': { preset: lineDraw, start: m.fadeUp.start },
}

function parallax(section: HTMLElement) {
  for (const img of section.querySelectorAll('img')) {
    gsap.fromTo(
      img,
      { yPercent: m.imageParallax.from, scale: 1.16 },
      {
        yPercent: m.imageParallax.to,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: m.imageParallax.scrub,
        },
      },
    )
  }
}

/** Headings that reveal line by line: everything in <main> except the hero (CSS intro). */
export const REVEAL_SELECTOR =
  'main :is(h1, h2, h3):not([data-animate="hero-intro"] *):not(form *):not([data-no-reveal] *)'

function revealLines(el: HTMLElement, SplitText: typeof SplitTextPlugin) {
  SplitText.create(el, {
    type: 'lines',
    mask: 'lines',
    autoSplit: true,
    onSplit: (self) => {
      gsap.set(el, { visibility: 'visible' })
      return gsap.from(self.lines, {
        yPercent: 110,
        duration: seconds(m.heroIntro.textDuration),
        stagger: seconds(m.heroIntro.stagger) * 0.7,
        ease: gsapEase(m.heroIntro.ease),
      })
    },
  })
}

/** A ScrollTrigger-style start ("top 85%") as an IntersectionObserver root margin. */
const rootMargin = (start: string) =>
  `0px 0px -${100 - Number(/(\d+)%/.exec(start)?.[1] ?? 85)}% 0px`

export function Motion() {
  const pathname = usePathname()

  useGSAP(
    (_context, contextSafe) => {
      window.__motion = true
      if (!document.documentElement.classList.contains('motion') || !contextSafe) return
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
      const desktop = matchMedia('(min-width: 1024px)').matches
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('[data-animate]:not([data-animate="hero-intro"])'),
      )
      const observers: IntersectionObserver[] = []
      let live = true
      const reveal = contextSafe(revealLines)

      // globals.css hides animated content until its starting state is set.
      const show = (section: HTMLElement) => gsap.set(kids(section), { visibility: 'visible' })

      const play = contextSafe((section: HTMLElement) => {
        const entry = PRESETS[section.dataset.animate ?? '']
        if (reduced) {
          gsap.from(kids(section), { opacity: 0, duration: seconds(m.reducedMotion.duration) })
        } else if (entry) {
          entry.preset(section, gsap.timeline())
        }
        show(section)
      })

      for (const section of sections) {
        const name = section.dataset.animate ?? ''
        if (name === 'image-parallax') {
          show(section)
          if (desktop && !reduced)
            void import('gsap/ScrollTrigger').then(
              contextSafe(({ ScrollTrigger }) => {
                if (!live) return
                gsap.registerPlugin(ScrollTrigger)
                parallax(section)
              }),
            )
          continue
        }
        if (!reduced && !PRESETS[name]) {
          show(section)
          continue
        }
        const io = new IntersectionObserver(
          (entries) => {
            // In view, or already scrolled past (a page opened at an #anchor).
            if (entries.some((e) => e.isIntersecting || e.boundingClientRect.bottom < 0)) {
              io.disconnect()
              play(section)
            }
          },
          { rootMargin: rootMargin(PRESETS[name]?.start ?? m.fadeUp.start) },
        )
        io.observe(section)
        observers.push(io)
      }

      // Headings: split into lines only when they come into view (no work at load).
      const headings = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR))
      if (headings.length) {
        const showAll = () => gsap.set(headings, { visibility: 'visible' })
        if (reduced) {
          showAll()
        } else {
          void import('gsap/SplitText').then(
            contextSafe(({ SplitText }) => {
              if (!live) return
              gsap.registerPlugin(SplitText)
              const io = new IntersectionObserver(
                (entries) => {
                  for (const e of entries) {
                    if (!e.isIntersecting && e.boundingClientRect.bottom >= 0) continue
                    io.unobserve(e.target)
                    reveal(e.target as HTMLElement, SplitText)
                  }
                },
                { rootMargin: rootMargin(m.fadeUp.start) },
              )
              headings.forEach((h) => io.observe(h))
              observers.push(io)
            }),
            showAll,
          )
        }
      }

      return () => {
        live = false
        observers.forEach((o) => o.disconnect())
        cleanups.forEach((fn) => fn())
        cleanups = []
      }
    },
    { dependencies: [pathname], revertOnUpdate: true },
  )

  return null
}
