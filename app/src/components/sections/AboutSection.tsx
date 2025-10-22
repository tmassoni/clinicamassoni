import Image from 'next/image'
import { Badge } from '@/app/src/components/ui/Badge'
import { Card } from '@/app/src/components/ui/Card'
import {
  DOCTOR_NAME,
  DOCTOR_CRO,
  DOCTOR_SPECIALTY,
} from '@/app/src/lib/constants'
import { Award, BookOpen, Heart, Users } from 'lucide-react'

export function AboutSection() {
  return (
    <section className="relative section overflow-hidden bg-white" id="sobre">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-accent/20 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-primary/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <Badge variant="primary" size="lg" className="mb-4">
            Sobre o Especialista
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1b384e] mb-6">
            Experiência e Dedicação ao seu&nbsp;
            <span className="bg-linear-to-r from-secondary to-primary bg-clip-text text-transparent">
              Bem-Estar
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-tertiary leading-relaxed">
            Compromisso com a excelência em cada procedimento
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center mb-20">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl group">
              {/* Image overlays for depth */}
              <div className="absolute inset-0 bg-linear-to-t from-primary/20 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-primary/10 z-10" />

              <Image
                src="/images/gallery/gallery-02.webp"
                alt={`${DOCTOR_NAME} - Especialista em ${DOCTOR_SPECIALTY}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
              />

              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-accent/50 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="shrink-0">
                      <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary via-secondary to-primary flex items-center justify-center shadow-lg">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-tertiary mb-1">
                        Registro Profissional
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {DOCTOR_CRO}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Border */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-3xl pointer-events-none z-10" />
            </div>

            {/* Floating Decoration with animation */}
            <div className="absolute -z-10 -top-8 -left-8 w-72 h-72 bg-linear-to-br from-primary/15 to-transparent rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -right-8 w-72 h-72 bg-linear-to-br from-secondary/15 to-transparent rounded-full blur-3xl animate-pulse" />
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                {DOCTOR_NAME}
              </h3>

              <div className="flex flex-wrap gap-2">
                <Badge variant="primary" size="lg">
                  {DOCTOR_CRO}
                </Badge>
                <Badge variant="secondary" size="lg">
                  Cirurgia Bucomaxilofacial
                </Badge>
                <Badge variant="secondary" size="lg">
                  35 Anos de Experiência
                </Badge>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-base sm:text-lg text-tertiary leading-relaxed">
                Graduado em Odontologia pela&nbsp;
                <strong className="text-secondary">
                  Universidade Federal de Pelotas (1984)
                </strong>
                &nbsp;e especialista em&nbsp;
                <strong className="text-secondary">
                  Cirurgia e Traumatologia Bucomaxilofacial pela USP (1991)
                </strong>
                , com 38 anos de carreira dedicados exclusivamente à saúde bucal
                em Cascavel.
              </p>

              <p className="text-base sm:text-lg text-tertiary leading-relaxed">
                Membro da&nbsp;
                <strong className="text-secondary">
                  Academia Brasileira de Osseointegração
                </strong>
                &nbsp;e ex-professor de Cirurgia na Unioeste, acompanhou o
                desenvolvimento da implantodontia no Brasil desde o início dos
                anos 1990, dominando todas as técnicas modernas, desde cirurgias
                guiadas 3D até procedimentos minimamente invasivos.
              </p>

              <p className="text-base sm:text-lg text-tertiary leading-relaxed">
                A&nbsp;
                <strong className="text-secondary">
                  humanização do atendimento
                </strong>
                &nbsp;é o pilar fundamental da clínica: ambiente acolhedor,
                escuta atenta, acompanhamento completo no pré e pós-cirúrgico, e
                rigor absoluto em biossegurança. Seus primeiros pacientes das
                décadas de 1980 e 90 continuam confiando no tratamento e já
                trouxeram filhos e netos.
              </p>
            </div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <Card
            title="38 Anos em Cascavel"
            variant="service"
            className="group hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm sm:text-base text-tertiary leading-relaxed">
              Graduado pela UFPEL (1984) e especialista pela USP (1991). Membro
              da Academia Brasileira de Osseointegração
            </p>
          </Card>

          <Card
            title="Cirurgias Guiadas 3D"
            variant="service"
            className="group hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors mb-4">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm sm:text-base text-tertiary leading-relaxed">
              Scanner intraoral Sirios, câmera Skycam e tecnologia 3D para
              cirurgias precisas e menos invasivas
            </p>
          </Card>

          <Card
            title="Humanização e Acolhimento"
            variant="service"
            className="group hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors mb-4">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm sm:text-base text-tertiary leading-relaxed">
              Ambiente acolhedor, escuta atenta e acompanhamento completo no pré
              e pós-cirúrgico. Rigor em biossegurança
            </p>
          </Card>

          <Card
            title="Gerações de Confiança"
            variant="service"
            className="group hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm sm:text-base text-tertiary leading-relaxed">
              Pacientes desde os anos 80 e 90 continuam retornando e trazem
              filhos e netos. Confiança que resiste ao tempo
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
