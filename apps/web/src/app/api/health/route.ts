import config from '@payload-config'
import { sql } from '@payloadcms/db-postgres'
import { revalidatePath } from 'next/cache'
import { getPayload, type Payload } from 'payload'

import { LAST_KEY, REFRESHED_KEY, type SeedLast } from '@/seed/on-empty'

export const dynamic = 'force-dynamic'

/**
 * The seed runs in the background on start, outside any request, so it cannot clear
 * the page cache itself; pages first rendered before it finished would keep the old
 * content. The health probe (every few seconds on Coolify) is a request, so it clears
 * the cache once after each finished seed.
 */
async function refreshPagesAfterSeed(payload: Payload, seed: SeedLast | null) {
  if (!seed || (seed.result !== 'seeded' && seed.result !== 'refreshed')) return
  const done = await payload.kv.get<string>(REFRESHED_KEY).catch(() => null)
  if (done === seed.at) return
  revalidatePath('/', 'layout')
  await payload.kv.set(REFRESHED_KEY, seed.at)
}

/** Liveness and database check for Docker and Coolify health probes. */
export async function GET() {
  try {
    const payload = await getPayload({ config })
    await payload.db.drizzle.execute(sql`select 1`)
    // The last seed-on-start outcome (staging), so it can be checked without logs.
    const seed = await payload.kv.get<SeedLast>(LAST_KEY).catch(() => null)
    await refreshPagesAfterSeed(payload, seed)
    return Response.json({ status: 'ok', ...(seed ? { seed } : {}) })
  } catch {
    return Response.json({ status: 'error' }, { status: 503 })
  }
}
