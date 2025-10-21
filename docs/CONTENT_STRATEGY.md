# CONTENT STRATEGY - Dr. Enor Massoni

## SEO Strategy Overview

### Target Location
**City**: Cascavel, Paraná, Brazil
**Population**: ~330,000 (6th largest city in PR)
**Region**: Oeste Paranaense (Western Paraná)
**Economic Profile**: Agricultural hub, growing healthcare sector

### Local SEO Focus
- Primary: Cascavel, PR
- Secondary: Região Oeste Paranaense
- Tertiary: Paraná state-wide

### Target Audience Segments
1. **Patients seeking dental implants** (age 40-70)
2. **Accident victims** needing maxillofacial surgery (age 18-50)
3. **Referring dentists** looking for specialist
4. **Insurance patients** (health plan coverage)

## Keyword Research

### Primary Keywords (High Priority)

**Dental Implants**
- implantes dentários Cascavel
- implante dentário Cascavel PR
- dentista implantes Cascavel
- clínica de implantes Cascavel
- implante de dente Cascavel
- quanto custa implante dentário Cascavel

**Maxillofacial Surgery**
- cirurgia bucomaxilofacial Cascavel
- cirurgião bucomaxilofacial Cascavel
- cirurgia maxilofacial Cascavel
- cirurgia de mandíbula Cascavel
- cirurgia ortognática Cascavel

**General Dental**
- dentista Cascavel
- clínica odontológica Cascavel
- odontologia Cascavel
- dentista CRO 4982

### Secondary Keywords (Medium Priority)

**Procedures**
- enxerto ósseo dental Cascavel
- all-on-4 Cascavel
- protocolo dentário Cascavel
- extração de siso Cascavel
- cirurgia de ATM Cascavel
- traumatismo facial Cascavel

**Local Modifiers**
- dentista região oeste PR
- implantes dentários oeste do Paraná
- cirurgião maxilofacial Paraná

### Long-Tail Keywords (Low Competition, High Intent)

- onde fazer implante dentário em Cascavel
- melhor dentista para implante Cascavel
- preciso fazer cirurgia bucomaxilofacial Cascavel
- dentista especialista em implantes Cascavel
- quanto tempo leva implante dentário Cascavel
- implante dentário aceita plano de saúde Cascavel

### Competitor Keywords (Research Phase)

Search these to analyze competition:
- Top 3 dentists in Cascavel for implants
- Top 3 maxillofacial surgeons in Cascavel
- Dental clinics with strong web presence

## Content Structure

### Landing Page Sections

#### 1. Hero Section
**Goal**: Immediate trust and clear value proposition

**Content Template**:
```
Heading: "Implantes Dentários e Cirurgia Maxilofacial em Cascavel"
Subheading: "Sorriso completo e saúde facial com [X] anos de experiência"
CTA: "Agende sua avaliação gratuita"

Hero Image: Professional photo of Dr. Massoni in clinical setting
```

**SEO Elements**:
- H1 with primary keyword
- Structured data: Dentist + LocalBusiness
- Image alt text with location + specialty

#### 2. About Section
**Goal**: Establish credibility and personal connection

**Content Template**:
```
Heading: "Dr. Enor Massoni - Especialista em Implantodontia e Cirurgia Maxilofacial"

Content:
- Formation/Education (university, residency)
- CRO-PR 4982 credential
- Years of experience
- Specializations/certifications
- Professional associations (CFO, APCD, etc.)
- Patient-centered approach philosophy

CTA: "Conheça minha abordagem"
```

**SEO Elements**:
- H2 with doctor name + specialty
- Schema: Physician credentials
- Emphasis on local training/experience if applicable

#### 3. Services Section
**Goal**: Cover all procedures for keyword coverage

**Service Cards**:

1. **Implantes Dentários**
   - Implante unitário
   - Múltiplos implantes
   - Protocolo fixo sobre implantes (All-on-4/6)
   - Enxerto ósseo e levantamento de seio maxilar

