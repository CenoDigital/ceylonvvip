import sharp from 'sharp'

/**
 * A tiny blurred copy of a photo as a data URL (about 300 bytes), shown by next/image
 * while the real photo loads, so a slow connection sees the photo's colours instead of
 * an empty ivory box (task 166).
 */
export async function blurDataURL(input: Buffer | string): Promise<string> {
  const tiny = await sharp(input)
    .rotate()
    .resize(16, 16, { fit: 'inside' })
    .webp({ quality: 40 })
    .toBuffer()
  return `data:image/webp;base64,${tiny.toString('base64')}`
}
