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

// The blog/treatment CTA is a white button on a primary-coloured card, but the
// Button variant's focus colours are primary, which hid its label on focus
// (including after a tap, when the link stays focused on return from
// WhatsApp). Axe can't help here: it can't measure contrast over the card's
// gradient and reports it as incomplete. Assert the focused colours directly.
test.describe('focused CTA card', () => {
  for (const route of ['/blog/profilaxia-dental', '/tratamentos/implantes-dentarios']) {
    test(`${route} CTA keeps its colours when focused`, async ({ page }) => {
      await page.goto(route)

      // `.last()`: on desktop the sticky ArticleAside has a link with the same
      // name; the CTA card is always the last one on the page.
      const cta = page.getByRole('link', { name: 'Agendar avaliação' }).last()
      const colours = () =>
        cta.evaluate((el) => {
          const style = getComputedStyle(el)
          return { background: style.backgroundColor, text: style.color }
        })

      const resting = await colours()
      await cta.focus()
      await expect(cta).toBeFocused()

      await expect.poll(colours).toEqual(resting)
    })
  }
})
