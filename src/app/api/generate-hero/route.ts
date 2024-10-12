// src/app/api/generate-hero/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { userHeroSelection, position } = await req.json();

  // Solicitar la respuesta en español con información breve
  const prompt = `Eres un Profesional de Dota 2. Dame los 3 mejores héroes para counterpickear en la meta actual a ${userHeroSelection} en la posición de ${position} en Dota 2. Proporciona cada opción en una línea separada y usa descripciones breves para que no se corten las respuestas.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 0.1, // Ajustar la temperatura para respuestas más controladas
    });

    const counterPicks = response.choices[0].message.content.trim();
    
    // Asegurarse de que se devuelven exactamente 3 héroes
    const picksArray = counterPicks.split('\n').map(pick => pick.trim()).filter(pick => pick);
    const finalPicks = picksArray.length >= 3 ? picksArray.slice(0, 3) : picksArray;

    return NextResponse.json({ counterPicks: finalPicks.join('\n') });
  } catch (error) {
    console.error('Error en OpenAI:', error);
    return NextResponse.json({ error: 'Error en la generación de héroes.' }, { status: 500 });
  }
}
