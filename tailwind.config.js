/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // Agrega esta línea para la carpeta app
    './src/components/**/*.{js,ts,jsx,tsx}', // Carpeta de componentes
  ],
  theme: {
    extend: {
      // Aquí puedes agregar personalizaciones adicionales
    },
  },
  plugins: [],
};
