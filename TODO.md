# TODO — open questions for the client

Everything the build is waiting on, grouped by who can answer it. Each item says
what it blocks, so you can decide what's worth chasing first.

Sources: `docs/client-brief.md`, `docs/compliance-guidelines.md` §10,
`docs/content-plan.md`, `docs/launch-checklist.md`.

**Last updated:** 2026-08-10

---

## 🔴 Approval and compliance follow-up

The content is already live. These client-owned approvals remain unresolved; do
not add, reuse or actively promote clinical imagery until they are documented.

### Mensagem pronta para enviar ao cliente

> Oi! Fizemos uma atualização geral no site da clínica, incluindo as páginas de
> tratamentos e 17 novos textos para o blog. Quando você tiver um tempo,
> consegue revisar o conteúdo e confirmar se as informações clínicas, os
> tratamentos descritos e a autoria de cada texto estão corretos?
>
> Também usamos fotos de pacientes nos artigos sobre profilaxia dental,
> recontorno estético com resina composta e reabilitação bucal com resina
> composta. Você consegue confirmar se esses pacientes autorizaram a publicação
> das imagens e se existe um TCLE ou outra autorização assinada para cada caso?
> Precisamos confirmar também qual dentista realizou cada procedimento, para que
> a autoria do artigo fique correta.
>
> No artigo de recontorno estético, pode confirmar se a sequência das fotos está
> correta como **inicial → planejamento → resultado**?
>
> Se alguma imagem ainda não tiver autorização confirmada, sem problema: podemos
> publicar o texto sem as fotos. Se puder, responda indicando quais conteúdos
> estão aprovados e quais imagens estão autorizadas. Antes de publicar
> comparações entre diagnóstico e resultado, precisamos também confirmar se esse
> uso já foi validado pelo advogado da clínica ou pelo CRO-PR.
>
> Para fechar também a parte administrativa e de divulgação, consegue nos
> confirmar estes pontos?
>
> 1. O advogado da clínica pode revisar e aprovar a Política de Privacidade e os
>    Termos de Uso atualizados? Precisamos confirmar também o nome jurídico de
>    quem responde pelo tratamento de dados (profissional ou clínica/CNPJ) e se
>    o e-mail `clinica_massoni@hotmail.com` deve ser o contato oficial para
>    privacidade.
> 2. Vocês preferem manter esse Hotmail no site ou criar
>    `contato@clinicamassoni.com.br`? Só faremos a troca depois que o novo
>    endereço estiver criado, testado e sob controle da clínica.
> 3. O domínio `clinicamassoni.com.br`, o repositório no GitHub, o projeto na
>    Vercel e a propriedade no Google Search Console estão em contas controladas
>    pela clínica? Se o Search Console já estiver ativo, podem confirmar quem é
>    o proprietário e liberar o acesso necessário para enviarmos novamente o
>    sitemap e pedirmos a indexação das páginas principais?
> 4. Podem confirmar os dados profissionais e as datas de formação e
>    especialização dos dois dentistas? Encontramos fontes públicas divergentes
>    sobre o ano da especialização do Dr. Enor, e o site também usa contagens de
>    anos que ficam desatualizadas com o tempo.
> 5. O nome oficial da clínica, endereço completo com sala/andar e CEP, telefone
>    e horário estão corretos? Há cadastros antigos na internet com endereço e
>    telefone diferentes. Se vocês tiverem acesso ao Perfil da Empresa no Google
>    e a esses diretórios, podemos preparar uma lista para correção.
> 6. A recepção consegue anotar, por 30 dias, quais contatos vieram do site e se
>    cada pessoa efetivamente agendou? Não precisamos registrar informação
>    clínica: basta data, canal (WhatsApp/telefone), assunto geral e
>    agendou/não agendou. Isso permitirá medir consultas marcadas, e não apenas
>    cliques.

### Ask Dr. Enor and Dr. Thiago

- [ ] **Clinical sign-off on all 17 posts and 9 treatment pages.** Nothing has
      been reviewed for medical accuracy. Suggested split so it runs in
      parallel: Enor takes his 10 posts + 7 pages, Thiago his 7 posts + 2 pages.
