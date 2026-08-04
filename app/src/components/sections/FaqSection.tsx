import { Badge } from '@/app/src/components/ui/badge'
import { PostFAQ } from '@/app/src/components/blog/PostFAQ'
import { HOME_FAQS } from '@/app/src/lib/home-faq'

/**
 * Practice-level FAQ on the landing page. The same array feeds the FAQPage
 * schema emitted by app/page.tsx, so the visible text and the schema can never
 * drift — a mismatch is a rich-results penalty.
 */
export function FaqSection() {
  return (
    <section
      className="relative section overflow-hidden bg-linear-to-b from-white to-accent/5"
      id="faq"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(60,87,106,0.05),transparent_50%)]"
      />

      <div className="container relative z-10 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <Badge variant="primary" size="lg" className="mb-4">
              Dúvidas frequentes
            </Badge>

            <h2 className="mb-4 font-serif text-3xl! font-bold sm:text-4xl!">
              <span className="bg-linear-to-r from-secondary to-primary bg-clip-text text-transparent">
                Perguntas frequentes
              </span>
            </h2>

            <p className="text-lg leading-relaxed text-tertiary">
              Onde ficamos, como agendar e o que esperar da primeira consulta.
            </p>
          </div>

          <PostFAQ faqs={HOME_FAQS} />
        </div>
      </div>
    </section>
  )
}
