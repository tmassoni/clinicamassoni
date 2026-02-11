# CLAUDE.md - Dr. Enor Massoni Website

This file provides guidance to Claude Code (claude.ai/code) when working with this codebase.

## Project Overview

**Client**: Dr. Enor Massoni
**Specialty**: Implantes Dentários (Dental Implants) e Cirurgia Bucomaxilofacial (Oral & Maxillofacial Surgery)
**Registration**: CRO-PR 4982
**Location**: Cascavel, PR, Brazil
**Domain**: clinicamassoni.com.br (TBD)

### Project Type

Single-page landing website for a dental practice with focus on:

- Professional credibility and trust building
- Local SEO for Cascavel, PR market
- Patient conversion (WhatsApp/phone contact)
- Modern, accessible design
- Gallery showcase of facilities and equipment

## Technical Stack

### Core Framework

- **Next.js**: 15.5.6 (App Router, Turbopack enabled)
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Node.js**: >= 22.0.0 required
- **Package Manager**: **Bun** (>= 1.2.0) ⚠️ CRITICAL - Always use `bun` commands, never `npm`

### Styling & UI

- **Tailwind CSS**: v4 (using `@theme` syntax, NO traditional tailwind.config.ts)
- **UI Components**: Hybrid approach
  - **shadcn/ui**: Complex interactive components (carousel, dialog, form, accordion)
  - **Custom components**: Ported from reference project analu-procto (Button, Card, Header, Footer)
- **Icons**: lucide-react
- **Fonts**: Google Fonts via next/font/google
  - Sans-serif: Inter
  - Serif: Playfair Display

### Dependencies

```json
{
  "@next/third-parties": "Analytics integration",
  "@vercel/analytics": "Vercel Analytics",
  "@vercel/speed-insights": "Performance monitoring",
  "class-variance-authority": "Button variants",
  "clsx": "Class merging",
  "tailwind-merge": "Tailwind class merging",
  "lucide-react": "Icons",
  "react-hook-form": "Form handling",
  "zod": "Form validation",
  "@hookform/resolvers": "React Hook Form + Zod integration",
  "embla-carousel-react": "Gallery carousel"
}
```

### Development Tools

- **Linting**: ESLint with Next.js config (eslint.config.mjs)
- **Bundle Analysis**: @next/bundle-analyzer (available but not configured)
- **Git**: Repository initialized locally

## Project Structure

### Directory Layout

```bash
web/
├── app/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # Reusable UI components
│   │   │   │   ├── Button.tsx   # Custom (CVA-based, 8 variants)
│   │   │   │   ├── LinkButton.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Divider.tsx
│   │   │   │   ├── accordion.tsx    # shadcn/ui
│   │   │   │   ├── dialog.tsx       # shadcn/ui
│   │   │   │   ├── carousel.tsx     # shadcn/ui
│   │   │   │   ├── form.tsx         # shadcn/ui
│   │   │   │   ├── input.tsx        # shadcn/ui
│   │   │   │   ├── textarea.tsx     # shadcn/ui
│   │   │   │   └── label.tsx        # shadcn/ui
│   │   │   ├── sections/        # Landing page sections
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── AboutSection.tsx
│   │   │   │   ├── ServicesSection.tsx
│   │   │   │   ├── GallerySection.tsx
│   │   │   │   ├── ContactSection.tsx
│   │   │   │   └── index.ts     # Barrel export
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Footer.tsx
│   │   │   └── icons/
│   │   │       ├── Whatsapp.tsx
│   │   │       └── index.ts
│   │   └── lib/
│   │       ├── utils.ts         # cn() utility
│   │       ├── constants.ts     # App constants
│   │       ├── structured-data.ts # Schema.org JSON-LD
│   │       ├── navigation.ts    # Nav items
│   │       └── gallery-data.ts  # Gallery configuration
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   └── globals.css              # Global styles + @theme
├── public/
│   └── images/
│       ├── logo.svg             # Logo (vector)
│       ├── logo.png             # Logo fallback
│       ├── hero.webp            # Hero image
│       └── gallery/             # Gallery images (WebP)
│           ├── gallery-01.webp
│           └── ... (24 images total)
├── docs/                        # ⚠️ Read these for context
│   ├── PROJECT_OVERVIEW.md
│   ├── BRAND_IDENTITY.md
│   ├── COMPONENT_ARCHITECTURE.md
│   ├── CONTENT_STRATEGY.md
│   ├── ASSET_PROCESSING.md
│   ├── ACTION_PLAN.md
│   └── GALLERY_MANAGEMENT.md
├── package.json
├── bun.lock
├── tsconfig.json
├── components.json              # shadcn/ui config
├── next.config.ts
├── eslint.config.mjs
└── CLAUDE.md                    # This file
```

