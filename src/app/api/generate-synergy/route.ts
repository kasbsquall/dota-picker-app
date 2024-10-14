import { NextResponse, NextRequest } from 'next/server'; 
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

// Define un tipo para el héroe
type Hero = {
  name: string;
  role?: string;
};

export async function POST(request: NextRequest) {
  const { allies, enemies, rank } = await request.json();

  // Definición de roles
  const roles = ['Hard Support', 'Support', 'Midlaner', 'Carry', 'Offlaner'];

  // Identificar roles faltantes en aliados
  const filledRoles = allies.map((hero: Hero, index: number) => 
    hero ? roles[index] : null
  ).filter(role => role !== null);

  const missingRoles = roles.filter(role => !filledRoles.includes(role));

  // Generar el prompt basado en los héroes seleccionados y los roles faltantes
  const prompt = `Eres un analista profesional de sinergia de héroes de Dota 2. Aquí tienes una lista de héroes: 
  Aliados: ${allies.map((a: Hero) => a?.name).join(', ')}, 
  Enemigos: ${enemies.map((e: Hero) => e?.name).join(', ')}, 
  Nivel de rango: ${rank}. 
  Los roles que faltan en aliados son: ${missingRoles.join(', ')}. 
  Da una respuesta directa y profesional del heroe más adecuado por cada rol faltante en base a sinergia y contra pickear a los enemigos. Además genera un % de probabilidad de victoria en base a los picks.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 300,
    temperature: 0.0, 
  });

  const suggestions = response.choices[0].message.content;
  
  return NextResponse.json({ suggestions });
}
