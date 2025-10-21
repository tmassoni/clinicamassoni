# ACTION PLAN - Dr. Enor Massoni Website

## Overview

This document provides a sequential, step-by-step plan for building the Dr. Enor Massoni website from scratch. Follow these steps in order for optimal results.

**Estimated Time**: 6-8 hours
**Complexity**: Moderate (requires Next.js, Tailwind, and component knowledge)

## Prerequisites

Before starting, ensure you have:
- [ ] Node.js >= 22.0.0 installed
- [ ] Bun >= 1.2.0 installed
- [ ] Git installed and configured
- [ ] VSCode or preferred editor
- [ ] Read all planning documents in this folder

## Phase 0: Asset Preparation (2 hours)

### Step 0.1: Logo Extraction

**Goal**: Extract logo from PDF and create web-optimized versions

```bash
cd /Users/diegovfeder/workspace/jobs/massoni/

# Install ImageMagick if not installed
brew install imagemagick inkscape

# Extract logo to SVG (preferred)
inkscape "Logo em PDF.pdf" \
  --export-type=svg \
  --export-filename=logo.svg \
  --export-plain-svg

# Also create PNG version
convert -density 300 "Logo em PDF.pdf" \
  -quality 100 \
  -background transparent \
  -alpha on \
  logo.png

# Optimize SVG
npm install -g svgo
svgo logo.svg -o logo-optimized.svg
```

**Verification**: Check that logo.svg and logo.png are created

### Step 0.2: Color Palette Extraction

**Goal**: Extract primary, secondary, and accent colors from logo

**Manual Method**:
1. Open logo.svg in Figma or Adobe Illustrator
2. Use eyedropper tool to extract exact hex values
3. Document 3-5 colors
4. Test contrast ratios at https://webaim.org/resources/contrastchecker/

**Automated Method**:
```bash
# Extract dominant colors
convert logo.png -colors 5 -unique-colors txt:- | grep -v ImageMagick
```

**Document Results** in a temporary file:
```
PRIMARY_COLOR=#[HEX]
SECONDARY_COLOR=#[HEX]
TERTIARY_COLOR=#[HEX]
```

### Step 0.3: Image Conversion

**Goal**: Convert all 26 HEIC images to WebP format

```bash
cd /Users/diegovfeder/workspace/jobs/massoni/

# Create temporary output directory
mkdir -p temp-converted-images

# Batch convert all HEIC files
counter=1
for file in IMG_*.HEIC; do
  magick "$file" \
    -quality 90 \
    -resize 1920x1920\> \
    -strip \
    "temp-converted-images/gallery-$(printf "%02d" $counter).webp"
  echo "Converted: $file → gallery-$(printf "%02d" $counter).webp"
  ((counter++))
done
```

**Verification**: Check that 26 .webp files exist in temp-converted-images/

**Select Hero Image**: Review all images and choose the best professional photo of Dr. Massoni for hero section. Rename it to `hero-candidate.webp`

## Phase 1: Project Initialization (30 minutes)

### Step 1.1: Create Next.js Project

```bash
cd /Users/diegovfeder/workspace/jobs/massoni/

# Create new Next.js project using Bun
bun create next-app web --typescript --tailwind --app --no-src --import-alias "@/*"

# Navigate to project
cd web
```

