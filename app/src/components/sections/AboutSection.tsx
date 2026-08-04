import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/app/src/components/ui/badge";
import { ProcedureCard } from "@/app/src/components/custom/ProcedureCard";
import {
  DOCTOR_NAME,
  DOCTOR_CRO,
  DOCTOR_SPECIALTY,
  DOCTOR_THIAGO_NAME,
  DOCTOR_THIAGO_CRO,
  DOCTOR_THIAGO_SPECIALTIES,
} from "@/app/src/lib/constants";
import {
  Award,
  BookOpen,
  Heart,
  Users,
  Sparkles,
  PaintBucket,
  Gem,
  Shield,
  Stethoscope,
  ArrowRight,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

interface Credential {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

// "41 anos" and "gerações" are about the practitioners, so they lead to /sobre.
// The 3D workflow has a dedicated article. Humanização describes how treatment
// is conducted, so it lands on the treatments hub.
const credentials: Credential[] = [
  {
    icon: BookOpen,
    title: "41 Anos de Formado",
    description:
      "Graduado pela UFPEL em 1984 e especialista em cirurgia bucomaxilofacial pela FOB-USP (1993)",
    href: "/sobre",
  },
  {
    icon: Award,
    title: "Cirurgias Guiadas 3D",
    description:
      "Scanner intraoral, câmera e tecnologia 3D para cirurgias precisas e menos invasivas",
    href: "/blog/cirurgia-guiada-3d",
  },
  {
    icon: Heart,
    title: "Humanização e Acolhimento",
    description:
      "Ambiente acolhedor, escuta atenta e acompanhamento no pré e pós-cirúrgico. Rigor em biossegurança",
    href: "/tratamentos",
  },
  {
    icon: Users,
    title: "Gerações de Confiança",
    description:
      "Pacientes desde os anos 80 e 90 continuam retornando e trazem filhos e netos",
    href: "/sobre",
  },
];

interface Procedure {
  icon: LucideIcon;
  text: string;
  href: string;
}

// Each links to the page that explains it. Where a specific article covers the
// topic better than the service page, it points there instead.
const procedures: Procedure[] = [
  {
    icon: PaintBucket,
    text: "Restaurações diretas e indiretas em resina composta",
    href: "/tratamentos/dentistica-restauradora",
  },
  {
    icon: Sparkles,
    text: "Estética dental",
    href: "/blog/recontorno-estetico-resina-composta",
  },
  {
    icon: Gem,
    text: "Facetas em resina composta e porcelana",
    href: "/tratamentos/dentistica-restauradora",
  },
  {
    icon: Award,
    text: "Restaurações em porcelana",
    href: "/tratamentos/dentistica-restauradora",
  },
  {
    icon: Shield,
    text: "Próteses unitárias e de múltiplos elementos",
    href: "/tratamentos/protese-dentaria",
  },
  {
    icon: Stethoscope,
    text: "Profilaxia e raspagens periodontais",
    href: "/blog/profilaxia-dental",
  },
];

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
            Nossos Especialistas
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center mb-12">
          {/* Left - Image */}
          <div className="relative order-1">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl group">
              {/* Image overlays for depth */}
              <div className="absolute inset-0 bg-linear-to-t from-primary/20 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-primary/10 z-10" />

              <Image
                src="/images/team/enor.webp"
                alt={`${DOCTOR_NAME} - Especialista em ${DOCTOR_SPECIALTY}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 92vw, 50vw"
                fetchPriority="low"
                loading="lazy"
                quality={90}
              />

              {/* Decorative Border */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-3xl pointer-events-none z-10" />
            </div>

            {/* Floating Decoration with animation */}
            <div className="absolute -z-10 -top-8 -left-8 w-72 h-72 bg-linear-to-br from-primary/15 to-transparent rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -right-8 w-72 h-72 bg-linear-to-br from-secondary/15 to-transparent rounded-full blur-3xl animate-pulse" />
          </div>

          {/* Right - Content */}
          <div className="order-2 space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                {DOCTOR_NAME}
              </h3>

              <div className="flex flex-wrap gap-2">
                <Badge variant="primary" size="lg">
                  {DOCTOR_CRO}
                </Badge>
                <Badge variant="secondary" size="lg">
                  Cirurgia Buco-Maxilo-Facial
                </Badge>
                <Badge variant="secondary" size="lg">
                  41 Anos de Formado
                </Badge>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-base sm:text-lg text-tertiary leading-relaxed">
                <strong className="text-secondary">
                  Formado há 41 anos em 1984
                </strong>
                &nbsp;e especializado em&nbsp;
                <strong className="text-secondary">
                  cirurgia bucomaxilofacial pela FOB-USP em 1993
                </strong>
                , tem seu foco de atuação principal na cirurgia oral. Já atuou
                como professor de cirurgia na faculdade de odontologia da
                Unioeste e em cursos de especialização da ABO e está no universo
                dos implantes dentários desde o início da implantodontia no
                Brasil, início dos anos 90, acompanhando todas as evoluções
                tecnológicas da especialidade desde então, sempre participando
                dos maiores eventos científicos, congressos e cursos de
                atualização.
              </p>

              <p className="text-base sm:text-lg text-tertiary leading-relaxed">
                A&nbsp;
                <strong className="text-secondary">
                  humanização do atendimento
                </strong>
                &nbsp;é o pilar fundamental da clínica: ambiente acolhedor,
                escuta atenta, acompanhamento completo no pré e pós-cirúrgico, e
                rigor absoluto em biossegurança. Seus primeiros pacientes já
                trouxeram filhos e netos por conta da confiança e qualidade dos
                tratamentos realizados pelo Dr. Enor.
              </p>
            </div>
          </div>
        </div>

        {/* Credentials Grid — each card reaches the page that expands on it */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {credentials.map((credential) => {
            const Icon = credential.icon;
            return (
              <Link
                key={credential.title}
                href={credential.href}
                className="group relative flex flex-col rounded-3xl border border-accent/50 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-brand-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 transition-colors group-hover:bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 text-primary/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                  />
                </div>

                <h3 className="mb-2 font-serif text-lg! font-bold text-primary transition-colors group-hover:text-secondary">
                  {credential.title}
                </h3>

                <p className="text-sm leading-relaxed text-tertiary">
                  {credential.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Full bios, formação and procedures live on /sobre */}
        <div className="mt-10 text-center">
          <Link
            href="/sobre"
            className="group inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-6 py-3 text-sm font-semibold text-primary transition-all hover:border-primary/30 hover:shadow-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Formação completa e áreas de atuação
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Dr. Thiago Massoni Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center mt-20 pt-20 border-t border-border-subtle">
          {/* Left - Content (inverse layout) */}
          <div className="order-2 lg:order-1 space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                {DOCTOR_THIAGO_NAME}
              </h3>

              <div className="flex flex-wrap gap-2">
                <Badge variant="primary" size="lg">
                  {DOCTOR_THIAGO_CRO}
                </Badge>
                {DOCTOR_THIAGO_SPECIALTIES.map((specialty) => (
                  <Badge key={specialty} variant="secondary" size="lg">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="prose prose-lg max-w-none space-y-4">
              <p className="text-base sm:text-lg text-tertiary leading-relaxed">
                <strong className="text-secondary">
                  Graduado pela PUCPR (2018-2022)
                </strong>
                &nbsp;e especialista em&nbsp;
                <strong className="text-secondary">
                  Dentística Restauradora pela Zenith (2023-2025)
                </strong>
                , atualmente cursando especialização em&nbsp;
                <strong className="text-secondary">
                  Prótese Dentária pela PUCPR (2025-2027)
                </strong>
                .
              </p>

              <p className="text-base sm:text-lg text-tertiary leading-relaxed">
                Especializado em&nbsp;
                <strong className="text-secondary">
                  Odontologia Preventiva e Restauradora
                </strong>
                , oferece tratamentos modernos e personalizados com foco em
                estética dental e preservação da saúde bucal.
              </p>

              <div className="pt-4">
                <h4 className="text-xl sm:text-2xl font-bold text-primary mb-6">
                  Procedimentos Realizados
                </h4>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {procedures.map((procedure, index) => (
                    <ProcedureCard
                      key={index}
                      icon={procedure.icon}
                      text={procedure.text}
                      href={procedure.href}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right - Image (inverse layout) */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl group">
              {/* Image overlays for depth */}
              <div className="absolute inset-0 bg-linear-to-t from-primary/20 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-primary/10 z-10" />

              <Image
                src="/images/team/thiago.webp"
                alt={`${DOCTOR_THIAGO_NAME} - ${DOCTOR_THIAGO_SPECIALTIES[0]}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 92vw, 50vw"
                fetchPriority="low"
                loading="lazy"
                quality={90}
              />

              {/* Decorative Border */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-3xl pointer-events-none z-10" />
            </div>

            {/* Floating Decoration with animation */}
            <div className="absolute -z-10 -top-8 -right-8 w-72 h-72 bg-linear-to-br from-primary/15 to-transparent rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -left-8 w-72 h-72 bg-linear-to-br from-secondary/15 to-transparent rounded-full blur-3xl animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
