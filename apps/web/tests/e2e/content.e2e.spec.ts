import { expect, test } from '@playwright/test'

// Task 159: every page shows the Figma photos (the client has none of their own yet).
const PAGES: Array<[string, number]> = [
  ['/', 9],
  ['/services', 7],
  ['/services/airport-transfers', 1],
  ['/services/elder-care', 1],
  ['/fleet', 6],
  ['/about', 4],
  ['/contact', 1],
]

for (const [path, photos] of PAGES) {
  test(`${path} shows its ${photos} photos`, async ({ page }) => {
    await page.goto(path)
    const images = page.locator('main img')
    await expect(images).toHaveCount(photos)
    // Bring each photo into view so lazy loading starts, then check it really loaded.
    for (const img of await images.all()) {
      await img.scrollIntoViewIfNeeded()
      await expect
        .poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0))
        .toBe(true)
      expect(await img.getAttribute('alt')).toBeTruthy()
    }
  })
}

test('the Home hero photo has its Figma caption', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('The coast road, Bentota')).toBeVisible()
})
