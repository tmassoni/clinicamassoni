import Image from 'next/image'
import Link from 'next/link'
import { navigationItems } from '@/app/src/lib/navigation'
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
              <h4 className="text-lg font-bold mb-4 text-white">Navegação</h4>
              <ul className="space-y-3">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-white group-hover:w-4 transition-all" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Services */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Serviços</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#servicos"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Implantes Dentários
                  </a>
                </li>
                <li>
                  <a
                    href="#servicos"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Cirurgia Buco-Maxilo-Facial
                  </a>
                </li>
                <li>
                  <a
                    href="#servicos"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Cirurgia Ortognática
                  </a>
                </li>
                <li>
                  <a
                    href="#servicos"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Enxerto Ósseo
                  </a>
                </li>
                <li>
                  <a
                    href="#servicos"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Extração de Sisos
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 - Contact */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Contato</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 shrink-0 mt-0.5 text-white/60" />
                  <div>
                    <a
                      href={CONTACT_WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-white transition-colors block"
                    >
                      {CONTACT_WHATSAPP_FORMATTED} (WhatsApp)
                    </a>
                    <a
                      href={`tel:${CONTACT_PHONE_FORMATTED.replace(/\D/g, '')}`}
                      className="text-white/80 hover:text-white transition-colors block"
                    >
                      {CONTACT_PHONE_FORMATTED}
                    </a>
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
