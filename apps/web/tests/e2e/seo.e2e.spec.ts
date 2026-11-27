import { expect, test, type Page } from '@playwright/test'

// Task 148 acceptance: valid schema on every page and a sitemap listing all published
// content. CI runs the production build with SITE_ENV=production and the Figma seed.
const isProduction = process.env.SITE_ENV === 'production'

const graphOf = async (page: Page) => {
  const raw = await page.locator('script[type="application/ld+json"]').first().textContent()
  const data = JSON.parse(raw ?? '{}') as {
    '@context': string
    '@graph': Array<Record<string, unknown>>
  }
  expect(data['@context']).toBe('https://schema.org')
  return data['@graph']
}
const types = (g: Array<Record<string, unknown>>) => g.flatMap((t) => [t['@type']].flat())

test('home has title, description, canonical and business schema', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/CeylonVVIP/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /^https?:\/\/[^/]+\/?$/,
  )
  const g = await graphOf(page)
  expect(types(g)).toEqual(
    expect.arrayContaining(['Organization', 'TravelAgency', 'WebSite', 'BreadcrumbList']),
  )
  const business = g.find((t) => [t['@type']].flat().includes('TravelAgency'))!
  expect(business.address).toMatchObject({ '@type': 'PostalAddress', addressCountry: 'Sri Lanka' })
})

test('a service page has Service, FAQPage and breadcrumbs', async ({ page }) => {
  await page.goto('/services/airport-transfers')
  await expect(page).toHaveTitle('Airport Transfers | CeylonVVIP')
  const g = await graphOf(page)
  expect(types(g)).toEqual(expect.arrayContaining(['Service', 'FAQPage', 'BreadcrumbList']))
  const faq = g.find((t) => t['@type'] === 'FAQPage') as { mainEntity: unknown[] }
  expect(faq.mainEntity.length).toBe(4)
  const crumbs = g.find((t) => t['@type'] === 'BreadcrumbList') as {
    itemListElement: Array<{ name: string }>
  }
  expect(crumbs.itemListElement.map((i) => i.name)).toEqual(['CeylonVVIP', 'Airport Transfers'])
})

test('canonical links use SITE_URL, read when the server runs', async ({ page }) => {
  const origin = process.env.SITE_URL
  test.skip(!origin, 'SITE_URL is set for the server in CI.')
  await page.goto('/fleet')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}/fleet`)
})

test('sitemap lists every published page and service', async ({ request }) => {
  test.skip(!isProduction, 'The sitemap is empty outside production.')
  const xml = await (await request.get('/sitemap.xml')).text()
  for (const path of [
    '/</loc>',
    '/services</loc>',
    '/fleet</loc>',
    '/about</loc>',
    '/contact</loc>',
    '/services/airport-transfers</loc>',
    '/services/elder-care</loc>',
  ]) {
    expect(xml, path).toContain(path)
  }
})

test('robots.txt allows the site in production and points to the sitemap', async ({ request }) => {
  const text = await (await request.get('/robots.txt')).text()
  if (isProduction) {
    expect(text).toContain('Disallow: /admin')
    expect(text).toMatch(/Sitemap: .*\/sitemap\.xml/)
  } else {
    expect(text).toContain('Disallow: /')
  }
})
