import Link from 'next/link'
import { ArrowRight, Stethoscope } from 'lucide-react'
import { getTreatmentBySlug, getTreatmentPath } from '@/app/src/lib/treatments'

interface OwnerTreatmentCardProps {
  /** Slug of the service page this post supports. */
  slug: string
}

/**
 * The "link up" from an informational post to the page that owns its
 * commercial intent. Posts answer the question; the service page converts it.
 */
export function OwnerTreatmentCard({ slug }: OwnerTreatmentCardProps) {
  const treatment = getTreatmentBySlug(slug)

  if (!treatment) {
    throw new Error(`Post declares unknown ownerTreatment "${slug}".`)
  }

  return (
    <aside className="mt-14 rounded-3xl border border-primary/15 bg-linear-to-br from-bg-subtle to-white p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"
        >
          <Stethoscope className="h-5 w-5" />
        </span>

        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-tertiary uppercase">
            Tratamento relacionado
          </p>

          <p className="mt-1 font-serif text-lg font-bold text-primary">
            {treatment.name}
          </p>

          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-tertiary">
            {treatment.definition}
          </p>

          <Link
            href={getTreatmentPath(treatment.slug)}
            className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Ver o tratamento
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  )
}
