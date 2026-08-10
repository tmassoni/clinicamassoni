# Client Brief — Dr. Enor Massoni

> Save the filled version as `docs/client-brief.md` in the new client's repo.
> The build agent treats every blank here as a hard blocker and will refuse to
> invent it. Anything genuinely unknown: write `UNKNOWN` rather than deleting the
> line, so it shows up in the blocker list.

> **Sourcing note**: fields marked *(from repo)* are pulled verbatim from
> `app/src/lib/constants.ts` / `structured-data.ts` / `docs/CURRENT_STATE.md` —
> they're facts already committed to the codebase, not invented. Fields marked
> `UNKNOWN` are real blockers that need the client or a regulator, not more
> repo spelunking. Run `/clinic-compliance-research` to close most of §8.

## 1. Practitioner identity

| Field | Value |
|---|---|
| Full professional name | Dr. Enor Massoni *(from repo)* |
| Abbreviated name (headers/footers) | Dr. Enor Massoni *(from repo)* |
| Short/informal name | Dr. Enor |
| Specialty (exact, as registered) | Cirurgia e Traumatologia Buco-Maxilo-Facial *(from repo)* |
| Secondary specialties | Cirurgia Ortognática; Implantes Dentários *(from repo)* |
| Medical council registration | CRO-PR 4982 *(from repo)* |
| Specialist qualification number (RQE-equivalent) | UNKNOWN — dentistry uses CFO/CRO specialist registries, not RQE; confirm exact credential ID with `/clinic-compliance-research` |
| Council name + URL (for `recognizedBy` in schema) | Conselho Regional de Odontologia do Paraná (CRO-PR) — https://www.cropr.org.br *(from repo)* |
| Pronouns to use in copy | UNKNOWN — pt-BR convention question, confirm with client (likely irrelevant in Portuguese, but flag for any EN content) |

**Second practitioner not covered by this template** — `constants.ts` also defines
`Dr. Thiago Massoni`, CRO-PR 35209, Cirurgião Dentista, especialista em
Dentística Restauradora, especializando em Prótese Dentária. Confirm scope:
does this engagement cover his own bio/service pages too, or is the site
single-practitioner-branded around Dr. Enor only?

**Inconsistent experience figures across docs — needs one source of truth**:
`constants.ts` says "34 anos de experiência" (implants), `SEO_KEYWORDS` contains
both "41 anos de formado" and "41 anos experiência", and `PROJECT_OVERVIEW.md`
says "38 years practicing." Graduation year in schema is 1984, which is 41–42
years ago from 2026 — so "41 anos" is likely correct and "34"/"38" are stale.
**Blocker: confirm the real number before it goes into any new copy.**

## 2. Credentials → schema `Physician`/`Dentist` node

| Field | Value |
|---|---|
| Dental school (`alumniOf`) | Universidade Federal de Pelotas (UFPEL), graduated 1984 *(from repo)* |
| Residency/specialization institution(s) | Especialização em Cirurgia e Traumatologia Bucomaxilofacial, FOB-USP (Bauru, SP), 1993 *(from repo)* |
| Other academic role | Ex-professor de Cirurgia, Unioeste (Universidade Estadual do Oeste do Paraná) *(from repo)* |
| Professional society memberships (`memberOf`) | UNKNOWN — "academia brasileira osseointegração" appears only as an SEO keyword, not a verified membership. Confirm before claiming it as a credential. |
| Notable certifications | UNKNOWN |
| Languages of practice | pt-BR assumed; confirm if any consults are offered in other languages |

## 3. Site & brand

| Field | Value |
|---|---|
| Canonical URL | `https://www.clinicamassoni.com.br` — www decided, apex redirects to www *(from repo, CURRENT_STATE.md)* |
| Site language / locale | `pt-BR` *(from repo)* |
| Brand positioning line (the h1 promise) | UNKNOWN — draft candidate from interview notes in `PROJECT_OVERVIEW.md`: "41 anos de cuidado humanizado, cirurgia guiada por tecnologia 3D, confiança de gerações" — needs client sign-off, not yet copy-ready |
| Tone: 3 adjectives | UNKNOWN — candidates from existing notes: confiável, humano, tecnicamente rigoroso — confirm |
| Existing design tokens — where do they live? | `app/globals.css`, `@theme` block (Tailwind v4) *(from repo)* |
| Logo / OG image asset + exact pixel dimensions | `public/images/logo.svg` + `logo.png` exist; **no OG image found and no dimensions documented** — blocker for social share cards |
| Google Search Console verification token | UNKNOWN — `GOOGLE_SITE_VERIFICATION` env var not yet set *(confirmed gap, CURRENT_STATE.md)* |

