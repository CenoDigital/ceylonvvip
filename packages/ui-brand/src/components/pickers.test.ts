import { describe, expect, it } from 'vitest'

import { formatDateLong } from './pickers'

describe('formatDateLong', () => {
  it('writes dates as Figma does, without a comma', () => {
    expect(formatDateLong('2026-12-14')).toBe('Monday 14 December 2026')
  })

  it('returns nothing for an empty or malformed value', () => {
    expect(formatDateLong('')).toBe('')
    expect(formatDateLong('14/12/2026')).toBe('')
  })
})
