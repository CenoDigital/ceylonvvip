import { describe, expect, it } from 'vitest'

import { slugify } from './slug'

describe('slugify', () => {
  it('lowercases and joins words with hyphens', () => {
    expect(slugify('Airport Transfers')).toBe('airport-transfers')
  })

  it('strips accents and symbols', () => {
    expect(slugify('Café & Tea Tour!')).toBe('cafe-and-tea-tour')
  })

  it('trims leading and trailing separators', () => {
    expect(slugify('  --Wedding  Honeymoon--  ')).toBe('wedding-honeymoon')
  })

  it('returns an empty string when nothing is left', () => {
    expect(slugify('!!!')).toBe('')
  })
})
