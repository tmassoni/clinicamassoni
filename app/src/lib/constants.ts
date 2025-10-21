// ==========================================
// DR. ENOR MASSONI - CONTACT CONSTANTS
// ==========================================
// TODO: Update all placeholder values with actual client information
// Search for "TODO_" to find all placeholders that need updating

// Domain
export const CLINIC_WEBSITE = 'https://enormassoni.com.br'

// Doctor Information
export const DOCTOR_NAME = 'Dr. Enor Massoni'
export const DOCTOR_CRO = 'CRO-PR 4982'
export const DOCTOR_SPECIALTY =
  'Implantes Dentários e Cirurgia Bucomaxilofacial'
export const DOCTOR_SPECIALTIES = [
  'Implantodontia',
  'Cirurgia Bucomaxilofacial',
  'Cirurgia Ortognática',
  'Traumatologia Maxilofacial',
]

// Website
export const WEBSITE_URL = 'https://enormassoni.com.br'

// Contact Information
// TODO_WHATSAPP: Replace with actual WhatsApp number (format: +5545XXXXXXXXX)
export const CONTACT_WHATSAPP_NUMBER = '+5545999999999'
export const CONTACT_WHATSAPP_FORMATTED = '(45) 99999-9999'

// TODO_PHONE: Replace with actual clinic phone number
export const CONTACT_PHONE_NUMBER = '(45) 3333-3333'
export const CONTACT_PHONE_FORMATTED = '(45) 3333-3333'

// TODO_EMAIL: Replace with actual clinic email
export const CONTACT_EMAIL = 'contato@enormassoni.com.br'

// Social Media
// TODO_INSTAGRAM: Replace with actual Instagram handle (without @)
export const SOCIAL_INSTAGRAM_HANDLE = 'dr.enormassoni'
export const SOCIAL_INSTAGRAM_URL = `https://www.instagram.com/${SOCIAL_INSTAGRAM_HANDLE}/`

// TODO_FACEBOOK: Replace with actual Facebook page URL if available
export const SOCIAL_FACEBOOK_URL = ''

// Clinic Information
export const CLINIC_NAME =
  'Dr. Enor Massoni - Implantes e Cirurgia Maxilofacial'

// TODO_ADDRESS: Replace with actual clinic address
export const CLINIC_ADDRESS_STREET = 'Rua Exemplo, 1234'
export const CLINIC_ADDRESS_NEIGHBORHOOD = 'Centro'
export const CLINIC_ADDRESS_CITY = 'Cascavel'
export const CLINIC_ADDRESS_STATE = 'PR'
export const CLINIC_ADDRESS_COUNTRY = 'Brasil'
export const CLINIC_ADDRESS_ZIP = '85800-000'

// Full address string
export const CLINIC_ADDRESS_FULL = `${CLINIC_ADDRESS_STREET}, ${CLINIC_ADDRESS_NEIGHBORHOOD}, ${CLINIC_ADDRESS_CITY} - ${CLINIC_ADDRESS_STATE}, ${CLINIC_ADDRESS_ZIP}`

// TODO_COORDINATES: Replace with actual clinic coordinates (get from Google Maps)
export const CLINIC_COORDINATES = {
  latitude: -24.9555, // Cascavel approximate - UPDATE WITH EXACT LOCATION
  longitude: -53.4552, // Cascavel approximate - UPDATE WITH EXACT LOCATION
}

// TODO_HOURS: Replace with actual opening hours
export const CLINIC_HOURS = 'Mo-Fr 08:00-18:00' // Schema.org format
export const CLINIC_HOURS_FORMATTED = {
  weekdays: 'Segunda a Sexta: 8h às 18h',
  saturday: 'Sábado: Fechado',
  sunday: 'Domingo: Fechado',
}

// CTA (Call-to-Action) Messages
export const CTA_PRIMARY = 'Agende sua consulta'
export const CTA_WHATSAPP = 'Fale conosco pelo WhatsApp'
export const CTA_PHONE = 'Ligue agora'

// SEO Keywords (for reference)
export const SEO_KEYWORDS = [
  'implantes dentários Cascavel',
  'dentista Cascavel',
  'cirurgia bucomaxilofacial Cascavel',
  'enor massoni',
  'implante dentário Cascavel PR',
  'cirurgião maxilofacial Cascavel',
  'dentista implantes Cascavel',
  'clínica odontológica Cascavel',
  'all on 4 Cascavel',
  'protocolo dentário Cascavel',
  'cirurgia ortognática Cascavel',
  'extração siso Cascavel',
  'CRO PR 4982',
  'dentista região oeste Paraná',
]

// Analytics IDs
// TODO_ANALYTICS: Replace with actual Google Analytics and GTM IDs from client
export const ANALYTICS_GA_ID = '' // Example: 'G-XXXXXXXXXX'
export const ANALYTICS_GTM_ID = '' // Example: 'GTM-XXXXXXX'

// Structured Data Helper
export const CLINIC_INFO = {
  name: CLINIC_NAME,
  doctor: DOCTOR_NAME,
  cro: DOCTOR_CRO,
  specialty: DOCTOR_SPECIALTY,
  specialties: DOCTOR_SPECIALTIES,
  address: {
    street: CLINIC_ADDRESS_STREET,
    neighborhood: CLINIC_ADDRESS_NEIGHBORHOOD,
    city: CLINIC_ADDRESS_CITY,
    state: CLINIC_ADDRESS_STATE,
    zip: CLINIC_ADDRESS_ZIP,
    country: CLINIC_ADDRESS_COUNTRY,
    full: CLINIC_ADDRESS_FULL,
  },
  contact: {
    phone: CONTACT_PHONE_NUMBER,
    whatsapp: CONTACT_WHATSAPP_NUMBER,
    email: CONTACT_EMAIL,
  },
  social: {
    instagram: SOCIAL_INSTAGRAM_URL,
    facebook: SOCIAL_FACEBOOK_URL,
  },
  coordinates: CLINIC_COORDINATES,
  hours: CLINIC_HOURS,
  website: WEBSITE_URL,
}
