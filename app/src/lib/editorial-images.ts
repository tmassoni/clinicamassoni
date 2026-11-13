export interface EditorialImage {
  src: string
  alt: string
  width: number
  height: number
  /** Editorial covers must not become clinical evidence or social cards. */
  kind: 'editorial-illustration'
}

const image = (name: string, alt: string): EditorialImage => ({
  src: `/images/editorial/${name}.webp`,
  alt: `Ilustração conceitual: ${alt}`,
  width: 1536,
  height: 1024,
  kind: 'editorial-illustration',
})

export const EDITORIAL_IMAGES = {
  implantes: image('implantes', 'coroa dental sobre uma base de apoio azul'),
  enxerto: image('enxerto', 'modelo de dente ao lado de uma peça porosa de cerâmica'),
  protese: image('protese', 'arcada dental sobre uma base azul'),
  restauracao: image('restauracao', 'modelo de dente e peça de cerâmica'),
  bucomaxilofacial: image('bucomaxilofacial', 'modelo simplificado de mandíbula'),
  sisos: image('sisos', 'três modelos de molares com destaque para o último'),
  gengiva: image('gengiva', 'modelos de dentes envolvidos por uma faixa verde-água'),
  ortognatica: image('ortognatica', 'escultura de perfil facial e modelo de arcada'),
  avaliacao: image('avaliacao-oral', 'modelo de dente ao lado de uma lupa'),
  trauma: image('trauma-dental', 'modelo de dente com um pequeno fragmento separado'),
  sensibilidade: image('sensibilidade', 'modelo de dente entre formas em verde-água e coral'),
  bruxismo: image('bruxismo', 'modelos de arcadas e placa de proteção'),
  manutencao: image('manutencao-implantes', 'modelo de dente, escova e fio dental'),
}

const POST_IMAGES: Record<string, EditorialImage> = {
  'cirurgiao-bucomaxilofacial-quando-procurar': EDITORIAL_IMAGES.bucomaxilofacial,
  'extracao-de-siso': EDITORIAL_IMAGES.sisos,
  'cirurgia-ortognatica': EDITORIAL_IMAGES.ortognatica,
  'lesoes-e-cistos-na-boca': EDITORIAL_IMAGES.avaliacao,
  'implante-dentario-passo-a-passo': EDITORIAL_IMAGES.implantes,
  'enxerto-osseo-dental': EDITORIAL_IMAGES.enxerto,
  'protese-fixa-sobre-implantes': EDITORIAL_IMAGES.protese,
  'cirurgia-guiada-3d': EDITORIAL_IMAGES.implantes,
  'dentistica-restauradora': EDITORIAL_IMAGES.restauracao,
  'tipos-de-protese-dentaria': EDITORIAL_IMAGES.protese,
  'dente-quebrado-o-que-fazer': EDITORIAL_IMAGES.trauma,
  'gengiva-sangrando': EDITORIAL_IMAGES.gengiva,
  'sensibilidade-nos-dentes': EDITORIAL_IMAGES.sensibilidade,
  'traumatismo-facial-fraturas': EDITORIAL_IMAGES.bucomaxilofacial,
  // Prepared for the independently reviewed draft posts; no new URL is created here.
  'bruxismo-apertar-ranger-dentes': EDITORIAL_IMAGES.bruxismo,
  'perimplantite-manutencao-implantes': EDITORIAL_IMAGES.manutencao,
}

const TREATMENT_IMAGES: Record<string, EditorialImage> = {
  'implantes-dentarios': EDITORIAL_IMAGES.implantes,
  'enxerto-osseo': EDITORIAL_IMAGES.enxerto,
  'protocolo-all-on-4': EDITORIAL_IMAGES.protese,
  'cirurgia-bucomaxilofacial': EDITORIAL_IMAGES.bucomaxilofacial,
  'extracao-de-sisos': EDITORIAL_IMAGES.sisos,
  'cirurgia-ortognatica': EDITORIAL_IMAGES.ortognatica,
  'cirurgia-plastica-periodontal': EDITORIAL_IMAGES.gengiva,
  'dentistica-restauradora': EDITORIAL_IMAGES.restauracao,
  'protese-dentaria': EDITORIAL_IMAGES.protese,
}

export const getPostEditorialImage = (slug: string) => POST_IMAGES[slug] ?? null
export const getTreatmentEditorialImage = (slug: string) => TREATMENT_IMAGES[slug] ?? null
