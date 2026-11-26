import type { ReactNode } from 'react'

import { Icon } from '../icons/Icon'
import { cn } from '../lib/cn'
import { LinkUnderline } from './LinkUnderline'

export interface NavLink {
  label: string
  href: string
}

export interface SiteNavProps {
  /** Links left of the wordmark on desktop. */
  left: NavLink[]
  /** Links right of the wordmark on desktop. */
  right: NavLink[]
  /** The underlined call to action at the far right, like Concierge. */
  action?: NavLink
  /** Language switcher content (globe and code). */
  language?: ReactNode
  /** Wordmark; defaults to the CEYLONVVIP text wordmark from Figma. */
  wordmark?: ReactNode
  homeHref?: string
  /** Mobile menu button handler (client side). */
  menuButton?: ReactNode
  className?: string
}

const navText =
  'text-nav-caps text-foreground transition-colors duration-200 hover:text-muted-foreground'

/**
 * Prestige/Nav: centred wordmark on ivory with a hairline below.
 * Desktop: links either side, language and Concierge on the right.
 * Mobile: language left, wordmark centre, menu right.
 */
export function SiteNav({
  left,
  right,
  action,
  language,
  wordmark = 'CeylonVVIP',
  homeHref = '/',
  menuButton,
  className,
}: SiteNavProps) {
  const link = (l: NavLink) => (
    <a
      key={`${l.label}-${l.href}`}
      href={l.href}
      className={cn(navText, 'inline-flex min-h-44 items-center')}
    >
      {l.label}
    </a>
  )
  return (
    <header className={cn('border-b border-border bg-background', className)}>
      <nav aria-label="Main" className="flex items-center px-24 py-12 lg:px-64 lg:py-28">
        <div className="flex w-56 items-center lg:w-auto lg:flex-1 lg:gap-40">
          <span className="lg:hidden">{language}</span>
          <div className="hidden items-center gap-40 lg:flex">{left.map(link)}</div>
        </div>
        <a
          href={homeHref}
          className="flex min-h-44 flex-1 items-center justify-center text-wordmark-caps text-foreground lg:flex-1 lg:text-[18px]"
        >
          {wordmark}
        </a>
        <div className="flex w-56 items-center justify-end lg:w-auto lg:flex-1 lg:gap-40">
          <div className="hidden items-center gap-40 lg:flex">
            {right.map(link)}
            {language}
            {action ? <LinkUnderline href={action.href}>{action.label}</LinkUnderline> : null}
          </div>
          <span className="lg:hidden">{menuButton}</span>
        </div>
      </nav>
    </header>
  )
}

/** The globe and language code used in the nav (Figma: Language). */
export function LanguageLabel({ code = 'EN' }: { code?: string }) {
  return (
    <span className={cn(navText, 'inline-flex items-center gap-8')}>
      <Icon name="globe" size={16} className="hidden lg:block" />
      {code}
    </span>
  )
}
