import { useHistoricalEvents } from '../hooks/useHistoricalEvents'
import { useLocations } from '../hooks/useLocations'
import { useNpcs } from '../hooks/useNpcs'

function HomePage() {
  const {
    locations,
    totalLocations,
    isLoading: isLoadingLocations,
    error: locationsError,
  } = useLocations()

  const {
    npcs,
    totalNpcs,
    isLoading: isLoadingNpcs,
    error: npcsError,
  } = useNpcs()

  const {
    events,
    totalEvents,
    isLoading: isLoadingEvents,
    error: eventsError,
  } = useHistoricalEvents()

  const isLoading = isLoadingLocations || isLoadingNpcs || isLoadingEvents
  const error = locationsError || npcsError || eventsError

  const mostDangerousLocation = [...locations].sort(
    (a, b) => b.dangerLevel - a.dangerLevel,
  )[0]

  const highRiskLocations = locations.filter(
    (location) => location.dangerLevel >= 7,
  ).length

  const kingdomsCount = locations.filter(
    (location) => location.type === 'kingdom',
  ).length

  const citiesCount = locations.filter(
    (location) => location.type === 'city',
  ).length

  const forestsCount = locations.filter(
    (location) => location.type === 'forest',
  ).length

  const villagesCount = locations.filter(
    (location) => location.type === 'village',
  ).length

  const humanNpcs = npcs.filter((npc) => npc.race.toLowerCase() === 'humano').length
  const elfNpcs = npcs.filter((npc) => npc.race.toLowerCase() === 'elfa' || npc.race.toLowerCase() === 'elfo').length
  const dwarfNpcs = npcs.filter((npc) => npc.race.toLowerCase() === 'enano').length

  const averageDanger =
    locations.length > 0
      ? (
          locations.reduce((acc, location) => acc + location.dangerLevel, 0) /
          locations.length
        ).toFixed(1)
      : '0'

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
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Localizaciones" value={totalLocations} />
            <StatCard label="NPCs" value={totalNpcs} />
            <StatCard label="Eventos históricos" value={totalEvents} />
            <StatCard label="Generadores" value={3} />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
              <h3 className="text-2xl font-bold text-white">
                Indicadores del mundo
              </h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InfoCard
                  label="Localización más peligrosa"
                  value={mostDangerousLocation?.name ?? 'Sin datos'}
                  helper={
                    mostDangerousLocation
                      ? `Peligro ${mostDangerousLocation.dangerLevel}/10`
                      : 'No disponible'
                  }
                />

                <InfoCard
                  label="Zonas de alto riesgo"
                  value={String(highRiskLocations)}
                  helper="Localizaciones con peligro 7 o superior"
                />

                <InfoCard
                  label="Peligro medio del mundo"
                  value={`${averageDanger}/10`}
                  helper="Media del nivel de peligro"
                />

                <InfoCard
                  label="Eventos registrados"
                  value={String(totalEvents)}
                  helper="Crónicas activas del mundo"
                />
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
              <h3 className="text-2xl font-bold text-white">
                Distribución del contenido
              </h3>

              <div className="mt-6 space-y-4">
                <ProgressRow
                  label="Reinos"
                  value={kingdomsCount}
                  total={totalLocations}
                />
                <ProgressRow
                  label="Ciudades"
                  value={citiesCount}
                  total={totalLocations}
                />
                <ProgressRow
                  label="Bosques"
                  value={forestsCount}
                  total={totalLocations}
                />
                <ProgressRow
                  label="Poblados"
                  value={villagesCount}
                  total={totalLocations}
                />
              </div>
            </section>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
              <h3 className="text-2xl font-bold text-white">
                Población destacada
              </h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <InfoCard
                  label="Humanos"
                  value={String(humanNpcs)}
                  helper="NPCs de raza humana"
                />
                <InfoCard
                  label="Elfos"
                  value={String(elfNpcs)}
                  helper="NPCs élficos registrados"
                />
                <InfoCard
                  label="Enanos"
                  value={String(dwarfNpcs)}
                  helper="Habitantes de linaje enano"
                />
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
              <h3 className="text-2xl font-bold text-white">
                Estado general del archivo
              </h3>

              <div className="mt-6 space-y-4">
                <HighlightRow
                  title="Mundo activo"
                  description="La base de datos del mundo contiene localizaciones, personajes y eventos conectados."
                />
                <HighlightRow
                  title="Exploración preparada"
                  description="Los generadores aleatorios ya permiten improvisar escenas, encuentros y tesoros."
                />
                <HighlightRow
                  title="Escalable"
                  description="La arquitectura actual permite añadir campañas, formularios y nuevos recursos sin rehacer la base."
                />
              </div>
            </section>
          </div>
        </>
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

interface InfoCardProps {
  label: string
  value: string
  helper: string
}

function InfoCard({ label, value, helper }: InfoCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{helper}</p>
    </article>
  )
}

interface ProgressRowProps {
  label: string
  value: number
  total: number
}

function ProgressRow({ label, value, total }: ProgressRowProps) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-sm text-slate-400">
          {value} · {percentage}%
        </p>
      </div>

      <div className="h-2 w-full rounded-full bg-slate-800">
        <div
          className="h-2 rounded-full bg-cyan-400"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

interface HighlightRowProps {
  title: string
  description: string
}

function HighlightRow({ title, description }: HighlightRowProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <p className="mt-2 text-sm leading-7 text-slate-400">{description}</p>
    </article>
  )
}

export default HomePage