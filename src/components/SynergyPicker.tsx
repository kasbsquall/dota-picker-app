"use client";

import { useState } from 'react';
import RecommendationItem from './RecommendationItem';
import heroes from './heroList'; // Importa la lista de héroes desde heroList.ts
import './SynergyPicker.css'; // Importa el CSS específico para este componente

interface RecommendationItemProps {
  role: string;
  heroName: string;
  heroImage: string;
  reasons: string[];
}

interface Hero {
  name: string;
  image: string;
}

interface SynergyResponse {
  suggestions: string;
}

const roles = [
  'Hard Support', 'Support', 'Midlaner', 'Carry', 'Offlaner'
];

const ranks = [
  'Heraldo', 'Guardian', 'Cruzado', 'Arconte', 'Leyenda', 'Ancestro', 'Divino', 'Inmortal'
];

const SynergyPicker = () => {
  const [allyHeroes, setAllyHeroes] = useState<(Hero | null)[]>(Array(5).fill(null));
const [enemyHeroes, setEnemyHeroes] = useState<(Hero | null)[]>(Array(5).fill(null));
const [selectedRank, setSelectedRank] = useState<string>(ranks[0]);
const [suggestions, setSuggestions] = useState<RecommendationItemProps[]>([]);
const [loading, setLoading] = useState<boolean>(false);
const [selectedSlot, setSelectedSlot] = useState<{ type: string; index: number }>({ type: '', index: -1 });


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

  const isHeroSelected = (hero: { name: string; image: string }) => {
    return [...allyHeroes, ...enemyHeroes].some(selectedHero => selectedHero && selectedHero.name === hero.name);
  };

  const handleHeroClick = (hero: { name: string; image: string }) => {
    if (selectedSlot.index !== -1 && !isHeroSelected(hero)) {
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
      setSelectedSlot({ type: '', index: -1 });
    }
  };



  const handleSubmit = async () => {
    try {
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
  
      const responseText = await response.text();
      const data = JSON.parse(responseText) as SynergyResponse;
  
      if (!response.ok || !data.suggestions) {
        throw new Error('Error en la solicitud');
      }
  
      const recommendationsData = parseRecommendations(data.suggestions);
      
      if (recommendationsData.length === 0) {
        throw new Error('No se pudieron procesar las sugerencias');
      }
  
      setSuggestions(recommendationsData);
  
      // Actualizado para usar la clase correcta
      setTimeout(() => {
        const suggestionsElement = document.querySelector('.suggestions-container');
        if (suggestionsElement) {
          suggestionsElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          });
        }
      }, 100);
  
    } finally {
      setLoading(false);
    }
  };

  const parseRecommendations = (suggestionsText: string) => {
    const recommendations: RecommendationItemProps[] = [];
    
    // Dividir el texto en bloques por roles
    const blocks = suggestionsText.split('\n\n').filter(block => block.trim());
    
    blocks.forEach(block => {
      const lines = block.split('\n');
      const firstLine = lines[0].trim();
      
      // Buscar el formato "Rol: Héroe" en la primera línea
      const headerMatch = firstLine.match(/^(Hard Support|Support|Midlaner|Carry|Offlaner):\s*(\w+(?:\s+\w+)*)/);
      
      if (headerMatch) {
        const [, role, heroName] = headerMatch;
        
        // Extraer las razones (líneas que empiezan con -)
        const reasons = lines
          .slice(1) // Ignorar la primera línea que contiene el rol y héroe
          .filter(line => line.trim().startsWith('-'))
          .map(line => line.replace(/^-\s*/, '').trim());
        
        if (reasons.length > 0) {
          recommendations.push({
            role: role.trim(),
            heroName: heroName.trim(),
            heroImage: getHeroImage(heroName.trim()),
            reasons
          });
        }
      }
    });
    
    return recommendations;
  };

  const getHeroImage = (heroName: string) => {
    const hero = heroes.find((hero) => hero.name === heroName);
    return hero ? hero.image : '';
  };

  return (
    <div className="p-4 synergy-picker">
      <h2 className="block mb-4 font-semibold">Synergy Picker</h2>
      <div className="versus">
      {/* Espacios para aliados */}
      <div className="flex justify-start mb-4 bloqueigual">
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
      <div className="flex justify-start mb-4 bloqueigual">
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
      </div>
      
      {/* Selector de héroes */}
      <div className="hero-grid">
  {heroes.map((hero, index) => (
    <div 
      key={index} 
      className={`hero-card ${isHeroSelected(hero) ? 'selected' : ''}`}
      draggable 
      onDragStart={(event) => handleDragStart(event, hero)}
      onClick={() => handleHeroClick(hero)}
    >
      <div className="hero-image-container">
        <img src={hero.image} alt={hero.name} className="hero-image" />
        <div className="hero-name-overlay">{hero.name}</div>
      </div>
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
      {suggestions.length > 0 && (
  <div className="mt-4 p-4 border rounded suggestions-container">
    <h3 className="font-semibold">Sugerencias:</h3>
    {suggestions.map((suggestion, index) => (
      <RecommendationItem
        key={index}
        role={suggestion.role}
        heroName={suggestion.heroName}
        heroImage={suggestion.heroImage}
        reasons={suggestion.reasons}
      />
    ))}
  </div>
)}
    </div>
  );
};

export default SynergyPicker;
