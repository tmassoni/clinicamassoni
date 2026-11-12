import { Phone } from 'lucide-react'
import { TrackedLinkButton } from '@/app/src/components/custom/TrackedLinkButton'
import { WhatsappIcon } from '@/app/src/components/icons/Whatsapp'
import { cn } from '@/app/src/lib/utils'
import {
  CONTACT_WHATSAPP_URL,
  CONTACT_PHONE_FORMATTED,
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
        'rounded-2xl bg-primary px-6 py-8 text-white sm:p-10 lg:px-12 lg:py-11',
        className
      )}
    >
      <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
        <div>
          <h2 className="mb-3 font-serif text-2xl! leading-tight font-bold text-white sm:text-3xl!">
            {heading}
          </h2>
          <p className="mb-4 max-w-2xl leading-relaxed text-white/90">{body}</p>
          <p className="mb-0 text-sm text-white/80">
            Atendimento em {CLINIC_ADDRESS_CITY}, {CLINIC_ADDRESS_STATE}.
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-2 lg:min-w-64">
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
            className="min-h-12 w-full gap-2 bg-white px-4 text-base text-primary sm:text-lg hover:bg-white/90 focus:bg-white focus:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <WhatsappIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
            Agendar pelo WhatsApp
          </TrackedLinkButton>
          <TrackedLinkButton
            href={`tel:${CONTACT_PHONE_FORMATTED.replace(/\D/g, '')}`}
            external
            channel="phone"
            section="blog"
            label={`${trackingLabel}_phone`}
            location="cascavel"
            variant="ghost"
            size="lg"
            className="min-h-12 w-full gap-2 px-3 text-base text-white sm:text-lg hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            Ligar {CONTACT_PHONE_FORMATTED}
          </TrackedLinkButton>
        </div>
      </div>
    </aside>
  )
}
