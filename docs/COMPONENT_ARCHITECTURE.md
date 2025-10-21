# COMPONENT ARCHITECTURE - Dr. Enor Massoni

## Hybrid Component Strategy

This project uses a **hybrid approach**:

- **shadcn/ui**: For complex, interactive components (forms, dialogs, accordions, carousels)
- **Custom components**: Ported from analu-procto for brand-specific UI (buttons, cards, layout)

### Why Hybrid?

**Benefits of shadcn/ui**:

- Copy-paste components (no package bloat)
- Built on Radix UI primitives (accessibility)
- Customizable with Tailwind
- Active community and documentation

**Benefits of custom components**:

- Full control over styling
- Proven patterns from analu-procto
- Medical website-specific patterns
- Lightweight and optimized

## Directory Structure

```bash
src/
├── components/
│   ├── ui/                          # UI components (mix of custom + shadcn)
│   │   ├── Button.tsx              # ✅ Custom (ported from analu-procto)
│   │   ├── LinkButton.tsx          # ✅ Custom (ported)
│   │   ├── Card.tsx                # ✅ Custom (ported)
│   │   ├── Badge.tsx               # ✅ Custom (ported)
│   │   ├── Header.tsx              # ✅ Custom (ported, adapted)
│   │   ├── Footer.tsx              # ✅ Custom (ported, adapted)
│   │   ├── Divider.tsx             # ✅ Custom (ported)
│   │   ├── accordion.tsx           # 🔷 shadcn/ui
│   │   ├── dialog.tsx              # 🔷 shadcn/ui
│   │   ├── carousel.tsx            # 🔷 shadcn/ui (for gallery)
│   │   ├── form.tsx                # 🔷 shadcn/ui
│   │   ├── input.tsx               # 🔷 shadcn/ui
│   │   ├── textarea.tsx            # 🔷 shadcn/ui
│   │   └── label.tsx               # 🔷 shadcn/ui
│   ├── sections/                    # Landing page sections
│   │   ├── HeroSection.tsx         # ✅ Custom (adapted from analu-procto)
│   │   ├── AboutSection.tsx        # ✅ Custom (adapted)
│   │   ├── ServicesSection.tsx     # ✅ Custom (adapted)
│   │   ├── GallerySection.tsx      # ✅ Custom (new - uses shadcn carousel)
│   │   ├── ContactSection.tsx      # ✅ Custom (adapted - uses shadcn form)
│   │   └── index.ts                # Barrel export
│   ├── layout/                      # Layout components
│   │   └── CookieConsent.tsx       # ✅ Custom (ported from analu-procto)
│   └── analytics/                   # Analytics components
│       └── AnalyticsProvider.tsx   # ✅ Custom (ported)
├── lib/
│   ├── utils.ts                     # cn() utility + helpers
│   ├── constants.ts                 # App constants
│   ├── structured-data.ts           # Schema.org generation
│   └── navigation.ts                # Navigation config
└── hooks/                           # Custom React hooks
    └── use-toast.ts                 # 🔷 shadcn/ui hook (optional)
```

## Component Inventory

### Custom Components (Ported from analu-procto)

#### 1. Button (`components/ui/Button.tsx`)

**Source**: `/workspace/jobs/analu-procto/src/components/ui/Button.tsx`

**Features**:

- 8 variants using class-variance-authority
- Size variants (sm, default, lg, xl, icon)
- Accessibility features (focus rings, aria support)

**Variants**:

```tsx
variant: 'default' | 'primary' | 'secondary' | 'subtle' |
         'outline' | 'ghost' | 'link' | 'destructive'
size: 'sm' | 'default' | 'lg' | 'xl' | 'icon'
```

**Port Strategy**:

1. Copy entire file
2. Update colors to match new brand palette
3. Adjust shadow values if needed
4. Keep all accessibility features

**Usage Example**:

```tsx
import { Button } from '@/components/ui/Button'

<Button variant="primary" size="lg">
  Agende sua consulta
</Button>
```

#### 2. LinkButton (`components/ui/LinkButton.tsx`)

**Source**: `/workspace/jobs/analu-procto/src/components/ui/LinkButton.tsx`

**Features**:

- Link component with button styling
- External link support
- New tab handling
- Uses Button variants

