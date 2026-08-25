import { describe, expect, test } from 'bun:test'
import {
  DEFAULT_OG_IMAGE,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOpenGraphMetadata,
  serializeSchema,
} from '@/app/src/lib/seo-schemas'
import { generateProfilePageSchema } from '@/app/src/lib/profile-schema'
import { generateBlogPostSchema, getAllPosts } from '@/app/src/lib/blog'
import { structuredData } from '@/app/src/lib/structured-data'
import {
  CLINIC_WEBSITE,
  DOCTOR_CRO,
  DOCTOR_NAME,
  PRACTITIONERS,
  PRIMARY_PRACTITIONER,
} from '@/app/src/lib/constants'

describe('social metadata generators', () => {
  test('falls back to the default card with its real dimensions', () => {
    const og = generateOpenGraphMetadata({
      title: 'T',
      description: 'D',
      url: CLINIC_WEBSITE,
    })

    expect(og?.images).toEqual([DEFAULT_OG_IMAGE])
  })

  // Inheriting the default card's size would declare the wrong aspect ratio.
  test('never invents dimensions for a custom image that lacks them', () => {
    const og = generateOpenGraphMetadata({
      title: 'T',
      description: 'D',
      url: CLINIC_WEBSITE,
      image: { url: '/images/posts/x.webp', alt: 'A' },
    })

    expect(og?.images).toEqual([{ url: '/images/posts/x.webp', alt: 'A' }])
  })

  test('keeps both dimensions when both are supplied', () => {
    const og = generateOpenGraphMetadata({
      title: 'T',
      description: 'D',
      url: CLINIC_WEBSITE,
      image: { url: '/i.webp', width: 800, height: 600, alt: 'A' },
    })

    expect(og?.images).toEqual([
      { url: '/i.webp', width: 800, height: 600, alt: 'A' },
    ])
  })
})

describe('schema generators', () => {
  test('breadcrumbs resolve to absolute URLs in order', () => {
    const schema = generateBreadcrumbSchema([
      { name: 'Início', path: '/' },
      { name: 'Blog', path: '/blog' },
    ])

    expect(schema.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Início', item: `${CLINIC_WEBSITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${CLINIC_WEBSITE}/blog` },
    ])
  })

  test('serialized JSON-LD cannot close the surrounding script tag', () => {
    expect(serializeSchema({ x: '</script>' })).not.toContain('</script>')
  })
})

describe('blog post schema', () => {
  const posts = getAllPosts()

  test('cross-references the sitewide entity graph by @id', () => {
    for (const post of posts) {
      const schema = generateBlogPostSchema(post)

      expect(schema.isPartOf).toEqual({ '@id': `${CLINIC_WEBSITE}/#website` })
      expect(schema.mainEntity.publisher).toEqual({
        '@id': `${CLINIC_WEBSITE}/#organization`,
      })
      expect(schema.mainEntity.author.hasCredential.identifier).toBe(
        post.authorProfile.cro
      )
    }
  })

  // Schema-only FAQs are a manipulation signal; the visible text is rendered
  // from the same frontmatter array that feeds the schema.
  test('FAQ schema is generated from the same source as the visible FAQ', () => {
    for (const post of posts) {
      if (!post.faqs?.length) continue

      const schema = generateFAQSchema(post.faqs)
      expect(schema.mainEntity.map((entry) => entry.name)).toEqual(
        post.faqs.map((faq) => faq.question)
      )
      expect(schema.mainEntity.map((entry) => entry.acceptedAnswer.text)).toEqual(
        post.faqs.map((faq) => faq.answer)
      )
    }
  })
})

// Search Console rejected the /sobre rich result for a missing `mainEntity`:
// ProfilePage requires exactly one subject, not a list of `about` entities.
describe('profile page schema', () => {
  const pageUrl = `${CLINIC_WEBSITE}/sobre`

  /** The CRO number off a Person node's registration credential. */
  const registrationOf = (person: { hasCredential: { credentialCategory: string }[] }) => {
    const credential = person.hasCredential.find(
      (entry) => entry.credentialCategory === 'Registro Profissional'
    )
    return credential && 'identifier' in credential ? credential.identifier : undefined
  }
  const schema = generateProfilePageSchema({
    url: pageUrl,
    name: 'Sobre a clínica',
    description: 'D',
  })

  // Named outright rather than by array position: asserting against
  // PRACTITIONERS[0] would pass for any ordering, including one that hands
  // the profile to the wrong person.
  test('names the clinic namesake as the single mainEntity', () => {
    expect(Array.isArray(schema.mainEntity)).toBe(false)
    expect(schema.mainEntity['@type']).toBe('Person')
    expect(schema.mainEntity.name).toBe(DOCTOR_NAME)
    expect(registrationOf(schema.mainEntity)).toBe(DOCTOR_CRO)
    expect(schema.mainEntity['@id']).toBe(`${pageUrl}#enor-massoni`)
  })

  test('keeps every other practitioner as a distinct Person node', () => {
    expect(schema.about?.map((person) => person['@id'])).toEqual(
      PRACTITIONERS.filter((p) => p !== PRIMARY_PRACTITIONER).map(
        (p) => `${pageUrl}#${p.id}`
      )
    )
  })

  // A shared sameAs would claim one practitioner is another person's profile,
  // which invites Google to merge or distrust both entities.
  test('no practitioner claims another practitioner\'s profile', () => {
    const claimed = PRACTITIONERS.flatMap((p) => p.sameAs ?? [])
    expect(claimed.length).toBe(new Set(claimed).size)
  })

  // Same hazard one level up: the sitewide graph's business nodes must not
  // re-claim a practitioner's personal profile.
  test('no sitewide node re-claims a practitioner profile', () => {
    const personal = new Set(PRACTITIONERS.flatMap((p) => p.sameAs ?? []))
    const claimedByGraph = structuredData['@graph'].flatMap((node) =>
      'sameAs' in node && Array.isArray(node.sameAs) ? node.sameAs : []
    )

    expect(claimedByGraph.filter((url) => personal.has(url as string))).toEqual([])
  })

  test('every practitioner cross-references the sitewide organization', () => {
    for (const person of [schema.mainEntity, ...(schema.about ?? [])]) {
      expect(person.worksFor).toEqual({ '@id': `${CLINIC_WEBSITE}/#organization` })
      expect(registrationOf(person)).toMatch(/^CRO-PR /)
    }
  })
})

// Google was showing Dr. Thiago's portrait as the homepage thumbnail because
// both practitioners appear on the page and nothing named a primary image.
describe('sitewide primary image', () => {
  const graph = structuredData['@graph'] as Record<string, unknown>[]
  const primaryImageId = `${CLINIC_WEBSITE}/#primaryimage`

  test('the declared primary image is the namesake practitioner', () => {
    const image = graph.find((node) => node['@id'] === primaryImageId)

    expect(image?.['@type']).toBe('ImageObject')
    expect(image?.contentUrl).toBe(`${CLINIC_WEBSITE}${PRIMARY_PRACTITIONER.photo}`)
  })

  test('the homepage names it as primaryImageOfPage', () => {
    const webPage = graph.find((node) => node['@type'] === 'WebPage')

    expect(webPage?.primaryImageOfPage).toEqual({ '@id': primaryImageId })
  })

  // A second portrait in the graph re-opens the choice we just made for Google.
  test('no node offers a competing image', () => {
    const images = graph
      .filter((node) => node['@id'] !== primaryImageId)
      .map((node) => node.image)
      .filter(Boolean)

    expect(images).toEqual(images.map(() => ({ '@id': primaryImageId })))
  })
})
