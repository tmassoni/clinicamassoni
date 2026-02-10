import { Home, SearchX } from 'lucide-react'
import { LinkButton } from '@/app/src/components/custom/LinkButton'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-linear-to-br from-white via-accent/10 to-primary/5">
      <section className="container px-6 sm:px-8 lg:px-12 pt-36 pb-20 sm:pt-40 sm:pb-24">
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-primary/10 bg-white/95 p-8 shadow-brand sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/8 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative z-10">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <SearchX className="h-4 w-4" aria-hidden="true" />
              Erro 404
            </span>

            <h1 className="font-serif text-3xl font-bold tracking-tight text-text-heading sm:text-5xl">
              Página não encontrada
            </h1>

            <p className="mt-4 text-base leading-relaxed text-text-body sm:text-lg">
              A rota que você tentou acessar não existe ou foi movida. Use os
              botões abaixo para voltar à página inicial e continuar sua
              navegação.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <LinkButton
                href="/"
                variant="primary"
                size="default"
                className="w-full sm:w-auto"
              >
                <Home className="mr-2 h-4 w-4" aria-hidden="true" />
                Ir para a página inicial
              </LinkButton>

              <LinkButton
                href="/#contato"
                variant="subtle"
                size="default"
                className="w-full sm:w-auto"
              >
                Falar com a clínica
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
