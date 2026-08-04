# Content Compliance Guidelines — Odontologia, Brasil

> Researched starting point, **not legal advice**. Every rule below carries its
> primary source and the date it was verified. Rules marked ⚠️ are contradicted
> between sources or under active revision and must be confirmed by the
> practitioner or their legal counsel before any copy relies on them.

**Practice:** Dr. Enor Massoni — Implantes e Cirurgia Maxilofacial
**Profession(s):** Odontologia (Cirurgião-Dentista). Two practitioners:
Dr. Enor Massoni, CRO-PR 4982, especialista em Cirurgia e Traumatologia
Buco-Maxilo-Facial · Dr. Thiago Massoni, CRO-PR 35209, especialista em
Dentística Restauradora
**Jurisdiction:** Brasil / Paraná
**Governing body:** Conselho Federal de Odontologia (CFO), com fiscalização
regional pelo Conselho Regional de Odontologia do Paraná (CRO-PR)
**Last verified:** 2026-08-04
**Next review due:** 2027-02-04 — **or sooner**: the advertising chapter is
under active revision (see §1 and §10)

> **This is dentistry, not medicine.** CFM rules do not apply and are materially
> stricter on imagery. Do not import guidance written for a medical practice.

## 1. Governing instruments

| Instrument | What it covers | Status | Source | Verified |
|---|---|---|---|---|
| Código de Ética Odontológica — Resolução CFO-118/2012, Cap. XVI "Do Anúncio, da Propaganda e da Publicidade" (arts. 41–46) | Base advertising code: mandatory identification, prohibited practices | In force; **chapter under revision** | [CFO PDF](https://website.cfo.org.br/wp-content/uploads/2018/03/codigo_etica.pdf) · [CRO-PR mirror](https://www.cropr.org.br/uploads/arquivo/724571448d7a83c915ebc18e218042a3.pdf) | 2026-08-04 |
| Resolução CFO-196/2019 (29/01/2019) | Authorizes selfies and images of **diagnosis** and **treatment conclusion**, conditioned on TCLE | In force | [CFO](https://website.cfo.org.br/resolucao-cfo-196-2019/) · [full text PDF](https://odontologia.ufes.br/sites/odontologia.ufes.br/files/field/anexo/resolucao-cfo-196-2019_1.pdf) | 2026-08-04 |
| Resolução CFO-271/2025 (18/06/2025) | Amends arts. 20 VIII, 20 X, 44 XIV; **revokes art. 32 XIII**. Complies with a CADE ruling on discounts | In force | [PDF](https://crors.org.br/wp-content/uploads/2025/07/RESOLUCAO-CFO-271-2025.pdf) · [CFO notice](https://website.cfo.org.br/em-cumprimento-a-decisao-do-cade-cfo-realiza-alteracoes-pontuais-no-codigo-de-etica/) | 2026-08-04 |
| DECISÃO CFO-05-2025 | Creates a special group to rewrite the entire advertising chapter. Includes a CRO-PR member (Aguinaldo Coelho de Farias) | ⚠️ **In progress** | [CFO](https://website.cfo.org.br/grupo-especial-para-estudo-e-proposicao-de-alteracao-e-atualizacao-do-capitulo-do-anuncio-da-propaganda-e-da-publicidade-do-codigo-de-etica-odontologica-do-conselho-federal-de-odont/) | 2026-08-04 |
| CADE, processo 08700.002535/2020-91 (ago/2023) | Ordered CFO to remove restrictions on discount cards and discounts | Complied with via CFO-271/2025 | cited in CFO-271/2025 preamble | 2026-08-04 |

**Also applicable:** CDC (Código de Defesa do Consumidor) · **LGPD** — clinical
images and health information are *dados pessoais sensíveis* · CONAR
(advertising self-regulation).

## 2. Mandatory identification

Required by **art. 43** of the Código de Ética and, for any post carrying
images, again by **art. 4º of CFO-196/2019**.

    Dr. <Nome Completo>
    Cirurgião-Dentista
    CRO-PR <número>

Optional additions permitted by art. 43 §1º: registered specialties, areas of
practice (only when preceded by the registered specialty title or "clínico
geral"), *stricto sensu* academic titles, address, phone, email, hours.

**Where it must appear:** site footer, every blog post footer, and — critically
— on **every publication containing patient images**, naming the professional
who actually performed the procedure.

Implemented in code by `AuthorByline` (`app/src/components/blog/`), driven by
the `author` frontmatter key and `POST_AUTHORS` in `constants.ts`.

## 3. Prohibited — hard stops

Copy that trips any of these does not ship. Both practitioners share these
surfaces, so the stricter reading governs.

- **Procedure-in-progress imagery or video** — "Fica expressamente proibida a
  divulgação de vídeos e/ou imagens com conteúdo relativo ao transcurso e/ou à
  realização dos procedimentos, exceto em publicações científicas."
  — CFO-196/2019, **art. 3º**. A clinic blog is not a scientific publication.
- **Images identifying equipment, instruments, materials or biological tissue**
  — CFO-196/2019, **art. 1º §1º**.
- **Publishing another professional's clinical cases** — "vedada a divulgação de
  casos clínicos de autoria de terceiros" — CFO-196/2019, **art. 4º**. The byline
  must be the dentist who performed the procedure.
- **The promotional "antes / durante / depois" device** — art. 44 **I** and
  **XII** of the Código de Ética. See §4 for the contested boundary.
- **Misleading or abusive advertising**, including anything implying
  commercialisation of dentistry — art. 44 **I**.
- **Announcing titles, qualifications or specialties not registered** with the
  council — art. 44 **II**.
- **Announcing techniques or therapies not scientifically proven**, or equipment
  without valid registration — art. 44 **III**.
- **Criticising techniques used by other professionals** as inadequate or
  outdated — art. 44 **IV**.
- **Giving consultation, diagnosis, prescription, or disclosing clinical
  results through mass communication**, or letting dental content lose its
  "caráter exclusivo de esclarecimento e educação da coletividade"
  — art. 44 **V**. *This is the article that governs the blog: content must be
  purely educational, never individual clinical advice.*
- **Disclosing anything identifying a patient** without free and informed
  consent, **and not for self-promotion or the professional's benefit**
  — art. 44 **VI**.
- **Patient solicitation** via false, irregular, illicit or immoral information;
  the word "popular" is named explicitly — art. 44 **VII**.
- **Free work or campaigns for self-promotion**, services as contest prizes
  — art. 44 **IX**, **X**.
- **Guaranteed results / promessa de resultado**, sensationalism,
  self-promotion, unfair competition, commercialisation of dentistry
  — CFO-196/2019, **art. 2º §1º**.

## 4. Conditionally allowed

The condition *is* the rule. Read these carefully.

| Practice | Allowed? | Condition | Source |
|---|---|---|---|
| Images of **diagnosis** and of **treatment conclusion** | **Yes** | Signed **TCLE** on file from the patient or legal representative; published by the dentist **who performed the procedure**; publication carries that dentist's name + CRO; no identifiable equipment, instruments, materials or biological tissue | CFO-196/2019 arts. 1º, 2º, 4º |
| Comparing a diagnosis image with a conclusion image | ⚠️ **Contested — see §10** | CFO's own guidance says comparative content is permitted under CFO-196/2019, which it calls "complementar ao Código de Ética". But art. 44 XII, still in force and untouched by CFO-271/2025, prohibits "a utilização de imagens e/ou expressões antes, durante e depois". **Operating position: publish clinical documentation, never the marketing device** — no "ANTES/DEPOIS" labels, no split-screen promotional framing, captions phrased as clinical description | art. 44 I, XII vs. CFO-196/2019 + [CFO guidance](https://website.cfo.org.br/redes-sociais-na-odontologia-fique-atento-as-normas-eticas-e-acerte-na-publicacao-dos-conteudos/) |
| Procedure in progress | **No** | Except in scientific publications | CFO-196/2019 art. 3º |
| Selfies with patients | Yes | TCLE; no identifiable equipment/instruments/materials/tissue | CFO-196/2019 art. 1º |
| Patient testimonials | ⚠️ Not directly regulated by the instruments reviewed | Art. 44 VI (patient identification) and art. 44 I (abusive advertising) both bear on it. **Treat as out of scope until counsel confirms** | art. 44 I, VI |
| Prices, payment terms, free services | **No** | Named explicitly in art. 44 I | art. 44 I |
| Discounts, discount cards, promotional draws, gift vouchers | ⚠️ **Materially relaxed in 2025** | CFO-271/2025 revoked art. 32 XIII and rewrote art. 44 XIV, removing discount cards, discount booklets, internet direct mail, promotional sites and group-buying from the prohibition — following a CADE ruling. Art. 20 VIII/X still restrict brindes, premiação, sorteios and "vale presente". **Contested area; confirm before any offer** | CFO-271/2025 |
| Naming registered specialties | Yes | Must be registered with the CRO; areas of practice must be preceded by the specialty title or "clínico geral" | art. 43 §1º I–II |
| Naming equipment brands (e.g. scanner intraoral) | Yes, with care | Equipment must have valid registration with the competent authorities; must not become promotional device or imply superiority | art. 44 III |
| Telemarketing, sound trucks, plaqueteiros | **No** | Rewritten but still prohibited | art. 44 XIV (as amended 2025) |

## 5. Always allowed

- Educational content explaining conditions, procedures, indications and
  contraindications — this is the "esclarecimento e educação da coletividade"
  that art. 44 V explicitly protects
- When to seek care, warning signs, prevention guidance
- Credentials, academic titles, registered specialties, professional history
- Facilities, address, hours, contact channels
- Scientific information supportable by mainstream professional literature
- Balanced, factual comparison of techniques **without** disparaging colleagues

## 6. Tone and language

**Required register:** sober, educational, impersonal about outcomes.
Content must read as public education, not as an offer.

**Banned constructions:**

- "antes e depois", "antes/durante/depois" as labels or framing
- guaranteed / garantido / definitivo / permanente / resultado garantido
- milagroso, revolucionário, exclusivo, único
- "o melhor de Cascavel", "referência da região", any superiority claim
- "indolor", "sem dor" as an absolute
- "popular" (named explicitly in art. 44 VII)
- prices, instalments, "a partir de R$…", free-service offers

**Preferred hedging:** "pode", "costuma", "na maioria dos casos", "em casos
selecionados", "depende de avaliação clínica individual", "não há prazo
garantido".

## 7. Data protection

**Applicable law:** LGPD (Lei 13.709/2018). Clinical images and health
information are **dados pessoais sensíveis** (art. 5º, II), which require
specific and highlighted consent for a defined purpose.

- **Consent mechanism:** TCLE per patient, in writing, naming the specific
  purpose (publication on the practice website and/or social media), signed
  before publication. Council rules require it; LGPD independently requires it.
- **Where consent records live:** ⚠️ **Not yet defined.** A consent register
  must exist and be auditable, linking each published image to its TCLE.
- **Cookie/analytics consent:** LGPD cookie consent is **not implemented** on
  this site. Analytics currently runs without a consent gate. Flagged as an open
  item independent of the blog work.

## 8. Pre-publish checklist

Run before every publish. Answerable in five minutes without reopening the
resolutions.

- [ ] Identification block present: name, "Cirurgião-Dentista", CRO-PR number
- [ ] If the post carries patient images, the byline is the dentist who
      **personally performed** the procedure
- [ ] A signed TCLE exists on file for every patient image, and is recorded
- [ ] No procedure-in-progress image or video
- [ ] No identifiable equipment, instruments, materials or biological tissue
- [ ] No "antes / durante / depois" wording, labels, or promotional pairing
- [ ] No guaranteed outcome, expressed or implied; no promessa de resultado
- [ ] No superiority claim over colleagues, clinics or techniques
- [ ] No prices, payment terms, free services or promotional offers
- [ ] Content is purely educational — no individual diagnosis or prescription
- [ ] Claims supportable by mainstream professional literature; comparisons
      two-sided
- [ ] Educational disclaimer present
- [ ] Nothing on the page depends on an ⚠️ open question in §10

## 9. Risk tiers

**High — "infração ética de manifesta gravidade"**
Publishing patient images in breach of CFO-196/2019 is classified this way by
its own **art. 5º**. This covers: no TCLE, procedure-in-progress content,
identifiable instruments or tissue, and publishing a third party's clinical case.

**Medium**
Art. 44 breaches: before/after framing, superiority claims, prices, unproven
techniques, unregistered specialties. Note art. 45 — liability is **joint**
between owners, the technical head and every professional involved.

**Low**
Missing or incomplete identification block; tone that drifts promotional.

## 10. ⚠️ Open questions — need professional sign-off

| Question | Why it's open | Who decides | Blocking? |
|---|---|---|---|
| Is a diagnosis→conclusion image comparison permitted? | CFO's own guidance and CFO-196/2019 say yes; art. 44 XII, still in force, says no. CFO-271/2025 did **not** amend art. 44 XII | CRO-PR consultation, or the practice's legal counsel | The 3 illustrated posts |
| Does a TCLE exist for each patient already photographed? | No consent register exists | Practice | The 3 illustrated posts |
| Who personally performed each documented case? | Art. 4º of CFO-196/2019 forbids publishing third-party cases; the byline must match the operator | Dr. Enor / Dr. Thiago | The 3 illustrated posts |
| Are patient testimonials permissible, and under what limits? | Not directly addressed by the instruments reviewed | Legal counsel | Phase-3 testimonials feature |
| Post-CADE, what exactly may be said about discounts and payment? | CFO-271/2025 relaxed part of it; art. 44 I still bars prices and payment terms | Legal counsel | Any future pricing copy |
| Will the rewritten advertising chapter change any of this? | DECISÃO CFO-05-2025 group is actively rewriting Cap. XVI | CFO | Everything — re-review on publication |
| Exact wording of the educational disclaimer | No mandated wording found in the reviewed instruments; `MEDICAL_DISCLAIMER` in `constants.ts` is a drafted approximation | Practice / counsel | Low — current wording is conservative |

## 11. Change log

| Date | What changed | Who verified |
|---|---|---|
| 2026-08-04 | Document created. All instruments in §1 verified against primary sources on this date | Claude Opus 5 — **pending practitioner and/or legal review** |
