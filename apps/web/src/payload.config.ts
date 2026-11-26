import { postgresAdapter } from '@payloadcms/db-postgres'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { migrations } from './migrations'
import { Media } from './payload/collections/Media'
import { Users } from './payload/collections/Users'
import { globals } from './payload/globals'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// R2 in staging and production, RustFS locally and in CI. Without a bucket (the Docker
// build, unit tests) uploads fall back to local disk.
const s3Bucket = process.env.S3_BUCKET

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, Media],
  globals,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: {
    // Shared with future apps through @ceylonvvip/db.
    outputFile: path.resolve(dirname, '../../../packages/db/src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI ?? '' },
    // Schema changes ship as migrations, so local dev matches production.
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
    // Pending migrations run when the production server starts; the image needs no Payload CLI.
    prodMigrations: migrations,
  }),
  plugins: [
    s3Storage({
      enabled: Boolean(s3Bucket),
      collections: { media: true },
      bucket: s3Bucket ?? '',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION ?? 'auto',
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
        },
      },
    }),
    // Registers the SEO field components and translations; the fields themselves come
    // from @ceylonvvip/cms-schema's seoTab, added per collection.
    seoPlugin({ collections: [], uploadsCollection: 'media' }),
  ],
  sharp,
})
