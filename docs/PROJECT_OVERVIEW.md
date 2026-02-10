# Project Guide – Dr. Enor Massoni Website

## Snapshot

- Single-page marketing site for `Dr. Enor Massoni – Implantes e Cirurgia Maxilofacial`, live in the Next.js App Router (`app/`).
- Tech stack: Next.js 15, React 19, TypeScript (strict, no emit), Tailwind CSS 4, shadcn-based UI primitives, Bun scripts.
- Contact, SEO, and clinic metadata live in `app/src/lib/constants.ts`; keep this file authoritative for any copy or structured data changes.

## Key Paths

| Area | Location | Notes |
| ---- | -------- | ----- |
| Layout & routing | `app/layout.tsx`, `app/page.tsx`, `app/(...)` | Global providers, metadata, and page assembly. |
| Components | `app/src/components` | `sections/` renders each homepage slice; `ui/` mixes shadcn clones (accordion, dialog) with custom buttons/cards; `layout/` exposes header/footer/flyouts. |
| Data & helpers | `app/src/lib` | `gallery-data.ts` drives categories/order, `structured-data.ts` builds JSON-LD, `utils.ts` hosts `cn`. |
| Assets | `public/images` | Hero + gallery WebP files; keep naming `gallery-XX.webp`. Logos remain pending final client export (see TODO). |
| Documentation | `docs/` | Working notes: this guide (`PROJECT_OVERVIEW.md`). |

## Runbook

```bash
bun install          # dependencies
bun run dev          # turbopack dev server
bun run build        # production bundle
bun run start        # serve build locally
bun run lint         # eslint 9 / next rules
```

Deploy previews currently run through local builds; add further scripts (tests, analyze) only when tooling lands.

## Content & UX Notes

- Homepage sections cover hero, about, services, gallery carousel, and contact CTA. Animations lean on Tailwind utilities; keep timings consistent (200–300ms).
- Gallery management: drop new WebP files in `public/images/gallery/`, then register them in `gallery-data.ts` with descriptive `alt` text and one of the existing categories (`facilities`, `equipment`, `team`, `procedures`). Categories are type-checked—adjust the union if you introduce new ones.
- Copywriting guidelines: highlight “Cirurgia e Traumatologia Bucomaxilofacial” as the only title; present implant expertise as experience, not specialization.
- The 22/10/2025 interview anchors messaging around 38 years practicing in Cascavel, humanized care, 3D guided surgeries, strict biosafety, and multi-generation trust—make sure long-form copy reflects those pillars.
- Analytics placeholders (`ANALYTICS_GA_ID`, `ANALYTICS_GTM_ID`) remain empty—update via environment variables or constants when the client provides IDs.


1. **Single-page landing structure** with section components
2. **WCAG AAA compliant color system** with CSS variables
3. **LGPD-compliant cookie consent** system
4. **Comprehensive structured data** for SEO
5. **Button component** with 8 variants using CVA
6. **Mobile-first responsive design**
7. **Animation patterns** using CSS transitions
8. **Accessibility standards** (keyboard nav, focus rings, ARIA labels)

### Adaptations for Dental Practice

1. **Different medical specialty** (dentistry vs. proctology)
2. **Different location SEO** (Cascavel PR vs. Curitiba PR)
3. **Hybrid component strategy** (shadcn/ui + custom components)
4. **Photo gallery emphasis** (26 images showcasing practice/results)
5. **Dental-specific keywords** and content strategy

## Success Metrics

### Technical Performance

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 100
- Lighthouse Best Practices: 100
- Lighthouse SEO: 100

### SEO Targets

- Google ranking for "implantes dentários Cascavel"
- Google ranking for "cirurgia maxilofacial Cascavel"
- Google ranking for "dentista Cascavel"
- Local SEO optimization for Cascavel PR

### User Experience

- Mobile-first responsive design
- Fast page load (<3s on 3G)
- WCAG AA minimum compliance (AAA preferred)
- Intuitive navigation and CTAs

## Next Steps

1. Extract logo from PDF and generate color palette (see BRAND_IDENTITY.md)
2. Convert HEIC images to WebP format (see ASSET_PROCESSING.md)
3. Define component architecture (see COMPONENT_ARCHITECTURE.md)
4. Plan content and SEO strategy (see CONTENT_STRATEGY.md)
5. Execute project setup (see ACTION_PLAN.md)
