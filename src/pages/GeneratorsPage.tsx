import { useEffect, useState } from 'react'
import { generateEncounter, generateEvent, generateTreasure } from '../api/events'

interface GeneratorResult {
  type: 'event' | 'encounter' | 'treasure'
  title: string
  result: string
  location: string
  npc: string
  dangerLevel: number
  cursed: boolean
  rewardOrConsequence: string
}

interface SavedGeneratorResult extends GeneratorResult {
  id: string
  savedAt: string
}

const STORAGE_KEY = 'worldforge-generator-history'

function GeneratorsPage() {
  const [result, setResult] = useState<GeneratorResult | null>(null)
  const [history, setHistory] = useState<SavedGeneratorResult[]>([])
  const [isHydrated, setIsHydrated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    const storedHistory = localStorage.getItem(STORAGE_KEY)

    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory) as SavedGeneratorResult[]
        setHistory(parsedHistory)
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }

    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }, [history, isHydrated])

  async function handleGenerate(type: 'event' | 'encounter' | 'treasure') {
    try {
      setIsLoading(true)
      setError('')
      setSaveMessage('')
      setResult(null)

      let data: GeneratorResult

      if (type === 'event') {
        data = await generateEvent()
      } else if (type === 'encounter') {
        data = await generateEncounter()
      } else {
        data = await generateTreasure()
      }

      setResult(data)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo generar el contenido.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  function handleSaveResult() {
    if (!result) return

    const alreadySaved = history.some(
      (savedResult) =>
        savedResult.type === result.type &&
        savedResult.title === result.title &&
        savedResult.result === result.result &&
        savedResult.location === result.location &&
        savedResult.npc === result.npc,
    )

    if (alreadySaved) {
      setSaveMessage('Ese resultado ya está guardado en el historial.')
      return
    }

    const newSavedResult: SavedGeneratorResult = {
      ...result,
      id: crypto.randomUUID(),
      savedAt: new Date().toISOString(),
    }

    setHistory((prevHistory) => [newSavedResult, ...prevHistory])
    setSaveMessage('Resultado guardado en el historial.')
  }

  function handleDeleteSavedResult(id: string) {
    setHistory((prevHistory) =>
      prevHistory.filter((savedResult) => savedResult.id !== id),
    )
  }

  function handleClearHistory() {
    setHistory([])
    setSaveMessage('')
  }

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
          Random generators
        </span>

        <h2 className="mt-6 text-4xl font-bold text-white">Generadores</h2>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          Genera escenas con contexto real para tus sesiones: localización, NPC
          implicado, nivel de peligro, maldición y consecuencia.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <GeneratorCard
          title="Evento aleatorio"
          description="Genera un suceso narrativo con contexto de mundo."
          onClick={() => handleGenerate('event')}
          isLoading={isLoading}
        />

        <GeneratorCard
          title="Encuentro aleatorio"
          description="Crea un encuentro vivo y más útil para improvisar."
          onClick={() => handleGenerate('encounter')}
          isLoading={isLoading}
        />

        <GeneratorCard
          title="Tesoro aleatorio"
          description="Obtén un hallazgo con historia, riesgo y consecuencia."
          onClick={() => handleGenerate('treasure')}
          isLoading={isLoading}
        />
      </div>

      {isLoading && (
        <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-10 text-center">
          <h3 className="text-xl font-semibold text-white">
            Generando contenido...
          </h3>
          <p className="mt-2 text-slate-400">
            El destino está decidiendo qué ocurrirá en tu mundo.
          </p>
        </div>
      )}

      {error && (
        <div className="rounded-3xl border border-red-400/20 bg-red-500/5 p-10 text-center">
          <h3 className="text-xl font-semibold text-white">Error al generar</h3>
          <p className="mt-2 text-slate-300">{error}</p>
        </div>
      )}

      {result && (
        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/5 p-8 shadow-lg">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              {getTypeLabel(result.type)}
            </span>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                result.cursed
                  ? 'border-red-400/30 bg-red-400/10 text-red-300'
                  : 'border-sky-400/30 bg-sky-400/10 text-sky-300'
              }`}
            >
              {result.cursed ? 'Maldito' : 'No maldito'}
            </span>

            <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
              Peligro {result.dangerLevel}/10
            </span>
          </div>

          <h3 className="mt-5 text-3xl font-bold text-white">{result.title}</h3>

          <p className="mt-4 text-lg leading-8 text-emerald-100">
            {result.result}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <InfoBox label="Localización" value={result.location} />
            <InfoBox label="NPC implicado" value={result.npc} />
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-5">
            <p className="text-sm uppercase tracking-wide text-slate-400">
              Consecuencia o recompensa
            </p>
            <p className="mt-3 text-slate-200">{result.rewardOrConsequence}</p>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-sm text-slate-300">Amenaza de la escena</p>
            <div className="h-2 w-full rounded-full bg-slate-800">
              <div
                className={`h-2 rounded-full ${getDangerBarStyle(result.dangerLevel)}`}
                style={{ width: `${result.dangerLevel * 10}%` }}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={handleSaveResult}
              className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-400/20"
            >
              Guardar en historial
            </button>

            {saveMessage && (
              <p className="text-sm text-emerald-200">{saveMessage}</p>
            )}
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white">Historial guardado</h3>
            <p className="mt-2 text-slate-400">
              Guarda solo los resultados que realmente quieras conservar para tu
              campaña.
            </p>
          </div>

          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="rounded-full border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-400/20"
            >
              Limpiar historial
            </button>
          )}
        </div>

        {history.length > 0 ? (
          <div className="mt-6 space-y-4">
            {history.map((savedResult) => (
              <article
                key={savedResult.id}
                className="rounded-2xl border border-white/10 bg-slate-950/40 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                        {getTypeLabel(savedResult.type)}
                      </span>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                          savedResult.cursed
                            ? 'border-red-400/30 bg-red-400/10 text-red-300'
                            : 'border-sky-400/30 bg-sky-400/10 text-sky-300'
                        }`}
                      >
                        {savedResult.cursed ? 'Maldito' : 'No maldito'}
                      </span>

                      <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
                        Peligro {savedResult.dangerLevel}/10
                      </span>
                    </div>

                    <h4 className="mt-4 text-xl font-semibold text-white">
                      {savedResult.title}
                    </h4>

                    <p className="mt-2 text-slate-300">{savedResult.result}</p>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <InfoBox
                        label="Localización"
                        value={savedResult.location}
                      />
                      <InfoBox label="NPC implicado" value={savedResult.npc} />
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
                      <p className="text-sm uppercase tracking-wide text-slate-400">
                        Consecuencia o recompensa
                      </p>
                      <p className="mt-2 text-slate-200">
                        {savedResult.rewardOrConsequence}
                      </p>
                    </div>

                    <p className="mt-4 text-xs text-slate-500">
                      Guardado el {formatSavedDate(savedResult.savedAt)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteSavedResult(savedResult.id)}
                    className="rounded-full border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-400/20"
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-slate-950/20 p-8 text-center">
            <h4 className="text-xl font-semibold text-white">
              Aún no has guardado ningún resultado
            </h4>
            <p className="mt-2 text-slate-400">
              Genera contenido y guarda solo las ideas que quieras conservar para
              tu mundo.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

interface GeneratorCardProps {
  title: string
  description: string
  onClick: () => void
  isLoading: boolean
}

function GeneratorCard({
  title,
  description,
  onClick,
  isLoading,
}: GeneratorCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-left transition hover:-translate-y-1 hover:border-emerald-400/30 hover:shadow-lg disabled:opacity-50"
    >
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </button>
  )
}

interface InfoBoxProps {
  label: string
  value: string
}

function InfoBox({ label, value }: InfoBoxProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
      <p className="text-sm uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-white">{value}</p>
    </div>
  )
}

function getTypeLabel(type: GeneratorResult['type']) {
  if (type === 'event') return 'Evento'
  if (type === 'encounter') return 'Encuentro'
  return 'Tesoro'
}

function getDangerBarStyle(dangerLevel: number): string {
  if (dangerLevel <= 3) return 'bg-emerald-500'
  if (dangerLevel <= 6) return 'bg-amber-500'
  return 'bg-red-500'
}

function formatSavedDate(savedAt: string) {
  return new Date(savedAt).toLocaleString('es-ES')
}

export default GeneratorsPage