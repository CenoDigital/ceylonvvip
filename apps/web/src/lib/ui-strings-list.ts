/*
 * Interface text that lives in code rather than the CMS (task 163). Each string is a
 * key in the Translations collection like any CMS text; {tokens} are filled in after
 * translating, so translations must keep them.
 */
export const UI_STRINGS = [
  // Booking form
  'One answer needs attention',
  '{count} answers need attention',
  'They are marked in red below.',
  'Up to {guests} guests',
  'Up to {guests} guests, {bags} bags',
  'Select a date',
  'Select a time',
  'Hour',
  'Minute',
  'Clear',
  'Done',
  // Booking validation (packages/validation)
  'At least one adult.',
  'Choose a date from today onwards.',
  'Choose a service.',
  'Choose a time.',
  'Choose the date of your journey.',
  'Enter a number.',
  'Enter a phone number with the country code.',
  'Enter a valid email address.',
  'Please agree before continuing.',
  'This is too long.',
  // Sections
  'Scroll',
  'or call',
  'of',
  'Previous vehicle',
  'Next vehicle',
  // Language switch
  'Language',
] as const

export type UiString = (typeof UI_STRINGS)[number]
