/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true, // O quitar esto si prefieres usar la optimización de imágenes
  },
};

export default nextConfig;
