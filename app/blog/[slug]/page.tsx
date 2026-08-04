import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock, RefreshCw } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { Breadcrumb } from '@/app/src/components/ui/Breadcrumb'
import { AuthorByline } from '@/app/src/components/blog/AuthorByline'
import { BlogBackdrop } from '@/app/src/components/blog/BlogBackdrop'
import { BlogCtaCard } from '@/app/src/components/blog/BlogCtaCard'
import { PostCard } from '@/app/src/components/blog/PostCard'
import { PostFAQ } from '@/app/src/components/blog/PostFAQ'
import { OwnerTreatmentCard } from '@/app/src/components/blog/OwnerTreatmentCard'
import { ArticleAside } from '@/app/src/components/blog/ArticleAside'
import { mdxComponents } from '@/app/src/components/blog/mdx-components'
import { formatPostDate } from '@/app/src/lib/blog-format'
import {
  generateBlogPostSchema,
  getAllPostSlugs,
  getPostBySlug,
  getPostHeadings,
  getRelatedPosts,
} from '@/app/src/lib/blog'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOpenGraphMetadata,
  generateTwitterMetadata,
  serializeSchema,
  type BreadcrumbItem,
} from '@/app/src/lib/seo-schemas'
import { getMdxImageDimensions } from '@/app/src/lib/mdx-image-dimensions'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

const buildBreadcrumbs = (title: string, slug: string): BreadcrumbItem[] => [
  { name: 'Início', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: title, path: `/blog/${slug}` },
]

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) return {}

  const socialImage = post.cardImage
    ? {
        url: post.cardImage,
        ...getMdxImageDimensions(post.cardImage),
        alt: post.cardImageAlt ?? post.title,
      }
    : undefined

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: [post.primaryKeyword, ...(post.secondaryKeywords ?? [])],
    authors: [{ name: post.authorProfile.name }],
    alternates: { canonical: post.url },
    openGraph: generateOpenGraphMetadata({
      type: 'article',
      title: post.title,
      description: post.metaDescription,
      url: post.url,
      image: socialImage,
      publishedTime: post.publishDate,
      modifiedTime: post.lastModified,
      authors: [post.authorProfile.name],
    }),
    twitter: generateTwitterMetadata({
      title: post.title,
      description: post.metaDescription,
      url: post.url,
      image: socialImage,
    }),
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const breadcrumbItems = buildBreadcrumbs(post.title, post.slug)
  const relatedPosts = getRelatedPosts(post)
  const headings = getPostHeadings(post.content)

  return (
    <main id="main" tabIndex={-1} className="relative min-h-screen overflow-hidden">
      <BlogBackdrop />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeSchema(generateBlogPostSchema(post)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeSchema(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />
      {post.faqs && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeSchema(generateFAQSchema(post.faqs)),
          }}
        />
      )}

      <div className="container relative z-10 px-6 pt-28 pb-20 sm:px-8 sm:pt-32 sm:pb-24 lg:px-12 lg:pt-40 lg:pb-28">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        {/*
          Left-aligned grid, not `mx-auto`: the article starts at the same edge
          as the header logo. The reading column keeps a ~48rem measure and the
          rail beside it uses the width that would otherwise be dead space.
        */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,48rem)_minmax(0,19rem)] lg:gap-14">
          <div className="min-w-0">
            <header className="mb-10">
            {post.articleSection && (
              <span className="inline-flex items-center rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                {post.articleSection}
              </span>
            )}

            <h1 className="mt-5 mb-6 font-serif text-3xl leading-[1.15] font-bold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-accent/50 py-4 text-sm text-tertiary">
              <span className="font-medium text-secondary">
                {post.authorProfile.name}
              </span>
              <span className="rounded-full bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary">
                {post.authorProfile.cro}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-primary/70" aria-hidden="true" />
                <time dateTime={post.publishDate}>
                  {formatPostDate(post.publishDate)}
                </time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary/70" aria-hidden="true" />
                {post.readingTime} min de leitura
              </span>
              {post.lastModified !== post.publishDate && (
                <span className="inline-flex items-center gap-1.5">
                  <RefreshCw className="h-4 w-4 text-primary/70" aria-hidden="true" />
                  Atualizado em{' '}
                  <time dateTime={post.lastModified}>
                    {formatPostDate(post.lastModified)}
                  </time>
                </span>
              )}
            </div>
          </header>

          <article className="rounded-3xl border border-accent/50 bg-white/80 p-6 shadow-brand backdrop-blur-sm sm:p-10 lg:p-12">
            <div className="text-text-body [&>p:first-of-type]:text-lg [&>p:first-of-type]:text-secondary [&>p:first-of-type]:italic">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>

            {post.faqs && post.faqs.length > 0 && <PostFAQ faqs={post.faqs} />}

            {post.ownerTreatment && (
              <OwnerTreatmentCard slug={post.ownerTreatment} />
            )}

            <AuthorByline author={post.authorProfile} />
          </article>

          <BlogCtaCard
            heading="Agende sua avaliação"
            body="A equipe avalia seu caso individualmente e indica o tratamento adequado para você."
            trackingLabel={`blog_post_cta_${post.slug}`}
            className="mt-12 sm:mt-16"
          />

          {relatedPosts.length > 0 && (
            <section aria-labelledby="artigos-relacionados" className="mt-16 sm:mt-20">
              {/* `text-2xl!` — see the note in PostCard about globals.css h2 sizing. */}
              <h2
                id="artigos-relacionados"
                className="mb-8 font-serif text-2xl! font-bold text-primary sm:text-3xl!"
              >
                Artigos relacionados
              </h2>
              <div className="grid gap-8 sm:grid-cols-2">
                {relatedPosts.map((related) => (
                  <PostCard key={related.slug} post={related} />
                ))}
              </div>
            </section>
          )}

          <p className="mt-14">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:border-primary/30 hover:shadow-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
              Voltar para o blog
            </Link>
          </p>
          </div>

          <ArticleAside
            headings={headings}
            author={post.authorProfile}
            trackingLabel={`blog_aside_cta_${post.slug}`}
          />
        </div>
      </div>
    </main>
  )
}
