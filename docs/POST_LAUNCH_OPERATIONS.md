# Post-launch operations

Operational handoff for turning search visibility into confirmed appointments.
This document deliberately separates facts visible in the repository from
actions that require access to the clinic's external accounts.

**Last updated:** 2026-08-10

## Search Console: establish one source of truth

Repository notes previously disagreed about whether the property was verified.
Do not mark it complete until somebody can open the property and name its owner.

Once access is confirmed:

1. Open the canonical `https://www.clinicamassoni.com.br` property.
2. Submit `https://www.clinicamassoni.com.br/sitemap.xml` again.
3. Inspect and request indexing for `/tratamentos` first, followed by:
   - `/tratamentos/implantes-dentarios`
   - `/tratamentos/cirurgia-bucomaxilofacial`
   - `/tratamentos/protese-dentaria`
   - `/tratamentos/dentistica-restauradora`
   - `/blog`
4. After 7–14 days, record indexed-page status, exclusions, impressions,
   queries, average position and CTR for those URLs.
5. Review monthly. High impressions with low CTR calls for a title/description
   test; positions 4–10 call for better intent coverage and internal links.

## Connect visibility to appointments

The site records a `cta_click` event for WhatsApp and phone links, including the
channel, section and page path. A click is an intent signal, not an appointment.

Use this three-part funnel:

| Stage | Source | Minimum fields |
|---|---|---|
| Search visibility | Search Console | landing page, query, impressions, clicks, CTR, position |
| Contact intent | Vercel Analytics | `cta_click`, page path, channel, section |
| Outcome | Reception | date, website lead, channel, general treatment category, booked yes/no |

Reception should not add symptoms, diagnoses, images, exam results or other
health data to the attribution sheet. Review aggregate totals monthly:
website leads, bookings and lead-to-booking rate.

Before relying on custom events, confirm that `cta_click` appears in the Vercel
dashboard for the clinic's current plan.

## External ownership register

Store recovery details in the clinic's password manager, not in this repository.

| Asset | Required owner | Status |
|---|---|---|
| Domain registrar and DNS | Clinic-controlled account | Client confirmation pending |
| GitHub repository | Clinic-controlled organization/account | Client confirmation pending |
| Vercel project | Clinic-controlled team/account | Developer access pending |
| Google Search Console | Clinic-controlled Google account | Status and owner pending |
| Google Business Profile | Clinic-controlled Google account | Access pending |

Where supported, keep two trusted administrators and verify recovery email,
phone and two-factor authentication annually.

## Domain redirect

The repository declares the apex-to-`www` redirect as permanent, which Next.js
serves as HTTP 308. On 2026-08-10 the live apex domain still returned a Vercel
domain-level 307 before the application rule ran.

In Vercel, open the clinic project, go to **Settings → Domains**, edit
`clinicamassoni.com.br`, redirect it to `www.clinicamassoni.com.br`, choose
**Permanent redirect**, save, and verify:

```bash
curl -I https://clinicamassoni.com.br/
```

The expected response is `308` with
`location: https://www.clinicamassoni.com.br/`. Test a nested path too.

## Local listings and professional facts

Before editing any directory, confirm one canonical set of facts with the
clinic: business/legal name, full address including room/floor and CEP, phone,
hours, website and professional credentials. Public listings currently contain
conflicting address, phone and specialization-year information.

Audit the Google Business Profile first, then the highest-visibility old
directories. Record the listing URL, current value, requested correction,
account owner and completion date. Use diplomas and CRO records—not another
directory—as the source of truth for credentials.

## Maintenance cadence

- Monthly: Search Console queries/indexing, CTA events, reception bookings,
  broken links and production Core Web Vitals.
- Quarterly: package audit, dependency updates, structured-data validation and
  local-listing consistency.
- Annually: account ownership/recovery, legal-page wording, professional facts,
  contact details and consent records.