2. **Cirurgia Bucomaxilofacial**
   - Cirurgia ortognática (correção de mandíbula)
   - Tratamento de ATM (articulação temporomandibular)
   - Traumatismo facial e reconstrução
   - Cirurgia de cistos e tumores benignos

3. **Cirurgias Orais**
   - Extração de sisos inclusos
   - Frenectomia lingual e labial
   - Biópsias orais
   - Remoção de lesões bucais

**SEO Elements**:
- H3 for each service category
- Keyword-rich descriptions
- Internal anchor links from navigation

#### 4. Photo Gallery Section
**Goal**: Build trust through visual evidence and professional environment

**Content Organization**:
- Consultório e equipamentos (clinic photos)
- Equipe (team photos - if applicable)
- Antes e depois (before/after - if ethically appropriate and consented)
- Eventos e formações (professional events)

**Gallery Categories** (from 26 HEIC images):
1. Clinic exterior/interior
2. Modern equipment (dental chair, imaging equipment)
3. Professional photos of Dr. Massoni
4. Patient care environment
5. Sterilization/safety protocols

**SEO Elements**:
- Descriptive alt text for every image
- Image schema markup
- Lazy loading for performance

#### 5. FAQ Section (Optional but Recommended for SEO)
**Goal**: Capture long-tail search queries

**Sample Questions**:
1. Quanto custa um implante dentário em Cascavel?
2. Qual a diferença entre implante e prótese?
3. Implante dentário dói?
4. Quanto tempo dura um implante dentário?
5. Aceita plano de saúde/convênio?
6. Como funciona a cirurgia ortognática?
7. Preciso de enxerto ósseo para implante?
8. Qual o tempo de recuperação da cirurgia maxilofacial?

**SEO Elements**:
- FAQ Schema markup
- Natural language matching search queries
- Links to relevant services

#### 6. Location/Contact Section
**Goal**: Local SEO and conversion

**Content Elements**:
```
Address: [Clinic Address], Cascavel, PR, [CEP]
Phone: [Phone Number]
WhatsApp: [WhatsApp Number]
Email: [Email]
Hours: [Opening Hours]

Embedded Google Map
Directions link
Nearby landmarks for easy finding
```

**SEO Elements**:
- LocalBusiness schema with geo coordinates
- OpeningHours specification
- Prominent WhatsApp CTA (Brazilian preference)

## Meta Tags Template

### Homepage
```typescript
// app/layout.tsx - Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://enormassoni.com.br'),
  title: {
    default: 'Dr. Enor Massoni - Implantes Dentários e Cirurgia Maxilofacial em Cascavel | CRO-PR 4982',
    template: '%s | Dr. Enor Massoni - Dentista Cascavel',
  },
  description:
    'Dr. Enor Massoni, especialista em Implantes Dentários e Cirurgia Bucomaxilofacial em Cascavel, PR. Atendimento moderno e humanizado para reabilitação oral e cirurgias faciais. CRO-PR 4982.',
  keywords: [
    'implantes dentários Cascavel',
    'dentista Cascavel',
    'cirurgia bucomaxilofacial Cascavel',
    'enor massoni',
    'implante dentário Cascavel PR',
    'cirurgião maxilofacial Cascavel',
    'dentista implantes Cascavel',
    'clínica odontológica Cascavel',
    'all on 4 Cascavel',
    'protocolo dentário Cascavel',
    'cirurgia ortognática Cascavel',
    'extração siso Cascavel',
    'CRO PR 4982',
    'dentista região oeste Paraná',
  ],
  authors: [{ name: 'Dr. Enor Massoni' }],
  creator: 'Dr. Enor Massoni',
  publisher: 'Dr. Enor Massoni',
  classification: 'Dental & Maxillofacial Surgery',
  category: 'Healthcare',

  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://enormassoni.com.br',
    title: 'Dr. Enor Massoni - Implantes Dentários e Cirurgia Maxilofacial em Cascavel',
    description:
      'Especialista em Implantes Dentários e Cirurgia Bucomaxilofacial oferecendo tratamento moderno e humanizado em Cascavel, PR.',
    siteName: 'Dr. Enor Massoni - Odontologia',
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: 'Dr. Enor Massoni - Dentista especialista em implantes e cirurgia maxilofacial em Cascavel, PR',
        type: 'image/png',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  other: {
    'geo.region': 'BR-PR',
    'geo.placename': 'Cascavel',
    // Add actual coordinates after determining clinic location
    // 'geo.position': 'LAT;LONG',
    // ICBM: 'LAT, LONG',
  },
}
```

