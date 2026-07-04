import type { Metadata, Viewport } from 'next'
import Script from "next/script";
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { Header } from '@/app/src/components/layout/Header'
import { Footer } from '@/app/src/components/layout/Footer'
import { getStructuredData } from '@/app/src/lib/structured-data'
import {
  DOCTOR_NAME,
  DOCTOR_SPECIALTY,
  CONTACT_EMAIL,
  CLINIC_ADDRESS_CITY,
  CLINIC_ADDRESS_STATE,
  CLINIC_WEBSITE,
} from '@/app/src/lib/constants'

// Font configurations
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION

// Metadata
export const metadata: Metadata = {
  metadataBase: new URL(CLINIC_WEBSITE),

  title: {
    default: `${DOCTOR_NAME} - ${DOCTOR_SPECIALTY} em ${CLINIC_ADDRESS_CITY}, ${CLINIC_ADDRESS_STATE}`,
    template: `%s | ${DOCTOR_NAME}`,
  },

  description: `${DOCTOR_NAME}, cirurgião dentista especialista em ${DOCTOR_SPECIALTY} com 41 anos de formado (desde 1984) em ${CLINIC_ADDRESS_CITY}. Implantes dentários, cirurgia plástica periodontal, recobrimento de recessões gengivais e cirurgias guiadas 3D. Atendimento humanizado e tecnologia de ponta. Agende sua consulta!`,

  keywords: [
    'implantes dentários',
    'cirurgia bucomaxilofacial',
    'cirurgia plástica periodontal',
    'recobrimento recessão gengival',
    'cirurgião dentista',
    'dentista Cascavel',
    'implante dentário Cascavel',
    'cirurgia ortognática',
    'extração de sisos',
    'enxerto ósseo dental',
    'protocolo all-on-4',
    'implantes imediatos área estética',
    'cirurgias guiadas 3D',
    '41 anos de formado',
    '41 anos experiência',
    'academia brasileira osseointegração',
    'dentista PR',
    DOCTOR_NAME,
    'CRO-PR 4982',
  ],

  authors: [{ name: DOCTOR_NAME }],
  creator: DOCTOR_NAME,
  publisher: DOCTOR_NAME,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: '/images/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/images/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/images/icon.png',
  },

  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: CLINIC_WEBSITE,
    siteName: `${DOCTOR_NAME} - Dentista`,
    title: `${DOCTOR_NAME} - ${DOCTOR_SPECIALTY}`,
    description: `Especialista em ${DOCTOR_SPECIALTY} com 41 anos de formado (desde 1984) em ${CLINIC_ADDRESS_CITY}. Implantes dentários, cirurgia plástica periodontal e cirurgias guiadas 3D. Atendimento humanizado.`,
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: `${DOCTOR_NAME} - Clínica Odontológica em Cascavel, PR`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${DOCTOR_NAME} - ${DOCTOR_SPECIALTY}`,
    description: `Especialista em ${DOCTOR_SPECIALTY} com 41 anos de formado (desde 1984). Implantes dentários, cirurgia plástica periodontal e tecnologia 3D em ${CLINIC_ADDRESS_CITY}`,
    images: ['/images/og.png'],
  },

  verification: googleSiteVerification
    ? {
        google: googleSiteVerification,
      }
    : undefined,

  alternates: {
    canonical: CLINIC_WEBSITE,
  },

  other: {
    'contact:email': CONTACT_EMAIL,
  },
}

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#042B48',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: getStructuredData() }}
        />
      </head>
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
