// src/components/ItemizationCalculator.tsx
import { useState } from 'react';
import heroes from './heroList';
import './ItemizationCalculator.css';

interface Hero {
  name: string;
  image: string;
}

interface Item {
  name: string;
  reason: string;
  image: string;
}

interface PhaseRecommendation {
  phase: 'early' | 'mid' | 'late';
  items: Item[];
}

interface ItemRecommendations {
  recommendations: PhaseRecommendation[];
}

const ItemizationCalculator = () => {
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [enemyHeroes, setEnemyHeroes] = useState<(Hero | null)[]>(Array(5).fill(null));
  const [recommendations, setRecommendations] = useState<ItemRecommendations>({ recommendations: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<number>(-1);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, hero: Hero) => {
    event.dataTransfer.setData('heroName', hero.name);
    event.dataTransfer.setData('heroImage', hero.image);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, type: 'main' | 'enemy', index?: number) => {
    event.preventDefault();
    const heroName = event.dataTransfer.getData('heroName');
    const heroImage = event.dataTransfer.getData('heroImage');
    const hero = { name: heroName, image: heroImage };

    if (type === 'main') {
      setSelectedHero(hero);
    } else if (type === 'enemy' && index !== undefined) {
      const newEnemies = [...enemyHeroes];
      newEnemies[index] = hero;
      setEnemyHeroes(newEnemies);
    }
  };

  const handleRemoveHero = (type: 'main' | 'enemy', index?: number) => {
    if (type === 'main') {
      setSelectedHero(null);
    } else if (type === 'enemy' && index !== undefined) {
      const newEnemies = [...enemyHeroes];
      newEnemies[index] = null;
      setEnemyHeroes(newEnemies);
    }
  };

  const handleSlotClick = (type: 'main' | 'enemy', index?: number) => {
    if (type === 'main') {
      setSelectedHero(null);
    } else if (type === 'enemy' && index !== undefined) {
      setSelectedSlot(selectedSlot === index ? -1 : index);
    }
  };

  const isHeroSelected = (hero: Hero) => {
    return selectedHero?.name === hero.name || enemyHeroes.some((enemyHero) => enemyHero?.name === hero.name);
  };

  const handleHeroClick = (hero: Hero) => {
    if (selectedSlot !== -1) {
      const newEnemies = [...enemyHeroes];
      newEnemies[selectedSlot] = hero;
      setEnemyHeroes(newEnemies);
      setSelectedSlot(-1);
    }
  };

  const handleSubmit = async () => {
    if (!selectedHero) return;

    try {
      setLoading(true);

      const response = await fetch('/api/generate-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hero: selectedHero,
          enemies: enemyHeroes,
        }),
      });

      const data = await response.json();
      setRecommendations(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 itemization-calculator">
      <h2 className="text-2xl font-bold mb-6">Calculadora de Itemización</h2>

      {/* Selección de héroe principal */}
      <div className="main-hero-section">
        <h3 className="text-xl mb-4">Tu Héroe</h3>
        <div
          className="hero-slot main-hero"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, 'main')}
          onClick={() => handleSlotClick('main')}
        >
          {selectedHero ? (
            <div className="selected-hero">
              <img src={selectedHero.image} alt={selectedHero.name} className="hero-image" />
              <p>{selectedHero.name}</p>
              <button onClick={() => handleRemoveHero('main')} className="remove-button">
                ×
              </button>
            </div>
          ) : (
            <p className="empty-slot">Selecciona tu héroe</p>
          )}
        </div>
      </div>

      {/* Selección de héroes enemigos */}
      <div className="enemy-heroes-section">
        <h3 className="text-xl mb-4">Héroes Enemigos</h3>
        <div className="enemy-slots">
          {enemyHeroes.map((hero, index) => (
            <div
              key={index}
              className={`hero-slot ${selectedSlot === index ? 'selected' : ''}`}
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, 'enemy', index)}
              onClick={() => handleSlotClick('enemy', index)}
            >
              {hero ? (
                <div className="selected-hero">
                  <img src={hero.image} alt={hero.name} className="hero-image" />
                  <p>{hero.name}</p>
                  <button onClick={() => handleRemoveHero('enemy', index)} className="remove-button">
                    ×
                  </button>
                </div>
              ) : (
                <p className="empty-slot">Enemigo {index + 1}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grid de héroes */}
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

      {/* Botón para generar recomendaciones */}
      <button
        onClick={handleSubmit}
        disabled={!selectedHero}
        className={`submit-button ${!selectedHero ? 'disabled' : ''}`}
      >
        Generar Recomendaciones de Items
      </button>

      {loading && <div className="loader"></div>}

      {/* Mostrar recomendaciones */}
      {recommendations.recommendations.length > 0 && (
        <div className="recommendations-container">
          <h3 className="text-xl font-bold mb-4">Recomendaciones de Items</h3>
          {recommendations.recommendations.map((phase, index) => (
            <div key={index} className="phase-container">
              <h4 className="phase-title">
                {phase.phase === 'early'
                  ? 'Fase Inicial (0-10 min)'
                  : phase.phase === 'mid'
                  ? 'Fase Media (10-25 min)'
                  : 'Fase Tardía (25+ min)'}
              </h4>
              <div className="items-grid">
                {phase.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="item-card">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <h5>{item.name}</h5>
                    <p>{item.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemizationCalculator;