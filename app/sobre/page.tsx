import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, GraduationCap, ShieldCheck } from 'lucide-react'
import { Breadcrumb } from '@/app/src/components/ui/Breadcrumb'
import { BlogBackdrop, Eyebrow } from '@/app/src/components/blog/BlogBackdrop'
import { BlogCtaCard } from '@/app/src/components/blog/BlogCtaCard'
import {
  generateBreadcrumbSchema,
  generateOpenGraphMetadata,
  generateTwitterMetadata,
  serializeSchema,
  type BreadcrumbItem,
} from '@/app/src/lib/seo-schemas'
import {
  CLINIC_ADDRESS_CITY,
  CLINIC_ADDRESS_STATE,
  CLINIC_WEBSITE,
  PRACTITIONERS,
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_LINKEDIN_URL,
  type PostAuthor,
} from '@/app/src/lib/constants'

const pageHeading = 'Sobre a clínica'
const pageDescription = `Formação, especializações e áreas de atuação dos cirurgiões-dentistas da clínica em ${CLINIC_ADDRESS_CITY}, ${CLINIC_ADDRESS_STATE}.`
const pageUrl = `${CLINIC_WEBSITE}/sobre`

const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Início', path: '/' },
  { name: 'Sobre', path: '/sobre' },
]

export const metadata: Metadata = {
  title: pageHeading,
  description: pageDescription,
  keywords: [
    'Dr. Enor Massoni',
    'Dr. Thiago Massoni',
    'CRO-PR 4982',
    'cirurgião dentista Cascavel',
    'especialista bucomaxilofacial Cascavel',
  ],
  alternates: { canonical: pageUrl },
  openGraph: generateOpenGraphMetadata({
    title: pageHeading,
    description: pageDescription,
    url: pageUrl,
  }),
  twitter: generateTwitterMetadata({
    title: pageHeading,
    description: pageDescription,
    url: pageUrl,
  }),
}

/**
 * ProfilePage carrying both Person nodes. This is the page that consolidates
 * the practitioner entity for a YMYL site — each Person cross-references the
 * sitewide organization by @id, and carries the full credential chain.
 */
function generateProfilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${pageUrl}#profilepage`,
    url: pageUrl,
    name: pageHeading,
    description: pageDescription,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': `${CLINIC_WEBSITE}/#website` },
    about: PRACTITIONERS.map((practitioner) => ({
      '@type': 'Person',
      '@id': `${pageUrl}#${practitioner.id}`,
      name: practitioner.name,
      jobTitle: practitioner.title,
      image: `${CLINIC_WEBSITE}${practitioner.photo}`,
      description: practitioner.bio[0],
      knowsAbout: practitioner.knowsAbout,
      worksFor: { '@id': `${CLINIC_WEBSITE}/#organization` },
      sameAs: [SOCIAL_INSTAGRAM_URL, SOCIAL_LINKEDIN_URL],
      alumniOf: practitioner.credentials
        .filter((credential) => credential.category !== 'Docência')
        .map((credential) => ({
          '@type': 'EducationalOrganization',
          name: credential.institution,
          ...(credential.institutionShort
            ? { alternateName: credential.institutionShort }
            : {}),
        })),
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Registro Profissional',
          identifier: practitioner.cro,
          recognizedBy: {
            '@type': 'Organization',
            name: 'Conselho Regional de Odontologia do Paraná',
            alternateName: 'CRO-PR',
            url: 'https://www.cropr.org.br',
          },
        },
        ...practitioner.credentials.map((credential) => ({
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: credential.category,
          name: credential.name,
          dateCreated: credential.year,
          recognizedBy: {
            '@type': 'Organization',
            name: credential.institution,
            ...(credential.institutionShort
              ? { alternateName: credential.institutionShort }
              : {}),
          },
        })),
      ],
    })),
  }
}

function PractitionerCard({ practitioner }: { practitioner: PostAuthor }) {
  return (
    <section
      id={practitioner.id}
      aria-labelledby={`${practitioner.id}-nome`}
      className="scroll-mt-28 rounded-3xl border border-accent/50 bg-white/80 p-6 shadow-brand backdrop-blur-sm sm:p-10"
    >
      <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
        <div className="relative mx-auto aspect-4/5 w-full max-w-[280px] overflow-hidden rounded-3xl shadow-brand-lg">
          <Image
            src={practitioner.photo}
            alt={`${practitioner.name} — ${practitioner.title}`}
            fill
            sizes="(max-width: 1024px) 280px, 280px"
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary/25 to-transparent" />
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/20" />
        </div>

        <div className="min-w-0">
          {/* `text-2xl!` — globals.css sizes bare h2 in unlayered media queries. */}
          <h2
            id={`${practitioner.id}-nome`}
            className="font-serif text-2xl! font-bold text-primary sm:text-3xl!"
          >
            {practitioner.name}
          </h2>

          <p className="mt-1 text-secondary">{practitioner.title}</p>

          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {practitioner.cro}
          </p>

          {practitioner.bio.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-none leading-[1.8] text-text-body">
              {paragraph}
            </p>
          ))}

          <h3 className="mt-8 mb-3 font-serif text-lg! font-bold text-primary">
            Formação
          </h3>
          <ul className="space-y-3">
            {practitioner.credentials.map((credential) => (
              <li key={`${credential.category}-${credential.name}`} className="flex gap-3">
                <GraduationCap
                  className="mt-1 h-4 w-4 shrink-0 text-primary/70"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-text-body">
                  <strong className="font-semibold text-primary">
                    {credential.name}
                  </strong>
                  {' — '}
                  {credential.institutionShort ?? credential.institution}
                  {credential.location ? `, ${credential.location}` : ''}
                  {credential.year !== 'anterior' ? ` (${credential.year})` : ''}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 mb-3 font-serif text-lg! font-bold text-primary">
            Procedimentos realizados
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {practitioner.procedures.map((procedure) => (
              <li
                key={procedure}
                className="relative pl-5 text-sm leading-relaxed text-tertiary before:absolute before:top-[0.6em] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary/60"
              >
                {procedure}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <main id="main" tabIndex={-1} className="relative min-h-screen overflow-hidden">
      <BlogBackdrop />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeSchema(generateProfilePageSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeSchema(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />

      <div className="container relative z-10 px-6 pt-28 pb-20 sm:px-8 sm:pt-32 sm:pb-24 lg:px-12 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-4xl">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />

          <header className="mb-14 max-w-3xl">
            <Eyebrow>Quem atende você</Eyebrow>

            <h1 className="mt-6 mb-6 font-serif text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                {pageHeading}
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-tertiary sm:text-xl">
              {pageDescription}
            </p>
          </header>

          <div className="space-y-10">
            {PRACTITIONERS.map((practitioner) => (
              <PractitionerCard key={practitioner.id} practitioner={practitioner} />
            ))}
          </div>

          <p className="mt-12">
            <Link
              href="/tratamentos"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:border-primary/30 hover:shadow-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Ver os tratamentos realizados
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </p>

          <BlogCtaCard
            heading="Agende uma avaliação"
            body="A primeira consulta inclui exame clínico e, quando necessário, exames de imagem. É nela que se define o que o seu caso pede."
            trackingLabel="sobre_cta"
            className="mt-16"
          />
        </div>
      </div>
    </main>
  )
}
