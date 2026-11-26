'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import { Icon } from '../icons/Icon'
import { cn } from '../lib/cn'

export interface MobileMenuProps {
  open: boolean
  onClose: () => void
  links: Array<{ label: string; href: string }>
  /** The concierge button (a Button). */
  action?: ReactNode
  /** Line under the button, like "Available 24 hours, +94 ...". */
  note?: ReactNode
  wordmark?: ReactNode
  closeLabel?: string
}

/**
 * Figma 13 Menu / Mobile: full-screen ivory panel with every link as a numbered row,
 * the concierge button and a close button in thumb reach. Opens with the motion spec's
 * mobile-menu timing (450ms power3.out, links staggered 50ms); closes in 300ms.
 * A native <dialog>, so focus is trapped and Escape closes it.
 */
export function MobileMenu({
  open,
  onClose,
  links,
  action,
  note,
  wordmark = 'CeylonVVIP',
  closeLabel = 'Close menu',
}: MobileMenuProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-label="Menu"
      onClose={onClose}
      onCancel={onClose}
      className={cn(
        'fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-background p-0 text-foreground backdrop:bg-transparent lg:hidden',
        'flex-col open:flex open:animate-menu-in motion-reduce:open:animate-none',
      )}
    >
      <div className="flex items-center px-24 py-22">
        <span className="text-wordmark-caps">{wordmark}</span>
      </div>
      <div className="min-h-0 flex-1" />
      <nav aria-label="Menu" className="overflow-y-auto px-24">
        <ol>
          {links.map((link, i) => (
            <li
              key={`${link.label}-${i}`}
              className="open-stagger"
              style={{
                animationDelay: `calc(${i} * var(--motion-mobile-menu-open-stagger, 50ms))`,
              }}
            >
              <a
                href={link.href}
                onClick={onClose}
                className="flex items-center gap-16 border-t border-border py-22 text-foreground focus-visible:bg-accent focus-visible:outline-none"
              >
                <span className="shrink-0 text-small text-brand">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1 font-display text-h3">{link.label}</span>
                <Icon name="arrow-right" size={18} />
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="flex flex-col gap-16 px-24 pt-32 pb-12 [&>a]:w-full">
        {action}
        {note ? <p className="text-small text-muted-foreground">{note}</p> : null}
      </div>
      <div className="px-24 pb-[max(28px,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={onClose}
          className="flex h-52 w-full items-center justify-center rounded-full border border-foreground text-button-caps outline-ring focus-visible:outline-2"
        >
          {closeLabel}
        </button>
      </div>
    </dialog>
  )
}
