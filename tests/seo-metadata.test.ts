import { describe, expect, test } from 'bun:test'
import {
  DEFAULT_OG_IMAGE,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOpenGraphMetadata,
  serializeSchema,
} from '@/app/src/lib/seo-schemas'
import { generateBlogPostSchema, getAllPosts } from '@/app/src/lib/blog'
import { CLINIC_WEBSITE } from '@/app/src/lib/constants'

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
