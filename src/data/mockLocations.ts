import type { Location } from '../types/location'

export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Reino de Valoria',
    type: 'kingdom',
    description: 'Un reino próspero rodeado de montañas y bosques antiguos.',
    climate: 'templado',
    dangerLevel: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Bosque Sombrío',
    type: 'forest',
    description: 'Un bosque oscuro donde habitan criaturas desconocidas.',
    climate: 'húmedo',
    dangerLevel: 7,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]