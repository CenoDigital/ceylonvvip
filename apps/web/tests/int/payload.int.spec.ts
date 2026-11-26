import config from '@payload-config'
import { getPayload, type Payload } from 'payload'
import { beforeAll, describe, expect, it } from 'vitest'

let payload: Payload

describe('Payload on Postgres', () => {
  beforeAll(async () => {
    payload = await getPayload({ config })
  })

  it('queries the users collection', async () => {
    const users = await payload.find({ collection: 'users', limit: 1 })
    expect(users.docs).toBeInstanceOf(Array)
  })
})