**Configuration during setup**:
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ App Router
- ❌ src/ directory (use root structure)
- ✅ Import alias (@/*)

### Step 1.2: Install Core Dependencies

```bash
cd /Users/diegovfeder/workspace/jobs/massoni/web

# Install dependencies
bun add @next/third-parties @vercel/analytics @vercel/speed-insights
bun add class-variance-authority clsx tailwind-merge lucide-react
bun add react-hook-form zod @hookform/resolvers/zod

# Install dev dependencies
bun add -d @types/node @types/react @types/react-dom
bun add -d @next/bundle-analyzer
```

### Step 1.3: Initialize shadcn/ui

```bash
npx shadcn@latest init
```

**Configuration**:
- Style: Default
- Base color: [Use extracted primary color]
- CSS variables: Yes
- Tailwind prefix: (leave blank)
- Global CSS: app/globals.css
- TypeScript: Yes
- Import alias components: @/components
- Import alias utils: @/lib/utils

### Step 1.4: Install shadcn Components

```bash
npx shadcn@latest add accordion
npx shadcn@latest add dialog
npx shadcn@latest add carousel
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add label
```

### Step 1.5: Project Structure Setup

```bash
# Create directory structure
mkdir -p components/{ui,sections,layout,analytics}
mkdir -p lib
mkdir -p hooks
mkdir -p data
mkdir -p public/images/{gallery}

# Move converted images
mv ../temp-converted-images/*.webp public/images/gallery/
mv ../logo.svg public/images/
mv ../logo.png public/images/

# Copy hero image
cp public/images/gallery/[CHOSEN_NUMBER].webp public/images/hero.webp
```

### Step 1.6: Initialize Git Repository

```bash
git init
git add .
git commit -m "feat: initialize Next.js project with Tailwind and shadcn/ui"
```

## Phase 2: Configuration (1 hour)

### Step 2.1: Update Tailwind Config

**File**: `tailwind.config.ts`

Replace content with (update colors from extraction):

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#[EXTRACTED_PRIMARY]',
          secondary: '#[EXTRACTED_SECONDARY]',
          tertiary: '#[EXTRACTED_TERTIARY]',
        },
        primary: '#[EXTRACTED_PRIMARY]',
        secondary: '#[EXTRACTED_SECONDARY]',
        background: '#ffffff',
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      screens: {
        'xs': '450px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'brand': '0 4px 14px 0 rgba([R], [G], [B], 0.15)',
        'brand-lg': '0 10px 25px 0 rgba([R], [G], [B], 0.2)',
      },
      maxWidth: {
        'container': '1432px',
      },
    },
  },
  plugins: [],
}

export default config
```

### Step 2.2: Update globals.css

**File**: `app/globals.css`

Replace with (update colors):

```css
@import "tailwindcss";

@theme {
  /* Brand Colors */
  --color-primary: #[EXTRACTED_PRIMARY];
  --color-secondary: #[EXTRACTED_SECONDARY];
  --color-tertiary: #[EXTRACTED_TERTIARY];
  --color-brand-primary: #[EXTRACTED_PRIMARY];
  --color-background: #ffffff;

  /* Text Hierarchy (WCAG AAA) */
  --color-text-heading: #1a1a1a;
  --color-text-body: #333333;
  --color-text-muted: #666666;

  /* Card Backgrounds */
  --color-card-bg: #f8f9fa;
  --color-card-bg-hover: #f0f1f3;

  /* Subtle Elements */
  --color-border-subtle: #e5e7eb;
  --color-bg-subtle: #fafbfc;
}

