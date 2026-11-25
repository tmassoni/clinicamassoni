import { expect, test, type APIResponse } from '@playwright/test'
import {
  CLINIC_ADDRESS_STREET,
  CLINIC_WEBSITE,
  CONTACT_EMAIL,
  CONTACT_PHONE_FORMATTED,
  CONTACT_WHATSAPP_URL,
} from '@/app/src/lib/constants'
import { galleryImages } from '@/app/src/lib/gallery-data'

const markdown = { headers: { Accept: 'text/markdown' } }
const html = { headers: { Accept: 'text/html' } }

function expectVaryAccept(response: APIResponse) {
  expect(response.headers().vary?.toLowerCase().split(/,\s*/)).toContain('accept')
}

function withoutScripts(body: string) {
  return body.replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
}

function plainText(body: string) {
  return body.replace(/<!--[^]*?-->/g, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

test('the homepage negotiates HTML and Markdown at the same URL', async ({ request }) => {
  const home = await request.get('/', markdown)
  expect(home.status()).toBe(200)
  expect(home.url()).toMatch(/\/$/)
  expect(home.headers()['content-type']).toMatch(/^text\/markdown;\s*charset=utf-8$/i)
  expectVaryAccept(home)
  expect(home.headers().link).toContain('</index.md>; rel="alternate"; type="text/markdown"')
  const body = await home.text()
  expect(body).toMatch(/^# Clínica Massoni/)
  expect(body).toContain(CONTACT_EMAIL)
  expect(body).toContain(`${CLINIC_WEBSITE}/tratamentos`)

  const direct = await request.get('/index.md', html)
  expect(direct.status()).toBe(200)
  expect(direct.headers()['content-type']).toMatch(/^text\/markdown/)
  expect(await direct.text()).toBe(body)

  const browser = await request.get('/', html)
  expect(browser.status()).toBe(200)
  expect(browser.headers()['content-type']).toMatch(/^text\/html/)
  expectVaryAccept(browser)
  expect(browser.headers().link).toContain('</llms.txt>; rel="describedby"')
  expect(browser.headers().link).toContain('</index.md>; rel="alternate"; type="text/markdown"')
  expect(browser.headers().vary?.toLowerCase()).toContain('rsc')
  expect(await browser.text()).toContain('<h1')

  const head = await request.head('/', markdown)
  expect(head.status()).toBe(200)
  expect(head.headers()['content-type']).toMatch(/^text\/markdown/)
  expectVaryAccept(head)
  expect(await head.text()).toBe('')

  const preferredHtml = await request.get('/', {
    headers: { Accept: 'text/markdown;q=0, text/html;q=0.5, */*;q=1' },
  })
  expect(preferredHtml.headers()['content-type']).toMatch(/^text\/html/)

  const unacceptable = await request.get('/', { headers: { Accept: 'application/pdf' } })
  expect(unacceptable.status()).toBe(406)
  expectVaryAccept(unacceptable)
})

test('missing routes retain 404 and provide recovery links in Markdown', async ({ request }) => {
  const paths = [
    '/__ora-404-probe-ar7z786b',
    '/foo/bar?ref=agent',
    '/blog/__missing',
    '/tratamentos/__missing',
    '/images/__missing.webp',
  ]
  for (const path of paths) {
    const missing = await request.get(path, markdown)
    expect(missing.status(), path).toBe(404)
    expect(missing.headers()['content-type'], path).toMatch(/^text\/markdown;\s*charset=utf-8$/i)
    expectVaryAccept(missing)
    const body = await missing.text()
    expect(body, path).toContain('A página solicitada não existe ou foi movida.')
    expect(body, path).toContain(`[Mapa do site](${CLINIC_WEBSITE}/sitemap.xml)`)

    const browser = await request.get(path, html)
    expect(browser.status(), path).toBe(404)
    expect(browser.headers()['content-type'], path).toMatch(/^text\/html/)
    expectVaryAccept(browser)
    expect(await browser.text(), path).toContain('Página não encontrada')
  }

  const head = await request.head(paths[0], markdown)
  expect(head.status()).toBe(404)
  expect(head.headers()['content-type']).toMatch(/^text\/markdown/)
  expect(await head.text()).toBe('')

  const browser = await request.get(paths[0], {
    headers: { Accept: 'text/html', 'x-massoni-markdown-fallback': '1' },
  })
  expect(browser.status()).toBe(404)
  expect(browser.headers()['content-type']).toMatch(/^text\/html/)
})

test('trust pages provide substantive HTML and preserve Portuguese canonicals', async ({ request }) => {
  for (const [path, canonical] of [
    ['/about', '/sobre'],
    ['/contact', '/contact'],
    ['/privacy', '/politica-de-privacidade'],
  ]) {
    const response = await request.get(path, html)
    expect(response.status(), path).toBe(200)
    expect(new URL(response.url()).pathname).toBe(path)
    const body = withoutScripts(await response.text())
    const main = body.match(/<main\b[^>]*>([\s\S]+?)<\/main>/i)?.[1] ?? ''
    expect(main, path).toMatch(/<h1\b/)
    expect(plainText(main).length, path).toBeGreaterThanOrEqual(500)
    expect(body, path).toContain(`rel="canonical" href="${CLINIC_WEBSITE}${canonical}"`)
  }

  const contact = await (await request.get('/contact')).text()
  expect(contact).toContain(`href="mailto:${CONTACT_EMAIL}"`)
  expect(contact).toContain(`href="tel:+55${CONTACT_PHONE_FORMATTED.replace(/\D/g, '')}"`)
  expect(contact).toContain(`href="${CONTACT_WHATSAPP_URL}"`)
  expect(await (await request.get('/', html)).text()).toMatch(
    /<footer\b[\s\S]*<a\b[^>]*href="\/contact"[^>]*>Contato<\/a>/
  )
})

test('the homepage exposes readable HTML, complete metadata and organization details', async ({ request }) => {
  const raw = await (await request.get('/', html)).text()
  const markup = withoutScripts(raw)
  const main = markup.match(/<main\b[^>]*>([\s\S]+?)<\/main>/i)?.[1] ?? ''
  expect(plainText(main).length).toBeGreaterThanOrEqual(500)
  expect(plainText(markup).length / markup.length).toBeGreaterThanOrEqual(0.05)
  const headings = Array.from(main.matchAll(/<h([1-6])\b/g), ([, level]) => Number(level))
  expect(headings[0]).toBe(1)
  expect(headings.filter((level) => level === 1)).toHaveLength(1)
  expect(headings.every((level, index) => index === 0 || level <= headings[index - 1] + 1)).toBe(true)
  const gallery = main.match(/<section\b[^>]*id="galeria"[^>]*>([\s\S]+?)<\/section>/i)?.[1] ?? ''
  expect(gallery.match(/<img\b/g)).toHaveLength(galleryImages.length)

  expect(markup).toMatch(/<html\b[^>]*lang="pt-BR"/)
  expect(markup).toContain(`rel="canonical" href="${CLINIC_WEBSITE}"`)
  expect(markup).toContain('property="og:type" content="website"')
  expect(markup).toContain(`property="og:image" content="${CLINIC_WEBSITE}/opengraph-image`)
  expect(markup).toContain(`rel="alternate" type="text/markdown" href="${CLINIC_WEBSITE}/index.md"`)
  expect(markup).toContain('rel="describedby" href="/llms.txt"')

  const [siteSchema] = Array.from(
    raw.matchAll(/<script type="application\/ld\+json">([\s\S]+?)<\/script>/g),
    ([, json]) => JSON.parse(json),
  )
  expect(siteSchema['@graph']).toContainEqual(expect.objectContaining({
    '@id': `${CLINIC_WEBSITE}/#organization`,
    '@type': expect.arrayContaining(['Organization', 'MedicalBusiness']),
    address: expect.objectContaining({ '@type': 'PostalAddress', streetAddress: CLINIC_ADDRESS_STREET }),
    contactPoint: expect.objectContaining({
      '@type': 'ContactPoint',
      contactType: 'agendamento e informações',
      email: CONTACT_EMAIL,
      telephone: `+55${CONTACT_PHONE_FORMATTED.replace(/\D/g, '')}`,
    }),
  }))
})

test('sitemap and agent discovery files resolve and link to available public pages', async ({ request }) => {
  const [robots, sitemap, index, corpus, ogImage] = await Promise.all([
    request.get('/robots.txt', markdown),
    request.get('/sitemap.xml', markdown),
    request.get('/llms.txt', markdown),
    request.get('/llms-full.txt', markdown),
    request.get('/opengraph-image', markdown),
  ])
  for (const response of [robots, sitemap, index, corpus, ogImage]) {
    expect(response.status(), response.url()).toBe(200)
  }
  expect(await robots.text()).toContain(`Sitemap: ${CLINIC_WEBSITE}/sitemap.xml`)
  expect(sitemap.headers()['content-type']).toMatch(/xml/)
  expect(ogImage.headers()['content-type']).toMatch(/^image\//)
  expect(index.headers()['content-type']).toMatch(/^text\/plain/)
  expect(corpus.headers()['content-type']).toMatch(/^text\/plain/)
  expect(await corpus.text()).toContain('# Tratamentos')
  const indexBody = await index.text()
  expect(indexBody).toMatch(/^# Clínica Massoni[^\n]*\n\n>/)
  expect(indexBody).toContain('## When to use this')
  expect(indexBody).toContain('`Accept: text/markdown`')
  const canonicals = Array.from((await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g), ([, url]) => url)
  expect(canonicals).toContain(`${CLINIC_WEBSITE}/contact`)
  const indexed = Array.from(indexBody.matchAll(/\]\((https:\/\/[^)]+)\)/g), ([, url]) => url)
  const paths = new Set([...canonicals, ...indexed].map((url) => new URL(url).pathname))
  for (const path of paths) {
    const response = await request.get(path, path === '/' ? html : markdown)
    expect(response.status(), path).toBe(200)
    if (canonicals.some((url) => new URL(url).pathname === path)) {
      expect(plainText(withoutScripts(await response.text())), path).toContain('Massoni')
    }
  }
})

test('gallery keeps filtering and opening images on desktop and mobile', async ({ page, isMobile }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  const gallery = page.locator('#galeria')
  const next = gallery.getByRole('button', { name: 'Next slide' })
  const first = gallery.getByRole('group').first()
  if (isMobile) {
    await expect(next).toBeEnabled()
    const left = (await first.boundingBox())?.x ?? 0
    await next.click()
    await expect.poll(async () => (await first.boundingBox())?.x).not.toBe(left)
    await gallery.getByRole('button', { name: 'Previous slide' }).click()
    await expect.poll(async () => Math.round((await first.boundingBox())?.x ?? 0)).toBe(Math.round(left))
  } else {
    await expect(next).toBeHidden()
    const cards = gallery.getByRole('group')
    expect((await cards.first().boundingBox())?.y).toBe((await cards.nth(1).boundingBox())?.y)
  }

  await gallery.getByRole('button', { name: 'Equipe' }).click()
  await expect(gallery.locator('img')).toHaveCount(
    galleryImages.filter(({ category }) => category === 'team').length
  )
  await first.getByRole('button').click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: 'Close', exact: true }).click()
  await expect(page.getByRole('dialog')).toBeHidden()
})
