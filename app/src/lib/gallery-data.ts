import { Building2, Stethoscope, Users } from "lucide-react";
// Microscope,

export type GalleryCategory = "all" | "facilities" | "team" | "procedures";
// | "equipment"

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, "all">;
  description?: string;
}

export interface CategoryConfig {
  id: GalleryCategory;
  label: string;
  icon: typeof Building2;
  description?: string;
}

/**
 * Gallery categories configuration
 * Each category has a unique icon and label for better UX
 */
export const categories: CategoryConfig[] = [
  {
    id: "all",
    label: "Todas",
    icon: Building2,
    description: "Ver todas as imagens",
  },
  {
    id: "facilities",
    label: "Instalações",
    icon: Building2,
    description: "Conheça nossa estrutura física",
  },
  {
    id: "team",
    label: "Equipe",
    icon: Users,
    description: "Nossa equipe especializada",
  },
  {
    id: "procedures",
    label: "Procedimentos",
    icon: Stethoscope,
    description: "Tratamentos realizados",
  },
];
// {
//   id: "equipment",
//   label: "Equipamentos",
//   icon: Microscope,
//   description: "Tecnologia de ponta",
// },

// FIXME: Update alt and description for each iamge
// TODO: When we are sure those are the categories and images,
// let's update the name of each image

/**
 * Gallery images organized manually by category
 * Edit this array to reorganize images into different categories
 * Ensure even number of images for better grid layout
 */
export const galleryImages: GalleryImage[] = [
  // Facilities (Instalações) - 6 images
  {
    id: "gallery-01",
    src: "/images/gallery/gallery-01.webp",
    alt: "Clínica Dr. Enor Massoni - Recepção",
    category: "facilities",
    description: "Recepção moderna e acolhedora",
  },
  {
    id: "gallery-02",
    src: "/images/gallery/gallery-02.webp",
    alt: "Clínica Dr. Enor Massoni - Sala de Espera",
    category: "facilities",
    description: "Ambiente confortável para pacientes",
  },
  {
    id: "gallery-03",
    src: "/images/gallery/gallery-03.webp",
    alt: "Clínica Dr. Enor Massoni - Consultório",
    category: "facilities",
    description: "Consultório equipado",
  },
  {
    id: "gallery-04",
    src: "/images/gallery/gallery-04.webp",
    alt: "Clínica Dr. Enor Massoni - Corredor",
    category: "facilities",
    description: "Instalações modernas",
  },
  {
    id: "gallery-05",
    src: "/images/gallery/gallery-05.webp",
    alt: "Clínica Dr. Enor Massoni - Área Externa",
    category: "facilities",
    description: "Fachada da clínica",
  },

  // Team (Equipe) - 5 images
  {
    id: "enor",
    src: "/images/team/enor.webp",
    alt: "Clínica Dr. Enor Massoni - Equipe Médica",
    category: "team",
    description: "Nossa equipe especializada",
  },
  {
    id: "thiago",
    src: "/images/team/thiago.webp",
    alt: "Clínica Dr. Enor Massoni - Especialistas",
    category: "team",
    description: "Atendimento humanizado",
  },
  {
    id: "mari",
    src: "/images/team/mari.webp",
    alt: "Clínica Dr. Enor Massoni - Técnicos",
    category: "team",
    description: "Técnica em Saúde Bucal, Mari - atua na clinica há 10 anos",
  },
  {
    id: "patricia",
    src: "/images/team/patricia.webp",
    alt: "Clínica Dr. Enor Massoni - Técnicos",
    category: "team",
    description: "Equipe técnica",
  },
  {
    id: "rosi",
    src: "/images/team/rosi.webp",
    alt: "Clínica Dr. Enor Massoni - Profissionas",
    category: "team",
    description: "Secretaria/Recepcionista/Financeira",
  },

  // Procedures (Procedimentos) - 1 images
  {
    id: "gallery-11",
    src: "/images/gallery/gallery-11.webp",
    alt: "Clínica Dr. Enor Massoni - Procedimento Cirúrgico",
    category: "procedures",
    description: "Procedimentos especializados",
  },
];

/**
 * Get images filtered by category
 */
export const getImagesByCategory = (
  category: GalleryCategory
): GalleryImage[] => {
  if (category === "all") {
    return galleryImages;
  }
  return galleryImages.filter((image) => image.category === category);
};

/**
 * Get total count of images by category
 */
export const getCategoryCount = (category: GalleryCategory): number => {
  return getImagesByCategory(category).length;
};

/**
 * Get category configuration by ID
 */
export const getCategoryById = (
  id: GalleryCategory
): CategoryConfig | undefined => {
  return categories.find((cat) => cat.id === id);
};
