import type { Metadata } from 'next'
import {
  CLINIC_WEBSITE,
  DOCTOR_NAME,
  PRACTITIONERS,
  type PostAuthor,
} from './constants'

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

/**
 * FAQPage plus a `speakable` hint. Voice surfaces read the question/answer
 * pair, which is the shape they want; the selectors match what PostFAQ renders.
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#perguntas-frequentes', '[data-speakable="faq"]'],
    },
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

/**
 * Person node for a practitioner: cross-references the sitewide organization
 * by @id and carries the full credential chain, as a YMYL site needs.
 */
function generatePersonSchema(practitioner: PostAuthor, pageUrl: string) {
  return {
    '@type': 'Person',
    '@id': `${pageUrl}#${practitioner.id}`,
    name: practitioner.name,
    jobTitle: practitioner.title,
    image: `${CLINIC_WEBSITE}${practitioner.photo}`,
    description: practitioner.bio[0],
    knowsAbout: practitioner.knowsAbout,
    worksFor: { '@id': `${CLINIC_WEBSITE}/#organization` },
    ...(practitioner.sameAs?.length ? { sameAs: practitioner.sameAs } : {}),
    alumniOf: practitioner.credentials
      .filter((credential) => credential.category !== 'Docência')
      .map((credential) => ({
        '@type': 'EducationalOrganization',
        name: credential.institution,
        ...(credential.institutionShort
          ? { alternateName: credential.institutionShort }
          : {}),
      })),
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Registro Profissional',
        identifier: practitioner.cro,
        recognizedBy: {
          '@type': 'Organization',
          name: 'Conselho Regional de Odontologia do Paraná',
          alternateName: 'CRO-PR',
          url: 'https://www.cropr.org.br',
        },
      },
      ...practitioner.credentials.map((credential) => ({
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: credential.category,
        name: credential.name,
        dateCreated: credential.year,
        recognizedBy: {
          '@type': 'Organization',
          name: credential.institution,
          ...(credential.institutionShort
            ? { alternateName: credential.institutionShort }
            : {}),
        },
      })),
    ],
  }
}

/**
 * ProfilePage carrying both Person nodes. Google requires a single
 * `mainEntity` — the subject of the profile — so the clinic's namesake takes
 * that slot and the remaining practitioners hang off `about`.
 */
export function generateProfilePageSchema({
  url: pageUrl,
  name,
  description,
}: {
  url: string
  name: string
  description: string
}) {
  const [primary, ...others] = PRACTITIONERS

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${pageUrl}#profilepage`,
    url: pageUrl,
    name,
    description,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': `${CLINIC_WEBSITE}/#website` },
    mainEntity: generatePersonSchema(primary, pageUrl),
    ...(others.length
      ? { about: others.map((practitioner) =>
          generatePersonSchema(practitioner, pageUrl)
        ) }
      : {}),
  }
}
