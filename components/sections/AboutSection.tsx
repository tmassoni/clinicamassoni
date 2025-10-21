import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { DOCTOR_NAME, DOCTOR_CRO, DOCTOR_SPECIALTY } from '@/lib/constants'
import { Award, BookOpen, Heart, Users } from 'lucide-react'

export function AboutSection() {
  return (
    <section
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-white"
      id="sobre"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#C8CFD3]/20 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <Badge variant="primary" size="lg" className="mb-4">
            Sobre o Especialista
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#042B48] mb-6">
            Experiência e Dedicação ao seu{' '}
            <span className="bg-gradient-to-r from-[#3C576A] to-[#042B48] bg-clip-text text-transparent">
              Bem-Estar
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-[#6A7E8B] leading-relaxed">
            Compromisso com a excelência em cada procedimento
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center mb-16">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/gallery/gallery-02.webp"
                alt={`${DOCTOR_NAME} - Especialista em ${DOCTOR_SPECIALTY}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
              />

              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-[#C8CFD3]/50 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#042B48] to-[#3C576A] flex items-center justify-center">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#6A7E8B] mb-1">
                        Registro Profissional
                      </p>
                      <p className="text-2xl font-bold text-[#042B48]">
                        {DOCTOR_CRO}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Border */}
              <div className="absolute inset-0 ring-1 ring-inset ring-[#042B48]/10 rounded-3xl pointer-events-none" />
            </div>

            {/* Floating Decoration */}
            <div className="absolute -z-10 -top-8 -left-8 w-64 h-64 bg-gradient-to-br from-[#042B48]/10 to-transparent rounded-full blur-2xl" />
            <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br from-[#3C576A]/10 to-transparent rounded-full blur-2xl" />
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#042B48]">
                {DOCTOR_NAME}
              </h3>

              <div className="flex flex-wrap gap-2">
                <Badge variant="primary" size="lg">
                  {DOCTOR_CRO}
                </Badge>
                <Badge variant="secondary" size="lg">
                  Implantodontia
                </Badge>
                <Badge variant="secondary" size="lg">
                  Cirurgia Maxilofacial
                </Badge>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-[#6A7E8B] leading-relaxed">
                Especialista em{' '}
                <strong className="text-[#3C576A]">Implantes Dentários</strong>{' '}
                e{' '}
                <strong className="text-[#3C576A]">
                  Cirurgia Bucomaxilofacial
                </strong>
                , com ampla experiência em procedimentos complexos de
                reabilitação oral e cirurgias faciais.
              </p>

              <p className="text-[#6A7E8B] leading-relaxed">
                Com formação sólida e atualização constante nas mais modernas
                técnicas da odontologia, o Dr. Enor Massoni oferece tratamentos
                personalizados que aliam{' '}
                <strong className="text-[#3C576A]">tecnologia de ponta</strong>{' '}
                e{' '}
                <strong className="text-[#3C576A]">
                  atendimento humanizado
                </strong>
                .
              </p>

              <p className="text-[#6A7E8B] leading-relaxed">
                Cada paciente recebe atenção individualizada, com planejamento
                detalhado e acompanhamento em todas as etapas do tratamento,
                garantindo resultados excepcionais e duradouros.
              </p>
            </div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <Card
            title="Formação Especializada"
            variant="service"
            className="group hover:border-[#042B48]/30 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#042B48]/5 group-hover:bg-[#042B48]/10 transition-colors mb-4">
              <BookOpen className="w-6 h-6 text-[#042B48]" />
            </div>
            <p className="text-sm text-[#6A7E8B] leading-relaxed">
              Especialização em Implantodontia e Cirurgia Bucomaxilofacial com
              certificações nacionais
            </p>
          </Card>

          <Card
            title="Tecnologia Avançada"
            variant="service"
            className="group hover:border-[#042B48]/30 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#042B48]/5 group-hover:bg-[#042B48]/10 transition-colors mb-4">
              <Award className="w-6 h-6 text-[#042B48]" />
            </div>
            <p className="text-sm text-[#6A7E8B] leading-relaxed">
              Equipamentos modernos para diagnóstico preciso e procedimentos
              minimamente invasivos
            </p>
          </Card>

          <Card
            title="Atendimento Humanizado"
            variant="service"
            className="group hover:border-[#042B48]/30 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#042B48]/5 group-hover:bg-[#042B48]/10 transition-colors mb-4">
              <Heart className="w-6 h-6 text-[#042B48]" />
            </div>
            <p className="text-sm text-[#6A7E8B] leading-relaxed">
              Cuidado personalizado com foco no conforto e bem-estar de cada
              paciente
            </p>
          </Card>

          <Card
            title="Resultados Comprovados"
            variant="service"
            className="group hover:border-[#042B48]/30 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#042B48]/5 group-hover:bg-[#042B48]/10 transition-colors mb-4">
              <Users className="w-6 h-6 text-[#042B48]" />
            </div>
            <p className="text-sm text-[#6A7E8B] leading-relaxed">
              Milhares de pacientes satisfeitos com tratamentos de excelência e
              acompanhamento contínuo
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
