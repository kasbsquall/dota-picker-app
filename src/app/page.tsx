"use client";

import HeroPicker from '@/components/HeroPicker';
import SynergyPicker from '@/components/SynergyPicker';
import { useState } from 'react';

export default function Home() {
  const [tool, setTool] = useState<'counter' | 'synergy' | null>(null);

  return (
    <div className="hero-picker-container flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold mb-4 text-white">¡Bienvenido a Dota Picker!</h1>
      <p className="text-lg mb-6 text-center">Selecciona una herramienta para mejorar tu estrategia.</p>
      
      {!tool && (
        <div className="flex space-x-4 flexbloque">
          <button 
            className="bg-blue-500 text-white rounded p-4 hover:bg-blue-600 transition" 
            onClick={() => setTool('counter')}
          >
            Counter Picker
          </button>
          <button 
            className="bg-green-500 text-white rounded p-4 hover:bg-green-600 transition" 
            onClick={() => setTool('synergy')}
          >
            Synergy Picker
          </button>
        </div>
      )}

      {tool === 'counter' && <HeroPicker />}
      {tool === 'synergy' && <SynergyPicker />}
    </div>
  );
}
