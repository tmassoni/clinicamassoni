import { Building2, Microscope, Stethoscope, Users } from 'lucide-react'

export type GalleryCategory =
  | 'all'
  | 'facilities'
  | 'equipment'
  | 'team'
  | 'procedures'

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: Exclude<GalleryCategory, 'all'>
  description?: string
}

export interface CategoryConfig {
  id: GalleryCategory
  label: string
  icon: typeof Building2
  description?: string
}

/**
 * Gallery categories configuration
 * Each category has a unique icon and label for better UX
 */
export const categories: CategoryConfig[] = [
  {
    id: 'all',
    label: 'Todas',
    icon: Building2,
    description: 'Ver todas as imagens',
  },
  {
    id: 'facilities',
    label: 'Instalações',
    icon: Building2,
    description: 'Conheça nossa estrutura física',
  },
  {
    id: 'equipment',
    label: 'Equipamentos',
    icon: Microscope,
    description: 'Tecnologia de ponta',
  },
  {
    id: 'team',
    label: 'Equipe',
    icon: Users,
    description: 'Nossa equipe especializada',
  },
  {
    id: 'procedures',
    label: 'Procedimentos',
    icon: Stethoscope,
    description: 'Tratamentos realizados',
  },
]

/**
 * Gallery images organized manually by category
 * Edit this array to reorganize images into different categories
 * Ensure even number of images for better grid layout
 */
