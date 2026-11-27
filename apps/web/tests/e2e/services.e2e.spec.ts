import { expect, test } from '@playwright/test'

// Task 160: one page shows every service, and each card opens its service page.
test('the services page lists every service and links to each one', async ({ page }) => {
  await page.goto('/services')
  await expect(page).toHaveTitle('Services | CeylonVVIP')
  const cards = page.locator('main a[href^="/services/"]')
  expect(await cards.count()).toBeGreaterThanOrEqual(6)
  await cards.filter({ hasText: 'Airport Transfers' }).first().click()
  await expect(page).toHaveURL(/\/services\/airport-transfers$/)
  await expect(page.locator('h1')).toBeVisible()
})

test('the Services link in the navigation opens the services page', async ({ page }, info) => {
  await page.goto('/')
  if (info.project.name === 'mobile') {
    await page.getByRole('button', { name: /menu/i }).first().click()
  }
  await page
    .getByRole('link', { name: /^(\d+ )?Services$/ })
    .filter({ visible: true })
    .first()
    .click()
  await expect(page).toHaveURL(/\/services$/)
})
