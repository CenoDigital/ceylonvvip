import { expect, test, type Page } from '@playwright/test'

// Task 149 acceptance: presets play, nothing shifts layout (CLS 0), reduced motion
// still shows everything, and numbers end on their real value.
test.use({ storageState: { cookies: [], origins: [] } })

const PAGES = ['/', '/fleet', '/about', '/contact', '/services/airport-transfers']

/** Scrolls to the bottom in steps, then back to the top, and returns the CLS total. */
async function scrollAndMeasureCls(page: Page) {
  await page.evaluate(() => {
    ;(window as unknown as { __cls: number }).__cls = 0
    new PerformanceObserver((list) => {
      for (const e of list.getEntries() as Array<
        PerformanceEntry & { value: number; hadRecentInput: boolean }
      >) {
        if (!e.hadRecentInput) (window as unknown as { __cls: number }).__cls += e.value
      }
    }).observe({ type: 'layout-shift', buffered: true })
  })
  const height = await page.evaluate(() => document.body.scrollHeight)
  for (let y = 0; y <= height; y += 400) {
    await page.mouse.wheel(0, 400)
    await page.waitForTimeout(60)
  }
  await page.waitForTimeout(1600)
  return page.evaluate(() => (window as unknown as { __cls: number }).__cls)
}

const hiddenCount = (page: Page) =>
  page.$$eval(
    '[data-animate] > *',
    (els) =>
      els.filter((el) => {
        const s = getComputedStyle(el)
        return s.visibility === 'hidden' || Number(s.opacity) < 0.99
      }).length,
  )

for (const path of PAGES) {
  test(`${path} animates without layout shift and ends fully shown`, async ({ page }) => {
    await page.goto(path)
    await expect(page.locator('html')).toHaveClass(/motion/)
    const cls = await scrollAndMeasureCls(page)
    expect(cls).toBe(0)
    // Every animated section ends visible and opaque.
    await expect.poll(() => hiddenCount(page), { timeout: 5000 }).toBe(0)
  })
}

test('stats count up to their real values', async ({ page }) => {
  await page.goto('/')
  const numbers = page.locator('[data-count]')
  test.skip((await numbers.count()) === 0, 'No stats on this page.')
  await scrollAndMeasureCls(page)
  for (const el of await numbers.all()) {
    const target = Number(await el.getAttribute('data-count'))
    await expect(el).toContainText(target.toLocaleString('en'))
  }
})

test('reduced motion still shows every section', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await scrollAndMeasureCls(page)
  const hidden = await page.$$eval(
    '[data-animate] > *',
    (els) => els.filter((el) => getComputedStyle(el).visibility === 'hidden').length,
  )
  expect(hidden).toBe(0)
})

// Task 161: smooth scrolling on desktop and line-by-line heading reveals everywhere.
test('desktop scrolls smoothly; phones keep native scrolling', async ({ page }, info) => {
  await page.goto('/about')
  if (info.project.name === 'desktop') {
    await expect(page.locator('html')).toHaveClass(/lenis/)
  } else {
    await expect(page.locator('html')).not.toHaveClass(/lenis/)
  }
})

test('every heading reveals line by line and ends fully shown', async ({ page }) => {
  await page.goto('/about')
  await scrollAndMeasureCls(page)
  const headings = page.locator('main h2')
  expect(await headings.count()).toBeGreaterThan(0)
  await expect
    .poll(() =>
      headings.evaluateAll(
        (els) => els.filter((el) => getComputedStyle(el).visibility === 'hidden').length,
      ),
    )
    .toBe(0)
  // SplitText wrapped the lines in masks, so the reveal really ran.
  expect(await page.locator('main h2 > div').count()).toBeGreaterThan(0)
})
