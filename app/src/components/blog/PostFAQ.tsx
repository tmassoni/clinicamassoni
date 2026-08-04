import { Plus } from 'lucide-react'
import { cn } from '@/app/src/lib/utils'
import type { FAQItem } from '@/app/src/lib/seo-schemas'

interface PostFAQProps {
  faqs: FAQItem[]
  /**
   * Pass `null` when the surrounding section already renders its own heading —
   * otherwise the page shows "Perguntas frequentes" twice.
   */
  heading?: string | null
  /**
   * Open by default inside an article, where the FAQ is part of the reading
   * flow. Closed on the landing page, where six expanded answers push the rest
   * of the page far down. Either way the text is in the served HTML.
   */
  defaultOpen?: boolean
  className?: string
}

/**
 * Native <details> rather than a JS accordion: the answers stay in the served
 * HTML, so crawlers and answer engines read the same text that FAQPage schema
 * declares. Schema-only FAQs are a manipulation signal.
 */
export function PostFAQ({
  faqs,
  heading = 'Perguntas frequentes',
  defaultOpen = true,
  className,
}: PostFAQProps) {
  if (faqs.length === 0) return null

  return (
    <section
      aria-labelledby={heading ? 'perguntas-frequentes' : undefined}
      aria-label={heading ? undefined : 'Perguntas frequentes'}
      className={cn(heading && 'mt-16', className)}
    >
      {heading && (
        /* `text-2xl!` — see the note in PostCard about globals.css h2 sizing. */
        <h2
          id="perguntas-frequentes"
          className="mb-6 font-serif text-2xl! font-bold text-primary sm:text-3xl!"
        >
          {heading}
        </h2>
      )}

      {/* Matches the `speakable` cssSelector in generateFAQSchema. */}
      <div className="space-y-3" data-speakable="faq">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            open={defaultOpen}
            className="group rounded-2xl border border-accent/50 bg-linear-to-br from-bg-subtle to-white px-5 py-4 transition-colors hover:border-primary/30 sm:px-6"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-primary marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              {faq.question}
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-open:rotate-45 group-hover:bg-primary/20"
              >
                <Plus className="h-4 w-4" />
              </span>
            </summary>

            <p className="mt-3 max-w-none border-t border-accent/40 pt-3 leading-relaxed text-tertiary">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
