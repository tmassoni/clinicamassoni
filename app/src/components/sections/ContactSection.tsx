'use client'

import { Badge } from '@/app/src/components/ui/Badge'

import {
  CONTACT_WHATSAPP_NUMBER,
  CONTACT_WHATSAPP_FORMATTED,
  CONTACT_PHONE_FORMATTED,
  CONTACT_EMAIL,
  CLINIC_ADDRESS_FULL,
  CLINIC_HOURS_FORMATTED,
  CLINIC_COORDINATES,
} from '@/app/src/lib/constants'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { WhatsappIcon } from '../icons'

export function ContactSection() {
  return (
    <section
      className="relative section bg-linear-to-b from-white to-accent/10 overflow-hidden"
      id="contato"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(4,43,72,0.03),transparent_60%)] pointer-events-none" />

      <div className="container relative z-10 px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <Badge variant="primary" size="lg" className="mb-4">
            Entre em Contato
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Agende sua&nbsp;
            <span className="bg-linear-to-r from-secondary to-primary bg-clip-text text-transparent">
              Consulta
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-tertiary leading-relaxed">
            Estamos prontos para cuidar do seu sorriso
          </p>
        </div>

        {/* Featured Section: WhatsApp CTA + Hours */}
        <div className="grid lg:grid-cols-6 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:col-span-4 block group"
          >
            <div className="bg-linear-to-br from-primary via-primary to-secondary rounded-3xl p-6 md:p-7 lg:p-8 text-white transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] relative overflow-hidden h-full">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-2xl" />

              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 lg:gap-5 h-full">
                <div className="flex items-center gap-3 lg:gap-4 flex-1">
                  <div className="shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <WhatsappIcon className="w-7 h-7 lg:w-8 lg:h-8" />
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-xs md:text-sm font-medium opacity-90 mb-1">
                      Atendimento via WhatsApp
                    </p>
                    <p className="text-xl lg:text-2xl font-bold mb-1">
                      {CONTACT_WHATSAPP_FORMATTED}
                    </p>
                    <p className="text-xs opacity-90">
                      Clique para conversar agora mesmo
                    </p>
                  </div>
                </div>

                <div className="shrink-0 px-5 lg:px-6 py-2.5 lg:py-3 bg-white/20 backdrop-blur-sm rounded-xl font-semibold text-sm lg:text-base group-hover:bg-white/30 transition-all duration-300">
                  Enviar Mensagem →
                </div>
              </div>
            </div>
          </a>

          {/* Hours Card */}
          <div className="lg:col-span-2">
            <div className="bg-linear-to-br from-primary/5 to-secondary/5 rounded-3xl border border-primary/20 p-6 lg:p-8 shadow-lg h-full flex flex-col justify-center">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 lg:w-7 lg:h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-tertiary mb-1">
                    Horário de Atendimento
                  </p>
                  <div className="space-y-2">
                    <p className="font-bold text-primary text-base lg:text-lg">
                      {CLINIC_HOURS_FORMATTED.weekdays}
                    </p>
                    <p className="text-tertiary text-sm">
                      {CLINIC_HOURS_FORMATTED.saturday}
                    </p>
                    <p className="text-tertiary text-sm">
                      {CLINIC_HOURS_FORMATTED.sunday}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map and Contact Info Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 lg:items-stretch">
          {/* Map - Left Side (Larger) */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-accent/50 h-full">
              <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] bg-accent/20">
                <iframe
                  src={`https://www.google.com/maps?q=${CLINIC_COORDINATES.latitude},${CLINIC_COORDINATES.longitude}&hl=pt-BR&z=15&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  title="Localização da Clínica Dr. Enor Massoni"
                />
              </div>
            </div>
          </div>

          {/* Contact Cards - Right Side */}
          <div className="lg:col-span-1 order-1 lg:order-2 flex flex-col gap-4 lg:gap-6">
            {/* Phone Card */}
            <div className="bg-white rounded-2xl lg:rounded-3xl border border-accent/50 p-5 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-medium text-tertiary mb-1">
                    Telefone
                  </p>
                  <a
                    href={`tel:${CONTACT_PHONE_FORMATTED.replace(/\D/g, '')}`}
                    className="text-base lg:text-lg font-bold text-primary hover:text-secondary transition-colors block"
                  >
                    {CONTACT_PHONE_FORMATTED}
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-2xl lg:rounded-3xl border border-accent/50 p-5 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-tertiary mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-sm lg:text-base font-bold text-primary hover:text-secondary transition-colors truncate block"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-2xl lg:rounded-3xl border border-accent/50 p-5 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-medium text-tertiary mb-1">
                    Endereço
                  </p>
                  <p className="text-sm lg:text-base font-semibold text-primary leading-relaxed">
                    {CLINIC_ADDRESS_FULL}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
