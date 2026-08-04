import Link from 'next/link'
import { ArrowRight, MessageCircleQuestion } from 'lucide-react'
import { Badge } from '@/app/src/components/ui/badge'
import { PostFAQ } from '@/app/src/components/blog/PostFAQ'
import { TrackedLinkButton } from '@/app/src/components/custom/TrackedLinkButton'
import { HOME_FAQS } from '@/app/src/lib/home-faq'
import { CONTACT_WHATSAPP_URL } from '@/app/src/lib/constants'

/**
 * Practice-level FAQ on the landing page. The same array feeds the FAQPage
 * schema emitted by app/page.tsx, so the visible text and the schema can never
 * drift — a mismatch is a rich-results penalty.
 *
 * Two-column from `lg` with a sticky left rail: a single centred column left
 * most of a desktop viewport empty and made the section read as filler.
 */
export function FaqSection() {
  return (
    <section
      className="relative section overflow-hidden bg-linear-to-b from-white to-accent/5"
      id="faq"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(60,87,106,0.06),transparent_50%)]"
      />

      <div className="container relative z-10 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          {/* Left rail — sticks while the answers scroll past it */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Badge variant="primary" size="lg" className="mb-4">
              Dúvidas frequentes
            </Badge>

            <h2 className="mb-4 font-serif text-3xl! leading-tight font-bold sm:text-4xl!">
              <span className="bg-linear-to-r from-secondary to-primary bg-clip-text text-transparent">
                Perguntas frequentes
              </span>
            </h2>

            <p className="mb-6 leading-relaxed text-tertiary">
              Onde ficamos, como agendar e o que esperar da primeira consulta.
              Dúvidas sobre um tratamento específico estão na página de cada um.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/tratamentos"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
              >
                Ver todos os tratamentos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
              >
                Ler os artigos do blog
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 rounded-2xl border border-primary/10 bg-primary/5 p-5">
              <p className="mb-3 inline-flex items-center gap-2 font-semibold text-primary">
                <MessageCircleQuestion className="h-5 w-5" aria-hidden="true" />
                Não encontrou sua dúvida?
              </p>
              <p className="mb-4 text-sm leading-relaxed text-tertiary">
                Fale com a equipe pelo WhatsApp — é o canal mais rápido.
              </p>
              <TrackedLinkButton
                href={CONTACT_WHATSAPP_URL}
                external
                newTab
                channel="whatsapp"
                section="contact"
                label="faq_whatsapp"
                location="cascavel"
                variant="primary"
                size="default"
                className="w-full"
              >
                Falar pelo WhatsApp
              </TrackedLinkButton>
            </div>
          </div>

          {/* The section heading above already names this; suppress the inner one. */}
          <PostFAQ faqs={HOME_FAQS} heading={null} defaultOpen={false} />
        </div>
      </div>
    </section>
  )
}
