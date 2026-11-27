/**
 * Media URLs as next/image needs them. Payload makes upload URLs absolute when a
 * serverURL is set (SITE_URL), like https://staging.ceylonvvip.com/api/media/file/x.jpg.
 * next/image treats those as remote images and refuses them, so same-site media is
 * turned back into a path. Other URLs are left as they are.
 */
export function mediaSrc(url: string | null | undefined): string | undefined {
  if (!url) return undefined
  if (url.startsWith('/')) return url
  try {
    const u = new URL(url)
    return u.pathname.startsWith('/api/media/') ? `${u.pathname}${u.search}` : url
  } catch {
    return url
  }
}
