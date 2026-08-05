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

test.describe('the article rail travels with the reader', () => {
  const ARTICLE_ROUTES = [
    '/blog/profilaxia-dental',
    '/tratamentos/implantes-dentarios',
  ]

  for (const route of ARTICLE_ROUTES) {
    test(`${route} keeps the rail on screen while scrolling`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name === 'mobile', 'The rail is desktop-only.')

      await page.goto(route)
      const rail = page.locator('aside[aria-label="Conteúdo complementar"]')

      await expect(rail).toHaveCSS('position', 'sticky')

      /*
       * The trap this guards: any ancestor with a non-visible overflow silently
       * disables `position: sticky`. `overflow-hidden` on <main> did exactly
       * that, and nothing surfaced it — the computed style still said "sticky".
       */
      const offendingAncestor = await rail.evaluate((el) => {
        let node = el.parentElement
        while (node && node !== document.documentElement) {
          const style = getComputedStyle(node)
          const bad = (v: string) => ['hidden', 'auto', 'scroll', 'clip'].includes(v)
          if (bad(style.overflowX) || bad(style.overflowY)) {
            return `${node.tagName.toLowerCase()} (${style.overflowX}/${style.overflowY})`
          }
          node = node.parentElement
        }
        return null
      })
      expect({ route, offendingAncestor }).toEqual({ route, offendingAncestor: null })

      await page.evaluate(() => window.scrollBy(0, 1800))
      await page.waitForTimeout(300)

      await expect(rail).toBeInViewport()
    })
  }

  test('content starts at the header logo edge', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile', 'Alignment check is desktop-only.')

    await page.goto('/blog/profilaxia-dental')

    const logoLeft = await page
      .locator('header a[href="/#hero"]')
      .first()
      .evaluate((el) => el.getBoundingClientRect().left)
    const crumbLeft = await page
      .locator('main nav[aria-label="Trilha de navegação"]')
      .evaluate((el) => el.getBoundingClientRect().left)

    expect(Math.abs(logoLeft - crumbLeft)).toBeLessThan(2)
  })
})

test.describe('scroll behaviour on route change', () => {
  /*
   * The regression: `html { scroll-behavior: smooth }` made Next's own
   * scroll-to-top animate against the outgoing document's height, so
   * navigating from partway down an article landed you *further* down the new
   * page — measured at 2801px from a 1645px start.
   */
  test('navigating from mid-article lands at the top', async ({ page }) => {
    await page.goto('/blog/profilaxia-dental')
    await page.evaluate(() => window.scrollTo(0, 2500))
    await page.waitForTimeout(300)

    await page.getByRole('link', { name: /ver o tratamento/i }).click()
    await page.waitForURL('**/tratamentos/**')
    await page.waitForTimeout(600)

    expect(await page.evaluate(() => window.scrollY)).toBeLessThan(20)
  })

  test('reloading keeps your place', async ({ page }) => {
    await page.goto('/blog/profilaxia-dental')
    await page.evaluate(() => window.scrollTo(0, 1800))
    await page.waitForTimeout(400)

    await page.reload({ waitUntil: 'networkidle' })
    await page.waitForTimeout(600)

    // Browser scrollRestoration owns this; we must not clobber it.
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(100)
  })

  test('in-page anchors still animate', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile', 'The table of contents is desktop-only.')

    await page.goto('/blog/profilaxia-dental')
    await page.locator('nav[aria-labelledby="nesta-pagina"] a').first().click()

    const immediate = await page.evaluate(() => window.scrollY)
    await page.waitForTimeout(800)
    const settled = await page.evaluate(() => window.scrollY)

    expect(settled).toBeGreaterThan(0)
    // Mid-flight below the destination is what proves it animated.
    expect(immediate).toBeLessThan(settled)
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
