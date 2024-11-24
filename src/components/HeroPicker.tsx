// src/app/components/HeroPicker.tsx
"use client";

import { useState } from 'react';

// Lista de héroes con su nombre y video
const heroes = [
  {
    name: 'Abaddon',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/abaddon.png',
  },
  {
    name: 'Alchemist',
    image: './images/mini/alchemist.png',
  },
  {
    name: 'Ancient Apparition',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/ancient_apparition.png',
  },
  {
    name: 'Anti-Mage',
    image: './images/mini/antimage.png',
  },
  {
    name: 'Arc Warden',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/arc_warden.png',
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
    name: 'Batrider',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/batrider.png',
  },
  {
    name: 'Beastmaster',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/beastmaster.png',
  },
  {
    name: 'Bloodseeker',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/bloodseeker.png',
  },
  {
    name: 'Bounty Hunter',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/bounty_hunter.png',
  },
  {
    name: 'Brewmaster',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/brewmaster.png',
  },
  {
    name: 'Bristleback',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/bristleback.png',
  },
  {
    name: 'Broodmother',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/broodmother.png',
  },
  {
    name: 'Centaur Warrunner',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/centaur.png',
  },
  {
    name: 'Chaos Knight',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/chaos_knight.png',
  },
  {
    name: 'Chen',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/chen.png',
  },
  {
    name: 'Clinkz',
    image: './images/mini/clinkz.png',
  },
  {
    name: 'Clockwerk',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/rattletrap.png',
  },
  {
    name: 'Crystal Maiden',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/crystal_maiden.png',
  },
  {
    name: 'Dark Seer',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/dark_seer.png',
  },
  {
    name: 'Dark Willow',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/dark_willow.png',
  },
  {
    name: 'Dazzle',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/dazzle.png',
  },
  {
    name: 'Death Prophet',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/death_prophet.png',
  },
  {
    name: 'Disruptor',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/disruptor.png',
  },
  {
    name: 'Doom',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/doom_bringer.png',
  },
  {
    name: 'Dragon Knight',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/dragon_knight.png',
  },
  {
    name: 'Drow Ranger',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/drow_ranger.png',
  },
  {
    name: 'Earth Spirit',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/earth_spirit.png',
  },
  {
    name: 'Earthshaker',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/earthshaker.png',
  },
  {
    name: 'Elder Titan',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/elder_titan.png',
  },
  {
    name: 'Ember Spirit',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/ember_spirit.png',
  },
  {
    name: 'Enchantress',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/enchantress.png',
  },
  {
    name: 'Enigma',
    image: './images/mini/enigma.png',
  },
  {
    name: 'Faceless Void',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/faceless_void.png',
  },
  {
    name: 'Grimstroke',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/grimstroke.png',
  },
  {
    name: 'Gyrocopter',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/gyrocopter.png',
  },
  {
    name: 'Hoodwink',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/hoodwink.png',
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
    name: 'Io',
    image: './images/mini/wisp.png',
  },
  {
    name: 'Jakiro',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/jakiro.png',
  },
  {
    name: 'Juggernaut',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/juggernaut.png',
  },
  {
    name: 'Keeper of the Light',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/keeper_of_the_light.png',
  },
  {
    name: 'Kunkka',
    image: './images/mini/kunkka.png',
  },
  {
    name: 'Legion Commander',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/legion_commander.png',
  },
  {
    name: 'Leshrac',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/leshrac.png',
  },
  {
    name: 'Lich',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/lich.png',
  },
  {
    name: 'Lifestealer',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/life_stealer.png',
  },
  {
    name: 'Lina',
    image: './images/mini/lina.png',
  },
  {
    name: 'Lion',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/lion.png',
  },
  {
    name: 'Lone Druid',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/lone_druid.png',
  },
  {
    name: 'Luna',
    image: './images/mini/luna.png',
  },
  {
    name: 'Lycan',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/lycan.png',
  },
  {
    name: 'Magnus',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/magnataur.png',
  },
  {
    name: 'Marci',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/marci.png',
  },
  {
    name: 'Mars',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/mars.png',
  },
  {
    name: 'Medusa',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/medusa.png',
  },
  {
    name: 'Meepo',
    image: './images/mini/meepo.png',
  },
  {
    name: 'Mirana',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/mirana.png',
  },
  {
    name: 'Monkey King',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/monkey_king.png',
  },
  {
    name: 'Morphling',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/morphling.png',
  },
  {
    name: 'Muerta',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/muerta.png',
  },
  {
    name: 'Naga Siren',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/naga_siren.png',
  },
  {
    name: "Nature's Prophet",
    image: './images/mini/furion.png',
  },
  {
    name: 'Necrophos',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/necrolyte.png',
  },
  {
    name: 'Night Stalker',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/night_stalker.png',
  },
  {
    name: 'Nyx Assassin',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/nyx_assassin.png',
  },
  {
    name: 'Ogre Magi',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/ogre_magi.png',
  },
  {
    name: 'Omniknight',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/omniknight.png',
  },
  {
    name: 'Oracle',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/oracle.png',
  },
  {
    name: 'Outworld Devourer',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/obsidian_destroyer.png',
  },
  {
    name: 'Pangolier',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/pangolier.png',
  },
  {
    name: 'Phantom Assassin',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/phantom_assassin.png',
  },
  {
    name: 'Phantom Lancer',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/phantom_lancer.png',
  },
  {
    name: 'Phoenix',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/phoenix.png',
  },
  {
    name: 'Primal Beast',
    image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/primal_beast.png',
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
name: 'Queen of Pain',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/queenofpain.png',
},
{
name: 'Razor',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/razor.png',
},
{
name: 'Riki',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/riki.png',
},
{
name: 'Rubick',
image: './images/mini/rubick.png',
},
{
name: 'Sand King',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/sand_king.png',
},
{
name: 'Shadow Demon',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/shadow_demon.png',
},
{
name: 'Shadow Fiend',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/nevermore.png',
},
{
name: 'Shadow Shaman',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/shadow_shaman.png',
},
{
name: 'Silencer',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/silencer.png',
},
{
name: 'Skywrath Mage',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/skywrath_mage.png',
},
{
name: 'Slardar',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/slardar.png',
},
{
name: 'Slark',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/slark.png',
},
{
name: 'Snapfire',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/snapfire.png',
},
{
name: 'Sniper',
image: './images/mini/sniper.png',
},
{
name: 'Spectre',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/spectre.png',
},
{
name: 'Spirit Breaker',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/spirit_breaker.png',
},
{
name: 'Storm Spirit',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/storm_spirit.png',
},
{
name: 'Sven',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/sven.png',
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
name: 'Terrorblade',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/terrorblade.png',
},
{
name: 'Tidehunter',
image: './images/mini/tidehunter.png',
},
{
name: 'Timbersaw',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/shredder.png',
},
{
name: 'Tinker',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/tinker.png',
},
{
name: 'Tiny',
image: './images/mini/tiny.png',
},
{
name: 'Treant Protector',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/treant.png',
},
{
name: 'Troll Warlord',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/troll_warlord.png',
},
{
name: 'Tusk',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/tusk.png',
},
{
name: 'Underlord',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/abyssal_underlord.png',
},
{
name: 'Undying',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/undying.png',
},
{
name: 'Ursa',
image: './images/mini/ursa.png',
},
{
name: 'Vengeful Spirit',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/vengefulspirit.png',
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
name: 'Visage',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/visage.png',
},
{
name: 'Void Spirit',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/void_spirit.png',
},
{
name: 'Warlock',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/warlock.png',
},
{
name: 'Weaver',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/weaver.png',
},
{
name: 'Windranger',
image: './images/mini/windrunner.png',
},
{
name: 'Winter Wyvern',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/winter_wyvern.png',
},
{
name: 'Witch Doctor',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/witch_doctor.png',
},
{
name: 'Wraith King',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/skeleton_king.png',
},
{
name: 'Zeus',
image: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/zuus.png',
},
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
