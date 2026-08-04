import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import {
  CLINIC_WEBSITE,
  DEFAULT_POST_AUTHOR_ID,
  POST_AUTHORS,
  type PostAuthor,
  type PostAuthorId,
} from './constants'
import type { FAQItem } from './seo-schemas'

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'posts')

const WORDS_PER_MINUTE = 200

export type PostIntent = 'awareness' | 'consideration' | 'decision'
export type PostAudience = 'patients' | 'referring-doctors' | 'general-public'

export interface BlogPostFrontmatter {
  title: string
  metaDescription: string
  slug: string
  publishDate: string
  lastModified: string
  primaryKeyword: string
  secondaryKeywords?: string[]
  targetAudience?: PostAudience
  intent?: PostIntent
  articleSection?: string
  author?: PostAuthorId
  featured?: boolean
  order?: number
  relatedPosts?: string[]
  faqs?: FAQItem[]
}

export interface BlogPost extends BlogPostFrontmatter {
  content: string
  /** Computed: ceil(words / 200). */
  readingTime: number
  /** Computed: the listing-card subtitle. */
  excerpt: string
  /** Computed: first markdown image in the body, reused as the card image. */
  cardImage: string | null
  cardImageAlt: string | null
  wordCount: number
  author: PostAuthorId
  authorProfile: PostAuthor
  url: string
}

const IMAGE_PATTERN = /!\[([^\]]*)\]\(([^)\s]+)\)/

/**
 * The card subtitle is the first non-heading paragraph. Authors control it by
 * writing one fully-italic hook line right after the frontmatter; emphasis
 * markers are stripped either way.
 */
function deriveExcerpt(content: string): string {
  const paragraphs = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)

  const firstProse = paragraphs.find(
    (block) =>
      !block.startsWith('#') &&
      !block.startsWith('!') &&
      !block.startsWith('>') &&
      !block.startsWith('---')
  )

  if (!firstProse) return ''

  return firstProse
    .replace(IMAGE_PATTERN, '')
    .replace(/^_([\s\S]*)_$/, '$1')
    .replace(/^\*([\s\S]*)\*$/, '$1')
    .replace(/[*_]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function deriveCardImage(content: string): { src: string | null; alt: string | null } {
  const match = content.match(IMAGE_PATTERN)
  if (!match) return { src: null, alt: null }
  return { src: match[2], alt: match[1] || null }
}

function countWords(content: string): number {
  return content
    .replace(/```[\s\S]*?```/g, '')
    .replace(IMAGE_PATTERN, '')
    .split(/\s+/)
    .filter(Boolean).length
}

function parsePost(fileName: string): BlogPost {
  const slugFromFile = fileName.replace(/\.md$/, '')
  const raw = fs.readFileSync(path.join(POSTS_DIRECTORY, fileName), 'utf8')
  const { data, content } = matter(raw)
  const frontmatter = data as BlogPostFrontmatter

  if (frontmatter.slug !== slugFromFile) {
    throw new Error(
      `Blog post filename must equal its slug: "${fileName}" declares slug "${frontmatter.slug}".`
    )
  }

  const authorId = frontmatter.author ?? DEFAULT_POST_AUTHOR_ID
  const authorProfile = POST_AUTHORS[authorId]

  if (!authorProfile) {
    throw new Error(
      `Blog post "${slugFromFile}" declares unknown author "${authorId}".`
    )
  }

  const wordCount = countWords(content)
  const { src, alt } = deriveCardImage(content)

  return {
    ...frontmatter,
    content,
    wordCount,
    readingTime: Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE)),
    excerpt: deriveExcerpt(content),
    cardImage: src,
    cardImageAlt: alt,
    author: authorId,
    authorProfile,
    url: `${CLINIC_WEBSITE}/blog/${frontmatter.slug}`,
  }
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) return []

  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((fileName) => fileName.endsWith('.md'))
    .map(parsePost)
    .sort((a, b) => {
      const orderDelta = (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)
      if (orderDelta !== 0) return orderDelta
      return b.publishDate.localeCompare(a.publishDate)
    })
}

export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find((post) => post.slug === slug) ?? null
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug)
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  if (!post.relatedPosts?.length) return []
  const bySlug = new Map(getAllPosts().map((candidate) => [candidate.slug, candidate]))

  return post.relatedPosts.flatMap((slug) => {
    const related = bySlug.get(slug)
    if (!related) {
      throw new Error(`Post "${post.slug}" links to unknown related post "${slug}".`)
    }
    return [related]
  })
}

/** Most recent `lastModified` across all posts — the honest date for /blog. */
export function getBlogLastModified(): Date {
  const posts = getAllPosts()
  if (posts.length === 0) return new Date()

  return posts.reduce((latest, post) => {
    const candidate = new Date(post.lastModified)
    return candidate > latest ? candidate : latest
  }, new Date(0))
}

/**
 * MedicalWebPage wrapping an Article, cross-referencing the sitewide entity
 * graph by @id so the practice and practitioner stay a single entity.
 */
export function generateBlogPostSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${post.url}#webpage`,
    url: post.url,
    name: post.title,
    description: post.metaDescription,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': `${CLINIC_WEBSITE}/#website` },
    about: {
      '@type': 'MedicalCondition',
      name: post.primaryKeyword,
      alternateName: post.secondaryKeywords ?? [],
    },
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: post.targetAudience ?? 'patients',
    },
    lastReviewed: post.lastModified,
    ...(post.cardImage ? { primaryImageOfPage: `${CLINIC_WEBSITE}${post.cardImage}` } : {}),
    mainEntity: {
      '@type': 'Article',
      '@id': `${post.url}#article`,
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.publishDate,
      dateModified: post.lastModified,
      wordCount: post.wordCount,
      timeRequired: `PT${post.readingTime}M`,
      keywords: [post.primaryKeyword, ...(post.secondaryKeywords ?? [])],
      articleSection: post.articleSection ?? 'Odontologia preventiva',
      inLanguage: 'pt-BR',
      ...(post.cardImage ? { image: `${CLINIC_WEBSITE}${post.cardImage}` } : {}),
      author: {
        '@type': 'Person',
        name: post.authorProfile.name,
        jobTitle: post.authorProfile.title,
        knowsAbout: post.authorProfile.knowsAbout,
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Registro Profissional',
          identifier: post.authorProfile.cro,
          recognizedBy: {
            '@type': 'Organization',
            name: 'Conselho Regional de Odontologia do Paraná',
            alternateName: 'CRO-PR',
            url: 'https://www.cropr.org.br',
          },
        },
      },
      publisher: { '@id': `${CLINIC_WEBSITE}/#organization` },
      mainEntityOfPage: { '@id': `${post.url}#webpage` },
    },
  }
}
