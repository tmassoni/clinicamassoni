import type { FAQItem } from '@/app/src/lib/seo-schemas'

interface PostFAQProps {
  faqs: FAQItem[]
}

/**
 * Native <details> rather than a JS accordion: the answers stay in the served
 * HTML, so crawlers and answer engines read the same text that FAQPage schema
 * declares. Schema-only FAQs are a manipulation signal.
 */
export function PostFAQ({ faqs }: PostFAQProps) {
  if (faqs.length === 0) return null

  return (
    <section aria-labelledby="perguntas-frequentes" className="mt-16">
      <h2
        id="perguntas-frequentes"
        className="mb-6 font-serif text-2xl font-bold text-text-heading"
      >
        Perguntas frequentes
      </h2>

      <div className="divide-y divide-border-subtle rounded-lg border border-border-subtle bg-bg-subtle">
        {faqs.map((faq) => (
          <details key={faq.question} className="group px-5 py-4" open>
            <summary className="cursor-pointer list-none font-medium text-text-heading marker:content-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <span className="flex items-start justify-between gap-4">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 max-w-none text-text-body leading-relaxed">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
