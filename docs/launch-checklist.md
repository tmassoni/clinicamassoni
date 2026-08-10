# Launch Checklist

What has to happen around the deploy for the SEO work to actually take effect.
Ordered: blockers first, then platform, then submission, then the loop.

**Last updated:** 2026-08-10

## 1. Blockers — nothing publishes until these clear

- [ ] **Clinical sign-off on all 17 posts and 9 service pages.** Neither
      practitioner has reviewed the copy. Suggested split so it runs in
      parallel: Dr. Enor reviews his 10 posts + 7 pages; Dr. Thiago his 7 posts
      + 2 pages.
- [ ] **TCLE per patient** for the three illustrated posts
      (`profilaxia-dental`, `recontorno-estetico-resina-composta`,
      `reabilitacao-bucal-resina-composta`), with a consent register that links
      each published image to its signed form. Required by both the council and
      the LGPD.
- [ ] **Confirm who personally performed each documented case.** Art. 4º of
      Resolução CFO-196/2019 forbids publishing a third party's clinical cases,
      so each illustrated post's byline must match the operator.
- [ ] Run the pre-publish checklist in `docs/compliance-guidelines.md` §8 once
      more against the final copy.

If the TCLE items can't clear quickly, the three illustrated posts can ship
without images — remove the `![]()` lines and their registry entries; the tests
will flag anything missed.

## 2. Platform configuration

- [x] **Canonical host redirect in code** — apex → `www`, permanent **308**, in
      `next.config.ts` `redirects()`.
- [x] Security headers (X-Frame-Options, X-Content-Type-Options,
      Referrer-Policy, HSTS, Permissions-Policy), `compress`,
      `poweredByHeader: false`
- [x] `images.formats: ['image/avif', 'image/webp']`
- [ ] **Confirm Search Console ownership in the dashboard.** Repository notes
      conflict, and an unset meta-verification env var neither proves nor
      disproves DNS/file verification.
- [x] Production serves `https://www.clinicamassoni.com.br`.
- [ ] Change Vercel's domain-level apex redirect from temporary 307 to permanent
      308, then verify the root and one nested path.

## 3. Analytics — order matters

- [x] Vercel Analytics + Speed Insights (cookieless — no consent gate needed)
- [ ] **Do not add GA4/GTM before the LGPD consent gate exists.** The IDs in
      `constants.ts` are intentionally empty. Adding them now would introduce a
      consent problem the site does not currently have. Port the
      `CookieConsent` + consent-gated analytics provider pattern from
      `analu-procto` first.
- [x] `cta_click` custom event fires on every CTA with page path, channel and
      section. Confirm it appears on the clinic's current Vercel plan.
- [ ] Reception records which website leads actually book for 30 days; clicks
      alone are not appointments. See `docs/POST_LAUNCH_OPERATIONS.md`.

## 4. Search Console — after deploy

- [ ] Property owner and access confirmed in the dashboard
- [ ] **Resubmit `https://www.clinicamassoni.com.br/sitemap.xml`.** It grows
      from 4 URLs to 32 in this release; a resubmit prompts a recrawl rather
      than waiting for the scheduled one.
- [ ] Request indexing, in this order — commercial intent first:
      1. `/tratamentos`
      2. `/tratamentos/implantes-dentarios`
      3. `/tratamentos/cirurgia-bucomaxilofacial`
      4. `/tratamentos/protese-dentaria`
      5. `/tratamentos/dentistica-restauradora`
      6. `/blog`
      7. The remaining service pages, then posts (the sitemap will pick these up
         on its own; manual requests are for the pages you care about first)
- [ ] Check indexing and queries after 7–14 days, including exclusions and the
      "alternate page with proper canonical tag" bucket specifically — it should
      be empty.

## 5. Validate the structured data

- [ ] [Rich Results Test](https://search.google.com/test/rich-results) on one
      page of each type: `/`, `/tratamentos/implantes-dentarios`,
      `/blog/profilaxia-dental`
- [ ] Confirm `FAQPage` is detected and that the visible FAQ text matches the
      schema exactly (a mismatch is a penalty, not a bonus)
- [ ] Confirm the `Physician` / `Dentist` node resolves with its
      `hasCredential` chain — this is the E-E-A-T payload for a YMYL site

## 6. Not done — decide whether to do them

| Item | Why it's open |
|---|---|
| **LGPD cookie consent** | Not a live exposure today (see §3), but a prerequisite for GA4. |
| **Homepage `FAQPage`** | Built, but two questions patients demonstrably ask are missing because the answers aren't in the brief: accepted convênios, and payment terms. Note art. 44 I prohibits advertising prices and payment methods, so the second may not be publishable — confirm with counsel. |

### Lighthouse baseline — isolated mobile run on production, 2026-08-10

| Route | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 86 | 100 | 100 | 100 | 3.6 s | 0 |

The hero's element render delay—not its transfer—was the main LCP contributor.
The follow-up removes mobile blur layers, reduces image quality from 90 to 85
and replaces roughly 119 KB of high-priority icon requests with purpose-sized
favicons under 4 KB combined. Re-run against the preview and then production.

First local production-build result after the change: 93 Performance, 100
Accessibility, 96 Best Practices, 100 SEO, LCP 3.3 s, CLS 0 and 461 KiB. The
Best Practices difference is the expected local-only Vercel script 404; use a
preview deployment for the comparable result.

Reproduce:

```bash
bun run build && bun run start --port 4399
npx lighthouse http://localhost:4399/ \
  --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless=new" --view
```

## 7. The loop, once live

Monthly, per `docs/seo-strategy.md`:

| Signal | Action |
|---|---|
| High impressions, low CTR | Test title/description, preserving accuracy |
| Position 4–10 | Improve intent match, depth, internal links — highest ROI |
| Wrong URL ranking | Fix ownership / cannibalization in the table |
| Ranking but no bookings | Fix the journey and CTA relevance, not the ranking |

Re-run `/clinic-seo-audit` before launch and monthly after. Re-run
`/clinic-compliance-research` when the CFO's advertising-chapter rewrite lands
(DECISÃO CFO-05-2025) — the compliance doc is dated and has a short shelf life.
