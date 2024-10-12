/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Esta línea habilita la exportación estática
    trailingSlash: true,
    images: {
      unoptimized: true, // Opcional, dependiendo de si usas imágenes optimizadas
    },
};

export default nextConfig;
