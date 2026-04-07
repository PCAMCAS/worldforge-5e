import LocationCard from '../components/LocationCard'
import { useLocations } from '../hooks/useLocations'

function LocationsPage() {
  const {
    search,
    setSearch,
    filteredLocations,
    totalLocations,
    isLoading,
    error,
  } = useLocations()

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
          World locations
        </span>

        <h2 className="mt-6 text-4xl font-bold text-white">Localizaciones</h2>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          Explora los principales lugares del mundo de campaña: reinos, bosques,
          mares, lagos, ciudades y poblados con su clima, descripción y nivel de
          peligro.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <label
            htmlFor="location-search"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Buscar localización
          </label>

          <input
            id="location-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Busca por nombre, tipo, clima o descripción"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/40"
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-3">
          <p className="text-sm text-slate-400">Total registradas</p>
          <p className="mt-1 text-2xl font-bold text-white">{totalLocations}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-10 text-center">
          <h3 className="text-2xl font-semibold text-white">
            Cargando localizaciones...
          </h3>
          <p className="mt-3 text-slate-400">
            Espera unos segundos mientras se consultan los datos.
          </p>
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-400/20 bg-red-500/5 p-10 text-center">
          <h3 className="text-2xl font-semibold text-white">
            No se han podido cargar las localizaciones
          </h3>
          <p className="mt-3 text-slate-300">{error}</p>
        </div>
      ) : filteredLocations.length > 0 ? (
        <div className="grid gap-6 xl:grid-cols-2">
          {filteredLocations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/15 bg-slate-900/40 p-10 text-center">
          <h3 className="text-2xl font-semibold text-white">
            No se han encontrado localizaciones
          </h3>
          <p className="mt-3 text-slate-400">
            Prueba con otro término de búsqueda.
          </p>
        </div>
      )}
    </section>
  )
}

export default LocationsPage