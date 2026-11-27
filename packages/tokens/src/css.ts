import {
  ease,
  font,
  motion,
  palette,
  radius,
  space,
  text,
  theme,
  viewport,
  type TextStyle,
} from './tokens.ts'

const HEADER =
  '/* Generated from src/tokens.ts by `pnpm --filter @ceylonvvip/tokens generate`. Do not edit. */\n'

const round = (n: number, places = 4) => Number(n.toFixed(places))
const rem = (px: number) => `${round(px / 16)}rem`
const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)

type Entry = [name: string, value: string]
const block = (entries: Entry[], indent = '  ') =>
  entries.map(([k, v]) => `${indent}--${k}: ${v};`).join('\n')

/** Linear interpolation from the mobile to the desktop viewport, clamped at both ends. */
export function fluid(mobilePx: number, desktopPx: number, unit: 'rem' | 'px' = 'rem'): string {
  const fmt = (px: number) => (unit === 'rem' ? rem(px) : `${round(px, 3)}px`)
  if (mobilePx === desktopPx) return fmt(desktopPx)
  const slope = (desktopPx - mobilePx) / (viewport.desktop - viewport.mobile)
  const intercept = mobilePx - slope * viewport.mobile
  const min = Math.min(mobilePx, desktopPx)
  const max = Math.max(mobilePx, desktopPx)
  return `clamp(${fmt(min)}, ${fmt(intercept)} + ${round(slope * 100)}vw, ${fmt(max)})`
}

// Names below follow Tailwind v4's theme namespaces (--text-*, --radius-*, --font-*,
// --ease-*), so the same entries serve plain CSS and the Tailwind theme.

const colorEntries = (mode: keyof typeof theme): Entry[] =>
  Object.entries(theme[mode]).map(([k, v]) => [k, `var(--palette-${v})`])

const paletteEntries: Entry[] = Object.entries(palette).map(([k, v]) => [`palette-${k}`, v])

const spaceEntries: Entry[] = space.map((s) => [`space-${s}`, rem(s)])

const radiusEntries: Entry[] = Object.entries(radius).map(([k, v]) => [
  `radius-${k}`,
  v === 0 ? '0' : `${v}px`,
])

const fontEntries: Entry[] = Object.entries(font).map(([k, v]) => [
  `font-${k}`,
  `'${v}', ui-sans-serif, system-ui, sans-serif`,
])

const textEntries: Entry[] = Object.entries(text).flatMap(([name, s]) => {
  const style = s as TextStyle
  const d = style.desktop
  const m = style.mobile ?? d
  return [
    [`text-${name}`, fluid(m.size, d.size)],
    [`text-${name}--line-height`, fluid(m.lineHeight, d.lineHeight)],
    [`text-${name}--letter-spacing`, fluid(m.tracking * m.size, d.tracking * d.size, 'px')],
    [`text-${name}--font-weight`, String(style.weight)],
  ] satisfies Entry[]
})

const easeEntries: Entry[] = Object.entries(ease).map(([k, v]) => [`ease-${k}`, v.css])

const durationEntries = (override?: number): Entry[] =>
  Object.entries(motion)
    .filter(([preset]) => preset !== 'reducedMotion')
    .flatMap(([preset, values]) =>
      Object.entries(values)
        .filter(([key, value]) => typeof value === 'number' && /duration|stagger|hold/i.test(key))
        .filter(([key]) => override === undefined || /duration/i.test(key))
        .map(([key, value]): Entry => [
          `motion-${kebab(preset)}-${kebab(key)}`,
          `${override ?? value}ms`,
        ]),
    )

/** Plain CSS variables. Import once per app, before any component styles. */
export function buildTokensCss(): string {
  const root = [
    '  /* Palette */',
    block(paletteEntries),
    '',
    '  /* Theme colours, light (default). shadcn/ui names. */',
    block(colorEntries('light')),
    '',
    '  /* Space */',
    block(spaceEntries),
    '',
    '  /* Radius */',
    block(radiusEntries),
    '  --radius: var(--radius-lg);',
    '',
    '  /* Fonts */',
    block(fontEntries),
    '',
    `  /* Type, fluid from ${viewport.mobile}px to ${viewport.desktop}px wide */`,
    block(textEntries),
    '',
    '  /* Motion */',
    block(easeEntries),
    block(durationEntries()),
  ].join('\n')

  return (
    HEADER +
    `:root {\n${root}\n}\n\n` +
    `/* Theme colours, dark. Opt in with class="dark" (shadcn) or data-theme="dark". */\n` +
    // No reduced-motion override (task 169): the client chose full motion for everyone.
    `.dark,\n[data-theme='dark'] {\n${block(colorEntries('dark'))}\n}\n`
  )
}

/**
 * Tailwind v4 theme. Import after `tailwindcss` and tokens.css. Colours are inline
 * references so they follow light and dark; the rest are the same values as tokens.css.
 * Spacing is 1px per step, so `p-16` is 16px and matches Figma's space/16.
 */
export function buildThemeCss(): string {
  const colors: Entry[] = [
    ...Object.keys(theme.light).map((k): Entry => [`color-${k}`, `var(--${k})`]),
    ...Object.keys(palette).map((k): Entry => [`color-${k}`, `var(--palette-${k})`]),
  ]
  const uppercase = Object.entries(text)
    .filter(([, v]) => 'uppercase' in v && v.uppercase)
    .map(
      ([k]) =>
        `@utility text-${k}-caps {\n  font-size: var(--text-${k});\n  line-height: var(--text-${k}--line-height);\n` +
        `  letter-spacing: var(--text-${k}--letter-spacing);\n  font-weight: var(--text-${k}--font-weight);\n` +
        `  text-transform: uppercase;\n}`,
    )
  return (
    HEADER +
    `@theme inline {\n  --color-*: initial;\n${block(colors)}\n}\n\n` +
    `@theme {\n  --spacing: 1px;\n  --radius-*: initial;\n${block(radiusEntries)}\n  --font-*: initial;\n${block(fontEntries)}\n` +
    `  --text-*: initial;\n${block(textEntries)}\n  --ease-*: initial;\n${block(easeEntries)}\n}\n\n` +
    `/* Styles that are uppercase in Figma: text-label-caps, text-button-caps, ... */\n` +
    uppercase.join('\n\n') +
    '\n'
  )
}
