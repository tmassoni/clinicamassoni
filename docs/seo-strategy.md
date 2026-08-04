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

### The rule that decides where a local keyword lives

**Commercial + local head terms belong to `/` and to service pages — never to a
post.** "dentista Cascavel", "cirurgião dentista Cascavel", "prótese dentária
Cascavel", "implante dentário Cascavel" are shopping queries: the searcher wants
a provider, not an explanation. A blog post targeting them competes with the
homepage and loses, or wins and delivers the wrong page.

What the blog does for those terms is different and still valuable: it builds
topical authority across the cluster and funnels internal links to whichever
page owns the commercial intent. That mechanism only works if the ownership
below is respected.

### Built — homepage and hub

| Cluster | Owner URL | Intent | Supporting content role |
|---|---|---|---|
| Broad local specialty + brand ("dentista Cascavel", "cirurgião dentista Cascavel") | `/` | local + commercial | Explains the practice and routes to the right service. **No post may target these.** |
| Educational hub | `/blog` | informational | Organizes articles; never competes with a service page |

### Built — blog posts (17)

Each owns one informational question and links **up**. The "future owner"
column is the service page that should take the commercial intent once built;
until it exists, that intent is unowned and the homepage absorbs it.

| # | Post | Primary query | Intent | Future owner service page |
|---|---|---|---|---|
| 1 | `profilaxia-dental` | profilaxia dental | awareness | `/tratamentos/periodontia` |
| 2 | `recontorno-estetico-resina-composta` | recontorno estético | consideration | `/tratamentos/estetica-dental` |
| 3 | `reabilitacao-bucal-resina-composta` | reabilitação bucal com resina composta | consideration | `/tratamentos/reabilitacao-oral` |
| 4 | `cirurgiao-bucomaxilofacial-quando-procurar` | cirurgião bucomaxilofacial | awareness | `/tratamentos/cirurgia-bucomaxilofacial` |
| 5 | `extracao-de-siso` | extração de siso | consideration | `/tratamentos/extracao-de-sisos` |
| 6 | `cirurgia-ortognatica` | cirurgia ortognática | consideration | `/tratamentos/cirurgia-ortognatica` |
| 7 | `lesoes-e-cistos-na-boca` | cisto na boca | awareness | `/tratamentos/cirurgia-bucomaxilofacial` |
| 8 | `implante-dentario-passo-a-passo` | implante dentário | consideration | `/tratamentos/implantes-dentarios` |
| 9 | `enxerto-osseo-dental` | enxerto ósseo dental | consideration | `/tratamentos/enxerto-osseo` |
| 10 | `protese-fixa-sobre-implantes` | protocolo sobre implantes | consideration | `/tratamentos/protocolo-all-on-4` |
| 11 | `cirurgia-guiada-3d` | cirurgia guiada | consideration | `/tratamentos/implantes-dentarios` |
| 12 | `dentistica-restauradora` | dentística restauradora | awareness | `/tratamentos/dentistica-restauradora` |
| 13 | `tipos-de-protese-dentaria` | prótese dentária | consideration | `/tratamentos/protese-dentaria` |
| 14 | `dente-quebrado-o-que-fazer` | dente quebrado | awareness | `/tratamentos/dentistica-restauradora` |
| 15 | `gengiva-sangrando` | gengiva sangrando | awareness | `/tratamentos/periodontia` |
| 16 | `sensibilidade-nos-dentes` | sensibilidade nos dentes | awareness | `/tratamentos/dentistica-restauradora` |
| 17 | `traumatismo-facial-fraturas` | traumatismo facial | awareness | `/tratamentos/cirurgia-bucomaxilofacial` |

Mix: 7 awareness, 10 consideration. Ten attributed to Dr. Enor (surgical and
implant clusters), seven to Dr. Thiago (restorative, prosthetic, preventive) —
each matching the practitioner's registered specialty, which is what makes the
`Article.author` credential chain a real E-E-A-T signal rather than a formality.

**The gap this exposes:** every "future owner" cell above is empty in
production. The blog can support those commercial terms but cannot own them.
Building `/tratamentos` and its children is now the highest-value SEO work
remaining.

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
- **Implantes vs. enxerto vs. protocolo vs. cirurgia guiada** — four posts in
  one cluster. The boundary enforced: `implante-dentario-passo-a-passo` owns the
  *process*, `enxerto-osseo-dental` owns *insufficient bone*,
  `protese-fixa-sobre-implantes` owns *full-arch*, `cirurgia-guiada-3d` owns
  *the planning technique*. Each links to the others; none repeats another's
  core explanation. A future service page must own the commercial term without
  restating all four.
- **Sensibilidade vs. gengiva sangrando** — both touch gingival recession.
  Sensibilidade owns the *symptom*; gengiva sangrando owns the *periodontal
  disease*. Keep recession as a cause in one and a consequence in the other.
- **Dentística vs. recontorno vs. reabilitação** — three Thiago posts on
  restorative work. Dentística is the specialty explainer and links down to the
  other two; it must not absorb their procedure detail.
- **Dente quebrado vs. traumatismo facial** — dental fracture vs. bone fracture.
  The dividing line is the tissue involved, and each post states it explicitly.
- **Enxerto ósseo** is often searched as part of the implant journey, not
  separately. Validate demand before splitting it out.

## Baseline

Point-in-time measurement, not a promise. Re-measure monthly.

| Metric | Value | Date |
|---|---|---|
| Tracked queries | Not tracked | 2026-08-04 |
| Top 3 | Unknown | — |
| Top 10 | Unknown | — |
| Published posts | 17 | 2026-08-04 |
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
