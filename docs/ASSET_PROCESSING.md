# ASSET PROCESSING GUIDE - Dr. Enor Massoni

## Asset Inventory

### Current Assets

**Location**: `/Users/diegovfeder/workspace/jobs/massoni/`

**Files**:

- 1 PDF logo file (`Logo em PDF.pdf` - 30KB)
- 26 HEIC image files (IMG_4492.HEIC through IMG_4527.HEIC)
- 1 MOV video file (IMG_4494.MOV - 30MB)

**Total Size**: ~78MB

## Logo Processing

See **BRAND_IDENTITY.md** for detailed logo extraction instructions.

**Quick Reference**:

```bash
# Convert PDF to SVG (preferred)
inkscape "Logo em PDF.pdf" --export-type=svg --export-filename=logo.svg

# Convert PDF to PNG (fallback)
convert -density 300 "Logo em PDF.pdf" -quality 100 -background transparent logo.png
```

**Output Location**: `/workspace/jobs/massoni/web/public/images/`

## HEIC Image Conversion

### Why Convert HEIC?

HEIC (High Efficiency Image Container) is:

- ✅ Efficient on iOS devices
- ❌ Not widely supported in browsers
- ❌ Cannot be used with Next.js Image component directly

**Solution**: Convert to WebP or JPEG

### Recommended Format: WebP

**Benefits**:

- 25-35% smaller than JPEG at same quality
- Supports transparency (like PNG)
- Supported by all modern browsers
- Perfect for Next.js Image optimization

### Conversion Methods

#### Method 1: ImageMagick (macOS Command Line)

**Install ImageMagick**:

```bash
brew install imagemagick
```

**Single File Conversion**:

```bash
# HEIC → WebP (90% quality)
magick IMG_4492.HEIC -quality 90 img-4492.webp

# HEIC → JPEG (if WebP not desired)
magick IMG_4492.HEIC -quality 90 img-4492.jpg
```

**Batch Conversion** (All 26 Files):

```bash
# Navigate to massoni folder
cd /Users/diegovfeder/workspace/jobs/massoni/

# Convert all HEIC to WebP
for file in *.HEIC; do
  magick "$file" -quality 90 -resize 1920x1080\> "${file%.HEIC}.webp"
done

# This will:
# - Convert all .HEIC files
# - Output as .webp
# - Resize to max 1920x1080 (maintain aspect ratio with \>)
# - Use 90% quality
```

**With Sequential Naming**:

```bash
# Create numbered files for easier gallery management
counter=1
for file in IMG_*.HEIC; do
  magick "$file" -quality 90 -resize 1920x1080\> "gallery-$(printf "%02d" $counter).webp"
  ((counter++))
done
```

#### Method 2: heic2any NPM Package (Node.js)

**Install**:

```bash
npm install -g heic-convert
```

**Usage**:

```bash
heic-convert IMG_4492.HEIC img-4492.jpg
```

#### Method 3: Online Conversion Tools

**Recommended Services**:

- <https://cloudconvert.com/heic-to-webp> (batch upload supported)
- <https://heic.online/> (free, unlimited)
- <https://www.freeconvert.com/heic-to-webp>

**Steps**:

1. Upload all 26 HEIC files
2. Select WebP as output format
3. Configure quality (90%)
4. Download ZIP archive
5. Extract to `/workspace/jobs/massoni/web/public/images/gallery/`

#### Method 4: macOS Preview App

**Steps**:

1. Open HEIC file in Preview
2. File → Export
3. Format: JPEG or PNG
4. Quality: Maximum
5. Save

**Note**: Preview doesn't support WebP, so convert to JPEG then use ImageMagick:

```bash
magick image.jpg -quality 90 image.webp
```

### Recommended Workflow

**Step-by-Step**:

1. **Create target directory**:

   ```bash
   mkdir -p /Users/diegovfeder/workspace/jobs/massoni/web/public/images/gallery
   ```

