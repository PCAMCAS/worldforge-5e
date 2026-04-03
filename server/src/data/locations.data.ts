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

export const locations: Location[] = [
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