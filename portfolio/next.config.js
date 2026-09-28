/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.PORTFOLIO_CHECK_DIR || '.next',
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
