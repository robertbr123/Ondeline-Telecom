/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // o lint roda no editor/CI; no deploy só atrasa o build
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  transpilePackages: ['framer-motion'],
  serverExternalPackages: ['pino', 'thread-stream', 'pino-pretty'],
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  output: 'standalone',
  async headers() {
    return [
      {
        // imagens e fontes da pasta public: 7 dias no navegador
        source: '/:file*.:ext(jpg|jpeg|png|webp|svg|ico|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