@layer base {
  html {
    scroll-behavior: smooth;
    @apply bg-background;
  }

  body {
    @apply min-h-screen font-sans bg-background;
    overscroll-behavior: none;
  }

  main {
    @apply max-w-[1760px] mx-auto;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-serif font-medium;
  }

  h1 {
    @apply text-4xl sm:text-5xl lg:text-6xl leading-tight;
  }

  h2 {
    @apply text-2xl sm:text-3xl lg:text-4xl leading-tight;
  }

  h3 {
    @apply text-xl sm:text-2xl lg:text-3xl leading-tight;
  }

  p {
    @apply mb-2 leading-relaxed max-w-prose;
  }

  section, [id] {
    scroll-margin-top: 100px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}

@layer components {
  .container {
    @apply max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12;
  }

  .section {
    @apply pb-16 pt-8;
  }

  .text-heading {
    color: var(--color-text-heading);
  }

  .text-body {
    color: var(--color-text-body);
  }

  .text-muted {
    color: var(--color-text-muted);
  }

  .bg-card {
    background-color: var(--color-card-bg);
  }

  .bg-card-hover {
    background-color: var(--color-card-bg-hover);
  }
}
```

### Step 2.3: Create Constants File

**File**: `lib/constants.ts`

```typescript
export const DR_NAME = 'Dr. Enor Massoni'
export const CRO_TEXT = 'CRO-PR 4982'
export const SPECIALTY = 'Implantes Dentários e Cirurgia Bucomaxilofacial'
export const WEBSITE_URL = 'https://enormassoni.com.br'

// TODO: Get actual contact information from client
export const WHATSAPP_NUMBER = '+5545XXXXXXXXX'
export const WHATSAPP_FORMATTED = '(45) XXXXX-XXXX'
export const PHONE_NUMBER = '(45) XXXX-XXXX'
export const EMAIL = 'contato@enormassoni.com.br'
export const INSTAGRAM_URL = 'https://www.instagram.com/[HANDLE]/'
export const INSTAGRAM_HANDLE = '@[HANDLE]'

export const CLINIC_INFO = {
  name: 'Dr. Enor Massoni - Implantes e Cirurgia Maxilofacial',
  address: '[Rua, Número]',
  neighborhood: '[Bairro]',
  city: 'Cascavel',
  state: 'PR',
  cep: '[CEP]',
  phone: PHONE_NUMBER,
  whatsapp: WHATSAPP_FORMATTED,
  coordinates: {
    latitude: -24.9555, // Cascavel approximate - update with actual
    longitude: -53.4552,
  },
  openingHours: 'Mo-Fr 08:00-18:00', // Update with actual
}
```

### Step 2.4: Create Navigation Config

**File**: `lib/navigation.ts`

```typescript
export const navigationItems = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#contato', label: 'Contato' },
]
```

### Step 2.5: Create Structured Data

**File**: `lib/structured-data.ts`

```typescript
import { DR_NAME, CLINIC_INFO, WHATSAPP_FORMATTED, CRO_TEXT } from './constants'

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Dentist',
      '@id': 'https://enormassoni.com.br/#dentist',
      name: DR_NAME,
      jobTitle: 'Cirurgião Dentista - Implantodontista e Bucomaxilofacial',
      description:
        'Especialista em Implantes Dentários e Cirurgia Bucomaxilofacial em Cascavel, Paraná.',
      image: '/images/og.png',
      url: 'https://enormassoni.com.br',
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Registro Profissional',
          identifier: CRO_TEXT,
          recognizedBy: {
            '@type': 'Organization',
            name: 'Conselho Regional de Odontologia do Paraná',
            alternateName: 'CRO-PR',
            url: 'https://www.cropr.org.br',
          },
        },
      ],
      medicalSpecialty: [
        'Implantodontia',
        'Cirurgia Bucomaxilofacial',
        'Cirurgia Ortognática',
        'Traumatologia Maxilofacial',
      ],
      telephone: WHATSAPP_FORMATTED,
      address: {
        '@type': 'PostalAddress',
        streetAddress: CLINIC_INFO.address,
        addressLocality: CLINIC_INFO.city,
        addressRegion: CLINIC_INFO.state,
        addressCountry: 'BR',
        postalCode: CLINIC_INFO.cep,
      },
    },
    {
      '@type': 'MedicalBusiness',
      '@id': 'https://enormassoni.com.br/#organization',
      name: 'Dr. Enor Massoni - Implantes e Cirurgia Maxilofacial',
      url: 'https://enormassoni.com.br',
      description:
        'Clínica odontológica especializada em implantes dentários e cirurgia bucomaxilofacial em Cascavel, PR.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: CLINIC_INFO.address,
        addressLocality: CLINIC_INFO.city,
        addressRegion: CLINIC_INFO.state,
        addressCountry: 'BR',
        postalCode: CLINIC_INFO.cep,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: CLINIC_INFO.coordinates.latitude,
        longitude: CLINIC_INFO.coordinates.longitude,
      },
      telephone: WHATSAPP_FORMATTED,
      priceRange: '$$',
      openingHours: CLINIC_INFO.openingHours,
      areaServed: {
        '@type': 'City',
        name: 'Cascavel',
        addressRegion: 'Paraná',
        addressCountry: 'Brasil',
      },
    },
  ],
}

