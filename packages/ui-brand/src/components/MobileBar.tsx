'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

import { Icon, type IconName } from '../icons/Icon'
import { cn } from '../lib/cn'

export interface MobileBarItem {
  label: string
  icon?: IconName
  /** A link, or `menu` to open the mobile menu. */
  href?: string
  onMenu?: boolean
}

export interface MobileBarProps {
  items: MobileBarItem[]
  onOpenMenu?: () => void
  /** Hide while a form field has focus (the keyboard is up). */
  className?: string
  children?: ReactNode
}

/**
 * Prestige/Bar/Mobile: thumb bar fixed to the bottom of the screen on phones.
 * Shows when scrolling up, hides when scrolling down and while a form field has focus.
 * Bottom padding includes the phone's safe area. The last item is the filled one.
 */
export function MobileBar({ items, onOpenMenu, className }: MobileBarProps) {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (Math.abs(y - lastY.current) < 8) return
      setHidden(y > lastY.current && y > 80)
      lastY.current = y
    }
    const isField = (t: EventTarget | null) =>
      t instanceof HTMLElement && t.matches('input, textarea, select')
    const onFocusIn = (e: FocusEvent) => isField(e.target) && setHidden(true)
    const onFocusOut = (e: FocusEvent) => isField(e.target) && setHidden(false)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('focusout', onFocusOut)
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('focusout', onFocusOut)
    }
  }, [])

  return (
    <nav
      aria-label="Quick actions"
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 flex gap-12 border-t border-border bg-background px-16 pt-12 lg:hidden',
        'pb-[max(28px,env(safe-area-inset-bottom))] drop-shadow-[0_-4px_8px_rgb(0_0_0/0.06)]',
        'transition-transform duration-300 ease-power2-out',
        hidden && 'translate-y-full',
        className,
      )}
    >
      {items.map((item, i) => {
        const filled = i === items.length - 1
        const cls = cn(
          'flex h-52 min-w-0 flex-1 items-center justify-center gap-10 rounded-full text-button-caps',
          'outline-ring focus-visible:outline-2',
          filled
            ? 'bg-primary text-primary-foreground'
            : 'border border-foreground text-foreground',
        )
        const content = (
          <>
            {item.icon ? <Icon name={item.icon} size={18} /> : null}
            {item.label}
          </>
        )
        return item.onMenu ? (
          <button key={item.label} type="button" className={cls} onClick={onOpenMenu}>
            {content}
          </button>
        ) : (
          <a key={item.label} href={item.href} className={cls}>
            {content}
          </a>
        )
      })}
    </nav>
  )
}
