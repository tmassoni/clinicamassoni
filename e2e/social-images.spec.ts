import { expect, test } from '@playwright/test'
import sharp from 'sharp'

test('the clinic card is a decodable PNG and both social tags use its route', async ({ page, request }) => {
  const image = await request.get('/opengraph-image')
  expect(image.status()).toBe(200)
  expect(image.headers()['content-type']).toContain('image/png')
  const metadata = await sharp(await image.body()).metadata()
  expect({ width: metadata.width, height: metadata.height, format: metadata.format })
    .toEqual({ width: 1200, height: 630, format: 'png' })

  for (const route of ['/', '/sobre', '/tratamentos/implantes-dentarios', '/blog']) {
    await page.goto(route)
    for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      const tag = page.locator(selector)
      await expect(tag).toHaveCount(1)
      const url = await tag.getAttribute('content')
      expect(new URL(url!).pathname, `${route}: ${selector}`).toBe('/opengraph-image')
    }
  }
})

test('an illustrated post keeps its own existing image on both networks', async ({ page }) => {
  await page.goto('/blog/profilaxia-dental')
  const og = await page.locator('meta[property="og:image"]').getAttribute('content')
  const twitter = await page.locator('meta[name="twitter:image"]').getAttribute('content')
  expect(og).toContain('/images/posts/profilaxia-dental/')
  expect(twitter).toBe(og)
})