- [ ] **Who signs off, and how fast?** Still unanswered in the brief. Without a
      named reviewer and a turnaround, this stalls indefinitely.

### Patient photos — the three illustrated posts

Applies to `profilaxia-dental`, `recontorno-estetico-resina-composta` and
`reabilitacao-bucal-resina-composta`.

- [ ] **Is there a signed TCLE for each patient photographed?** Required by
      Resolução CFO-196/2019 *and*, independently, by the LGPD — clinical images
      are *dados pessoais sensíveis*.
- [ ] **Where will consent records live?** We need a register linking each
      published image to its signed form. Doesn't exist yet.
- [ ] **Which dentist personally performed each documented case?** Art. 4º of
      CFO-196/2019 forbids publishing a third party's clinical cases, so each
      post's byline must match the actual operator. This is a rule, not a
      preference.
- [ ] **Confirm the recontorno photo sequence.** I ordered them
      initial → planning → result, but the planning overlay appears to sit on
      the same frame as the result shot, which would make that order wrong.

> If consent can't be sorted quickly, these three posts can ship without images
> — the other 14 have no photo blocker at all.

### Needs the practice's lawyer or CRO-PR

- [ ] **Are diagnosis→conclusion image comparisons permitted?** Sources
      genuinely conflict: CFO's own guidance says yes under CFO-196/2019, but
      art. 44 XII of the Código de Ética — untouched by the 2025 amendment —
      still prohibits before/during/after imagery. We've taken the conservative
      reading; a professional should confirm it.

---

## 🟡 Blocking specific pages or features

### Ask the clinic

- [ ] **Which convênios are accepted?** Missing from the homepage FAQ, and it's
      one of the most-asked questions.
- [ ] **Payment terms** — ⚠️ ask counsel before publishing anything here. Art.
      44 I prohibits advertising prices, payment methods and free services, so
      the answer may be "we can't say this on the site."
- [ ] **Is the clinic offering clareamento dental?** It's not in the declared
      procedure list. If yes, it deserves a treatment page; if no, we leave it
      out deliberately.
- [ ] **Is the Rua Paraná address consult-only, or are procedures performed
      there too?** Changes which schema type is correct.
- [ ] **Google Maps share link** (the `maps.app.goo.gl` one, not the embed URL)
      — needed for schema `hasMap` and the contact CTA.
- [ ] **Landline in E.164 format** (e.g. `+554532233234`).

### Ask Dr. Enor

- [ ] **How many years — 34, 35, 38, or 41?** ⚠️ Four different figures are live,
      **three of them on the homepage alone**, where a visitor can see them
      contradict each other. Graduated 1984, so 41 is almost certainly right.
      This needs one answer and then a single source of truth.

      | Figure | Where |
      |---|---|
      | 41 anos | `layout.tsx` (meta description, OG, Twitter, keywords), `AboutSection.tsx:188` |
      | 35 anos | `HeroSection.tsx:49`, `ServicesSection.tsx:17` |
      | 34 anos | `constants.ts:15` — `DOCTOR_SPECIALTIES` |
      | 38 anos | `docs/PROJECT_OVERVIEW.md` |

      Until it's confirmed, `/sobre` strips the parenthetical from the specialty
      chip so it doesn't display "34 anos" directly under "1984".
- [ ] **Is the "Academia Brasileira de Osseointegração" membership real?** It
      appears only as an SEO keyword, never as a verified credential. If it's
      genuine it belongs in the schema `memberOf`; if not, it should stop
      appearing in the keyword list.
- [ ] **Top 10 questions patients actually ask in consultation.** The single
      richest source for future content — those questions *are* the search
      queries.

### Ask Dr. Thiago

- [ ] **Do the two resin articles reflect how you actually work?** They're
      bylined to him because composite resin is his registered specialty.
- [ ] **Is he in scope for his own treatment pages and bio?** The site is
      branded around Dr. Enor; confirm the engagement covers both.

