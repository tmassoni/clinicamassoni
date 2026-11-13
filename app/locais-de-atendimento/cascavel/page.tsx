import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { Breadcrumb } from '@/app/src/components/ui/Breadcrumb'
import { TrackedLinkButton } from '@/app/src/components/custom/TrackedLinkButton'
import { TrackedLink } from '@/app/src/components/custom/TrackedLink'
import {
  CLINIC_ADDRESS_FULL,
  CLINIC_ADDRESS_STREET,
  CLINIC_ADDRESS_CITY,
  CLINIC_ADDRESS_STATE,
  CLINIC_ADDRESS_ZIP,
  CLINIC_HOURS_FORMATTED,
  CLINIC_MAP_EMBED_URL,
  CLINIC_COORDINATES,
  CLINIC_WEBSITE,
  CONTACT_PHONE_FORMATTED,
  CONTACT_WHATSAPP_URL,
  DOCTOR_NAME,
  DOCTOR_CRO,
  DOCTOR_THIAGO_NAME,
  DOCTOR_THIAGO_CRO,
} from '@/app/src/lib/constants'
import {
  generateBreadcrumbSchema,
  generateOpenGraphMetadata,
  generateTwitterMetadata,
  serializeSchema,
  type BreadcrumbItem,
} from '@/app/src/lib/seo-schemas'

const pagePath = '/locais-de-atendimento/cascavel'
const pageUrl = `${CLINIC_WEBSITE}${pagePath}`
const mapsQuery = encodeURIComponent(`${CLINIC_COORDINATES.latitude},${CLINIC_COORDINATES.longitude}`)
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
const title = 'Clínica Massoni: atendimento em Cascavel'
const description = 'Endereço, horários, foto da recepção e mapa da Clínica Massoni em Cascavel. Consulte os canais de WhatsApp e telefone para agendar sua avaliação.'
const breadcrumbs: BreadcrumbItem[] = [
  { name: 'Início', path: '/' },
  { name: 'Atendimento em Cascavel', path: pagePath },
]

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: pageUrl },
  openGraph: generateOpenGraphMetadata({ title, description, url: pageUrl }),
  twitter: generateTwitterMetadata({ title, description, url: pageUrl }),
}

export default function CascavelLocationPage() {
  return (
    <main id="main" tabIndex={-1} className="bg-white text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name: title,
          description,
          inLanguage: 'pt-BR',
          isPartOf: { '@id': `${CLINIC_WEBSITE}/#website` },
          about: { '@id': `${CLINIC_WEBSITE}/#organization` },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            contentUrl: `${CLINIC_WEBSITE}/images/gallery/gallery-01.webp`,
            caption: 'Recepção da Clínica Massoni',
          },
        }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(generateBreadcrumbSchema(breadcrumbs)) }}
      />

      <div className="container px-6 pt-28 pb-16 sm:px-8 sm:pt-32 lg:px-12 lg:pt-36 lg:pb-24">
        <Breadcrumb items={breadcrumbs} className="mb-8 lg:mb-10" />
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16 xl:gap-24">
          <header>
            <h1 className="mb-6 max-w-xl font-serif text-[clamp(2.3rem,4.5vw,4rem)]! leading-[1.08] font-bold tracking-tight">
              A Clínica Massoni em {CLINIC_ADDRESS_CITY}
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-secondary">
              Encontre o endereço, consulte os horários e escolha como falar com a equipe para agendar sua visita.
            </p>

            <div className="border-y border-accent py-6">
              <h2 className="mb-2 font-serif text-xl! font-semibold">Onde estamos</h2>
              <address className="max-w-md text-base leading-relaxed text-text-body not-italic">
                {CLINIC_ADDRESS_STREET}<br />
                {CLINIC_ADDRESS_CITY}, {CLINIC_ADDRESS_STATE} · CEP {CLINIC_ADDRESS_ZIP}
              </address>
              <h2 className="mt-5 mb-2 font-serif text-xl! font-semibold">Horários</h2>
              <p className="mb-1 text-base leading-relaxed text-text-body">{CLINIC_HOURS_FORMATTED.weekdays}</p>
              <p className="mb-0 text-sm text-tertiary">
                {CLINIC_HOURS_FORMATTED.saturday}. {CLINIC_HOURS_FORMATTED.sunday}.
              </p>
            </div>

            <div className="mt-6 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-5">
              <TrackedLinkButton
                href={CONTACT_WHATSAPP_URL}
                external
                newTab
                channel="whatsapp"
                section="contact"
                label="cascavel_agendamento_whatsapp"
                location="cascavel"
                variant="primary"
                size="default"
                className="min-h-12 px-5 text-base"
              >
                Agendar pelo WhatsApp
              </TrackedLinkButton>
              <TrackedLink
                href={`tel:${CONTACT_PHONE_FORMATTED.replace(/\D/g, '')}`}
                external
                channel="phone"
                section="contact"
                label="cascavel_agendamento_telefone"
                location="cascavel"
                className="inline-flex min-h-12 items-center gap-2 rounded-sm text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                Ligar {CONTACT_PHONE_FORMATTED}
              </TrackedLink>
            </div>
          </header>

          <figure className="min-w-0">
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-bg-subtle">
              <Image
                src="/images/gallery/gallery-01.webp"
                alt="Recepção da Clínica Massoni com balcão e cadeiras de espera"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-tertiary">Recepção da clínica, no Centro Empresarial Formato.</figcaption>
          </figure>
        </div>

        <section aria-labelledby="localizacao" className="mt-14 border-t border-accent pt-10 lg:mt-20 lg:pt-14">
          <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_2fr] lg:gap-12">
            <h2 id="localizacao" className="mb-0 font-serif text-3xl! leading-tight font-semibold">Como chegar</h2>
            <div>
              <p className="mb-3 max-w-2xl text-base leading-relaxed text-text-body">{CLINIC_ADDRESS_FULL}.</p>
              <p className="mb-0 max-w-2xl text-base leading-relaxed text-secondary">
                Vai se deslocar de outra cidade? Confirme o horário com a equipe antes de organizar a viagem.
                Se precisar de informações de acesso ao edifício, consulte a recepção pelo telefone ou WhatsApp.
              </p>
            </div>
          </div>
          <iframe
            src={CLINIC_MAP_EMBED_URL}
            title="Mapa do Centro Empresarial Formato, endereço da Clínica Massoni em Cascavel"
            width="1200"
            height="400"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full rounded-2xl border border-accent sm:h-100"
          />
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Abrir localização no Google Maps <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>

        <section aria-labelledby="equipe" className="mt-12 grid gap-8 border-t border-accent pt-10 md:grid-cols-2 lg:mt-16 lg:gap-16">
          <div>
            <h2 id="equipe" className="mb-4 font-serif text-2xl! font-semibold">Conheça a equipe</h2>
            <p className="mb-2 text-text-body">{DOCTOR_NAME} · {DOCTOR_CRO}</p>
            <p className="mb-5 text-text-body">{DOCTOR_THIAGO_NAME} · {DOCTOR_THIAGO_CRO}</p>
            <Link href="/sobre" className="inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              Ver formação e áreas de atuação <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div>
            <h2 className="mb-4 font-serif text-2xl! font-semibold">Antes de agendar</h2>
            <p className="mb-5 max-w-xl leading-relaxed text-text-body">
              As páginas de tratamentos apresentam informações sobre as áreas de atendimento da clínica.
              Para consultar horários disponíveis, fale com a equipe pelos canais acima.
            </p>
            <Link href="/tratamentos" className="inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              Conhecer os tratamentos <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
