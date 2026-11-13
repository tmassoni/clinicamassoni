import Image from 'next/image'
import type { EditorialImage } from '@/app/src/lib/editorial-images'

export function EditorialIllustration({ image }: { image: EditorialImage }) {
  return (
    <figure className="mb-8">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 1024px) 100vw, 864px"
        className="h-auto w-full rounded-2xl"
      />
      <figcaption className="mt-2 text-sm text-tertiary">
        Ilustração editorial gerada por IA.
      </figcaption>
    </figure>
  )
}