export const galleryImages: GalleryImage[] = [
  // Facilities (Instalações) - 6 images
  {
    id: 'gallery-01',
    src: '/images/gallery/gallery-01.webp',
    alt: 'Clínica Dr. Enor Massoni - Recepção',
    category: 'facilities',
    description: 'Recepção moderna e acolhedora',
  },
  {
    id: 'gallery-02',
    src: '/images/gallery/gallery-02.webp',
    alt: 'Clínica Dr. Enor Massoni - Sala de Espera',
    category: 'facilities',
    description: 'Ambiente confortável para pacientes',
  },
  {
    id: 'gallery-03',
    src: '/images/gallery/gallery-03.webp',
    alt: 'Clínica Dr. Enor Massoni - Consultório',
    category: 'facilities',
    description: 'Consultório equipado',
  },
  {
    id: 'gallery-04',
    src: '/images/gallery/gallery-04.webp',
    alt: 'Clínica Dr. Enor Massoni - Corredor',
    category: 'facilities',
    description: 'Instalações modernas',
  },
  {
    id: 'gallery-05',
    src: '/images/gallery/gallery-05.webp',
    alt: 'Clínica Dr. Enor Massoni - Área Externa',
    category: 'facilities',
    description: 'Fachada da clínica',
  },
  {
    id: 'gallery-06',
    src: '/images/gallery/gallery-06.webp',
    alt: 'Clínica Dr. Enor Massoni - Sala de Procedimentos',
    category: 'facilities',
    description: 'Sala de procedimentos',
  },

  // Equipment (Equipamentos) - 8 images
  {
    id: 'gallery-07',
    src: '/images/gallery/gallery-07.webp',
    alt: 'Clínica Dr. Enor Massoni - Equipamento Médico',
    category: 'equipment',
    description: 'Tecnologia avançada',
  },
  {
    id: 'gallery-08',
    src: '/images/gallery/gallery-08.webp',
    alt: 'Clínica Dr. Enor Massoni - Aparelho de Diagnóstico',
    category: 'equipment',
    description: 'Equipamento de diagnóstico',
  },
  {
    id: 'gallery-09',
    src: '/images/gallery/gallery-09.webp',
    alt: 'Clínica Dr. Enor Massoni - Tecnologia Médica',
    category: 'equipment',
    description: 'Equipamento de última geração',
  },
  {
    id: 'gallery-10',
    src: '/images/gallery/gallery-10.webp',
    alt: 'Clínica Dr. Enor Massoni - Instrumentos Cirúrgicos',
    category: 'equipment',
    description: 'Instrumentos especializados',
  },
  {
    id: 'gallery-11',
    src: '/images/gallery/gallery-11.webp',
    alt: 'Clínica Dr. Enor Massoni - Equipamento de Tratamento',
    category: 'equipment',
    description: 'Equipamento para tratamentos',
  },
  {
    id: 'gallery-12',
    src: '/images/gallery/gallery-12.webp',
    alt: 'Clínica Dr. Enor Massoni - Aparelho Médico',
    category: 'equipment',
    description: 'Tecnologia de ponta',
  },
  {
    id: 'gallery-13',
    src: '/images/gallery/gallery-13.webp',
    alt: 'Clínica Dr. Enor Massoni - Equipamento Especializado',
    category: 'equipment',
    description: 'Equipamento especializado',
  },
  {
    id: 'gallery-14',
    src: '/images/gallery/gallery-14.webp',
    alt: 'Clínica Dr. Enor Massoni - Tecnologia Avançada',
    category: 'equipment',
    description: 'Recursos tecnológicos modernos',
  },

  // Team (Equipe) - 4 images
  {
    id: 'gallery-15',
    src: '/images/gallery/gallery-15.webp',
    alt: 'Clínica Dr. Enor Massoni - Equipe Médica',
    category: 'team',
    description: 'Nossa equipe especializada',
  },
  {
    id: 'gallery-16',
    src: '/images/gallery/gallery-16.webp',
    alt: 'Clínica Dr. Enor Massoni - Atendimento',
    category: 'team',
    description: 'Atendimento humanizado',
  },
  {
    id: 'gallery-17',
    src: '/images/gallery/gallery-17.webp',
    alt: 'Clínica Dr. Enor Massoni - Profissionais',
    category: 'team',
    description: 'Profissionais qualificados',
  },
  {
    id: 'gallery-18',
    src: '/images/gallery/gallery-18.webp',
    alt: 'Clínica Dr. Enor Massoni - Especialistas',
    category: 'team',
    description: 'Equipe de especialistas',
  },

  // Procedures (Procedimentos) - 6 images
  {
    id: 'gallery-19',
    src: '/images/gallery/gallery-19.webp',
    alt: 'Clínica Dr. Enor Massoni - Procedimento Cirúrgico',
    category: 'procedures',
    description: 'Procedimentos especializados',
  },
  {
    id: 'gallery-20',
    src: '/images/gallery/gallery-20.webp',
    alt: 'Clínica Dr. Enor Massoni - Tratamento',
    category: 'procedures',
    description: 'Tratamentos avançados',
  },
  {
    id: 'gallery-21',
    src: '/images/gallery/gallery-21.webp',
    alt: 'Clínica Dr. Enor Massoni - Cirurgia',
    category: 'procedures',
    description: 'Procedimentos cirúrgicos',
  },
  {
    id: 'gallery-22',
    src: '/images/gallery/gallery-22.webp',
    alt: 'Clínica Dr. Enor Massoni - Intervenção',
    category: 'procedures',
    description: 'Intervenções médicas',
  },
  {
    id: 'gallery-23',
    src: '/images/gallery/gallery-23.webp',
    alt: 'Clínica Dr. Enor Massoni - Tratamento Especializado',
    category: 'procedures',
    description: 'Tratamentos especializados',
  },
  {
    id: 'gallery-24',
    src: '/images/gallery/gallery-24.webp',
    alt: 'Clínica Dr. Enor Massoni - Procedimento Médico',
    category: 'procedures',
    description: 'Procedimentos médicos avançados',
  },
]

/**
 * Get images filtered by category
 */
export const getImagesByCategory = (
  category: GalleryCategory
): GalleryImage[] => {
  if (category === 'all') {
    return galleryImages
  }
  return galleryImages.filter((image) => image.category === category)
}

/**
 * Get total count of images by category
 */
export const getCategoryCount = (category: GalleryCategory): number => {
  return getImagesByCategory(category).length
}

/**
 * Get category configuration by ID
 */
export const getCategoryById = (
  id: GalleryCategory
): CategoryConfig | undefined => {
  return categories.find((cat) => cat.id === id)
}
