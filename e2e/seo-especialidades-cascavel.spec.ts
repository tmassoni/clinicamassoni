import { expect, test } from '@playwright/test'

const SITE = 'https://www.clinicamassoni.com.br'
const FACETAS = '/tratamentos/facetas-de-resina'
const MANUTENCAO = '/blog/faceta-de-resina-cuidados'
const GUIA_BUCOMAXILO = '/blog/cirurgiao-bucomaxilofacial-quando-procurar'
const ATENDIMENTO = '/locais-de-atendimento/cascavel'

test('apresenta facetas de resina como serviço em Cascavel', async ({ page }) => {
  expect((await page.goto(FACETAS))?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Facetas de resina')
  await expect(page.locator('main header').getByText('Dr. Thiago Massoni', { exact: true }))
    .toBeVisible()
  await expect(page.locator('main header').getByText('CRO-PR 35209')).toBeVisible()
  for (const heading of [
    'Quando uma faceta de resina pode ajudar?',
    'O que é avaliado na primeira consulta?',
    'Como funciona a manutenção?',
    'Quando este tratamento não é indicado',
  ]) {
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible()
  }
  await expect(page.getByRole('link', { name: 'Agendar avaliação', exact: true }).last())
    .toHaveAttribute('href', /^https:\/\/wa\.me\/5545991492390\?/)
  await expect(page.getByRole('link', { name: /faceta de resina: cuidados e manutenção/i }))
    .toHaveAttribute('href', MANUTENCAO)
})

test('leva da manutenção, da dentística e do recontorno ao serviço de facetas', async ({ page }) => {
  expect((await page.goto(MANUTENCAO))?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1 }))
    .toHaveText('Faceta de resina: cuidados e manutenção')
  await expect(page.getByText('CRO-PR 35209', { exact: true }).first()).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Quando a faceta pode ser polida ou reparada?' }))
    .toBeVisible()
  await page.getByRole('link', { name: 'avaliação de facetas de resina' }).click()
  await expect(page).toHaveURL(new RegExp(`${FACETAS}$`))

  await page.goto('/tratamentos/dentistica-restauradora')
  await expect(page.getByRole('navigation', { name: 'Outros tratamentos' })
    .locator(`a[href="${FACETAS}"]`)).toBeVisible()

  await page.goto('/blog/recontorno-estetico-resina-composta')
  await expect(page.getByRole('link', { name: 'Faceta de resina', exact: true }))
    .toHaveAttribute('href', FACETAS)
})

test('publica as duas URLs canônicas nas superfícies de descoberta', async ({ page, request }) => {
  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.status()).toBe(200)
  const xml = await sitemap.text()
  const inventory = await request.get('/llms.txt')
  const corpus = await request.get('/llms-full.txt')
  expect(inventory.status()).toBe(200)
  expect(corpus.status()).toBe(200)
  const [indexText, fullText] = await Promise.all([inventory.text(), corpus.text()])

  for (const route of [FACETAS, MANUTENCAO]) {
    const canonical = `${SITE}${route}`
    await page.goto(route)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /^index, follow/)
    expect(xml.split(`<loc>${canonical}</loc>`)).toHaveLength(2)
    expect(indexText).toContain(`(${canonical})`)
    expect(fullText).toContain(`URL: ${canonical}`)
  }
})

test('orienta o preparo para a consulta com o bucomaxilo e abre a página de chegada', async ({ page }) => {
  expect((await page.goto(GUIA_BUCOMAXILO))?.status()).toBe(200)
  const article = page.getByRole('article').filter({
    has: page.getByRole('heading', { name: 'O que levar à primeira consulta?' }),
  })
  await expect(article.getByRole('heading', { name: 'O que levar à primeira consulta?' })).toBeVisible()
  for (const item of ['Encaminhamento, se houver', 'Exames já realizados', 'Medicamentos e alergias']) {
    await expect(article.getByText(item, { exact: true })).toBeVisible()
  }

  const locationLink = page.locator('main aside')
    .getByRole('link', { name: 'Atendimento em Cascavel, PR' })
  await expect(locationLink).toHaveAttribute('href', ATENDIMENTO)
  await locationLink.click()
  await expect(page).toHaveURL(new RegExp(`${ATENDIMENTO}$`))

  await page.goto('/tratamentos/cirurgia-bucomaxilofacial')
  await expect(locationLink).toHaveAttribute('href', ATENDIMENTO)
})
