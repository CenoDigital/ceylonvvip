import type { Payload } from 'payload'
import { describe, expect, it, vi } from 'vitest'

import { seedIfEmpty } from './on-empty'

const fakePayload = (pages: number) =>
  ({
    count: vi.fn(async () => ({ totalDocs: pages })),
    logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
  }) as unknown as Payload

describe('seedIfEmpty', () => {
  it('does nothing unless SEED_ON_EMPTY is true', async () => {
    const seed = vi.fn()
    expect(await seedIfEmpty(fakePayload(0), {}, seed)).toBe('off')
    expect(seed).not.toHaveBeenCalled()
  })

  it('never seeds the live site', async () => {
    const seed = vi.fn()
    const env = { SEED_ON_EMPTY: 'true', SITE_ENV: 'production' }
    expect(await seedIfEmpty(fakePayload(0), env, seed)).toBe('production')
    expect(seed).not.toHaveBeenCalled()
  })

  it('leaves existing content alone', async () => {
    const seed = vi.fn()
    const env = { SEED_ON_EMPTY: 'true', SITE_ENV: 'staging' }
    expect(await seedIfEmpty(fakePayload(3), env, seed)).toBe('not-empty')
    expect(seed).not.toHaveBeenCalled()
  })

  it('seeds an empty staging database, and survives a failed seed', async () => {
    const env = { SEED_ON_EMPTY: 'true', SITE_ENV: 'staging' }
    const seed = vi.fn(async () => {})
    expect(await seedIfEmpty(fakePayload(0), env, seed)).toBe('seeded')
    expect(seed).toHaveBeenCalledOnce()
    const broken = vi.fn(async () => {
      throw new Error('boom')
    })
    expect(await seedIfEmpty(fakePayload(0), env, broken)).toBe('failed')
  })
})
