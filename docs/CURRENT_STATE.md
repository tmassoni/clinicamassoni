# Rodada SEO — 2026-11-11

Esta seção atualiza o handoff; o snapshot de agosto abaixo é histórico.

- Leitura inicial: árvore limpa, sem PRs abertos. Novos PRs de rascunho:
  [#13 — título da home e contrato de intenção local](https://github.com/tmassoni/clinicamassoni/pull/13)
  e [#14 — cartão com retratos reais](https://github.com/tmassoni/clinicamassoni/pull/14).
  Não foram mesclados; código em PR não significa mudança publicada.
- O repositório já associa os 17 posts aos 9 tratamentos e contém `/sobre`.
  Alguns briefs e textos abaixo ainda descrevem fases anteriores.
- Search Console **não foi consultado**: host do navegador indisponível e
  tentativas no Chrome expiraram. Curva mensal, CTR, consultas locais, lacunas
  e 404 com impressões continuam desconhecidos. Não há estimativa de ganho.
- HTTP público verificado: domínio sem www ainda retorna **307**; sitemap
  com www retorna **200**. Nenhuma configuração externa foi alterada.
- Diagnóstico com fatos, hipóteses, lacunas e medição:
  [seo-diagnostico-2026-11.md](seo-diagnostico-2026-11.md).
- Pesquisa futura: [brief](pesquisa/brief.md) e
  [pauta provisória](pesquisa/pauta-posts-2026-11.md). Nenhum texto clínico
  publicado foi alterado; pesquisa e revisão dos dentistas precedem a redação.
- Ambiente desta rodada: Bun 1.3.1, Node 24.18.0. Para build/E2E, definir
  `NODE_ENV=production`; a sessão herdava `development`, que quebrou o prerender.
- Ordem sugerida: #13, depois #14; são independentes. Revisar CI e preview
  de cada um antes da decisão humana de merge. Após publicação aprovada,
  medir 28 dias completos antes × depois por página e consulta.

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
- **Search Console:** repository history conflicts about whether the property is
  configured. Confirm the owner in the dashboard, resubmit the sitemap, request
  indexing for priority treatment pages and check results after 7–14 days.
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
