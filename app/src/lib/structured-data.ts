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
      description: `Especialista em ${CLINIC_INFO.specialty} em ${CLINIC_INFO.address.city}, ${CLINIC_INFO.address.state}.`,
      image: '/images/og.png',
      url: CLINIC_INFO.website,

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
      description: `Clínica odontológica especializada em ${CLINIC_INFO.specialty.toLowerCase()} em ${CLINIC_INFO.address.city}, ${CLINIC_INFO.address.state}.`,

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
        'Implantes dentários',
        'Protocolo sobre implantes (All-on-4)',
        'Enxerto ósseo',
        'Levantamento de seio maxilar',
        'Cirurgia ortognática',
        'Tratamento de ATM',
        'Traumatismo facial',
        'Extração de sisos',
        'Frenectomia',
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
      name: `${CLINIC_INFO.doctor} - Dentista ${CLINIC_INFO.address.city}`,
      description: `Site oficial do ${CLINIC_INFO.doctor}, especialista em ${CLINIC_INFO.specialty.toLowerCase()} em ${CLINIC_INFO.address.city}, ${CLINIC_INFO.address.state}.`,
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
      description: `Atendimento odontológico especializado em ambiente moderno em ${CLINIC_INFO.address.city}, ${CLINIC_INFO.address.state}.`,
      image: '/images/og.png',
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
  return JSON.stringify(structuredData)
}
