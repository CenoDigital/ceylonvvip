import { expect, test } from '@playwright/test'

// Approved baselines live in __screenshots__ and are refreshed only through the
// "Update visual baselines" workflow, so every change to them shows up in a pull request.
const pages = [{ name: 'home', path: '/' }]

for (const { name, path } of pages) {
  test(`${name} matches the approved baseline`, async ({ page }) => {
    await page.goto(path)
    await page.evaluate(() => document.fonts.ready)
    // Every photo fully loaded first, so the screenshot never catches a blurred preview.
    await page.evaluate(async () => {
      const imgs = Array.from(document.images)
      for (const img of imgs) img.loading = 'eager'
      await Promise.all(imgs.map((img) => img.decode().catch(() => undefined)))
    })
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true })
  })
}

// Task 145 acceptance: every Prestige component at the five widths it is checked at.
const WIDTHS = [360, 390, 768, 1024, 1440]

test('component gallery matches the approved baselines at every width', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'Widths are set explicitly, so one project is enough.')
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/next/ui')
    await page.evaluate(() => document.fonts.ready)
    await expect(page).toHaveScreenshot(`components-${width}.png`, { fullPage: true })
  }
})
