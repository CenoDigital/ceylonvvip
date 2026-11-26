import { expect, test } from '@playwright/test'

// Approved baselines live in __screenshots__ and are refreshed only through the
// "Update visual baselines" workflow, so every change to them shows up in a pull request.
const pages = [{ name: 'home', path: '/' }]

for (const { name, path } of pages) {
  test(`${name} matches the approved baseline`, async ({ page }) => {
    await page.goto(path)
    await page.evaluate(() => document.fonts.ready)
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true })
  })
}
