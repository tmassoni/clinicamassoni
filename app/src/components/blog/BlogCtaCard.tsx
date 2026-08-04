import { Phone } from 'lucide-react'
import { TrackedLinkButton } from '@/app/src/components/custom/TrackedLinkButton'
import {
  CONTACT_WHATSAPP_URL,
  CLINIC_ADDRESS_CITY,
  CLINIC_ADDRESS_STATE,
} from '@/app/src/lib/constants'

interface BlogCtaCardProps {
  heading: string
  body: string
  /** Analytics label; keep unique per post so conversions are attributable. */
  trackingLabel: string
}

export function BlogCtaCard({ heading, body, trackingLabel }: BlogCtaCardProps) {
  return (
    <aside className="mt-16 rounded-lg bg-primary px-6 py-8 text-white sm:px-10 sm:py-10">
      <h2 className="mb-3 font-serif text-2xl font-bold text-white">{heading}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-white/90">{body}</p>

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
        className="bg-white text-primary hover:bg-white/90"
      >
        <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
        Agendar consulta pelo WhatsApp
      </TrackedLinkButton>

      <p className="mt-4 text-sm text-white/70">
        Atendimento em {CLINIC_ADDRESS_CITY}, {CLINIC_ADDRESS_STATE}.
      </p>
    </aside>
  )
}
