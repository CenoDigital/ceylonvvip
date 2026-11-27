import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { migrations } from './migrations'
import {
  Faqs,
  Pages,
  Pricing,
  Redirects,
  Services,
  Testimonials,
  Vehicles,
} from './payload/collections/content'
import { Forms, FormSubmissions } from './payload/collections/forms'
import { Translations } from './payload/collections/translations'
import { Media } from './payload/collections/Media'
import { Users } from './payload/collections/Users'
import { globals } from './payload/globals'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// R2 in staging and production, RustFS locally and in CI. Without a bucket (the Docker
// build, unit tests) uploads fall back to local disk.
const s3Bucket = process.env.S3_BUCKET

// Mail (booking alerts, password resets) through Google Workspace SMTP once SMTP_* is set in
// Coolify. Without it, mail is only logged.
const smtpHost = process.env.SMTP_HOST
const email = smtpHost
  ? nodemailerAdapter({
      defaultFromAddress: process.env.SMTP_FROM ?? '',
      defaultFromName: process.env.SMTP_FROM_NAME ?? 'CeylonVVIP',
      transportOptions: {
        host: smtpHost,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_PORT === '465',
        auth: process.env.SMTP_USER
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
      },
    })
  : undefined

export default buildConfig({
  // The public origin, read at runtime (lib/site-url.ts); empty locally so the admin
  // works on any port.
  serverURL: process.env.SITE_URL?.replace(/\/+$/, '') ?? '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [
    Pages,
    Services,
    Vehicles,
    Pricing,
    Faqs,
    Testimonials,
    Forms,
    FormSubmissions,
    Media,
    Redirects,
    Translations,
    Users,
  ],
  globals,
  email,
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
  // Staging: fill an empty database with the Figma content (SEED_ON_EMPTY, see seed/on-empty.ts).
  // Runs in the background: the server starts serving straight away, and a slow seed
  // (photo uploads to storage) can never hold up startup or health checks.
  onInit: (payload) => {
    void import('./seed/on-empty')
      .then(({ seedIfEmpty }) => seedIfEmpty(payload))
      .catch((error) => payload.logger.error({ err: error }, 'Seed on start crashed.'))
  },
})
