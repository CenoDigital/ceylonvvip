/**
 * Turns a title into a URL slug: lowercase ASCII words joined by hyphens.
 * Accents are stripped ("Café" -> "cafe") and anything else non-alphanumeric is dropped.
 */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
