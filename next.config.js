// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permite cualquier imagen remota con HTTPS
      },
    ],
    // No es necesario un loader personalizado aquí
  },
};
