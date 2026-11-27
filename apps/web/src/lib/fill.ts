/** Fills {tokens} in translated text: fill("Up to {guests} guests", { guests: 3 }). */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? String(values[k]) : m))
}
