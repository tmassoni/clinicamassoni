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
  title: `Dentista em ${CLINIC_ADDRESS_CITY}: Implantes e Cirurgia Buco-Maxilo-Facial`,
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
  },
  twitter: {
    title: `${DOCTOR_NAME} | Dentista em ${CLINIC_ADDRESS_CITY}`,
    description: `Dentista em ${CLINIC_ADDRESS_CITY} especializado em ${DOCTOR_SPECIALTY} e implantes dentários.`,
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