**Port Strategy**:

1. Copy entire file
2. Ensure Next.js Link import is correct
3. Update to match Button variant updates

#### 3. Card (`components/ui/Card.tsx`)

**Source**: `/workspace/jobs/analu-procto/src/components/ui/Card.tsx`

**Features**:

- Reusable card container
- Hover effects
- Consistent padding and shadows
- Responsive

**Port Strategy**:

1. Copy entire file
2. Adjust background color to match brand
3. Update shadow values if needed

**Usage Example**:

```tsx
import { Card } from '@/components/ui/Card'

<Card className="p-6">
  <h3>Implantes Dentários</h3>
  <p>Reabilitação oral completa...</p>
</Card>
```

#### 4. Badge (`components/ui/Badge.tsx`)

**Source**: `/workspace/jobs/analu-procto/src/components/ui/Badge.tsx`

**Features**:

- Small label component
- Multiple variants
- Used for tags/labels

**Port Strategy**:

1. Copy entire file
2. Adjust colors to match brand

#### 5. Header (`components/ui/Header.tsx`)

**Source**: `/workspace/jobs/analu-procto/src/components/ui/Header.tsx`

**Adaptations Needed**:

- Replace doctor name
- Update logo path
- Adjust navigation links
- Update CTA button text/link
- Keep mobile menu functionality

**Port Strategy**:

1. Copy file structure
2. Replace all analu-procto constants with massoni constants
3. Update navigation items:

   ```tsx
   const navItems = [
     { href: '#sobre', label: 'Sobre' },
     { href: '#servicos', label: 'Serviços' },
     { href: '#galeria', label: 'Galeria' },
     { href: '#contato', label: 'Contato' },
   ]
   ```

4. Keep sticky behavior and animations

#### 6. Footer (`components/ui/Footer.tsx`)

**Source**: `/workspace/jobs/analu-procto/src/components/ui/Footer.tsx`

**Adaptations Needed**:

- Replace doctor info
- Update social links
- Update address/location
- Update credentials (CRO instead of CRM)
- Keep structure and styling

**Port Strategy**:

1. Copy file structure
2. Replace constants
3. Update links (Instagram, WhatsApp, etc.)
4. Adjust footer sections if needed

#### 7. Divider (`components/ui/Divider.tsx`)

**Source**: `/workspace/jobs/analu-procto/src/components/ui/Divider.tsx`

**Features**:

- Visual section separator
- Decorative element

**Port Strategy**:

1. Copy entire file
2. Adjust color to match brand

#### 8. CookieConsent (`components/layout/CookieConsent.tsx`)

**Source**: `/workspace/jobs/analu-procto/src/components/layout/CookieConsent.tsx`

**Features**:

- LGPD/GDPR compliant
- Progressive disclosure UX
- localStorage persistence
- Responsive (mobile/desktop)

**Port Strategy**:

1. Copy entire file
2. Update text to mention "Dr. Enor Massoni"
3. Keep all functionality intact
4. Adjust colors to match brand

#### 9. AnalyticsProvider (`components/analytics/AnalyticsProvider.tsx`)

**Source**: `/workspace/jobs/analu-procto/src/components/analytics/AnalyticsProvider.tsx`

**Features**:

- Consent-based analytics loading
- Google Analytics + GTM integration
- Checks localStorage for consent

**Port Strategy**:

1. Copy entire file
2. No changes needed (uses env variables)

### shadcn/ui Components

#### Installation Commands

```bash
# Initialize shadcn/ui
npx shadcn@latest init

# Install required components
npx shadcn@latest add accordion
npx shadcn@latest add dialog
npx shadcn@latest add carousel
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add label
```

#### 1. Accordion (`components/ui/accordion.tsx`)

**Use Case**: FAQ section, service details collapsible

**Usage**:

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Quanto custa um implante dentário?</AccordionTrigger>
    <AccordionContent>
      O custo varia conforme...
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

#### 2. Dialog (`components/ui/dialog.tsx`)

**Use Case**: Modal for image gallery lightbox, appointment form

**Usage**:

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button>Ver detalhes</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Implantes Dentários</DialogTitle>
      <DialogDescription>...</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

