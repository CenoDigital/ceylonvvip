/** The icon set in Figma (03 Design system, Icon/*): Lucide-style plus WhatsApp. */
export const ICONS = [
  'arrow-left',
  'arrow-right',
  'arrow-up-right',
  'bed',
  'calendar',
  'car',
  'check',
  'chevron-down',
  'clock',
  'compass',
  'droplet',
  'gem',
  'glass-water',
  'globe',
  'heart',
  'home',
  'map-pin',
  'menu',
  'phone',
  'plane',
  'shield',
  'square',
  'square-check',
  'whatsapp',
  'wifi',
  'x',
] as const

export type IconName = (typeof ICONS)[number]

export const iconOptions = ICONS.map((value) => ({ value, label: value }))
