/**
 * CeylonVVIP design tokens, exported from Figma file bIUkCC5TtQezAqa4RwLPI3:
 * the Primitives and Theme variable collections, the Outfit text styles and the
 * "Motion spec (GSAP)" section on 03 Design system.
 *
 * This file is the single source in code. `pnpm --filter @ceylonvvip/tokens generate`
 * regenerates tokens.css and theme.css from it. Change Figma first, then here.
 *
 * Deliberately left out: the Theme mode "White (previous)" and the "Gold foil" style.
 * Gold is always the flat gold and bronze below, never a gradient or foil.
 */

export const palette = {
  'ivory-25': '#faf7f0',
  'ivory-50': '#f8f6f1',
  'ivory-75': '#f6f3ec',
  'ivory-100': '#f0ede6',
  'ivory-200': '#e2ded6',
  'ivory-300': '#e3ded4',
  'parchment-100': '#f1ebdf',
  'gold-100': '#efe5d1',
  'gold-200': '#e3d3b3',
  'gold-500': '#b08d57',
  'bronze-300': '#cdae6a',
  'bronze-600': '#846429',
  'stone-300': '#b0aa9e',
  'stone-600': '#57534c',
  'ink-800': '#2e2b25',
  'ink-900': '#1c1a16',
  'ink-950': '#0e0d0b',
  'espresso-900': '#1c1a17',
  'red-700': '#b3261e',
  white: '#ffffff',
  whatsapp: '#25d366',
} as const

export type PaletteName = keyof typeof palette

/** Semantic colours with shadcn/ui names. Values point at palette entries. */
export const theme = {
  light: {
    background: 'ivory-25',
    foreground: 'espresso-900',
    card: 'parchment-100',
    'card-foreground': 'espresso-900',
    popover: 'ivory-25',
    'popover-foreground': 'espresso-900',
    primary: 'espresso-900',
    'primary-foreground': 'ivory-25',
    secondary: 'parchment-100',
    'secondary-foreground': 'espresso-900',
    muted: 'parchment-100',
    'muted-foreground': 'stone-600',
    accent: 'gold-100',
    'accent-foreground': 'espresso-900',
    destructive: 'red-700',
    border: 'gold-200',
    input: 'gold-200',
    ring: 'gold-500',
    brand: 'bronze-600',
    placeholder: 'gold-100',
    whatsapp: 'whatsapp',
  },
  dark: {
    background: 'ink-950',
    foreground: 'ivory-50',
    card: 'ink-900',
    'card-foreground': 'ivory-50',
    popover: 'ink-900',
    'popover-foreground': 'ivory-50',
    primary: 'ivory-50',
    'primary-foreground': 'ink-950',
    secondary: 'ink-900',
    'secondary-foreground': 'ivory-50',
    muted: 'ink-900',
    'muted-foreground': 'stone-300',
    accent: 'ink-800',
    'accent-foreground': 'ivory-50',
    destructive: 'red-700',
    border: 'ink-800',
    input: 'ink-800',
    ring: 'bronze-300',
    brand: 'bronze-300',
    placeholder: 'ink-900',
    whatsapp: 'whatsapp',
  },
} as const satisfies Record<'light' | 'dark', Record<string, PaletteName>>

export type ThemeColor = keyof typeof theme.light

/** Spacing scale in px (Figma space/4 to space/160). */
export const space = [4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 120, 160] as const

/** Corner radii in px. Figma stores full as 999. */
export const radius = { none: 0, lg: 24, full: 9999 } as const

export const font = {
  display: 'Outfit',
  text: 'Outfit',
} as const

/** Fluid type runs between these viewport widths (the two Figma frame widths). */
export const viewport = { mobile: 390, desktop: 1440 } as const

/**
 * One text style. Sizes and line heights in px; tracking in em (Figma percent / 100).
 * A style with `mobile` scales fluidly from mobile to desktop; one without is fixed.
 */
export interface TextStyle {
  font: keyof typeof font
  weight: 300 | 400 | 500
  uppercase?: true
  desktop: { size: number; lineHeight: number; tracking: number }
  mobile?: { size: number; lineHeight: number; tracking: number }
}

