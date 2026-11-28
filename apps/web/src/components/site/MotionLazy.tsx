'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Task 169: the scroll animations (GSAP) and smooth scrolling (Lenis) load once the page
// has loaded, so their scripts never compete with the first photo on screen. The hero
// intro is plain CSS and runs at once; the boot script still shows everything after 4 s
// if the scripts never arrive.
const Motion = dynamic(() => import('./Motion').then((m) => m.Motion), { ssr: false })
const SmoothScroll = dynamic(() => import('./SmoothScroll').then((m) => m.SmoothScroll), {
  ssr: false,
})

export function MotionLazy() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const done = () => setReady(true)
    if (document.readyState === 'complete') {
      const timer = window.setTimeout(done, 0)
      return () => window.clearTimeout(timer)
    }
    window.addEventListener('load', done, { once: true })
    return () => window.removeEventListener('load', done)
  }, [])
  return ready ? (
    <>
      <Motion />
      <SmoothScroll />
    </>
  ) : null
}
