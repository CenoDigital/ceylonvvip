import 'server-only'

import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound, permanentRedirect, redirect } from 'next/navigation'
import { getPayload } from 'payload'

import { resolveLink } from './links'

/** All redirects, keyed by their "from" path. Rebuilt when a redirect is saved. */
const redirectMap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'redirects',
      depth: 1,
      limit: 2000,
      pagination: false,
    })
    return Object.fromEntries(
      docs.map((r) => [
        r.from.replace(/\/+$/, '') || '/',
        { to: resolveLink(r.to as never)?.href ?? null, type: r.type ?? '301' },
      ]),
    ) as Record<string, { to: string | null; type: string }>
  },
  ['redirects'],
  { tags: ['redirects', 'pages', 'services'] },
)

/**
 * Called where a page would 404: if the Redirects collection has this path, send the
 * visitor on (308 for "permanent 301", 307 for "temporary 302", which search engines
 * treat the same way); otherwise show Not Found.
 */
export async function redirectOrNotFound(path: string): Promise<never> {
  const match = (await redirectMap())[path.replace(/\/+$/, '') || '/']
  if (match?.to && match.to !== path) {
    if (match.type === '302') redirect(match.to)
    permanentRedirect(match.to)
  }
  notFound()
}
