# Gallery Management Guide

## Overview

The gallery system is now organized with manual categorization, making it easy to reorganize images by simply editing the data file.

## File Structure

```bash
app/src/lib/
├── gallery-data.ts        # Main gallery configuration (edit this to manage images)
└── GALLERY_MANAGEMENT.md  # This guide

app/src/components/sections/
└── GallerySection.tsx     # Gallery component (no need to edit for reorganization)
```

## How to Manage Gallery Images

### 1. Add New Images

1. Add your image file to `/public/images/gallery/`
2. Open `/app/src/lib/gallery-data.ts`
3. Add a new entry to the `galleryImages` array:

```typescript
{
  id: 'gallery-25',                    // Unique ID
  src: '/images/gallery/gallery-25.webp',
  alt: 'Clínica Dr. Enor Massoni - Description',
  category: 'facilities',              // Choose category
  description: 'Optional description', // Optional
}
```

### 2. Reorganize Images

Simply change the `category` field in any image object:

```typescript
// Change from 'equipment' to 'facilities'
{
  id: 'gallery-07',
  src: '/images/gallery/gallery-07.webp',
  alt: 'Clínica Dr. Enor Massoni - Equipamento Médico',
  category: 'facilities', // ← Changed from 'equipment'
}
```

### 3. Remove Images

Delete or comment out the image entry in the `galleryImages` array.

### 4. Modify Categories

Edit the `categories` array in `gallery-data.ts`:

```typescript
{
  id: 'facilities',           // Category ID (used in image.category)
  label: 'Instalações',       // Display label
  icon: Building2,            // Lucide icon component
  description: 'Description', // Optional tooltip/description
}
```

#### Available Icons

Import from `lucide-react`:

- `Building2` - Facilities/Buildings
- `Microscope` - Equipment/Laboratory
- `Users` - Team/People
- `Stethoscope` - Medical procedures
- `Heart` - Health/Care
- `Activity` - Monitoring/Diagnostics
- `Pill` - Medications
- `Briefcase` - Professional services
- And many more...

## Current Categories

| Category | Icon | Images | Description |
|----------|------|--------|-------------|
| all | Building2 | 24 | All images |
| facilities | Building2 | 6 | Physical structure |
| equipment | Microscope | 8 | Medical equipment |
| team | Users | 4 | Medical team |
| procedures | Stethoscope | 6 | Medical procedures |

## Best Practices

### Image Distribution

- **Keep even numbers** for better grid layout
- Recommended: 4, 6, 8, or 12 images per category
- Total should be divisible by 2, 3, and 4 for responsive grids

### Image Naming

- Use consistent naming: `gallery-01.webp`, `gallery-02.webp`, etc.
- Keep images in WebP format for optimal performance
- Recommended size: 1200x1200px (square) for desktop grid
- Aspect ratio: 1:1 (square) works best

### Alt Text

- Be descriptive: "Clínica Dr. Enor Massoni - Sala de Espera"
- Include location if relevant: "Cascavel PR"
- Avoid generic text like "Image 1"

### Performance

- WebP format is optimized (configured in next.config.ts)
- Quality levels: 85 (thumbnails), 95 (full view)
- Lazy loading is automatic via Next.js Image component

## Example: Adding a New Category

1. **Add icon import** (top of gallery-data.ts):

    ```typescript
    import { Building2, Microscope, Users, Stethoscope, Heart } from 'lucide-react'
    ```

2. **Update GalleryCategory type**:

    ```typescript
    export type GalleryCategory = 'all' | 'facilities' | 'equipment' | 'team' | 'procedures' | 'services'
    ```

3. **Add to categories array**:

    ```typescript
    {
      id: 'services',
      label: 'Serviços',
      icon: Heart,
      description: 'Nossos serviços médicos',
    }
    ```

4. **Assign images to the new category**:

    ```typescript
    {
      id: 'gallery-25',
      src: '/images/gallery/gallery-25.webp',
      alt: 'Clínica Dr. Enor Massoni - Serviço Especializado',
      category: 'services', // ← New category
    }
    ```

## Tips

- **Preview changes**: Save the file and check the gallery in your browser
- **Organize logically**: Group similar images together
- **Maintain balance**: Try to have similar numbers of images per category
- **Test mobile**: The gallery uses a different layout on mobile devices
- **Use TypeScript**: Types will help catch errors (e.g., invalid category names)

## Troubleshooting

### Image not showing

- Check file path is correct: `/images/gallery/gallery-XX.webp`
- Ensure image file exists in `/public/images/gallery/`
- Check browser console for 404 errors

### Category not displaying correctly

- Verify category ID matches exactly (case-sensitive)
- Ensure category exists in `categories` array
- Check GalleryCategory type includes your category

### Performance issues

- Reduce image file sizes (use WebP compression)
- Ensure quality settings are configured in next.config.ts
- Check that lazy loading is working (images load as you scroll)

## Quick Reference Commands

```bash
# Add new image
cp new-image.jpg public/images/gallery/gallery-25.webp

# Check image exists
ls public/images/gallery/

# Run dev server
npm run dev

# Build for production
npm run build
```

---

**Last Updated**: October 2025
**Maintainer**: Development Team
