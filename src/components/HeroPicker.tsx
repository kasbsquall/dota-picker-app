// src/components/HeroPicker.tsx
"use client";

import { useState } from "react";
import HeroGrid from "./HeroGrid";

interface Hero {
  name: string;
  image: string;
}

const positions = ["Carry", "Offlaner", "Support", "Hard Support", "Midlaner"];

const HeroPicker = () => {
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [selectedPosition, setSelectedPosition] = useState(positions[0]);
  const [counterPicks, setCounterPicks] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleHeroSelect = (hero: Hero) => {
    setSelectedHero(hero);
  };

  const handleHeroSelection = async () => {
    if (!selectedHero || !selectedPosition) {
      setError("Debes seleccionar un héroe y una posición.");
      return;
    }
    setError("");
    setLoading(true);

    const response = await fetch("/api/generate-hero", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userHeroSelection: selectedHero.name,
        position: selectedPosition,
      }),
    });

    setLoading(false);

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.error || "Error desconocido");
      return;
    }

    const data = await response.json();
    setCounterPicks(data.counterPicks);
  };

  return (
    <div className="p-4">
      <h2 className="block mb-4 font-semibold">Selecciona un héroe:</h2>

      {/* Hero Grid Component */}
      <HeroGrid
        onHeroSelect={handleHeroSelect}
        selectedHeroes={selectedHero ? [selectedHero] : []}
      />

      {/* Selección de posición */}
      <label htmlFor="positionSelect" className="block mt-4 mb-2 font-semibold">
        Selecciona tu posición:
      </label>
      <select
        id="positionSelect"
        value={selectedPosition}
        onChange={(e) => setSelectedPosition(e.target.value)}
        className="mb-4 border rounded p-2 bg-gray-700 text-white"
      >
        {positions.map((position) => (
          <option key={position} value={position}>
            {position}
          </option>
        ))}
      </select>

      {/* Botón para obtener héroes counter */}
      <button
        onClick={handleHeroSelection}
        disabled={!selectedHero}
        className={`mb-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition ${
          !selectedHero ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Obtener héroes counter
      </button>

            {/* Mostrar héroe seleccionado */}
            {selectedHero && (
        <div className="selected-hero-display mt-4 mb-4 p-3 bg-gray-800 rounded-lg flex items-center gap-3">
          <span className="text-white">
            Héroe seleccionado: <b>{selectedHero.name}</b>
          </span>
        </div>
      )}

      {loading && <div className="loader"></div>}

      {error && <p className="text-red-500">{error}</p>}



      {/* Mostrar héroes counter */}
      {counterPicks && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">
            Counter Pickers recomendados:
          </h2>
          <ul className="space-y-2">
            {counterPicks.split("\n").map((pick, index) => (
              <li key={index} className="flex items-start gap-2">
                <span>{pick.trim()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeroPicker;