2. **Convert with optimized settings**:

   ```bash
   cd /Users/diegovfeder/workspace/jobs/massoni/

   counter=1
   for file in IMG_*.HEIC; do
     # Skip the MOV file
     if [[ "$file" == *.HEIC ]]; then
       magick "$file" \
         -quality 90 \
         -resize 1920x1920\> \
         -strip \
         "web/public/images/gallery/gallery-$(printf "%02d" $counter).webp"
       echo "Converted: $file → gallery-$(printf "%02d" $counter).webp"
       ((counter++))
     fi
   done
   ```

   **Options explained**:
   - `-quality 90`: High quality, good compression
   - `-resize 1920x1920\>`: Max dimension 1920px, maintain aspect ratio, only shrink (never enlarge)
   - `-strip`: Remove EXIF metadata (privacy + smaller file size)

3. **Verify conversion**:

   ```bash
   ls -lh web/public/images/gallery/
   # Should show 26 .webp files with reasonable sizes (200-800KB each)
   ```

4. **Create responsive variants** (Optional - Next.js can do this automatically):

   ```bash
   cd web/public/images/gallery/

   for file in gallery-*.webp; do
     # Create thumbnail (400px wide)
     magick "$file" -resize 400x400\> "${file%.webp}-thumb.webp"

     # Create medium (800px wide)
     magick "$file" -resize 800x800\> "${file%.webp}-medium.webp"
   done
   ```

## Image Optimization Targets

### File Size Goals

| Image Type | Max Dimensions | Target Size | Quality |
|------------|---------------|-------------|---------|
| Hero image | 1920x1080 | 200-400 KB | 90% |
| Gallery images | 1920x1920 | 300-600 KB | 90% |
| Thumbnails | 400x400 | 30-60 KB | 85% |
| Logo (PNG) | 800x800 | 50-100 KB | 100% |
| Logo (SVG) | Vector | 10-30 KB | N/A |
| OG image | 1200x630 | 100-200 KB | 90% |

### Responsive Image Strategy

**Next.js Image Component** handles responsive sizes automatically:

```tsx
import Image from 'next/image'

<Image
  src="/images/gallery/gallery-01.webp"
  alt="Consultório Dr. Enor Massoni - Cascavel PR"
  width={1920}
  height={1280}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={90}
  loading="lazy"
/>
```

**Next.js will automatically generate**:

- Multiple sizes (640w, 750w, 828w, 1080w, 1200w, 1920w, etc.)
- Optimized formats (WebP, AVIF if supported)
- Lazy loading
- Blur placeholder (optional)

## Image Categorization

### Organizing 26 Gallery Images

**Step 1**: Review images and categorize:

```bash
# Convert and rename based on content
cd /Users/diegovfeder/workspace/jobs/massoni/

# Example categorization:
# IMG_4492-4495 → exterior-01 to exterior-04 (clinic exterior)
# IMG_4496-4502 → reception-01 to reception-07 (reception area)
# IMG_4503-4510 → equipment-01 to equipment-08 (dental equipment)
# IMG_4511-4527 → consultation-01 to consultation-17 (consultation rooms)
```

**Step 2**: Create organized structure:

```bash
web/public/images/
├── logo.svg
├── logo.png
├── hero.webp                    # Best professional photo
├── about.webp                   # Photo for About section
├── og.png                       # Open Graph image (1200x630)
└── gallery/
    ├── exterior/
    │   ├── exterior-01.webp
    │   └── exterior-02.webp
    ├── reception/
    │   ├── reception-01.webp
    │   ├── reception-02.webp
    │   └── reception-03.webp
    ├── equipment/
    │   ├── equipment-01.webp
    │   ├── equipment-02.webp
    │   └── equipment-03.webp
    └── rooms/
        ├── room-01.webp
        ├── room-02.webp
        └── room-03.webp
```

**Alternative**: Flat structure with descriptive names:

```bash
gallery/
├── gallery-exterior-01.webp
├── gallery-reception-01.webp
├── gallery-equipment-01.webp
├── gallery-room-01.webp
```

### Image Metadata File

Create `/workspace/jobs/massoni/web/src/data/gallery.ts`:

