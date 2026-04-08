export type LocationType =
  | 'kingdom'
  | 'city'
  | 'village'
  | 'forest'
  | 'lake'
  | 'sea'

export interface Location {
  id: string
  name: string
  type: LocationType
  description: string
  climate: string
  dangerLevel: number
  createdAt: string
  updatedAt: string
}

const now = new Date().toISOString()

export const locations: Location[] = [
  {
    id: '1',
    name: 'Reino de Valoria',
    type: 'kingdom',
    description: 'Un reino próspero rodeado de montañas y bosques antiguos.',
    climate: 'templado',
    dangerLevel: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '2',
    name: 'Bosque Sombrío',
    type: 'forest',
    description: 'Un bosque oscuro donde habitan criaturas desconocidas.',
    climate: 'húmedo',
    dangerLevel: 7,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '3',
    name: 'Ciudad de Arkhaven',
    type: 'city',
    description: 'Gran ciudad comercial y centro de magia arcana.',
    climate: 'templado',
    dangerLevel: 4,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '4',
    name: 'Villa Brisamar',
    type: 'village',
    description: 'Pequeño pueblo costero de pescadores.',
    climate: 'marítimo',
    dangerLevel: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '5',
    name: 'Lago Espejo',
    type: 'lake',
    description: 'Un lago de aguas cristalinas con propiedades mágicas.',
    climate: 'frío',
    dangerLevel: 5,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '6',
    name: 'Mar de Cenizas',
    type: 'sea',
    description: 'Un mar oscuro cubierto de ceniza volcánica.',
    climate: 'tormentoso',
    dangerLevel: 8,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '7',
    name: 'Fortaleza Draknar',
    type: 'city',
    description: 'Ciudad fortificada en las montañas habitada por enanos.',
    climate: 'frío',
    dangerLevel: 6,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '8',
    name: 'Selva Viridiana',
    type: 'forest',
    description: 'Selva densa repleta de criaturas exóticas.',
    climate: 'tropical',
    dangerLevel: 7,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '9',
    name: 'Puerto Gris',
    type: 'city',
    description: 'Ciudad portuaria dominada por piratas y contrabandistas.',
    climate: 'marítimo',
    dangerLevel: 6,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '10',
    name: 'Ruinas de Eldor',
    type: 'village',
    description: 'Restos de una antigua civilización destruida.',
    climate: 'árido',
    dangerLevel: 9,
    createdAt: now,
    updatedAt: now,
  },
]