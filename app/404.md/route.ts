import { notFoundMarkdown, MARKDOWN_CONTENT_TYPE } from '@/app/src/lib/public-markdown'

export function GET() {
  return new Response(notFoundMarkdown, {
    status: 404,
    headers: {
      'Content-Type': MARKDOWN_CONTENT_TYPE,
      'Content-Language': 'pt-BR',
      'Cache-Control': 'no-store',
    },
  })
}
