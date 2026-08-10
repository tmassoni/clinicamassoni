import Image from 'next/image'
import Link from 'next/link'
import { TrackedLink } from '@/app/src/components/custom/TrackedLink'
import { navigationItems } from '@/app/src/lib/navigation'
import {
  TREATMENTS_BY_ORDER,
  getTreatmentPath,
} from '@/app/src/lib/treatments'
import {
  DOCTOR_NAME,
  DOCTOR_CRO,
  DOCTOR_SPECIALTY,
  CONTACT_WHATSAPP_URL,
  CONTACT_WHATSAPP_FORMATTED,
  CONTACT_PHONE_FORMATTED,
  CONTACT_EMAIL,
  CLINIC_ADDRESS_FULL,
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_LINKEDIN_URL,
} from '@/app/src/lib/constants'
import { MapPin, Phone, Mail, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-linear-to-br from-primary via-secondary to-primary text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Column 1 - About */}
            <div className="space-y-6">
              <Link href="/#hero" className="inline-block group">
                <div className="flex items-center gap-3">
                  <div className="relative w-20 h-20 transition-transform rounded-lg p-1.5">
                    <Image
                      src="/images/logo-white.png"
                      alt={`${DOCTOR_NAME} - Logo`}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                  <div className="ps-1">
                    <div className="font-serif font-bold text-lg text-white text-nowrap">
                      {DOCTOR_NAME}
                    </div>
                    <div className="text-sm text-white/80">{DOCTOR_CRO}</div>
                  </div>
                </div>
              </Link>

              <p className="text-white/80 leading-relaxed text-sm">
                Especialista em {DOCTOR_SPECIALTY} oferecendo tratamentos
                modernos e humanizados em Cascavel, PR.
              </p>

              {/* Social Media */}
              <div className="flex gap-4">
                {SOCIAL_INSTAGRAM_URL && (
                  <a
                    href={SOCIAL_INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {SOCIAL_LINKEDIN_URL && (
                  <a
                    href={SOCIAL_LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h2 className="text-lg! font-bold mb-4 text-white">Navegação</h2>
              <ul className="space-y-3">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group py-1.5"
                    >
                      <span className="w-0 h-px bg-white group-hover:w-4 transition-all" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Services */}
            <div>
              <h2 className="text-lg! font-bold mb-4 text-white">Tratamentos</h2>
              {/*
                Driven off TREATMENTS so the footer can't drift from the pages
                that exist. These used to all point at the /#servicos anchor,
                which sent every service link to the same homepage section
                instead of the page that owns that commercial intent.
              */}
              <ul className="space-y-3 text-sm">
                {TREATMENTS_BY_ORDER.slice(0, 5).map((treatment) => (
                  <li key={treatment.slug}>
                    <Link
                      href={getTreatmentPath(treatment.slug)}
                      className="text-white/80 hover:text-white transition-colors inline-block py-1.5"
                    >
                      {treatment.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/tratamentos"
                    className="text-white hover:text-accent transition-colors inline-block py-1.5 font-medium"
                  >
                    Ver todos os tratamentos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 - Contact */}
            <div>
              <h2 className="text-lg! font-bold mb-4 text-white">Contato</h2>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 shrink-0 mt-0.5 text-white/60" />
                  <div>
                    <TrackedLink
                      href={CONTACT_WHATSAPP_URL}
                      newTab
                      external
                      channel="whatsapp"
                      section="footer"
                      label="footer_whatsapp"
                      location="cascavel"
                      className="text-white/80 hover:text-white transition-colors block py-1.5"
                    >
                      {CONTACT_WHATSAPP_FORMATTED} (WhatsApp)
                    </TrackedLink>
                    <TrackedLink
                      href={`tel:${CONTACT_PHONE_FORMATTED.replace(/\D/g, '')}`}
                      channel="phone"
                      section="footer"
                      label="footer_telefone"
                      location="cascavel"
                      className="text-white/80 hover:text-white transition-colors block py-1.5"
                    >
                      {CONTACT_PHONE_FORMATTED}
                    </TrackedLink>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 shrink-0 mt-0.5 text-white/60" />
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-white/80 hover:text-white transition-colors break-all"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>

                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-white/60" />
                  <p className="text-white/80 leading-relaxed">
                    {CLINIC_ADDRESS_FULL}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container px-6 sm:px-8 lg:px-12 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
              <p>
                © {currentYear} {DOCTOR_NAME}. Todos os direitos reservados.
              </p>

              <div className="flex items-center gap-6">
                <Link href="/politica-de-privacidade" className="hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
                <Link href="/termos-de-uso" className="hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-tl from-white/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
    </footer>
  )
}
