import { createHash } from 'node:crypto'
import { expect, test } from '@playwright/test'
import { PRACTITIONERS } from '@/app/src/lib/constants'

const ABOUT_SCHEMA_SHA256 =
  'b046036e8d094dac7ac7e9dbe9c579ace8229e851bb8c6d9e6a514352a26adcd'

const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 900 },
  { width: 1440, height: 1000 },
] as const

test.describe('/sobre structured redesign', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name === 'mobile',
      'These checks set all four acceptance widths explicitly.'
    )
  })

  test('keeps the production JSON-LD byte-identical', async ({ page }) => {
    await page.goto('/sobre')

    const schemas = await page
      .locator('main script[type="application/ld+json"]')
      .allTextContents()
    const hash = createHash('sha256').update(schemas.join('\n')).digest('hex')

    expect(hash).toBe(ABOUT_SCHEMA_SHA256)
  })

  test('keeps every practitioner fact sourced from production data', async ({ page }) => {
    await page.goto('/sobre')
    const mainText = await page.locator('main').textContent()

    for (const practitioner of PRACTITIONERS) {
      const expectedStrings = [
        practitioner.name,
        practitioner.title,
        practitioner.cro,
        ...practitioner.bio,
        ...practitioner.specialties.map((specialty) =>
          specialty.replace(/\s*\([^)]*\)\s*$/, '')
        ),
        ...practitioner.credentials.flatMap((credential) => [
          credential.category,
          credential.name,
          credential.institution,
        ]),
        ...practitioner.procedures,
      ]

      for (const text of expectedStrings) expect(mainText).toContain(text)
    }

    expect(mainText).not.toContain('Protótipo')
  })

  test('matches the layout contract at all acceptance widths', async ({ page }) => {
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize(viewport)
      await page.goto('/sobre')

      const headingGradient = page.locator('main h1 span')
      await expect(headingGradient).toHaveCSS('color', 'rgba(0, 0, 0, 0)')
      expect(
        await headingGradient.evaluate(
          (heading) => getComputedStyle(heading).backgroundImage
        )
      ).toContain('linear-gradient')

      const mobileIndex = page.locator('nav[aria-label="Ir para"]')
      const desktopIndex = page.locator('nav[aria-label="Equipe"]')
      if (viewport.width < 1024) {
        await expect(mobileIndex).toBeVisible()
        await expect(desktopIndex).toBeHidden()
      } else {
        await expect(mobileIndex).toBeHidden()
        await expect(desktopIndex).toHaveCount(0)
      }

      const ctaRect = await page.locator('main aside').last().evaluate((cta) => {
        const rect = cta.getBoundingClientRect()
        return {
          left: rect.left,
          width: rect.width,
          radius: getComputedStyle(cta).borderRadius,
        }
      })
      expect(ctaRect.left).toBeGreaterThan(0)
      expect(ctaRect.width).toBeLessThan(viewport.width)
      expect(ctaRect.radius).toBe('24px')

      for (const profile of await page.locator('main section').all()) {
        await expect(profile).toHaveCSS('border-radius', '24px')

        const portrait = profile.locator('img')
        expect(
          await profile.evaluate((section) => {
            const element = section.querySelector('h2')
            const image = section.querySelector('img')
            return Boolean(
              element &&
                image &&
                element.compareDocumentPosition(image) &
                  Node.DOCUMENT_POSITION_FOLLOWING
            )
          })
        ).toBe(true)

        const portraitBox = await portrait.boundingBox()
        expect(portraitBox?.width).toBeLessThanOrEqual(360)
        if (viewport.width >= 768) expect(portraitBox?.width).toBe(360)

        const procedures = profile
          .getByRole('heading', { name: 'Procedimentos realizados' })
          .locator('xpath=following-sibling::ul[1]')
        await expect(procedures).toHaveCSS('display', 'grid')
        if (viewport.width >= 640) {
          const firstRow = await procedures.locator('li').evaluateAll((items) =>
            items.slice(0, 2).map((item) => {
              const rect = item.getBoundingClientRect()
              return { top: rect.top, bottom: rect.bottom }
            })
          )
          expect(firstRow[0]).toEqual(firstRow[1])
        }
      }

      expect(
        await page.evaluate(() => document.documentElement.scrollWidth)
      ).toBe(viewport.width)

      for (const portrait of await page.locator('main section img').all()) {
        await portrait.scrollIntoViewIfNeeded()
        await expect
          .poll(() =>
            portrait.evaluate((element) => {
              const image = element as HTMLImageElement
              return image.complete && image.naturalWidth > 0
            })
          )
          .toBe(true)
      }
    }
  })

  test('keeps anchor targets clear of the fixed header', async ({ page }) => {
    for (const viewport of [VIEWPORTS[0], VIEWPORTS[2]]) {
      await page.setViewportSize(viewport)
      await page.goto('/sobre')

      if (viewport.width < 1024) {
        await page
          .locator('nav[aria-label="Ir para"] a[href="#thiago-massoni"]')
          .click()
      } else {
        await page.goto('/sobre#thiago-massoni')
      }
      await expect.poll(() => page.evaluate(() => window.location.hash)).toBe(
        '#thiago-massoni'
      )
      await expect
        .poll(
          () =>
            page.locator('#thiago-massoni-nome').evaluate((heading) => {
              const header = document.querySelector('body > header')
              return (
                heading.getBoundingClientRect().top >
                (header?.getBoundingClientRect().bottom ?? 0)
              )
            }),
          { timeout: 2_000 }
        )
        .toBe(true)
    }
  })

  test('provides visible brand focus and 44px targets', async ({ page }) => {
    for (const viewport of [VIEWPORTS[0], VIEWPORTS[3]]) {
      await page.setViewportSize(viewport)
      await page.goto('/sobre')

      const requiredLinks = [
        ...(viewport.width < 1024
          ? [page.locator('nav[aria-label="Ir para"] a').first()]
          : []),
        ...await page.getByRole('link', {
          name: 'Ver estes tratamentos em detalhe',
          exact: true,
        }).all(),
        page.getByRole('link', { name: 'Ver os tratamentos realizados' }),
        page.getByRole('link', { name: 'Ler os artigos' }),
        page.getByRole('link', { name: 'Agendar avaliação' }),
      ]
      for (const link of requiredLinks) {
        await link.scrollIntoViewIfNeeded()
        await link.focus()
        const focus = await link.evaluate((element) => {
          const style = getComputedStyle(element)
          const rect = element.getBoundingClientRect()
          return {
            outlineWidth: Number.parseFloat(style.outlineWidth),
            boxShadow: style.boxShadow,
            targetWidth: rect.width,
            targetHeight: rect.height,
          }
        })
        expect(
          focus.outlineWidth >= 2 || focus.boxShadow !== 'none'
        ).toBe(true)
        expect(focus.targetWidth).toBeGreaterThanOrEqual(44)
        expect(focus.targetHeight).toBeGreaterThanOrEqual(44)
      }
    }
  })
})
