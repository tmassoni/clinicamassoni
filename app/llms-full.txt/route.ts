import { getAllPosts } from '@/app/src/lib/blog'
import { TREATMENTS_BY_ORDER, getTreatmentUrl } from '@/app/src/lib/treatments'
import {
  CLINIC_ADDRESS_CITY,
  CLINIC_ADDRESS_FULL,
  CLINIC_ADDRESS_STATE,
  CLINIC_HOURS_FORMATTED,
  CLINIC_WEBSITE,
  CONTACT_PHONE_NUMBER,
  CONTACT_WHATSAPP_FORMATTED,
  DOCTOR_NAME,
  MEDICAL_DISCLAIMER,
  PRACTITIONERS,
} from '@/app/src/lib/constants'

/**
 * Full text of every treatment page and blog post in one fetch, for answer
 * engines that retrieve a single file rather than crawling. `llms.txt` remains
 * the curated index; this is the corpus behind it.
 *
 * Statically generated — it must never become a runtime cost.
 */
export const dynamic = 'force-static'

function buildTreatmentSection(): string {
  return TREATMENTS_BY_ORDER.map((treatment) => {
    const sections = treatment.sections
      .map((section) => {
        const bullets = section.bullets
          ?.map((bullet) => `- ${bullet.term ? `${bullet.term}: ` : ''}${bullet.text}`)
          .join('\n')
        return [`### ${section.heading}`, section.paragraphs.join('\n\n'), bullets]
          .filter(Boolean)
          .join('\n\n')
      })
      .join('\n\n')

    const notIndicated = treatment.notIndicated
      .map((bullet) => `- ${bullet.term ? `${bullet.term}: ` : ''}${bullet.text}`)
      .join('\n')

    const faqs = treatment.faqs
      .map((faq) => `**${faq.question}**\n${faq.answer}`)
      .join('\n\n')

    return [
      `## ${treatment.name}`,
      `URL: ${getTreatmentUrl(treatment.slug)}`,
      `Categorias: ${treatment.categories.join(', ')}`,
      treatment.definition,
      sections,
      `### Quando este tratamento não é indicado\n\n${notIndicated}`,
      `### Perguntas frequentes\n\n${faqs}`,
    ].join('\n\n')
  }).join('\n\n---\n\n')
}

function buildPostSection(): string {
  return getAllPosts()
    .map((post) => {
      const faqs = post.faqs?.length
        ? `### Perguntas frequentes\n\n${post.faqs
            .map((faq) => `**${faq.question}**\n${faq.answer}`)
            .join('\n\n')}`
        : ''

      // Strip image syntax; the alt text carries no standalone meaning here.
      const body = post.content.replace(/!\[[^\]]*\]\([^)]*\)\n?/g, '').trim()

      return [
        `## ${post.title}`,
        `URL: ${post.url}`,
        `Autor: ${post.authorProfile.name}, ${post.authorProfile.cro} — ${post.authorProfile.title}`,
        `Publicado: ${post.publishDate} · Atualizado: ${post.lastModified}`,
        `Palavra-chave principal: ${post.primaryKeyword}`,
        body,
        faqs,
      ]
        .filter(Boolean)
        .join('\n\n')
    })
    .join('\n\n---\n\n')
}

export function GET() {
  const practitioners = PRACTITIONERS.map(
    (practitioner) =>
      `- ${practitioner.name}, ${practitioner.cro} — ${practitioner.title}. ${practitioner.bio[0]}`
  ).join('\n')

  const body = `# ${DOCTOR_NAME} — full content corpus

> Complete text of every treatment page and article on
> ${CLINIC_WEBSITE}, in one file, for answer engines that fetch a single
> document rather than crawling. The curated index is at
> ${CLINIC_WEBSITE}/llms.txt.
>
> This is a dental practice in ${CLINIC_ADDRESS_CITY}, ${CLINIC_ADDRESS_STATE}, Brazil.
> All content is in Brazilian Portuguese and is educational.
>
> ${MEDICAL_DISCLAIMER}

## Practice details

- Endereço: ${CLINIC_ADDRESS_FULL}
- WhatsApp: ${CONTACT_WHATSAPP_FORMATTED}
- Telefone: ${CONTACT_PHONE_NUMBER}
- Horário: ${CLINIC_HOURS_FORMATTED.weekdays}. ${CLINIC_HOURS_FORMATTED.saturday}. ${CLINIC_HOURS_FORMATTED.sunday}

## Practitioners

${practitioners}

---

# Tratamentos

${buildTreatmentSection()}

---

# Artigos

${buildPostSection()}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
