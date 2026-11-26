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
  ],
  poweredByHeader: false,
  images: {
    localPatterns: [{ pathname: '/api/media/file/**' }],
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
