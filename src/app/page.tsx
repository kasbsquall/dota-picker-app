// src/app/page.tsx
import HeroPicker from '@/components/HeroPicker';

export default function Home() {
  return (
    <div className="hero-picker-container flex flex-col items-center justify-center min-h-screen"> {/* Añadido flex y justify-center */}
      <h1 className="text-5xl font-bold mb-4 text-white">¡Bienvenido a Dota Picker!</h1>
      <p className="text-lg mb-6 text-center">Selecciona el héroe enemigo y contrarresta a tus oponentes.</p> {/* Añadido text-center */}
      <div className="w-full"> {/* Contenedor para el HeroPicker */}
        <HeroPicker />
      </div>
    </div>
  );
}
