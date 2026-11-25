import { NextResponse, type NextRequest } from 'next/server'
import { preferredPageType } from '@/app/src/lib/accept'
import { HOME_MARKDOWN_PATH, MARKDOWN_FALLBACK_HEADER } from '@/app/src/lib/markdown-routing'

export function proxy(request: NextRequest) {
  const isDocumentRequest = (request.method === 'GET' || request.method === 'HEAD') &&
    !request.headers.has('rsc')
  const preferred = isDocumentRequest && preferredPageType(request.headers.get('accept'))

  if (request.nextUrl.pathname === '/' && isDocumentRequest) {
    if (preferred === 'text/markdown') {
      const destination = request.nextUrl.clone()
      destination.pathname = HOME_MARKDOWN_PATH
      return NextResponse.rewrite(destination)
    }
    if (!preferred) {
      return new Response(request.method === 'HEAD' ? null : 'Disponível em text/html e text/markdown.\n', {
        status: 406,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Vary': 'Accept',
          'Cache-Control': 'no-store',
        },
      })
    }
  }

  // Only Next's unresolved route fallback uses this signal. Strip any inbound copy.
  const headers = new Headers(request.headers)
  headers.delete(MARKDOWN_FALLBACK_HEADER)
  if (preferred === 'text/markdown') headers.set(MARKDOWN_FALLBACK_HEADER, '1')
  return NextResponse.next({ request: { headers } })
}

export const config = {
  matcher: [
    '/',
    {
      source: '/((?!_next/|_vercel/).+)',
      has: [{
        type: 'header',
        key: 'accept',
        value: '.*[Tt][Ee][Xx][Tt]/[Mm][Aa][Rr][Kk][Dd][Oo][Ww][Nn].*',
      }],
    },
    { source: '/:path+', has: [{ type: 'header', key: 'x-massoni-markdown-fallback' }] },
  ],
}