```typescript
export interface GalleryImage {
  src: string
  alt: string
  category: 'exterior' | 'reception' | 'equipment' | 'rooms'
  title: string
}

export const galleryImages: GalleryImage[] = [
  {
    src: '/images/gallery/exterior-01.webp',
    alt: 'Fachada da clínica Dr. Enor Massoni em Cascavel, PR',
    category: 'exterior',
    title: 'Clínica',
  },
  {
    src: '/images/gallery/reception-01.webp',
    alt: 'Recepção moderna e acolhedora da clínica odontológica',
    category: 'reception',
    title: 'Recepção',
  },
  {
    src: '/images/gallery/equipment-01.webp',
    alt: 'Equipamento de última geração para implantes dentários',
    category: 'equipment',
    title: 'Equipamentos',
  },
  // ... 23 more images
]
```

**Usage in GallerySection**:

```tsx
import { galleryImages } from '@/data/gallery'

export function GallerySection() {
  return (
    <section>
      {galleryImages.map((image, index) => (
        <Image key={index} src={image.src} alt={image.alt} />
      ))}
    </section>
  )
}
```

## Video Processing (Optional)

**Current Video**: IMG_4494.MOV (30MB)

### Options

1. **Skip for Phase 1** (recommended - save for future "virtual tour" feature)

2. **Convert to optimized MP4**:

   ```bash
   ffmpeg -i IMG_4494.MOV \
     -vcodec libx264 \
     -crf 23 \
     -preset medium \
     -acodec aac \
     -b:a 128k \
     -movflags +faststart \
     video-tour.mp4
   ```

3. **Extract key frames as images**:

   ```bash
   # Extract 1 frame every 2 seconds
   ffmpeg -i IMG_4494.MOV -vf fps=1/2 video-frame-%03d.webp
   ```

## Open Graph Image Creation

### Requirements

- Dimensions: 1200x630 pixels
- Format: PNG or JPEG
- Content: Logo + text + background

### Creation Methods

#### Method 1: Canva (Easiest)

1. Go to <https://www.canva.com/>
2. Create custom size: 1200x630
3. Add logo, doctor name, specialty
4. Use brand colors
5. Download as PNG

#### Method 2: Figma

1. Create frame 1200x630
2. Design with logo + text
3. Export as PNG 2x

#### Method 3: ImageMagick (Automated)

```bash
# After extracting logo
convert -size 1200x630 xc:"#[BRAND_PRIMARY_COLOR]" \
  logo.png -gravity center -composite \
  -pointsize 60 -fill white -gravity south -annotate +0+50 "Dr. Enor Massoni\nImplantes Dentários - Cascavel, PR" \
  og.png
```

### Template Content

```text
Dr. Enor Massoni
Implantes Dentários e Cirurgia Maxilofacial
Cascavel, PR | CRO-PR 4982
```

## Favicon Generation

### Using Real Favicon Generator (Recommended)

1. Visit <https://realfavicongenerator.net/>
2. Upload logo.png (minimum 512x512)
3. Configure:
   - **iOS**: Background color = brand primary
   - **Android**: Theme color = brand primary
   - **Windows**: Tile color = brand primary
4. Generate and download package
5. Extract to `/workspace/jobs/massoni/web/public/`

**Files generated**:

```bash
public/
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── site.webmanifest
└── browserconfig.xml
```

### Manual Favicon Creation

```bash
# From logo.png (512x512 minimum)
sips -z 16 16 logo.png --out favicon-16x16.png
sips -z 32 32 logo.png --out favicon-32x32.png
sips -z 180 180 logo.png --out apple-touch-icon.png
sips -z 192 192 logo.png --out android-chrome-192x192.png
sips -z 512 512 logo.png --out android-chrome-512x512.png

# Create .ico file (requires ImageMagick)
convert logo.png -define icon:auto-resize=64,48,32,16 favicon.ico
```

## Image Alt Text Best Practices

### SEO-Optimized Alt Text Formula

```text
[What] + [Location] + [Context]
```

**Examples**:

✅ **Good**:

```text
"Dr. Enor Massoni realizando implante dentário em Cascavel, PR"
"Consultório odontológico moderno com equipamento de última geração - Cascavel"
"Sala de cirurgia bucomaxilofacial equipada com tecnologia digital"
```

❌ **Bad**:

