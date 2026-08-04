import type { Metadata } from 'next'
import { CLINIC_WEBSITE, DOCTOR_NAME } from './constants'

// Default social card shipped with the site, with its real intrinsic size.
export const DEFAULT_OG_IMAGE = {
  url: '/images/og-brand.png',
  width: 1200,
  height: 630,
  alt: `${DOCTOR_NAME} - Clínica Odontológica em Cascavel, PR`,
} as const

export interface BreadcrumbItem {
  name: string
  /** Absolute or root-relative path. Resolved against the canonical host. */
  path: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface SocialImage {
  url: string
  /** Both dimensions must be supplied together, or neither. */
  width?: number
  height?: number
  alt?: string
}

const toAbsoluteUrl = (path: string) =>
  path.startsWith('http') ? path : `${CLINIC_WEBSITE}${path}`

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  }
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Never invents dimensions. A custom image that arrives without an explicit
 * width/height pair is emitted without them rather than inheriting the default
 * card's size, which would tell crawlers the wrong aspect ratio.
 */
function resolveSocialImage(image?: SocialImage) {
  if (!image) return DEFAULT_OG_IMAGE

  const hasBothDimensions =
    typeof image.width === 'number' && typeof image.height === 'number'

  return {
    url: image.url,
    alt: image.alt,
    ...(hasBothDimensions
      ? { width: image.width, height: image.height }
      : {}),
  }
}

interface SocialMetadataInput {
  title: string
  description: string
  url: string
  image?: SocialImage
}

export function generateOpenGraphMetadata(
  input: SocialMetadataInput & {
    type?: 'website' | 'article'
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
  }
): Metadata['openGraph'] {
  const { type = 'website', publishedTime, modifiedTime, authors } = input

  return {
    type,
    locale: 'pt_BR',
    url: input.url,
    siteName: `${DOCTOR_NAME} - Dentista`,
    title: input.title,
    description: input.description,
    images: [resolveSocialImage(input.image)],
    ...(type === 'article'
      ? { publishedTime, modifiedTime, authors }
      : {}),
  }
}

export function generateTwitterMetadata(
  input: SocialMetadataInput
): Metadata['twitter'] {
  return {
    card: 'summary_large_image',
    title: input.title,
    description: input.description,
    images: [resolveSocialImage(input.image).url],
  }
}

/** Serializes JSON-LD for `dangerouslySetInnerHTML`, escaping `<` to close no tags. */
export function serializeSchema(schema: unknown): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c')
}
