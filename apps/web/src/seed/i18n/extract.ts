/**
 * Collects every English text on the site into src/seed/i18n/source.json, the list the
 * translations are made from (task 163). Run after seeding:
 *
 *   pnpm --filter web payload run src/seed/i18n/extract.ts
 *
 * Walks pages, services, vehicles, FAQs, forms, globals and media alt text, plus the
 * interface strings in lib/ui-strings.ts.
 */
import { writeFileSync } from 'node:fs'
import path from 'node:path'

import config from '@payload-config'
import { getPayload } from 'payload'

import { UI_STRINGS } from '@/lib/ui-strings-list'

// The same identifier keys translateDeep never touches (lib/i18n.ts), plus a few more
// that hold settings rather than visible text.
const SKIP = new Set([
  'id',
  'slug',
  'url',
  'href',
  'anchor',
  'phone',
  'number',
  'blockType',
  'blockName',
  'variant',
  'relationTo',
  'filename',
  'mimeType',
  'type',
  'icon',
  'appearance',
  'anim',
  'bg',
  'pt',
  'pb',
  'mediaType',
  'source',
  'side',
  'kind',
  'action',
  'format',
  'mode',
  'style',
  'direction',
  '_status',
  'email',
  'createdAt',
  'updatedAt',
  'globalType',
  'imagePosition',
  'displayMode',
  'currency',
  'textFormat',
  'detail',
  'version',
  'indent',
  'width',
  'name',
  'businessType',
  'priceRange',
  'google',
  'bing',
  'ga4',
  'metaPixel',
  'titleTemplate',
  'country',
  'postcode',
  'opens',
  'closes',
  'focalX',
  'focalY',
  'message',
])
// Keys named `name` that hold visible text (route rows, destinations); vehicle and
// form-field names are identifiers or brand names and stay as they are.
const NAME_PARENTS = new Set(['items'])

const texts = new Set<string>()

function walk(v: unknown, key?: string, parentKey?: string) {
  if (typeof v === 'string') {
    const allowName = key === 'name' && parentKey && NAME_PARENTS.has(parentKey)
    if (key && SKIP.has(key) && !allowName) return
    const t = v.trim()
    if (t.length < 2 || t.length > 2000) return
    if (!/\p{L}/u.test(t)) return
    if (/^(https?:|mailto:|tel:|#|\/)/.test(t)) return
    if (/^[a-z0-9-]+$/.test(t)) return // slugs, keys
    texts.add(v)
    return
  }
  if (Array.isArray(v)) {
    for (const x of v) walk(x, undefined, key)
    return
  }
  if (v && typeof v === 'object') {
    // Objects in an array keep the array's key as their parent (items[].name).
    for (const [k, x] of Object.entries(v)) walk(x, k, key ?? parentKey)
  }
}

const payload = await getPayload({ config })
const find = (collection: 'pages' | 'services' | 'vehicles' | 'faqs' | 'forms') =>
  payload.find({ collection, depth: 0, limit: 0, pagination: false })
for (const c of ['pages', 'services', 'vehicles', 'faqs', 'forms'] as const) {
  for (const doc of (await find(c)).docs) walk(doc)
}
for (const m of (await payload.find({ collection: 'media', limit: 0, pagination: false, depth: 0 }))
  .docs)
  if (m.alt) texts.add(m.alt)
for (const g of [
  'site-settings',
  'contact-business',
  'header',
  'footer',
  'mobile-action-bar',
  'seo-defaults',
  'booking-settings',
] as const) {
  walk(await payload.findGlobal({ slug: g, depth: 0 }))
}
for (const s of UI_STRINGS) texts.add(s)

const out = [...texts].sort((a, b) => a.localeCompare(b))
const file = path.resolve(process.cwd(), 'src/seed/i18n/source.json')
writeFileSync(file, JSON.stringify(out, null, 2) + '\n')
payload.logger.info(`Wrote ${out.length} texts to ${file}`)
process.exit(0)
