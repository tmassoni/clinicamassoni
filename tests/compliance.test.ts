import { describe, expect, test } from 'bun:test'
import fs from 'node:fs'
import path from 'node:path'
import { getAllPosts } from '../app/src/lib/blog'
import { TREATMENTS } from '../app/src/lib/treatments'
import { MEDICAL_DISCLAIMER, POST_AUTHORS } from '../app/src/lib/constants'

/*
 * Guards the rules in docs/compliance-guidelines.md §8 that can be checked
 * mechanically.
 *
 * This exists because the remediation pass was expensive and entirely
 * invisible afterwards: a procedure-in-progress image was removed (CFO-196/2019
 * art. 5º calls that infraction "de manifesta gravidade"), and eleven captions
 * were rewritten off "antes/depois" wording (Código de Ética Odontológica
 * art. 44 XII). Nothing stopped the next post reintroducing either.
 *
 * Deliberately narrow. These patterns are phrases, not stems, because the
 * prose legitimately contains "depois da cirurgia" and "é garantir que o
 * desgaste continue". A test that fires on those gets muted within a week,
 * and a muted test guards nothing. The judgement calls — tone, whether a
 * claim is supportable, whether a TCLE is on file — stay with the reviewer
 * and the checklist.
 */

const POSTS = getAllPosts()
const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

/** Raw markdown, since alt text and image paths are stripped from `content`. */
function rawMarkdown(slug: string): string {
  return fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), 'utf8')
}

/** Every string that reaches a patient's eyes, flattened to one list. */
const ALL_PROSE: { where: string; text: string }[] = [
  ...POSTS.flatMap((post) => [
    { where: `posts/${post.slug}`, text: post.content },
    { where: `posts/${post.slug}:meta`, text: post.metaDescription },
    { where: `posts/${post.slug}:title`, text: post.title },
    ...(post.faqs ?? []).map((faq) => ({
      where: `posts/${post.slug}:faq`,
      text: `${faq.question} ${faq.answer}`,
    })),
  ]),
  ...TREATMENTS.flatMap((treatment) => {
    const at = (part: string) => `tratamentos/${treatment.slug}:${part}`
    return [
      { where: at('meta'), text: treatment.metaDescription },
      { where: at('title'), text: treatment.pageTitle },
      { where: at('definition'), text: treatment.definition },
      { where: at('preparation'), text: treatment.preparation },
      { where: at('followup'), text: treatment.followup },
      ...treatment.sections.flatMap((section) => [
        { where: at('heading'), text: section.heading },
        ...section.paragraphs.map((text) => ({ where: at('body'), text })),
        ...(section.bullets ?? []).map((bullet) => ({
          where: at('bullet'),
          text: `${bullet.term ?? ''} ${bullet.text}`,
        })),
      ]),
      ...treatment.notIndicated.map((bullet) => ({
        where: at('notIndicated'),
        text: `${bullet.term ?? ''} ${bullet.text}`,
      })),
      ...treatment.faqs.map((faq) => ({
        where: at('faq'),
        text: `${faq.question} ${faq.answer}`,
      })),
    ]
  }),
]

// A typo in a field name would silently empty the corpus and pass everything.
if (ALL_PROSE.some(({ text }) => typeof text !== 'string')) {
  throw new Error('Compliance corpus contains a non-string — a field was renamed.')
}

function findMatches(pattern: RegExp): string[] {
  return ALL_PROSE.flatMap(({ where, text }) => {
    const hits = text.match(new RegExp(pattern.source, 'gi')) ?? []
    return hits.map((hit) => `${where}: "${hit}"`)
  })
}

describe('patient imagery — CFO-196/2019, Código de Ética art. 44 XII', () => {
  const IMAGE = /!\[([^\]]*)\]\(([^)\s]+)\)/g
  /*
   * Labels, not words. "antes" and "depois" appear constantly in ordinary
   * prose; what art. 44 XII prohibits is presenting images as a before/after
   * pair, which shows up in alt text and filenames as a label.
   */
  const LABEL = /\b(antes|durante|depois|apos|após|pre|pré|pos|pós)\b|[-_](antes|durante|depois|pre|pos)[-_.]/i

  test('no image is captioned as a before/during/after stage', () => {
    const offenders = POSTS.flatMap((post) =>
      Array.from(rawMarkdown(post.slug).matchAll(IMAGE))
        .filter(([, alt]) => LABEL.test(alt))
        .map(([, alt]) => `${post.slug}: alt="${alt}"`)
    )

    expect(offenders).toEqual([])
  })

  test('no image filename encodes a before/during/after stage', () => {
    const offenders = POSTS.flatMap((post) =>
      Array.from(rawMarkdown(post.slug).matchAll(IMAGE))
        .filter(([, , src]) => LABEL.test(path.basename(src)))
        .map(([, , src]) => `${post.slug}: ${src}`)
    )

    expect(offenders).toEqual([])
  })

  test('no copy pairs images promotionally', () => {
    expect(findMatches(/antes\s*(e|\/|x)\s*(depois|ap[oó]s)/)).toEqual([])
  })

  test('every referenced post image exists on disk', () => {
    const missing = POSTS.flatMap((post) =>
      Array.from(rawMarkdown(post.slug).matchAll(IMAGE))
        .map(([, , src]) => src)
        .filter((src) => src.startsWith('/'))
        .filter((src) => !fs.existsSync(path.join(process.cwd(), 'public', src)))
        .map((src) => `${post.slug}: ${src}`)
    )

    expect(missing).toEqual([])
  })
})

