# Clínica Massoni

Production website for Clínica Massoni in Cascavel, Paraná. The application is
built with the Next.js App Router, React, strict TypeScript, Tailwind CSS and
Bun. It includes treatment pages, an educational blog, structured data and
attributed phone/WhatsApp calls to action.

## Local development

Requirements: Bun and a current Chromium installation for Playwright/Lighthouse.

```bash
bun install
bun run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
bun run lint
bun run test
bun run build
bun run test:e2e
bun audit --production
```

There is no contact-form backend or patient database in this repository. Do not
commit secrets, patient data, consent records or account-recovery information.

## Structure

- `app/`: routes, metadata, sitemap, robots and global styles
- `app/src/components/`: shared UI, layout and page sections
- `app/src/lib/`: clinic constants, analytics, content and schema helpers
- `content/posts/`: blog source content
- `public/`: static images and public machine-readable files
- `tests/` and `e2e/`: unit/compliance and browser checks
- `docs/`: strategy, compliance and operating handoff

When changing public copy or images, update the relevant documentation and
metadata registry together. Clinical claims, professional credentials and
patient media require the approvals recorded in `TODO.md`.

## Deployment and ownership

Production is hosted on Vercel with `www.clinicamassoni.com.br` as the canonical
host. Deployment does not prove ownership of the registrar, Vercel, GitHub or
Search Console accounts. Keep those assets in clinic-controlled accounts and
store recovery details outside the repository.

Start with:

- `docs/CURRENT_STATE.md` for the current handoff snapshot
- `docs/POST_LAUNCH_OPERATIONS.md` for Search Console, conversion measurement,
  redirect verification and maintenance
- `docs/launch-checklist.md` for release validation
- `docs/compliance-guidelines.md` before publishing clinical content
