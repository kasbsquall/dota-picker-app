// src/app/api/generate-items/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

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
  
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

const itemImages = {
    'Abyssal Blade': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/3/3b/Abyssal_Blade_icon.png',
    'Aegis of the Immortal': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/2/20/Aegis_of_the_Immortal_icon.png',
'Aeon Disk': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/2/2b/Aeon_Disk_icon.png',
'Aether Lens': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d4/Aether_Lens_icon.png',
"Aghanim's Blessing (Roshan)": "https://static.wikia.nocookie.net/dota2_gamepedia/images/4/43/Aghanim%27s_Blessing_-_Roshan_icon.png",
"Aghanim's Blessing": "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/24/Aghanim%27s_Blessing_icon.png",
"Aghanim's Scepter (2020 Summer 1)": "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/c3/Aghanim%27s_Scepter_%282020_Summer_Event%29_1_icon.png",
"Aghanim's Scepter (2020 Summer 2)": "https://static.wikia.nocookie.net/dota2_gamepedia/images/5/53/Aghanim%27s_Scepter_%282020_Summer_Event%29_2_icon.png",
"Aghanim's Scepter": "https://static.wikia.nocookie.net/dota2_gamepedia/images/0/07/Aghanim%27s_Scepter_icon.png",
"Aghanim's Shard (Roshan)": "https://static.wikia.nocookie.net/dota2_gamepedia/images/6/65/Aghanim%27s_Shard_-_Roshan_icon.png",
"Aghanim's Shard": "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d8/Aghanim%27s_Shard_icon.png",
"Animal Courier (Dire)": "https://static.wikia.nocookie.net/dota2_gamepedia/images/b/b5/Animal_Courier_%28Dire%29_icon.png",
'Animal Courier (Radiant)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1c/Animal_Courier_%28Radiant%29_icon.png',
'Arcane Blink': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/2/28/Arcane_Blink_icon.png',
'Arcane Boots': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/b/be/Arcane_Boots_icon.png',
'Armlet of Mordiggian (Active)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/a/a1/Armlet_of_Mordiggian_%28Active%29_icon.png',
'Armlet of Mordiggian (Inactive)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/8/8d/Armlet_of_Mordiggian_%28Inactive%29_icon.png',
'Assault Cuirass': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d3/Assault_Cuirass_icon.png',
'Banana': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/4/47/Banana_icon.png',
'Band of Elvenskin': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/c/ca/Band_of_Elvenskin_icon.png',
'Battle Fury': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/c/c1/Battle_Fury_icon.png',
'Belt of Strength': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/f/f6/Belt_of_Strength_icon.png',
'Black King Bar': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/72/Black_King_Bar_icon.png',
'Blade Mail': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/18/Blade_Mail_icon.png',
'Blade of Alacrity': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/a/a2/Blade_of_Alacrity_icon.png',
'Blades of Attack': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/e/ed/Blades_of_Attack_icon.png',
'Blight Stone': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/98/Blight_Stone_icon.png',
'Blink Dagger': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/4/4c/Blink_Dagger_icon.png',
'Blitz Knuckles': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/8/8c/Blitz_Knuckles_icon.png',
'Bloodstone': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/5/5a/Bloodstone_icon.png',
'Bloodthorn': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/f/f4/Bloodthorn_icon.png',
'Boots of Speed': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/97/Boots_of_Speed_icon.png',
'Boots of Travel 1': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/6/6d/Boots_of_Travel_1_icon.png',
'Boots of Travel 2': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/e/eb/Boots_of_Travel_2_icon.png',
'Bottle (Amplify Damage)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/4/44/Bottle_%28Amplify_Damage%29_icon.png',
'Bottle (Arcane)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1c/Bottle_%28Arcane%29_icon.png',
'Bottle (Bounty)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/c/ce/Bottle_%28Bounty%29_icon.png',
'Bottle (Empty)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/e/e8/Bottle_%28Empty%29_icon.png',
'Bottle (Full)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/f/fa/Bottle_%28Full%29_icon.png',
'Bottle (Haste)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/f/f1/Bottle_%28Haste%29_icon.png',
'Bottle (Illusion)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/f/fa/Bottle_%28Illusion%29_icon.png',
'Bottle (Invisibility)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/f/f4/Bottle_%28Invisibility%29_icon.png',
'Bottle (Medium)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/5/53/Bottle_%28Medium%29_icon.png',
'Bottle (Regeneration)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/c/c4/Bottle_%28Regeneration%29_icon.png',
'Bottle (Shield)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/7f/Bottle_%28Shield%29_icon.png',
'Bottle (Small)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/71/Bottle_%28Small%29_icon.png',
'Bottle (Water)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/a/a6/Bottle_%28Water%29_icon.png',
'Bottle (Wisdom)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/b/b2/Bottle_%28Wisdom%29_icon.png',
'Bracer': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/6/6e/Bracer_icon.png',
'Broadsword': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/3/3e/Broadsword_icon.png',
'Buckler (Active)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/e/ed/Buckler_%28Active%29_icon.png',
'Buckler (Inactive)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/a/ae/Buckler_%28Inactive%29_icon.png',
'Butterfly': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/2/28/Butterfly_icon.png',
'Chainmail': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/f/f2/Chainmail_icon.png',
'Cheese': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/5/51/Cheese_icon.png',
'Circlet': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/2/28/Circlet_icon.png',
'Clarity': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/77/Clarity_icon.png',
'Claymore': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/4/49/Claymore_icon.png',
'Cloak': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/2/21/Cloak_icon.png',
'Crimson Guard': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/70/Crimson_Guard_icon.png',
'Crown': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/4/46/Crown_icon.png',
'Crystalys': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/3/3f/Crystalys_icon.png',
'Daedalus': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/2/24/Daedalus_icon.png',
'Dagon 1': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/b/bc/Dagon_1_icon.png',
'Dagon 2': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/f/ff/Dagon_2_icon.png',
'Dagon 3': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/99/Dagon_3_icon.png',
'Dagon 4': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/e/e3/Dagon_4_icon.png',
'Dagon 5': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/70/Dagon_5_icon.png',
'Demon Edge': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/b/ba/Demon_Edge_icon.png',
'Desolator': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/8/84/Desolator_icon.png',
'Diffusal Blade 1': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/6/65/Diffusal_Blade_1_icon.png',
'Diffusal Blade 2': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/5/55/Diffusal_Blade_2_icon.png',
'Divine Rapier': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/b/b1/Divine_Rapier_icon.png',
'Dragon Lance': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/d/db/Dragon_Lance_icon.png',
'Drum of Endurance': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/91/Drum_of_Endurance_icon.png',
'Dust of Appearance': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/e/ed/Dust_of_Appearance_icon.png',
'Eaglesong': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/9a/Eaglesong_icon.png',
'Echo Sabre': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/6/6b/Echo_Sabre_icon.png',
'Enchanted Mango': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/70/Enchanted_Mango_icon.png',
'Energy Booster': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/72/Energy_Booster_icon.png',
'Eternal Shroud': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/c/c5/Eternal_Shroud_icon.png',
'Ethereal Blade': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/5/5b/Ethereal_Blade_icon.png',
"Eul's Scepter of Divinity": "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/80/Eul%27s_Scepter_of_Divinity_icon.png",
'Eye of Skadi': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1e/Eye_of_Skadi_icon.png',
'Faerie Fire': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/5/54/Faerie_Fire_icon.png',
'Falcon Blade': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/4/4a/Falcon_Blade_icon.png',
'Fluffy Hat': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/b/b5/Fluffy_Hat_icon.png',
'Flying Courier (Dire)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/76/Flying_Courier_%28Dire%29_icon.png',
'Flying Courier (Radiant)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d7/Flying_Courier_%28Radiant%29_icon.png',
'Force Staff': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/a/a2/Force_Staff_icon.png',
'Gauntlets of Strength': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/8/88/Gauntlets_of_Strength_icon.png',
'Gem of True Sight': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1d/Gem_of_True_Sight_icon.png',
'Ghost Scepter': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/9d/Ghost_Scepter_icon.png',
'Gleipnir': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/5/5d/Gleipnir_icon.png',
'Glimmer Cape': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/c/ce/Glimmer_Cape_icon.png',
'Gloves of Haste': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/16/Gloves_of_Haste_icon.png',
'Guardian Greaves': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/94/Guardian_Greaves_icon.png',
'Hand of Midas': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/5/5b/Hand_of_Midas_icon.png',
'Headdress': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/0/03/Headdress_icon.png',
'Healing Salve': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/3/36/Healing_Salve_icon.png',
'Heart of Tarrasque': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/75/Heart_of_Tarrasque_icon.png',
"Heaven's Halberd": "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/c6/Heaven%27s_Halberd_icon.png",
'Helm of Iron Will': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/f/f6/Helm_of_Iron_Will_icon.png',
'Helm of the Dominator': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/97/Helm_of_the_Dominator_icon.png',
'Helm of the Overlord': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/f/f8/Helm_of_the_Overlord_icon.png',
'Holy Locket': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/4/48/Holy_Locket_icon.png',
'Hood of Defiance': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/a/ad/Hood_of_Defiance_icon.png',
'Hurricane Pike': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/13/Hurricane_Pike_icon.png',
'Hyperstone': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/6/6a/Hyperstone_icon.png',
'Infused Raindrops': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d2/Infused_Raindrops_icon.png',
'Iron Branch': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/a/a3/Iron_Branch_icon.png',
'Javelin': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/e/ed/Javelin_icon.png',
'Kaya and Sange': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/6/67/Kaya_and_Sange_icon.png',
'Kaya': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/6/65/Kaya_icon.png',
"Linken's Sphere": "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/23/Linken%27s_Sphere_icon.png",
'Lotus Orb': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/c/c8/Lotus_Orb_icon.png',
'Maelstrom': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/6/65/Maelstrom_icon.png',
'Mage Slayer': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/18/Mage_Slayer_icon.png',
'Magic Stick': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/5/59/Magic_Stick_icon.png',
'Magic Wand': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/74/Magic_Wand_icon.png',
'Manta Style': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/8/84/Manta_Style_icon.png',
'Mantle of Intelligence': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/c/cf/Mantle_of_Intelligence_icon.png',
'Mask of Madness': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/76/Mask_of_Madness_icon.png',
'Medallion of Courage': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d9/Medallion_of_Courage_icon.png',
'Mekansm': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/f/f7/Mekansm_icon.png',
'Meteor Hammer': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/5/54/Meteor_Hammer_icon.png',
'Mithril Hammer': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d5/Mithril_Hammer_icon.png',
'Mjollnir': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/9d/Mjollnir_icon.png',
'Monkey King Bar': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/b/b0/Monkey_King_Bar_icon.png',
'Moon Shard': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/2/21/Moon_Shard_icon.png',
'Morbid Mask': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/76/Morbid_Mask_icon.png',
'Mystic Staff': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/2/29/Mystic_Staff_icon.png',
'Necronomicon 1': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/3/30/Necronomicon_1_icon.png',
'Necronomicon 2': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1c/Necronomicon_2_icon.png',
'Necronomicon 3': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/2/25/Necronomicon_3_icon.png',
'Null Talisman': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/90/Null_Talisman_icon.png',
'Nullifier': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/b/bc/Nullifier_icon.png',
'Oblivion Staff': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/7b/Oblivion_Staff_icon.png',
'Observer and Sentry Wards 1': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/13/Observer_and_Sentry_Wards_1_icon.png',
'Observer and Sentry Wards 2': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/5/5c/Observer_and_Sentry_Wards_2_icon.png',
'Observer Ward': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/f/f6/Observer_Ward_icon.png',
'Octarine Core': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/13/Octarine_Core_icon.png',
'Ogre Axe': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/d/dd/Ogre_Axe_icon.png',
'Orb of Corrosion': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/97/Orb_of_Corrosion_icon.png',
'Orb of Venom': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/3/35/Orb_of_Venom_icon.png',
'Orchid Malevolence': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/a/ad/Orchid_Malevolence_icon.png',
'Overwhelming Blink': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/6/6d/Overwhelming_Blink_icon.png',
'Perseverance': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/f/fb/Perseverance_icon.png',
'Phase Boots': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/98/Phase_Boots_icon.png',
'Pipe of Insight': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/76/Pipe_of_Insight_icon.png',
'Platemail': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/4/4f/Platemail_icon.png',
'Point Booster': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/5/57/Point_Booster_icon.png',
'Power Treads (Agility Colorblind)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/6/6b/Power_Treads_%28Agility_Colorblind%29_icon.png',
'Power Treads (Agility)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/95/Power_Treads_%28Agility%29_icon.png',
'Power Treads (Intelligence)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d5/Power_Treads_%28Intelligence%29_icon.png',
'Power Treads (Strength)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/8/8a/Power_Treads_%28Strength%29_icon.png',
'Power Treads': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/6/6b/Power_Treads_icon.png',
'Quarterstaff': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/13/Quarterstaff_icon.png',
'Quelling Blade': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/94/Quelling_Blade_icon.png',
'Radiance (Active)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/d/df/Radiance_%28Active%29_icon.png',
'Radiance (Inactive)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/8/85/Radiance_%28Inactive%29_icon.png',
'Reaver': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/3/37/Reaver_icon.png',
'Refresher Orb': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/e/e2/Refresher_Orb_icon.png',
"Revenant's Brooch": "https://static.wikia.nocookie.net/dota2_gamepedia/images/3/37/Revenant%27s_Brooch_icon.png",
'Ring of Basilius (Active)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/2/26/Ring_of_Basilius_%28Active%29_icon.png',
'Ring of Basilius (Inactive)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/9e/Ring_of_Basilius_%28Inactive%29_icon.png',
'Ring of Health': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/2/29/Ring_of_Health_icon.png',
'Ring of Protection': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/3/3b/Ring_of_Protection_icon.png',
'Ring of Regen': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/6/6d/Ring_of_Regen_icon.png',
'Ring of Tarrasque': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/78/Ring_of_Tarrasque_icon.png',
'Robe of the Magi': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/b/b3/Robe_of_the_Magi_icon.png',
'Rod of Atos': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/6/66/Rod_of_Atos_icon.png',
'Sacred Relic': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/7c/Sacred_Relic_icon.png',
"Sage's Mask": "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/c6/Sage%27s_Mask_icon.png",
'Sange and Yasha': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/b/b4/Sange_and_Yasha_icon.png',
'Sange': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/f/fc/Sange_icon.png',
'Satanic': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/d/dd/Satanic_icon.png',
'Scythe of Vyse': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/5/54/Scythe_of_Vyse_icon.png',
'Sentry Ward': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/3/3e/Sentry_Ward_icon.png',
'Shadow Amulet': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/0/07/Shadow_Amulet_icon.png',
'Shadow Blade': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/0/0f/Shadow_Blade_icon.png',
"Shiva's Guard": "https://static.wikia.nocookie.net/dota2_gamepedia/images/b/b6/Shiva%27s_Guard_icon.png",
'Silver Edge': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/91/Silver_Edge_icon.png',
'Skull Basher': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/9d/Skull_Basher_icon.png',
'Slippers of Agility': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/5/5c/Slippers_of_Agility_icon.png',
'Smoke of Deceit': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/0/04/Smoke_of_Deceit_icon.png',
'Solar Crest': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/3/36/Solar_Crest_icon.png',
'Soul Booster': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/2/2f/Soul_Booster_icon.png',
'Soul Ring': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/a/a6/Soul_Ring_icon.png',
'Spirit Vessel': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/2/2a/Spirit_Vessel_icon.png',
'Staff of Wizardry': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/8/8a/Staff_of_Wizardry_icon.png',
'Swift Blink': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/4/47/Swift_Blink_icon.png',
'Talisman of Evasion': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/3/37/Talisman_of_Evasion_icon.png',
'Tango (Shared)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/0/06/Tango_%28Shared%29_icon.png',
'Tango': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/f/fd/Tango_icon.png',
'Tome of Knowledge': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/f/fc/Tome_of_Knowledge_icon.png',
'Town Portal Scroll': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/4/46/Town_Portal_Scroll_icon.png',
'Tranquil Boots (Active)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/2/23/Tranquil_Boots_%28Active%29_icon.png',
'Tranquil Boots (Inactive)': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/5/50/Tranquil_Boots_%28Inactive%29_icon.png',
'Ultimate Orb': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/14/Ultimate_Orb_icon.png',
'Urn of Shadows': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/5/58/Urn_of_Shadows_icon.png',
'Vanguard': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/a/ab/Vanguard_icon.png',
'Veil of Discord': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/f/f2/Veil_of_Discord_icon.png',
'Vitality Booster': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1c/Vitality_Booster_icon.png',
"Vladmir's Offering": "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/28/Vladmir%27s_Offering_icon.png",
'Void Stone': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/6/6b/Void_Stone_icon.png',
'Voodoo Mask': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/6/60/Voodoo_Mask_icon.png',
'Wind Lace': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/91/Wind_Lace_icon.png',
'Wind Waker': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/9/90/Wind_Waker_icon.png',
'Witch Blade': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/6/68/Witch_Blade_icon.png',
'Wraith Band': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/5/55/Wraith_Band_icon.png',
'Yasha and Kaya': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/19/Yasha_and_Kaya_icon.png',
'Yasha': 'https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d1/Yasha_icon.png'
};

