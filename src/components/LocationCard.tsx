import type { Location } from '../types/location'

interface LocationCardProps {
  location: Location
}

const locationTypeLabels: Record<Location['type'], string> = {
  kingdom: 'Reino',
  city: 'Ciudad',
  village: 'Poblado',
  forest: 'Bosque',
  lake: 'Lago',
  sea: 'Mar',
}

function getDangerLevelLabel(dangerLevel: number): string {
  if (dangerLevel <= 3) return 'Bajo'
  if (dangerLevel <= 6) return 'Medio'
  return 'Alto'
}

function LocationCard({ location }: LocationCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg transition hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-cyan-950/30">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-300">
          {locationTypeLabels[location.type]}
        </span>

        <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
          Peligro: {getDangerLevelLabel(location.dangerLevel)}
        </span>
      </div>

      <h3 className="mt-4 text-2xl font-bold text-white">{location.name}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-300">
        {location.description}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Clima</p>
          <p className="mt-2 text-sm font-medium text-white">{location.climate}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Nivel de peligro
          </p>
          <p className="mt-2 text-sm font-medium text-white">
            {location.dangerLevel}/10
          </p>
        </div>
      </div>
    </article>
  )
}

export default LocationCard