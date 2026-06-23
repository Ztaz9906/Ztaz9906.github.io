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
  images: { // SEO FIX
    formats: ["image/avif", "image/webp"], // SEO FIX
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // SEO FIX
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // SEO FIX
  }, // SEO FIX
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
