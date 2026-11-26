import { randomUUID } from 'node:crypto'

import { migrations } from '@/migrations'
import { pageBlocks } from '@/payload/blocks'
import config from '@payload-config'
import { getPayload, type Migration, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import type { Page, User } from '@ceylonvvip/db'

let payload: Payload
let editor: User
const suffix = Date.now().toString(36)
const as = (user: User | null) => ({ overrideAccess: false as const, user })

const paragraph = (text: string) => ({
  root: {
    type: 'root',
    version: 1,
    direction: null,
    format: '' as const,
    indent: 0,
    children: [
      {
        type: 'paragraph',
        version: 1,
        direction: null,
        format: '' as const,
        indent: 0,
        textFormat: 0,
        children: [
          { type: 'text', version: 1, text, format: 0, detail: 0, mode: 'normal', style: '' },
        ],
      },
    ],
  },
})

// The smallest valid content for every block in the library.
const minimal: Record<string, Record<string, unknown>> = {
  hero: { heading: 'Island tours, made around you.', mediaType: 'none' },
  richText: { content: paragraph('In detail.') },
  servicesGrid: {},
  vehicleShowcase: {},
  fleetComparison: {},
  featureList: { items: [{ title: 'Met at arrivals' }] },
  stats: { items: [{ value: 24, label: 'Hours a day' }] },
  imageText: {},
  gallery: {},
  testimonials: {},
  faq: { topic: 'Transfers' },
  pricingTable: {},
  processSteps: { steps: [{ title: 'Before you fly' }] },
  ctaBanner: { heading: 'Tell us where you wish to go.' },
  form: {},
  map: {},
  logoStrip: {},
  destinations: { items: [{ name: 'Sigiriya' }] },
  spacer: {},
}

describe('page blocks', () => {
  let imageId: number
  let priceId: number

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
    const png = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64',
    )
    imageId = (
      await payload.create({
        collection: 'media',
        data: { alt: `Block image ${suffix}` },
        file: { data: png, mimetype: 'image/png', name: `block-${suffix}.png`, size: png.length },
      })
    ).id
    priceId = (
      await payload.create({
        collection: 'pricing',
        data: { label: `Block price ${suffix}` } as never,
      })
    ).id
    minimal.imageText = { image: imageId }
    minimal.gallery = { images: [imageId] }
    minimal.pricingTable = { items: [priceId] }
    minimal.logoStrip = { logos: [{ name: 'Partner', logo: imageId }] }
  })

  afterAll(async () => {
    await payload.delete({ collection: 'pages', where: { slug: { contains: suffix } } })
    await payload.delete({ collection: 'pricing', where: { label: { contains: suffix } } })
    await payload.delete({ collection: 'media', where: { alt: { contains: suffix } } })
    await payload.delete({ collection: 'users', where: { email: { contains: suffix } } })
  })

  it('has the 18 blocks from the plan plus Destinations', () => {
    expect(pageBlocks.map((b) => b.slug)).toEqual(Object.keys(minimal))
  })

  it('lets an editor build a page from every block, with section settings defaulted', async () => {
    const layout = pageBlocks.map((block) => ({ blockType: block.slug, ...minimal[block.slug] }))
    const page = (await payload.create({
      collection: 'pages',
      data: {
        title: `Every block ${suffix}`,
        _status: 'published',
        layout: layout as Page['layout'],
      },
      ...as(editor),
    })) as Page

    expect(page.layout?.map((b) => b.blockType)).toEqual(Object.keys(minimal))
    const hero = page.layout?.[0]
    expect(hero && 'settings' in hero ? hero.settings : null).toMatchObject({
      bg: 'default',
      anim: 'hero-intro',
    })
    const features = page.layout?.find((b) => b.blockType === 'featureList')
    expect(features && 'settings' in features ? features.settings?.anim : null).toBe(
      'stagger-children',
    )
  })

  it('offers hero-intro only on the Hero', async () => {
    await expect(
      payload.create({
        collection: 'pages',
        data: {
          title: `Bad animation ${suffix}`,
          layout: [
            { blockType: 'faq', topic: 'x', settings: { anim: 'hero-intro' } },
          ] as unknown as Page['layout'],
        },
        ...as(editor),
      }),
    ).rejects.toThrow()
  })

  it('also gives services the block library', async () => {
    const field = payload.collections.services.config.flattenedFields.find(
      (f) => f.name === 'layout',
    )
    expect(field?.type).toBe('blocks')
  })
})
