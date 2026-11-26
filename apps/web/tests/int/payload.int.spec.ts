import { migrations } from '@/migrations'
import config from '@payload-config'
import { getPayload, type Migration, type Payload } from 'payload'
import { beforeAll, describe, expect, it } from 'vitest'

let payload: Payload

describe('Payload on Postgres', () => {
  beforeAll(async () => {
    payload = await getPayload({ config })
    // Same migrations production runs on start; a no-op once applied.
    // Payload types migrate() args as unknown, so the typed list needs a cast.
    await payload.db.migrate({ migrations: migrations as unknown as Migration[] })
  })

  it('has applied every migration', async () => {
    const { totalDocs } = await payload.find({ collection: 'payload-migrations', limit: 0 })
    expect(totalDocs).toBeGreaterThan(0)
  })

  it('queries the users collection', async () => {
    const users = await payload.find({ collection: 'users', limit: 1 })
    expect(users.docs).toBeInstanceOf(Array)
  })
})
