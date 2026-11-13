# Revisão do handoff — 13/11/2026

O snapshot de agosto abaixo é histórico. Esta seção o atualiza no que foi
verificado na revisão do PR #15.

- `origin/main` em `4128901`: #13 (título), #14 (cartão), #16 (bruxismo) e #17
  (perimplantite) já mesclados. Implantação e aprovação clínica não verificadas.
- Inventário no código: 19 posts, 9 tratamentos e 6 páginas estáticas, 34 URLs.
- Search Console lido pelo navegador em 13/11 (11/08–10/11, Web, sem outros
  filtros): 52 cliques, 6,04 mil impressões, CTR 0,9%, posição 11,9. Dados desde
  18/03/2026. Tabelas de páginas, consultas e série mensal versionadas em
  `docs/evidencias/`.
- Achados: home e recontorno somam 33 dos 52 cliques; recontorno tem 40% das
  impressões com CTR 0,5% na posição 8,4; consultas locais ("dentista
  cascavel") quase não aparecem; ~75% das impressões vêm de consultas
  anonimizadas. Depois do blog (10/08) as impressões cresceram ~5×, os cliques não.
- [Diagnóstico e propostas](seo-diagnostico-2026-11.md),
  [brief de pesquisa](pesquisa/brief.md) e
  [estado da pauta](pesquisa/pauta-posts-2026-11.md).
- Próxima etapa: aprovar (ou não) a revisão de título/descrição do post de
  recontorno e verificar o Perfil da Empresa. Nenhum redirect ou conteúdo
  clínico foi alterado.

---

# Current state (2026-08-10)

## Production snapshot

- Canonical site: `https://www.clinicamassoni.com.br`
- Stack: Next.js 16.3.0, React 19, Tailwind CSS 4 and Bun
- Live sitemap: 32 canonical URLs
- Content: homepage, about page, 9 treatment pages and 17 blog posts
- Measurement: Vercel Web Analytics, Speed Insights and attributed
  WhatsApp/phone `cta_click` events
- Dependency check after PR #7: `bun audit --production` reports no known
  production vulnerabilities

## Verified in the repository

- Canonical metadata, sitemap, robots directives and structured data are
  generated from shared content/constants.
- Security headers and permanent application redirects are configured in
  `next.config.ts`.
- The legal pages now describe the services actually present, publish a fixed
  revision date and provide a privacy email.
- CTA events include the landing path, channel and page section.
- Unit, compliance, link, accessibility and smoke test suites are available.

## External actions still pending

- **Vercel domain:** the live apex currently returns a temporary 307. Change the
  project-domain redirect to permanent 308. The developer account authenticated
  during this pass did not have access to the clinic project.
- **Search Console:** desempenho lido em 13/11 (ver diagnóstico). Ainda não
  conferidos: proprietários, estado do sitemap e cobertura de indexação.
- **Legal approval:** the clinic's lawyer should approve the privacy policy and
  terms and confirm the legal controller/contact details.
- **Ownership:** confirm that domain/DNS, GitHub, Vercel, Search Console and the
  Google Business Profile are recoverable by clinic-controlled accounts.
- **Business facts:** confirm professional credentials/dates and one canonical
  name/address/CEP/phone/hours set before correcting old listings.
- **Email:** keep the working Hotmail address until a clinic-controlled
  `contato@clinicamassoni.com.br` mailbox is created, secured and tested.

## Production performance baseline

An isolated mobile Lighthouse run on 2026-08-10 scored 86 Performance, 100
Accessibility, 100 Best Practices and 100 SEO. LCP was 3.6 s and CLS was 0. The
hero resource loaded quickly; most LCP time was render delay. This follow-up
reduces mobile hero paint effects and replaces approximately 119 KB of
high-priority favicon downloads with purpose-sized icons under 4 KB combined.

Re-measure the Vercel preview and production deployment under the same mobile
conditions before comparing results. Field data in Speed Insights is the source
of truth once sufficient traffic is available.

The first local production-build Lighthouse run after the change scored 93
Performance, 100 Accessibility, 96 Best Practices and 100 SEO, with LCP 3.3 s,
CLS 0 and 461 KiB transferred. The local Best Practices score is capped by the
expected 404 responses for Vercel scripts outside Vercel; the production
baseline did not have those errors. Treat the performance movement as
directional until the preview is measured under the production edge.

## Operating handoff

Use `docs/POST_LAUNCH_OPERATIONS.md` for Search Console submission, appointment
attribution, ownership, redirect verification, listing cleanup and maintenance
cadence. Client and counsel questions are collected in the ready-to-send
Portuguese message in `TODO.md`.

## Merge readiness

Repository work is ready when lint, unit tests, build and end-to-end checks pass.
The external actions above should remain visibly open; they cannot be proven by
the source tree or completed without the clinic's account access and approval.
