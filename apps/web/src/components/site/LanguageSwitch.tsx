'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { Icon, cn } from '@ceylonvvip/ui-brand'

import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_NAMES,
  LOCALE_TAGS,
  LOCALES,
  pathInLocale,
  type Locale,
} from '@/lib/locales'

/*
 * Language switch (task 163; Figma nav "EN" with a globe). Opens a short list of the
 * five languages; each link goes to the same page in that language.
 */
export function LanguageSwitch({ className, label }: { className?: string; label?: string }) {
  const pathname = usePathname() || '/'
  const first = pathname.split('/')[1]
  const current: Locale = isLocale(first) ? first : DEFAULT_LOCALE
  const details = useRef<HTMLDetailsElement>(null)

  // Close on a click outside or Escape.
  useEffect(() => {
    const close = (e: Event) => {
      const d = details.current
      if (!d?.open) return
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !d.contains(e.target as Node)) {
        d.open = false
      }
    }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', close)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', close)
    }
  }, [])

  return (
    <details ref={details} className={cn('group relative', className)}>
      <summary className="flex min-h-44 cursor-pointer list-none items-center gap-8 text-nav-caps text-foreground transition-colors hover:text-muted-foreground [&::-webkit-details-marker]:hidden">
        <Icon name="globe" size={16} />
        <span className="sr-only">{label ?? 'Language'}: </span>
        {current.toUpperCase()}
        <Icon
          name="chevron-down"
          size={12}
          className="transition-transform duration-300 group-open:rotate-180"
        />
      </summary>
      <ul className="absolute start-0 top-full lg:start-auto lg:end-0 z-50 mt-8 min-w-180 border border-border bg-background py-8 shadow-[0_24px_48px_-24px_rgba(26,22,18,0.35)]">
        {LOCALES.map((l) => (
          <li key={l}>
            <a
              href={pathInLocale(pathname, l)}
              hrefLang={LOCALE_TAGS[l]}
              lang={LOCALE_TAGS[l]}
              aria-current={l === current ? 'true' : undefined}
              className={cn(
                'flex items-center justify-between gap-16 px-20 py-10 text-small transition-colors hover:bg-accent',
                l === current ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {LOCALE_NAMES[l]}
              <span className="text-label-caps text-brand">{l.toUpperCase()}</span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}
