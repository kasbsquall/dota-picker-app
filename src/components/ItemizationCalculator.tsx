// src/components/ItemizationCalculator.tsx
import { useState } from "react";
import heroes from "./heroList";
import "./ItemizationCalculator.css";
import HeroGrid from './HeroGrid';

interface ItemRecommendationsProps {
  recommendations: ItemRecommendations;
  selectedHero: Hero | null;
  enemyHeroes: (Hero | null)[];
}

interface Hero {
  name: string;
  image: string;
  role?: string; // Añadimos el rol como opcional
}

interface Item {
  name: string;
  reason: string;
  image: string;
}

interface ItemBuild {
  title: string;
  description: string;
  items: {
    early: Item[];
    mid: Item[];
    late: Item[];
  };
}

interface ItemRecommendations {
  builds: ItemBuild[];
}

const BuildCard = ({ build }: { build: ItemBuild }) => {
  return (
    <div className="build-card bg-gray-800 rounded-lg p-4 flex-1 min-w-[300px] max-w-[400px]">
      <div className="build-header mb-4">
        <h4 className="text-xl font-bold text-green-400">{build.title}</h4>
        <p className="text-sm text-gray-300">{build.description}</p>
      </div>

      <div className="phases-grid">
        {["early", "mid", "late"].map((phase) => (
          <div key={phase} className="phase-section mb-4">
            <h5 className="phase-title text-sm font-semibold text-green-400 mb-2">
              {phase === "early"
                ? "Fase Inicial"
                : phase === "mid"
                ? "Fase Media"
                : "Fase Tardía"}
            </h5>
            <div className="items-container flex flex-wrap gap-2">
              {build.items[phase as keyof typeof build.items].map(
                (item, idx) => (
                  <div
                    key={idx}
                    className="item-tooltip-container relative group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded border border-gray-600 hover:border-green-400 transition-all cursor-help"
                    />
                    <div className="tooltip opacity-0 group-hover:opacity-100 absolute z-10 left-1/2 -bottom-2 transform -translate-x-1/2 translate-y-full bg-gray-900 text-white p-2 rounded shadow-lg w-48 pointer-events-none transition-opacity">
                      <p className="font-semibold text-green-400 mb-1">
                        {item.name}
                      </p>
                      <p className="text-sm">{item.reason}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ItemRecommendations: React.FC<ItemRecommendationsProps> = ({
  recommendations,
  selectedHero,
  enemyHeroes,
}) => {
  const build = recommendations.builds[0]; // Solo tomamos la primera build
  return (
    <div className="recommendations-container">
      <div className="recommendations-header mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Build Óptima para {selectedHero?.name} ({selectedHero?.role})
          </h3>
          {enemyHeroes.some((h: Hero | null) => h !== null) && (
            <p className="text-sm text-gray-400">
              Contra: {enemyHeroes.filter(h => h !== null).map(h => h?.name).join(', ')}
            </p>
          )}
        </div>
      </div>

      <div className="build-card bg-gray-800 rounded-lg p-6">
        <div className="build-header mb-6">
          <p className="text-gray-300 text-sm">{build.description}</p>
        </div>

        <div className="phases-grid space-y-6">
          {["early", "mid", "late"].map((phase) => (
            <div key={phase} className="phase-section">
              <h5 className="phase-title text-sm font-semibold text-green-400 mb-3">
                {phase === "early"
                  ? "Fase Inicial"
                  : phase === "mid"
                  ? "Fase Media"
                  : "Fase Tardía"}
              </h5>
              <div className="items-container flex flex-wrap gap-3">
                {build.items[phase as keyof typeof build.items].map((item, idx) => (
                  <div
                    key={idx}
                    className="item-tooltip-container relative group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded border border-gray-600 hover:border-green-400 transition-all cursor-help"
                    />
                    <div className="tooltip opacity-0 group-hover:opacity-100 absolute z-10 left-1/2 -bottom-2 transform -translate-x-1/2 translate-y-full bg-gray-900 text-white p-2 rounded shadow-lg w-48 pointer-events-none transition-opacity">
                      <p className="font-semibold text-green-400 mb-1">
                        {item.name}
                      </p>
                      <p className="text-sm">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const roles = ["Hard Support", "Support", "Midlaner", "Carry", "Offlaner"];

const ItemizationCalculator = () => {
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("Carry"); // Añadimos estado para el rol
  const [enemyHeroes, setEnemyHeroes] = useState<(Hero | null)[]>(
    Array(5).fill(null)
  );
  const [recommendations, setRecommendations] = useState<ItemRecommendations>({
    builds: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<number>(-1);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    hero: Hero
  ) => {
    event.dataTransfer.setData("heroName", hero.name);
    event.dataTransfer.setData("heroImage", hero.image);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    type: "main" | "enemy",
    index?: number
  ) => {
    event.preventDefault();
    const heroName = event.dataTransfer.getData("heroName");
    const heroImage = event.dataTransfer.getData("heroImage");
    const hero = {
      name: heroName,
      image: heroImage,
      role: type === "main" ? selectedRole : roles[index || 0], // Asignamos el rol
    };

    if (type === "main") {
      setSelectedHero(hero);
    } else if (type === "enemy" && index !== undefined) {
      const newEnemies = [...enemyHeroes];
      newEnemies[index] = hero;
      setEnemyHeroes(newEnemies);
    }
  };

  const handleRemoveHero = (type: "main" | "enemy", index?: number) => {
    if (type === "main") {
      setSelectedHero(null);
    } else if (type === "enemy" && index !== undefined) {
      const newEnemies = [...enemyHeroes];
      newEnemies[index] = null;
      setEnemyHeroes(newEnemies);
    }
  };

  const handleSlotClick = (index: number) => {
    setSelectedSlot(selectedSlot === index ? -1 : index);
  };

  const isHeroSelected = (hero: Hero) => {
    return (
      selectedHero?.name === hero.name ||
      enemyHeroes.some((enemyHero) => enemyHero?.name === hero.name)
    );
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

      const heroWithRole = {
        ...selectedHero,
        role: selectedRole, // Aseguramos que el héroe tenga un rol
      };

      const response = await fetch("/api/generate-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hero: heroWithRole,
          enemies: enemyHeroes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error desconocido");
      }

      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error("Error:", error);
      // Aquí puedes manejar el error, por ejemplo mostrándolo en la UI
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 itemization-calculator">
      <h2 className="text-2xl font-bold mb-6">Calculadora de Itemización</h2>

      <div className="bloquetotal-item">
        {/* Selección de héroe principal */}
        <div className="main-hero-section">
          <h2 className="block mb-4 font-semibold center">Tu Héroe</h2>
          {/* Añadimos selector de rol */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="mb-4 border rounded p-2 selectorali"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <div
            className="main-hero"
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, "main")}
            onClick={() => handleSlotClick(-1)}
          >

            {selectedHero ? (
              <div className="flex flex-col items-center">
                <img
                  src={selectedHero.image}
                  alt={selectedHero.name}
                  className="hero-image"
                />
                <button
                  onClick={() => handleRemoveHero("main")}
                  className="remove-button"
                >
                  X
                </button>
              </div>
            ) : (
              <p className="empty-slot">Selecciona tu héroe</p>
            )}
          </div>
        </div>

        {/* Selección de héroes enemigos */}
        <div className="enemy-heroes-section">
          <h2 className="block mb-4 font-semibold center">Héroes Enemigos</h2>
          <div className="enemy-slots">
            {enemyHeroes.map((hero, index) => (
              <div
                key={index}
                className={`hero-slot ${
                  selectedSlot === index ? "selected" : ""
                }`}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, "enemy", index)}
                onClick={() => handleSlotClick(index)}
              >
                <p>{roles[index]}</p>
                {hero ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={hero.image}
                      alt={hero.name}
                      className="hero-image"
                    />
                    <button
                      onClick={() => handleRemoveHero("enemy", index)}
                      className="remove-button"
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <p className="empty-slot">Selecciona héroe</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de héroes */}
<HeroGrid
  onHeroSelect={(hero) => {
    if (selectedSlot !== -1) {
      const newEnemies = [...enemyHeroes];
      newEnemies[selectedSlot] = hero;
      setEnemyHeroes(newEnemies);
      setSelectedSlot(-1);
    }
  }}
  selectedHeroes={[selectedHero, ...enemyHeroes].filter(Boolean)}
  onDragStart={(event, hero) => {
    event.dataTransfer.setData("heroName", hero.name);
    event.dataTransfer.setData("heroImage", hero.image);
  }}
/>

      {/* Botón para generar recomendaciones */}
      <button
        onClick={handleSubmit}
        disabled={!selectedHero}
        className={`submit-button ${!selectedHero ? "disabled" : ""}`}
      >
        Generar Recomendaciones de Items
      </button>

      {loading && <div className="loader"></div>}

      {/* Mostrar recomendaciones */}
      {recommendations?.builds?.length > 0 && (
        <ItemRecommendations
          recommendations={recommendations}
          selectedHero={selectedHero}
          enemyHeroes={enemyHeroes}
        />
      )}
    </div>
  );
};

export default ItemizationCalculator;
