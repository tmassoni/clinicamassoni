# Repository Guidelines

## Project Structure & Module Organization

The site runs on the Next.js App Router. Top-level layout, global styles, and route entry points live in `app/`. Feature code resides in `app/src`: `components/ui` hosts reusable primitives (largely Shadcn-based), `components/layout` wraps shared shells, and `components/sections` assembles homepage slices. Domain-specific data, helpers, and configs live in `app/src/lib`. Static assets belong in `public/`. Strategy, content, and product notes sit in `docs/`; update them when changing UX copy or gallery assets.

## Build, Test, and Development Commands

Install dependencies with `bun install`. During development run `bun run dev` for the Turbopack dev server. Use `bun run build` to produce an optimized production bundle and `bun run start` to preview it locally. Run `bun run lint` before opening a PR; it executes the shared ESLint config and catches most TypeScript or accessibility regressions.

## Coding Style & Naming Conventions

The project uses strict TypeScript, React 19 function components, and Tailwind CSS 4 utility classes. Keep indentation at 2 spaces and wrap JSX props across lines when they exceed roughly 100 characters. Components and files that export React elements use PascalCase (`HeroSection.tsx`), utility modules use camelCase (`gallery-data.ts`), and hooks should be prefixed with `use`. Import paths rely on the `@/` alias from the repo root—avoid relative dot paths. Run ESLint (and format with your editor) before committing; no standalone formatter is enforced yet, so mirror the surrounding style.

## Testing Guidelines

Automated tests are not configured yet. When you contribute, describe the manual verification you performed (e.g., viewport checks, form submissions) in the PR. If you add a test harness, colocate component specs under `app/src` with a `.spec.tsx` suffix and wire the command through `package.json` so `bun run test` can be adopted consistently.

## Commit & Pull Request Guidelines

Follow the existing Conventional Commit style: `type(scope?): short imperative summary` (e.g., `feat(ui): add gallery section`). Combine related changes in a single commit whenever practical. Pull requests should include a concise summary, reference related docs or issues, list the commands/tests executed, and attach before/after screenshots or recordings for visible UI work. Request review once checks pass, and keep the description updated as feedback lands.

## Documentation & Asset Updates

When modifying gallery imagery or content, keep metadata in `app/src/lib/gallery-data.ts` in sync and update any relevant briefs in `docs/`. Store new media under `public/` with descriptive kebab-case filenames to simplify updates.

## Current Project State

For a live handoff snapshot (SEO status, metadata/title checks, merge readiness, and prioritized next steps), see:

- `docs/CURRENT_STATE.md`
