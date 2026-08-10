# Content Plan — Dr. Enor Massoni

**Last updated:** 2026-08-04
Strategy and ownership: `docs/seo-strategy.md`. Authoring contract:
`docs/blog-content-playbook.md`.

## Where the local keywords actually live

The brief's target list mixes two different kinds of query, and they need
different page types:

| Query | Kind | Belongs to |
|---|---|---|
| dentista Cascavel, cirurgião dentista Cascavel | commercial + local | `/` — the homepage |
| implante dentário Cascavel, prótese dentária Cascavel, cirurgia buco-maxilo-facial Cascavel | commercial + local | a **service page** under `/tratamentos` — **9 built** |
| extração de siso, gengiva sangrando, cisto na boca, dentística restauradora | informational | blog posts — **17 built** |

The blog cannot win the commercial terms and should not try. What it does is
build topical authority across each cluster and funnel internal links to
whichever page owns the commercial intent.

Those owner pages now exist. Each post declares its owner in the
`ownerTreatment` frontmatter key and renders a link-up card; each service page
links back down to one or two supporting posts. Both directions are asserted by
`tests/treatments.test.ts`.

## Sourcing mode

All 17 posts shipped as **mode B — drafted here, pending practitioner review.**
That was implied by the request to write them, but it means nothing has been
signed off for medical accuracy yet.

Posts where mode A (practitioner supplies the substance) would materially
improve the result, because they reflect this clinic's specific approach rather
than general education:

- `cirurgia-guiada-3d` — the Sirios scanner and Skycam workflow is a real
  differentiator, and the post currently describes the technique generically
- `protese-fixa-sobre-implantes` — case selection criteria are a judgment call
- `cirurgia-ortognatica` — the ortho/surgeon collaboration model is
  practice-specific

## Shipped

| # | Slug | Primary query | Intent | Author | Status |
|---|---|---|---|---|---|
| 1 | `profilaxia-dental` | profilaxia dental | awareness | Enor | Has photos — consent pending |
| 2 | `recontorno-estetico-resina-composta` | recontorno estético | consideration | Thiago | Has photos — consent pending |
| 3 | `reabilitacao-bucal-resina-composta` | reabilitação bucal com resina composta | consideration | Thiago | Has photos — consent pending |
| 4 | `cirurgiao-bucomaxilofacial-quando-procurar` | cirurgião bucomaxilofacial | awareness | Enor | Text only |
| 5 | `extracao-de-siso` | extração de siso | consideration | Enor | Text only |
| 6 | `cirurgia-ortognatica` | cirurgia ortognática | consideration | Enor | Text only |
| 7 | `lesoes-e-cistos-na-boca` | cisto na boca | awareness | Enor | Text only |
| 8 | `implante-dentario-passo-a-passo` | implante dentário | consideration | Enor | Text only |
| 9 | `enxerto-osseo-dental` | enxerto ósseo dental | consideration | Enor | Text only |
| 10 | `protese-fixa-sobre-implantes` | protocolo sobre implantes | consideration | Enor | Text only |
| 11 | `cirurgia-guiada-3d` | cirurgia guiada | consideration | Enor | Text only |
| 12 | `dentistica-restauradora` | dentística restauradora | awareness | Thiago | Text only |
| 13 | `tipos-de-protese-dentaria` | prótese dentária | consideration | Thiago | Text only |
| 14 | `dente-quebrado-o-que-fazer` | dente quebrado | awareness | Thiago | Text only |
| 15 | `gengiva-sangrando` | gengiva sangrando | awareness | Thiago | Text only |
| 16 | `sensibilidade-nos-dentes` | sensibilidade nos dentes | awareness | Thiago | Text only |
| 17 | `traumatismo-facial-fraturas` | traumatismo facial | awareness | Enor | Text only |

## Deliberately not written

- **"Tudo sobre resina composta"** — would collapse posts 2, 3 and 12. Extend
  one of them instead.
- **"Facetas e lentes de contato"** — currently a comparison section inside
  post 2. If it ever earns a URL, that section is cut back to a link, not
  duplicated.
- **"Clareamento dental"** — commercial intent with no matching service in
  `procedureType[]`. Confirm the clinic offers it before writing.
- **"Melhor dentista de Cascavel" and comparison-style posts** — superiority
  claims are prohibited under dental advertising rules.
- **Per-neighbourhood pages** ("dentista no Centro", "dentista no Coqueiral") —
  doorway pattern. One page per real, staffed address.

## Queued — next batch, owners already assigned

| Topic | Primary query | Type | Owner |
|---|---|---|---|
| Bruxismo e placa de proteção | bruxismo | post | `dentistica-restauradora` |
| Mau hálito: causas e tratamento | mau hálito | post | `cirurgia-plastica-periodontal` |
| Recessão gengival e recobrimento de raízes | recessão gengival | post | `cirurgia-plastica-periodontal` |
| Perimplantite: como manter implantes | perimplantite | post | `implantes-dentarios` |
| Frenectomia em bebês e adultos | frenectomia | post | `cirurgia-bucomaxilofacial` |

Each queued post already has its owner page built, so it can link up on day
one. New posts must declare `ownerTreatment` — the test suite rejects orphans.

## Open items blocking publish

1. **Medical accuracy sign-off.** No post has been reviewed by either
   practitioner. Who signs, and how fast, is still unanswered in
   `docs/client-brief.md` §8.
2. **Patient photo consent** on posts 1–3. `docs/compliance-guidelines.md` §10
   records what is still needed: a TCLE per patient, and confirmation of which
   dentist personally performed each documented case — art. 4º of
   Resolução CFO-196/2019 forbids publishing a third party's clinical cases.
3. **Compliance re-review** when the CFO's advertising chapter rewrite lands
   (DECISÃO CFO-05-2025). The current doc is dated 2026-08-04.
