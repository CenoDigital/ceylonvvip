import { Icon } from '../icons/Icon'
import { cn } from '../lib/cn'

export interface FloatConciergeProps {
  href: string
  label?: string
  className?: string
}

/**
 * Prestige/Float/Concierge: fixed WhatsApp concierge button, bottom right of the
 * viewport. Desktop only; phones use the Mobile Bar instead.
 */
export function FloatConcierge({ href, label = 'Concierge', className }: FloatConciergeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed right-32 bottom-32 z-40 hidden items-center gap-14 rounded-full bg-primary py-8 pr-24 pl-8 lg:inline-flex',
        'text-button-caps text-primary-foreground drop-shadow-[0_8px_12px_rgb(0_0_0/0.12)]',
        'transition-colors duration-200 ease-out hover:bg-primary/86 active:bg-primary/72',
        'outline-ring focus-visible:outline-2',
        className,
      )}
    >
      <span className="flex rounded-full bg-background p-12 text-foreground">
        <Icon name="whatsapp" size={20} />
      </span>
      {label}
    </a>
  )
}
