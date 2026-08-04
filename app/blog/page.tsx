import type { Metadata } from 'next'
import { Breadcrumb } from '@/app/src/components/ui/Breadcrumb'
import { BlogBackdrop, Eyebrow } from '@/app/src/components/blog/BlogBackdrop'
import { BlogCtaCard } from '@/app/src/components/blog/BlogCtaCard'
import { PostCard } from '@/app/src/components/blog/PostCard'
import { getAllPosts } from '@/app/src/lib/blog'
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
  DOCTOR_NAME,
} from '@/app/src/lib/constants'

const pageTitle = `Blog sobre saúde bucal | ${DOCTOR_NAME}`
const pageHeading = 'Blog sobre saúde bucal'
const pageDescription = `Artigos educativos sobre implantes dentários, cirurgia bucomaxilofacial e prevenção, escritos pela equipe da clínica em ${CLINIC_ADDRESS_CITY}, ${CLINIC_ADDRESS_STATE}.`
const pageUrl = `${CLINIC_WEBSITE}/blog`

const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Início', path: '/' },
  { name: 'Blog', path: '/blog' },
]

export const metadata: Metadata = {
  title: pageHeading,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: generateOpenGraphMetadata({
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
  }),
  twitter: generateTwitterMetadata({
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
  }),
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <main id="main" tabIndex={-1} className="relative min-h-screen overflow-hidden">
      <BlogBackdrop />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeSchema(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />

      <div className="container relative z-10 px-6 pt-28 pb-20 sm:px-8 sm:pt-32 sm:pb-24 lg:px-12 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-6xl">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />

          <header className="mb-14 max-w-3xl sm:mb-16">
            <Eyebrow>Conteúdo educativo</Eyebrow>

            <h1 className="mt-6 mb-6 font-serif text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                {pageHeading}
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-tertiary sm:text-xl">
              {pageDescription}
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="text-tertiary">
              Ainda não há artigos publicados. Volte em breve.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
              {posts.map((post, index) => (
                <PostCard key={post.slug} post={post} priority={index === 0} />
              ))}
            </div>
          )}

          <BlogCtaCard
            heading="Ficou com alguma dúvida sobre o seu caso?"
            body="Os artigos são educativos e gerais. O diagnóstico e a indicação de tratamento dependem de uma avaliação clínica individual."
            trackingLabel="blog_index_cta"
            className="mx-auto mt-16 max-w-4xl sm:mt-20"
          />
        </div>
      </div>
    </main>
  )
}