### Key Path Aliases

Configured in tsconfig.json:

```json
{
  "@/*": ["./*"]  // Maps to project root
}
```

**Usage**:

```typescript
import { Button } from '@/app/src/components/ui/Button'
import { DR_NAME } from '@/app/src/lib/constants'
import type { Metadata } from 'next'
```

⚠️ **Important**: Components are in `app/src/components/`, NOT just `app/components/`

## Brand System

### Color Palette

Extracted from logo, WCAG AAA compliant:

```css
/* Brand Colors (globals.css @theme) */
--color-primary: #042B48;           /* Dark blue - primary brand */
--color-secondary: #3C576A;         /* Medium blue */
--color-tertiary: #6A7E8B;          /* Light blue-gray */
--color-accent: #C8CFD3;            /* Very light blue-gray */
--color-brand-primary: #042B48;     /* CTA buttons */
--color-background: #ffffff;        /* Page background */

/* Text Hierarchy */
--color-text-heading: #1a1a1a;     /* Headings - 14.8:1 contrast */
--color-text-body: #333333;        /* Body text - 12.6:1 contrast */
--color-text-muted: #666666;       /* Metadata - 5.7:1 contrast */

/* Card Backgrounds */
--color-card-bg: #f8f9fa;
--color-card-bg-hover: #f0f1f3;

/* Subtle Elements */
--color-border-subtle: #e5e7eb;
--color-bg-subtle: #fafbfc;

/* Brand Shadows */
--shadow-brand: 0 4px 14px 0 rgba(4, 43, 72, 0.15);
--shadow-brand-lg: 0 10px 25px 0 rgba(4, 43, 72, 0.2);
```

### Typography

**Fonts** (loaded in app/layout.tsx):

- **Sans-serif**: Inter (body text, UI)
- **Serif**: Playfair Display (headings, hero)

**Scale**:

- H1: 2.25rem (36px)
- H2: 1.5rem (24px)
- H3: 1.25rem (20px)
- Body: 1rem (16px)
- Line heights: 1.2-1.75 (tighter for headings, relaxed for body)

## Component Architecture

### Hybrid Strategy

**Custom Components** (from analu-procto reference):

- Button.tsx - 8 variants using class-variance-authority
- LinkButton.tsx - Link wrapper with button styling
- Card.tsx - Consistent card container
- Badge.tsx - Small label component
- Divider.tsx - Visual separator
- Header.tsx - Sticky navigation with mobile menu
- Footer.tsx - Footer with contact info

**shadcn/ui Components**:

- accordion - FAQ sections
- dialog - Image lightbox, modals
- carousel - Gallery (embla-carousel)
- form/input/textarea/label - Contact form with validation

### Component Usage Patterns

#### Button Component

```tsx
import { Button } from '@/app/src/components/ui/Button'

// Variants: default, primary, secondary, subtle, outline, ghost, link, destructive
// Sizes: sm, default, lg, xl, icon
<Button variant="primary" size="lg">
  Agende sua consulta
</Button>
```

#### LinkButton Component

```tsx
import { LinkButton } from '@/app/src/components/ui/LinkButton'

<LinkButton
  href="https://wa.me/5545XXXXXXXXX"
  external
  newTab
  variant="primary"
>
  WhatsApp
</LinkButton>
```

#### Gallery Section

```tsx
// Gallery managed via app/src/lib/gallery-data.ts
// See docs/GALLERY_MANAGEMENT.md for reorganization
import { GallerySection } from '@/app/src/components/sections'
```

## Code Standards

### General Principles

1. **Early returns** for better readability
2. **Const over function**: Use `const ComponentName = () => {}` instead of `function`
3. **TailwindCSS only** - NO inline CSS, NO `<style>` tags
4. **Descriptive naming**:
   - Event handlers: `handleClick`, `handleSubmit`, `handleChange`
   - Boolean props: `isOpen`, `hasError`, `shouldShow`
5. **TypeScript types** defined when possible
6. **Accessibility**: tabindex, aria-label, keyboard handlers, WCAG AA minimum
7. **DRY principles**: Extract repeated patterns

