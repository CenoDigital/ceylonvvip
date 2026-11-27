import { afterEach, describe, expect, it, vi } from 'vitest'

import { getSiteUrl } from './site-url'
import { absolute } from './seo'

afterEach(() => vi.unstubAllEnvs())

describe('getSiteUrl', () => {
  it('reads SITE_URL each time it is called, without a trailing slash', () => {
    vi.stubEnv('SITE_URL', 'https://staging.ceylonvvip.com/')
    expect(getSiteUrl()).toBe('https://staging.ceylonvvip.com')
    vi.stubEnv('SITE_URL', 'https://ceylonvvip.com')
    expect(absolute('/fleet')).toBe('https://ceylonvvip.com/fleet')
  })

  it('falls back to the local server', () => {
    vi.stubEnv('SITE_URL', '')
    expect(getSiteUrl()).toBe('http://localhost:3000')
  })
})
