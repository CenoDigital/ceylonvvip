import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const monorepoRoot = path.resolve(dirname, '../..')

const nextConfig: NextConfig = {
  // Self-contained server for the Docker image.
  output: 'standalone',
  // Trace from the monorepo root so workspace packages land in the standalone build.
  outputFileTracingRoot: monorepoRoot,
  transpilePackages: [
    '@ceylonvvip/cms-schema',
    '@ceylonvvip/core',
    '@ceylonvvip/db',
    '@ceylonvvip/tokens',
    '@ceylonvvip/ui-brand',
    '@ceylonvvip/validation',
  ],
  poweredByHeader: false,
  experimental: {
    // Task 169: import only the ui-brand components a page uses, not the whole barrel.
    optimizePackageImports: ['@ceylonvvip/ui-brand'],
  },
  images: {
    localPatterns: [{ pathname: '/api/media/file/**' }],
    // Task 169: clearer photos. Every photo is served at quality 85 (Next's default is
    // 75); an image asking for another quality gets the nearest allowed one.
    qualities: [85],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
  turbopack: {
    root: monorepoRoot,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
