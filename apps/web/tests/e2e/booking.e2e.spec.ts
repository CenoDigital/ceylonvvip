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

test('the flight number shows only with Airport Transfer (task 174)', async ({ page }) => {
  await page.goto('/contact')
  await expect(page.getByLabel('Pickup')).toBeVisible()
  await page.getByText('Island Tour', { exact: true }).click()
  await expect(page.getByLabel('Flight number')).toHaveCount(0)
  await page.getByText('Airport Transfer', { exact: true }).click()
  await expect(page.getByLabel('Flight number')).toBeVisible()
  await page.getByText('Airport Transfer', { exact: true }).click()
  await expect(page.getByLabel('Flight number')).toHaveCount(0)
})

test('booking form vehicle photos show after scrolling to the form (task 174)', async ({
  page,
}) => {
  await page.goto('/services/island-tours')
  const form = page.locator('form').last()
  await form.scrollIntoViewIfNeeded()
  const photo = form.locator('img').first()
  await expect(photo).toBeVisible()
  await expect
    .poll(() => photo.evaluate((img) => getComputedStyle(img).clipPath))
    .not.toContain('100%')
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
  // Task 174: several services together; the flight number appears with Airport Transfer.
  await expect(page.getByLabel('Flight number')).toHaveCount(0)
  await page.getByText('Airport Transfer', { exact: true }).click()
  await page.getByText('Island Tour', { exact: true }).click()
  await expect(page.getByRole('checkbox', { name: 'Airport Transfer' })).toBeChecked()
  await expect(page.getByRole('checkbox', { name: 'Island Tour' })).toBeChecked()
  await page.getByText('BMW 520d').first().click()
  await page.getByLabel('Pickup').fill('Cinnamon Bey, Beruwala')
  await page.getByLabel('Destination').fill('Colombo airport')
  await page.getByLabel('Flight number').fill('UL 504')

  // Themed pickers (task 158): choose a day 10 days ahead in the calendar, then 09:30.
  const day = new Date(Date.now() + 10 * 86_400_000)
  const month = day.toLocaleDateString('en-US', { month: 'long' })
  await page.getByLabel('Date').click()
  const dayButton = page.getByRole('button', {
    name: new RegExp(`${month} ${day.getDate()}(st|nd|rd|th), ${day.getFullYear()}`),
  })
  if (!(await dayButton.isVisible()))
    await page.getByRole('button', { name: /next month/i }).click()
  await dayButton.click()
  await expect(page.getByLabel('Date')).toContainText(String(day.getFullYear()))

  await page.getByLabel('Time').click()
  await page.getByRole('listbox', { name: 'Hour' }).getByRole('option', { name: '09' }).click()
  await page.getByRole('listbox', { name: 'Minute' }).getByRole('option', { name: '30' }).click()
  await page.getByRole('button', { name: 'Done' }).click()
  await expect(page.getByLabel('Time')).toContainText('09:30')

  await Promise.all([
    page.waitForURL(/wa\.me|whatsapp\.com/),
    page.getByRole('button', { name: 'Continue on WhatsApp' }).click(),
  ])
  const text = decodeURIComponent(new URL(page.url()).searchParams.get('text') ?? '')
  expect(page.url()).toContain('wa.me/94779532747')
  expect(text).toContain('Airport Transfers')
  expect(text).toContain('Island Tours')
  expect(text).toContain('BMW 520d')
  expect(text).toContain('Cinnamon Bey, Beruwala')
  expect(text).toContain('UL 504')
  expect(text).toContain('09:30')
})
