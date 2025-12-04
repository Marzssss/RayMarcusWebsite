import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    // Enable SWC minification for better performance
    swcMinify: true,
    // Optimize package imports to reduce bundle size
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion', '@react-three/drei'],
    },
    // Ignore TypeScript errors from @react-three/fiber beta
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60,
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    async headers() {
        return [
            {
                source: '/:all*(svg|jpg|png|glb|gltf)',
                locale: false,
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
