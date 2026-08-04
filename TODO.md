# TODO — open questions for the client

Everything the build is waiting on, grouped by who can answer it. Each item says
what it blocks, so you can decide what's worth chasing first.

Sources: `docs/client-brief.md`, `docs/compliance-guidelines.md` §10,
`docs/content-plan.md`, `docs/launch-checklist.md`.

**Last updated:** 2026-08-04

---

## 🔴 Blocking publication

Nothing goes live until these clear.

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

- [ ] **How many years — 34, 38, or 41?** The repo currently says all three in
      different places. Schema says graduated 1984, which makes 41 most likely.
      This is already live on the homepage.
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

- [x] ~~Verify Search Console~~ — **already synced.** If it was verified by DNS
      or file upload rather than the meta tag, `GOOGLE_SITE_VERIFICATION` can
      stay unset; the tag is conditional and simply omits itself.
- [ ] **Resubmit the sitemap and request indexing on the new URLs.** 30 routes
      appear at once; GSC won't find them promptly on its own. Priority order is
      in `docs/launch-checklist.md` §4 — commercial pages before posts.
- [ ] **Verify the apex → www 301 at the Vercel domain level**, not just in
      `next.config.ts`.
- [ ] **Build the LGPD cookie consent gate before adding GA4/GTM.** Not a
      problem today — Vercel Analytics is cookieless — but adding GA4 without it
      creates one. Port the pattern from `analu-procto`.

### Ask the client

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

---

## Recurring

- [ ] **Re-run `/clinic-compliance-research`** when the CFO's advertising
      chapter rewrite lands (DECISÃO CFO-05-2025 — a special group is actively
      rewriting it). The current doc is dated 2026-08-04 and has a short shelf
      life.
- [ ] **Re-run `/clinic-seo-audit`** before launch and monthly after.
