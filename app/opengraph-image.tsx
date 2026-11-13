import {
  renderSocialCard,
  SOCIAL_CARD_ALT,
  SOCIAL_CARD_SIZE,
} from '@/app/src/lib/social-card'

export const alt = SOCIAL_CARD_ALT
export const size = SOCIAL_CARD_SIZE
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const png = await renderSocialCard()
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': contentType },
  })
}
