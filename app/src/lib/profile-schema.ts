import {
  CLINIC_WEBSITE,
  PRACTITIONERS,
  PRIMARY_PRACTITIONER,
  type PostAuthor,
} from './constants'

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
  const others = PRACTITIONERS.filter(
    (practitioner) => practitioner !== PRIMARY_PRACTITIONER
  )

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${pageUrl}#profilepage`,
    url: pageUrl,
    name,
    description,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': `${CLINIC_WEBSITE}/#website` },
    mainEntity: generatePersonSchema(PRIMARY_PRACTITIONER, pageUrl),
    ...(others.length
      ? { about: others.map((practitioner) =>
          generatePersonSchema(practitioner, pageUrl)
        ) }
      : {}),
  }
}
