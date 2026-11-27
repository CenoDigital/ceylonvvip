import { Icon } from '@ceylonvvip/ui-brand'

/**
 * "Swipe" on touch screens, "Drag" with a mouse, with a small double arrow that nudges
 * sideways: a hint that the row moves. Decorative; the buttons and tabs carry the meaning.
 */
export function SwipeHint({ swipe, drag }: { swipe?: string; drag?: string }) {
  return (
    <span aria-hidden className="flex items-center gap-8 text-label-caps text-brand">
      {/* The Figma arrows, nudging apart and back (motion-safe only). */}
      <span className="flex items-center motion-safe:animate-[swipe-nudge_2.4s_ease-in-out_infinite]">
        <Icon name="arrow-left" size={14} />
        <Icon name="arrow-right" size={14} />
      </span>
      <span className="[@media(pointer:fine)]:hidden">{swipe ?? 'Swipe'}</span>
      <span className="hidden [@media(pointer:fine)]:inline">{drag ?? 'Drag'}</span>
    </span>
  )
}
