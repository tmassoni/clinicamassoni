// ==========================================
// DR. ENOR MASSONI - CONTACT CONSTANTS
// ==========================================

// Domain
export const CLINIC_WEBSITE = "https://www.clinicamassoni.com.br";

// Doctor Information
export const DOCTOR_NAME = "Dr. Enor Massoni";
export const DOCTOR_CRO = "CRO-PR 4982";
export const DOCTOR_SPECIALTY = "Cirurgia e Traumatologia Buco-Maxilo-Facial";
export const DOCTOR_SPECIALTIES = [
  "Cirurgia e Traumatologia Buco-Maxilo-Facial",
  "Cirurgia Ortognática",
  "Implantes Dentários (34 anos de experiência)",
];

// Dr. Thiago Massoni Information
export const DOCTOR_THIAGO_NAME = "Dr. Thiago Massoni";
export const DOCTOR_THIAGO_CRO = "CRO-PR 35209";
export const DOCTOR_THIAGO_TITLE = "Cirurgião Dentista";
export const DOCTOR_THIAGO_SPECIALTIES = [
  "Especialista em Dentística Restauradora",
  "Especializando em Prótese Dentária",
];

// Website
export const WEBSITE_URL = "https://www.clinicamassoni.com.br";

// Contact Information
export const CONTACT_WHATSAPP_FORMATTED = "(45) 99149-2390";
export const CONTACT_WHATSAPP_NUMBER = "5545991492390";
export const CONTACT_WHATSAPP_DEFAULT_TEXT =
  "Olá! Encontrei vocês pelo site e gostaria de agendar uma consulta.";
export const CONTACT_WHATSAPP_URL = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(CONTACT_WHATSAPP_DEFAULT_TEXT)}`;

// Clinic Phone Number
export const CONTACT_PHONE_NUMBER = "(45) 3223-3234";
export const CONTACT_PHONE_FORMATTED = "(45) 3223-3234";

// Clinic Email
export const CONTACT_EMAIL = "clinica_massoni@hotmail.com";

// Social Media
export const SOCIAL_INSTAGRAM_HANDLE = "enormassoni";
export const SOCIAL_INSTAGRAM_URL = `https://www.instagram.com/${SOCIAL_INSTAGRAM_HANDLE}/`;
export const SOCIAL_LINKEDIN_URL =
  "https://www.linkedin.com/in/dr-enor-massoni-a74442233/";

// Clinic Information
export const CLINIC_NAME =
  "Dr. Enor Massoni - Implantes e Cirurgia Maxilofacial";

// Clinic Address
export const CLINIC_ADDRESS_STREET =
  "Rua Paraná, 3033, Centro Empresarial Formato, 6º Andar";
export const CLINIC_ADDRESS_NEIGHBORHOOD = "Centro";
export const CLINIC_ADDRESS_CITY = "Cascavel";
export const CLINIC_ADDRESS_STATE = "PR";
export const CLINIC_ADDRESS_COUNTRY = "Brasil";
export const CLINIC_ADDRESS_ZIP = "85812-011";

// Full address string
export const CLINIC_ADDRESS_FULL = `${CLINIC_ADDRESS_STREET}, ${CLINIC_ADDRESS_NEIGHBORHOOD}, ${CLINIC_ADDRESS_CITY} - ${CLINIC_ADDRESS_STATE}, ${CLINIC_ADDRESS_ZIP}`;

// GPS Coordinates for Rua Paraná 3033, Centro Empresarial Formato
// Extracted from official Google Maps embed
export const CLINIC_COORDINATES = {
  latitude: -24.95439597786806,
  longitude: -53.46219242377044,
};

// Google Maps Embed URL (shows business name and address)
export const CLINIC_MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.344357826297!2d-53.46219242377044!3d-24.95439597786806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f3d4120d037c41%3A0xf1d730448eec351e!2sCentro%20Empresarial%20Formato!5e0!3m2!1spt-BR!2sus!4v1761159734339!5m2!1spt-BR!2sus";

