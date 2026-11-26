/**
 * The public origin of this environment (https://staging.ceylonvvip.com, or the live
 * domain), from SITE_URL in Coolify. Read when called, on the server, so the same
 * Docker image works in every environment. Not a NEXT_PUBLIC_ variable on purpose:
 * Next.js fixes those into the code at build time, and the image is built without one.
 */
export function getSiteUrl(): string {
  return (process.env.SITE_URL || 'http://localhost:3000').replace(/\/+$/, '')
}
