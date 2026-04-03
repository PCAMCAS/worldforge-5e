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