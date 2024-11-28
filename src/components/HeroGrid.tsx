// src/components/HeroGrid.tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import heroes from './heroList';

interface Hero {
  name: string;
  image: string;
}

interface HeroGridProps {
  onHeroSelect: (hero: Hero) => void;
  selectedHeroes: (Hero | null)[];
  onDragStart?: (event: React.DragEvent<HTMLDivElement>, hero: Hero) => void;
}

const HeroGrid = ({ onHeroSelect, selectedHeroes, onDragStart }: HeroGridProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredHeroes = heroes.filter((hero) =>
    hero.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isHeroSelected = (hero: Hero) => {
    return selectedHeroes.some(
      selectedHero => selectedHero && selectedHero.name === hero.name
    );
  };

  return (
    <div className="hero-grid-container">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="collapse-button flex items-center gap-2 mb-4 text-gray-300 hover:text-white transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        {isExpanded ? 'Ocultar Lista de Héroes' : 'Mostrar Lista de Héroes'}
      </button>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar héroe..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'grid-expanded' : 'grid-collapsed'
        }`}
      >
        <div className="hero-grid">
        {filteredHeroes.map((hero, index) => (
            <div
              key={index}
              className={`hero-card ${isHeroSelected(hero) ? 'selected' : ''}`}
              onClick={() => onHeroSelect(hero)}
              draggable={onDragStart ? true : false}
              onDragStart={(e) => onDragStart && onDragStart(e, hero)}
            >
              <div className="hero-image-container relative">
                <Image
                  src={hero.image}
                  alt={hero.name}
                  width={60}
                  height={60}
                  className="hero-image"
                />
                <div className="hero-name-overlay opacity-0 absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white text-sm transition-opacity duration-200 hover:opacity-100">
                  {hero.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroGrid;