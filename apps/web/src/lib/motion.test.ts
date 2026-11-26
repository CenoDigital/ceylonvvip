import { describe, expect, it } from 'vitest'

import { countFrame, gsapEase, motionBootScript } from './motion'

describe('gsapEase', () => {
  it('maps token eases to GSAP eases', () => {
    expect(gsapEase('power2-out')).toBe('power2.out')
    expect(gsapEase('power4-in-out')).toBe('power4.inOut')
    expect(gsapEase('out')).toBe('power1.out')
  })
})

describe('countFrame', () => {
  it('counts the number and keeps the text around it', () => {
    expect(countFrame('1,200+', 1200, 0)).toBe('0+')
    expect(countFrame('1,200+', 1200, 640.4)).toBe('640+')
    expect(countFrame('24/7', 24, 12)).toBe('12/7')
  })

  it('keeps decimals steady while counting', () => {
    expect(countFrame('4.9 rating', 4.9, 2.345)).toBe('2.3 rating')
  })

  it('leaves text alone when the number is not in it', () => {
    expect(countFrame('Many', 12, 3)).toBe('Many')
  })
})

describe('motionBootScript', () => {
  it('is valid JavaScript', () => {
    expect(() => new Function(motionBootScript)).not.toThrow()
  })
})