## Structured Data Schema

### Schema.org JSON-LD

```typescript
// lib/structured-data.ts
export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    // Dentist
    {
      '@type': 'Dentist',
      '@id': 'https://enormassoni.com.br/#dentist',
      name: 'Dr. Enor Massoni',
      jobTitle: 'Cirurgião Dentista - Implantodontista e Bucomaxilofacial',
      description:
        'Especialista em Implantes Dentários e Cirurgia Bucomaxilofacial em Cascavel, Paraná.',
      image: '/images/og.png',
      url: 'https://enormassoni.com.br',

      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Registro Profissional',
          identifier: 'CRO-PR 4982',
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

      // Add after getting clinic details
      // workLocation: { ... },
      // address: { ... },
      // telephone: '...',
    },

    // Medical Organization
    {
      '@type': 'MedicalBusiness',
      '@id': 'https://enormassoni.com.br/#organization',
      name: 'Dr. Enor Massoni - Implantes e Cirurgia Maxilofacial',
      url: 'https://enormassoni.com.br',
      description:
        'Clínica odontológica especializada em implantes dentários e cirurgia bucomaxilofacial em Cascavel, PR.',

      // Add actual data
      // address: { ... },
      // geo: { ... },
      // telephone: '...',
      // priceRange: '$$',
      // openingHours: '...',

      areaServed: {
        '@type': 'City',
        name: 'Cascavel',
        addressRegion: 'Paraná',
        addressCountry: 'Brasil',
      },
    },

    // Medical Procedure
    {
      '@type': 'MedicalProcedure',
      '@id': 'https://enormassoni.com.br/#services',
      name: 'Implantes Dentários e Cirurgia Bucomaxilofacial',
      description:
        'Tratamento especializado para reabilitação oral e cirurgias faciais',
      procedureType: [
        'Implantes dentários',
        'Protocolo sobre implantes (All-on-4)',
        'Enxerto ósseo',
        'Cirurgia ortognática',
        'Tratamento de ATM',
        'Traumatismo facial',
        'Extração de sisos',
      ],
      performer: {
        '@id': 'https://enormassoni.com.br/#dentist',
      },
    },

    // Website
    {
      '@type': 'WebSite',
      '@id': 'https://enormassoni.com.br/#website',
      url: 'https://enormassoni.com.br',
      name: 'Dr. Enor Massoni - Dentista Cascavel',
      description:
        'Site oficial do Dr. Enor Massoni, especialista em implantes dentários e cirurgia bucomaxilofacial em Cascavel, PR.',
      publisher: {
        '@id': 'https://enormassoni.com.br/#organization',
      },
      inLanguage: 'pt-BR',
    },

    // Local Business
    {
      '@type': 'LocalBusiness',
      '@id': 'https://enormassoni.com.br/#localbusiness',
      name: 'Dr. Enor Massoni - Implantes Dentários',
      description:
        'Atendimento odontológico especializado em ambiente moderno em Cascavel, PR.',
      image: '/images/og.png',
      url: 'https://enormassoni.com.br',

      // Add actual data
      // address: { ... },
      // geo: { ... },
      // telephone: '...',
      // priceRange: '$$',
      // openingHours: '...',
    },
  ],
}
```

## Content Writing Guidelines

### Tone & Voice
- **Professional but approachable**: Not overly clinical, warm and reassuring
- **Patient-focused**: Emphasize benefits and outcomes, not just procedures
- **Trustworthy**: Use credentials, experience, modern technology
- **Clear**: Avoid excessive medical jargon, explain when necessary

