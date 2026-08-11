import { describe, expect, test } from 'bun:test'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import sitemap, { STATIC_ROUTES, TREATMENTS_LAST_MODIFIED } from '@/app/sitemap'
import { getAllPosts } from '@/app/src/lib/blog'
import { CLINIC_WEBSITE } from '@/app/src/lib/constants'
import { TREATMENTS_BY_ORDER, getTreatmentPath } from '@/app/src/lib/treatments'

/**
 * The sitemap is what we hand to Search Console, so a route that exists but is
 * missing from it is invisible, and an entry for a route that no longer exists
 * is a "Submitted URL not found (404)" error against the whole submission.
 *
 * Every assertion here is set *equality* rather than containment: containment
 * only catches the first failure mode, and the stale entry is the one that
 * costs you a red status in GSC.
 */

const APP_DIR = path.join(process.cwd(), 'app')

/** Route paths as Next resolves them, e.g. `/`, `/blog`, `/tratamentos/[slug]`. */
function findRoutes(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    // `src` holds components and lib, not routes.
    if (entry.isDirectory()) return entry.name === 'src' ? [] : findRoutes(full)
    if (entry.name !== 'page.tsx') return []

    const relative = path.relative(APP_DIR, dir)
    return [relative === '' ? '/' : `/${relative}`]
  })
}

const routesOnDisk = findRoutes(APP_DIR)
const staticRoutesOnDisk = routesOnDisk.filter((route) => !route.includes('[')).sort()
const dynamicRoutesOnDisk = routesOnDisk.filter((route) => route.includes('[')).sort()

const sitemapEntries = sitemap()
const sitemapUrls = sitemapEntries.map((entry) => entry.url)
const urlFor = (routePath: string) =>
  routePath === '/' ? CLINIC_WEBSITE : `${CLINIC_WEBSITE}${routePath}`

const llmsTxt = fs.readFileSync(path.join(process.cwd(), 'public', 'llms.txt'), 'utf8')

describe('sitemap route coverage', () => {
  test('the route table matches the pages that exist on disk', () => {
    const declared = STATIC_ROUTES.map((route): string => route.path).sort()
    expect(declared).toEqual(staticRoutesOnDisk)
  })

  test('only the two known dynamic segments exist', () => {
    // A new dynamic route needs its own expansion below, so make adding one
    // fail here rather than quietly ship an unlisted set of pages.
    expect(dynamicRoutesOnDisk).toEqual(['/blog/[slug]', '/tratamentos/[slug]'])
  })

  test('the sitemap is exactly the static routes, treatments and posts', () => {
    const expected = [
      ...STATIC_ROUTES.map((route) => urlFor(route.path)),
      ...TREATMENTS_BY_ORDER.map((treatment) => urlFor(getTreatmentPath(treatment.slug))),
      ...getAllPosts().map((post) => post.url),
    ].sort()

    expect([...sitemapUrls].sort()).toEqual(expected)
  })

  test('every treatment page is in the sitemap', () => {
    const urls = new Set(sitemapUrls)
    for (const treatment of TREATMENTS_BY_ORDER) {
      expect({
        slug: treatment.slug,
        inSitemap: urls.has(urlFor(getTreatmentPath(treatment.slug))),
      }).toEqual({ slug: treatment.slug, inSitemap: true })
    }
  })
})