describe('no guaranteed outcomes — Código de Ética art. 44', () => {
  /*
   * Phrases that promise a result. `garantir` alone is fine — one post uses it
   * to warn that skipping a diagnosis "é garantir que o desgaste continue".
   */
  const PROMISES = [
    /\bgarantimos\b/,
    /\bgarantia de (resultado|sucesso|dura[çc][ãa]o)\b/,
    /\bresultados? garantidos?\b/,
    /\b100\s*%\s*(de\s*)?(sucesso|seguro|eficaz|indolor)\b/,
    /\bsem\s+(nenhum\s+)?risco\b/,
    /\bsem\s+dor\s+alguma\b/,
    /\btotalmente\s+indolor\b/,
    /\b(cura|solu[çc][ãa]o)\s+definitiva\b/,
    /\bpara\s+sempre\b/,
    /\bnunca\s+mais\s+(vai|ir[áa])\b/,
    /\belimina\s+(por\s+completo|totalmente|de\s+vez)\b/,
  ]

  for (const pattern of PROMISES) {
    test(`no copy matches ${pattern}`, () => {
      expect(findMatches(pattern)).toEqual([])
    })
  }
})

describe('no superiority claims — Código de Ética art. 44', () => {
  const SUPERIORITY = [
    /\bo\s+melhor\s+(dentista|cirurgi[ãa]o|profissional|tratamento|implante)\b/,
    /\bmelhor\s+(cl[íi]nica|dentista|profissional)\s+d[eao]\b/,
    /\b(o|a)\s+mais\s+(avan[çc]ad[oa]|moderno|completo)\s+d[eao]\b/,
    /\b[úu]nic[oa]\s+(cl[íi]nica|profissional|dentista)\s+(que|em|d[eao])\b/,
    /\bl[íi]der\s+(em|no|na)\b/,
    /\brefer[êe]ncia\s+absoluta\b/,
    /\bsuperior\s+a(os?)?\s+(outros|demais|concorrentes)\b/,
  ]

  for (const pattern of SUPERIORITY) {
    test(`no copy matches ${pattern}`, () => {
      expect(findMatches(pattern)).toEqual([])
    })
  }
})

describe('no pricing or promotion — Código de Ética art. 44, pending §10', () => {
  /*
   * CADE's 2023/2025 decisions left it contested whether dentists may publish
   * prices at all. Until that open question is resolved with counsel, the site
   * publishes none — so this stays a hard failure rather than a judgement call.
   */
  const COMMERCIAL = [
    /R\$\s*\d/,
    /\ba partir de\s+R?\$?\s*\d/,
    /\b\d+\s*x\s+de\s+R\$/,
    /\bdesconto\b/,
    /\bpromo[çc][ãa]o\b/,
    /\bgr[áa]tis\b/,
    /\b(consulta|avalia[çc][ãa]o)\s+gratuita\b/,
    /\bcondi[çc][õo]es especiais\b/,
    /\bpre[çc]o\s+(especial|promocional|reduzido)\b/,
  ]

  for (const pattern of COMMERCIAL) {
    test(`no copy matches ${pattern}`, () => {
      expect(findMatches(pattern)).toEqual([])
    })
  }
})

describe('mandatory identification', () => {
  test('every post resolves to an author with a CRO-PR registration', () => {
    const unidentified = POSTS.filter(
      (post) => !/^CRO-PR\s+\d+$/.test(post.authorProfile.cro ?? '')
    ).map((post) => `${post.slug}: cro="${post.authorProfile.cro}"`)

    expect(unidentified).toEqual([])
  })

  /*
   * Hyphen optional: the site renders "Cirurgião Dentista" while
   * docs/compliance-guidelines.md quotes CFO's hyphenated "Cirurgião-Dentista".
   * Flagged in TODO.md for the practitioner to settle — not silently rewritten
   * here, because it is their registered professional title.
   */
  test('every author carries the professional title', () => {
    const wrong = Object.entries(POST_AUTHORS)
      .filter(([, author]) => !/Cirurgi[ãa]o[\s-]Dentista/i.test(author.title))
      .map(([id, author]) => `${id}: "${author.title}"`)

    expect(wrong).toEqual([])
  })

  test('every service page resolves to a registered practitioner', () => {
    const unattributed = TREATMENTS.filter(
      (treatment) => !POST_AUTHORS[treatment.practitioner]?.cro
    ).map((treatment) => `${treatment.slug} → "${treatment.practitioner}"`)

    expect(unattributed).toEqual([])
  })

  test('the educational disclaimer states it is not a substitute for care', () => {
    expect(MEDICAL_DISCLAIMER).toMatch(/car[áa]ter\s+(\S+\s+)?(educativo|informativo)/i)
    expect(MEDICAL_DISCLAIMER).toMatch(/n[ãa]o substitui/i)
  })
})

describe('legal pages reflect the services that actually run', () => {
  const privacySource = fs.readFileSync(
    path.join(process.cwd(), 'app', 'politica-de-privacidade', 'page.tsx'),
    'utf8'
  )
  const termsSource = fs.readFileSync(
    path.join(process.cwd(), 'app', 'termos-de-uso', 'page.tsx'),
    'utf8'
  )

  test('revision dates are fixed and do not change on deploy', () => {
    expect(privacySource).toContain('const LAST_UPDATED_ISO = "2026-08-10"')
    expect(termsSource).toContain('const LAST_UPDATED_ISO = "2026-08-10"')
    expect(privacySource).not.toContain('new Date(')
    expect(termsSource).not.toContain('new Date(')
  })

  test('privacy copy discloses the current analytics and lack of a form', () => {
    expect(privacySource).toContain('não possui cadastro nem formulário de contato')
    expect(privacySource).toContain('Vercel Analytics e Speed Insights')
    expect(privacySource).toContain('CONTACT_EMAIL')
  })
})
