import type { UploadField } from 'payload'

export const MEDIA_COLLECTION = 'media'

export interface MediaOptions {
  name: string
  label?: string
  required?: boolean
  description?: string
}

/** An image from the Media library (alt text, focal point and sizes live on the media item). */
export function media({ name, label, required = false, description }: MediaOptions): UploadField {
  return {
    name,
    label,
    type: 'upload',
    relationTo: MEDIA_COLLECTION,
    required,
    admin: description ? { description } : undefined,
  }
}
