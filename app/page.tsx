import {
  HeroSection,
  AboutSection,
  ServicesSection,
  GallerySection,
  ContactSection,
} from '@/app/src/components/sections'

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
