/**
 * Which deployment this server is. Set by Coolify at runtime (SITE_ENV); anything other
 * than "production" (staging, local, CI) must stay out of search engines.
 */
export function isProductionSite(siteEnv: string | undefined = process.env.SITE_ENV): boolean {
  return siteEnv === 'production'
}

export const NOINDEX_HEADER = 'noindex, nofollow, noarchive'
