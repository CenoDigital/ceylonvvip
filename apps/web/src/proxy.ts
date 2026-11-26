import { NextResponse } from 'next/server'

import { isProductionSite, NOINDEX_HEADER } from './lib/site-env'

// Runs at request time, so the same image behaves differently per Coolify environment:
// every non-production response tells crawlers not to index it.
export function proxy() {
  const response = NextResponse.next()
  if (!isProductionSite()) response.headers.set('X-Robots-Tag', NOINDEX_HEADER)
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
