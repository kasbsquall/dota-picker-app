"use client";

import { useState } from 'react';
import RecommendationItem from './RecommendationItem';
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
  
      setTimeout(() => {
        const suggestionsElement = document.querySelector('.suggestions-container');
        if (suggestionsElement) {
          suggestionsElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          });
        }
      }, 100);
  
    } catch (error: unknown) {
      setSuggestions([{
        role: 'Error',
        heroName: 'Error en la solicitud',
        heroImage: '',
        reasons: ['Hubo un error procesando tu solicitud. Por favor intenta de nuevo.']
      }]);
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
