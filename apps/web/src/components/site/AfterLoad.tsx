'use client'

import { useEffect, useState, type ReactNode } from 'react'

/**
 * Task 169: renders its children once the page has loaded. Used for photos further down
 * the page, so they never share the network with the first photo on screen; their box
 * keeps its size and placeholder colour meanwhile, so nothing moves when they appear.
 */
export function AfterLoad({ children }: { children: ReactNode }) {
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
  return ready ? children : null
}
