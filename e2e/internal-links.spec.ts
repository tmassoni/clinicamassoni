import { test, expect } from '@playwright/test'

const ENTRY_POINTS = [
  '/',
  '/sobre',
  '/tratamentos',
  '/tratamentos/implantes-dentarios',
  '/blog',
  '/blog/profilaxia-dental',
  '/blog/tipos-de-protese-dentaria',
]

/**
 * Crawls every internal link reachable from the entry points and asserts it
 * resolves. Catches superseded slugs and dead anchors — the two failure modes
 * the kit calls out, and both of which leak link equity silently.
 */
test.describe('internal links resolve', () => {
  test('no internal link 404s, and every anchor target exists', async ({
    page,
    request,
  }) => {
    const checkedUrls = new Set<string>()
    const brokenUrls: string[] = []
    const brokenAnchors: string[] = []

    for (const entry of ENTRY_POINTS) {
      await page.goto(entry)

      const hrefs = await page
        .locator('a[href^="/"], a[href^="#"]')
        .evaluateAll((anchors) =>
          anchors.map((anchor) => anchor.getAttribute('href') ?? '')
        )

      for (const href of hrefs) {
        if (!href || href.startsWith('//')) continue

        const [pathPart, hash] = href.split('#')
        const target = pathPart || entry.split('#')[0]

        if (!checkedUrls.has(target)) {
          checkedUrls.add(target)
          const response = await request.get(target)
          if (response.status() >= 400) {
            brokenUrls.push(`${entry} -> ${target} (${response.status()})`)
          }
        }

        // An anchor pointing at an id that no longer exists is silently dead.
        if (hash) {
          await page.goto(target)
          // Attribute selector rather than `#id` — CSS.escape is a browser API
          // and this runs in Node, and ids here contain accents.
          const count = await page.locator(`[id="${hash}"]`).count()
          if (count === 0) {
            brokenAnchors.push(`${entry} -> ${href} (no #${hash} on ${target})`)
          }
          await page.goto(entry)
        }
      }
    }

    expect({ brokenUrls, brokenAnchors }).toEqual({
      brokenUrls: [],
      brokenAnchors: [],
    })
  })
})