### Tailwind CSS v4 Specifics

⚠️ **IMPORTANT**: This project uses Tailwind v4 with `@theme` syntax

**DO**:

```css
/* globals.css */
@theme {
  --color-custom: #042B48;
  --spacing-custom: 4.5rem;
}
```

**DON'T**:

```typescript
// ❌ NO tailwind.config.ts theme extension
export default {
  theme: {
    extend: { colors: { ... } }  // This won't work with v4
  }
}
```

### TypeScript Conventions

```typescript
// Prefer interface for component props
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'lg'
  children: React.ReactNode
}

// Use type for unions, mapped types
type GalleryCategory = 'facilities' | 'equipment' | 'team'

// Const assertions for readonly data
export const navItems = [
  { href: '#sobre', label: 'Sobre' },
] as const
```

## Development Workflow

### Common Commands

```bash
# Development server (Turbopack enabled)
bun run dev              # localhost:3000

# Production build
bun run build
bun run start

# Linting
bun run lint

# Install dependencies (ALWAYS use bun)
bun install
bun add <package>        # Add dependency
bun add -d <package>     # Add dev dependency
```

⚠️ **NEVER use npm commands** - this project uses Bun exclusively

### Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>

# Example: Add new component
npx shadcn@latest add tabs
```

This will:

1. Add component to `app/src/components/ui/`
2. Auto-configure imports based on components.json
3. Apply project's Tailwind theme

### Image Management

**Formats**:

- Logo: SVG (primary), PNG (fallback)
- Photos: WebP (converted from HEIC)
- Quality: 90% for gallery, 100% for logo

**Next.js Image Component**:

```tsx
import Image from 'next/image'

<Image
  src="/images/gallery/gallery-01.webp"
  alt="Consultório Dr. Enor Massoni - Cascavel PR"
  width={1920}
  height={1280}
  sizes="(max-width: 768px) 100vw, 50vw"
  quality={90}
  loading="lazy"  // or priority for above-fold
/>
```

See `docs/ASSET_PROCESSING.md` for image optimization guide.

## Content Strategy

### Target Keywords (SEO)

**Primary**:

- implantes dentários Cascavel
- dentista Cascavel
- cirurgia bucomaxilofacial Cascavel
- enor massoni
- CRO PR 4982

**Secondary**:

- all-on-4 Cascavel
- protocolo dentário Cascavel
- cirurgia ortognática Cascavel
- extração siso Cascavel

### CTAs (Call-to-Actions)

**Primary**: WhatsApp contact (Brazilian preference)

```tsx
<LinkButton href={`https://wa.me/${WHATSAPP_NUMBER}`}>
  Agende sua consulta pelo WhatsApp
</LinkButton>
```

**Secondary**: Phone, email

### Structured Data

Schema.org JSON-LD implemented in `app/src/lib/structured-data.ts`:

- Dentist
- MedicalBusiness
- LocalBusiness
- MedicalProcedure
- WebSite

See `docs/CONTENT_STRATEGY.md` for full SEO strategy.

## Configuration Files

### next.config.ts

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90, 95],  // Image quality levels
  },
}
```

**Note**: No custom webpack config, no experimental features enabled yet.

### components.json (shadcn/ui)

```json
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",  // Not used with v4
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",   // ⚠️ Incorrect - actual path is @/app/src/components
    "utils": "@/lib/utils"          // ⚠️ Incorrect - actual path is @/app/src/lib/utils
  }
}
```

⚠️ **Known Issue**: components.json aliases don't match actual project structure. Manually adjust imports when adding shadcn components.

### tsconfig.json

- Target: ES2017
- Strict mode: Enabled
- Path alias: `@/*` maps to root (`./*`)
- Module resolution: bundler (Bun-compatible)

## Reference Project

This project is adapted from **analu-procto** (medical practice website):

**Location**: `/Users/diegovfeder/workspace/jobs/analu-procto/`

**Key Learnings**:

- Component architecture patterns
- Medical website content approach
- WCAG AAA color system
- LGPD cookie consent (not implemented yet in massoni)
- Blog system with MDX (future phase)

**Differences**:

- Specialty: Dentistry vs. Proctology
- Location: Cascavel vs. Curitiba
- UI library: shadcn/ui hybrid vs. 100% custom
- Gallery: 24 images vs. small photo section

## Documentation Files

⚠️ **Always read relevant docs before making changes**

Located in `/Users/diegovfeder/workspace/jobs/massoni/web/docs/`:

