import { NextResponse, type NextRequest } from 'next/server'

import { DEFAULT_LOCALE, isLocale } from './lib/i18n'
import { isProductionSite, NOINDEX_HEADER } from './lib/site-env'

// Marks the internal rewrite to /en, so a visitor's own /en/... still redirects.
const REWRITTEN = 'x-cvvip-locale-rewrite'

// Paths that are not pages: the CMS, APIs, developer routes and files like robots.txt.
const NOT_PAGES = /^\/(api|admin|next|_next)(\/|$)|\.[a-z0-9]+$/i

/*
 * Runs at request time, so the same image behaves differently per Coolify environment.
 * - Languages (task 163): English pages live at the root (/fleet) and are rewritten to
 *   /en/fleet internally; /de, /fr, /ru and /ar pass through; /en/... redirects to the
 *   clean English URL.
 * - Every non-production response tells crawlers not to index it.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split('/')[1]
  let response: NextResponse
  if (first === DEFAULT_LOCALE && request.headers.get(REWRITTEN) === '1') {
    // Our own rewrite to /en, seen again by the proxy in production: let it through.
    response = NextResponse.next()
  } else if (first === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || '/'
    response = NextResponse.redirect(url, 308)
  } else if (isLocale(first) || NOT_PAGES.test(pathname)) {
    response = NextResponse.next()
  } else {
    const url = request.nextUrl.clone()
    url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`
    const headers = new Headers(request.headers)
    headers.set(REWRITTEN, '1')
    response = NextResponse.rewrite(url, { request: { headers } })
  }
  if (!isProductionSite()) response.headers.set('X-Robots-Tag', NOINDEX_HEADER)
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
