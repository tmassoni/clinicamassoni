import { ShieldCheck } from 'lucide-react'
import { MEDICAL_DISCLAIMER, type PostAuthor } from '@/app/src/lib/constants'

interface AuthorBylineProps {
  author: PostAuthor
}

const getInitials = (name: string) =>
  name
    .replace(/^Dr\.?\s+/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

/**
 * Identification block required by dental-advertising rules, and the visible
 * half of the E-E-A-T signal that `Article.author` carries in schema.
 */
export function AuthorByline({ author }: AuthorBylineProps) {
  return (
    <footer className="mt-16 overflow-hidden rounded-3xl border border-accent/50 bg-linear-to-br from-bg-subtle to-white p-6 sm:p-8">
      <div className="flex items-start gap-4 sm:gap-5">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-secondary font-serif text-lg font-bold text-white shadow-lg"
        >
          {getInitials(author.name)}
        </span>

        <div className="min-w-0">
          <p className="font-serif text-lg font-bold text-primary">{author.name}</p>
          <p className="text-sm text-secondary">{author.title}</p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-tertiary">
            <ShieldCheck className="h-4 w-4 text-primary/70" aria-hidden="true" />
            {author.cro}
          </p>
        </div>
      </div>

      <p className="mt-6 rounded-r-xl border-l-2 border-primary/40 bg-primary/5 px-4 py-3 text-sm leading-relaxed text-tertiary italic">
        {MEDICAL_DISCLAIMER}
      </p>
    </footer>
  )
}
