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

test('the fleet carousel shows each vehicle photo, by button and by swipe (task 168)', async ({
  page,
}) => {
  await page.goto('/fleet')
  const carousel = page.locator('[aria-roledescription="carousel"]')
  await carousel.scrollIntoViewIfNeeded()
  const shown = () =>
    carousel.evaluate((root) => {
      const slide = root.querySelector<HTMLElement>('[role="tabpanel"] [aria-hidden="false"]')
      const img = slide?.querySelector('img')
      const s = img && getComputedStyle(img)
      return {
        name: root.querySelector('h3')?.textContent,
        loaded: Boolean(img?.complete && img.naturalWidth > 0),
        visible: s?.visibility === 'visible' && s.clipPath === 'none' && s.opacity === '1',
      }
    })
  const first = (await shown()).name
  for (let i = 0; i < 5; i++) {
    await page.getByRole('button', { name: 'Next vehicle' }).click()
    await expect.poll(async () => (await shown()).loaded && (await shown()).visible).toBe(true)
  }
  // Five steps go all the way round, back to the first vehicle.
  expect((await shown()).name).toBe(first)
  // A sideways drag moves to the next vehicle.
  const box = (await page.getByRole('tabpanel').boundingBox())!
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height / 2)
  await page.mouse.down()
  await page.mouse.move(box.x + box.width * 0.4, box.y + box.height / 2, { steps: 8 })
  await page.mouse.up()
  await expect.poll(async () => (await shown()).name).not.toBe(first)
})