### Brazilian Portuguese Conventions
- Use Brazilian spelling (implante, not implant)
- Formal "você" for patient address (not "tu")
- Professional titles: Dr. Enor Massoni (never just "Enor")
- Phone formatting: (45) 9XXXX-XXXX (Cascavel area code: 45)

### Key Messaging Pillars

1. **Experience & Credibility**
   - Years of practice
   - Specialized training
   - CRO credential
   - Success stories/testimonials

2. **Modern Technology**
   - Digital imaging
   - Modern equipment
   - Latest techniques
   - Safety protocols

3. **Patient Comfort**
   - Pain management
   - Anxiety reduction
   - Clear communication
   - Post-op support

4. **Comprehensive Care**
   - Full diagnostic evaluation
   - Treatment planning
   - Follow-up care
   - Emergency support

## Call-to-Action Strategy

### Primary CTAs
1. **"Agende sua avaliação"** (Schedule your evaluation)
2. **"Fale conosco pelo WhatsApp"** (Contact us on WhatsApp)
3. **"Ligue agora: (45) XXXX-XXXX"** (Call now)

### Secondary CTAs
1. "Saiba mais sobre implantes"
2. "Conheça nossa clínica"
3. "Veja nossa galeria de casos"

### CTA Placement
- Hero section: Primary WhatsApp CTA
- After each service: "Agende sua consulta"
- Footer: Phone + WhatsApp + Email
- Sticky header: "Agendar" button on scroll

## Local SEO Optimization

### Google Business Profile
- Claim/verify Google Business listing
- Category: "Dentist", "Oral Surgeon", "Dental Implants Provider"
- Service areas: Cascavel, Toledo, Foz do Iguaçu (if serving wider region)
- Photos: Minimum 10 high-quality images
- Posts: Weekly updates
- Reviews: Encourage patient reviews

### Local Citations
- List on:
  - Doctoralia (https://www.doctoralia.com.br/)
  - Google Meu Negócio
  - Bing Places
  - Facebook Business Page
  - Instagram Business Profile
  - Local directories (Guia Mais, Telelistas)

### Backlink Opportunities
- Local news features (dental health articles)
- Partnerships with local dentists (referral network)
- Health plan provider directories
- Professional association listings (CFO, APCD)

## Content Gaps to Fill (Future Phases)

### Blog Topics
1. "Quanto custa um implante dentário em 2025?"
2. "Como funciona a cirurgia ortognática passo a passo"
3. "Implante dentário: mitos e verdades"
4. "Quando procurar um cirurgião bucomaxilofacial?"
5. "Cuidados após cirurgia de implante dentário"

### Video Content (Future)
- Virtual clinic tour
- Meet Dr. Massoni (introduction video)
- Implant procedure explanation (animated)
- Patient testimonials

### Downloadable Resources
- Implant care guide PDF
- Pre-surgery preparation checklist
- Post-op recovery instructions

## Analytics & Tracking

### Key Metrics to Monitor
- Organic search traffic from Cascavel
- Keyword rankings for primary keywords
- Google Business Profile insights
- Conversion rate (form submissions, calls, WhatsApp messages)
- Bounce rate by section
- Average time on page

### Conversion Events to Track
1. WhatsApp click
2. Phone number click
3. Contact form submission
4. Google Maps directions click
5. Service page views
6. Gallery image interactions

## Competitive Analysis Checklist

- [ ] Identify top 5 dentists in Cascavel with websites
- [ ] Analyze their keyword targeting
- [ ] Review their service offerings
- [ ] Note their pricing transparency (if public)
- [ ] Check their Google reviews count/rating
- [ ] Assess their website UX and design
- [ ] Identify content gaps we can fill

## Reference

Content strategy adapted from analu-procto with modifications for:
- Dental specialty (vs. proctology)
- Cascavel market (vs. Curitiba)
- Different patient demographics
- Dental-specific keywords and procedures
