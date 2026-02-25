import type { Metadata, Viewport } from 'next'
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
  SEO_KEYWORDS,
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
    default: `${DOCTOR_NAME} | Dentista em ${CLINIC_ADDRESS_CITY}, ${CLINIC_ADDRESS_STATE}`,
    template: `%s | ${DOCTOR_NAME}`,
  },

  description: `${DOCTOR_NAME}, dentista em ${CLINIC_ADDRESS_CITY}, ${CLINIC_ADDRESS_STATE}, especialista em ${DOCTOR_SPECIALTY}. Tratamentos em implantes dentários, cirurgia plástica periodontal e cirurgias guiadas 3D com atendimento humanizado.`,
  keywords: SEO_KEYWORDS,

  authors: [{ name: DOCTOR_NAME }],
  creator: DOCTOR_NAME,
  publisher: DOCTOR_NAME,
  category: 'Saúde',

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
    siteName: `${DOCTOR_NAME} - Dentista em ${CLINIC_ADDRESS_CITY}`,
    title: `${DOCTOR_NAME} | Dentista em ${CLINIC_ADDRESS_CITY}`,
    description: `Dentista em ${CLINIC_ADDRESS_CITY}, ${CLINIC_ADDRESS_STATE}, com foco em ${DOCTOR_SPECIALTY}, implantes dentários e cirurgias guiadas 3D.`,
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
    title: `${DOCTOR_NAME} | Dentista em ${CLINIC_ADDRESS_CITY}`,
    description: `Dentista em ${CLINIC_ADDRESS_CITY} especializado em ${DOCTOR_SPECIALTY}, implantes dentários e tecnologia 3D.`,
    images: ['/images/og.png'],
  },

  verification: googleSiteVerification
    ? {
        google: googleSiteVerification,
      }
    : undefined,

  alternates: {
    canonical: '/',
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
