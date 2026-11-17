import type { ReactNode } from 'react'
import Image from 'next/image'

interface CardImageProps {
  image: { src: string; alt: string } | null
  sizes: string
  preload?: boolean
  fallback?: ReactNode
  children?: ReactNode
}

export function CardImage({ image, sizes, preload, fallback, children }: CardImageProps) {
  if (!image && !fallback) return null

  return (
    <div className="relative aspect-3/2 w-full overflow-hidden">
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            quality={85}
            preload={preload}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary/45 via-primary/5 to-transparent" />
        </>
      ) : fallback}

      <div className="absolute inset-0 ring-1 ring-inset ring-white/20" />
      {children}
    </div>
  )
}
