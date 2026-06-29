import { createMDX } from 'fumadocs-mdx/next'
import createNextIntlPlugin from 'next-intl/plugin'

const withMDX = createMDX()
const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    qualities: [75, 100],
  },
  // oxlint-disable-next-line require-await -- next.js api requires async
  async rewrites() {
    return [
      {
        source: '/:locale/docs/:path*.md',
        destination: '/:locale/llms.mdx/docs/:path*',
      },
    ]
  },
}

export default withNextIntl(withMDX(config))
