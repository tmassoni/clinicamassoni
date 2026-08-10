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

export interface PractitionerCredential {
  /** e.g. "Graduação", "Especialização" */
  category: string;
  name: string;
  institution: string;
  institutionShort?: string;
  location?: string;
  year: string;
}

export interface PostAuthor {
  name: string;
  cro: string;
  title: string;
  specialties: string[];
  knowsAbout: string[];
  /** Slug for /sobre anchors and the Person node's @id. */
  id: string;
  photo: string;
  /** Feeds the ProfilePage schema and the /sobre page. */
  credentials: PractitionerCredential[];
  /** Short, factual biography paragraphs. No superlatives. */
  bio: string[];
  procedures: string[];
}

// Authors a post can be attributed to via the `author` frontmatter key, and
// the source for /sobre. Every fact here is sourced from the landing page copy
// or structured-data.ts — none is inferred.
export const POST_AUTHORS = {
  enor: {
    id: "enor-massoni",
    name: DOCTOR_NAME,
    cro: DOCTOR_CRO,
    title: `Cirurgião Dentista - ${DOCTOR_SPECIALTY}`,
    specialties: DOCTOR_SPECIALTIES,
    photo: "/images/team/enor.webp",
    knowsAbout: [
      "Implantes dentários",
      "Cirurgia buco-maxilo-facial",
      "Cirurgia plástica periodontal",
    ],
    credentials: [
      {
        category: "Graduação",
        name: "Odontologia",
        institution: "Universidade Federal de Pelotas",
        institutionShort: "UFPEL",
        year: "1984",
      },
      {
        category: "Especialização",
        name: "Cirurgia e Traumatologia Bucomaxilofacial",
        institution: "Faculdade de Odontologia de Bauru, Universidade de São Paulo",
        institutionShort: "FOB-USP",
        location: "Bauru, SP",
        year: "1993",
      },
      {
        category: "Docência",
        name: "Professor de Cirurgia, curso de Odontologia",
        institution: "Universidade Estadual do Oeste do Paraná",
        institutionShort: "Unioeste",
        year: "anterior",
      },
    ],
    bio: [
      "Formado em Odontologia pela UFPEL em 1984 e especializado em Cirurgia e Traumatologia Bucomaxilofacial pela FOB-USP em 1993, tem seu foco principal de atuação na cirurgia oral.",
      "Atuou como professor de cirurgia na faculdade de Odontologia da Unioeste e em cursos de especialização da ABO. Está no universo dos implantes dentários desde o início da implantodontia no Brasil, no começo dos anos 90, acompanhando as evoluções tecnológicas da especialidade desde então.",
      "A humanização do atendimento é o pilar da clínica: ambiente acolhedor, escuta atenta, acompanhamento no pré e no pós-cirúrgico, e rigor em biossegurança.",
    ],
    procedures: [
      "Implantes dentários unitários e múltiplos",
      "Protocolo sobre implantes (All-on-4)",
      "Enxerto ósseo e levantamento de seio maxilar",
      "Cirurgias guiadas com tecnologia 3D",
      "Cirurgia plástica periodontal",
      "Extração de sisos e dentes retidos",
      "Cirurgia ortognática",
      "Cirurgias de cistos e lesões bucomaxilofaciais",
    ],
  },
  thiago: {
    id: "thiago-massoni",
    name: DOCTOR_THIAGO_NAME,
    cro: DOCTOR_THIAGO_CRO,
    title: DOCTOR_THIAGO_TITLE,
    specialties: DOCTOR_THIAGO_SPECIALTIES,
    photo: "/images/team/thiago.webp",
    knowsAbout: [
      "Dentística restauradora",
      "Prótese dentária",
      "Odontologia preventiva",
    ],
    credentials: [
      {
        category: "Graduação",
        name: "Odontologia",
        institution: "Pontifícia Universidade Católica do Paraná",
        institutionShort: "PUCPR",
        year: "2018-2022",
      },
      {
        category: "Especialização",
        name: "Dentística Restauradora",
        institution: "Zenith",
        year: "2023-2025",
      },
      {
        category: "Especialização em curso",
        name: "Prótese Dentária",
        institution: "Pontifícia Universidade Católica do Paraná",
        institutionShort: "PUCPR",
        year: "2025-2027",
      },
    ],
    bio: [
      "Graduado em Odontologia pela PUCPR entre 2018 e 2022, e especialista em Dentística Restauradora pela Zenith entre 2023 e 2025. Cursa atualmente especialização em Prótese Dentária pela PUCPR.",
      "Atua em odontologia preventiva e restauradora, com foco em preservar estrutura dental — tratar removendo o mínimo necessário de tecido sadio.",
    ],
    procedures: [
      "Restaurações diretas e indiretas em resina composta",
      "Facetas em resina composta e porcelana",
      "Restaurações em porcelana",
      "Próteses unitárias e de múltiplos elementos",
      "Recontorno estético e estética dental",
      "Profilaxia e raspagens periodontais",
    ],
  },
} as const satisfies Record<string, PostAuthor>;

/*
 * Explicitly typed rather than inferred: `as const` above narrows each
 * credential to a literal whose optional keys (institutionShort, location)
 * don't exist on every member, which breaks property access at the consumer.
 */
export const PRACTITIONERS: PostAuthor[] = [POST_AUTHORS.enor, POST_AUTHORS.thiago];

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
