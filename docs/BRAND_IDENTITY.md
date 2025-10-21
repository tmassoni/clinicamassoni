# BRAND IDENTITY GUIDE - Dr. Enor Massoni

## Logo Processing

### Current Asset

- **File**: `/workspace/jobs/massoni/Logo em PDF.pdf`
- **Format**: PDF (30KB)
- **Status**: Needs conversion to web-optimized formats

### Conversion Strategy

#### 1. Extract Logo from PDF

> **Option A: Using Inkscape (Recommended for SVG)**

```bash
# Install Inkscape (if not installed)
brew install inkscape

# Convert PDF to SVG
inkscape "Logo em PDF.pdf" \
  --export-type=svg \
  --export-filename=logo.svg \
  --export-plain-svg

# This preserves vector quality for all screen sizes
```

> **Option B: Using ImageMagick (For PNG)**

```bash
# Install ImageMagick (if not installed)
brew install imagemagick

# Convert PDF to high-resolution PNG
convert -density 300 "Logo em PDF.pdf" \
  -quality 100 \
  -background transparent \
  -alpha on \
  logo.png

# Create multiple sizes for responsive usage
convert logo.png -resize 200x logo-200w.png
convert logo.png -resize 400x logo-400w.png
convert logo.png -resize 800x logo-800w.png
```

> **Option C: Using Online Tools**

- <https://cloudconvert.com/pdf-to-svg> (PDF → SVG)
- <https://www.adobe.com/express/feature/image/convert/pdf-to-png> (PDF → PNG)
- Manual trace in Figma or Adobe Illustrator

#### 2. Optimize SVG (if using SVG)

```bash
# Install SVGO
npm install -g svgo

# Optimize the SVG
svgo logo.svg -o logo-optimized.svg
```

#### 3. Place in Project

```bash
/workspace/jobs/massoni/web/public/images/
├── logo.svg          # Primary logo (vector)
├── logo.png          # Fallback for older browsers
├── logo-200w.png     # Small screens
├── logo-400w.png     # Medium screens
├── logo-800w.png     # Large screens / Retina
└── favicon.ico       # Generated from logo
```

### Logo Usage in Components

- **Header Component**

```tsx
import Image from 'next/image'

// SVG usage (recommended)
<Image
  src="/images/logo.svg"
  alt="Dr. Enor Massoni - Implantes Dentários e Cirurgia Maxilofacial"
  width={200}
  height={60}
  priority
/>

// Or PNG with srcSet for responsive
<Image
  src="/images/logo.png"
  alt="Dr. Enor Massoni - Implantes Dentários e Cirurgia Maxilofacial"
  width={200}
  height={60}
  priority
/>
```

## Color Palette Extraction

### Extraction Methods

#### Method 1: From PDF Logo

1. Open PDF in design tool (Figma, Adobe Illustrator, Inkscape)
2. Use color picker to extract exact hex values
3. Identify primary, secondary, and accent colors
4. Check contrast ratios at <https://webaim.org/resources/contrastchecker/>

#### Method 2: From Converted Logo

```bash
# Extract dominant colors using ImageMagick
convert logo.png -colors 5 -unique-colors txt:- | grep -v ImageMagick
```

#### Method 3: Manual Analysis with Color Picker

- Use browser extension like ColorZilla
- Or macOS Digital Color Meter (Cmd+Space → "Digital Color Meter")

### Dental Practice Color Psychology

**Recommended Palettes for Dental Practices**:

- **Trust & Professionalism**: Blues, teals, navy
- **Clean & Modern**: Whites, light grays, soft blues
- **Warm & Welcoming**: Soft greens, beiges, warm grays
- **Premium & Sophisticated**: Deep blues, golds, charcoal

### Expected Color Structure (Template)

Once logo is analyzed, define colors like this:

```css
/* globals.css - CSS Variables */
@theme {
  /* Brand Colors - Extracted from logo */
  --color-primary: #[TO_BE_EXTRACTED];        /* Main brand color */
  --color-secondary: #[TO_BE_EXTRACTED];      /* Secondary brand color */
  --color-tertiary: #[TO_BE_EXTRACTED];       /* Accent color */
  --color-brand-primary: #[TO_BE_EXTRACTED];  /* CTA buttons */

  /* Background Colors */
  --color-background: #ffffff;                /* Page background (or cream/off-white) */

  /* Text Hierarchy (WCAG AAA Compliant) */
  --color-text-heading: #1a1a1a;             /* Headings - 14.8:1 contrast minimum */
  --color-text-body: #333333;                /* Body text - 7.2:1 contrast minimum */
  --color-text-muted: #666666;               /* Metadata - 5.1:1 contrast minimum */

  /* Card Backgrounds */
  --color-card-bg: #f8f9fa;                  /* Card background */
  --color-card-bg-hover: #f0f1f3;            /* Card hover state */

  /* Borders & Subtle Elements */
  --color-border-subtle: #e5e7eb;            /* Borders */
  --color-bg-subtle: #fafbfc;                /* Subtle backgrounds */
}
```

### Tailwind Config Color Definitions