export function getStructuredData() {
  return JSON.stringify(structuredData)
}
```

## Phase 3: Component Porting (3 hours)

### Step 3.1: Port Button Component

**Source**: Copy from `/workspace/jobs/analu-procto/src/components/ui/Button.tsx`

**File**: `components/ui/Button.tsx`

1. Copy the entire Button.tsx file
2. Update color references to match new brand palette
3. Test all variants

### Step 3.2: Port LinkButton Component

**Source**: Copy from `/workspace/jobs/analu-procto/src/components/ui/LinkButton.tsx`

**File**: `components/ui/LinkButton.tsx`

Copy entire file (should work without changes)

### Step 3.3: Port Card Component

**Source**: Copy from `/workspace/jobs/analu-procto/src/components/ui/Card.tsx`

**File**: `components/ui/Card.tsx`

Copy entire file

### Step 3.4: Port Badge Component

**Source**: Copy from `/workspace/jobs/analu-procto/src/components/ui/Badge.tsx`

**File**: `components/ui/Badge.tsx`

Copy entire file

### Step 3.5: Port Header Component

**Source**: Adapt from `/workspace/jobs/analu-procto/src/components/ui/Header.tsx`

**File**: `components/ui/Header.tsx`

1. Copy file structure
2. Replace imports: `import { navigationItems } from '@/lib/navigation'`
3. Replace doctor name with `DR_NAME` constant
4. Update logo path: `/images/logo.svg`
5. Update CTA text: "Agendar Consulta"

### Step 3.6: Port Footer Component

**Source**: Adapt from `/workspace/jobs/analu-procto/src/components/ui/Footer.tsx`

**File**: `components/ui/Footer.tsx`

1. Copy file structure
2. Replace all constants with massoni constants
3. Update credentials: CRO instead of CRM
4. Update social links

### Step 3.7: Port CookieConsent Component

**Source**: Copy from `/workspace/jobs/analu-procto/src/components/layout/CookieConsent.tsx`

**File**: `components/layout/CookieConsent.tsx`

1. Copy entire file
2. Update text references to "Dr. Enor Massoni"

### Step 3.8: Port AnalyticsProvider Component

**Source**: Copy from `/workspace/jobs/analu-procto/src/components/analytics/AnalyticsProvider.tsx`

**File**: `components/analytics/AnalyticsProvider.tsx`

Copy entire file (no changes needed)

**Also create**: `components/analytics/index.ts`
```typescript
export { AnalyticsProvider } from './AnalyticsProvider'
```

## Phase 4: Section Components (2 hours)

### Step 4.1: Create HeroSection

**File**: `components/sections/HeroSection.tsx`

```typescript
import Image from 'next/image'
import { LinkButton } from '@/components/ui/LinkButton'
import { WHATSAPP_NUMBER, DR_NAME } from '@/lib/constants'

