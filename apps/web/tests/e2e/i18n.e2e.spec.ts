import { expect, test } from '@playwright/test'

import fr from '../../src/seed/i18n/fr.json' with { type: 'json' }

// Task 163: /de, /fr, /ru and /ar versions of every page, translated from the CMS.
const FR = fr as Record<string, string>

test('each language sets lang and direction on <html>', async ({ page }) => {
  const cases: Array<[string, string, string]> = [
    ['/', 'en-GB', 'ltr'],
    ['/de', 'de', 'ltr'],
    ['/ru/fleet', 'ru', 'ltr'],
    ['/ar', 'ar', 'rtl'],
  ]
  for (const [path, lang, dir] of cases) {
    await page.goto(path)
    await expect(page.locator('html')).toHaveAttribute('lang', lang)
    await expect(page.locator('html')).toHaveAttribute('dir', dir)
  }
})

test('French pages show the French text', async ({ page }) => {
  await page.goto('/fr/services/airport-transfers')
  await expect(page.locator('h1')).toContainText(FR['Airport transfers, island-wide.'] ?? '')
  // Internal links stay in French.
  const hrefs = await page
    .locator('main a[href^="/"]')
    .evaluateAll((as) => as.map((a) => a.getAttribute('href')))
  expect(hrefs.length).toBeGreaterThan(0)
  for (const h of hrefs) expect(h).toMatch(/^\/fr(\/|$)/)
})

test('every page lists its languages for search engines', async ({ page }) => {
  await page.goto('/fleet')
  const langs = await page
    .locator('link[rel="alternate"][hreflang]')
    .evaluateAll((ls) => ls.map((l) => l.getAttribute('hreflang')))
  expect(langs).toEqual(expect.arrayContaining(['en-GB', 'de', 'fr', 'ru', 'ar', 'x-default']))
})

test('/en/... redirects to the clean English address', async ({ page }) => {
  await page.goto('/en/fleet')
  await expect(page).toHaveURL(/\/fleet$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-GB')
})

test('the language switch opens the same page in another language', async ({ page }) => {
  await page.goto('/fleet')
  const nav = page.getByRole('navigation', { name: 'Main' })
  const summary = nav.locator('summary').filter({ visible: true }).first()
  await summary.click()
  await nav.locator('a[hreflang="de"]').filter({ visible: true }).first().click()
  await expect(page).toHaveURL(/\/de\/fleet$/)
})