export const text = {
  hero: {
    font: 'display',
    weight: 300,
    desktop: { size: 120, lineHeight: 129.6, tracking: -0.025 },
    mobile: { size: 44, lineHeight: 49.28, tracking: -0.02 },
  },
  display: {
    font: 'display',
    weight: 300,
    desktop: { size: 84, lineHeight: 90, tracking: -0.035 },
    mobile: { size: 42, lineHeight: 48, tracking: -0.03 },
  },
  h1: {
    font: 'display',
    weight: 300,
    desktop: { size: 64, lineHeight: 72, tracking: -0.03 },
    mobile: { size: 38, lineHeight: 44, tracking: -0.025 },
  },
  h2: {
    font: 'display',
    weight: 300,
    desktop: { size: 46, lineHeight: 54, tracking: -0.025 },
    mobile: { size: 32, lineHeight: 38, tracking: -0.02 },
  },
  h3: {
    font: 'display',
    weight: 300,
    desktop: { size: 30, lineHeight: 38, tracking: -0.015 },
    mobile: { size: 24, lineHeight: 30, tracking: -0.01 },
  },
  quote: {
    font: 'display',
    weight: 300,
    desktop: { size: 40, lineHeight: 54, tracking: -0.02 },
    mobile: { size: 26, lineHeight: 36, tracking: -0.015 },
  },
  lead: {
    font: 'display',
    weight: 400,
    desktop: { size: 20, lineHeight: 32, tracking: 0 },
    mobile: { size: 17, lineHeight: 27, tracking: 0 },
  },
  // D/Title has no mobile style in Figma yet, so it is fixed at its desktop size.
  title: {
    font: 'display',
    weight: 300,
    desktop: { size: 96, lineHeight: 103.68, tracking: -0.02 },
  },
  h4: { font: 'text', weight: 300, desktop: { size: 22, lineHeight: 30, tracking: -0.01 } },
  body: { font: 'text', weight: 400, desktop: { size: 17, lineHeight: 28, tracking: 0 } },
  small: { font: 'text', weight: 400, desktop: { size: 15, lineHeight: 24, tracking: 0 } },
  numeral: { font: 'text', weight: 300, desktop: { size: 20, lineHeight: 26, tracking: 0.02 } },
  label: {
    font: 'text',
    weight: 500,
    uppercase: true,
    desktop: { size: 12, lineHeight: 16, tracking: 0.18 },
  },
  button: {
    font: 'text',
    weight: 500,
    uppercase: true,
    desktop: { size: 13, lineHeight: 20, tracking: 0.14 },
  },
  nav: {
    font: 'text',
    weight: 400,
    uppercase: true,
    desktop: { size: 13, lineHeight: 20, tracking: 0.12 },
  },
  roman: {
    font: 'text',
    weight: 400,
    uppercase: true,
    desktop: { size: 13, lineHeight: 20, tracking: 0.18 },
  },
  tab: {
    font: 'text',
    weight: 500,
    uppercase: true,
    desktop: { size: 10, lineHeight: 14, tracking: 0.1 },
  },
  wordmark: {
    font: 'text',
    weight: 400,
    uppercase: true,
    desktop: { size: 16, lineHeight: 24, tracking: 0.32 },
  },
} as const satisfies Record<string, TextStyle>

export type TextStyleName = keyof typeof text

/** Easings from the motion spec: GSAP name plus the CSS equivalent. */
export const ease = {
  'power1-out': { gsap: 'power1.out', css: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
  'power2-out': { gsap: 'power2.out', css: 'cubic-bezier(0.215, 0.61, 0.355, 1)' },
  'power2-in': { gsap: 'power2.in', css: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)' },
  'power3-out': { gsap: 'power3.out', css: 'cubic-bezier(0.165, 0.84, 0.44, 1)' },
  'power4-in-out': { gsap: 'power4.inOut', css: 'cubic-bezier(0.77, 0, 0.175, 1)' },
  out: { gsap: 'power1.out', css: 'ease-out' },
} as const

/** Motion presets from the Figma motion spec. Durations in ms, distances in px. */
export const motion = {
  heroIntro: {
    textDuration: 900,
    stagger: 120,
    rise: 40,
    imageDuration: 1400,
    imageScaleFrom: 1.08,
    ease: 'power3-out',
  },
  fadeUp: { duration: 700, rise: 24, ease: 'power2-out', start: 'top 85%' },
  staggerChildren: { duration: 600, stagger: 80, ease: 'power2-out', start: 'top 85%' },
  revealMask: { duration: 1100, ease: 'power4-in-out', start: 'top 80%' },
  imageParallax: { from: -8, to: 8, scrub: 0.6, desktopOnly: true },
  counter: { duration: 1400, ease: 'power1-out', start: 'top 85%' },
  lineDraw: { duration: 600, ease: 'power2-out' },
  button: { duration: 200, ease: 'out' },
  link: { duration: 300, ease: 'power2-out' },
  // Chip and Field: "150 to 200ms" in the spec; border and line changes use the shorter one.
  field: { duration: 150, fillDuration: 200, ease: 'out' },
  mobileMenu: {
    openDuration: 450,
    openStagger: 50,
    openEase: 'power3-out',
    closeDuration: 300,
    closeEase: 'power2-in',
  },
  toast: {
    inDuration: 300,
    outDuration: 200,
    hold: 4000,
    rise: 16,
    inEase: 'power2-out',
    outEase: 'power2-in',
  },
  reducedMotion: { duration: 300 },
} as const satisfies Record<string, Record<string, number | string | boolean>>

export const tokens = { palette, theme, space, radius, font, viewport, text, ease, motion } as const
export default tokens
