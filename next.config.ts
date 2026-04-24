import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // NOTE: requires CloudFront Functions or S3 redirect rules at deploy time — static export does not apply next.config.ts redirects.
  // These are kept here as the source of truth for `next dev` verification and to document intent for the edge/CDN layer.
  async redirects() {
    return [
      { source: '/services', destination: '/enterprise/services', permanent: true },
      { source: '/solutions', destination: '/enterprise/solutions', permanent: true },
      { source: '/products', destination: '/enterprise/products', permanent: true },
      { source: '/expertise', destination: '/enterprise/expertise', permanent: true },
      // Per task brief: /demo and /get-started now redirect to the SMB audit form,
      // not to /enterprise/*. Enterprise prospects can still reach the old forms
      // via direct /enterprise/demo / /enterprise/get-started URLs.
      { source: '/demo', destination: '/services/smb-acquisition/#audit-form', permanent: true },
      { source: '/get-started', destination: '/services/smb-acquisition/#audit-form', permanent: true },
    ]
  },
}

export default nextConfig
