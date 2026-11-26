import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

export interface FeatureSignatureProps {
  label?: ReactNode
  title: ReactNode
  text?: ReactNode
  /** Usually a LinkUnderline. */
  action?: ReactNode
  /** The photo (next/image with fill). Without one, the parchment placeholder shows. */
  image?: ReactNode
  /** Figma Layout: Image left or Image right (desktop). Mobile always stacks. */
  imageSide?: 'left' | 'right'
  className?: string
}

/**
 * Prestige/Feature/Signature: large photo (720 by 840 on desktop, full width by 440 on
 * phones) beside a label, H1 title, lead text and a link.
 */
export function FeatureSignature({
  label,
  title,
  text,
  action,
  image,
  imageSide = 'left',
  className,
}: FeatureSignatureProps) {
  return (
    <article
      className={cn(
        'flex flex-col gap-32 lg:flex-row lg:items-center lg:gap-120',
        imageSide === 'left' ? 'lg:pr-64' : 'lg:flex-row-reverse lg:pl-64',
        className,
      )}
    >
      <div className="relative h-440 w-full shrink-0 overflow-hidden bg-placeholder lg:h-840 lg:w-1/2">
        {image}
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-20 px-24 lg:gap-28 lg:px-0">
        {label ? <p className="text-label-caps text-brand">{label}</p> : null}
        <h3 className="font-display text-h1 text-foreground">{title}</h3>
        {text ? <p className="text-body text-muted-foreground lg:text-lead">{text}</p> : null}
        {action}
      </div>
    </article>
  )
}
