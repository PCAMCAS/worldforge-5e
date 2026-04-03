export interface HistoricalEvent {
  id: string
  title: string
  era: string
  description: string
  locationId: string
}

export const historicalEvents: HistoricalEvent[] = [
  {
    id: '1',
    title: 'La Gran Guerra de Valoria',
    era: 'Hace 200 años',
    description: 'Una guerra que definió el reino actual.',
    locationId: '1',
  },
  {
    id: '2',
    title: 'La Maldición del Bosque',
    era: 'Hace 50 años',
    description: 'Un evento oscuro que cambió el bosque para siempre.',
    locationId: '2',
  },
]