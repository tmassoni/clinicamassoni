import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { CLINIC_WEBSITE, CONTACT_PHONE_FORMATTED, CONTACT_WHATSAPP_URL } from '@/app/src/lib/constants'

const route = '/locais-de-atendimento/cascavel'

test('the clinic page resolves with its own intent and existing contact destinations', async ({ page }) => {
  const response = await page.goto(route)
  expect(response?.status()).toBe(200)
  await expect(page.locator('main h1')).toHaveCount(1)
  await expect(page).toHaveTitle('Clínica Massoni: atendimento em Cascavel')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${CLINIC_WEBSITE}${route}`)
  await expect(page.getByRole('link', { name: 'Agendar pelo WhatsApp', exact: true })).toHaveAttribute('href', CONTACT_WHATSAPP_URL)
  await expect(page.getByRole('link', { name: `Ligar ${CONTACT_PHONE_FORMATTED}`, exact: true })).toHaveAttribute('href', `tel:${CONTACT_PHONE_FORMATTED.replace(/\D/g, '')}`)
  await expect(page.locator('main iframe')).toHaveAttribute('loading', 'lazy')
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(results.violations.map(({ id, nodes }) => ({ id, nodes: nodes.map(({ html }) => html) }))).toEqual([])
})

test('navigation and page fit desktop, tablet and small mobile', async ({ page }) => {
  for (const width of [320, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto(route)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `width ${width}`).toBe(true)
    const nav = page.locator('header nav').getByRole('link', { name: 'Atendimento', exact: true })
    if (width >= 1024) await expect(nav).toBeVisible()
  }
})
