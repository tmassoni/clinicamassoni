import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { LinkButton } from '@/components/ui/LinkButton'
import { CONTACT_WHATSAPP_NUMBER } from '@/lib/constants'
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
    gradient: 'from-[#042B48] to-[#3C576A]',
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
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-[#C8CFD3]/5 to-white overflow-hidden"
      id="servicos"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(60,87,106,0.05),transparent_50%)] pointer-events-none" />

      <div className="container relative z-10 px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <Badge variant="primary" size="lg" className="mb-4">
            Nossos Serviços
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#042B48] mb-6">
            Tratamentos{' '}
            <span className="bg-gradient-to-r from-[#3C576A] to-[#042B48] bg-clip-text text-transparent">
              Especializados
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-[#6A7E8B] leading-relaxed">
            Soluções completas para sua saúde bucal e facial com excelência e
            tecnologia
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={index} className="group relative">
                {/* Card */}
                <div className="relative h-full bg-white rounded-3xl border border-[#C8CFD3]/50 hover:border-[#042B48]/20 p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  {/* Icon with Gradient Background */}
                  <div className="relative mb-6">
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Decorative Dot */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#042B48] rounded-full opacity-20 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#042B48] mb-4 group-hover:text-[#3C576A] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#6A7E8B] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Procedures List */}
                  <div className="space-y-3 mb-8">
                    {service.procedures.map((procedure, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 group/item"
                      >
                        <Check className="w-5 h-5 text-[#042B48] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#6A7E8B] group-hover/item:text-[#3C576A] transition-colors">
                          {procedure}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <a
                    href="#contato"
                    className="inline-flex items-center gap-2 text-[#042B48] font-semibold hover:gap-3 transition-all group/link"
                  >
                    <span>Saiba mais</span>
                    <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                  </a>

                  {/* Hover Gradient Border Effect */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#042B48] via-[#3C576A] to-[#042B48] p-8 sm:p-12 lg:p-16 text-center overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Não encontrou o tratamento que procura?
              </h3>

              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
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
                className="bg-white text-[#042B48] hover:bg-white/90 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Falar com Especialista
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
