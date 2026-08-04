import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Breadcrumb } from '@/app/src/components/ui/Breadcrumb'
import { BlogBackdrop, Eyebrow } from '@/app/src/components/blog/BlogBackdrop'
import { BlogCtaCard } from '@/app/src/components/blog/BlogCtaCard'
import {
  TREATMENTS_BY_ORDER,
  generateTreatmentsHubSchema,
  getTreatmentPath,
} from '@/app/src/lib/treatments'
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
} from '@/app/src/lib/constants'

const pageHeading = 'Tratamentos'
const pageDescription = `Cirurgia buco-maxilo-facial, implantes dentários, próteses e dentística restauradora em ${CLINIC_ADDRESS_CITY}, ${CLINIC_ADDRESS_STATE}. Conheça as indicações e os limites de cada tratamento.`
const pageUrl = `${CLINIC_WEBSITE}/tratamentos`

const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Início', path: '/' },
  { name: 'Tratamentos', path: '/tratamentos' },
]

export const metadata: Metadata = {
  title: pageHeading,
  description: pageDescription,
  keywords: [
    'tratamentos odontológicos Cascavel',
    'cirurgia buco-maxilo-facial Cascavel',
    'implantes dentários Cascavel',
    'prótese dentária Cascavel',
    'dentística restauradora Cascavel',
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

export default function TreatmentsHubPage() {
  return (
    <main id="main" tabIndex={-1} className="relative min-h-screen">
      <BlogBackdrop />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeSchema(generateTreatmentsHubSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeSchema(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />

      <div className="container relative z-10 px-6 pt-28 pb-20 sm:px-8 sm:pt-32 sm:pb-24 lg:px-12 lg:pt-40 lg:pb-28">
        {/* Full container width — an inner max-w would push the content
            right of the header's left edge. Individual blocks cap their own
            measure instead. */}
        <div>
          <Breadcrumb items={breadcrumbItems} className="mb-8" />

          <header className="mb-14 max-w-3xl sm:mb-16">
            <Eyebrow>O que tratamos</Eyebrow>

            <h1 className="mt-6 mb-6 font-serif text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                {pageHeading}
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-tertiary sm:text-xl">
              {pageDescription}
            </p>
          </header>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
            {TREATMENTS_BY_ORDER.map((treatment) => (
              <article key={treatment.slug} className="group h-full">
                <Link
                  href={getTreatmentPath(treatment.slug)}
                  className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-accent/50 bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:p-7"
                >
                  <div className="mb-4 flex flex-wrap gap-2">
                    {treatment.categories.map((category) => (
                      <span
                        key={category}
                        className="inline-flex items-center rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* `text-xl!` — globals.css sizes bare h2 in unlayered media queries. */}
                  <h2 className="mb-3 font-serif text-xl! leading-snug font-bold text-primary transition-colors group-hover:text-secondary">
                    {treatment.name}
                  </h2>

                  <p className="mb-6 line-clamp-4 max-w-none text-sm leading-relaxed text-tertiary">
                    {treatment.definition}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                    Ver tratamento
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>

                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-primary to-secondary opacity-0 transition-opacity duration-500 group-hover:opacity-[0.04]" />
                </Link>
              </article>
            ))}
          </div>

          <BlogCtaCard
            heading="Não encontrou o que procura?"
            body="Cada caso é avaliado individualmente. Se a sua dúvida não está aqui, fale com a equipe e agende uma avaliação."
            trackingLabel="tratamentos_hub_cta"
            className="mx-auto mt-16 max-w-4xl sm:mt-20"
          />
        </div>
      </div>
    </main>
  )
}
