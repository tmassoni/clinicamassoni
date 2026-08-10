import { describe, expect, test } from 'bun:test'
import fs from 'node:fs'
import path from 'node:path'
import sitemap from '@/app/sitemap'
import { getAllPosts } from '@/app/src/lib/blog'
import { CLINIC_WEBSITE } from '@/app/src/lib/constants'

const llmsTxt = fs.readFileSync(
  path.join(process.cwd(), 'public', 'llms.txt'),
  'utf8'
)

const postSlugs = getAllPosts()
  .map((post) => post.slug)
  .sort()

describe('content discovery', () => {
  test('there is at least one post to discover', () => {
    expect(postSlugs.length).toBeGreaterThan(0)
  })

  test('every post is in the sitemap', () => {
    const sitemapUrls = new Set(sitemap().map((entry) => entry.url))

    for (const slug of postSlugs) {
      expect(sitemapUrls.has(`${CLINIC_WEBSITE}/blog/${slug}`)).toBe(true)
    }
  })

  test('the sitemap includes the blog index', () => {
    const sitemapUrls = new Set(sitemap().map((entry) => entry.url))
    expect(sitemapUrls.has(`${CLINIC_WEBSITE}/blog`)).toBe(true)
  })

  // Set *equality*, not containment: this catches the forgotten new post and
  // the stale entry for a deleted one. A lying llms.txt is worse than none.
  test('llms.txt lists exactly the posts that exist on disk', () => {
    const llmsPostSlugs = [
      ...new Set(
        Array.from(llmsTxt.matchAll(/\/blog\/([a-z0-9-]+)/g), ([, slug]) => slug)
      ),
    ].sort()

    expect(llmsPostSlugs).toEqual(postSlugs)
  })

  test('post filenames equal their declared slug', () => {
    const fileSlugs = fs
      .readdirSync(path.join(process.cwd(), 'content', 'posts'))
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => fileName.replace(/\.md$/, ''))
      .sort()

    expect(fileSlugs).toEqual(postSlugs)
  })

  test('every post has the frontmatter the schema layer requires', () => {
    for (const post of getAllPosts()) {
      expect(post.title).toBeTruthy()
      expect(post.metaDescription.length).toBeLessThanOrEqual(160)
      expect(post.publishDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(post.lastModified).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(post.primaryKeyword).toBeTruthy()
      expect(post.excerpt).toBeTruthy()
    }
  })
})
