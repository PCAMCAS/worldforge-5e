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

const locationTypeStyles: Record<Location['type'], string> = {
  kingdom: 'border-purple-400/30 bg-purple-400/10 text-purple-300',
  city: 'border-blue-400/30 bg-blue-400/10 text-blue-300',
  village: 'border-green-400/30 bg-green-400/10 text-green-300',
  forest: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  lake: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300',
  sea: 'border-indigo-400/30 bg-indigo-400/10 text-indigo-300',
}

function getDangerLevelLabel(dangerLevel: number): string {
  if (dangerLevel <= 3) return 'Bajo'
  if (dangerLevel <= 6) return 'Medio'
  return 'Alto'
}

function getDangerBarStyle(dangerLevel: number): string {
  if (dangerLevel <= 3) return 'bg-emerald-500'
  if (dangerLevel <= 6) return 'bg-amber-500'
  return 'bg-red-500'
}

function LocationCard({ location }: LocationCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg transition hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-cyan-950/30">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${locationTypeStyles[location.type]}`}
        >
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

          <div className="mt-3 h-2 w-full rounded-full bg-slate-800">
            <div
              className={`h-2 rounded-full transition-all ${getDangerBarStyle(location.dangerLevel)}`}
              style={{ width: `${location.dangerLevel * 10}%` }}
            />
          </div>
        </div>
      </div>
    </article>
  )
}

export default LocationCard