export async function POST(req: Request) {
    try {
      const { hero, enemies } = await req.json();
  
      // Validaciones
      if (!hero?.name) {
        return NextResponse.json(
          { error: 'Se requiere un héroe seleccionado' },
          { status: 400 }
        );
      }
  
      const enemyNames = enemies
        .filter((e: Hero | null) => e !== null)
        .map((e: Hero) => e.name)
        .join(', ');
  
      const prompt = `Como experto analista de Dota 2, proporciona recomendaciones de itemización para ${hero.name}.
  ${enemyNames ? `Héroes enemigos a considerar: ${enemyNames}` : 'Sin héroes enemigos seleccionados.'}

  Solo considera items de la meta y año actual, no items neutrales ni descontinuados.
  
  Por cada considera 3 items, ten siempre presente en tus respuestas:
  1. El rol y mecánicas principales de ${hero.name}
  2. Items que contrapickeen los enemigos.
  3. Orden según oro o mejoras, progresión lógica de items según la fase
  4. Sinergia entre los items recomendados
  
  Usa ÚNICAMENTE nombres de items exactos de esta lista:
  ${Object.keys(itemImages).join(', ')}
  
  Formato JSON requerido:
  {
    "recommendations": [
      {
        "phase": "early",
        "items": [
          {
            "name": "NOMBRE_EXACTO_DEL_ITEM",
            "reason": "Explicación breve (máximo 100 caracteres)"
          }
        ]
      },
      {
        "phase": "mid",
        "items": []
      },
      {
        "phase": "late",
        "items": []
      }
    ]
  }`;
  
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
      });
  
      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No se recibió respuesta del modelo');
      }
  
      try {
        const recommendations: ItemRecommendations = JSON.parse(content);

        type ItemName = keyof typeof itemImages;
        interface Item {
          name: ItemName;  // Cambiamos el tipo de name
          reason: string;
          image: string;
        }
      
  
        // Validar y procesar las recomendaciones
        const processedRecommendations = recommendations.recommendations.map(phase => ({
            ...phase,
            items: phase.items.map(item => {
              const itemName = item.name as ItemName;
              const itemImage = itemImages[itemName];
              if (!itemImage) {
                console.warn(`Imagen no encontrada para el item: ${itemName}`);
              }
              return {
                ...item,
                image: itemImage || '/images/items/default.png'
              };
            })
          }));
  
        return NextResponse.json({ recommendations: processedRecommendations });
  
      } catch (parseError) {
        console.error('Error al parsear la respuesta:', parseError);
        throw new Error('Error al procesar las recomendaciones de items');
      }
  
    } catch (error) {
      console.error('Error en generate-items:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      return NextResponse.json(
        { error: `Error al generar recomendaciones: ${errorMessage}` },
        { status: 500 }
      );
    }
  }