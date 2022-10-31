/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', process.env.NEXT_PUBLIC_CMS_URL, 'cms.payloadcms.com'],
  },
  experimental: {
    runtime: 'experimental-edge',
    appDir: true,
  },
  webpack: config => {
    const configCopy = { ...config }
    configCopy.resolve.alias = {
      ...config.resolve.alias,
      '@scss': path.resolve(__dirname, './css/'),
      // IMPORTANT: the next lines are for development only
      // keep them commented out unless actively developing local react modules
      // modify their paths according to your local directory
      // "payload-admin-bar": path.join(__dirname, "../payload-admin-bar"),
    }
    return configCopy
  },
  headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Accept-CH',
            value: 'Sec-CH-Prefers-Color-Scheme',
          },
        ],
      },
    ]
  },
  redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/getting-started/what-is-payload',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
