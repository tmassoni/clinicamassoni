import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { Breadcrumb } from '@/app/src/components/ui/Breadcrumb'
import { AuthorByline } from '@/app/src/components/blog/AuthorByline'
import { BlogCtaCard } from '@/app/src/components/blog/BlogCtaCard'
import { PostCard } from '@/app/src/components/blog/PostCard'
import { PostFAQ } from '@/app/src/components/blog/PostFAQ'
import { mdxComponents } from '@/app/src/components/blog/mdx-components'
import { formatPostDate } from '@/app/src/lib/blog-format'
import {
  generateBlogPostSchema,
  getAllPostSlugs,
  getPostBySlug,
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

  return (
    <main className="min-h-screen bg-bg-subtle">
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

      <div className="container px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <article className="mx-auto max-w-3xl pt-16">
          <Breadcrumb items={breadcrumbItems} className="mb-6" />

          <header className="mb-10">
            <h1 className="mb-5 font-serif text-3xl font-bold leading-tight text-text-heading sm:text-4xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-muted">
              <span className="text-text-body">{post.authorProfile.name}</span>
              <span aria-hidden="true">•</span>
              <span>{post.authorProfile.cro}</span>
              <span aria-hidden="true">•</span>
              <time dateTime={post.publishDate}>
                {formatPostDate(post.publishDate)}
              </time>
              <span aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readingTime} min de leitura
              </span>
            </div>

            {post.lastModified !== post.publishDate && (
              <p className="mt-2 text-xs text-text-muted">
                Atualizado em{' '}
                <time dateTime={post.lastModified}>
                  {formatPostDate(post.lastModified)}
                </time>
              </p>
            )}
          </header>

          <div className="text-text-body">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          {post.faqs && post.faqs.length > 0 && <PostFAQ faqs={post.faqs} />}

          <BlogCtaCard
            heading="Agende sua avaliação"
            body="A equipe avalia seu caso individualmente e indica o intervalo de manutenção adequado para você."
            trackingLabel={`blog_post_cta_${post.slug}`}
          />

          <AuthorByline author={post.authorProfile} />

          {relatedPosts.length > 0 && (
            <section aria-labelledby="artigos-relacionados" className="mt-16">
              <h2
                id="artigos-relacionados"
                className="mb-6 font-serif text-2xl font-bold text-text-heading"
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

          <p className="mt-12">
            <Link
              href="/blog"
              className="text-sm font-medium text-primary transition-colors hover:underline"
            >
              <span aria-hidden="true">← </span>
              Voltar para o blog
            </Link>
          </p>
        </article>
      </div>
    </main>
  )
}
