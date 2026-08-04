export interface MdxImageDimensions {
  width: number
  height: number
}

const DEFAULT_DIMENSIONS: MdxImageDimensions = { width: 1600, height: 1067 }

/**
 * Intrinsic dimensions for every image referenced from markdown, keyed by the
 * exact path written in the `![]()`. Supplying these is what keeps CLS at zero.
 * Add an entry whenever an asset differs from the 3:2 default.
 */
const MDX_IMAGE_DIMENSIONS: Record<string, MdxImageDimensions> = {
  '/images/posts/profilaxia-dental/sorriso-apos-profilaxia.webp': {
    width: 1600,
    height: 826,
  },
  '/images/posts/profilaxia-dental/evidenciador-de-placa.webp': {
    width: 1600,
    height: 826,
  },
  '/images/posts/profilaxia-dental/tartaro-arcada-inferior.webp': {
    width: 1600,
    height: 1067,
  },
  '/images/posts/profilaxia-dental/arcada-inferior-apos-limpeza.webp': {
    width: 1600,
    height: 1067,
  },
}

export function getMdxImageDimensions(src: string): MdxImageDimensions {
  return MDX_IMAGE_DIMENSIONS[src] ?? DEFAULT_DIMENSIONS
}

export { MDX_IMAGE_DIMENSIONS }
