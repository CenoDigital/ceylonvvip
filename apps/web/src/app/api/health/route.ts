import config from '@payload-config'
import { sql } from '@payloadcms/db-postgres'
import { getPayload } from 'payload'

import { LAST_KEY } from '@/seed/on-empty'

export const dynamic = 'force-dynamic'

/** Liveness and database check for Docker and Coolify health probes. */
export async function GET() {
  try {
    const payload = await getPayload({ config })
    await payload.db.drizzle.execute(sql`select 1`)
    // The last seed-on-start outcome (staging), so it can be checked without logs.
    const seed = await payload.kv.get(LAST_KEY).catch(() => null)
    return Response.json({ status: 'ok', ...(seed ? { seed } : {}) })
  } catch {
    return Response.json({ status: 'error' }, { status: 503 })
  }
}
