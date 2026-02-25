import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90, 95],
  },
  async redirects() {
    return [
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
    ]
  },
}

export default nextConfig
