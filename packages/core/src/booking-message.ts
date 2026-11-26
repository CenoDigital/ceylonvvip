/**
 * Fills the Booking Settings WhatsApp template. Placeholders are {name} style.
 * The rule is per line, so template writers stay in control: a line whose placeholders
 * are all empty is left out (put optional details on their own line, like
 * "Pickup: {pickup}"); otherwise empty placeholders become blank.
 */
export function fillTemplate(
  template: string,
  values: Record<string, string | number | null | undefined>,
): string {
  const has = (key: string) => {
    const v = values[key]
    return v !== undefined && v !== null && v !== ''
  }
  return template
    .split('\n')
    .flatMap((line) => {
      const keys = [...line.matchAll(/\{(\w+)\}/g)].map((m) => m[1] as string)
      if (keys.length && !keys.some(has)) return []
      return [
        line
          .replace(/\{(\w+)\}/g, (_, key: string) => (has(key) ? String(values[key]) : ''))
          .replace(/[ \t]{2,}/g, ' ')
          .trimEnd(),
      ]
    })
    .join('\n')
    .trim()
}

/** WhatsApp click-to-chat link with the message ready to send. */
export function whatsappUrl(phone: string, message: string): string {
  const number = phone.replace(/[^\d]/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
