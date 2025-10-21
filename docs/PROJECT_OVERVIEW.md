# PROJECT OVERVIEW - Dr. Enor Massoni Website

## Client Information

**Doctor Name**: Dr. Enor Massoni
**Specialties**:

- Implantes Dentários (Dental Implants)
- Cirurgia Buco-Maxilo-Facial (Oral and Maxillofacial Surgery)

**Registration**: CRO-PR 4982
**Location**: Cascavel, PR, Brazil
**Target Domain**: enormassoni.com.br (placeholder - domain TBD)

## Project Scope

### Phase 1: Landing Page (Current)

Single-page website with the following sections:

- Hero Section (with professional photo)
- About Section (doctor's credentials and approach)
- Services Section (dental implants + maxillofacial procedures)
- Photo Gallery (26 HEIC images from client)
- Contact Section (WhatsApp CTA, location map)

### Future Phases

- Blog system for patient education
- Online appointment booking
- Advanced SEO optimization
- Testimonials/reviews integration

## Technical Stack

### Core Framework

- **Next.js**: 15.x (App Router)
- **React**: 19.x
- **TypeScript**: 5.x
- **Package Manager**: Bun >= 1.2.0
- **Node.js**: >= 22.0.0

### Styling & UI

- **TailwindCSS**: v4 (with @tailwindcss/postcss)
- **Component Strategy**: Hybrid approach
  - shadcn/ui for complex components (forms, dialogs, accordions)
  - Custom components ported from analu-procto (Button, Header, Footer, Card)
- **Icons**: lucide-react
- **Fonts**: Google Fonts via next/font/google
- **Utilities**: clsx, tailwind-merge, class-variance-authority

### SEO & Analytics

- **Structured Data**: schema.org (Dentist + Medical Organization)
- **Analytics**:
  - Vercel Analytics
  - Google Analytics 4 (consent-based)
  - Google Tag Manager (consent-based)
- **Cookie Consent**: LGPD-compliant (ported from analu-procto)
- **Meta Tags**: Comprehensive Open Graph + Twitter Cards

### Development Tools

- **Linting**: ESLint with Next.js config
- **Testing**: Vitest + React Testing Library (optional for Phase 1)
- **Bundle Analysis**: @next/bundle-analyzer
- **Performance**: Lighthouse auditing

## Project Structure

```bash
/workspace/jobs/massoni/
├── web/                          # Next.js application root
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx       # Root layout with SEO
│   │   │   ├── page.tsx         # Landing page
│   │   │   ├── globals.css      # Global styles + CSS variables
│   │   │   └── sitemap.ts       # Dynamic sitemap
│   │   ├── components/
│   │   │   ├── ui/              # Reusable UI components
│   │   │   │   ├── Button.tsx   # Ported from analu-procto
│   │   │   │   ├── Header.tsx   # Custom navigation
│   │   │   │   ├── Footer.tsx   # Custom footer
│   │   │   │   ├── Card.tsx     # Custom card component
│   │   │   │   └── LinkButton.tsx
│   │   │   ├── sections/        # Landing page sections
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── AboutSection.tsx
│   │   │   │   ├── ServicesSection.tsx
│   │   │   │   ├── GallerySection.tsx
│   │   │   │   └── ContactSection.tsx
│   │   │   ├── layout/          # Layout components
│   │   │   │   └── CookieConsent.tsx
│   │   │   └── analytics/       # Analytics components
│   │   │       └── AnalyticsProvider.tsx
│   │   ├── lib/
│   │   │   ├── constants.ts     # App constants
│   │   │   ├── structured-data.ts # Schema.org generation
│   │   │   ├── navigation.ts    # Nav configuration
│   │   │   └── utils.ts         # Utility functions (cn, etc.)
│   │   └── hooks/               # Custom React hooks
│   ├── public/
│   │   ├── images/              # Optimized images
│   │   │   ├── logo.svg         # Converted from PDF
│   │   │   ├── logo.png         # Fallback
│   │   │   ├── hero.webp        # Hero image
│   │   │   ├── about.webp       # About section image
│   │   │   ├── og.png           # Open Graph image
│   │   │   └── gallery/         # Gallery images (WebP)
│   │   └── fonts/               # Custom fonts (if any)
│   ├── tailwind.config.ts       # Tailwind configuration
│   ├── next.config.ts           # Next.js configuration
│   ├── package.json             # Dependencies
│   ├── bun.lockb                # Bun lockfile
│   ├── tsconfig.json            # TypeScript config
│   ├── .eslintrc.json           # ESLint config
│   └── CLAUDE.md                # Project-specific AI instructions
├── PROJECT_OVERVIEW.md          # This file
├── BRAND_IDENTITY.md            # Brand guide
├── CONTENT_STRATEGY.md          # Content & SEO strategy
├── COMPONENT_ARCHITECTURE.md    # Component design
├── ASSET_PROCESSING.md          # Image processing guide
├── ACTION_PLAN.md               # Execution steps
└── [26 HEIC images + PDF logo]  # Source assets

```

## Development Workflow

### Local Development

```bash
cd /Users/diegovfeder/workspace/jobs/massoni/web
bun install
bun run dev          # Start development server on localhost:3000
```

### Production Build

```bash
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
```

### Quality Assurance

```bash
bun run analyze      # Analyze bundle sizes
bun run lighthouse   # Run Lighthouse audit locally
```

## Reference Architecture

This project is based on the proven architecture from `/workspace/jobs/analu-procto`, which features:

### Successfully Ported Patterns

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

## Key Differences from analu-procto

| Aspect | analu-procto | massoni/web |
|--------|--------------|-------------|
| **Specialty** | Coloproctologia | Odontologia + Cirurgia Maxilofacial |
| **Location** | Curitiba, PR | Cascavel, PR |
| **Components** | 100% custom | Hybrid (shadcn + custom) |
| **Gallery** | PhotoSection (small) | GallerySection (26+ images) |
| **Blog** | Full MDX system | Not in Phase 1 |
| **Package Manager** | Bun | Bun |
| **Color Palette** | Brown/beige medical | TBD from logo extraction |

## Next Steps

1. Extract logo from PDF and generate color palette (see BRAND_IDENTITY.md)
2. Convert HEIC images to WebP format (see ASSET_PROCESSING.md)
3. Define component architecture (see COMPONENT_ARCHITECTURE.md)
4. Plan content and SEO strategy (see CONTENT_STRATEGY.md)
5. Execute project setup (see ACTION_PLAN.md)
