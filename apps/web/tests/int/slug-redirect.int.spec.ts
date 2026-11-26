import { migrations } from '@/migrations'
import config from '@payload-config'
import { getPayload, type Migration, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

let payload: Payload
const suffix = Date.now().toString(36)

describe('automatic 301 on slug change', () => {
  beforeAll(async () => {
    payload = await getPayload({ config })
    await payload.db.migrate({ migrations: migrations as unknown as Migration[] })
  })

  afterAll(async () => {
    await payload.delete({ collection: 'redirects', where: { from: { contains: suffix } } })
    await payload.delete({ collection: 'pages', where: { slug: { contains: suffix } } })
  })

  it('redirects the old address of a published page to its new one', async () => {
    const page = await payload.create({
      collection: 'pages',
      data: { title: `Old ${suffix}`, slug: `old-${suffix}`, _status: 'published' },
    })
    await payload.update({
      collection: 'pages',
      id: page.id,
      data: { slug: `new-${suffix}`, _status: 'published' },
    })
    const { docs } = await payload.find({
      collection: 'redirects',
      where: { from: { equals: `/old-${suffix}` } },
      depth: 0,
    })
    expect(docs).toHaveLength(1)
    expect(docs[0]).toMatchObject({
      type: '301',
      to: { type: 'internal', reference: { relationTo: 'pages', value: page.id } },
    })
  })

  it('removes a redirect that would send the new address away', async () => {
    const { totalDocs } = await payload.find({
      collection: 'redirects',
      where: { from: { equals: `/new-${suffix}` } },
    })
    expect(totalDocs).toBe(0)
  })
})