## 4. Contact & conversion

| Field | Value |
|---|---|
| Primary conversion action | WhatsApp *(from repo)* |
| Scheduling WhatsApp number (E.164) | 5545991492390 *(from repo)* |
| Scheduling number, display format | (45) 99149-2390 *(from repo)* |
| Pre-filled WhatsApp message text | "Olá! Encontrei vocês pelo site e gostaria de agendar uma consulta." *(from repo)* |
| Secondary phone / email | (45) 3223-3234 / clinica_massoni@hotmail.com *(from repo)* |
| Instagram URL + handle | @enormassoni — https://www.instagram.com/enormassoni/ *(from repo)* |
| LinkedIn / other socials | https://www.linkedin.com/in/dr-enor-massoni-a74442233/ *(from repo)* |
| Analytics: GA4 ID / GTM ID | Empty — `ANALYTICS_GA_ID` / `ANALYTICS_GTM_ID` unset *(confirmed gap, CURRENT_STATE.md)*. Vercel Analytics + Speed Insights already active. |

## 5. Locations

| Field | Value |
|---|---|
| Clinic name | Dr. Enor Massoni - Implantes e Cirurgia Maxilofacial *(from repo)* |
| Street address | Rua Paraná, 3033, Centro Empresarial Formato, 6º Andar *(from repo)* |
| Neighbourhood | Centro *(from repo)* |
| City / State / Country | Cascavel / PR / Brasil *(from repo)* |
| Postal code | 85812-011 *(from repo)* |
| Latitude, Longitude | -24.954396, -53.462192 *(from repo)* |
| Phone (display + E.164) | (45) 3223-3234 — E.164 form UNKNOWN, only display format in repo |
| WhatsApp (if different) | Same as §4 |
| Google Maps share URL | UNKNOWN — repo only has an embed `pb=` URL, not the shareable `maps.app.goo.gl` link needed for schema/CTA links |
| Opening hours, schema format | `Mo-Fr 08:00-12:00,13:30-18:00` *(from repo)* |
| Opening hours, display format | Segunda a Sexta: 8h às 12h / 13h30 às 18h; Sábado e Domingo: Fechado *(from repo)* |
| What happens here specifically | UNKNOWN — confirm whether this address is consult-only or also where surgical procedures are performed (affects `MedicalProcedure`/`SurgeryHospital` schema choices) |
| Clinic's own website | https://www.clinicamassoni.com.br *(from repo)* |

## 6. Services / treatments — the page-ownership seed

Seeded from `procedureType[]` in `structured-data.ts` — this is the practitioner's
own declared procedure list, so it's a real signal, but **none of these have
slugs, FAQs, or confirmed "worth its own URL" status yet.** Treat every row
below as a candidate for Step 5 (ownership table), not a decision.

| Service (patient-facing name) | URL slug | Category | One-line description | Search intent worth owning? |
|---|---|---|---|---|
| Implantes dentários (unitários e múltiplos) | UNKNOWN | Surgical | | Likely yes — "implantes dentários Cascavel" is the #1 keyword in repo |
| Protocolo sobre implantes (All-on-4) | UNKNOWN | Surgical | | Likely yes — "all on 4 Cascavel" is a named keyword |
| Implantes imediatos em área estética | UNKNOWN | Surgical | | UNKNOWN |
| Enxerto ósseo | UNKNOWN | Surgical | | Named keyword "enxerto ósseo Cascavel" exists |
| Cirurgias guiadas com tecnologia 3D | UNKNOWN | Surgical | | Likely a differentiator, not a search term — candidate for About/positioning instead of own page |
| Cirurgia plástica periodontal (recessões, aumento de coroa, gengivoplastia) | UNKNOWN | Surgical | | Named keywords "recessão gengival", "recobrimento de raízes", "cirurgia plástica periodontal" exist |
| Cirurgias de cistos e tumores bucomaxilofaciais | UNKNOWN | Surgical | | UNKNOWN — clinically sensitive, confirm compliance angle first |
| Extração de sisos e dentes retidos | UNKNOWN | Surgical | | Named keyword "extração siso Cascavel" exists |
| Cirurgia ortognática | UNKNOWN | Surgical | | Named keyword "cirurgia ortognática Cascavel" exists |
| Traumatismo e fraturas faciais | UNKNOWN | Surgical | | UNKNOWN — likely not a "shopping" search, may not deserve own page |
| Frenectomias | UNKNOWN | Surgical | | UNKNOWN |
| Biópsias orais | UNKNOWN | Diagnostic | | UNKNOWN |