1. **PROJECT_OVERVIEW.md** - Complete project scope, tech stack, structure
2. **BRAND_IDENTITY.md** - Logo processing, color extraction, typography
3. **COMPONENT_ARCHITECTURE.md** - Component inventory, porting guide, patterns
4. **CONTENT_STRATEGY.md** - SEO keywords, meta tags, structured data
5. **ASSET_PROCESSING.md** - Image conversion (HEIC→WebP), optimization
6. **ACTION_PLAN.md** - Step-by-step implementation guide (8-hour plan)
7. **GALLERY_MANAGEMENT.md** - How to reorganize gallery images

**When to consult**:

- Adding features → ACTION_PLAN.md
- Modifying components → COMPONENT_ARCHITECTURE.md
- Changing colors → BRAND_IDENTITY.md
- Gallery changes → GALLERY_MANAGEMENT.md
- SEO/content → CONTENT_STRATEGY.md

## Common Tasks

### Add a new page section

1. Create component in `app/src/components/sections/NewSection.tsx`
2. Export from `app/src/components/sections/index.ts`
3. Import and add to `app/page.tsx`
4. Add anchor link to `app/src/lib/navigation.ts`

### Modify gallery

1. Edit `app/src/lib/gallery-data.ts`
2. Change category, add/remove images
3. See `docs/GALLERY_MANAGEMENT.md` for details

### Update contact information

Edit `app/src/lib/constants.ts`:

```typescript
export const WHATSAPP_NUMBER = '5545991492390'
export const PHONE_NUMBER = '(45) 3223-3234'
export const EMAIL = 'clinica_massoni@hotmail.com'
```

### Add FAQ section

1. Install shadcn accordion (if not already): `npx shadcn@latest add accordion`
2. Create `FAQSection.tsx` in sections/
3. Use accordion component with question/answer data

## Performance Targets

Based on Lighthouse audits:

| Metric | Target | Current |
|--------|--------|---------|
| Performance | 90+ | TBD |
| Accessibility | 100 | TBD |
| Best Practices | 100 | TBD |
| SEO | 100 | TBD |

**Optimization strategies**:

- WebP images (90% quality)
- Lazy loading (except hero)
- Next.js Image optimization
- Minimal JavaScript bundle
- Font optimization (next/font)

## Deployment

**Platform**: Vercel (recommended for Next.js)

**Environment Variables** (.env.local):

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          # Google Analytics
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX         # Google Tag Manager
```

**Build command**: `bun run build`
**Output**: `.next/` directory
**Port**: 3000 (dev), 3000 (production default)

## Troubleshooting

### Build errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
bun install

# Type check
bun run tsc --noEmit
```

### Component imports not working

Check path:

- ✅ `@/app/src/components/ui/Button`
- ❌ `@/components/ui/Button` (components.json alias is wrong)

### Tailwind classes not applying

1. Check `app/globals.css` has `@import "tailwindcss"`
2. Verify class is defined in `@theme` block
3. Restart dev server (`bun run dev`)

### Images not loading

1. Verify path: `/images/gallery/image.webp` (no leading `/public`)
2. Check file exists in `public/images/`
3. Use Next.js Image component, not `<img>`

## Future Enhancements

**Phase 2** (see ACTION_PLAN.md):

- Cookie consent banner (port from analu-procto)
- Analytics provider component
- FAQ section with accordion
- Blog system (MDX-based)

**Phase 3**:

- Online appointment booking
- Patient testimonials
- Before/after gallery (with consent)
- Video virtual tour

## Support & Contacts

**Project Path**: `/Users/diegovfeder/workspace/jobs/massoni/web/`
**Reference Project**: `/Users/diegovfeder/workspace/jobs/analu-procto/`
**Git**: Initialized locally (not pushed to remote yet)

## Quick Reference

```bash
# Start development
cd /Users/diegovfeder/workspace/jobs/massoni/web
bun install
bun run dev

# Add shadcn component
npx shadcn@latest add <component>

# Check documentation
cat docs/PROJECT_OVERVIEW.md        # Project scope
cat docs/GALLERY_MANAGEMENT.md      # Gallery editing
cat docs/COMPONENT_ARCHITECTURE.md  # Component patterns

# Build for production
bun run build
bun run start
```

---

**Last Updated**: October 2025
**Project Status**: Phase 1 - Landing page in development
**Next Steps**: See docs/ACTION_PLAN.md for detailed roadmap
