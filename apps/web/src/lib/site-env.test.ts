import { describe, expect, it } from 'vitest'

import { isProductionSite } from './site-env'

describe('isProductionSite', () => {
  it('is true only for production', () => {
    expect(isProductionSite('production')).toBe(true)
  })

  it.each([undefined, '', 'staging', 'Production', 'development'])('is false for %s', (env) => {
    expect(isProductionSite(env)).toBe(false)
  })
})
