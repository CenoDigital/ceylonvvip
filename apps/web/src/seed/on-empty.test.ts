import type { Payload } from 'payload'
import { describe, expect, it, vi } from 'vitest'

import { SEED_VERSION, seedIfEmpty } from './on-empty'

const fakePayload = (pages: number, loadedVersion: number | null = null) => {
  const store = new Map<string, unknown>(
    loadedVersion == null ? [] : [['seed-version', loadedVersion]],
  )
  return {
    count: vi.fn(async () => ({ totalDocs: pages })),
    kv: {
      get: vi.fn(async (k: string) => store.get(k) ?? null),
      set: vi.fn(async (k: string, v: unknown) => void store.set(k, v)),
    },
    logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
  } as unknown as Payload
}

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

  it('with SEED_REFRESH, reloads once when the seed version is newer', async () => {
    const env = { SEED_REFRESH: 'true', SITE_ENV: 'staging' }
    const seed = vi.fn(async () => {})
    const payload = fakePayload(4, SEED_VERSION - 1)
    expect(await seedIfEmpty(payload, env, seed)).toBe('refreshed')
    expect(await seedIfEmpty(payload, env, seed)).toBe('up-to-date')
    expect(seed).toHaveBeenCalledOnce()
  })

  it('without SEED_REFRESH, existing content is never reloaded', async () => {
    const seed = vi.fn()
    const env = { SEED_ON_EMPTY: 'true', SITE_ENV: 'staging' }
    expect(await seedIfEmpty(fakePayload(4, 0), env, seed)).toBe('not-empty')
    expect(seed).not.toHaveBeenCalled()
  })

  it('SEED_REFRESH is ignored on the live site', async () => {
    const seed = vi.fn()
    const env = { SEED_REFRESH: 'true', SITE_ENV: 'production' }
    expect(await seedIfEmpty(fakePayload(4, 0), env, seed)).toBe('production')
    expect(seed).not.toHaveBeenCalled()
  })
})
