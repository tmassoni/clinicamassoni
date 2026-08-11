import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
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

function PractitionerProfile({ practitioner }: { practitioner: PostAuthor }) {
  return (
    <section
      id={practitioner.id}
      aria-labelledby={`${practitioner.id}-nome`}
      className="scroll-mt-28 rounded-3xl border border-accent/50 bg-white/80 p-7 shadow-brand backdrop-blur-sm sm:p-10 lg:p-12"
    >
      <div className="grid gap-7 lg:grid-cols-[360px_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-0 xl:gap-x-16">
        <div className="lg:col-start-2 lg:row-start-1">
          <h2
            id={`${practitioner.id}-nome`}
            className="mb-0 font-serif text-[clamp(1.75rem,3.2vw,2.25rem)]! leading-[1.15] font-semibold tracking-[-0.01em] text-primary"
          >
            {practitioner.name}
          </h2>

          <p className="mt-1.5 mb-0 text-base text-secondary">
            {practitioner.title}
          </p>
        </div>

        <div className="mx-auto w-full max-w-[360px] lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:mx-0">
          <div className="relative mx-auto aspect-4/5 w-full max-w-[360px] overflow-hidden rounded-3xl bg-bg-subtle shadow-brand-lg">
            <Image
              src={practitioner.photo}
              alt={`${practitioner.name} — ${practitioner.title}`}
              fill
              sizes="(max-width: 1024px) 360px, 360px"
              quality={90}
              className="object-cover"
            />
          </div>

          <div className="mt-4 flex justify-center lg:justify-start">
            <p className="mb-0 inline-flex min-h-10 items-center gap-2 rounded-full border border-primary/15 bg-white px-3.5 py-2 text-xs font-semibold tracking-wide text-primary shadow-sm uppercase">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
              {practitioner.cro}
            </p>
          </div>

          <ul className="mt-3 flex flex-wrap justify-center gap-2 lg:justify-start">
            {practitioner.specialties.map((specialty) => (
              <li
                key={specialty}
                className="inline-flex items-center rounded-full border border-primary/10 bg-primary/[0.045] px-3.5 py-2 text-sm font-medium leading-snug text-secondary shadow-sm"
              >
                {/*
                  Parentheticals stripped: DOCTOR_SPECIALTIES carries
                  "(34 anos de experiência)", which contradicts the 1984
                  graduation date shown directly above. Rendering the bare
                  specialty avoids asserting either figure while the client
                  confirms which is right (see TODO.md).
                */}
                {specialty.replace(/\s*\([^)]*\)\s*$/, '')}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 lg:col-start-2 lg:row-start-2 lg:pt-6">
          <div className="max-w-[68ch] space-y-4">
            {practitioner.bio.map((paragraph) => (
              <p
                key={paragraph}
                className="mb-0 max-w-none text-[17px] leading-[1.78] text-text-body"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <h3 className="mt-[38px] mb-1.5 font-serif text-[clamp(1.1875rem,2vw,1.4375rem)]! leading-tight font-semibold text-primary">
            Formação
          </h3>

          <ol className="relative mt-2 border-l border-accent">
            {practitioner.credentials.map((credential) => (
              <li
                key={`${credential.category}-${credential.name}`}
                className="relative border-b border-accent/50 py-4 pl-[22px] last:border-b-0 before:absolute before:top-6 before:-left-[3px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-primary before:content-['']"
              >
                <p className="metadata-label mb-0 text-[10.5px] tracking-[0.13em] text-tertiary">
                  {credential.category}
                  {credential.year !== 'anterior' ? ` · ${credential.year}` : ''}
                </p>
                <p className="mb-0 font-semibold text-primary">{credential.name}</p>
                <p className="mb-0 text-sm text-tertiary">
                  {credential.institution}
                  {credential.institutionShort
                    ? ` (${credential.institutionShort})`
                    : ''}
                  {credential.location ? ` — ${credential.location}` : ''}
                </p>
              </li>
            ))}
          </ol>

          <h3 className="mt-[38px] mb-1.5 font-serif text-[clamp(1.1875rem,2vw,1.4375rem)]! leading-tight font-semibold text-primary">
            Procedimentos realizados
          </h3>

          <ul className="mt-2 grid overflow-hidden rounded-2xl border border-accent/50 bg-primary/[0.025] sm:grid-cols-2">
            {practitioner.procedures.map((procedure) => (
              <li
                key={procedure}
                className="flex min-h-12 items-center border-b border-accent/50 px-4 py-3 text-[15px] text-text-body last:border-b-0 sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"
              >
                {procedure}
              </li>
            ))}
          </ul>

          <Link
            href="/tratamentos"
            className="group mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm text-[15px] font-semibold text-primary transition-all hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Ver estes tratamentos em detalhe
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <main id="main" tabIndex={-1} className="relative min-h-screen">
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
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <header className="max-w-3xl">
          <Eyebrow>Quem atende você</Eyebrow>

          <h1 className="mt-6 mb-5 font-serif text-[clamp(38px,6.4vw,66px)]! leading-[1.05] font-bold tracking-[-0.02em]">
            <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              {pageHeading}
            </span>
          </h1>

          <p className="mb-0 max-w-[36em] text-lg leading-[1.58] text-text-body sm:text-[21px]">
            {pageDescription}
          </p>
        </header>

        <nav
          aria-label="Ir para"
          className="mt-9 grid grid-cols-2 overflow-hidden rounded-2xl border border-accent/50 bg-white/80 shadow-brand backdrop-blur-sm lg:hidden"
        >
          {PRACTITIONERS.map((practitioner) => (
            <a
              key={practitioner.id}
              href={`#${practitioner.id}`}
              className="flex min-h-[46px] items-center justify-center px-2 text-center text-sm font-semibold text-secondary transition-colors hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary [&+&]:border-l [&+&]:border-accent/50"
            >
              {practitioner.name}
            </a>
          ))}
        </nav>

        <div className="mt-16 space-y-10">
          {PRACTITIONERS.map((practitioner) => (
            <PractitionerProfile
              key={practitioner.id}
              practitioner={practitioner}
            />
          ))}

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/tratamentos"
              className="group inline-flex min-h-[46px] items-center gap-2 rounded-full border border-primary/15 bg-white px-5 text-sm font-semibold text-primary transition-all hover:border-primary/30 hover:shadow-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Ver os tratamentos realizados
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/blog"
              className="group inline-flex min-h-[46px] items-center gap-2 rounded-full border border-primary/15 bg-white px-5 text-sm font-semibold text-primary transition-all hover:border-primary/30 hover:shadow-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Ler os artigos
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
        <BlogCtaCard
          heading="Agende uma avaliação"
          body="A primeira consulta inclui exame clínico e, quando necessário, exames de imagem. É nela que se define o que o seu caso pede."
          trackingLabel="sobre_cta"
          className="mx-auto mt-16 max-w-4xl sm:mt-20"
        />
      </div>
    </main>
  )
}
