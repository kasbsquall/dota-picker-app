/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    domains: ['cdn.akamai.steamstatic.com'], // Permite imágenes de Steam
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.akamai.steamstatic.com',
        pathname: '/apps/dota2/images/**',
      },
    ],
  },
};

export default nextConfig;
