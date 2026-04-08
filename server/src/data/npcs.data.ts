export interface Npc {
  id: string
  name: string
  race: string
  role: string
  description: string
  locationId: string
}

export const npcs: Npc[] = [
  { id: '1', name: 'Arthos el Sabio', race: 'Humano', role: 'Mago', description: 'Consejero real.', locationId: '1' },
  { id: '2', name: 'Lyra Sombraluna', race: 'Elfa', role: 'Guardiana', description: 'Protectora del bosque.', locationId: '2' },
  { id: '3', name: 'Drogath', race: 'Enano', role: 'Herrero', description: 'Maestro forjador.', locationId: '7' },
  { id: '4', name: 'Selene', race: 'Humana', role: 'Mercader', description: 'Comerciante influyente.', locationId: '3' },
  { id: '5', name: 'Kael', race: 'Tiefling', role: 'Asesino', description: 'Silencioso y letal.', locationId: '9' },
  { id: '6', name: 'Thorin', race: 'Enano', role: 'Guerrero', description: 'Veterano de guerra.', locationId: '7' },
  { id: '7', name: 'Mira', race: 'Humana', role: 'Sanadora', description: 'Curandera del pueblo.', locationId: '4' },
  { id: '8', name: 'Zarek', race: 'Orco', role: 'Jefe tribal', description: 'Líder brutal.', locationId: '10' },
  { id: '9', name: 'Elion', race: 'Elfo', role: 'Explorador', description: 'Guía experto.', locationId: '8' },
  { id: '10', name: 'Vex', race: 'Gnomo', role: 'Inventor', description: 'Creador excéntrico.', locationId: '3' },
  { id: '11', name: 'Ragnar', race: 'Humano', role: 'Capitán', description: 'Líder naval.', locationId: '9' },
  { id: '12', name: 'Nira', race: 'Elfa', role: 'Hechicera', description: 'Controla magia salvaje.', locationId: '5' },
]