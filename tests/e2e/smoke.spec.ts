import { test, expect } from '@playwright/test'

const ROUTES = [
  '/',
  '/sobre',
  '/tratamentos',
  '/tratamentos/implantes-dentarios',
  '/blog',
  '/blog/profilaxia-dental',
]

test.describe('critical routes render', () => {
  for (const route of ROUTES) {
    test(`${route} returns 200 with one h1 and a canonical`, async ({ page }) => {
      const response = await page.goto(route)
      expect(response?.status()).toBe(200)

      // Exactly one h1 — more than one dilutes the page's topic signal.
      await expect(page.locator('h1')).toHaveCount(1)

      const canonical = page.locator('link[rel="canonical"]')
      await expect(canonical).toHaveCount(1)
      await expect(canonical).toHaveAttribute(
        'href',
        /^https:\/\/www\.clinicamassoni\.com\.br/
      )

      // Answer engines mostly don't execute JS: content must be in the HTML.
      const html = await response!.text()
      expect(html).toContain('application/ld+json')
    })
  }
})

test.describe('structured data is server-rendered', () => {
  test('treatment page carries all three JSON-LD blocks', async ({ page }) => {
    const response = await page.goto('/tratamentos/implantes-dentarios')
    const html = await response!.text()

    expect(html).toContain('"@type":"MedicalProcedure"')
    expect(html).toContain('"@type":"FAQPage"')
    expect(html).toContain('"@type":"BreadcrumbList"')
  })

  test('blog post carries MedicalWebPage and Article', async ({ page }) => {
    const response = await page.goto('/blog/profilaxia-dental')
    const html = await response!.text()

    expect(html).toContain('"@type":"MedicalWebPage"')
    expect(html).toContain('"@type":"Article"')
  })

  test('FAQ answers are present in the served HTML, not injected by JS', async ({
    page,
  }) => {
    const response = await page.goto('/tratamentos/implantes-dentarios')
    const html = await response!.text()

    // Native <details> keeps answers in the DOM; a JS accordion would not.
    expect(html).toContain('Rejeição no sentido imunológico')
  })
})

test.describe('discovery endpoints', () => {
  test('sitemap, robots and llms files are served', async ({ request }) => {
    for (const path of ['/sitemap.xml', '/robots.txt', '/llms.txt', '/llms-full.txt']) {
      const response = await request.get(path)
      expect({ path, status: response.status() }).toEqual({ path, status: 200 })
    }
  })

  test('robots allows the answer-engine crawlers', async ({ request }) => {
    const body = await (await request.get('/robots.txt')).text()
    for (const agent of ['OAI-SearchBot', 'ClaudeBot', 'PerplexityBot']) {
      expect(body).toContain(agent)
    }
  })
})

test.describe('the ownership funnel resolves', () => {
  test('a post links up to its owner treatment', async ({ page }) => {
    await page.goto('/blog/implante-dentario-passo-a-passo')

    const link = page.getByRole('link', { name: /ver o tratamento/i })
    await expect(link).toBeVisible()
    await link.click()

    await expect(page).toHaveURL(/\/tratamentos\/implantes-dentarios$/)
    await expect(page.locator('h1')).toContainText('Implantes dentários')
  })

  test('a treatment links back down to a supporting post', async ({ page }) => {
    await page.goto('/tratamentos/implantes-dentarios')

    const related = page.getByRole('link', { name: /implante dentário: como funciona/i })
    await expect(related).toBeVisible()
  })
})

test.describe('navigation', () => {
  test('skip link moves focus to main content', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')

    const skip = page.getByRole('link', { name: /pular para o conteúdo/i })
    await expect(skip).toBeFocused()

    await skip.click()
    await expect(page.locator('#main')).toBeFocused()
  })
})
