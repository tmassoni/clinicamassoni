import { describe, expect, test } from 'bun:test'
import fs from 'node:fs'
import path from 'node:path'
import sitemap from '@/app/sitemap'
import { CLINIC_WEBSITE } from '@/app/src/lib/constants'

/**
 * Self-referencing canonicals are one line per page, and forgetting one drops
 * the page into GSC's "alternate page with proper canonical tag" bucket. This
 * test reads the route files rather than the rendered HTML so it fails fast.
 */

const APP_DIR = path.join(process.cwd(), 'app')

function findRouteFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      // `src` holds components and lib, not routes.
      return entry.name === 'src' ? [] : findRouteFiles(full)
    }
    return entry.name === 'page.tsx' ? [full] : []
  })
}

const routeFiles = findRouteFiles(APP_DIR)

describe('canonical URLs', () => {
  test('every page route is discovered', () => {
    // Home, blog index, blog post, treatments hub, treatment detail, privacy, terms.
    expect(routeFiles.length).toBeGreaterThanOrEqual(7)
  })

  test('every page route declares alternates.canonical', () => {
    for (const file of routeFiles) {
      const source = fs.readFileSync(file, 'utf8')
      const relative = path.relative(process.cwd(), file)

      expect({ route: relative, hasCanonical: source.includes('canonical') }).toEqual({
        route: relative,
        hasCanonical: true,
      })
    }
  })

  test('canonicals resolve against the single canonical host', () => {
    for (const file of routeFiles) {
      const source = fs.readFileSync(file, 'utf8')
      const relative = path.relative(process.cwd(), file)

      // Either a literal on the canonical host, or built from the constant /
      // a helper that derives from it. What must never appear is a hard-coded
      // competing host.
      const usesWrongHost =
        /canonical[^\n]*https:\/\/(?!www\.clinicamassoni\.com\.br)/.test(source)

      expect({ route: relative, usesWrongHost }).toEqual({
        route: relative,
        usesWrongHost: false,
      })
    }
  })

  test('every sitemap URL is on the canonical host', () => {
    for (const entry of sitemap()) {
      expect(entry.url.startsWith(CLINIC_WEBSITE)).toBe(true)
    }
  })

  test('the sitemap contains no duplicate URLs', () => {
    const urls = sitemap().map((entry) => entry.url)
    expect(new Set(urls).size).toBe(urls.length)
  })

  test('error and not-found routes exist', () => {
    expect(fs.existsSync(path.join(APP_DIR, 'not-found.tsx'))).toBe(true)
    expect(fs.existsSync(path.join(APP_DIR, 'error.tsx'))).toBe(true)
  })
})
