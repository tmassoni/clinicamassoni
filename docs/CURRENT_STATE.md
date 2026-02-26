# Current State (2026-02-26)

## Snapshot
- Branch in progress: `codex/seo-performance-indexing`
- Domain target: `https://www.clinicamassoni.com.br`
- Stack: Next.js 16.1.6 (App Router), React 19, Tailwind 4
- SEO/perf work already applied in PR #1:
  - Canonical domain handling and redirect from apex to `www`
  - `robots.txt` and `sitemap.xml` generated from app routes
  - Metadata and JSON-LD structured data for clinic + doctor
  - Image pipeline tuned for better quality/performance balance
  - Hero image priority and responsive sizing tuned for mobile

## Title And Name Check
- Doctor name source is centralized in constants:
  - `DOCTOR_NAME = "Dr. Enor Massoni"`
- Title composition is correct through layout template (`%s | Dr. Enor Massoni`):
  - Home: `Dentista em Cascavel: Implantes e Cirurgia Buco-Maxilo-Facial | Dr. Enor Massoni`
  - Privacy: `Política de Privacidade | Dr. Enor Massoni`
  - Terms: `Termos de Uso | Dr. Enor Massoni`

## Current SEO/Indexing Status
- Good:
  - Metadata base and canonical configured for production domain
  - Open Graph/Twitter tags present
  - Structured data in place (`Dentist`, `MedicalBusiness`, `LocalBusiness`, etc.)
  - Crawl directives currently allow indexing
- Still pending for stronger Google visibility:
  - Google Search Console verification value in env (`GOOGLE_SITE_VERIFICATION`)
  - Manual sitemap submission inside Search Console
  - Google Business Profile website field should point to production domain
  - Ongoing content expansion for location + service intent pages

## Analytics And Observability
- Already active:
  - `@vercel/analytics`
  - `@vercel/speed-insights`
- Not yet active:
  - GA4 / GTM (`ANALYTICS_GA_ID` and `ANALYTICS_GTM_ID` are empty and unused)

## Recommended Next Steps (Priority Order)
1. Merge PR #1 and deploy to production.
2. Add Google Search Console verification env var and submit sitemap.
3. Add GA4 (and optionally GTM) using `@next/third-parties` with env-based IDs.
4. Run Lighthouse on production URL (mobile) and capture baseline in `docs/`.
5. Create dedicated SEO landing pages over time (e.g. implantes, cirurgia periodontal, cirurgia bucomaxilofacial in Cascavel).
6. Add monthly SEO/technical audit routine (CWV, indexing, rankings, broken links).

## Vercel Notes
- If deploying on Vercel:
  - Ensure production domain is set to `www.clinicamassoni.com.br`
  - Keep apex (`clinicamassoni.com.br`) redirecting to `www`
  - Confirm environment variables are configured in Production and Preview

## Merge Readiness
- Metadata/title setup is consistent and doctor name is correct.
- Main remaining items are operational (Search Console + GA4), not blockers for merge.
