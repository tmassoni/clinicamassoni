import { homeMarkdown, MARKDOWN_CONTENT_TYPE } from '@/app/src/lib/public-markdown'

export const dynamic = 'force-static'

export function GET() {
  return new Response(homeMarkdown, {
    headers: { 'Content-Type': MARKDOWN_CONTENT_TYPE, 'Content-Language': 'pt-BR' },
  })
}
