import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";

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
  const roles: string[] = [
    "Hard Support",
    "Support",
    "Midlaner",
    "Carry",
    "Offlaner",
  ];

  // Identificar roles faltantes en aliados
  const filledRoles: (string | null)[] = allies.map(
    (hero: Hero, index: number) => (hero ? roles[index] : null)
  );

  // Aquí se agrega el tipo 'string' al parámetro role
  const missingRoles = roles.filter(
    (role: string) => !filledRoles.includes(role)
  );

  /*
  // Generar el prompt basado en los héroes seleccionados y los roles faltantes
  const prompt = `Eres un analista profesional de sinergia de héroes de Dota 2. Aquí tienes una lista de héroes: 
  Aliados: ${allies.map((a: Hero) => a?.name).join(', ')}, 
  Enemigos: ${enemies.map((e: Hero) => e?.name).join(', ')}, 
  Nivel de medalla de la partida: ${rank}. 
  Los roles que faltan en aliados son: ${missingRoles.join(', ')}. 
  No recomiendes héroes que ya están presentes en Aliados o Enemigos. 
  Si el usuario no coloco ningún heroe Enemigos entonces solo da una respuesta en base a la mejor sinergia y combo de equipo.
  Da una respuesta directa y profesional del héroe más adecuado por cada rol faltante en base a sinergia y contra pickear a los enemigos.`;
  */

  /*
  const prompt = `Eres un analista profesional de Dota 2 especializado en estrategias y sinergia de héroes. Dados los siguientes héroes:
Aliados: ${allies.map((a: Hero) => a?.name).join(", ")}
Enemigos: ${enemies.map((e: Hero) => e?.name).join(", ")}
Nivel de medalla de la partida: ${rank}

Los roles faltantes en el equipo aliado son: ${missingRoles.join(", ")}.

Proporciona recomendaciones concisas y directas del mejor héroe para cada rol faltante, considerando lo siguiente:
- Sinergia y combos efectivos con los héroes aliados existentes.
- Habilidad para contrarrestar y enfrentar a los héroes enemigos.
- Viabilidad y eficacia en la meta actual del nivel de medalla especificado.

Evita recomendar héroes que ya estén presentes en ambos equipos.

Si no se proporcionaron héroes enemigos, enfoca tu respuesta únicamente en la mejor sinergia y combos con los héroes aliados.

Limita tu respuesta a un máximo de 50 palabras por recomendación para cada rol. La claridad y la precisión son esenciales.`;
*/

const prompt = `Eres un analista profesional de Dota 2 especializado en estrategias y sinergia de héroes. Dados los siguientes héroes:
Aliados: ${allies.map((a: Hero) => a?.name).join(", ")}
Enemigos: ${enemies.map((e: Hero) => e?.name).join(", ")}
Nivel de medalla de la partida: ${rank}

Los roles faltantes en el equipo aliado son: ${missingRoles.join(", ")}.

IMPORTANTE: Sigue EXACTAMENTE este formato para cada recomendación:

Para cada rol faltante, proporciona una recomendación usando EXACTAMENTE este formato:

[ROL]: [HÉROE]
- [RAZÓN 1]
- [RAZÓN 2]
- [RAZÓN 3]

NO pongas el nombre del héroe en una nueva línea, debe estar en la misma línea que el rol.

Proporciona una recomendación para CADA rol faltante, considerando:
- Sinergia y combos efectivos con los héroes aliados existentes
- Habilidad para contrarrestar y enfrentar a los héroes enemigos
- Viabilidad y eficacia en la meta actual del nivel de medalla especificado

Evita recomendar héroes que ya estén presentes en ambos equipos.

Si no se proporcionaron héroes enemigos, enfoca tu respuesta únicamente en la mejor sinergia y combos con los héroes aliados.

Limita tu respuesta a un máximo de 50 palabras por recomendación para cada rol obligatoriamente. La claridad y la precisión son esenciales.`;


  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 300,
    temperature: 0.0,
  });

  const suggestions = response.choices[0].message.content;

  return NextResponse.json({ suggestions });
}