```text
"IMG_4492"
"Imagem da clínica"
"Foto"
```

### Gallery Image Alt Text Template

```typescript
// data/gallery.ts
export const galleryImages = [
  {
    src: '/images/gallery/exterior-01.webp',
    alt: 'Fachada moderna da clínica odontológica Dr. Enor Massoni em Cascavel, Paraná',
  },
  {
    src: '/images/gallery/reception-01.webp',
    alt: 'Recepção acolhedora e confortável da clínica de implantes dentários em Cascavel',
  },
  {
    src: '/images/gallery/equipment-01.webp',
    alt: 'Equipamento de tomografia computadorizada para planejamento de implantes dentários',
  },
]
```

## Lazy Loading Strategy

### Priority Loading

**Hero Image**: `priority` prop

```tsx
<Image src="/images/hero.webp" priority />
```

**Above-the-fold images**: `loading="eager"`

```tsx
<Image src="/images/about.webp" loading="eager" />
```

**Gallery images**: `loading="lazy"` (default)

```tsx
<Image src="/images/gallery/gallery-01.webp" loading="lazy" />
```

### Blur Placeholder

Enable blur placeholder for smooth loading:

```tsx
<Image
  src="/images/gallery/gallery-01.webp"
  placeholder="blur"
  blurDataURL="data:image/webp;base64,..."
/>
```

**Generate blur placeholders**:

```bash
# Using plaiceholder library
npm install plaiceholder sharp

# Or manually create tiny base64 image
convert gallery-01.webp -resize 10x10 -quality 50 - | base64
```

## Asset Processing Checklist

### Logo

- [ ] Extract logo from PDF to SVG format
- [ ] Create PNG fallback (800x800)
- [ ] Create multiple PNG sizes (200w, 400w, 800w)
- [ ] Optimize SVG with SVGO
- [ ] Place in `/public/images/`

### Gallery Images

- [ ] Convert all 26 HEIC files to WebP
- [ ] Resize to max 1920px dimension
- [ ] Strip EXIF metadata
- [ ] Organize into categories or sequential numbering
- [ ] Place in `/public/images/gallery/`
- [ ] Create gallery metadata file (`data/gallery.ts`)
- [ ] Write descriptive alt text for each image

### OG Image

- [ ] Create 1200x630 PNG with logo + text
- [ ] Use brand colors
- [ ] Save as `/public/images/og.png`

### Favicon

- [ ] Generate favicon suite (16, 32, 180, 192, 512)
- [ ] Create favicon.ico
- [ ] Create site.webmanifest
- [ ] Place all files in `/public/`

### Performance

- [ ] Verify all images < 1MB
- [ ] Enable Next.js Image optimization
- [ ] Configure image domains if using external CDN
- [ ] Test lazy loading behavior
- [ ] Run Lighthouse audit

## Next.js Image Configuration

### Update `next.config.ts`

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
}

export default nextConfig
```

## Performance Benchmarks

### Target Metrics (Lighthouse)

| Metric | Target | Notes |
|--------|--------|-------|
| **Largest Contentful Paint (LCP)** | < 2.5s | Hero image should load fast |
| **First Input Delay (FID)** | < 100ms | Interactive quickly |
| **Cumulative Layout Shift (CLS)** | < 0.1 | No image layout shifts |
| **Total Blocking Time (TBT)** | < 300ms | Fast interactivity |
| **Image Size** | < 500KB | Per gallery image |

### Optimization Tips

1. **Use WebP/AVIF**: 25-35% smaller than JPEG
2. **Lazy load gallery**: Only load visible images
3. **Responsive images**: Let Next.js generate sizes
4. **CDN delivery**: Vercel automatically serves via CDN
5. **Cache headers**: Configure long cache TTL

## Reference Tools

- **ImageMagick**: <https://imagemagick.org/>
- **Real Favicon Generator**: <https://realfavicongenerator.net/>
- **TinyPNG**: <https://tinypng.com/> (additional compression)
- **Squoosh**: <https://squoosh.app/> (browser-based image optimizer)
- **Next.js Image**: <https://nextjs.org/docs/app/api-reference/components/image>
