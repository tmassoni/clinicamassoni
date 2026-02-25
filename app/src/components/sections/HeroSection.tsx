import Image from "next/image";
import { LinkButton } from "@/app/src/components/custom/LinkButton";
import {
  CONTACT_WHATSAPP_URL,
  DOCTOR_NAME,
  DOCTOR_SPECIALTY,
  DOCTOR_CRO,
} from "@/app/src/lib/constants";
import { Phone } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-white via-accent/10 to-primary/5"
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
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-2 text-sm font-medium text-primary border border-primary/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Atendimento em Cascavel, PR
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Seu Sorriso
              </span>
              <br />
              <span className="text-primary">Completo e Saudável</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl md:text-2xl text-tertiary leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <span className="font-semibold text-secondary">
                {DOCTOR_SPECIALTY}
              </span>
              &nbsp; com 34 anos de experiência em implantes dentários,
              tecnologia de ponta e atendimento humanizado
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start pt-4">
              <LinkButton
                href={CONTACT_WHATSAPP_URL}
                external
                newTab
                variant="primary"
                size="xl"
                className="group shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-nowrap"
              >
                <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform " />
                Agende sua consulta
              </LinkButton>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 sm:gap-8 justify-center lg:justify-start pt-6 text-sm sm:text-base">
              <div className="flex items-center gap-2 text-tertiary">
                <svg
                  className="w-5 h-5 text-primary"
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

              <div className="flex items-center gap-2 text-tertiary">
                <svg
                  className="w-5 h-5 text-primary"
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
            <div className="relative aspect-4/5 sm:aspect-square lg:aspect-4/5 rounded-3xl overflow-hidden shadow-2xl group">
              {/* Multi-layer Gradient Overlays for depth */}
              <div className="absolute inset-0 bg-linear-to-t from-primary/30 via-primary/5 to-transparent rounded-3xl z-10" />
              <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-primary/10 rounded-3xl z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(4,43,72,0.15)_100%)] rounded-3xl z-10" />

              {/* Professional Photo */}
              <Image
                src="/images/hero/hero-main.webp"
                alt={`Retrato profissional de ${DOCTOR_NAME}, dentista em Cascavel e especialista em ${DOCTOR_SPECIALTY}. ${DOCTOR_CRO}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 42vw"
                priority
                quality={85}
              />

              {/* Decorative Elements with animation */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-linear-to-br from-primary/30 to-transparent rounded-full blur-3xl animate-pulse" />
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-linear-to-br from-secondary/30 to-transparent rounded-full blur-3xl" />

              {/* Inner glow border effect */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/20 z-10" />
            </div>

            {/* Floating Badge with enhanced styling - optimized for mobile */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 z-20 transition-transform hover:scale-105 duration-300 w-[85%] max-w-[320px] lg:w-auto lg:max-w-none">
              <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl px-4 py-2.5 sm:px-6 sm:py-4 border border-[#5a6b91]/20 hover:border-[#28338d]/30 transition-all duration-300">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex -space-x-2">
                    <div className="font-serif w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-[#28338d] via-[#3a4d8f] to-[#5a6b91] flex items-center justify-center text-white font-bold text-sm sm:text-base border-2 border-white shadow-lg">
                      EM
                    </div>
                  </div>
                  <div className="text-left min-w-0">
                    <div className="font-serif text-sm sm:text-md font-bold bg-linear-to-r from-[#28338d] to-[#5a6b91] bg-clip-text text-transparent truncate">
                      {DOCTOR_NAME}
                    </div>
                    <div className="text-[10px] sm:text-xs text-[#9c9c9a] font-medium">
                      Especialista {DOCTOR_CRO}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
