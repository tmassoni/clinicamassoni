"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { Badge } from "@/app/src/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/src/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/app/src/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  categories,
  galleryImages,
  getImagesByCategory,
  type GalleryCategory,
} from "@/app/src/lib/gallery-data";

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategory>("all");
  const filterRef = useRef<HTMLDivElement>(null);
  const filterTopRef = useRef<number>(0);

  const filteredImages = getImagesByCategory(selectedCategory);

  // Keep scroll anchored to filter position
  useLayoutEffect(() => {
    if (filterRef.current && filterTopRef.current) {
      const currentTop = filterRef.current.getBoundingClientRect().top;
      const diff = currentTop - filterTopRef.current;
      if (diff !== 0) {
        window.scrollBy(0, diff);
      }
    }
  }, [filteredImages]);

  const handleCategoryChange = (category: GalleryCategory) => {
    if (filterRef.current) {
      filterTopRef.current = filterRef.current.getBoundingClientRect().top;
    }
    setSelectedCategory(category);
  };

  return (
    <section className="relative section bg-white overflow-hidden" id="galeria">
      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-accent/20 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-primary/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <Badge variant="primary" size="lg" className="mb-4">
            Nossa Estrutura
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Conheça Nossa&nbsp;
            <span className="bg-linear-to-r from-secondary to-primary bg-clip-text text-transparent">
              Clínica
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-tertiary leading-relaxed">
            Ambiente moderno e acolhedor com tecnologia de ponta
          </p>
        </div>

        {/* Category Filter */}
        <div
          ref={filterRef}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`
                  inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer
                  ${
                    selectedCategory === category.id
                      ? "bg-primary text-white shadow-lg scale-105"
                      : "bg-white text-tertiary border-2 border-accent hover:border-primary/30 hover:text-primary hover:scale-105"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-8 transition-all duration-300">
          {filteredImages.map((image) => (
            <GalleryImageCard key={image.id} image={image} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden transition-all duration-300">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {filteredImages.map((image) => (
                <CarouselItem
                  key={image.id}
                  className="pl-4 basis-[85%] sm:basis-[70%]"
                >
                  <GalleryImageCard image={image} isMobile />
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 bg-white border-2 border-primary/20 hover:bg-primary hover:text-white hover:border-primary">
                <ChevronLeft className="w-4 h-4" />
              </CarouselPrevious>
              <CarouselNext className="static translate-y-0 bg-white border-2 border-primary/20 hover:bg-primary hover:text-white hover:border-primary">
                <ChevronRight className="w-4 h-4" />
              </CarouselNext>
            </div>
          </Carousel>
        </div>

        {/* Image Counter */}
        <div className="flex justify-center items-center mt-8">
          <p className="text-sm text-tertiary">
            Mostrando&nbsp;
            <span className="font-bold text-primary">
              {filteredImages.length}
            </span>
            &nbsp; de&nbsp;
            <span className="font-bold text-primary">
              {galleryImages.length}
            </span>
            &nbsp; imagens
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Reusable Gallery Image Card Component
 * Handles both desktop grid and mobile carousel layouts
 */
interface GalleryImageCardProps {
  image: {
    id: string;
    src: string;
    alt: string;
    description?: string;
  };
  isMobile?: boolean;
}

function GalleryImageCard({ image, isMobile = false }: GalleryImageCardProps) {
  const aspectRatio = isMobile ? "aspect-4/5" : "aspect-square";
  const hoverScale = isMobile
    ? "group-active:scale-95"
    : "group-hover:scale-110";
  const overlayOpacity = isMobile
    ? "bg-linear-to-t from-primary/40 via-transparent to-transparent"
    : "bg-linear-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`group relative ${aspectRatio} w-full rounded-2xl overflow-hidden bg-accent/10 cursor-pointer transition-transform duration-300 ${
            !isMobile ? "hover:scale-105 hover:z-10" : ""
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={`object-cover ${hoverScale} transition-transform duration-${
              isMobile ? "300" : "500"
            }`}
            sizes={
              isMobile
                ? "85vw"
                : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            }
            quality={75}
          />

          {/* Overlay */}
          <div className={`absolute inset-0 ${overlayOpacity}`} />

          {/* Zoom Icon (Desktop only) */}
          {!isMobile && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
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
          )}

          {/* Decorative Border */}
          <div
            className={`absolute inset-0 ring-1 ring-inset ring-primary/10 ${
              !isMobile ? "group-hover:ring-primary/30 transition-all" : ""
            } rounded-2xl pointer-events-none`}
          />
        </button>
      </DialogTrigger>

      <DialogContent
        className={`${
          isMobile ? "max-w-[95vw] p-2" : "max-w-4xl p-0"
        } bg-transparent border-none [&>button]:absolute [&>button]:-top-12 ${
          isMobile ? "[&>button]:right-2" : "[&>button]:right-0"
        } [&>button]:bg-white [&>button]:text-primary [&>button]:hover:bg-primary [&>button]:hover:text-white [&>button]:w-10 [&>button]:h-10 [&>button]:rounded-full [&>button]:shadow-lg [&>button]:opacity-100`}
      >
        <DialogTitle className="sr-only">{image.alt}</DialogTitle>
        <div
          className={`relative ${
            isMobile ? "aspect-4/5" : "aspect-4/3"
          } w-full rounded-2xl overflow-hidden`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
            sizes={isMobile ? "95vw" : "90vw"}
            quality={90}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
