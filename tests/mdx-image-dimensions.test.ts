import { describe, expect, test } from 'bun:test'
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import {
  MDX_IMAGE_DIMENSIONS,
  getMdxImageDimensions,
} from '@/app/src/lib/mdx-image-dimensions'
import { getAllPosts } from '@/app/src/lib/blog'

const IMAGE_PATTERN = /!\[[^\]]*\]\(([^)\s]+)\)/g

const referencedImages = [
  ...new Set(
    getAllPosts().flatMap((post) =>
      Array.from(post.content.matchAll(IMAGE_PATTERN), ([, src]) => src)
    )
  ),
].sort()

const resolvePublicPath = (src: string) =>
  path.join(process.cwd(), 'public', src.replace(/^\//, ''))

describe('mdx image dimensions', () => {
  test('posts reference at least one image', () => {
    expect(referencedImages.length).toBeGreaterThan(0)
  })

  test('every referenced image exists on disk', () => {
    for (const src of referencedImages) {
      expect(fs.existsSync(resolvePublicPath(src))).toBe(true)
    }
  })

  // Wrong or forgotten entries ship layout shift; catching them here is the
  // difference between a 90 and a 99 on Performance for a content site.
  test('resolved dimensions match the real files', async () => {
    for (const src of referencedImages) {
      const actual = await sharp(resolvePublicPath(src)).metadata()
      const resolved = getMdxImageDimensions(src)

      expect({ src, ...resolved }).toEqual({
        src,
        width: actual.width,
        height: actual.height,
      })
    }
  })

  test('the registry has no entries for images no post references', () => {
    const referenced = new Set(referencedImages)

    for (const src of Object.keys(MDX_IMAGE_DIMENSIONS)) {
      expect({ src, referenced: referenced.has(src) }).toEqual({
        src,
        referenced: true,
      })
    }
  })
})