describe('sitemap entry shape', () => {
  test('every URL is absolute, on the canonical host, and has no trailing slash', () => {
    for (const url of sitemapUrls) {
      expect({ url, ok: url.startsWith(`${CLINIC_WEBSITE}`) }).toEqual({ url, ok: true })
      expect({ url, trailingSlash: url !== CLINIC_WEBSITE && url.endsWith('/') }).toEqual({
        url,
        trailingSlash: false,
      })
      expect({ url, doubleSlash: /[^:]\/\//.test(url) }).toEqual({ url, doubleSlash: false })
    }
  })

  test('every entry carries a valid lastModified, priority and changeFrequency', () => {
    for (const entry of sitemapEntries) {
      const lastModified = entry.lastModified as Date
      expect({ url: entry.url, valid: !Number.isNaN(lastModified.getTime()) }).toEqual({
        url: entry.url,
        valid: true,
      })
      // A future date makes a crawler distrust every date in the file.
      expect({ url: entry.url, inFuture: lastModified.getTime() > Date.now() }).toEqual({
        url: entry.url,
        inFuture: false,
      })
      expect(entry.priority).toBeGreaterThan(0)
      expect(entry.priority).toBeLessThanOrEqual(1)
      expect(entry.changeFrequency).toBeTruthy()
    }
  })

  test('commercial pages outrank articles', () => {
    const priorityOf = (url: string) =>
      sitemapEntries.find((entry) => entry.url === url)?.priority ?? 0

    const lowestTreatment = Math.min(
      ...TREATMENTS_BY_ORDER.map((treatment) =>
        priorityOf(urlFor(getTreatmentPath(treatment.slug)))
      )
    )
    const highestPost = Math.max(...getAllPosts().map((post) => priorityOf(post.url)))

    expect(lowestTreatment).toBeGreaterThan(highestPost)
  })
})

describe('llms.txt mirrors the sitemap', () => {
  test('it lists exactly the treatments that exist', () => {
    const listed = [
      ...new Set(
        Array.from(
          llmsTxt.matchAll(/\/tratamentos\/([a-z0-9-]+)/g),
          ([, slug]) => slug
        )
      ),
    ].sort()

    expect(listed).toEqual(TREATMENTS_BY_ORDER.map((treatment) => treatment.slug).sort())
  })

  test('it links every static page', () => {
    for (const route of STATIC_ROUTES) {
      expect({ path: route.path, listed: llmsTxt.includes(urlFor(route.path)) }).toEqual({
        path: route.path,
        listed: true,
      })
    }
  })

  test('it points at the canonical host only', () => {
    const foreignHosts = Array.from(
      llmsTxt.matchAll(/https?:\/\/([^/\s)]+)/g),
      ([, host]) => host
    ).filter((host) => host !== 'www.clinicamassoni.com.br')

    expect([...new Set(foreignHosts)]).toEqual([])
  })

  test('it advertises the full-text corpus route, and that route exists', () => {
    expect(llmsTxt).toContain(`${CLINIC_WEBSITE}/llms-full.txt`)
    expect(fs.existsSync(path.join(APP_DIR, 'llms-full.txt', 'route.ts'))).toBe(true)
  })
})

/**
 * Hand-maintained dates drift the moment someone edits a page and forgets the
 * table. Git already knows when each page last changed, so ask it.
 *
 * A formatting-only edit will also trip this. That is the intended trade: the
 * fix is bumping one date, and the alternative is dates crawlers stop trusting.
 */
describe('lastModified honesty', () => {
  /** Files whose content ends up rendered on each route. */
  const ROUTE_SOURCES: Record<string, string[]> = {
    '/': ['app/page.tsx', 'app/src/components/sections', 'app/src/lib/home-faq.ts'],
    '/sobre': ['app/sobre/page.tsx'],
    '/tratamentos': ['app/tratamentos/page.tsx', 'app/src/lib/treatments.ts'],
    '/politica-de-privacidade': ['app/politica-de-privacidade/page.tsx'],
    '/termos-de-uso': ['app/termos-de-uso/page.tsx'],
  }

  /** Newest commit date (YYYY-MM-DD) touching any of `paths`, or null. */
  function lastCommitDate(paths: string[]): string | null {
    const dates = paths
      .map((target) => {
        try {
          return execFileSync('git', ['log', '-1', '--format=%cs', '--', target], {
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'ignore'],
          }).trim()
        } catch {
          return ''
        }
      })
      .filter(Boolean)

    return dates.length ? dates.sort().at(-1)! : null
  }

  test('every dated static route has a source mapping', () => {
    const needsMapping = STATIC_ROUTES.filter((route) => route.lastModified !== null)
      .map((route): string => route.path)
      .sort()

    // `/blog` is excluded by design: it derives its date from the posts.
    expect(Object.keys(ROUTE_SOURCES).sort()).toEqual(needsMapping)
  })

  test('no route claims a date older than its last real change', () => {
    for (const route of STATIC_ROUTES) {
      const sources = ROUTE_SOURCES[route.path]
      if (!sources || !route.lastModified) continue

      const changed = lastCommitDate(sources)
      // Shallow clone or no git: nothing to compare against, so do not fail.
      if (!changed) continue

      expect({
        route: route.path,
        declared: route.lastModified,
        stale: changed > route.lastModified,
      }).toEqual({ route: route.path, declared: route.lastModified, stale: false })
    }
  })

  test('the treatment set date is not older than the treatment content', () => {
    const changed = lastCommitDate([
      'app/src/lib/treatments.ts',
      'app/tratamentos/[slug]/page.tsx',
    ])
    if (!changed) return

    expect({ declared: TREATMENTS_LAST_MODIFIED, stale: changed > TREATMENTS_LAST_MODIFIED }).toEqual(
      { declared: TREATMENTS_LAST_MODIFIED, stale: false }
    )
  })
})
