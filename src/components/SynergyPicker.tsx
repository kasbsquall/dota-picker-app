"use client";

import { useState } from 'react';
import './SynergyPicker.css'; // Importa el CSS específico para este componente

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

const roles = [
  'Hard Support', 'Support', 'Midlaner', 'Carry', 'Offlaner'
];

const ranks = [
  'Heraldo', 'Guardian', 'Cruzado', 'Arconte', 'Leyenda', 'Ancestro', 'Divino', 'Inmortal'
];

const SynergyPicker = () => {
  const [allyHeroes, setAllyHeroes] = useState(Array(5).fill(null));
  const [enemyHeroes, setEnemyHeroes] = useState(Array(5).fill(null));
  const [selectedRank, setSelectedRank] = useState(ranks[0]);
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({ type: '', index: -1 });


  const handleDrop = (event: React.DragEvent<HTMLDivElement>, type: string, index: number) => {
    event.preventDefault();
    const heroName = event.dataTransfer.getData('heroName');
    const heroImage = event.dataTransfer.getData('heroImage');
    const hero = { name: heroName, image: heroImage };

    if (type === 'ally') {
      const newAllies = [...allyHeroes];
      newAllies[index] = hero;
      setAllyHeroes(newAllies);
    } else if (type === 'enemy') {
      const newEnemies = [...enemyHeroes];
      newEnemies[index] = hero;
      setEnemyHeroes(newEnemies);
    }
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, hero: { name: string; image: string }) => {
    event.dataTransfer.setData('heroName', hero.name);
    event.dataTransfer.setData('heroImage', hero.image);
  };

  const handleRemoveHero = (type: string, index: number) => {
    if (type === 'ally') {
      const newAllies = [...allyHeroes];
      newAllies[index] = null;
      setAllyHeroes(newAllies);
    } else if (type === 'enemy') {
      const newEnemies = [...enemyHeroes];
      newEnemies[index] = null;
      setEnemyHeroes(newEnemies);
    }
  };

  const handleSlotClick = (type: string, index: number) => {
    if (selectedSlot.index === index && selectedSlot.type === type) {
      setSelectedSlot({ type: '', index: -1 }); // Deseleccionar
    } else {
      setSelectedSlot({ type, index });
    }
  };

  const handleHeroClick = (hero: { name: string; image: string }) => {
    if (selectedSlot.index !== -1) {
      const { type, index } = selectedSlot;
      if (type === 'ally') {
        const newAllies = [...allyHeroes];
        newAllies[index] = hero;
        setAllyHeroes(newAllies);
      } else if (type === 'enemy') {
        const newEnemies = [...enemyHeroes];
        newEnemies[index] = hero;
        setEnemyHeroes(newEnemies);
      }
      setSelectedSlot({ type: '', index: -1 }); // Limpiar la selección
    }
  };


  const handleSubmit = async () => {
    setLoading(true);
    
    const response = await fetch('/api/generate-synergy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        allies: allyHeroes,
        enemies: enemyHeroes,
        rank: selectedRank
      }),
    });

    setLoading(false);

    if (!response.ok) {
      // Handle error
      return;
    }

    const data = await response.json();
    setSuggestions(data.suggestions);
  };

  return (
    <div className="p-4 synergy-picker">
      <h2 className="block mb-4 font-semibold">Synergy Picker</h2>
      
      {/* Espacios para aliados */}
      <div className="flex justify-start mb-4">
      <h2 className="block mb-4 font-semibold center">Heroes Aliados</h2>
        <div className="grid grid-cols-5 gap-4 grillaespecial">
          {allyHeroes.map((hero, index) => (
            <div
              key={index}
              //className="hero-slot"
              className={`hero-slot ${selectedSlot.type === 'ally' && selectedSlot.index === index ? 'selected' : ''}`}
              onDrop={(event) => handleDrop(event, 'ally', index)}
              onDragOver={(event) => event.preventDefault()}
              onClick={() => handleSlotClick('ally', index)}
            >
              <p>{roles[index]}</p>
              {hero ? (
                <div className="flex flex-col items-center">
                  <img src={hero.image} alt={hero.name} className="hero-image" />
                  <button onClick={() => handleRemoveHero('ally', index)} className="remove-hero-button">X</button>
                </div>
              ) : (
                <p className="empty-slot">Selecciona héroe</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Espacios para enemigos */}
      <div className="flex justify-start mb-4">
      <h2 className="block mb-4 font-semibold center">Heroes Enemigos</h2>
        <div className="grid grid-cols-5 gap-4 grillaespecial">
          {enemyHeroes.map((hero, index) => (
            <div
              key={index}
              //className="hero-slot"
              className={`hero-slot ${selectedSlot.type === 'enemy' && selectedSlot.index === index ? 'selected' : ''}`}
              onDrop={(event) => handleDrop(event, 'enemy', index)}
              onDragOver={(event) => event.preventDefault()}
              onClick={() => handleSlotClick('enemy', index)}
            >
              <p>{roles[index]}</p>
              {hero ? (
                <div className="flex flex-col items-center">
                  <img src={hero.image} alt={hero.name} className="hero-image" />
                  <button onClick={() => handleRemoveHero('enemy', index)} className="remove-hero-button">X</button>
                </div>
              ) : (
                <p className="empty-slot">Selecciona héroe</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selector de héroes */}
      <div className="hero-grid">
        {heroes.map((hero, index) => (
          <div 
            key={index} 
            className="hero-card" 
            draggable 
            onDragStart={(event) => handleDragStart(event, hero)}
            onClick={() => handleHeroClick(hero)} // Permitir clic para añadir si hay un slot seleccionado
          >
            <img src={hero.image} alt={hero.name} className="hero-image" />
            <p>{hero.name}</p>
          </div>
        ))}
      </div>

      {/* Selector de rango */}
      <label className="block mt-4 mb-2 font-semibold">Selecciona el nivel de la medalla:</label>
      <select
        value={selectedRank}
        onChange={(e) => setSelectedRank(e.target.value)}
        className="mb-4 border rounded p-2"
      >
        {ranks.map((rank) => (
          <option key={rank} value={rank}>{rank}</option>
        ))}
      </select>

      {/* Botón para ejecutar */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition"
      >
        Obtener recomendaciones
      </button>

      {/* Indicador de carga */}
      {loading && <div className="loader"></div>}

      {/* Sugerencias */}
      {suggestions && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="font-semibold">Sugerencias:</h3>
          <p>{suggestions}</p>
        </div>
      )}
    </div>
  );
};

export default SynergyPicker;
