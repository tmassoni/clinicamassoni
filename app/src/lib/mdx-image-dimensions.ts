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
  '/images/posts/recontorno-estetico-resina-composta/dentes-antes-do-recontorno.webp': {
    width: 1600,
    height: 1013,
  },
  '/images/posts/recontorno-estetico-resina-composta/planejamento-do-recontorno.webp': {
    width: 1580,
    height: 1003,
  },
  '/images/posts/recontorno-estetico-resina-composta/isolamento-absoluto-resina.webp': {
    width: 1600,
    height: 1067,
  },
  '/images/posts/recontorno-estetico-resina-composta/dentes-apos-o-recontorno.webp': {
    width: 1600,
    height: 1013,
  },
  '/images/posts/reabilitacao-bucal-resina-composta/sorriso-apos-reabilitacao.webp': {
    width: 1400,
    height: 400,
  },
  '/images/posts/reabilitacao-bucal-resina-composta/dentes-anteriores-reabilitados.webp': {
    width: 1600,
    height: 640,
  },
  '/images/posts/reabilitacao-bucal-resina-composta/arcadas-apos-reabilitacao.webp': {
    width: 1600,
    height: 693,
  },
}

export function getMdxImageDimensions(src: string): MdxImageDimensions {
  return MDX_IMAGE_DIMENSIONS[src] ?? DEFAULT_DIMENSIONS
}

export { MDX_IMAGE_DIMENSIONS }
