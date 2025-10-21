'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Building2, Camera, Sparkles } from 'lucide-react'

// Generate array of all 25 gallery images
const galleryImages = Array.from({ length: 25 }, (_, i) => ({
  src: `/images/gallery/gallery-${String(i + 1).padStart(2, '0')}.webp`,
  alt: `Clínica Dr. Enor Massoni - Cascavel PR - Imagem ${i + 1}`,
  category: i < 8 ? 'clinic' : i < 16 ? 'equipment' : 'treatment',
}))

const categories = [
  { id: 'all', label: 'Todas', icon: Sparkles },
  { id: 'clinic', label: 'Clínica', icon: Building2 },
  { id: 'equipment', label: 'Equipamentos', icon: Camera },
  { id: 'treatment', label: 'Tratamentos', icon: Sparkles },
]

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredImages =
    selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory)

  return (
    <section
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-white overflow-hidden"
      id="galeria"
    >
      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#C8CFD3]/20 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <Badge variant="primary" size="lg" className="mb-4">
            Nossa Estrutura
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#042B48] mb-6">
            Conheça Nossa{' '}
            <span className="bg-gradient-to-r from-[#3C576A] to-[#042B48] bg-clip-text text-transparent">
              Clínica
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-[#6A7E8B] leading-relaxed">
            Ambiente moderno e acolhedor com tecnologia de ponta
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300
                  ${
                    selectedCategory === category.id
                      ? 'bg-[#042B48] text-white shadow-lg scale-105'
                      : 'bg-white text-[#6A7E8B] border-2 border-[#C8CFD3] hover:border-[#042B48]/30 hover:text-[#042B48]'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            )
          })}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-8">
          {filteredImages.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <button
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-[#C8CFD3]/10 cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10"
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    quality={85}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#042B48]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Zoom Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-[#042B48]"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>

                  {/* Decorative Border */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-[#042B48]/10 group-hover:ring-[#042B48]/30 rounded-2xl transition-all pointer-events-none" />
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    quality={95}
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {filteredImages.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-[85%] sm:basis-[70%]"
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="group relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#C8CFD3]/10 cursor-pointer"
                        onClick={() => setSelectedImage(index)}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover group-active:scale-95 transition-transform duration-300"
                          sizes="85vw"
                          quality={85}
                        />

                        {/* Tap Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#042B48]/40 via-transparent to-transparent" />

                        {/* Decorative Border */}
                        <div className="absolute inset-0 ring-1 ring-inset ring-[#042B48]/10 rounded-2xl pointer-events-none" />
                      </button>
                    </DialogTrigger>

                    <DialogContent className="max-w-[95vw] p-2 bg-transparent border-none">
                      <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-contain"
                          sizes="95vw"
                          quality={95}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 bg-white border-2 border-[#042B48]/20 hover:bg-[#042B48] hover:text-white hover:border-[#042B48]" />
              <CarouselNext className="static translate-y-0 bg-white border-2 border-[#042B48]/20 hover:bg-[#042B48] hover:text-white hover:border-[#042B48]" />
            </div>
          </Carousel>
        </div>

        {/* Image Counter */}
        <div className="text-center mt-8">
          <p className="text-sm text-[#6A7E8B]">
            Mostrando{' '}
            <span className="font-bold text-[#042B48]">
              {filteredImages.length}
            </span>{' '}
            de{' '}
            <span className="font-bold text-[#042B48]">
              {galleryImages.length}
            </span>{' '}
            imagens
          </p>
        </div>
      </div>
    </section>
  )
}
