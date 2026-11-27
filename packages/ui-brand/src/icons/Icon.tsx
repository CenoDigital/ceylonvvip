import type { SVGProps } from 'react'

import { ICON_PATHS, WHATSAPP_PATH } from './paths'

export type IconName = keyof typeof ICON_PATHS | 'whatsapp'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  name: IconName
  /** Rendered size in px (Figma uses 18, 20 and 24). */
  size?: number
  /** Accessible name. Without one the icon is decorative and hidden from screen readers. */
  label?: string
}

/** Figma Icon/*: 24px grid, 1.5px rounded strokes, coloured by the surrounding text. */
export function Icon({ name, size = 24, label, ...rest }: IconProps) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true }
  return (
    <svg
      data-icon={name}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...a11y}
      {...rest}
    >
      {name === 'whatsapp' ? (
        <path d={WHATSAPP_PATH} fill="currentColor" />
      ) : (
        ICON_PATHS[name].map((d) => (
          <path
            key={d}
            d={d}
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))
      )}
    </svg>
  )
}
