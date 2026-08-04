import Link from 'next/link'
import { ArrowRight, Phone, ShieldCheck } from 'lucide-react'
import { TrackedLinkButton } from '@/app/src/components/custom/TrackedLinkButton'
import { TableOfContents } from '@/app/src/components/blog/TableOfContents'
import { CONTACT_WHATSAPP_URL, type PostAuthor } from '@/app/src/lib/constants'
import type { PostHeading } from '@/app/src/lib/blog'

interface ArticleAsideProps {
  headings: PostHeading[]
  author: PostAuthor
  /** Unique per page so sidebar conversions stay attributable. */
  trackingLabel: string
  /** Optional extra block, e.g. sibling treatments. */
  children?: React.ReactNode
}

/**
 * The right rail on article and treatment pages. Its job is to make the space
 * beside a capped reading measure useful, so the content can start at the
 * header's left edge instead of being centred in the viewport.
 *
 * It travels with the reader (`sticky`). Without that, it scrolls away after
 * the first screen and the rest of the article sits in a narrow left column
 * with an empty right half — which reads as the whole page being off-centre.
 *
 * Its parent grid now wraps only the header and article body, so the rail
 * follows you through the article and releases naturally at the full-width
 * sections below.
 *
 * `max-h` + `overflow-y-auto` matter: a rail taller than the viewport would
 * otherwise pin its top and leave the CTA at the bottom permanently
 * unreachable.
 *
 * Hidden below `lg` — the table of contents and a repeated CTA are noise on a
 * phone, where the article is already a single scroll.
 */
export function ArticleAside({
  headings,
  author,
  trackingLabel,
  children,
}: ArticleAsideProps) {
  return (
    <aside
      aria-label="Conteúdo complementar"
      className="hidden lg:sticky lg:top-28 lg:block lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto lg:pb-4 [scrollbar-width:thin]">
      <TableOfContents headings={headings} className="mb-8" />

      <div className="rounded-2xl border border-accent/50 bg-white/70 p-5 backdrop-blur-sm">
        <p className="text-xs font-semibold tracking-wide text-tertiary uppercase">
          Responsável
        </p>
        <p className="mt-2 font-serif text-base font-bold text-primary">
          {author.name}
        </p>
        <p className="text-sm leading-snug text-tertiary">{author.title}</p>
        {/* `flex`, not `inline-flex` — inline let the link below sit on the
            same line and collide with the registration number. */}
        <p className="mt-2 flex items-center gap-1.5 text-sm text-secondary">
          <ShieldCheck className="h-4 w-4 shrink-0 text-primary/70" aria-hidden="true" />
          {author.cro}
        </p>

        <Link
          href="/sobre"
          className="group mt-4 flex w-fit items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5"
        >
          Ver formação
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      {children}

      <div className="mt-6 rounded-2xl bg-linear-to-br from-primary to-secondary p-5 text-center">
        <p className="mb-3 text-sm leading-relaxed text-white/90">
          Avaliação individual define o que o seu caso pede.
        </p>
        <TrackedLinkButton
          href={CONTACT_WHATSAPP_URL}
          external
          newTab
          channel="whatsapp"
          section="blog"
          label={trackingLabel}
          location="cascavel"
          variant="default"
          size="default"
          className="w-full bg-white text-primary hover:bg-white/90"
        >
          <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
          Agendar
        </TrackedLinkButton>
      </div>
    </aside>
  )
}
