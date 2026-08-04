import { TrackedLinkButton } from '@/app/src/components/custom/TrackedLinkButton'
import { cn } from '@/app/src/lib/utils'
import {
  CONTACT_WHATSAPP_URL,
  CLINIC_ADDRESS_CITY,
  CLINIC_ADDRESS_STATE,
} from '@/app/src/lib/constants'

interface BlogCtaCardProps {
  heading: string
  body: string
  /** Analytics label; keep unique per placement so conversions are attributable. */
  trackingLabel: string
  className?: string
}

export function BlogCtaCard({
  heading,
  body,
  trackingLabel,
  className,
}: BlogCtaCardProps) {
  return (
    <aside
      className={cn(
        'relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-secondary to-primary p-8 text-center shadow-2xl sm:p-12',
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12),transparent_70%)]"
      />

      <div className="relative z-10">
        {/* `text-2xl!` — see the note in PostCard about globals.css h2 sizing. */}
        <h2 className="mb-4 font-serif text-2xl! leading-tight font-bold text-white sm:text-3xl!">
          {heading}
        </h2>

        <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-white/90">
          {body}
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
          size="lg"
          className="bg-white text-primary shadow-xl transition-all duration-200 hover:scale-105 hover:bg-white/90 hover:shadow-2xl active:scale-95"
        >
          Agendar avaliação
        </TrackedLinkButton>

        {/*
          `max-w-none` because globals.css caps every `p` at 65ch. A capped
          block inside a `text-center` parent centres its text but not itself,
          so this line sat left of the button above it.
        */}
        <p className="mt-5 max-w-none text-sm text-white/70">
          Atendimento em {CLINIC_ADDRESS_CITY}, {CLINIC_ADDRESS_STATE}.
        </p>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
      />
    </aside>
  )
}
