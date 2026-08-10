import { describe, expect, test } from 'bun:test'
import fs from 'node:fs'
import path from 'node:path'
import sitemap from '@/app/sitemap'
import {
  TREATMENTS,
  generateTreatmentSchema,
  getAllTreatmentSlugs,
  getTreatmentBySlug,
  getTreatmentUrl,
} from '@/app/src/lib/treatments'
import { getAllPosts } from '@/app/src/lib/blog'
import { CLINIC_WEBSITE } from '@/app/src/lib/constants'

const llmsTxt = fs.readFileSync(
  path.join(process.cwd(), 'public', 'llms.txt'),
  'utf8'
)

const slugs = getAllTreatmentSlugs().sort()

describe('treatment discovery', () => {
  test('slugs are unique', () => {
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  test('every treatment is in the sitemap', () => {
    const urls = new Set(sitemap().map((entry) => entry.url))
    for (const slug of slugs) {
      expect(urls.has(getTreatmentUrl(slug))).toBe(true)
    }
    expect(urls.has(`${CLINIC_WEBSITE}/tratamentos`)).toBe(true)
  })

  // Set equality, same as the posts: catches the forgotten new page and the
  // stale entry for a removed one.
  test('llms.txt lists exactly the treatments that exist', () => {
    const listed = [
      ...new Set(
        Array.from(
          llmsTxt.matchAll(/\/tratamentos\/([a-z0-9-]+)/g),
          ([, slug]) => slug
        )
      ),
    ].sort()

    expect(listed).toEqual(slugs)
  })

  test('order values are unique, so prev/next is deterministic', () => {
    const orders = TREATMENTS.map((treatment) => treatment.order)
    expect(new Set(orders).size).toBe(orders.length)
  })
})

describe('treatment content contract', () => {
  test('metadata fits the constraints the SEO layer assumes', () => {
    for (const treatment of TREATMENTS) {
      expect(treatment.metaDescription.length).toBeLessThanOrEqual(160)
      expect(treatment.pageTitle).toBeTruthy()
      expect(treatment.keywords.length).toBeGreaterThanOrEqual(3)
      expect(treatment.categories.length).toBeGreaterThan(0)
    }
  })

  // Required by docs/compliance-guidelines.md: every service page must cover
  // when the treatment is NOT indicated.
  test('every treatment states when it is not indicated', () => {
    for (const treatment of TREATMENTS) {
      expect({
        slug: treatment.slug,
        hasNotIndicated: treatment.notIndicated.length >= 3,
      }).toEqual({ slug: treatment.slug, hasNotIndicated: true })
    }
  })

  test('every treatment has at least four FAQs, matching the visible section', () => {
    for (const treatment of TREATMENTS) {
      expect(treatment.faqs.length).toBeGreaterThanOrEqual(4)
      for (const faq of treatment.faqs) {
        expect(faq.question.endsWith('?')).toBe(true)
        expect(faq.answer.length).toBeGreaterThan(40)
      }
    }
  })

  // Sentence case is a house rule and an AEO one — Title Case reads as
  // marketing copy to both humans and extractors. Proper nouns are exempt.
  const PROPER_NOUNS = new Set(['Cascavel', 'Paraná', 'All-on-4'])

  test('headings are sentence case, not Title Case', () => {
    for (const treatment of TREATMENTS) {
      for (const section of treatment.sections) {
        const titleCased = section.heading
          .split(' ')
          .slice(1)
          .map((word) => word.replace(/[?,.:;]/g, ''))
          .filter((word) => /^[A-Z][a-z]/.test(word) && !PROPER_NOUNS.has(word))

        expect({ heading: section.heading, titleCased }).toEqual({
          heading: section.heading,
          titleCased: [],
        })
      }
    }
  })
})

describe('treatment ↔ post linking', () => {
  test('every relatedPosts entry resolves to a real post', () => {
    for (const treatment of TREATMENTS) {
      for (const slug of treatment.relatedPosts) {
        expect({ treatment: treatment.slug, post: slug, found: Boolean(getAllPosts().find((p) => p.slug === slug)) })
          .toEqual({ treatment: treatment.slug, post: slug, found: true })
      }
    }
  })

  // A post with no owner is orphaned — it answers a question that leads
  // nowhere commercially.
  test('every post declares an ownerTreatment that resolves', () => {
    for (const post of getAllPosts()) {
      expect({ post: post.slug, owner: post.ownerTreatment }).toEqual({
        post: post.slug,
        owner: expect.any(String),
      })
      expect({
        post: post.slug,
        resolves: Boolean(getTreatmentBySlug(post.ownerTreatment!)),
      }).toEqual({ post: post.slug, resolves: true })
    }
  })

  test('every treatment is referenced by at least one post', () => {
    const owned = new Set(getAllPosts().map((post) => post.ownerTreatment))
    for (const slug of slugs) {
      expect({ treatment: slug, hasSupportingPost: owned.has(slug) }).toEqual({
        treatment: slug,
        hasSupportingPost: true,
      })
    }
  })
})

describe('treatment schema', () => {
  test('cross-references the sitewide graph and carries the credential', () => {
    for (const treatment of TREATMENTS) {
      const schema = generateTreatmentSchema(treatment)

      expect(schema['@id']).toBe(getTreatmentUrl(treatment.slug))
      expect(schema.isPartOf).toEqual({ '@id': `${CLINIC_WEBSITE}/#website` })
      expect(schema.performer.worksFor).toEqual({
        '@id': `${CLINIC_WEBSITE}/#organization`,
      })
      expect(schema.performer.hasCredential.identifier).toMatch(/^CRO-PR \d+$/)
      expect(schema.procedureType.length).toBeGreaterThan(0)
    }
  })
})
