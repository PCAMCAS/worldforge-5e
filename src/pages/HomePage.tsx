import { mockLocations } from '../data/mockLocations'
import { mockNpcs } from '../data/mockNpcs'
import { mockEvents } from '../data/mockEvents'

function HomePage() {
  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
        <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
          Dashboard
        </span>

        <h2 className="mt-6 text-4xl font-bold tracking-tight text-white">
          Organiza tu mundo de campaña en un solo lugar
        </h2>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          WorldForge 5e está pensado para ayudar al Dungeon Master a gestionar
          localizaciones, NPCs, eventos históricos y generadores aleatorios.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Localizaciones" value={mockLocations.length} />
        <StatCard label="NPCs" value={mockNpcs.length} />
        <StatCard label="Eventos históricos" value={mockEvents.length} />
        <StatCard label="Generadores" value={3} />
      </div>
    </section>
  )
}

interface StatCardProps {
  label: string
  value: number
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
    </article>
  )
}

export default HomePage