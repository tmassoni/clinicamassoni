import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { getMdxImageDimensions } from '@/app/src/lib/mdx-image-dimensions'
import { formatPostDate } from '@/app/src/lib/blog-format'
import type { BlogPost } from '@/app/src/lib/blog'

interface PostCardProps {
  post: BlogPost
  /** Set on the first card so its image is eligible as the LCP element. */
  priority?: boolean
}

export function PostCard({ post, priority = false }: PostCardProps) {
  const href = `/blog/${post.slug}`
  const dimensions = post.cardImage ? getMdxImageDimensions(post.cardImage) : null

  return (
    <article className="group h-full">
      <Link
        href={href}
        className="flex h-full flex-col overflow-hidden rounded-lg border border-border-subtle bg-white shadow-brand transition-shadow duration-300 hover:shadow-brand-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {post.cardImage && dimensions && (
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-card-bg">
            <Image
              src={post.cardImage}
              alt={post.cardImageAlt ?? post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              quality={85}
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center gap-3 text-xs text-text-muted">
            <time dateTime={post.publishDate}>{formatPostDate(post.publishDate)}</time>
            <span aria-hidden="true">•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readingTime} min de leitura
            </span>
          </div>

          <h2 className="mb-3 font-serif text-xl font-bold leading-snug text-text-heading transition-colors group-hover:text-primary">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="mb-4 line-clamp-4 max-w-none text-sm leading-relaxed text-text-body">
              {post.excerpt}
            </p>
          )}

          <span className="mt-auto text-sm font-medium text-primary">
            Ler artigo
            <span aria-hidden="true"> →</span>
          </span>
        </div>
      </Link>
    </article>
  )
}
