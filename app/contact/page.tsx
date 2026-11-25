import type { Metadata } from 'next'
import Link from 'next/link'
import { TrackedLink } from '@/app/src/components/custom/TrackedLink'
import { TrackedLinkButton } from '@/app/src/components/custom/TrackedLinkButton'
import {
  CLINIC_ADDRESS_FULL,
  CLINIC_HOURS_FORMATTED,
  CONTACT_EMAIL,
  CONTACT_PHONE_FORMATTED,
  CONTACT_WHATSAPP_URL,
} from '@/app/src/lib/constants'

export const metadata: Metadata = {
  title: { absolute: 'Contato | Clínica Massoni em Cascavel' },
  description: 'Canais oficiais da Clínica Massoni em Cascavel. Consulte como agendar uma avaliação, o endereço e os horários da clínica.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <main id="main" tabIndex={-1} className="bg-white text-primary">
      <div className="container px-6 pt-28 pb-16 sm:px-8 sm:pt-32 lg:px-12 lg:pt-36 lg:pb-24">
        <header className="mb-10 max-w-2xl">
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            Contato da Clínica Massoni
          </h1>
          <p className="text-lg leading-relaxed text-text-body">
            Fale com a equipe da Clínica Massoni para consultar horários disponíveis
            e agendar uma avaliação odontológica em Cascavel, Paraná. Você pode
            entrar em contato diretamente, inclusive quando já tiver um encaminhamento
            de outro profissional.
          </p>
        </header>

        <div className="grid gap-10 border-t border-accent pt-8 md:grid-cols-2 lg:gap-16">
          <section aria-labelledby="agendamento">
            <h2 id="agendamento" className="mb-4 font-serif text-2xl! font-semibold">
              Agendamento e informações
            </h2>
            <p className="mb-5 leading-relaxed text-text-body">
              Use o WhatsApp ou o telefone para consultar a disponibilidade e tirar
              dúvidas sobre a visita. Se você já fez exames ou recebeu um encaminhamento,
              confirme com a equipe o que levar para a avaliação.
            </p>
            <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <TrackedLinkButton
                href={CONTACT_WHATSAPP_URL}
                external
                newTab
                channel="whatsapp"
                section="contact"
                label="pagina_contato_whatsapp"
                location="cascavel"
                variant="primary"
                size="default"
              >
                Agendar pelo WhatsApp
              </TrackedLinkButton>
              <TrackedLink
                href={`tel:+55${CONTACT_PHONE_FORMATTED.replace(/\D/g, '')}`}
                channel="phone"
                section="contact"
                label="pagina_contato_telefone"
                location="cascavel"
                className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
              >
                Ligar {CONTACT_PHONE_FORMATTED}
              </TrackedLink>
            </div>
            <p className="leading-relaxed text-text-body">
              E-mail para contato e dúvidas sobre privacidade:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="break-words underline underline-offset-4">
                {CONTACT_EMAIL}
              </a>
              . Consulte a{' '}
              <Link href="/politica-de-privacidade" className="underline underline-offset-4">
                política de privacidade
              </Link>
              {' '}para saber como os dados recebidos são tratados.
            </p>
          </section>

          <section aria-labelledby="visita">
            <h2 id="visita" className="mb-4 font-serif text-2xl! font-semibold">
              Endereço e horários
            </h2>
            <address className="mb-3 leading-relaxed text-text-body not-italic">
              {CLINIC_ADDRESS_FULL}
            </address>
            <p className="mb-3 leading-relaxed text-text-body">
              {CLINIC_HOURS_FORMATTED.weekdays}. {CLINIC_HOURS_FORMATTED.saturday}.
              {' '}{CLINIC_HOURS_FORMATTED.sunday}.
            </p>
            <p className="mb-3 leading-relaxed text-text-body">
              Se você vem de outra cidade, confirme o horário com a recepção antes
              de planejar o deslocamento.
            </p>
            <Link
              href="/locais-de-atendimento/cascavel"
              className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
            >
              Ver mapa e orientações para chegar
            </Link>
          </section>
        </div>
      </div>
    </main>
  )
}
