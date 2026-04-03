export interface Npc {
  id: string
  name: string
  race: string
  role: string
  description: string
  locationId: string
}

export const npcs: Npc[] = [
  {
    id: '1',
    name: 'Arthos el Sabio',
    race: 'Humano',
    role: 'Mago de la corte',
    description: 'Consejero real experto en magia antigua.',
    locationId: '1',
  },
  {
    id: '2',
    name: 'Lyra Sombraluna',
    race: 'Elfa',
    role: 'Guardiana del bosque',
    description: 'Protege el Bosque Sombrío de intrusos.',
    locationId: '2',
  },
]