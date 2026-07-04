import type { Metadata } from 'next'
import {
  CLINIC_ADDRESS_CITY,
  CLINIC_ADDRESS_STATE,
  DOCTOR_NAME,
  DOCTOR_SPECIALTY,
} from '@/app/src/lib/constants'
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  GallerySection,
  ContactSection,
} from '@/app/src/components/sections'

export const metadata: Metadata = {
  title: `Dentista em ${CLINIC_ADDRESS_CITY}: Implantes e Cirurgia Buco-Maxilo-Facial | ${DOCTOR_NAME}`,
  description: `${DOCTOR_NAME} é dentista em ${CLINIC_ADDRESS_CITY}, ${CLINIC_ADDRESS_STATE}, especialista em ${DOCTOR_SPECIALTY}, implantes dentários e cirurgia plástica periodontal.`,
  keywords: [
    'dentista',
    'cascavel',
    'dentista cascavel',
    'dentista em cascavel',
    'dentista em cascavel pr',
    'implante dentário cascavel',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${DOCTOR_NAME} | Dentista em ${CLINIC_ADDRESS_CITY}`,
    description: `Dentista em ${CLINIC_ADDRESS_CITY}, ${CLINIC_ADDRESS_STATE}, com foco em ${DOCTOR_SPECIALTY} e implantes dentários.`,
    url: '/',
    images: [
      {
        url: '/images/og-brand.png',
        width: 1200,
        height: 630,
        alt: `${DOCTOR_NAME} - Dentista em ${CLINIC_ADDRESS_CITY}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${DOCTOR_NAME} | Dentista em ${CLINIC_ADDRESS_CITY}`,
    description: `Dentista em ${CLINIC_ADDRESS_CITY} especializado em ${DOCTOR_SPECIALTY} e implantes dentários.`,
    images: ['/images/og-brand.png'],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <ContactSection />
    </main>
  )
}
