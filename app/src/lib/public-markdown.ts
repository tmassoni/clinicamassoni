import {
  CLINIC_ADDRESS_CITY,
  CLINIC_ADDRESS_FULL,
  CLINIC_HOURS_FORMATTED,
  CLINIC_WEBSITE,
  CONTACT_EMAIL,
  CONTACT_PHONE_FORMATTED,
  CONTACT_WHATSAPP_FORMATTED,
  DOCTOR_CRO,
  DOCTOR_NAME,
  DOCTOR_SPECIALTY,
  DOCTOR_THIAGO_CRO,
  DOCTOR_THIAGO_NAME,
  MEDICAL_DISCLAIMER,
} from '@/app/src/lib/constants'
import { HOME_FAQS } from '@/app/src/lib/home-faq'

export const MARKDOWN_CONTENT_TYPE = 'text/markdown; charset=utf-8'

const faq = HOME_FAQS.map(({ question, answer }) => `### ${question}\n\n${answer}`).join('\n\n')

export const homeMarkdown = `# Clínica Massoni — Dentista em ${CLINIC_ADDRESS_CITY}

A Clínica Massoni oferece atendimento odontológico em Cascavel, Paraná. ${DOCTOR_NAME} (${DOCTOR_CRO}) atua em ${DOCTOR_SPECIALTY} e implantes dentários. ${DOCTOR_THIAGO_NAME} (${DOCTOR_THIAGO_CRO}) atua em dentística restauradora e estética dental.

## Tratamentos

- [Implantes dentários](${CLINIC_WEBSITE}/tratamentos/implantes-dentarios)
- [Cirurgia plástica periodontal](${CLINIC_WEBSITE}/tratamentos/cirurgia-plastica-periodontal)
- [Cirurgia bucomaxilofacial](${CLINIC_WEBSITE}/tratamentos/cirurgia-bucomaxilofacial)
- [Todos os tratamentos](${CLINIC_WEBSITE}/tratamentos)

## Contato e atendimento

- Endereço: ${CLINIC_ADDRESS_FULL}.
- Horários: ${CLINIC_HOURS_FORMATTED.weekdays}. ${CLINIC_HOURS_FORMATTED.saturday}. ${CLINIC_HOURS_FORMATTED.sunday}.
- WhatsApp: ${CONTACT_WHATSAPP_FORMATTED}.
- Telefone: ${CONTACT_PHONE_FORMATTED}.
- E-mail: ${CONTACT_EMAIL}.
- [Canais oficiais de contato](${CLINIC_WEBSITE}/contact)
- [Mapa e orientações para a visita](${CLINIC_WEBSITE}/locais-de-atendimento/cascavel)

## Perguntas frequentes

${faq}

## Mais informações

- [Formação e registro dos profissionais](${CLINIC_WEBSITE}/sobre)
- [Artigos educativos](${CLINIC_WEBSITE}/blog)
- [Política de privacidade](${CLINIC_WEBSITE}/politica-de-privacidade)
- [Índice para agentes](${CLINIC_WEBSITE}/llms.txt)

> ${MEDICAL_DISCLAIMER}
`

export const notFoundMarkdown = `# 404 — Página não encontrada

A página solicitada não existe ou foi movida. Consulte um dos links abaixo para continuar.

- [Página inicial](${CLINIC_WEBSITE}/)
- [Mapa do site](${CLINIC_WEBSITE}/sitemap.xml)
- [Índice para agentes](${CLINIC_WEBSITE}/llms.txt)
`