```typescript
// tailwind.config.ts
const config: Config = {
  theme: {
    extend: {
      colors: {
        // Brand colors from logo
        brand: {
          primary: '#[TO_BE_EXTRACTED]',
          secondary: '#[TO_BE_EXTRACTED]',
          tertiary: '#[TO_BE_EXTRACTED]',
        },
        // Semantic colors
        primary: '#[TO_BE_EXTRACTED]',      // Main CTA color
        secondary: '#[TO_BE_EXTRACTED]',    // Secondary elements
        accent: '#[TO_BE_EXTRACTED]',       // Accent highlights
        background: '#ffffff',               // Page background

        // Neutral palette (adjust based on brand warmth/coolness)
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
    },
  },
}
```

## Typography System

### Font Recommendations for Dental Practice

- **Option 1: Modern & Professional**

```typescript
// layout.tsx
import { Inter, Playfair_Display } from 'next/font/google'

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
```

- **Option 2: Clean & Medical**

```typescript
import { Poppins, Lora } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
  display: 'swap',
})
```

- **Option 3: Contemporary & Trustworthy**

```typescript
import { Montserrat, Literata } from 'next/font/google'

// Same as analu-procto (proven for medical)
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
  display: 'swap',
})

const literata = Literata({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
  display: 'swap',
})
```

### Typography Scale

Follow analu-procto's proven typography hierarchy:

```css
/* globals.css */
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
```

## Shadow System

### Brand Shadows (Based on Primary Color)

```typescript
// tailwind.config.ts
boxShadow: {
  'brand': '0 4px 14px 0 rgba([R], [G], [B], 0.15)',
  'brand-lg': '0 10px 25px 0 rgba([R], [G], [B], 0.2)',
}
```

Example (if primary is blue #2563eb):

```typescript
boxShadow: {
  'brand': '0 4px 14px 0 rgba(37, 99, 235, 0.15)',
  'brand-lg': '0 10px 25px 0 rgba(37, 99, 235, 0.2)',
}
```

## WCAG Accessibility Requirements

### Minimum Contrast Ratios

- **Normal text (< 18pt)**: 4.5:1 (AA) | 7:1 (AAA)
- **Large text (≥ 18pt)**: 3:1 (AA) | 4.5:1 (AAA)
- **UI components**: 3:1 minimum

### Testing Tools

- WebAIM Contrast Checker: <https://webaim.org/resources/contrastchecker/>
- Chrome DevTools: Inspect element → Accessibility panel
- Lighthouse audit (built into Chrome)

### Example Compliant Text Colors

For white background (#ffffff):

```css
--color-text-heading: #1a1a1a;  /* 14.8:1 contrast - AAA */
--color-text-body: #333333;     /* 12.6:1 contrast - AAA */
--color-text-muted: #666666;    /* 5.7:1 contrast - AA Large Text */
```

For dark background (#1a1a1a):

```css
--color-text-heading: #ffffff;  /* 14.8:1 contrast - AAA */
--color-text-body: #e5e5e5;     /* 11.2:1 contrast - AAA */
--color-text-muted: #a3a3a3;    /* 5.1:1 contrast - AA Large Text */
```

## Favicon Generation

### Using Real Favicon Generator

1. Visit <https://realfavicongenerator.net/>
2. Upload logo.png (at least 512x512)
3. Configure settings:
   - iOS: Choose background color from brand palette
   - Android: Use primary brand color
   - Windows: Use primary color
4. Download package and place in `/public/`

### Manual Generation (macOS)

```bash
# Create favicon from logo
sips -z 16 16 logo.png --out favicon-16x16.png
sips -z 32 32 logo.png --out favicon-32x32.png
sips -z 180 180 logo.png --out apple-touch-icon.png
sips -z 192 192 logo.png --out android-chrome-192x192.png
sips -z 512 512 logo.png --out android-chrome-512x512.png
```

## Brand Application Checklist

- [ ] Extract logo from PDF to SVG format
- [ ] Create PNG fallback versions (200w, 400w, 800w)
- [ ] Optimize SVG with SVGO
- [ ] Extract 3-5 colors from logo using color picker
- [ ] Validate contrast ratios (WCAG AA minimum, AAA preferred)
- [ ] Define CSS variables in globals.css
- [ ] Configure Tailwind colors in tailwind.config.ts
- [ ] Select Google Fonts (sans-serif + serif)
- [ ] Configure font loading in layout.tsx
- [ ] Generate favicon suite
- [ ] Create brand shadows using primary color
- [ ] Document color usage guidelines for future reference

## Example: Complete Brand Configuration

This will be filled in after logo extraction. Template:

```bash
PRIMARY COLOR: #[HEX]
- Usage: Main CTAs, header links, focus states
- Contrast on white: [RATIO]:1
- WCAG: [AA/AAA]

SECONDARY COLOR: #[HEX]
- Usage: Secondary buttons, decorative elements
- Contrast on white: [RATIO]:1
- WCAG: [AA/AAA]

ACCENT COLOR: #[HEX]
- Usage: Highlights, icons, hover states
- Contrast on white: [RATIO]:1
- WCAG: [AA/AAA]

TYPOGRAPHY:
- Sans-serif: [Font Name] (headings, UI)
- Serif: [Font Name] (hero, section titles)

SHADOW:
- brand: rgba([R,G,B], 0.15)
- brand-lg: rgba([R,G,B], 0.2)
```

## Reference

Based on proven brand system from analu-procto:

- See `/workspace/jobs/analu-procto/src/app/globals.css` for CSS variable patterns
- See `/workspace/jobs/analu-procto/tailwind.config.ts` for Tailwind color structure
- See `/workspace/jobs/analu-procto/src/app/layout.tsx` for font loading pattern
