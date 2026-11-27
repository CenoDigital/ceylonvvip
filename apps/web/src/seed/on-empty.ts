import type { Payload } from 'payload'

export type SeedOnEmptyResult =
  'off' | 'production' | 'not-empty' | 'seeded' | 'up-to-date' | 'refreshed' | 'failed'

/**
 * Version of the Figma seed content. Bump it whenever the seed changes, so staging
 * (with SEED_REFRESH=true) loads the new content on its next start.
 */
export const SEED_VERSION = 3
const VERSION_KEY = 'seed-version'

/**
 * Staging only, never on production:
 * - SEED_ON_EMPTY=true: a database with no pages gets the Figma seed when the server
 *   starts, so a fresh environment shows the designed site.
 * - SEED_REFRESH=true: when this build's SEED_VERSION is newer than the one the
 *   database last loaded, the seed runs again once. Seeded pages are updated in place
 *   (matched by slug), so edits to those pages on staging are replaced.
 * A failure is logged rather than stopping the server.
 */
export async function seedIfEmpty(
  payload: Payload,
  env: Record<string, string | undefined> = process.env,
  seed: (payload: Payload) => Promise<void> = async (p) => (await import('./figma')).seedFigma(p),
): Promise<SeedOnEmptyResult> {
  const onEmpty = env.SEED_ON_EMPTY === 'true'
  const refresh = env.SEED_REFRESH === 'true'
  if (!onEmpty && !refresh) return 'off'
  if (env.SITE_ENV === 'production') {
    payload.logger.warn('SEED_ON_EMPTY and SEED_REFRESH are ignored on the live site.')
    return 'production'
  }
  const { totalDocs } = await payload.count({ collection: 'pages', overrideAccess: true })
  const empty = totalDocs === 0
  let result: SeedOnEmptyResult
  if (empty && onEmpty) {
    result = 'seeded'
  } else if (!refresh) {
    return 'not-empty'
  } else {
    const loaded = Number((await payload.kv.get<number>(VERSION_KEY)) ?? 0)
    if (loaded >= SEED_VERSION) return 'up-to-date'
    result = 'refreshed'
  }
  try {
    payload.logger.info(
      result === 'seeded'
        ? 'No pages yet and SEED_ON_EMPTY=true: loading the Figma content.'
        : `SEED_REFRESH=true and seed version ${SEED_VERSION} is new here: reloading the Figma content.`,
    )
    await seed(payload)
    await payload.kv.set(VERSION_KEY, SEED_VERSION)
    return result
  } catch (error) {
    payload.logger.error({ err: error }, 'The Figma seed failed on start.')
    return 'failed'
  }
}
