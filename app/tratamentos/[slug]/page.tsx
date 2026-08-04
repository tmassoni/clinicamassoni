import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import { Breadcrumb } from '@/app/src/components/ui/Breadcrumb'
import { BlogBackdrop } from '@/app/src/components/blog/BlogBackdrop'
import { BlogCtaCard } from '@/app/src/components/blog/BlogCtaCard'
import { PostFAQ } from '@/app/src/components/blog/PostFAQ'
import { PostCard } from '@/app/src/components/blog/PostCard'
import { getPostBySlug } from '@/app/src/lib/blog'
import {
  generateTreatmentSchema,
  getAllTreatmentSlugs,
  getTreatmentBySlug,
  getTreatmentPath,
  getTreatmentPractitioner,
  getTreatmentSiblings,
  getTreatmentUrl,
  type TreatmentBullet,
} from '@/app/src/lib/treatments'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOpenGraphMetadata,
  generateTwitterMetadata,
  serializeSchema,
  type BreadcrumbItem,
} from '@/app/src/lib/seo-schemas'

interface TreatmentPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllTreatmentSlugs().map((slug) => ({ slug }))
}

const buildBreadcrumbs = (name: string, slug: string): BreadcrumbItem[] => [
  { name: 'Início', path: '/' },
  { name: 'Tratamentos', path: '/tratamentos' },
  { name, path: getTreatmentPath(slug) },
]

export async function generateMetadata({
  params,
}: TreatmentPageProps): Promise<Metadata> {
  const { slug } = await params
  const treatment = getTreatmentBySlug(slug)

  if (!treatment) return {}

  const pageUrl = getTreatmentUrl(treatment.slug)

  return {
    title: treatment.pageTitle,
    description: treatment.metaDescription,
    keywords: treatment.keywords,
    alternates: { canonical: pageUrl },
    openGraph: generateOpenGraphMetadata({
      title: treatment.pageTitle,
      description: treatment.metaDescription,
      url: pageUrl,
    }),
    twitter: generateTwitterMetadata({
      title: treatment.pageTitle,
      description: treatment.metaDescription,
      url: pageUrl,
    }),
  }
}

function BulletList({ bullets }: { bullets: TreatmentBullet[] }) {
  return (
    <ul className="mb-6 space-y-2.5 text-text-body">
      {bullets.map((bullet) => (
        <li
          key={bullet.term ?? bullet.text}
          className="relative pl-6 leading-[1.8] before:absolute before:top-[0.65em] before:left-1 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary/60"
        >
          {bullet.term && (
            <strong className="font-semibold text-primary">{bullet.term} — </strong>
          )}
          {bullet.text}
        </li>
      ))}
    </ul>
  )
}

export default async function TreatmentPage({ params }: TreatmentPageProps) {
  const { slug } = await params
  const treatment = getTreatmentBySlug(slug)

  if (!treatment) notFound()

  const breadcrumbItems = buildBreadcrumbs(treatment.name, treatment.slug)
  const practitioner = getTreatmentPractitioner(treatment)
  const { previous, next } = getTreatmentSiblings(treatment.slug)
  const relatedPosts = treatment.relatedPosts
    .map((postSlug) => {
      const post = getPostBySlug(postSlug)
      if (!post) {
        throw new Error(
          `Treatment "${treatment.slug}" links to unknown post "${postSlug}".`
        )
      }
      return post
    })
    .slice(0, 2)

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BlogBackdrop />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeSchema(generateTreatmentSchema(treatment)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeSchema(generateFAQSchema(treatment.faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeSchema(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />

      <div className="container relative z-10 px-6 pt-28 pb-20 sm:px-8 sm:pt-32 sm:pb-24 lg:px-12 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />

          <header className="mb-10">
            <div className="flex flex-wrap gap-2">
              {treatment.categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
                >
                  {category}
                </span>
              ))}
            </div>

            <h1 className="mt-5 mb-6 font-serif text-3xl leading-[1.15] font-bold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                {treatment.name}
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-accent/50 py-4 text-sm text-tertiary">
              <span className="font-medium text-secondary">{practitioner.name}</span>
              <span className="rounded-full bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary">
                {practitioner.cro}
              </span>
              <span>{practitioner.title}</span>
            </div>
          </header>

          <article className="rounded-3xl border border-accent/50 bg-white/80 p-6 shadow-brand backdrop-blur-sm sm:p-10 lg:p-12">
            <p className="mb-8 text-lg leading-relaxed text-secondary">
              {treatment.definition}
            </p>

            {treatment.sections.map((section) => (
              <section key={section.heading}>
                {/* `text-2xl!` — globals.css sizes bare h2 in unlayered media queries. */}
                <h2 className="mt-12 mb-4 scroll-mt-28 font-serif text-2xl! leading-tight font-bold text-primary sm:text-3xl!">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mb-5 max-w-none leading-[1.8] text-text-body"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets && <BulletList bullets={section.bullets} />}
              </section>
            ))}

            <section>
              <h2 className="mt-12 mb-4 scroll-mt-28 font-serif text-2xl! leading-tight font-bold text-primary sm:text-3xl!">
                Quando este tratamento não é indicado
              </h2>
              <p className="mb-5 max-w-none leading-[1.8] text-text-body">
                Tão importante quanto saber quando o tratamento se aplica é saber
                quando ele não é a resposta certa — ou não é a resposta certa
                agora.
              </p>
              <BulletList bullets={treatment.notIndicated} />
            </section>

            <PostFAQ faqs={treatment.faqs} />
          </article>

          <BlogCtaCard
            heading="Agende uma avaliação"
            body="A indicação depende de exame clínico e, na maioria dos casos, de exame de imagem. A avaliação define qual tratamento se aplica ao seu caso."
            trackingLabel={`tratamento_cta_${treatment.slug}`}
            className="mt-12 sm:mt-16"
          />

          {relatedPosts.length > 0 && (
            <section aria-labelledby="artigos-relacionados" className="mt-16 sm:mt-20">
              <h2
                id="artigos-relacionados"
                className="mb-8 font-serif text-2xl! font-bold text-primary sm:text-3xl!"
              >
                Leia também
              </h2>
              <div className="grid gap-8 sm:grid-cols-2">
                {relatedPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}

          <nav
            aria-label="Outros tratamentos"
            className="mt-14 grid gap-4 border-t border-accent/50 pt-8 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={getTreatmentPath(previous.slug)}
                className="group flex items-center gap-3 rounded-2xl border border-accent/50 bg-white p-4 transition-all hover:border-primary/30 hover:shadow-brand"
              >
                <ArrowLeft
                  className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <span className="block text-xs text-tertiary">Anterior</span>
                  <span className="block text-sm font-semibold text-primary">
                    {previous.name}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next && (
              <Link
                href={getTreatmentPath(next.slug)}
                className="group flex items-center justify-end gap-3 rounded-2xl border border-accent/50 bg-white p-4 text-right transition-all hover:border-primary/30 hover:shadow-brand"
              >
                <span className="min-w-0">
                  <span className="block text-xs text-tertiary">Próximo</span>
                  <span className="block text-sm font-semibold text-primary">
                    {next.name}
                  </span>
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            )}
          </nav>

          <p className="mt-8">
            <Link
              href="/tratamentos"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:border-primary/30 hover:shadow-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <LayoutGrid className="h-4 w-4" aria-hidden="true" />
              Ver todos os tratamentos
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
