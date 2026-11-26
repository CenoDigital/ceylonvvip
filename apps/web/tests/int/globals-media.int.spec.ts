import { randomUUID } from 'node:crypto'

import { CreateBucketCommand, HeadBucketCommand, S3Client } from '@aws-sdk/client-s3'
import { migrations } from '@/migrations'
import config from '@payload-config'
import { getPayload, type Migration, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import type { User } from '@ceylonvvip/db'

let payload: Payload
let admin: User
let editor: User
const suffix = Date.now().toString(36)
// Generated per run so no credential-like string is committed.
const password = `Test-${randomUUID()}`
const as = (user: User | null) => ({ overrideAccess: false as const, user })

// A 1x1 PNG, enough for sharp to produce every image size.
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
)

async function ensureBucket() {
  const bucket = process.env.S3_BUCKET
  if (!bucket) return
  const s3 = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION ?? 'us-east-1',
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
    },
  })
  try {
    await s3.send(new HeadBucketCommand({ Bucket: bucket }))
  } catch {
    await s3.send(new CreateBucketCommand({ Bucket: bucket }))
  }
}

describe('globals and media', () => {
  beforeAll(async () => {
    payload = await getPayload({ config })
    await payload.db.migrate({ migrations: migrations as unknown as Migration[] })
    await ensureBucket()
    admin = await payload.create({
      collection: 'users',
      data: { email: `admin-${suffix}@test.ceylonvvip.local`, password, role: 'admin' },
    })
    editor = await payload.create({
      collection: 'users',
      data: { email: `editor-${suffix}@test.ceylonvvip.local`, password, role: 'editor' },
    })
  })

  afterAll(async () => {
    await payload.delete({ collection: 'media', where: { alt: { contains: suffix } } })
    await payload.delete({ collection: 'users', where: { email: { contains: suffix } } })
  })

  it('lets anyone read every global, because the site renders from them', async () => {
    for (const slug of payload.config.globals.map((g) => g.slug)) {
      await expect(payload.findGlobal({ slug: slug as never, ...as(null) })).resolves.toBeDefined()
    }
  })

  it('lets editors change content globals but not settings', async () => {
    await expect(
      payload.updateGlobal({
        slug: 'contact-business',
        data: { whatsapp: '+94 77 000 0000' },
        ...as(editor),
      }),
    ).resolves.toMatchObject({ whatsapp: '+94 77 000 0000' })

    for (const slug of ['site-settings', 'seo-defaults', 'booking-settings'] as const) {
      await expect(payload.updateGlobal({ slug, data: {}, ...as(editor) }), slug).rejects.toThrow()
      await expect(
        payload.updateGlobal({ slug, data: {}, ...as(admin) }),
        slug,
      ).resolves.toBeDefined()
    }
  })

  it('stops visitors changing anything', async () => {
    await expect(
      payload.updateGlobal({ slug: 'header', data: { navigation: [] }, ...as(null) }),
    ).rejects.toThrow()
  })

  it('validates phone numbers and colours', async () => {
    await expect(
      payload.updateGlobal({
        slug: 'contact-business',
        data: { whatsapp: '0771234567' },
        ...as(admin),
      }),
    ).rejects.toThrow()
    await expect(
      payload.updateGlobal({ slug: 'site-settings', data: { brandColour: 'gold' }, ...as(admin) }),
    ).rejects.toThrow()
  })

  it('stores an uploaded image with its sizes and requires alt text', async () => {
    const file = { data: PNG, mimetype: 'image/png', name: `test-${suffix}.png`, size: PNG.length }
    await expect(
      payload.create({ collection: 'media', data: {} as never, file, ...as(editor) }),
    ).rejects.toThrow()

    const doc = await payload.create({
      collection: 'media',
      data: { alt: `Test image ${suffix}` },
      file,
      ...as(editor),
    })
    expect(doc.url).toBeTruthy()
    expect(Object.keys(doc.sizes ?? {})).toEqual(
      expect.arrayContaining(['thumbnail', 'card', 'wide', 'og']),
    )
  })

  it('does not let visitors upload', async () => {
    const file = { data: PNG, mimetype: 'image/png', name: `anon-${suffix}.png`, size: PNG.length }
    await expect(
      payload.create({ collection: 'media', data: { alt: `x ${suffix}` }, file, ...as(null) }),
    ).rejects.toThrow()
  })
})
