// src/app/components/HeroPicker.tsx
"use client";

import { useState } from 'react';

// Lista de héroes con su nombre y video
const heroes = [
  {
    name: 'Alchemist',
    image: './images/mini/alchemist.png',
  },
  {
    name: 'Antimage',
    image: './images/mini/antimage.png',
  },
  {
    name: 'Axe',
    image: './images/mini/axe.png',
  },
  {
    name: 'Bane',
    image: './images/mini/bane.png',
  },
  {
    name: 'Clinkz',
    image: './images/mini/clinkz.png',
  },
  {
    name: 'Enigma',
    image: './images/mini/enigma.png',
  },
  {
    name: 'Furion',
    image: './images/mini/furion.png',
  },
  {
    name: 'Huskar',
    image: './images/mini/huskar.png',
  },
  {
    name: 'Invoker',
    image: './images/mini/invoker.png',
  },
  {
    name: 'Kunkka',
    image: './images/mini/kunkka.png',
  },
  {
    name: 'Lina',
    image: './images/mini/lina.png',
  },
  {
    name: 'Luna',
    image: './images/mini/luna.png',
  },
  {
    name: 'Meepo',
    image: './images/mini/meepo.png',
  },
  {
    name: 'Puck',
    image: './images/mini/puck.png',
  },
  {
    name: 'Pudge',
    image: './images/mini/pudge.png',
  },
  {
    name: 'Pugna',
    image: './images/mini/pugna.png',
  },
  {
    name: 'Rubick',
    image: './images/mini/rubick.png',
  },
  {
    name: 'Sniper',
    image: './images/mini/sniper.png',
  },
  {
    name: 'Techies',
    image: './images/mini/techies.png',
  },
  {
    name: 'Templar Assassin',
    image: './images/mini/templar_assassin.png',
  },
  {
    name: 'Tidehunter',
    image: './images/mini/tidehunter.png',
  },
  {
    name: 'Tiny',
    image: './images/mini/tiny.png',
  },
  {
    name: 'Ursa',
    image: './images/mini/ursa.png',
  },
  {
    name: 'Venomancer',
    image: './images/mini/venomancer.png',
  },
  {
    name: 'Viper',
    image: './images/mini/viper.png',
  },
  {
    name: 'Windrunner',
    image: './images/mini/windrunner.png',
  },
  {
    name: 'Wisp',
    image: './images/mini/wisp.png',
  },
  // Agrega más héroes según sea necesario
];

const positions = [
  'Carry',
  'Offlaner',
  'Support',
  'Hard Support',
  'Midlaner',
];

const HeroPicker = () => {
  const [selectedHero, setSelectedHero] = useState(''); // Héroe seleccionado
  const [selectedPosition, setSelectedPosition] = useState(positions[0]); // Posición seleccionada
  const [counterPicks, setCounterPicks] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleHeroSelection = async () => {
    if (!selectedHero || !selectedPosition) {
      setError('Debes seleccionar un héroe y una posición.');
      return;
    }
    setError('');
    setLoading(true);

    const response = await fetch('/api/generate-hero', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userHeroSelection: selectedHero, position: selectedPosition }),
    });

    setLoading(false);

    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData.error);
      setError(errorData.error || 'Error desconocido');
      return;
    }

    const data = await response.json();
    setCounterPicks(data.counterPicks);
  };

  return (
    <div className="p-4">
      <h2 className="block mb-4 font-semibold">Selecciona un héroe:</h2>
      <div className="hero-grid">
  {heroes.map((hero, index) => (
    <div key={index} className={`hero-card ${selectedHero === hero.name ? 'selected' : ''}`} onClick={() => setSelectedHero(hero.name)}>
      <img
        src={hero.image}
        alt={hero.name}
        className="hero-image"
      />
      <p>{hero.name}</p>
    </div>
  ))}
</div>



      {/* Selección de posición */}
      <label htmlFor="positionSelect" className="block mt-4 mb-2 font-semibold">Selecciona tu posición:</label>
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

      {/* Botón para obtener héroes counter */}
      <button
        onClick={handleHeroSelection}
        className="mb-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition"
      >
        Obtener héroes counter
      </button>

      {/* Indicador de carga */}
      {loading && <div className="loader"></div>}

      {/* Mensajes de error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Mostrar héroes counter */}
      {counterPicks && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Counter Pickers que te recomiendo:</h2>
          <ul className="list-disc pl-5">
            {counterPicks.split('\n').map((pick, index) => (
              <li key={index} className="mb-2">{pick.trim()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeroPicker;
