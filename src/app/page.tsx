"use client";

import HeroPicker from '@/components/HeroPicker';
import SynergyPicker from '@/components/SynergyPicker';
import ItemizationCalculator from '@/components/ItemizationCalculator';
import { useState } from 'react';

export default function Home() {
  const [tool, setTool] = useState<'counter' | 'synergy' | 'itemization' | null>(null);

  const handleBack = () => {
    setTool(null);
  };

  return (
    <div className="hero-picker-container flex flex-col items-center justify-center min-h-screen">
      {!tool ? (
        <>
          <h1 className="text-5xl font-bold mb-4 text-white">¡Bienvenido a Dota Picker!</h1>
          <p className="text-lg mb-6 text-center">Selecciona una herramienta para mejorar tu estrategia.</p>
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
            <button 
              className="bg-purple-500 text-white rounded p-4 hover:bg-purple-600 transition" 
              onClick={() => setTool('itemization')}
            >
              Calculadora de Items
            </button>
          </div>
        </>
      ) : (
        <div className="w-full">
          <div className="back-button-container">
            <button onClick={handleBack} className="back-button">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
                className="back-arrow"
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" 
                />
              </svg>
              Volver
            </button>
          </div>
          
          {tool === 'counter' && <HeroPicker />}
          {tool === 'synergy' && <SynergyPicker />}
          {tool === 'itemization' && <ItemizationCalculator />}
        </div>
      )}
    </div>
  );
}