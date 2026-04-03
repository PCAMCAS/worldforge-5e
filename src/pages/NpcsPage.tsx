import NpcCard from '../components/NpcCard'
import { mockLocations } from '../data/mockLocations'
import { useNpcs } from '../hooks/useNpcs'

function NpcsPage() {
  const { search, setSearch, filteredNpcs, totalNpcs } = useNpcs()

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <span className="inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1 text-sm font-medium text-fuchsia-300">
          World NPCs
        </span>

        <h2 className="mt-6 text-4xl font-bold text-white">NPCs</h2>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          Consulta personajes no jugadores del mundo, su raza, rol y la
          localización con la que están relacionados.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <label
            htmlFor="npc-search"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Buscar NPC
          </label>

          <input
            id="npc-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Busca por nombre, raza, rol o localización"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-400/40"
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-3">
          <p className="text-sm text-slate-400">Total registrados</p>
          <p className="mt-1 text-2xl font-bold text-white">{totalNpcs}</p>
        </div>
      </div>

      {filteredNpcs.length > 0 ? (
        <div className="grid gap-6 xl:grid-cols-2">
          {filteredNpcs.map(({ npc }) => {
            const location = mockLocations.find((item) => item.id === npc.locationId)

            return <NpcCard key={npc.id} npc={npc} location={location} />
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/15 bg-slate-900/40 p-10 text-center">
          <h3 className="text-2xl font-semibold text-white">
            No se han encontrado NPCs
          </h3>
          <p className="mt-3 text-slate-400">
            Prueba con otro término de búsqueda.
          </p>
        </div>
      )}
    </section>
  )
}

export default NpcsPage