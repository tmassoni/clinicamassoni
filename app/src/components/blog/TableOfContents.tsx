import type { PostHeading } from '@/app/src/lib/blog'

interface TableOfContentsProps {
  headings: PostHeading[]
  className?: string
}

/**
 * In-page navigation for the article sidebar. Plain anchors — the scroll
 * offset is handled by `scroll-mt-28` on the headings themselves, so this
 * needs no JavaScript.
 */
export function TableOfContents({ headings, className }: TableOfContentsProps) {
  if (headings.length < 3) return null

  return (
    <nav aria-labelledby="nesta-pagina" className={className}>
      <p
        id="nesta-pagina"
        className="mb-3 text-xs font-semibold tracking-wide text-tertiary uppercase"
      >
        Nesta página
      </p>
      <ul className="space-y-2 border-l border-accent">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="-ml-px block border-l-2 border-transparent py-0.5 pl-4 text-sm leading-snug text-tertiary transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
