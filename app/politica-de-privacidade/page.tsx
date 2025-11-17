import type { Metadata } from "next";
import { DOCTOR_NAME, CLINIC_WEBSITE } from "@/app/src/lib/constants";

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
    <main className="min-h-screen bg-bg-subtle">
      <div className="container px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-brand p-8 sm:p-12 mt-16">
          {/* Header */}
          <header className="mb-12 pb-8 border-b border-border-subtle">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-text-heading mb-4">
              Política de Privacidade
            </h1>
            <p className="text-text-muted">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-text-body leading-relaxed mb-4">
              A privacidade dos visitantes do nosso site é muito importante para
              nós, e estamos comprometidos em protegê-la. Esta política explica
              como tratamos suas informações pessoais.
            </p>
          </section>

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              1. Informações que Coletamos
            </h2>
            <p className="text-text-body leading-relaxed mb-4">
              Podemos coletar, armazenar e usar os seguintes tipos de
              informações:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-body ml-4">
              <li>Informações fornecidas através de formulários de contato</li>
              <li>Dados de navegação e uso do site</li>
              <li>Informações sobre o dispositivo e navegador utilizado</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              2. Uso das Informações
            </h2>
            <p className="text-text-body leading-relaxed mb-4">
              As informações coletadas são utilizadas para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-body ml-4">
              <li>Responder às suas solicitações e perguntas</li>
              <li>Melhorar nossos serviços e experiência do usuário</li>
              <li>
                Enviar informações relevantes sobre tratamentos e serviços
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              3. Proteção de Dados
            </h2>
            <p className="text-text-body leading-relaxed">
              Implementamos medidas de segurança adequadas para proteger suas
              informações pessoais contra acesso não autorizado, alteração,
              divulgação ou destruição. Todos os dados são tratados em
              conformidade com a Lei Geral de Proteção de Dados (LGPD).
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              4. Seus Direitos
            </h2>
            <p className="text-text-body leading-relaxed mb-4">
              Você tem o direito de:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-body ml-4">
              <li>Solicitar acesso aos seus dados pessoais</li>
              <li>Solicitar correção de dados incorretos</li>
              <li>Solicitar exclusão de seus dados</li>
              <li>Revogar seu consentimento a qualquer momento</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              5. Cookies
            </h2>
            <p className="text-text-body leading-relaxed">
              Este site utiliza cookies para melhorar a experiência do usuário e
              coletar informações sobre como o site é utilizado. Ao continuar
              navegando, você concorda com o uso de cookies.
            </p>
          </section>

          {/* Contact */}
          <section className="mt-12 pt-8 border-t border-border-subtle">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              Contato
            </h2>
            <p className="text-text-body leading-relaxed">
              Para exercer seus direitos ou esclarecer dúvidas sobre esta
              política, entre em contato conosco através dos canais disponíveis
              no site.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
