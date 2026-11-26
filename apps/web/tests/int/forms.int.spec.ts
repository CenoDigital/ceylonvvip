import { randomUUID } from 'node:crypto'

import { migrations } from '@/migrations'
import config from '@payload-config'
import { getPayload, type Migration, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import type { User } from '@ceylonvvip/db'

let payload: Payload
let editor: User
const suffix = Date.now().toString(36)
const as = (user: User | null) => ({ overrideAccess: false as const, user })

describe('booking forms and requests', () => {
  beforeAll(async () => {
    payload = await getPayload({ config })
    await payload.db.migrate({ migrations: migrations as unknown as Migration[] })
    editor = await payload.create({
      collection: 'users',
      data: {
        email: `editor-${suffix}@test.ceylonvvip.local`,
        password: `Test-${randomUUID()}`,
        role: 'editor',
      },
    })
  })

  afterAll(async () => {
    await payload.delete({
      collection: 'form-submissions',
      where: { summary: { contains: suffix } },
    })
    await payload.delete({ collection: 'forms', where: { title: { contains: suffix } } })
    await payload.delete({ collection: 'users', where: { email: { contains: suffix } } })
  })

  it('lets anyone read a form, so the site can render it', async () => {
    const form = await payload.create({
      collection: 'forms',
      data: {
        title: `Booking ${suffix}`,
        serviceLabel: 'Service',
        dateLabel: 'Date',
        adultsLabel: 'Adults',
        submitLabel: 'Send',
      },
    })
    await expect(
      payload.findByID({ collection: 'forms', id: form.id, ...as(null) }),
    ).resolves.toMatchObject({
      submitLabel: 'Send',
    })
  })

  it('never lets anyone create booking requests through the API, only the site itself', async () => {
    const data = { summary: `Spam ${suffix}` }
    await expect(
      payload.create({ collection: 'form-submissions', data, ...as(null) }),
    ).rejects.toThrow()
    await expect(
      payload.create({ collection: 'form-submissions', data, ...as(editor) }),
    ).rejects.toThrow()
    // The server action stores requests with overrideAccess.
    await expect(
      payload.create({ collection: 'form-submissions', data: { summary: `Real ${suffix}` } }),
    ).resolves.toMatchObject({
      status: 'new',
    })
  })

  it('shows booking requests to editors but not to visitors', async () => {
    await expect(payload.find({ collection: 'form-submissions', ...as(null) })).rejects.toThrow()
    const seen = await payload.find({
      collection: 'form-submissions',
      where: { summary: { contains: suffix } },
      ...as(editor),
    })
    expect(seen.totalDocs).toBe(1)
  })
})
