import type { Payload } from 'payload'

import ar from './i18n/ar.json'
import de from './i18n/de.json'
import fr from './i18n/fr.json'
import ru from './i18n/ru.json'

/*
 * Loads the site translations (task 163) into the Translations collection: one row per
 * English text with its German, French, Russian and Arabic versions. The JSON files are
 * made from i18n/source.json (see i18n/extract.ts). Rows that editors changed in the CMS
 * are updated to the file version only when the seed runs (staging, CI, local).
 */
const FILES = { de, fr, ru, ar } as Record<'de' | 'fr' | 'ru' | 'ar', Record<string, string>>

export async function seedTranslations(payload: Payload) {
  const sources = new Set(Object.values(FILES).flatMap((f) => Object.keys(f)))
  const { docs } = await payload.find({
    collection: 'translations',
    limit: 0,
    pagination: false,
    depth: 0,
  })
  const existing = new Map(docs.map((d) => [d.source, d.id]))
  for (const source of sources) {
    const data = {
      source,
      de: FILES.de[source] ?? null,
      fr: FILES.fr[source] ?? null,
      ru: FILES.ru[source] ?? null,
      ar: FILES.ar[source] ?? null,
    }
    const id = existing.get(source)
    if (id) {
      await payload.update({
        collection: 'translations',
        id,
        data,
        context: { disableRevalidate: true },
      })
    } else {
      await payload.create({
        collection: 'translations',
        data,
        context: { disableRevalidate: true },
      })
    }
  }
  payload.logger.info(`Seeded ${sources.size} translations.`)
}
