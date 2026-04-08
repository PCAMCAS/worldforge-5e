export interface HistoricalEvent {
  id: string
  title: string
  era: string
  description: string
  locationId: string
}

export const historicalEvents: HistoricalEvent[] = [
  { id: '1', title: 'Gran Guerra de Valoria', era: 'Hace 200 años', description: 'Conflicto masivo.', locationId: '1' },
  { id: '2', title: 'Corrupción del Bosque', era: 'Hace 50 años', description: 'Magia oscura invade.', locationId: '2' },
  { id: '3', title: 'Fundación de Arkhaven', era: 'Hace 500 años', description: 'Ciudad mágica creada.', locationId: '3' },
  { id: '4', title: 'Tormenta del Mar de Cenizas', era: 'Hace 20 años', description: 'Cataclismo marino.', locationId: '6' },
  { id: '5', title: 'Descubrimiento del Lago Espejo', era: 'Hace 300 años', description: 'Fuente mágica hallada.', locationId: '5' },
  { id: '6', title: 'Caída de Eldor', era: 'Hace 1000 años', description: 'Civilización destruida.', locationId: '10' },
  { id: '7', title: 'Levantamiento Enano', era: 'Hace 150 años', description: 'Rebelión en montañas.', locationId: '7' },
  { id: '8', title: 'Expedición a la Selva', era: 'Hace 80 años', description: 'Exploradores desaparecen.', locationId: '8' },
  { id: '9', title: 'Asalto Pirata', era: 'Hace 10 años', description: 'Ataque a puerto.', locationId: '9' },
  { id: '10', title: 'Plaga de Brisamar', era: 'Hace 30 años', description: 'Enfermedad mortal.', locationId: '4' },
]