interface RichGeneratorResult {
  type: 'event' | 'encounter' | 'treasure'
  title: string
  result: string
  location: string
  npc: string
  dangerLevel: number
  cursed: boolean
  rewardOrConsequence: string
}

interface GeneratorContext {
  location?: string
  npcs?: string[]
}

const locations = [
  'Reino de Valoria',
  'Bosque Sombrío',
  'Ciudad de Arkhaven',
  'Villa Brisamar',
  'Lago Espejo',
  'Mar de Cenizas',
  'Fortaleza Draknar',
  'Selva Viridiana',
  'Puerto Gris',
  'Ruinas de Eldor',
]

const npcs = [
  'Arthos el Sabio',
  'Lyra Sombraluna',
  'Drogath',
  'Selene',
  'Kael',
  'Thorin',
  'Mira',
  'Zarek',
  'Elion',
  'Vex',
  'Ragnar',
  'Nira',
]

const eventTitles = [
  'Presagio arcano',
  'Desaparición sospechosa',
  'Profecía olvidada',
  'Ritual interrumpido',
  'Juramento quebrado',
]

const eventDescriptions = [
  'Una tormenta arcana altera la magia del lugar durante toda una noche.',
  'Un noble local desaparece poco antes de una reunión decisiva.',
  'Antiguas runas comienzan a brillar sin explicación aparente.',
  'Un culto menor intenta completar un ritual prohibido.',
  'Se descubre una traición en el consejo de la región.',
]

const encounterTitles = [
  'Emboscada en el camino',
  'Advertencia del guardián',
  'Mercader sospechoso',
  'Bestia territorial',
  'Patrulla hostil',
]

const encounterDescriptions = [
  'Un grupo de bandidos sale de entre la maleza y exige tributo.',
  'Un druida advierte sobre una corrupción creciente en la zona.',
  'Un mercader ofrece un mapa incompleto de unas ruinas cercanas.',
  'Una criatura salvaje protege ferozmente su territorio.',
  'Una fuerza armada local confunde a los aventureros con espías.',
]

const treasureTitles = [
  'Reliquia menor',
  'Botín oculto',
  'Tesoro maldito',
  'Herencia perdida',
  'Cofre olvidado',
]

const treasureDescriptions = [
  'Un anillo de plata con runas antiguas aparece en un escondite de piedra.',
  'Una bolsa con monedas y una gema azul yace bajo unas tablas viejas.',
  'Un pergamino sellado contiene un conjuro útil pero inestable.',
  'Una daga ceremonial adornada con símbolos nobles reaparece tras siglos.',
  'Un relicario con valor sentimental y poder menor descansa en una cripta.',
]

const rewardsOrConsequences = [
  'Los aventureros obtienen la confianza de una facción local.',
  'La zona queda marcada por energía oscura durante varios días.',
  'Se descubre una pista hacia una ruina olvidada.',
  'Un enemigo poderoso toma interés en el grupo.',
  'La recompensa incluye oro, reputación y acceso a información valiosa.',
  'Una maldición menor afecta al portador hasta recibir ayuda mágica.',
]

function getRandomItem<T>(items: T[]): T {
  const randomIndex = Math.floor(Math.random() * items.length)
  return items[randomIndex]
}

function getRandomDangerLevel(): number {
  return Math.floor(Math.random() * 10) + 1
}

function getRandomCursed(): boolean {
  return Math.random() < 0.35
}

function resolveLocation(context?: GeneratorContext): string {
  if (context?.location && context.location.trim()) {
    return context.location.trim()
  }

  return getRandomItem(locations)
}

function resolveNpc(context?: GeneratorContext): string {
  const contextualNpcs =
    context?.npcs?.map((npc) => npc.trim()).filter(Boolean) ?? []

  if (contextualNpcs.length > 0) {
    return getRandomItem(contextualNpcs)
  }

  return getRandomItem(npcs)
}

export function getRandomEvent(context?: GeneratorContext): RichGeneratorResult {
  const cursed = getRandomCursed()

  return {
    type: 'event',
    title: getRandomItem(eventTitles),
    result: getRandomItem(eventDescriptions),
    location: resolveLocation(context),
    npc: resolveNpc(context),
    dangerLevel: getRandomDangerLevel(),
    cursed,
    rewardOrConsequence: cursed
      ? 'El suceso deja un rastro de energía maldita que atrae problemas.'
      : getRandomItem(rewardsOrConsequences),
  }
}

export function getRandomEncounter(
  context?: GeneratorContext,
): RichGeneratorResult {
  const cursed = getRandomCursed()

  return {
    type: 'encounter',
    title: getRandomItem(encounterTitles),
    result: getRandomItem(encounterDescriptions),
    location: resolveLocation(context),
    npc: resolveNpc(context),
    dangerLevel: getRandomDangerLevel(),
    cursed,
    rewardOrConsequence: cursed
      ? 'El encuentro está vinculado a una presencia maldita que altera el combate.'
      : getRandomItem(rewardsOrConsequences),
  }
}

export function getRandomTreasure(
  context?: GeneratorContext,
): RichGeneratorResult {
  const cursed = getRandomCursed()

  return {
    type: 'treasure',
    title: getRandomItem(treasureTitles),
    result: getRandomItem(treasureDescriptions),
    location: resolveLocation(context),
    npc: resolveNpc(context),
    dangerLevel: getRandomDangerLevel(),
    cursed,
    rewardOrConsequence: cursed
      ? 'El objeto parece valioso, pero arrastra una maldición latente.'
      : getRandomItem(rewardsOrConsequences),
  }
}