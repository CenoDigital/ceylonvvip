import 'server-only'

import { t } from './data'

import { UI_STRINGS } from './ui-strings-list'

export { UI_STRINGS, type UiString } from './ui-strings-list'

export type UiStrings = Record<string, string>

/** Every interface string in the language of this request, for client components. */
export async function getUiStrings(): Promise<UiStrings> {
  const out: UiStrings = {}
  for (const s of UI_STRINGS) out[s] = await t(s)
  return out
}