export function HeroSection() {
  return (
    <section
      className="section relative isolate bg-background pt-16 md:pt-18"
      id="hero"
    >
      <div className="mx-auto max-w-container">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8 xl:gap-12">
          <div className="order-1 lg:order-2 lg:flex-1 w-full">
            <Image
              src="/images/hero.webp"
              alt={`${DR_NAME}, cirurgião dentista especialista em implantes dentários e cirurgia bucomaxilofacial em Cascavel, PR`}
              width={960}
              height={1200}
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
              className="w-full h-auto object-contain lg:shadow-2xl"
              priority
            />
          </div>

          <div className="order-2 lg:order-1 flex-shrink-0 text-center lg:text-left lg:flex-1 px-6 pt-16 lg:pt-28 sm:px-8 lg:px-10 xl:px-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-primary mb-6">
              Implantes Dentários e Cirurgia Maxilofacial em Cascavel
            </h1>

            <p className="text-xl lg:text-2xl font-sans text-body-color mb-8">
              Sorriso completo e saúde facial com tecnologia de ponta e atendimento humanizado
            </p>

            <LinkButton
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              external
              newTab
              variant="primary"
              size="xl"
              className="shadow-lg hover:shadow-xl"
            >
              Agende sua consulta agora
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Step 4.2: Create AboutSection

**File**: `components/sections/AboutSection.tsx`

Create based on analu-procto pattern with Dr. Massoni content

### Step 4.3: Create ServicesSection

**File**: `components/sections/ServicesSection.tsx`

Create with 3 service cards:
1. Implantes Dentários
2. Cirurgia Bucomaxilofacial
3. Cirurgias Orais

### Step 4.4: Create GallerySection

**File**: `components/sections/GallerySection.tsx`

Use shadcn Carousel component with gallery images

### Step 4.5: Create ContactSection

**File**: `components/sections/ContactSection.tsx`

Use shadcn Form components for contact form

### Step 4.6: Create Barrel Export

**File**: `components/sections/index.ts`

```typescript
export { HeroSection } from './HeroSection'
export { AboutSection } from './AboutSection'
export { ServicesSection } from './ServicesSection'
export { GallerySection } from './GallerySection'
export { ContactSection } from './ContactSection'
```

## Phase 5: Layout & Pages (1 hour)

### Step 5.1: Update Root Layout

**File**: `app/layout.tsx`

```typescript
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import CookieConsent from '@/components/layout/CookieConsent'
import { AnalyticsProvider } from '@/components/analytics'
import { DR_NAME, WEBSITE_URL, SPECIALTY } from '@/lib/constants'
import { getStructuredData } from '@/lib/structured-data'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_URL),
  title: {
    default: `${DR_NAME} - ${SPECIALTY} em Cascavel | CRO-PR 4982`,
    template: `%s | ${DR_NAME} - Dentista Cascavel`,
  },
  description:
    `${DR_NAME}, especialista em ${SPECIALTY} em Cascavel, PR. Atendimento moderno e humanizado para reabilitação oral e cirurgias faciais. CRO-PR 4982.`,
  keywords: [
    'implantes dentários Cascavel',
    'dentista Cascavel',
    'cirurgia bucomaxilofacial Cascavel',
    'enor massoni',
    'CRO PR 4982',
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: WEBSITE_URL,
    title: `${DR_NAME} - ${SPECIALTY} em Cascavel`,
    description: `Especialista em ${SPECIALTY} em Cascavel, Paraná.`,
    siteName: `${DR_NAME} - Odontologia`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: getStructuredData(),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <Header />
        {children}
        <Footer />
        <CookieConsent />
        <AnalyticsProvider />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Step 5.2: Update Home Page

**File**: `app/page.tsx`

```typescript
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  GallerySection,
  ContactSection,
} from '@/components/sections'

export default function Home() {
  return (
    <main id="main" className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <ContactSection />
    </main>
  )
}
```

### Step 5.3: Create Sitemap

**File**: `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'
import { WEBSITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: WEBSITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

## Phase 6: Testing & Optimization (1 hour)

### Step 6.1: Development Testing

```bash
bun run dev
```

Visit http://localhost:3000 and test:
- [ ] Hero section renders with image
- [ ] All sections render correctly
- [ ] Navigation works (smooth scroll)
- [ ] Mobile menu works
- [ ] WhatsApp links work
- [ ] Cookie consent appears and functions
- [ ] Gallery carousel works
- [ ] Contact form validates

### Step 6.2: Build Test

```bash
bun run build
bun run start
```

Check for build errors and verify production build works

### Step 6.3: Lighthouse Audit

```bash
# Install lighthouse if needed
npm install -g lighthouse

# Run audit on local dev server
bun run dev  # In one terminal
lighthouse http://localhost:3000 --view  # In another
```

**Target scores**:
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### Step 6.4: Fix Issues

Common issues and fixes:
- **Low performance**: Optimize images further, reduce bundle size
- **Accessibility**: Add missing alt tags, improve contrast
- **SEO**: Add missing meta tags, improve structured data

## Phase 7: Deployment (30 minutes)

### Step 7.1: Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

(Get actual IDs from client)

### Step 7.2: Create Vercel Project

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

Follow prompts:
- Link to existing project or create new
- Set environment variables
- Deploy

### Step 7.3: Configure Domain

1. Add custom domain in Vercel dashboard
2. Update DNS records as instructed
3. Wait for SSL certificate

### Step 7.4: Post-Deployment Checks

- [ ] Visit production URL
- [ ] Test all functionality
- [ ] Run Lighthouse on production
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics (if not using GTM)

## Phase 8: Client Handoff (30 minutes)

### Step 8.1: Create CLAUDE.md

**File**: `web/CLAUDE.md`

Document the project for future AI assistance (use analu-procto CLAUDE.md as template)

### Step 8.2: Create README.md

**File**: `web/README.md`

Basic usage instructions for client

### Step 8.3: Content Checklist

Create list of placeholders to fill:
- [ ] Contact information (phone, WhatsApp, email)
- [ ] Clinic address and coordinates
- [ ] Opening hours
- [ ] Social media links
- [ ] Google Analytics IDs
- [ ] About section content (education, experience)
- [ ] Service descriptions
- [ ] Gallery image descriptions/categories

### Step 8.4: Training Materials

Create simple guide for client:
- How to update contact info
- How to add/remove gallery images
- How to update services
- How to check analytics

## Verification Checklist

### Functionality
- [ ] All sections render correctly
- [ ] Navigation works (smooth scroll)
- [ ] Mobile responsive on all screen sizes
- [ ] WhatsApp links open correctly
- [ ] Contact form validates input
- [ ] Cookie consent works (accept/reject/dismiss)
- [ ] Analytics loads only after consent
- [ ] Gallery carousel navigates
- [ ] Images load with proper lazy loading

### SEO
- [ ] Meta tags present and correct
- [ ] Structured data validates (use schema.org validator)
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Images have descriptive alt text
- [ ] Heading hierarchy is logical
- [ ] Canonical URL set correctly

### Performance
- [ ] Lighthouse Performance > 90
- [ ] All images optimized (WebP format)
- [ ] No console errors
- [ ] Fast page load (< 3s on 3G)

### Accessibility
- [ ] Lighthouse Accessibility = 100
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] ARIA labels present
- [ ] Color contrast WCAG AA minimum

### Brand
- [ ] Logo displays correctly
- [ ] Colors match brand palette
- [ ] Fonts load correctly
- [ ] Shadows use brand colors
- [ ] Consistent spacing

## Common Issues & Solutions

### Issue: Images not loading
**Solution**: Check paths are correct, ensure images are in public/ folder

### Issue: Tailwind styles not applying
**Solution**: Check tailwind.config.ts content paths include all component folders

### Issue: Build fails
**Solution**: Check for TypeScript errors, ensure all imports are correct

### Issue: Analytics not loading
**Solution**: Check environment variables, verify consent is accepted

### Issue: Performance score low
**Solution**: Enable image optimization, check bundle size with analyzer

## Next Steps (Future Phases)

After Phase 1 landing page is complete:

### Phase 2: Content Enhancement
- Add blog system for SEO
- Create patient resources/downloads
- Add video content (virtual tour)

### Phase 3: Features
- Online appointment booking
- Patient portal
- Before/after gallery (with consent)
- Testimonials section

### Phase 4: Marketing
- Google Ads integration
- Email newsletter signup
- Social media feed integration
- Local SEO optimization

## Resources

- **Reference Project**: `/workspace/jobs/analu-procto/`
- **Planning Docs**: All markdown files in `/workspace/jobs/massoni/`
- **Next.js Docs**: https://nextjs.org/docs
- **shadcn/ui Docs**: https://ui.shadcn.com/
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Vercel Docs**: https://vercel.com/docs

## Support

If you encounter issues:
1. Check the planning documents in this folder
2. Reference the analu-procto project
3. Consult Next.js/shadcn documentation
4. Ask for clarification on specific implementation details

---

**Estimated Total Time**: 6-8 hours

**Difficulty**: Moderate

**Prerequisites**: Next.js, TypeScript, Tailwind experience

Good luck! 🚀
