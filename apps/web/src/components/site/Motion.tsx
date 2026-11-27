'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import type { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger'
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
 * nothing at load); ScrollTrigger is loaded lazily, only for scrubbed effects. Only opacity,
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

/** Photos that wipe in as they scroll into view (not the hero or image presets). */
export const IMAGE_REVEAL_SELECTOR =
  'main img:not([data-animate="hero-intro"] img):not([data-animate="reveal-mask"] img):not([data-animate="image-parallax"] img):not([data-hscroll] img):not([data-no-reveal] img)'

/** Statement text whose words fill from faded to ink as it scrolls through the view. */
export const SCROLL_FILL_SELECTOR = 'main [data-scroll-fill]'

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

/** Desktop photo wipe tied to the scroll: open as the photo rises into the view. */
function scrubPhoto(img: HTMLElement) {
  const frame = img.parentElement ?? img
  gsap.fromTo(
    img,
    { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.22 },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      ease: 'none',
      scrollTrigger: { trigger: frame, start: 'top 98%', end: 'top 45%', scrub: 0.6 },
    },
  )
}

/*
 * Statement text (tasks 165 and 166): the words start faded and turn to ink one after
 * another, scrubbed to the scroll, and fade back when scrolling up. The statement is
 * held on screen while it fills: its wrapper ([data-fill-pin]) is made taller and the
 * panel inside is sticky (CSS), so the fill gets a full screen of scrolling. globals.css
 * shows the faded colour before this runs, so nothing flashes.
 */
function scrollFill(
  el: HTMLElement,
  SplitText: typeof SplitTextPlugin,
  ScrollTrigger: typeof ScrollTriggerPlugin,
) {
  const pin = el.closest<HTMLElement>('[data-fill-pin]')
  const split = SplitText.create(el, { type: 'words' })
  gsap.set(el, { color: 'var(--color-foreground)' })
  let trigger: Element = el
  if (pin) {
    pin.dataset.fillActive = ''
    const size = () => void (pin.style.height = `${Math.round(window.innerHeight * 2.2)}px`)
    size()
    ScrollTrigger.addEventListener('refreshInit', size)
    cleanups.push(() => {
      ScrollTrigger.removeEventListener('refreshInit', size)
      delete pin.dataset.fillActive
      pin.style.height = ''
    })
    trigger = pin
  }
  gsap.fromTo(
    split.words,
    { opacity: 0.14 },
    {
      opacity: 1,
      duration: 1,
      ease: 'none',
      stagger: 0.6,
      scrollTrigger: pin
        ? { trigger, start: 'top 55%', end: 'bottom bottom', scrub: 0.4 }
        : { trigger, start: 'top 85%', end: 'bottom 35%', scrub: 0.4 },
    },
  )
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
      // Full motion for every visitor, whatever their system's reduced-motion setting
      // (client decision, task 169: Windows "Animation effects" off turned it all off).
      const reduced = false
      // Desktop effects for any mouse or trackpad, at any window width (task 170).
      const desktop =
        matchMedia('(pointer: fine)').matches || matchMedia('(min-width: 1024px)').matches
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

      // Photos: wipe up from the bottom while settling from a slight zoom. On desktop
      // the wipe follows the scroll (scrubbed, like the statement text); on phones and
      // tablets it plays once as the photo comes into view (no ScrollTrigger to load).
      const photos = Array.from(document.querySelectorAll<HTMLElement>(IMAGE_REVEAL_SELECTOR))
      const fills = Array.from(document.querySelectorAll<HTMLElement>(SCROLL_FILL_SELECTOR))
      if (reduced) {
        gsap.set(photos, { clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set(fills, { color: 'var(--color-foreground)' })
      } else {
        const revealPhoto = contextSafe((img: HTMLElement) =>
          gsap.fromTo(
            img,
            { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.18 },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              scale: 1,
              duration: seconds(m.revealMask.duration) * 1.2,
              ease: gsapEase(m.revealMask.ease),
            },
          ),
        )
        if (photos.length && !desktop) {
          const io = new IntersectionObserver(
            (entries) => {
              for (const e of entries) {
                if (!e.isIntersecting && e.boundingClientRect.bottom >= 0) continue
                io.unobserve(e.target)
                // Wipe in once the photo has loaded (or after 1.5 s at most), so the
                // reveal shows the photo, not its loading state (task 166).
                const img = e.target as HTMLImageElement
                if (img.complete) revealPhoto(img)
                else {
                  let done = false
                  const go = () => {
                    if (done) return
                    done = true
                    revealPhoto(img)
                  }
                  img.addEventListener('load', go, { once: true })
                  img.addEventListener('error', go, { once: true })
                  setTimeout(go, 1500)
                }
              }
            },
            { rootMargin: '0px 0px -12% 0px' },
          )
          photos.forEach((p) => io.observe(p))
          observers.push(io)
        }
        if (fills.length || (photos.length && desktop)) {
          void Promise.all([import('gsap/ScrollTrigger'), import('gsap/SplitText')]).then(
            contextSafe(([{ ScrollTrigger }, { SplitText }]) => {
              if (!live) return
              gsap.registerPlugin(ScrollTrigger, SplitText)
              if (desktop) photos.forEach(scrubPhoto)
              fills.forEach((el) => scrollFill(el, SplitText, ScrollTrigger))
              ScrollTrigger.refresh()
            }),
            () => {
              gsap.set(photos, { clipPath: 'inset(0% 0% 0% 0%)' })
              gsap.set(fills, { color: 'var(--color-foreground)' })
            },
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
