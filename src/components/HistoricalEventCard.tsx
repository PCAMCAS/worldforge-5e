import type { HistoricalEvent } from '../types/event'
import type { Location } from '../types/location'

interface HistoricalEventCardProps {
  event: HistoricalEvent
  location?: Location
}

function HistoricalEventCard({ event, location }: HistoricalEventCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg transition hover:-translate-y-1 hover:border-cyan-400/30">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
          {event.era}
        </span>
      </div>

      <h3 className="mt-4 text-2xl font-bold text-white">{event.title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-300">
        {event.description}
      </p>

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Localización relacionada
        </p>
        <p className="mt-2 text-sm font-medium text-white">
          {location?.name ?? 'Sin localización'}
        </p>
      </div>
    </article>
  )
}

export default HistoricalEventCard