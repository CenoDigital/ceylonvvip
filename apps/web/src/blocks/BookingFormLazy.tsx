'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

import type { BookingFormProps } from './BookingForm'

// Task 169: the form's script (validation, date picker and its locales, server action)
// is about 90 KB. Called from a client component, next/dynamic gives it its own chunk;
// it loads once the page has loaded, or straight away when the form is on screen, so it
// never competes with the first photo. The form needs JavaScript to submit in any case.
const BookingForm = dynamic(() => import('./BookingForm').then((m) => m.BookingForm), {
  ssr: false,
  loading: () => <FormPlaceholder />,
})

function FormPlaceholder() {
  return <div aria-hidden className="min-h-[56rem] w-full" />
}

export function BookingFormLazy(props: BookingFormProps) {
  const [show, setShow] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (show) return
    const go = () => setShow(true)
    const near = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) go()
      },
      { rootMargin: '600px 0px' },
    )
    if (box.current) near.observe(box.current)
    let timer = 0
    const later = () => {
      timer = window.setTimeout(go, 200)
    }
    if (document.readyState === 'complete') later()
    else window.addEventListener('load', later, { once: true })
    return () => {
      near.disconnect()
      window.removeEventListener('load', later)
      window.clearTimeout(timer)
    }
  }, [show])

  return show ? (
    <BookingForm {...props} />
  ) : (
    <div ref={box}>
      <FormPlaceholder />
    </div>
  )
}
