import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '../lib/cn'

/**
 * Prestige/Button/Solid. Ink fill, ivory label in small spaced capitals; use once per
 * section. States from Figma: Hover (fill 86%), Focus (2px ring outside), Pressed
 * (fill 72%), Disabled (parchment). Colour changes over 200ms ease-out.
 */
export const buttonClass = cn(
  'inline-flex items-center justify-center gap-12 px-36 py-20 min-h-44',
  'bg-primary text-primary-foreground text-button-caps whitespace-nowrap',
  'transition-colors duration-200 ease-out',
  'hover:bg-primary/86 active:bg-primary/72',
  'outline-ring focus-visible:outline-2',
  'disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed',
  'aria-disabled:bg-muted aria-disabled:text-muted-foreground aria-disabled:pointer-events-none',
)

type ButtonProps = { children: ReactNode; className?: string } & (
  | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
)

export function Button({ children, className, ...props }: ButtonProps) {
  if (props.href !== undefined) {
    return (
      <a
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        className={cn(buttonClass, className)}
      >
        {children}
      </a>
    )
  }
  const { type = 'button', ...rest } = props as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type={type} {...rest} className={cn(buttonClass, className)}>
      {children}
    </button>
  )
}
