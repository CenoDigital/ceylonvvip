import type { MetadataRoute } from 'next'

import { absolute } from '@/lib/seo'
import { isProductionSite } from '@/lib/site-env'

// Read SITE_ENV per request, not at build time (the Docker build is not production).
export const dynamic = 'force-dynamic'

/** Production: everything public except the admin and API, plus the sitemap. Elsewhere: nothing. */
export default function robots(): MetadataRoute.Robots {
  if (!isProductionSite()) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/next/'] },
    sitemap: absolute('/sitemap.xml'),
  }
}
