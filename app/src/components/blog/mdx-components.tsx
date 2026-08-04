import Link from 'next/link'
import { isValidElement, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { MdxImage } from '@/app/src/components/ui/MdxImage'
import { CLINIC_WEBSITE } from '@/app/src/lib/constants'

const isInternalHref = (href: string) =>
  href.startsWith('/') || href.startsWith('#') || href.startsWith(CLINIC_WEBSITE)

/**
 * Markdown wraps a standalone image in a paragraph, which would put our
 * <figure> inside a <p> — invalid HTML that React reparents at hydration.
 * Unwrap those paragraphs and render the image on its own.
 */
const isImageOnlyParagraph = (children: ReactNode) =>
  isValidElement(children) && children.type === MdxImage

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className="mt-12 mb-4 scroll-mt-28 font-serif text-2xl font-bold text-text-heading"
      {...props}
    />
  ),

  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3
      className="mt-8 mb-3 scroll-mt-28 font-serif text-xl font-bold text-text-heading"
      {...props}
    />
  ),

  p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => {
    if (isImageOnlyParagraph(children)) return <>{children}</>

    return (
      <p className="mb-5 max-w-none leading-relaxed text-text-body" {...props}>
        {children}
      </p>
    )
  },

  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="mb-6 list-disc space-y-2 pl-6 text-text-body" {...props} />
  ),

  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="mb-6 list-decimal space-y-2 pl-6 text-text-body" {...props} />
  ),

  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="leading-relaxed" {...props} />
  ),

  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-text-heading" {...props} />
  ),

  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="my-6 border-l-2 border-accent pl-4 italic text-text-muted"
      {...props}
    />
  ),

  hr: () => <hr className="my-10 border-border-subtle" />,

  a: ({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) => {
    const className =
      'text-primary underline underline-offset-2 transition-colors hover:text-secondary'

    if (!href) return <span className={className}>{children}</span>

    if (isInternalHref(href)) {
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      )
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    )
  },

  img: MdxImage,
}
