import type { Metadata } from "next";
import {
  DOCTOR_NAME,
  CLINIC_WEBSITE,
  CONTACT_EMAIL,
} from "@/app/src/lib/constants";

const LAST_UPDATED_ISO = "2026-08-10";
const LAST_UPDATED_LABEL = "10 de agosto de 2026";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Política de Privacidade e proteção de dados pessoais - ${DOCTOR_NAME}`,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${CLINIC_WEBSITE}/politica-de-privacidade`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main id="main" tabIndex={-1} className="min-h-screen bg-bg-subtle">
      <div className="container px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-brand p-8 sm:p-12 mt-16">
          {/* Header */}
          <header className="mb-12 pb-8 border-b border-border-subtle">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-text-heading mb-4">
              Política de Privacidade
            </h1>
            <p className="text-text-muted">
              Última atualização:{" "}
              <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED_LABEL}</time>
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-text-body leading-relaxed mb-4">
              Esta política explica quais dados podem ser tratados durante a
              navegação no site da clínica, para quais finalidades e como entrar
              em contato para exercer seus direitos.
            </p>
          </section>

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              1. Dados tratados pelo site
            </h2>
            <p className="text-text-body leading-relaxed mb-4">
              Este site não possui cadastro nem formulário de contato. Durante
              a navegação, os serviços de métricas podem tratar informações
              técnicas e de uso, como:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-body ml-4">
              <li>página acessada e site de origem da visita;</li>
              <li>país ou região aproximada, navegador e tipo de dispositivo;</li>
              <li>métricas de desempenho e estabilidade das páginas;</li>
              <li>
                cliques nos botões de WhatsApp e telefone, com a página e a
                seção em que o clique ocorreu.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              2. Finalidades
            </h2>
            <p className="text-text-body leading-relaxed mb-4">
              Essas informações são utilizadas para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-body ml-4">
              <li>entender, de forma agregada, como o site é encontrado e usado;</li>
              <li>identificar problemas técnicos e melhorar o desempenho;</li>
              <li>avaliar quais páginas ajudam o visitante a buscar atendimento.</li>
            </ul>
            <p className="text-text-body leading-relaxed mt-4">
              O site não utiliza esses dados para enviar publicidade ou
              informações sobre tratamentos por e-mail.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              3. Vercel Analytics e Speed Insights
            </h2>
            <p className="text-text-body leading-relaxed">
              Utilizamos o Vercel Web Analytics e o Vercel Speed Insights para
              estatísticas agregadas de audiência e desempenho. De acordo com a
              documentação da Vercel, o Analytics não utiliza cookies, não cria
              perfis entre sites e usa identificadores anônimos que mudam
              diariamente. O Speed Insights coleta métricas reais de desempenho
              da navegação. Saiba mais na{" "}
              <a
                href="https://vercel.com/docs/analytics/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-4 hover:text-secondary"
              >
                documentação de privacidade da Vercel
              </a>
              .
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              4. Google Maps e links externos
            </h2>
            <p className="text-text-body leading-relaxed">
              A página inicial incorpora um mapa do Google Maps e oferece links
              para serviços externos, como WhatsApp e redes sociais. Ao carregar
              o mapa ou acessar esses links, os respectivos provedores podem
              tratar dados conforme suas próprias políticas. A clínica não
              controla as práticas de privacidade desses serviços.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              5. Seus direitos
            </h2>
            <p className="text-text-body leading-relaxed mb-4">
              Nos termos da LGPD, você pode solicitar, quando aplicável:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-body ml-4">
              <li>confirmação da existência de tratamento e acesso aos dados;</li>
              <li>correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>informações sobre compartilhamento e demais direitos legais;</li>
              <li>eliminação, anonimização ou bloqueio, quando cabível.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              6. Cookies
            </h2>
            <p className="text-text-body leading-relaxed">
              A medição própria deste site, realizada pela Vercel, é configurada
              sem cookies. Serviços externos incorporados ou acessados por link
              podem adotar cookies segundo suas próprias políticas. Caso sejam
              adicionadas no futuro ferramentas que dependam de cookies não
              essenciais, esta política e o mecanismo de consentimento deverão
              ser atualizados antes da ativação.
            </p>
          </section>

          {/* Contact */}
          <section className="mt-12 pt-8 border-t border-border-subtle">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              Contato
            </h2>
            <p className="text-text-body leading-relaxed">
              Para exercer seus direitos ou esclarecer dúvidas sobre esta
              política, escreva para{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-primary underline underline-offset-4 hover:text-secondary"
              >
                {CONTACT_EMAIL}
              </a>
              . Para proteger o sigilo, não envie exames, fotografias clínicas
              ou outros dados de saúde por e-mail sem orientação da clínica.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
