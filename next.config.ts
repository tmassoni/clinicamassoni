import type { NextConfig } from 'next'

/**
 * Applied to every route. X-Frame-Options governs who may frame *us*; it does
 * not affect the Google Maps iframe we embed.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  /*
    Two years, subdomains included. Deliberately *not* `preload`: submission to
    the browser preload list is effectively irreversible on a useful timescale,
    and it would break the day the clinic points any subdomain at a host
    without valid HTTPS. Add it only as a considered decision, once every
    subdomain is known to be HTTPS-only.
  */
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    // AVIF first, WebP as fallback — both compress better than serving the
    // source WebP untouched.
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 90, 95],
  },

  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },

  async redirects() {
    return [
      /*
        Canonical host, as a fallback only. In production this rule never runs:
        the apex is configured as a redirecting domain in the Vercel dashboard,
        so Vercel answers at the edge before the app is reached — currently
        with a *307*, which tells Google the move is temporary and leaves the
        apex eligible to stay indexed. Fixing that means switching the domain's
        redirect status code to 308 in Project → Settings → Domains; it cannot
        be fixed from here. This rule still covers any environment where the
        apex reaches the app directly, and `permanent: true` emits a 308.
      */
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'clinicamassoni.com.br',
          },
        ],
        destination: 'https://www.clinicamassoni.com.br/:path*',
        permanent: true,
      },
      // The nav used to point at the #servicos anchor; /tratamentos owns that
      // intent now. Every renamed URL keeps its redirect, permanently.
      {
        source: '/servicos',
        destination: '/tratamentos',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
