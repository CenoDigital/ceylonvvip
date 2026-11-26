import config from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

import { isStaff } from '@/payload/access'

// Opened from the admin's Preview and Live Preview. Only signed-in editors and admins
// get draft mode; the path must be on this site.
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const path = url.searchParams.get('path') ?? '/'
  if (!path.startsWith('/') || path.startsWith('//')) {
    return new Response('Invalid path', { status: 400 })
  }

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })
  if (!isStaff(user)) {
    return new Response('Sign in to the admin to preview drafts', { status: 403 })
  }

  ;(await draftMode()).enable()
  redirect(path)
}
