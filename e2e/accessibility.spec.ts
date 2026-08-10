import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const ROUTES = [
  '/',
  '/sobre',
  '/tratamentos',
  '/tratamentos/implantes-dentarios',
  '/blog',
  '/blog/profilaxia-dental',
]

/**
 * Lighthouse already runs axe, but only on the pages you point it at, manually.
 * This runs the same engine across every page type on every commit, at both
 * desktop and mobile widths.
 */
test.describe('accessibility — WCAG 2.1 A and AA', () => {
  for (const route of ROUTES) {
    test(`${route} has no violations`, async ({ page }) => {
      await page.goto(route)

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()

      // Report the rule ids and the offending nodes, not just a count — a bare
      // "expected 0, got 3" is useless when this fails in CI.
      const summary = results.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.map((node) => node.html.slice(0, 120)),
      }))

      expect(summary).toEqual([])
    })
  }
})
