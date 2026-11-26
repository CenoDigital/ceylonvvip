import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

// Every public route gets added here as it is built.
const routes = ['/']

for (const route of routes) {
  test(`no WCAG 2.2 AA violations on ${route}`, async ({ page }) => {
    await page.goto(route)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()
    expect(results.violations).toEqual([])
  })
}
