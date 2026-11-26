import { expect, test } from '@playwright/test'

// Task 147 acceptance: the booking form lists the vehicles published in the CMS and
// hands the request to WhatsApp with the message ready. Runs against the Figma seed.

test('booking form lists every published vehicle', async ({ page }) => {
  await page.goto('/contact')
  const vehicles = page.getByRole('group', { name: 'Vehicle' }).getByRole('radio')
  // Five seeded vehicles plus "No preference".
  await expect(vehicles).toHaveCount(6)
  for (const name of [
    'BMW 520d',
    'Toyota Prado 150',
    'Toyota Voxy',
    'Audi A3',
    'Honda Vezel',
    'No preference',
  ]) {
    await expect(page.getByRole('radio', { name: new RegExp(name) })).toBeAttached()
  }
})

test('shows errors without leaving the page when answers are missing', async ({ page }) => {
  await page.goto('/contact')
  await page.getByRole('button', { name: 'Continue on WhatsApp' }).click()
  await expect(page.getByRole('alert').first()).toBeVisible()
  await expect(page.getByText('Choose a service.')).toBeVisible()
  await expect(page).toHaveURL(/\/contact/)
})

test('a complete request opens WhatsApp with the message', async ({ page }) => {
  // Stop at the WhatsApp link instead of leaving for the real site.
  await page.route(/https:\/\/(wa\.me|api\.whatsapp\.com)\//, (route) =>
    route.fulfill({ status: 200, contentType: 'text/html', body: '<p>WhatsApp</p>' }),
  )
  await page.goto('/contact')
  await page.getByText('Airport Transfer', { exact: true }).click()
  await page.getByText('BMW 520d').first().click()

  const date = new Date(Date.now() + 10 * 86_400_000).toISOString().slice(0, 10)
  await page.getByLabel('Date').fill(date)
  await page.getByLabel('Time').fill('09:30')

  await Promise.all([
    page.waitForURL(/wa\.me|whatsapp\.com/),
    page.getByRole('button', { name: 'Continue on WhatsApp' }).click(),
  ])
  const text = decodeURIComponent(new URL(page.url()).searchParams.get('text') ?? '')
  expect(page.url()).toContain('wa.me/94779532747')
  expect(text).toContain('Airport Transfers')
  expect(text).toContain('BMW 520d')
  expect(text).toContain('09:30')
})
