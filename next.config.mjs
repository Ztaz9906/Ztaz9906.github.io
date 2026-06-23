import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    "@react-three/drei",
    "@react-three/fiber",
    "@react-three/postprocessing",
    "three",
    "maath",
  ],
  images: {
    unoptimized: true,
  },
}

export default withNextIntl(nextConfig)