#### 3. Carousel (`components/ui/carousel.tsx`)

**Use Case**: Photo gallery section (26 images)

**Usage**:

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

<Carousel>
  <CarouselContent>
    {images.map((image, index) => (
      <CarouselItem key={index}>
        <Image src={image.src} alt={image.alt} />
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

#### 4. Form Components (`form.tsx`, `input.tsx`, `textarea.tsx`, `label.tsx`)

**Use Case**: Contact form in ContactSection

**Usage**:

```tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/Button'

const formSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  phone: z.string().min(10, 'Telefone inválido'),
  message: z.string().min(10, 'Mensagem muito curta'),
})

function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* More fields... */}
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  )
}
```

## Section Components

### 1. HeroSection (`components/sections/HeroSection.tsx`)

**Adapted from**: analu-procto HeroSection

**Content**:

- Professional photo of Dr. Massoni
- Heading: "Implantes Dentários e Cirurgia Maxilofacial em Cascavel"
- Subheading: Value proposition
- Primary CTA: WhatsApp button

**Layout**:

- Mobile: Image top, text bottom
- Desktop: Two-column (text left, image right)

**Code Structure**:

```tsx
export function HeroSection() {
  return (
    <section className="section relative isolate bg-background pt-16 md:pt-18" id="hero">
      <div className="mx-auto max-w-container">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
          {/* Image */}
          <div className="order-1 lg:order-2 lg:flex-1">
            <Image src="/images/hero.webp" alt="..." />
          </div>

          {/* Text Content */}
          <div className="order-2 lg:order-1 lg:flex-1">
            <h1>Implantes Dentários e Cirurgia Maxilofacial em Cascavel</h1>
            <p>Subtitle...</p>
            <LinkButton href={`https://wa.me/${WPP_NUMBER}`}>
              Agende sua consulta
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### 2. AboutSection (`components/sections/AboutSection.tsx`)

**Adapted from**: analu-procto AboutSection

**Content**:

- Doctor bio
- Education/credentials
- CRO-PR 4982
- Professional photo
- Experience highlights

**Layout**: Two-column with image

### 3. ServicesSection (`components/sections/ServicesSection.tsx`)

**Adapted from**: analu-procto ServicesSection

**Content**:

- Service categories in cards
- Each card: icon, title, description, CTA
- Grid layout (3 columns desktop, 1 mobile)

**Services**:

1. Implantes Dentários
2. Cirurgia Bucomaxilofacial
3. Cirurgias Orais

### 4. GallerySection (`components/sections/GallerySection.tsx`)

**New Component** (uses shadcn Carousel)

**Content**:

- 26 WebP images from converted HEIC files
- Image categories/filters (optional)
- Lightbox on click (Dialog component)

**Code Structure**:

```tsx
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import Image from 'next/image'

const images = [
  { src: '/images/gallery/img-1.webp', alt: 'Consultório Dr. Massoni' },
  // ... 25 more
]

export function GallerySection() {
  return (
    <section className="section" id="galeria">
      <div className="container">
        <h2>Conheça Nossa Estrutura</h2>

        <Carousel className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={600}
                        height={400}
                        className="rounded-lg"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1200}
                      height={800}
                    />
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
```

### 5. ContactSection (`components/sections/ContactSection.tsx`)

**Adapted from**: analu-procto ContactSection

**Content**:

- Contact form (shadcn/ui form)
- WhatsApp CTA
- Phone number
- Address
- Google Maps embed
- Opening hours

**Layout**: Two-column (form left, info right)

### Barrel Export (`components/sections/index.ts`)

```tsx
export { HeroSection } from './HeroSection'
export { AboutSection } from './AboutSection'
export { ServicesSection } from './ServicesSection'
export { GallerySection } from './GallerySection'
export { ContactSection } from './ContactSection'
```

## Utility Files

### 1. `lib/utils.ts`

```tsx
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 2. `lib/constants.ts`

```tsx
export const DR_NAME = 'Dr. Enor Massoni'
export const CRO_TEXT = 'CRO-PR 4982'
export const SPECIALTY = 'Implantes Dentários e Cirurgia Bucomaxilofacial'

export const WEBSITE_URL = 'https://enormassoni.com.br'

// Update with actual contact info
export const WHATSAPP_NUMBER = '+55459XXXXXXXX'
export const WHATSAPP_FORMATTED = '(45) 9XXXX-XXXX'
export const PHONE_NUMBER = '(45) XXXX-XXXX'
export const EMAIL = 'contato@enormassoni.com.br'

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
    latitude: 0, // Update with actual coordinates
    longitude: 0,
  },
  openingHours: 'Mo-Fr 08:00-18:00', // Update with actual hours
}
```

### 3. `lib/structured-data.ts`

See CONTENT_STRATEGY.md for full schema template.

### 4. `lib/navigation.ts`

```tsx
export const navigationItems = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#contato', label: 'Contato' },
]
```

## Component Porting Checklist

### Phase 1: Core UI Components

- [ ] Copy Button.tsx from analu-procto
- [ ] Copy LinkButton.tsx
- [ ] Copy Card.tsx
- [ ] Copy Badge.tsx
- [ ] Copy Divider.tsx
- [ ] Update all components to use new brand colors
- [ ] Test all variants in Storybook or dev environment

### Phase 2: Layout Components

- [ ] Copy Header.tsx and adapt
- [ ] Replace navigation items
- [ ] Update logo path
- [ ] Update doctor name
- [ ] Copy Footer.tsx and adapt
- [ ] Update all footer content
- [ ] Update social links

### Phase 3: Analytics & Consent

- [ ] Copy CookieConsent.tsx
- [ ] Update consent text
- [ ] Copy AnalyticsProvider.tsx
- [ ] Set up environment variables

### Phase 4: Install shadcn/ui

- [ ] Run `npx shadcn@latest init`
- [ ] Install accordion component
- [ ] Install dialog component
- [ ] Install carousel component
- [ ] Install form components (form, input, textarea, label)
- [ ] Configure components.json for brand colors

### Phase 5: Section Components

- [ ] Create HeroSection (adapt from analu-procto)
- [ ] Create AboutSection (adapt)
- [ ] Create ServicesSection (adapt)
- [ ] Create GallerySection (new - use Carousel)
- [ ] Create ContactSection (adapt - use Form)
- [ ] Create barrel export index.ts

### Phase 6: Utilities

- [ ] Create lib/utils.ts (cn function)
- [ ] Create lib/constants.ts (update with client info)
- [ ] Create lib/structured-data.ts (from CONTENT_STRATEGY.md)
- [ ] Create lib/navigation.ts

## Styling Integration

### shadcn/ui Configuration

When running `npx shadcn@latest init`, configure:

```bash
✔ Which style would you like to use? › Default
✔ Which color would you like to use as base color? › [Brand Primary Color]
✔ Would you like to use CSS variables for colors? › yes
✔ Are you using a custom tailwind prefix eg. tw-? (Leave blank if not) ...
✔ Where is your global CSS file? › src/app/globals.css
✔ Would you like to use TypeScript (recommended)? … yes
✔ Where is your tailwind.config.ts located? › tailwind.config.ts
✔ Configure the import alias for components: › @/components
✔ Configure the import alias for utils: › @/lib/utils
```

### Customizing shadcn Components

All shadcn components can be customized via `globals.css` CSS variables:

```css
@layer base {
  :root {
    --background: [from brand palette];
    --foreground: [from brand palette];
    --primary: [from brand palette];
    --primary-foreground: [from brand palette];
    /* etc. */
  }
}
```

## Testing Strategy

### Component Testing (Optional for Phase 1)

If implementing tests:

```bash
bun add -d vitest @testing-library/react @testing-library/jest-dom
```

Test custom components:

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders with correct variant', () => {
    render(<Button variant="primary">Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

## Performance Considerations

- **Code Splitting**: shadcn components are tree-shakeable
- **Bundle Size**: Monitor with `bun run analyze`
- **Image Optimization**: Use Next.js Image component for all images
- **Lazy Loading**: Use React.lazy() for Dialog/Carousel if needed
- **CSS**: Tailwind purges unused classes in production

## Reference

- analu-procto components: `/workspace/jobs/analu-procto/src/components/`
- shadcn/ui docs: <https://ui.shadcn.com/>
- Radix UI primitives: <https://www.radix-ui.com/>
