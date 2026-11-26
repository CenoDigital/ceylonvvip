import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { cn } from '../lib/cn'

/**
 * Prestige/Link/Underline. Text in small spaced capitals over a 1px ink line.
 * Hover: text and line dim to muted while the line redraws from the left (300ms).
 * Focus: accent highlight. The tap area is padded to 44px without changing the look.
 */
export const linkUnderlineClass = cn(
  'group relative inline-flex flex-col items-start pb-6 text-button-caps text-foreground whitespace-nowrap',
  'border-b border-transparent transition-colors duration-300 ease-power2-out',
  'hover:text-muted-foreground focus-visible:bg-accent focus-visible:outline-none',
  // 44px tap target: the visible link is 26px tall.
  'before:absolute before:inset-x-0 before:-inset-y-9 before:content-[""]',
)

export function LinkUnderline({
  children,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return (
    <a {...props} className={cn(linkUnderlineClass, className)}>
      {children}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-current group-hover:animate-line-draw motion-reduce:group-hover:animate-none"
      />
    </a>
  )
}
