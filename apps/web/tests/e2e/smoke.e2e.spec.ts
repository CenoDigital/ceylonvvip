import { expect, test } from '@playwright/test'

test('health check reports the database is reachable', async ({ request }) => {
  const response = await request.get('/api/health')
  expect(response.status()).toBe(200)
  expect(await response.json()).toEqual({ status: 'ok' })
})

test('home page renders', async ({ page }) => {
  const response = await page.goto('/')
  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('admin shows the login or first-user screen', async ({ page }) => {
  await page.goto('/admin')
  await expect(page).toHaveURL(/\/admin\/(login|create-first-user)/)
  await expect(page.getByLabel(/email/i)).toBeVisible()
})

test('unknown routes return 404', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist')
  expect(response?.status()).toBe(404)
})
