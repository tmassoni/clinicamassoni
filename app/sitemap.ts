import type { MetadataRoute } from 'next'
import { CLINIC_WEBSITE } from '@/app/src/lib/constants'
import { getAllPosts, getBlogLastModified } from '@/app/src/lib/blog'
import { TREATMENTS_BY_ORDER, getTreatmentUrl } from '@/app/src/lib/treatments'

/** Service pages ship together; one date for the set is honest. */
const TREATMENTS_LAST_MODIFIED = '2026-08-04'

/**
 * Hand-maintained dates for static routes. `new Date()` everywhere would claim
 * the whole site changed on every deploy, which teaches crawlers to ignore
 * `lastModified` entirely. Bump an entry when that page's content changes.
 */
const STATIC_ROUTES = [
  { path: '/', lastModified: '2026-08-04', changeFrequency: 'weekly', priority: 1 },
  {
    path: '/sobre',
    lastModified: '2026-08-04',
    changeFrequency: 'yearly',
    priority: 0.7,
  },
  {
    path: '/tratamentos',
    lastModified: TREATMENTS_LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.95,
  },
  { path: '/blog', lastModified: null, changeFrequency: 'weekly', priority: 0.85 },
  {
    path: '/politica-de-privacidade',
    lastModified: '2025-10-22',
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    path: '/termos-de-uso',
    lastModified: '2025-10-22',
    changeFrequency: 'yearly',
    priority: 0.3,
  },
] as const satisfies readonly {
  path: string
  lastModified: string | null
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}[]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: route.path === '/' ? CLINIC_WEBSITE : `${CLINIC_WEBSITE}${route.path}`,
    // /blog inherits the freshest post date rather than a hand-kept one.
    lastModified: route.lastModified
      ? new Date(route.lastModified)
      : getBlogLastModified(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // Commercial intent lives here, so these outrank posts.
  const treatmentEntries: MetadataRoute.Sitemap = TREATMENTS_BY_ORDER.map(
    (treatment) => ({
      url: getTreatmentUrl(treatment.slug),
      lastModified: new Date(TREATMENTS_LAST_MODIFIED),
      changeFrequency: 'monthly',
      priority: 0.9,
    })
  )

  // Posts are auto-discovered from disk so publishing can never forget one.
  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: post.url,
    lastModified: new Date(post.lastModified),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticEntries, ...treatmentEntries, ...postEntries]
}
