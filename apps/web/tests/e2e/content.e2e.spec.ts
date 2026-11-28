import { expect, test } from '@playwright/test'

// Task 159: every page shows the Figma photos (the client has none of their own yet).
// Pages with the booking form also show the five vehicle photos on its vehicle cards.
const PAGES: Array<[string, number]> = [
  ['/', 10],
  ['/services', 7],
  ['/services/airport-transfers', 6],
  ['/services/elder-care', 6],
  ['/fleet', 6],
  ['/about', 4],
  ['/contact', 6],
]

for (const [path, photos] of PAGES) {
  test(`${path} shows its ${photos} photos`, async ({ page }) => {
    await page.goto(path)
    // The fleet carousel's other slides (aria-hidden, tested below) are not counted.
    const images = page.locator('main img:not([aria-hidden="true"] img)')
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

test('the Home hero photo has its caption', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Sunset on the south coast')).toBeVisible()
})

test('photos show a blurred preview while they load (task 166)', async ({ request }) => {
  const html = await (await request.get('/')).text()
  expect(html).toContain('data:image/webp;base64')
})

test('the gem card offers custom jewellery design (task 167)', async ({ request }) => {
  for (const path of ['/', '/about']) {
    const html = await (await request.get(path)).text()
    expect(html).toContain('Custom jewellery design')
    expect(html).toContain('Your dream design, made just for you.')
  }
  expect(await (await request.get('/de')).text()).toContain('Schmuck nach Maß')
})
