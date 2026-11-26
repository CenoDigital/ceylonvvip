import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { buildThemeCss, buildTokensCss, fluid } from './css.ts'
import { palette, text, theme } from './tokens.ts'

const read = (name: string) => readFileSync(new URL(name, import.meta.url), 'utf8')

describe('generated CSS', () => {
  it('tokens.css matches tokens.ts (run the build script if this fails)', () => {
    expect(read('./tokens.css')).toBe(buildTokensCss())
  })

  it('theme.css matches tokens.ts (run the build script if this fails)', () => {
    expect(read('./theme.css')).toBe(buildThemeCss())
  })
})

describe('tokens', () => {
  it('light and dark themes define the same colours', () => {
    expect(Object.keys(theme.dark).sort()).toEqual(Object.keys(theme.light).sort())
  })

  it('every theme colour points at a palette entry', () => {
    for (const mode of [theme.light, theme.dark]) {
      for (const ref of Object.values(mode)) expect(palette).toHaveProperty(ref)
    }
  })

  it('has no gradient or foil gold', () => {
    const all = JSON.stringify({ palette, theme }).toLowerCase()
    expect(all).not.toMatch(/gradient|foil/)
  })

  it('pairs with a mobile style shrink on small screens', () => {
    for (const style of Object.values(text)) {
      if ('mobile' in style) expect(style.mobile.size).toBeLessThan(style.desktop.size)
    }
  })
})

describe('fluid', () => {
  it('returns a fixed value when both ends match', () => {
    expect(fluid(16, 16)).toBe('1rem')
  })

  it('hits the mobile size at 390px and the desktop size at 1440px', () => {
    const value = fluid(42, 84)
    const [, minRem, interceptRem, slopeVw, maxRem] =
      /clamp\(([\d.]+)rem, ([-\d.]+)rem \+ ([\d.]+)vw, ([\d.]+)rem\)/.exec(value) ?? []
    const at = (width: number) => Number(interceptRem) * 16 + (Number(slopeVw) / 100) * width
    expect(Number(minRem) * 16).toBe(42)
    expect(Number(maxRem) * 16).toBe(84)
    expect(at(390)).toBeCloseTo(42, 1)
    expect(at(1440)).toBeCloseTo(84, 1)
  })
})
