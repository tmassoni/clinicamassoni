import { MEDICAL_DISCLAIMER, type PostAuthor } from '@/app/src/lib/constants'

interface AuthorBylineProps {
  author: PostAuthor
}

/**
 * Identification block required by dental-advertising rules, and the visible
 * half of the E-E-A-T signal that `Article.author` carries in schema.
 */
export function AuthorByline({ author }: AuthorBylineProps) {
  return (
    <footer className="mt-16 border-t border-border-subtle pt-8">
      <p className="font-serif text-lg font-bold text-text-heading">{author.name}</p>
      <p className="text-sm text-text-body">{author.title}</p>
      <p className="text-sm text-text-muted">{author.cro}</p>

      <p className="mt-6 border-l-2 border-accent pl-4 text-sm italic leading-relaxed text-text-muted">
        {MEDICAL_DISCLAIMER}
      </p>
    </footer>
  )
}
