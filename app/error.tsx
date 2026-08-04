'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Phone, RotateCcw } from 'lucide-react'
import { CONTACT_WHATSAPP_URL, CONTACT_PHONE_NUMBER } from '@/app/src/lib/constants'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Surfaces in Vercel's runtime logs; the digest correlates to the server error.
    console.error('Unhandled route error:', error)
  }, [error])

  return (
    <main
      id="main"
      tabIndex={-1}
      className="min-h-screen bg-linear-to-br from-white via-accent/10 to-primary/5"
    >
      <div className="container px-6 pt-40 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="mb-4 font-serif text-3xl font-bold text-primary sm:text-4xl">
            Algo deu errado
          </h1>

          <p className="mb-8 leading-relaxed text-tertiary">
            Não foi possível carregar esta página. Você pode tentar novamente ou
            falar diretamente com a clínica.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-brand-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Tentar novamente
            </button>

            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-6 py-3 text-sm font-semibold text-primary transition-all hover:border-primary/30 hover:shadow-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Falar pelo WhatsApp
            </a>
          </div>

          <p className="mt-8 text-sm text-tertiary">
            Ou ligue para {CONTACT_PHONE_NUMBER}.{' '}
            <Link href="/" className="font-medium text-primary hover:underline">
              Voltar ao início
            </Link>
          </p>

          {error.digest && (
            <p className="mt-6 text-xs text-tertiary/70">
              Código de referência: {error.digest}
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
