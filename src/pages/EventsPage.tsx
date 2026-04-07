import HistoricalEventCard from '../components/HistoricalEventCard'
import { mockLocations } from '../data/mockLocations'
import { useHistoricalEvents } from '../hooks/useHistoricalEvents'

function EventsPage() {
  const { search, setSearch, filteredEvents, totalEvents, isLoading, error } =
    useHistoricalEvents()

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <span className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-sm font-medium text-amber-300">
          World lore
        </span>

        <h2 className="mt-6 text-4xl font-bold text-white">Eventos históricos</h2>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          Consulta hechos importantes del mundo, su época y la localización con
          la que están relacionados.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <label
            htmlFor="event-search"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Buscar evento histórico
          </label>

          <input
            id="event-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Busca por título, época o localización"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400/40"
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-3">
          <p className="text-sm text-slate-400">Total registrados</p>
          <p className="mt-1 text-2xl font-bold text-white">{totalEvents}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-10 text-center">
          <h3 className="text-2xl font-semibold text-white">
            Cargando eventos históricos...
          </h3>
          <p className="mt-3 text-slate-400">
            Espera unos segundos mientras se consultan los datos.
          </p>
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-400/20 bg-red-500/5 p-10 text-center">
          <h3 className="text-2xl font-semibold text-white">
            No se han podido cargar los eventos
          </h3>
          <p className="mt-3 text-slate-300">{error}</p>
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid gap-6 xl:grid-cols-2">
          {filteredEvents.map(({ event }) => {
            const location = mockLocations.find((item) => item.id === event.locationId)

            return (
              <HistoricalEventCard
                key={event.id}
                event={event}
                location={location}
              />
            )
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/15 bg-slate-900/40 p-10 text-center">
          <h3 className="text-2xl font-semibold text-white">
            No se han encontrado eventos
          </h3>
          <p className="mt-3 text-slate-400">
            Prueba con otro término de búsqueda.
          </p>
        </div>
      )}
    </section>
  )
}

export default EventsPage