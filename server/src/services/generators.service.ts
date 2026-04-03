const randomEvents = [
  'Una tormenta arcana altera la magia de la zona.',
  'Un noble desaparece antes de una reunión crucial.',
  'Una caravana llega con noticias de guerra.',
]

const randomEncounters = [
  'Un grupo de bandidos embosca a los viajeros.',
  'Un druida advierte sobre una corrupción en el bosque.',
  'Un mercader ofrece un mapa incompleto de unas ruinas.',
]

const randomTreasures = [
  'Un anillo de plata con runas antiguas.',
  'Una bolsa con 35 piezas de oro y una gema azul.',
  'Un pergamino sellado con un hechizo menor.',
]

function getRandomItem(items: string[]) {
  const randomIndex = Math.floor(Math.random() * items.length)
  return items[randomIndex]
}

export function getRandomEvent() {
  return {
    type: 'event',
    result: getRandomItem(randomEvents),
  }
}

export function getRandomEncounter() {
  return {
    type: 'encounter',
    result: getRandomItem(randomEncounters),
  }
}

export function getRandomTreasure() {
  return {
    type: 'treasure',
    result: getRandomItem(randomTreasures),
  }
}