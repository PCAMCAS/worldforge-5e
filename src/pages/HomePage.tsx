import { useHistoricalEvents } from '../hooks/useHistoricalEvents'
import { useLocations } from '../hooks/useLocations'
import { useNpcs } from '../hooks/useNpcs'

function HomePage() {
  const {
    totalLocations,
    isLoading: isLoadingLocations,
    error: locationsError,
  } = useLocations()

  const { totalNpcs, isLoading: isLoadingNpcs, error: npcsError } = useNpcs()

  const {
    totalEvents,
    isLoading: isLoadingEvents,
    error: eventsError,
  } = useHistoricalEvents()

  const isLoading = isLoadingLocations || isLoadingNpcs || isLoadingEvents
  const error = locationsError || npcsError || eventsError

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

      {isLoading ? (
        <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-10 text-center">
          <h3 className="text-2xl font-semibold text-white">
            Cargando información del mundo...
          </h3>
          <p className="mt-3 text-slate-400">
            Espera unos segundos mientras se consultan los datos de la API.
          </p>
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-400/20 bg-red-500/5 p-10 text-center">
          <h3 className="text-2xl font-semibold text-white">
            No se ha podido cargar el dashboard
          </h3>
          <p className="mt-3 text-slate-300">{error}</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Localizaciones" value={totalLocations} />
          <StatCard label="NPCs" value={totalNpcs} />
          <StatCard label="Eventos históricos" value={totalEvents} />
          <StatCard label="Generadores" value={3} />
        </div>
      )}
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