---

## 🟢 Not blocking, but needed before this pays off

### Technical — you can do these

- [ ] **Confirm Search Console ownership and access.** Repository notes conflict:
      some say the property is synced and others say it is pending. The live
      site cannot prove dashboard access. Once confirmed, record the owner and
      resubmit the sitemap.
- [ ] **Resubmit the sitemap and request indexing on the new URLs.** 30 routes
      appear at once; GSC won't find them promptly on its own. Priority order is
      in `docs/launch-checklist.md` §4 — commercial pages before posts.
- [ ] **Change the apex → www redirect from temporary 307 to permanent 308 in
      Vercel Domains.** The repository rule is already permanent, but Vercel's
      current domain-level rule intercepts it first. The authenticated developer
      account does not currently have access to the clinic project.
- [ ] **Build the LGPD cookie consent gate before adding GA4/GTM.** Not a
      problem today — Vercel Analytics is cookieless — but adding GA4 without it
      creates one. Port the pattern from `analu-procto`.

### Ask the client

- [ ] **Approve the legal-page owner and privacy contact.** Ask counsel to
      review the final wording and confirm whether the controller is an
      individual professional or a clinic legal entity.
- [ ] **Confirm account ownership.** Domain registrar, GitHub, Vercel and Search
      Console should remain recoverable by an account controlled by the clinic,
      with at least two trusted administrators where the platform supports it.
- [ ] **Choose the official email.** Keep the working Hotmail address until
      `contato@clinicamassoni.com.br` exists, has recovery configured and has
      been tested for sending and receiving.
- [ ] **Confirm professional credentials and dates.** Do not reconcile public
      disagreements by guesswork; use diplomas/CRO records as the source of
      truth, then replace dynamic “years of experience” claims with stable dates
      or “mais de 40 anos”.
- [ ] **Confirm the canonical NAP data** (legal/business name, address including
      room/floor and CEP, phone and hours), then correct old directory listings
      and the Google Business Profile.
- [ ] **Run a 30-day reception attribution check.** Record website-originated
      WhatsApp/phone leads and whether each booked, without putting health data
      in analytics or the tracking sheet.

- [ ] **Do they want indexing without AI training?** `robots.ts` currently
      allows GPTBot, ClaudeBot, Google-Extended and Applebot-Extended, which are
      the training-adjacent crawlers. Removing them keeps search/answer
      visibility while opting out of training. It's their call, not a default.
- [ ] **Are patient testimonials wanted?** Listed as a Phase 3 feature. The
      advertising rules around them are unclear enough that we'd need counsel
      before building the component.
- [ ] **Which cities beyond Cascavel?** "Região oeste do Paraná" is implied by
      the keywords — Toledo, Foz do Iguaçu, Medianeira are guesses.
- [ ] **Competitor sites worth reviewing** (to differentiate from, not copy).
- [ ] **Launch date / deadline.** Nothing in the brief.

### Content follow-ups

- [ ] **Dr. Enor's own account of the 3D-guided workflow.** The
      `cirurgia-guiada-3d` post describes the technique generically; the Sirios
      scanner and Skycam setup is a real differentiator and his description
      would beat my draft.
- [ ] **An OG image** — none exists, and no dimensions are documented. Social
      shares currently fall back to the brand logo card.
- [ ] **"Cirurgião Dentista" vs "Cirurgião-Dentista".** The site renders the
      unhyphenated form; `docs/compliance-guidelines.md` §5 quotes the CFO's
      hyphenated spelling for the mandatory identification block. Trivial as
      typography, but it is their registered professional title, so it is
      theirs to settle rather than ours to silently rewrite.
      `tests/compliance.test.ts` accepts either form until then.

---

## Recurring

- [ ] **Re-run `/clinic-compliance-research`** when the CFO's advertising
      chapter rewrite lands (DECISÃO CFO-05-2025 — a special group is actively
      rewriting it). The current doc is dated 2026-08-04 and has a short shelf
      life.
- [ ] **Re-run `/clinic-seo-audit`** before launch and monthly after.
