// src/app/components/HeroPicker.tsx
"use client";

import { useState } from 'react';

const positions = [
  'Carry',
  'Offlaner',
  'Support',
  'Hard Support',
  'Midlaner'
];

const HeroPicker = () => {
  const [selectedHero, setSelectedHero] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(positions[0]);
  const [counterPicks, setCounterPicks] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Nuevo estado para loading

  const handleHeroSelection = async () => {
    setError(''); // Reiniciar el error antes de la nueva solicitud
    setLoading(true); // Iniciar loading
    const response = await fetch('/api/generate-hero', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userHeroSelection: selectedHero, position: selectedPosition }),
    });

    setLoading(false); // Detener loading

    if (!response.ok) {
      const errorData = await response.json(); // Obtener el JSON de error
      console.error(errorData.error);
      setError(errorData.error || 'Error desconocido'); // Mostrar mensaje de error
      return;
    }

    const data = await response.json(); // Obtener el JSON de respuesta
    setCounterPicks(data.counterPicks); // Asumiendo que devuelve un string
  };

  return (
    <div className="hero-picker-container p-4">
      <label htmlFor="heroSelect" className="block mb-2 font-semibold">Selecciona un héroe:</label>
      <select
        id="heroSelect"
        value={selectedHero}
        onChange={(e) => setSelectedHero(e.target.value)}
        className="mb-4 border rounded p-2"
      >
        <option value="">-- Selecciona un héroe --</option>
        <option value="Templar Assassin">Templar Assassin</option>
        <option value="Zeus">Zeus</option>
        <option value="Bane">Bane</option>
        <option value="Outworld Devourer">Outworld Devourer</option>
        <option value="Pugna">Pugna</option>
        <option value="Viper">Viper</option>
        {/* Agrega más héroes según sea necesario */}
      </select>

      <label htmlFor="positionSelect" className="block mb-2 font-semibold">Selecciona tu posición:</label>
      <select
        id="positionSelect"
        value={selectedPosition}
        onChange={(e) => setSelectedPosition(e.target.value)}
        className="mb-4 border rounded p-2"
      >
        {positions.map((position) => (
          <option key={position} value={position}>{position}</option>
        ))}
      </select>

      <button onClick={handleHeroSelection} className="mb-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition">
        Obtener héroes counter
      </button>

      {loading && <div className="loader"></div>} {/* Mostrar loader */}
      {error && <p className="text-red-500">{error}</p>} {/* Mostrar mensaje de error si existe */}

      {counterPicks && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Héroes contra:</h2>
          <ul className="list-disc pl-5">
            {counterPicks.split('\n').map((pick, index) => (
              <li key={index} className="mb-2">{pick.trim()}</li> // Espaciado entre opciones
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeroPicker;
