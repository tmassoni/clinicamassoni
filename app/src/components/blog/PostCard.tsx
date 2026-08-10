import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
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
        className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-accent/50 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <div className="relative aspect-3/2 w-full overflow-hidden">
          {post.cardImage && dimensions ? (
            <>
              <Image
                src={post.cardImage}
                alt={post.cardImageAlt ?? post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                quality={85}
                priority={priority}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Depth overlays, matching the hero image treatment */}
              <div className="absolute inset-0 bg-linear-to-t from-primary/45 via-primary/5 to-transparent" />
            </>
          ) : (
            /*
              Most posts are text-only. Without a fallback the grid mixes tall
              image cards with short bare ones; a branded panel keeps the rhythm
              and still reads as deliberate.
            */
            <div className="absolute inset-0 bg-linear-to-br from-primary via-secondary to-primary">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.14),transparent_60%)]" />
              <Image
                src="/images/logo-white.png"
                alt=""
                aria-hidden="true"
                // The asset is 347x202; declaring a square distorts the
                // intrinsic aspect ratio and Lighthouse flags it.
                width={347}
                height={202}
                className="absolute top-1/2 left-1/2 w-28 -translate-x-1/2 -translate-y-1/2 opacity-15 transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            </div>
          )}

          <div className="absolute inset-0 ring-1 ring-inset ring-white/20" />

          {post.articleSection && (
            <span className="absolute top-5 left-5 inline-flex items-center rounded-full border border-white/25 bg-primary/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {post.articleSection}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-tertiary">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-primary/70" aria-hidden="true" />
              <time dateTime={post.publishDate}>{formatPostDate(post.publishDate)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-primary/70" aria-hidden="true" />
              {post.readingTime} min de leitura
            </span>
          </div>

          {/*
            `text-xl!` is deliberate: globals.css sizes bare `h2` inside
            unlayered media queries, which outrank Tailwind's layered
            utilities. Without the override this renders at 2.25rem.
          */}
          <h2 className="mb-3 font-serif text-xl! leading-snug font-bold text-primary transition-colors group-hover:text-secondary">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="mb-6 line-clamp-4 max-w-none text-sm leading-relaxed text-tertiary">
              {post.excerpt}
            </p>
          )}

          <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
            Ler artigo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        {/* Brand tint on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-primary to-secondary opacity-0 transition-opacity duration-500 group-hover:opacity-[0.04]" />
      </Link>
    </article>
  )
}
