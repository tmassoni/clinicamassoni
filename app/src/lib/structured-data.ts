import { CLINIC_INFO } from './constants'

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    // Dentist
    {
      '@type': 'Dentist',
      '@id': `${CLINIC_INFO.website}/#dentist`,
      name: CLINIC_INFO.doctor,
      jobTitle: `Cirurgião Dentista - ${CLINIC_INFO.specialty}`,
      description: `Dentista em ${CLINIC_INFO.address.city}, ${CLINIC_INFO.address.state}, especialista em ${CLINIC_INFO.specialty}.`,
      image: '/images/og-v2.png',
      url: CLINIC_INFO.website,
      sameAs: [CLINIC_INFO.social.instagram, CLINIC_INFO.social.linkedin].filter(Boolean),
      knowsAbout: [
        'Implantes dentários',
        'Cirurgia buco-maxilo-facial',
        'Cirurgia plástica periodontal',
      ],

      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Registro Profissional',
          identifier: CLINIC_INFO.cro,
          recognizedBy: {
            '@type': 'Organization',
            name: 'Conselho Regional de Odontologia do Paraná',
            alternateName: 'CRO-PR',
            url: 'https://www.cropr.org.br',
          },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Graduação',
          name: 'Odontologia',
          educationalLevel: 'Graduação',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Universidade Federal de Pelotas',
            alternateName: 'UFPEL',
          },
          dateCreated: '1984',
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Especialização',
          name: 'Cirurgia e Traumatologia Bucomaxilofacial',
          educationalLevel: 'Especialização',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Universidade de São Paulo',
            alternateName: 'FOB-USP',
            location: 'Bauru, SP',
          },
          dateCreated: '1993',
        },
      ],

      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'Universidade Estadual do Oeste do Paraná',
          alternateName: 'Unioeste',
          description: 'Ex-professor de Cirurgia do curso de Odontologia',
        },
      ],

      medicalSpecialty: CLINIC_INFO.specialties,

      telephone: CLINIC_INFO.contact.phone,
      email: CLINIC_INFO.contact.email,

      address: {
        '@type': 'PostalAddress',
        streetAddress: CLINIC_INFO.address.street,
        addressLocality: CLINIC_INFO.address.city,
        addressRegion: CLINIC_INFO.address.state,
        addressCountry: CLINIC_INFO.address.country,
        postalCode: CLINIC_INFO.address.zip,
      },
    },

    // Medical Business
    {
      '@type': 'MedicalBusiness',
      '@id': `${CLINIC_INFO.website}/#organization`,
      name: CLINIC_INFO.name,
      url: CLINIC_INFO.website,
      description: `Clínica odontológica e dentista em ${CLINIC_INFO.address.city}, ${CLINIC_INFO.address.state}, especializada em ${CLINIC_INFO.specialty.toLowerCase()}.`,

      address: {
        '@type': 'PostalAddress',
        streetAddress: CLINIC_INFO.address.street,
        addressLocality: CLINIC_INFO.address.city,
        addressRegion: CLINIC_INFO.address.state,
        addressCountry: CLINIC_INFO.address.country,
        postalCode: CLINIC_INFO.address.zip,
      },

      geo: {
        '@type': 'GeoCoordinates',
        latitude: CLINIC_INFO.coordinates.latitude,
        longitude: CLINIC_INFO.coordinates.longitude,
      },

      telephone: CLINIC_INFO.contact.phone,
      email: CLINIC_INFO.contact.email,
      priceRange: '$$',
      openingHours: CLINIC_INFO.hours,

      areaServed: {
        '@type': 'City',
        name: CLINIC_INFO.address.city,
        addressRegion: CLINIC_INFO.address.state,
        addressCountry: CLINIC_INFO.address.country,
      },
    },

    // Medical Procedure
    {
      '@type': 'MedicalProcedure',
      '@id': `${CLINIC_INFO.website}/#services`,
      name: CLINIC_INFO.specialty,
      description:
        'Tratamento especializado para reabilitação oral e cirurgias faciais',
      procedureType: [
        'Implantes dentários unitários',
        'Implantes dentários múltiplos',
        'Protocolo sobre implantes (All-on-4)',
        'Implantes imediatos em área estética',
        'Enxerto ósseo com materiais sintéticos e biológicos',
        'Cirurgias guiadas com tecnologia 3D',
        'Cirurgia plástica periodontal',
        'Recobrimento de recessões gengivais',
        'Aumento de coroa clínica',
        'Gengivoplastia estética',
        'Cirurgias de cistos e tumores bucomaxilofaciais',
        'Extração de sisos e dentes retidos',
        'Cirurgia ortognática',
        'Traumatismo e fraturas faciais',
        'Frenectomias',
        'Biópsias orais',
      ],
      performer: {
        '@id': `${CLINIC_INFO.website}/#dentist`,
      },
    },

    // Website
    {
      '@type': 'WebSite',
      '@id': `${CLINIC_INFO.website}/#website`,
      url: CLINIC_INFO.website,
      name: `${CLINIC_INFO.doctor} - Dentista em ${CLINIC_INFO.address.city}`,
      description: `Site oficial do ${CLINIC_INFO.doctor}, dentista em ${CLINIC_INFO.address.city}, ${CLINIC_INFO.address.state}, especialista em ${CLINIC_INFO.specialty.toLowerCase()}.`,
      publisher: {
        '@id': `${CLINIC_INFO.website}/#organization`,
      },
      inLanguage: 'pt-BR',
    },

    // Local Business
    {
      '@type': 'LocalBusiness',
      '@id': `${CLINIC_INFO.website}/#localbusiness`,
      name: CLINIC_INFO.name,
      description: `Atendimento odontológico em ${CLINIC_INFO.address.city}, ${CLINIC_INFO.address.state}, com foco em implantes dentários e cirurgia buco-maxilo-facial.`,
      image: '/images/og-v2.png',
      url: CLINIC_INFO.website,

      address: {
        '@type': 'PostalAddress',
        streetAddress: CLINIC_INFO.address.street,
        addressLocality: CLINIC_INFO.address.city,
        addressRegion: CLINIC_INFO.address.state,
        addressCountry: CLINIC_INFO.address.country,
        postalCode: CLINIC_INFO.address.zip,
      },

      geo: {
        '@type': 'GeoCoordinates',
        latitude: CLINIC_INFO.coordinates.latitude,
        longitude: CLINIC_INFO.coordinates.longitude,
      },

      telephone: CLINIC_INFO.contact.phone,
      priceRange: '$$',
      openingHours: CLINIC_INFO.hours,
    },
  ],
}

export function getStructuredData(): string {
  return JSON.stringify(structuredData).replace(/</g, '\\u003c')
}
