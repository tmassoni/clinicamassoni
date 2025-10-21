import { Badge } from '@/app/src/components/ui/Badge'
import { LinkButton } from '@/app/src/components/ui/LinkButton'
import { CONTACT_WHATSAPP_NUMBER } from '@/app/src/lib/constants'
import { Smile, Bone, Scissors, Check, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Smile,
    title: 'Implantes Dentários',
    description:
      'Reabilitação oral completa com tecnologia de ponta para devolver seu sorriso',
    procedures: [
      'Implante unitário',
      'Múltiplos implantes',
      'Protocolo fixo (All-on-4/6)',
      'Enxerto ósseo',
      'Levantamento de seio maxilar',
      'Carga imediata',
    ],
    gradient: 'from-primary to-[#3C576A]',
  },
  {
    icon: Bone,
    title: 'Cirurgia Bucomaxilofacial',
    description:
      'Procedimentos especializados para correção e reconstrução facial',
    procedures: [
      'Cirurgia ortognática',
      'Tratamento de ATM',
      'Traumatismo facial',
      'Reconstrução mandibular',
      'Cirurgia de cistos e tumores',
      'Assimetrias faciais',
    ],
    gradient: 'from-[#3C576A] to-[#6A7E8B]',
  },
  {
    icon: Scissors,
    title: 'Cirurgias Orais',
    description:
      'Procedimentos cirúrgicos com técnicas modernas e cuidado personalizado',
    procedures: [
      'Extração de sisos inclusos',
      'Frenectomia lingual',
      'Frenectomia labial',
      'Biópsias orais',
      'Remoção de lesões',
      'Cirurgias pré-protéticas',
    ],
    gradient: 'from-[#6A7E8B] to-[#C8CFD3]',
  },
]

export function ServicesSection() {
  return (
    <section
      className="relative section bg-linear-to-b from-accent/5 to-white overflow-hidden"
      id="servicos"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(60,87,106,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(4,43,72,0.03),transparent_50%)] pointer-events-none" />

      <div className="container relative z-10 px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <Badge variant="primary" size="lg" className="mb-4">
            Nossos Serviços
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Tratamentos&nbsp;
            <span className="bg-linear-to-r from-secondary to-primary bg-clip-text text-transparent">
              Especializados
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-tertiary leading-relaxed">
            Soluções completas para sua saúde bucal e facial com excelência e
            tecnologia
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-16 sm:mb-20">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={index} className="group relative">
                {/* Card */}
                <div className="relative h-full bg-white rounded-3xl border border-accent/50 hover:border-primary/30 p-8 transition-all duration-500 hover:shadow-3xl hover:-translate-y-3">
                  {/* Icon with Gradient Background */}
                  <div className="relative mb-6">
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${service.gradient} shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Decorative Dot */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full opacity-20 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-tertiary leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Procedures List */}
                  <div className="space-y-3 mb-8">
                    {service.procedures.map((procedure, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 group/item"
                      >
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-tertiary group-hover/item:text-secondary transition-colors leading-relaxed">
                          {procedure}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <a
                    href="#contato"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group/link"
                  >
                    <span>Saiba mais</span>
                    <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                  </a>

                  {/* Hover Gradient Border Effect */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-linear-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-linear-to-br from-primary via-secondary to-primary p-8 sm:p-12 lg:p-16 text-center overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Não encontrou o tratamento que procura?
              </h3>

              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Entre em contato conosco para uma avaliação personalizada e
                descubra a melhor solução para o seu caso
              </p>

              <LinkButton
                href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(
                  /\D/g,
                  ''
                )}`}
                external
                newTab
                variant="default"
                size="xl"
                className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Conversar com um especialista
              </LinkButton>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
