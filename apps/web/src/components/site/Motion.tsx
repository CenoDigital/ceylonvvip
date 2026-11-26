'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'

import { motion as m } from '@ceylonvvip/tokens'

import { countFrame, gsapEase, seconds } from '@/lib/motion'

gsap.registerPlugin(useGSAP, ScrollTrigger)

declare global {
  interface Window {
    __motion?: boolean
  }
}

/*
 * Plays the animation preset each block picked in the CMS (its `data-animate`). The
 * hero intro is CSS (globals.css) so it starts with the first paint, before any JS.
 * Everything here only moves opacity, transform and clip-path, so nothing shifts
 * layout (CLS stays 0). Reduced motion: every preset becomes a short fade.
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

export function Motion() {
  const pathname = usePathname()

  useGSAP(
    () => {
      const root = document.documentElement
      window.__motion = true
      if (!root.classList.contains('motion')) return
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('[data-animate]:not([data-animate="hero-intro"])'),
      )
      const mm = gsap.matchMedia()

      mm.add(
        {
          full: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
          desktop: '(min-width: 1024px)',
        },
        (ctx) => {
          const { reduced, desktop } = ctx.conditions as Record<string, boolean>
          for (const section of sections) {
            const name = section.dataset.animate ?? ''
            const content = kids(section)
            if (reduced) {
              if (name !== 'image-parallax')
                gsap.from(content, {
                  opacity: 0,
                  duration: seconds(m.reducedMotion.duration),
                  scrollTrigger: { trigger: section, start: 'top 85%', once: true },
                })
            } else if (name === 'image-parallax') {
              if (desktop) parallax(section)
            } else if (PRESETS[name]) {
              const { preset, start } = PRESETS[name]
              const tl = gsap.timeline({
                scrollTrigger: { trigger: section, start, once: true },
              })
              preset(section, tl)
            }
            // The starting states are set, so the content can be shown (globals.css
            // hides it until now to avoid a flash of the final state).
            gsap.set(content, { visibility: 'visible' })
          }
          return () => {
            cleanups.forEach((fn) => fn())
            cleanups = []
          }
        },
      )
    },
    { dependencies: [pathname], revertOnUpdate: true },
  )

  return null
}
