# SEO Strategy — Dr. Enor Massoni

**Site:** `https://www.clinicamassoni.com.br` — **www decided**, apex 301s to www
(`next.config.ts` `redirects()`). Every canonical, sitemap URL and schema `@id`
uses this host.
**Primary market:** Cascavel, PR (western Paraná)
**Last updated:** 2026-08-04

## Page ownership model

Exactly one owner URL per intent cluster. This table is architecture, not a
suggestion — change ownership only after checking Search Console queries and
which URLs actually rank.

### Built

| Cluster | Owner URL | Intent | Supporting content role |
|---|---|---|---|
| Broad local specialty + brand | `/` | local + brand | Explain the practice, route to the right service |
| Educational hub | `/blog` | informational | Organize articles; never competes with a service page |
| "Preciso fazer limpeza?" | `/blog/profilaxia-dental` | informational | Answers the prevention question; will link **up** to a future prophylaxis/periodontia service page |
| "Meus dentes são pequenos / tenho espaço entre eles" | `/blog/recontorno-estetico-resina-composta` | informational → consideration | Owns the *shape/proportion* question. Links up to a future aesthetic-dentistry service page |
| "Meus dentes desgastaram / minha mordida baixou" | `/blog/reabilitacao-bucal-resina-composta` | informational → consideration | Owns the *function/wear* question. Links up to a future oral-rehabilitation service page |

### Planned — not yet built

Seeded from `procedureType[]` in `structured-data.ts` and the keyword list in
`constants.ts`. **Slugs are proposals, not decisions**; nothing here is a URL
until it has confirmed patient demand and the practitioner has supplied FAQs.

| Cluster | Proposed owner URL | Intent | Evidence it deserves a URL |
|---|---|---|---|
| Service discovery | `/tratamentos` | commercial, broad | Hub required before any child page ships |
| Implantes dentários | `/tratamentos/implantes-dentarios` | commercial | Top keyword in `SEO_KEYWORDS`; the practice's headline service |
| Protocolo All-on-4 | `/tratamentos/protocolo-all-on-4` | commercial | Named keyword "all on 4 Cascavel" |
| Enxerto ósseo | `/tratamentos/enxerto-osseo` | commercial | Named keyword "enxerto ósseo Cascavel" |
| Cirurgia plástica periodontal | `/tratamentos/cirurgia-plastica-periodontal` | commercial | Three named keywords (recessão gengival, recobrimento de raízes) |
| Extração de sisos | `/tratamentos/extracao-de-sisos` | commercial | Named keyword "extração siso Cascavel" |
| Cirurgia ortognática | `/tratamentos/cirurgia-ortognatica` | commercial | Named keyword "cirurgia ortognática Cascavel" |
| Credentials / person entity | `/sobre` | brand + E-E-A-T | Strengthens the `Physician` node; currently only a landing section |
| The physical address | `/` (single location) | local | **One staffed address only** — no location subpages, no per-neighbourhood pages |

Deliberately **not** owning a URL, pending evidence:

- *Cirurgias guiadas com tecnologia 3D* — a differentiator, not a search term.
  Belongs in `/sobre` and inside service-page copy.
- *Traumatismo e fraturas faciais* — emergency intent, not shopping intent.
- *Cistos e tumores bucomaxilofaciais*, *biópsias orais*, *frenectomias* —
  clinically sensitive and low local volume; needs the compliance answer first.

## Rules this table enforces

1. Commercial and local intent live on service pages, never on posts.
2. Informational intent lives on posts, which link **up** to their owner page.
3. Two URLs never target the same intent. When they would: update, differentiate,
   or consolidate — don't create the second URL.
4. Index pages organize; they don't compete with their own children.
5. One page per real, staffed address. No per-neighbourhood doorway pages.

## Known overlap areas

Topics where near-duplicate content is likely and every new URL needs extra
scrutiny:

- **Prevention/hygiene advice** — `/blog/profilaxia-dental` already owns it.
  A future "como escovar os dentes" or "tártaro" post would cannibalize it;
  extend the existing article instead.
- **Periodontite vs. profilaxia** — the existing post deliberately covers the
  boundary ("quando a profilaxia não é o tratamento indicado"). A periodontia
  service page must own *treatment* intent and link back, not restate it.
- **Recontorno estético vs. reabilitação bucal** — both are composite resin, and
  the query "resina composta" alone sits between them. The boundary being
  enforced is **intent, not material**: recontorno owns *shape and proportion on
  healthy teeth*; reabilitação owns *lost structure and lost vertical
  dimension*. Each article states the boundary explicitly and links to the
  other. A third "tudo sobre resina composta" post would collapse both and must
  not be written — extend one of the two instead.
- **Facetas / lentes de contato** — currently a comparison section inside the
  recontorno post. If it ever earns its own URL, that section must be cut back
  to a link, not duplicated.
- **Implantes vs. All-on-4 vs. protocolo** — patients use these terms
  interchangeably. Decide the boundary before creating the second page.
- **Enxerto ósseo** is often searched as part of the implant journey, not
  separately. Validate demand before splitting it out.

## Baseline

Point-in-time measurement, not a promise. Re-measure monthly.

| Metric | Value | Date |
|---|---|---|
| Tracked queries | Not tracked | 2026-08-04 |
| Top 3 | Unknown | — |
| Top 10 | Unknown | — |
| Published posts | 3 | 2026-08-04 |
| Service pages | 0 | 2026-08-04 |

**Data sources available: none yet.** Search Console is not verified
(`GOOGLE_SITE_VERIFICATION` unset), GA4/GTM IDs are empty in `constants.ts`, and
there is no ranking tool. Only Vercel Analytics + Speed Insights are live, plus
the `cta_click` custom event in `lib/analytics.ts`.

Consequence: **any ranking or attribution claim right now is a guess.** Verifying
Search Console is the highest-value next action in this document — without it the
monthly loop below cannot run at all.

## Measurement loop — monthly

| Signal | Action |
|---|---|
| High impressions, low CTR | Test title/description, preserving accuracy |
| Position 4–10 | Improve intent match, depth, internal links — **highest ROI** |
| Wrong URL ranking | Fix ownership / cannibalization |
| Ranking but no bookings | Fix the journey and CTA relevance, not the ranking |
| No real demand | Don't publish just because a tracker has the keyword |

Protect page-one positions before chasing new ones. The success metric is booked
consultations (`cta_click` with `section: 'blog'` attributes them per post), not
keyword count.

## Compliance constraint

All content is subject to `docs/compliance-guidelines.md` — **which does not
exist yet.** Run `/clinic-compliance-research` before the next post ships.

Two open items block content that is already written:

1. **Patient clinical photography — all three posts.** Eleven photographs of at
   least three different patients are published across the blog, including two
   before/after pairs (profilaxia and recontorno). Requires documented patient
   consent per patient *and* a CFO determination on whether before/after imagery
   is permitted in dental advertising at all. Identifying features (nose,
   mustache, beard) were cropped out where possible, but a crop is not consent.
2. **Educational disclaimer wording.** `MEDICAL_DISCLAIMER` in `constants.ts` is
   a reasonable draft, not the regulator's text.
3. **Byline attribution.** The two resin articles are attributed to
   Dr. Thiago Massoni (Dentística Restauradora), which matches the clinical
   subject. Needs confirmation that he authored or approves them.

No page promises outcomes, implies superiority, or uses fear to earn clicks —
which is also what the ranking and answer-engine systems reward.

## Validation

```bash
bun test          # content discovery, image dimensions, SEO metadata
bun run lint && bun run build
```
