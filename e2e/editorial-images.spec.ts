import { expect, test } from '@playwright/test'

for (const route of ['/blog/dentistica-restauradora', '/tratamentos/implantes-dentarios']) {
  test(`${route} displays an editorial cover while keeping social imagery separate`, async ({ page }) => {
    await page.goto(route)
    const illustration = page.locator('main figure img[alt^="Ilustração conceitual:"]')
    await expect(illustration).toHaveCount(1)
    await illustration.scrollIntoViewIfNeeded()
    await expect(illustration).toBeVisible()
    await expect(illustration).toHaveAttribute('width', '1536')
    await expect(illustration).toHaveAttribute('height', '1024')
    await expect.poll(() => illustration.evaluate(img =>
      img instanceof HTMLImageElement ? img.naturalWidth : 0
    )).toBeGreaterThan(0)
    for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      const content = await page.locator(selector).getAttribute('content')
      expect(content).toBeTruthy()
      expect(content).not.toContain('/editorial/')
    }
  })
}
