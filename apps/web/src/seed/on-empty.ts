import type { Payload } from 'payload'

export type SeedOnEmptyResult = 'off' | 'production' | 'not-empty' | 'seeded' | 'failed'

/**
 * Staging only: with SEED_ON_EMPTY=true, a database with no pages gets the Figma seed
 * once when the server starts, so a fresh environment shows the designed site. Never
 * on production, never over existing content, and a failure is logged rather than
 * stopping the server.
 */
export async function seedIfEmpty(
  payload: Payload,
  env: Record<string, string | undefined> = process.env,
  seed: (payload: Payload) => Promise<void> = async (p) => (await import('./figma')).seedFigma(p),
): Promise<SeedOnEmptyResult> {
  if (env.SEED_ON_EMPTY !== 'true') return 'off'
  if (env.SITE_ENV === 'production') {
    payload.logger.warn('SEED_ON_EMPTY is ignored on the live site.')
    return 'production'
  }
  const { totalDocs } = await payload.count({ collection: 'pages', overrideAccess: true })
  if (totalDocs > 0) return 'not-empty'
  try {
    payload.logger.info('No pages yet and SEED_ON_EMPTY=true: loading the Figma content.')
    await seed(payload)
    return 'seeded'
  } catch (error) {
    payload.logger.error({ err: error }, 'SEED_ON_EMPTY: the Figma seed failed.')
    return 'failed'
  }
}
