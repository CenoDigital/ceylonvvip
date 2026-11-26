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

describe('content collections', () => {
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
    for (const collection of ['pages', 'services', 'vehicles'] as const) {
      await payload.delete({ collection, where: { slug: { contains: suffix } } })
    }
    await payload.delete({ collection: 'pricing', where: { label: { contains: suffix } } })
    await payload.delete({ collection: 'redirects', where: { from: { contains: suffix } } })
    await payload.delete({ collection: 'users', where: { email: { contains: suffix } } })
  })

  it('lets an editor create a page, a service and a vehicle, with slugs from the title', async () => {
    const page = await payload.create({
      collection: 'pages',
      data: { title: `About Us ${suffix}`, _status: 'published' },
      ...as(editor),
    })
    expect(page.slug).toBe(`about-us-${suffix}`)

    const service = await payload.create({
      collection: 'services',
      data: { title: `Airport Transfers ${suffix}`, _status: 'published' },
      ...as(editor),
    })
    expect(service.slug).toBe(`airport-transfers-${suffix}`)

    const vehicle = await payload.create({
      collection: 'vehicles',
      data: {
        name: `Executive Sedan ${suffix}`,
        seats: 3,
        services: [service.id],
        _status: 'published',
      },
      ...as(editor),
    })
    expect(vehicle.slug).toBe(`executive-sedan-${suffix}`)
  })

  it('hides drafts from visitors but shows them to editors', async () => {
    await payload.create({
      collection: 'services',
      data: { title: `Draft Service ${suffix}` },
      draft: true,
      ...as(editor),
    })
    const where = { slug: { equals: `draft-service-${suffix}` } }
    const publicView = await payload.find({ collection: 'services', where, ...as(null) })
    const editorView = await payload.find({
      collection: 'services',
      where,
      draft: true,
      ...as(editor),
    })
    expect(publicView.totalDocs).toBe(0)
    expect(editorView.totalDocs).toBe(1)
  })

  it('keeps version history', async () => {
    const page = await payload.create({
      collection: 'pages',
      data: { title: `Versions ${suffix}`, _status: 'published' },
      ...as(editor),
    })
    await payload.update({
      collection: 'pages',
      id: page.id,
      data: { title: `Versions ${suffix} edited`, _status: 'published' },
      ...as(editor),
    })
    const versions = await payload.findVersions({
      collection: 'pages',
      where: { parent: { equals: page.id } },
    })
    expect(versions.totalDocs).toBeGreaterThanOrEqual(2)
  })

  it('refuses page slugs the site itself uses, and duplicate slugs', async () => {
    await expect(
      payload.create({
        collection: 'pages',
        data: { title: 'Admin', slug: 'admin' },
        ...as(editor),
      }),
    ).rejects.toThrow()
    await expect(
      payload.create({
        collection: 'pages',
        data: { title: `About Us ${suffix}`, _status: 'published' },
        ...as(editor),
      }),
    ).rejects.toThrow()
  })

  it('defaults prices to On request and needs an amount and currency otherwise', async () => {
    const onRequest = await payload.create({
      collection: 'pricing',
      data: { label: `Transfer ${suffix}` },
      ...as(editor),
    })
    expect(onRequest.displayMode).toBe('onRequest')

    await expect(
      payload.create({
        collection: 'pricing',
        data: { label: `From ${suffix}`, displayMode: 'from' },
        ...as(editor),
      }),
    ).rejects.toThrow()

    const from = await payload.create({
      collection: 'pricing',
      data: { label: `From ${suffix}`, displayMode: 'from', amount: 120, currency: 'USD' },
      ...as(editor),
    })
    expect(from.amount).toBe(120)
  })

  it('validates redirects', async () => {
    await expect(
      payload.create({
        collection: 'redirects',
        data: { from: `no-slash-${suffix}`, to: { type: 'url', url: '/new' } },
        ...as(editor),
      }),
    ).rejects.toThrow()
    const redirect = await payload.create({
      collection: 'redirects',
      data: { from: `/old-${suffix}`, to: { type: 'url', url: '/new' } },
      ...as(editor),
    })
    expect(redirect.type).toBe('301')
  })

  it('does not let visitors write content', async () => {
    await expect(
      payload.create({ collection: 'pages', data: { title: `Anon ${suffix}` }, ...as(null) }),
    ).rejects.toThrow()
  })
})
