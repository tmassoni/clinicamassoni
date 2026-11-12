import { describe, expect, test } from 'bun:test'
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { getAllPosts, generateBlogPostSchema } from '@/app/src/lib/blog'
import { TREATMENTS } from '@/app/src/lib/treatments'
import { EDITORIAL_IMAGES, getTreatmentEditorialImage } from '@/app/src/lib/editorial-images'

describe('editorial illustrations', () => {
  test('every asset exists and declares its real dimensions', async () => {
    for (const image of Object.values(EDITORIAL_IMAGES)) {
      const file = path.join(process.cwd(), 'public', image.src)
      expect(fs.existsSync(file), image.src).toBe(true)
      const metadata = await sharp(file).metadata()
      expect({ width: metadata.width, height: metadata.height, format: metadata.format })
        .toEqual({ width: image.width, height: image.height, format: 'webp' })
      expect(image.kind).toBe('editorial-illustration')
    }
  })

  test('all existing treatments and posts without body photography have a cover', () => {
    for (const treatment of TREATMENTS) {
      expect(getTreatmentEditorialImage(treatment.slug), treatment.slug).not.toBeNull()
    }
    for (const post of getAllPosts()) {
      if (/!\[[^\]]*\]\(/.test(post.content)) {
        expect(post.editorialImage, post.slug).toBeNull()
        expect(post.cardImage, post.slug).not.toContain('/editorial/')
      } else {
        expect(post.editorialImage, post.slug).not.toBeNull()
        expect(post.cardImage, post.slug).toBe(post.editorialImage?.src)
      }
    }
  })

  test('editorial covers never become a clinical primary image or Article image', () => {
    const posts = getAllPosts()
    expect(posts.filter(post => post.editorialImage).length).toBeGreaterThan(0)
    expect(posts.filter(post => !post.editorialImage).length).toBeGreaterThan(0)
    for (const post of posts) {
      const schema = generateBlogPostSchema(post)
      if (post.editorialImage) {
        expect(schema).not.toHaveProperty('primaryImageOfPage')
        expect(schema.mainEntity).not.toHaveProperty('image')
      } else if (post.cardImage) {
        expect(schema).toHaveProperty('primaryImageOfPage')
        expect(schema.mainEntity).toHaveProperty('image')
      }
    }
  })
})
