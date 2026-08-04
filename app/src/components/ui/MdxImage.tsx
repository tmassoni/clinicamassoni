import Image from 'next/image'
import { getMdxImageDimensions } from '@/app/src/lib/mdx-image-dimensions'

interface MdxImageProps {
  src?: string
  alt?: string
  /** Set on the LCP image only. */
  priority?: boolean
}

/**
 * Renders markdown `![]()` through next/image with intrinsic dimensions from
 * the registry, so content images never shift layout. The alt text doubles as
 * the visible caption.
 */
export function MdxImage({ src, alt, priority = false }: MdxImageProps) {
  if (!src) return null

  const { width, height } = getMdxImageDimensions(src)

  return (
    <figure className="not-prose my-10">
      <div className="relative overflow-hidden rounded-2xl shadow-brand-lg ring-1 ring-accent/50">
        <Image
          src={src}
          alt={alt ?? ''}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 768px"
          quality={85}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className="h-auto w-full"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10"
        />
      </div>

      {alt && (
        <figcaption className="mt-3 border-l-2 border-accent pl-3 text-sm leading-relaxed text-tertiary">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}
