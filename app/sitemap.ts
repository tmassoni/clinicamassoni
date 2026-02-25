import type { MetadataRoute } from 'next'
import { CLINIC_WEBSITE } from '@/app/src/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = CLINIC_WEBSITE
  const routes = ['/', '/politica-de-privacidade', '/termos-de-uso']

  return routes.map((path) => ({
    url: path === '/' ? baseUrl : `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.5,
  }))
}
