import type { Metadata } from "next";
import {
  DOCTOR_NAME,
  CLINIC_WEBSITE,
  CONTACT_EMAIL,
} from "@/app/src/lib/constants";

const LAST_UPDATED_ISO = "2026-08-10";
const LAST_UPDATED_LABEL = "10 de agosto de 2026";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: `Termos de Uso do site - ${DOCTOR_NAME}`,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${CLINIC_WEBSITE}/termos-de-uso`,
  },
};

export default function TermsOfUsePage() {
  return (
    <main id="main" tabIndex={-1} className="min-h-screen bg-bg-subtle">
      <div className="container px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-brand p-8 sm:p-12 mt-16">
          {/* Header */}
          <header className="mb-12 pb-8 border-b border-border-subtle">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-text-heading mb-4">
              Termos de Uso
            </h1>
            <p className="text-text-muted">
              Última atualização:{" "}
              <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED_LABEL}</time>
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-text-body leading-relaxed mb-4">
              Estes termos regulam o uso do site de {DOCTOR_NAME}. Ao continuar
              a navegação, você declara estar ciente destas condições.
            </p>
          </section>

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              1. Aceitação dos Termos
            </h2>
            <p className="text-text-body leading-relaxed">
              Ao acessar e usar este site, você aceita e concorda em ficar
              vinculado a estes termos e condições. Se você não
              concordar com alguma parte destes termos, não deverá usar nosso
              site.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              2. Uso do Site
            </h2>
            <p className="text-text-body leading-relaxed mb-4">
              O conteúdo deste site é fornecido apenas para fins informativos
              sobre os serviços odontológicos oferecidos. Você concorda em usar
              o site apenas para fins legais e de maneira que não viole os
              direitos de terceiros.
            </p>
            <p className="text-text-body leading-relaxed">É proibido:</p>
            <ul className="list-disc list-inside space-y-2 text-text-body ml-4 mt-2">
              <li>Usar o site de forma fraudulenta ou maliciosa</li>
              <li>Transmitir vírus, malware ou códigos prejudiciais</li>
              <li>Coletar dados de outros usuários sem consentimento</li>
              <li>Reproduzir conteúdo sem autorização prévia</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              3. Propriedade Intelectual
            </h2>
            <p className="text-text-body leading-relaxed">
              Todo o conteúdo deste site, incluindo textos, imagens, logotipos e
              design, é de propriedade exclusiva de {DOCTOR_NAME} ou de seus
              licenciadores e está protegido por leis de direitos autorais e
              propriedade intelectual.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              4. Informações Médicas
            </h2>
            <p className="text-text-body leading-relaxed">
              As informações contidas neste site são de caráter educacional e
              não substituem uma consulta médica ou odontológica profissional.
              Sempre consulte um profissional qualificado para diagnóstico e
              tratamento adequado.
            </p>
            <p className="text-text-body leading-relaxed mt-4">
              O site não realiza diagnóstico, atendimento de urgência ou
              agendamento automático. O envio de uma mensagem pelo WhatsApp ou
              uma ligação não cria, por si só, uma relação profissional-paciente
              nem confirma horário; o agendamento depende da confirmação da
              equipe da clínica.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              5. Links Externos
            </h2>
            <p className="text-text-body leading-relaxed">
              Este site pode conter links para sites externos. Não somos
              responsáveis pelo conteúdo ou práticas de privacidade de sites de
              terceiros. O acesso a links externos é por sua conta e risco.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              6. Limitação de Responsabilidade
            </h2>
            <p className="text-text-body leading-relaxed">
              Este site é fornecido &quot;no estado em que se encontra&quot;.
              Não garantimos que o site estará sempre disponível ou livre de
              erros. Não nos responsabilizamos por danos resultantes do uso ou
              impossibilidade de usar o site.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              7. Modificações dos Termos
            </h2>
            <p className="text-text-body leading-relaxed">
              Reservamo-nos o direito de modificar estes termos a qualquer
              momento. As alterações entrarão em vigor imediatamente após a
              publicação no site. É sua responsabilidade revisar periodicamente
              estes termos.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              8. Lei Aplicável
            </h2>
            <p className="text-text-body leading-relaxed">
              Estes termos são regidos pelas leis da República Federativa do
              Brasil. Qualquer disputa relacionada a estes termos será submetida
              à jurisdição exclusiva dos tribunais de Cascavel, PR.
            </p>
          </section>

          {/* Contact */}
          <section className="mt-12 pt-8 border-t border-border-subtle">
            <h2 className="text-2xl font-serif font-bold text-text-heading mb-4">
              Contato
            </h2>
            <p className="text-text-body leading-relaxed">
              Se você tiver dúvidas sobre estes termos de uso, escreva para{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-primary underline underline-offset-4 hover:text-secondary"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
