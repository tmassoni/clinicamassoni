import Image from 'next/image'
import { LinkButton } from '@/components/ui/LinkButton'
import {
  CONTACT_WHATSAPP_NUMBER,
  DOCTOR_NAME,
  DOCTOR_SPECIALTY,
} from '@/lib/constants'
import { Phone } from 'lucide-react'

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[#C8CFD3]/10 to-[#042B48]/5"
      id="hero"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(4,43,72,0.05),transparent_50%)] pointer-events-none" />

      <div className="container relative z-10 px-6 py-12 sm:px-8 sm:py-16 md:py-20 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20 items-center">
          {/* Content - Left side on desktop, top on mobile */}
          <div className="flex flex-col space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#042B48]/5 px-4 py-2 text-sm font-medium text-[#042B48] border border-[#042B48]/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#042B48] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#042B48]"></span>
                </span>
                Atendimento em Cascavel, PR
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-r from-[#042B48] via-[#3C576A] to-[#042B48] bg-clip-text text-transparent">
                Seu Sorriso
              </span>
              <br />
              <span className="text-[#042B48]">Completo e Saudável</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl md:text-2xl text-[#6A7E8B] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Especialista em{' '}
              <span className="font-semibold text-[#3C576A]">
                Implantes Dentários
              </span>{' '}
              e{' '}
              <span className="font-semibold text-[#3C576A]">
                Cirurgia Maxilofacial
              </span>{' '}
              com tecnologia de ponta e atendimento humanizado
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start pt-4">
              <LinkButton
                href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(
                  /\D/g,
                  ''
                )}`}
                external
                newTab
                variant="primary"
                size="xl"
                className="group shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Agende sua Consulta
              </LinkButton>

              <LinkButton
                href="#servicos"
                variant="outline"
                size="xl"
                className="hover:scale-105 transition-all duration-300"
              >
                Conheça os Serviços
              </LinkButton>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 sm:gap-8 justify-center lg:justify-start pt-8 text-sm sm:text-base">
              <div className="flex items-center gap-2 text-[#6A7E8B]">
                <svg
                  className="w-5 h-5 text-[#042B48]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">CRO-PR 4982</span>
              </div>

              <div className="flex items-center gap-2 text-[#6A7E8B]">
                <svg
                  className="w-5 h-5 text-[#042B48]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Tecnologia Avançada</span>
              </div>

              <div className="flex items-center gap-2 text-[#6A7E8B]">
                <svg
                  className="w-5 h-5 text-[#042B48]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Atendimento Humanizado</span>
              </div>
            </div>
          </div>

          {/* Image - Right side on desktop, top on mobile */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#042B48]/20 via-transparent to-transparent z-10" />

              {/* Professional Photo */}
              <Image
                src="/images/gallery/gallery-01.webp"
                alt={`${DOCTOR_NAME}, cirurgião dentista especialista em ${DOCTOR_SPECIALTY} em Cascavel, PR`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                priority
                quality={90}
              />

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#042B48]/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#3C576A]/20 to-transparent rounded-full blur-3xl" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 z-20">
              <div className="bg-white rounded-2xl shadow-xl px-6 py-4 border border-[#C8CFD3]/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#042B48] to-[#3C576A] flex items-center justify-center text-white font-bold text-sm border-2 border-white">
                      EM
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-[#042B48]">
                      {DOCTOR_NAME}
                    </p>
                    <p className="text-xs text-[#6A7E8B]">
                      Especialista CRO-PR 4982
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
        <a
          href="#sobre"
          className="flex flex-col items-center gap-2 text-[#6A7E8B] hover:text-[#042B48] transition-colors group"
        >
          <span className="text-sm font-medium">Deslize para saber mais</span>
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </div>
    </section>
  )
}
