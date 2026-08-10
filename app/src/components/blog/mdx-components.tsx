import Link from 'next/link'
import { isValidElement, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { MdxImage } from '@/app/src/components/ui/MdxImage'
import { slugifyHeading } from '@/app/src/lib/blog'
import { CLINIC_WEBSITE } from '@/app/src/lib/constants'

/** Flattens MDX children to text so a heading id can be derived from them. */
function toPlainText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(toPlainText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return toPlainText(node.props.children)
  }
  return ''
}

const isInternalHref = (href: string) =>
  href.startsWith('/') || href.startsWith('#') || href.startsWith(CLINIC_WEBSITE)

/**
 * Markdown wraps a standalone image in a paragraph, which would put our
 * <figure> inside a <p> — invalid HTML that React reparents at hydration.
 * Unwrap those paragraphs and render the image on its own.
 */
const isImageOnlyParagraph = (children: ReactNode) =>
  isValidElement(children) && children.type === MdxImage

// `text-*!` overrides are deliberate: globals.css sizes bare headings inside
// unlayered media queries, which outrank Tailwind's layered utilities.
export const mdxComponents = {
  // The id is derived from the heading text with the same function the table
  // of contents uses, so the anchors always match without a rehype plugin.
  h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      id={slugifyHeading(toPlainText(children))}
      className="mt-14 mb-4 scroll-mt-28 font-serif text-2xl! leading-tight font-bold text-primary sm:text-3xl!"
      {...props}
    >
      {children}
    </h2>
  ),

  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3
      className="mt-10 mb-3 scroll-mt-28 font-serif text-xl! font-bold text-secondary sm:text-2xl!"
      {...props}
    />
  ),

  p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => {
    if (isImageOnlyParagraph(children)) return <>{children}</>

    return (
      <p className="mb-5 max-w-none leading-[1.8] text-text-body" {...props}>
        {children}
      </p>
    )
  },

  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className="mb-6 space-y-2.5 pl-1 text-text-body marker:text-primary [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:top-[0.65em] [&>li]:before:left-1 [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-full [&>li]:before:bg-primary/60"
      {...props}
    />
  ),

  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className="mb-6 list-decimal space-y-2.5 pl-6 text-text-body marker:font-semibold marker:text-primary"
      {...props}
    />
  ),

  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="leading-[1.8]" {...props} />
  ),

  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-primary" {...props} />
  ),

  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="text-secondary" {...props} />
  ),

  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="my-8 rounded-r-xl border-l-2 border-primary/40 bg-primary/5 px-5 py-4 text-secondary italic"
      {...props}
    />
  ),

  hr: () => (
    <hr className="my-12 border-0 border-t border-accent/60" />
  ),

  a: ({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) => {
    const className =
      'font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-secondary hover:decoration-secondary'

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
