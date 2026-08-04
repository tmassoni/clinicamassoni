import type { Metadata } from 'next'
import { Breadcrumb } from '@/app/src/components/ui/Breadcrumb'
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
    <main className="min-h-screen bg-bg-subtle">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeSchema(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />

      <div className="container px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-6xl pt-16">
          <Breadcrumb items={breadcrumbItems} className="mb-6" />

          <header className="mb-12 max-w-3xl">
            <h1 className="mb-4 font-serif text-4xl font-bold text-text-heading">
              {pageHeading}
            </h1>
            <p className="text-lg leading-relaxed text-text-body">
              {pageDescription}
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="text-text-muted">
              Ainda não há artigos publicados. Volte em breve.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <PostCard key={post.slug} post={post} priority={index === 0} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
