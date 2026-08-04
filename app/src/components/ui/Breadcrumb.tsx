import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { BreadcrumbItem } from '@/app/src/lib/seo-schemas'

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Visible breadcrumbs. The last item is the current page and is not a link.
 * Mirrors whatever is passed to `generateBreadcrumbSchema` on the same page.
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Trilha de navegação" className={className}>
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm text-tertiary">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.path} className="flex items-center gap-x-1">
              {index > 0 && (
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 text-accent"
                  aria-hidden="true"
                />
              )}
              {isLast ? (
                <span aria-current="page" className="font-medium text-primary">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="rounded-sm transition-colors hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