For every row that survives: 3–6 real patient FAQs, 3–5 keywords + city,
image asset + dimensions, and contraindications — **all still to be collected
from the practitioner**, not invented here.

## 7. Content strategy inputs

| Field | Value |
|---|---|
| Primary city/region for local SEO | Cascavel, PR *(from repo)* |
| Secondary cities worth targeting | UNKNOWN — "dentista região oeste Paraná" keyword implies a wider West Paraná target (Toledo, Foz do Iguaçu, Medianeira are geographic candidates, unconfirmed) |
| Target audiences | UNKNOWN — patients seeking implants/maxillofacial surgery is evident; whether referring GPs/dentists are also a target audience needs confirmation |
| Top 10 questions patients actually ask in consultation | UNKNOWN — **this is a real blocker**, needs the practitioner directly, especially for the signature procedures (implants, All-on-4, ortognática) |
| Existing content to migrate | None — site is currently single-page, no blog/subpages exist yet |
| Existing URLs that must keep working | `/`, `/privacidade`, `/termos` (confirm exact paths before any restructuring) |
| Competitor sites to review | UNKNOWN |
| Keyword research available? | Only an informal list in `SEO_KEYWORDS` (`constants.ts`) — no volume/difficulty/intent data behind it. Not a substitute for real keyword research. |

## 8. Compliance

| Field | Value |
|---|---|
| Regulator + governing resolution | CFO (Conselho Federal de Odontologia) nationally, CRO-PR regionally — **not CFM**, this is dentistry. Exact governing resolution (advertising code, likely CFO Resolução on publicidade) UNKNOWN — run `/clinic-compliance-research` before writing any new copy |
| Required identification block, exact wording | UNKNOWN |
| Standard educational disclaimer, exact wording | UNKNOWN |
| Are patient testimonials in scope? Under what limits? | UNKNOWN — `CLAUDE.md` lists "Patient testimonials" as a Phase 3 future item, not yet built. Brazilian dental advertising rules restrict these; confirm before Phase 3 starts |
| Are before/after images in scope? Consent status? | **UNKNOWN — the single biggest blocker in this brief.** Existing gallery (`gallery-data.ts`, ~24–26 images) is described as "showcasing practice/results" — need to verify none of these are patient before/after photos without documented consent, and whether before/after is even permitted for dental advertising in Brazil. This gates whether a case-gallery page type exists at all. |
| Privacy law in scope | LGPD *(Brazil, confirmed)*. Note: `CLAUDE.md` states LGPD cookie consent is "not implemented yet in massoni" — open compliance gap independent of the blog/SEO work |
| Who signs off on medical accuracy, and how fast? | UNKNOWN |

## 9. Scope of this engagement

| Field | Value |
|---|---|
| What's already built | Single-page Next.js landing site; PR #1 already merged canonical-domain handling, robots.txt/sitemap.xml, structured data (Dentist/MedicalBusiness/LocalBusiness/MedicalProcedure/WebSite), and image pipeline tuning *(from repo, CURRENT_STATE.md)* |
| What this package covers | Blog architecture, SEO improvements, and service/location subpages (per current engagement request) |
| Explicitly out of scope | UNKNOWN — `CLAUDE.md` "Future Enhancements" lists online booking, testimonials, before/after gallery, and video tour as Phase 3; confirm these stay out of this package |
| Deadline / launch date | UNKNOWN |
| Who reviews before publish | UNKNOWN — confirm whether Dr. Enor, Dr. Thiago, or someone else signs off, and expected turnaround |