// Business Hours
export const CLINIC_HOURS = "Mo-Fr 08:00-12:00,13:30-18:00"; // Schema.org format
export const CLINIC_HOURS_FORMATTED = {
  weekdays: "Segunda a Sexta: 8h às 12h / 13h30 às 18h",
  saturday: "Sábado: Fechado",
  sunday: "Domingo: Fechado",
};

// CTA (Call-to-Action) Messages
export const CTA_PRIMARY = "Agende sua consulta";
export const CTA_WHATSAPP = "Fale conosco pelo WhatsApp";
export const CTA_PHONE = "Ligue agora";

// SEO Keywords (for reference)
export const SEO_KEYWORDS = [
  "dentista",
  "cascavel",
  "dentista cascavel",
  "dentista em Cascavel",
  "implantes dentários Cascavel",
  "dentista Cascavel",
  "cirurgia bucomaxilofacial Cascavel",
  "enor massoni",
  "implante dentário Cascavel PR",
  "cirurgião maxilofacial Cascavel",
  "dentista implantes Cascavel",
  "clínica odontológica Cascavel",
  "all on 4 Cascavel",
  "protocolo dentário Cascavel",
  "cirurgia ortognática Cascavel",
  "extração siso Cascavel",
  "CRO PR 4982",
  "cirurgia plástica periodontal Cascavel",
  "recessão gengival Cascavel",
  "recobrimento de raízes Cascavel",
  "enxerto ósseo Cascavel",
  "41 anos de formado",
  "41 anos experiência Cascavel",
  "academia brasileira osseointegração",
  "dentista região oeste Paraná",
];

// ==========================================
// BLOG / EDITORIAL
// ==========================================

// Educational disclaimer appended to every article.
// TODO_COMPLIANCE: confirm exact wording against the CFO advertising rules once
// `/clinic-compliance-research` has produced docs/compliance-guidelines.md.
export const MEDICAL_DISCLAIMER =
  "Este conteúdo tem caráter exclusivamente educativo e não substitui uma consulta odontológica. O diagnóstico e a indicação de tratamento dependem de avaliação clínica individual.";

export interface PostAuthor {
  name: string;
  cro: string;
  title: string;
  specialties: string[];
  knowsAbout: string[];
}

// Authors a post can be attributed to via the `author` frontmatter key.
export const POST_AUTHORS = {
  enor: {
    name: DOCTOR_NAME,
    cro: DOCTOR_CRO,
    title: `Cirurgião Dentista - ${DOCTOR_SPECIALTY}`,
    specialties: DOCTOR_SPECIALTIES,
    knowsAbout: [
      "Implantes dentários",
      "Cirurgia buco-maxilo-facial",
      "Cirurgia plástica periodontal",
    ],
  },
  thiago: {
    name: DOCTOR_THIAGO_NAME,
    cro: DOCTOR_THIAGO_CRO,
    title: DOCTOR_THIAGO_TITLE,
    specialties: DOCTOR_THIAGO_SPECIALTIES,
    knowsAbout: [
      "Dentística restauradora",
      "Prótese dentária",
      "Odontologia preventiva",
    ],
  },
} as const satisfies Record<string, PostAuthor>;

export type PostAuthorId = keyof typeof POST_AUTHORS;

export const DEFAULT_POST_AUTHOR_ID: PostAuthorId = "enor";

// Analytics IDs
// TODO_ANALYTICS: Replace with actual Google Analytics and GTM IDs from client - this should actually be in .env
export const ANALYTICS_GA_ID = ""; // Example: 'G-XXXXXXXXXX'
export const ANALYTICS_GTM_ID = ""; // Example: 'GTM-XXXXXXX'

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
    whatsappUrl: CONTACT_WHATSAPP_URL,
    email: CONTACT_EMAIL,
  },
  social: {
    instagram: SOCIAL_INSTAGRAM_URL,
    linkedin: SOCIAL_LINKEDIN_URL,
  },
  coordinates: CLINIC_COORDINATES,
  hours: CLINIC_HOURS,
  website: WEBSITE_URL,
};
