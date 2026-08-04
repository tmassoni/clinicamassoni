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
    <figure className="my-8 not-prose">
      <Image
        src={src}
        alt={alt ?? ''}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 768px"
        quality={85}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        className="w-full h-auto rounded-lg shadow-brand"
      />
      {alt && (
        <figcaption className="mt-3 text-sm text-text-muted leading-relaxed">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}
