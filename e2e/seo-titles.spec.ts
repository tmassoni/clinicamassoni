import { expect, test } from '@playwright/test'
import { CLINIC_WEBSITE, DOCTOR_NAME } from '@/app/src/lib/constants'

test('titles are unique and only the homepage owns the broad city query', async ({ page, request }) => {
  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.status()).toBe(200)
  const urls = Array.from((await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g),
    ([, url]) => url)
  expect(urls.length).toBeGreaterThan(0)

  const titles = new Map<string, string>()
  for (const url of urls) {
    expect(new URL(url).origin).toBe(CLINIC_WEBSITE)
    const path = new URL(url).pathname
    const response = await page.goto(path)
    expect(response?.status(), path).toBe(200)
    const title = await page.title()
    expect(title.trim(), path).not.toBe('')
    expect(titles.has(title), `${path} repeats ${titles.get(title)}: ${title}`).toBe(false)
    titles.set(title, path)

    if (path === '/') {
      expect(title).toBe(`Dentista em Cascavel | ${DOCTOR_NAME}`)
      expect(title.length).toBeLessThanOrEqual(60)
    } else {
      // Specific services still own their local intent, as defined in the strategy.
      expect(title, path).not.toMatch(/\bdentista\s+(?:em\s+)?Cascavel\b/i)
    }
  }
})
