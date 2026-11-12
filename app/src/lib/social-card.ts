import path from 'node:path'
import sharp from 'sharp'
import { POST_AUTHORS } from '@/app/src/lib/constants'

export const SOCIAL_CARD_SIZE = { width: 1200, height: 630 }
export const SOCIAL_CARD_ALT = 'Clínica Massoni em Cascavel, PR — Dr. Enor e Dr. Thiago Massoni'

const escapeXml = (text: string) => text.replace(/[<>&"']/g, (char) => {
  const entities: Record<string, string> = {
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
  }
  return entities[char]
})

/** Existing practitioner photos only; patient photography needs separate approval. */
export async function renderSocialCard() {
  const authors: Array<keyof typeof POST_AUTHORS> = ['enor', 'thiago']
  const portraits = await Promise.all(authors.map(async (id) => {
    const practitioner = POST_AUTHORS[id]
    const source = path.join(process.cwd(), 'public', practitioner.photo)
    const metadata = await sharp(source).metadata()
    if (!metadata.width || !metadata.height) throw new Error(`Invalid portrait: ${id}`)

    // Crop the existing composition around each face, without altering the photograph.
    const left = Math.floor(metadata.width * (id === 'enor' ? 0.55 : 0.2))
    const top = Math.floor(metadata.height * (id === 'enor' ? 0.3 : 0.18))
    const width = Math.floor(metadata.width * (id === 'enor' ? 0.45 : 0.6))
    const height = Math.floor(metadata.height * (id === 'enor' ? 0.6 : 0.65))
    return sharp(source).extract({ left, top, width, height })
      .resize(340, 470, { fit: 'cover', position: 'top' }).png().toBuffer()
  }))

  const labels = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <g fill="#ffffff" font-family="sans-serif">
      <text x="54" y="210" font-size="56" font-weight="700">Clínica</text>
      <text x="54" y="278" font-size="56" font-weight="700">Massoni</text>
      <text x="54" y="350" font-size="26" fill="#C8CFD3">Cascavel, PR</text>
      <text x="54" y="566" font-size="20" fill="#C8CFD3">clinicamassoni.com.br</text>
      <text x="470" y="546" font-size="25">${escapeXml(POST_AUTHORS.enor.name)}</text>
      <text x="470" y="582" font-size="21" fill="#C8CFD3">${escapeXml(POST_AUTHORS.enor.cro)}</text>
      <text x="828" y="546" font-size="25">${escapeXml(POST_AUTHORS.thiago.name)}</text>
      <text x="828" y="582" font-size="21" fill="#C8CFD3">${escapeXml(POST_AUTHORS.thiago.cro)}</text>
    </g>
  </svg>`)

  return sharp({ create: { ...SOCIAL_CARD_SIZE, channels: 4, background: '#042B48' } })
    .composite([
      { input: portraits[0], left: 470, top: 32 },
      { input: portraits[1], left: 828, top: 32 },
      { input: labels, left: 0, top: 0 },
    ]).png().toBuffer()
}
