import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import {
  CONTACT_PHONE_FORMATTED,
  CONTACT_WHATSAPP_URL,
} from '@/app/src/lib/constants'

for (const route of ['/blog/extracao-de-siso', '/tratamentos/implantes-dentarios', '/sobre']) {
  test(`${route} offers the existing WhatsApp and phone destinations`, async ({ page }) => {
    await page.goto(route)
    const whatsapp = page.getByRole('link', { name: 'Agendar pelo WhatsApp', exact: true })
    const card = page.locator('aside').filter({ has: whatsapp })
    const phone = card.getByRole('link', { name: `Ligar ${CONTACT_PHONE_FORMATTED}`, exact: true })
    await expect(whatsapp).toHaveAttribute('href', CONTACT_WHATSAPP_URL)
    await expect(whatsapp).toHaveAttribute('target', '_blank')
    await expect(phone).toHaveAttribute('href', `tel:${CONTACT_PHONE_FORMATTED.replace(/\D/g, '')}`)
    await phone.focus()
    await expect(phone).toBeFocused()
    const bounds = await phone.boundingBox()
    expect(bounds?.height).toBeGreaterThanOrEqual(44)
    for (const action of [whatsapp, phone]) {
      await action.focus()
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
      expect(results.violations.map(({ id, nodes }) => ({
        id, nodes: nodes.map(({ html }) => html),
      }))).toEqual([])
    }
  })
}
