import { Link, useNavigate, useParams } from 'react-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  deleteLocation,
  updateLocation,
  type UpdateLocationDto,
} from '../api/locations'
import {
  generateEncounterForLocation,
  generateEventForLocation,
  generateTreasureForLocation,
  type GeneratorResponse,
} from '../api/events'
import { useNotification } from '../context/NotificationContext'
import { useHistoricalEvents } from '../hooks/useHistoricalEvents'
import { useLocations } from '../hooks/useLocations'
import { useNpcs } from '../hooks/useNpcs'
import type { LocationType } from '../types/location'

function LocationDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const {
    locations,
    isLoading: isLoadingLocations,
    error: locationsError,
  } = useLocations()

  const { npcs, isLoading: isLoadingNpcs, error: npcsError } = useNpcs()

  const {
    events,
    isLoading: isLoadingEvents,
    error: eventsError,
  } = useHistoricalEvents()

  const [generatedResult, setGeneratedResult] =
    useState<GeneratorResponse | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatorError, setGeneratorError] = useState('')

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editError, setEditError] = useState('')
  const [formValues, setFormValues] = useState<UpdateLocationDto>({
    name: '',
    type: 'city',
    description: '',
    climate: '',
    dangerLevel: 5,
  })

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const isLoading = isLoadingLocations || isLoadingNpcs || isLoadingEvents
  const error = locationsError || npcsError || eventsError

  const location = useMemo(
    () => locations.find((item) => item.id === id),
    [locations, id],
  )

  const locationNpcs = useMemo(
    () => npcs.filter((npc) => npc.locationId === id),
    [npcs, id],
  )

  const locationEvents = useMemo(
    () => events.filter((event) => event.locationId === id),
    [events, id],
  )

  useEffect(() => {
    if (!location) return

    setFormValues({
      name: location.name,
      type: location.type,
      description: location.description,
      climate: location.climate,
      dangerLevel: location.dangerLevel,
    })
  }, [location])

  const handleContextGeneration = useCallback(
    async (type: 'event' | 'encounter' | 'treasure') => {
      if (!location) return

      try {
        setIsGenerating(true)
        setGeneratorError('')
        setGeneratedResult(null)

        const npcNames = locationNpcs.map((npc) => npc.name)

        let data: GeneratorResponse

        if (type === 'event') {
          data = await generateEventForLocation(location.name, npcNames)
        } else if (type === 'encounter') {
          data = await generateEncounterForLocation(location.name, npcNames)
        } else {
          data = await generateTreasureForLocation(location.name, npcNames)
        }

        setGeneratedResult(data)
        showNotification(`Contenido contextual generado en ${location.name}`)
      } catch (err) {
        setGeneratorError(
          err instanceof Error
            ? err.message
            : 'No se pudo generar contenido contextual.',
        )
        showNotification('Error al generar contenido contextual', 'error')
      } finally {
        setIsGenerating(false)
      }
    },
    [location, locationNpcs, showNotification],
  )

  function validateForm() {
    if (formValues.name.trim().length < 3) {
      return 'El nombre debe tener al menos 3 caracteres.'
    }

    if (formValues.description.trim().length < 10) {
      return 'La descripción debe tener al menos 10 caracteres.'
    }

    if (formValues.climate.trim().length < 3) {
      return 'El clima debe tener al menos 3 caracteres.'
    }

    if (formValues.dangerLevel < 1 || formValues.dangerLevel > 10) {
      return 'El nivel de peligro debe estar entre 1 y 10.'
    }

    return ''
  }

  async function handleSaveLocation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!id) return

    const validationError = validateForm()

    if (validationError) {
      setEditError(validationError)
      showNotification(validationError, 'error')
      return
    }

    try {
      setIsSaving(true)
      setEditError('')

      await updateLocation(id, {
        name: formValues.name.trim(),
        type: formValues.type,
        description: formValues.description.trim(),
        climate: formValues.climate.trim(),
        dangerLevel: formValues.dangerLevel,
      })

      setIsEditing(false)
      showNotification('Localización actualizada correctamente')
      window.location.reload()
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'No se pudo actualizar la localización.'

      setEditError(message)
      showNotification('Error al actualizar la localización', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDeleteLocation() {
    if (!id) return

    try {
      setIsDeleting(true)
      setDeleteError('')

      await deleteLocation(id)
      showNotification('La localización ha sido borrada del mundo')
      navigate('/locations')
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'No se pudo eliminar la localización.'

      setDeleteError(message)
      showNotification('Error al eliminar la localización', 'error')
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-10 text-center">
        <h2 className="text-2xl font-semibold text-white">
          Cargando localización...
        </h2>
        <p className="mt-3 text-slate-400">
          Espera unos segundos mientras se consultan los archivos del mundo.
        </p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="rounded-3xl border border-red-400/20 bg-red-500/5 p-10 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No se ha podido cargar la localización
        </h2>
        <p className="mt-3 text-slate-300">{error}</p>
      </section>
    )
  }

  if (!location) {
    return (
      <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-10 text-center">
        <h2 className="text-2xl font-semibold text-white">
          La localización no existe
        </h2>
        <p className="mt-3 text-slate-400">
          No se ha encontrado ningún lugar con ese identificador.
        </p>

        <Link
          to="/locations"
          className="mt-6 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/20"
        >
          Volver a localizaciones
        </Link>
      </section>
    )
  }

  return (
    <>
      <section className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/locations"
            className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/20"
          >
            ← Volver a localizaciones
          </Link>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setIsEditing((prev) => !prev)
                setEditError('')
              }}
              className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300 transition hover:bg-amber-400/20"
            >
              {isEditing ? 'Cancelar edición' : 'Editar'}
            </button>

            <button
              onClick={() => {
                setIsDeleteModalOpen(true)
                setDeleteError('')
              }}
              className="rounded-full border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-400/20"
            >
              Eliminar
            </button>
          </div>
        </div>

        {!isEditing ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
                {location.type}
              </span>

              <span className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-sm font-medium text-amber-300">
                Peligro {location.dangerLevel}/10
              </span>

              <span className="inline-flex rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-sm font-medium text-slate-300">
                Clima: {location.climate}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold text-white">
              {location.name}
            </h1>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">
              {location.description}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSaveLocation}
            className="rounded-3xl border border-white/10 bg-slate-900/50 p-8"
          >
            <h2 className="text-3xl font-bold text-white">
              Editar localización
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Nombre
                </label>

                <input
                  id="name"
                  type="text"
                  value={formValues.name}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-amber-400/40"
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Tipo
                </label>

                <select
                  id="type"
                  value={formValues.type}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      type: event.target.value as LocationType,
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-amber-400/40"
                >
                  <option value="kingdom">Reino</option>
                  <option value="city">Ciudad</option>
                  <option value="village">Poblado</option>
                  <option value="forest">Bosque</option>
                  <option value="lake">Lago</option>
                  <option value="sea">Mar</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="climate"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Clima
                </label>

                <input
                  id="climate"
                  type="text"
                  value={formValues.climate}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      climate: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-amber-400/40"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Descripción
                </label>

                <textarea
                  id="description"
                  rows={5}
                  value={formValues.description}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      description: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-amber-400/40"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="dangerLevel"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Nivel de peligro: {formValues.dangerLevel}/10
                </label>

                <input
                  id="dangerLevel"
                  type="range"
                  min={1}
                  max={10}
                  value={formValues.dangerLevel}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      dangerLevel: Number(event.target.value),
                    }))
                  }
                  className="w-full accent-amber-400"
                />
              </div>
            </div>

            {editError && (
              <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/5 px-4 py-3">
                <p className="text-sm text-red-200">{editError}</p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-medium text-amber-300 transition hover:bg-amber-400/20 disabled:opacity-50"
              >
                {isSaving ? 'Guardando...' : 'Guardar cambios'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsEditing(false)
                  setEditError('')
                  setFormValues({
                    name: location.name,
                    type: location.type,
                    description: location.description,
                    climate: location.climate,
                    dangerLevel: location.dangerLevel,
                  })
                }}
                className="rounded-full border border-white/10 bg-slate-900/60 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/5 p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Generador contextual
              </h2>
              <p className="mt-2 text-slate-300">
                Genera escenas adaptadas a {location.name} y a sus habitantes.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <GeneratorButton
                label="Evento"
                onClick={() => handleContextGeneration('event')}
                disabled={isGenerating}
              />
              <GeneratorButton
                label="Encuentro"
                onClick={() => handleContextGeneration('encounter')}
                disabled={isGenerating}
              />
              <GeneratorButton
                label="Tesoro"
                onClick={() => handleContextGeneration('treasure')}
                disabled={isGenerating}
              />
            </div>
          </div>

          {isGenerating && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-6 text-center">
              <p className="text-white">Generando contenido contextual...</p>
            </div>
          )}

          {generatorError && (
            <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/5 p-6 text-center">
              <p className="text-slate-200">{generatorError}</p>
            </div>
          )}

          {generatedResult && (
            <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/40 p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                  {getTypeLabel(generatedResult.type)}
                </span>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    generatedResult.cursed
                      ? 'border-red-400/30 bg-red-400/10 text-red-300'
                      : 'border-sky-400/30 bg-sky-400/10 text-sky-300'
                  }`}
                >
                  {generatedResult.cursed ? 'Maldito' : 'No maldito'}
                </span>

                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
                  Peligro {generatedResult.dangerLevel}/10
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-bold text-white">
                {generatedResult.title}
              </h3>

              <p className="mt-4 text-lg leading-8 text-slate-200">
                {generatedResult.result}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <InfoBox label="Localización" value={generatedResult.location} />
                <InfoBox label="NPC implicado" value={generatedResult.npc} />
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/40 p-5">
                <p className="text-sm uppercase tracking-wide text-slate-400">
                  Consecuencia o recompensa
                </p>
                <p className="mt-3 text-slate-200">
                  {generatedResult.rewardOrConsequence}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-white">NPCs asociados</h2>
              <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1 text-sm font-medium text-fuchsia-300">
                {locationNpcs.length}
              </span>
            </div>

            {locationNpcs.length > 0 ? (
              <div className="mt-6 space-y-4">
                {locationNpcs.map((npc) => (
                  <article
                    key={npc.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-5"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-fuchsia-300">
                        {npc.race}
                      </span>

                      <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                        {npc.role}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-semibold text-white">
                      {npc.name}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      {npc.description}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-slate-400">
                No hay NPCs registrados en esta localización.
              </p>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-white">
                Eventos históricos
              </h2>
              <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-sm font-medium text-amber-300">
                {locationEvents.length}
              </span>
            </div>

            {locationEvents.length > 0 ? (
              <div className="mt-6 space-y-4">
                {locationEvents.map((event) => (
                  <article
                    key={event.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-5"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
                        {event.era}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-semibold text-white">
                      {event.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      {event.description}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-slate-400">
                No hay eventos históricos registrados en esta localización.
              </p>
            )}
          </div>
        </div>
      </section>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-6">
          <div className="w-full max-w-2xl rounded-3xl border border-red-400/20 bg-slate-900 p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1 text-sm font-medium text-red-300">
                  Eliminación irreversible
                </span>

                <h2 className="mt-5 text-3xl font-bold text-white">
                  ¿Estás seguro de eliminar esta creación de tu mundo?
                </h2>

                <p className="mt-4 text-lg leading-8 text-slate-300">
                  Todos los habitantes serán eliminados por un mago en cuanto
                  finalices, y nadie recordará que existió.
                </p>
              </div>

              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-full border border-white/10 bg-slate-800 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/50 p-5">
              <p className="text-sm uppercase tracking-wide text-slate-400">
                Localización afectada
              </p>
              <p className="mt-2 text-xl font-semibold text-white">
                {location.name}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                NPCs asociados: {locationNpcs.length} · Eventos históricos:{' '}
                {locationEvents.length}
              </p>
            </div>

            {deleteError && (
              <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/5 px-4 py-3">
                <p className="text-sm text-red-200">{deleteError}</p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap justify-end gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-full border border-white/10 bg-slate-800 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-700"
              >
                Cancelar
              </button>

              <button
                onClick={handleDeleteLocation}
                disabled={isDeleting}
                className="rounded-full border border-red-400/30 bg-red-400/10 px-5 py-3 text-sm font-medium text-red-300 transition hover:bg-red-400/20 disabled:opacity-50"
              >
                {isDeleting ? 'Eliminando...' : 'Eliminar para siempre'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

interface GeneratorButtonProps {
  label: string
  onClick: () => void
  disabled: boolean
}

function GeneratorButton({
  label,
  onClick,
  disabled,
}: GeneratorButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-400/20 disabled:opacity-50"
    >
      Generar {label}
    </button>
  )
}

interface InfoBoxProps {
  label: string
  value: string
}

function InfoBox({ label, value }: InfoBoxProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
      <p className="text-sm uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-white">{value}</p>
    </div>
  )
}

function getTypeLabel(type: GeneratorResponse['type']) {
  if (type === 'event') return 'Evento'
  if (type === 'encounter') return 'Encuentro'
  return 'Tesoro'
}

export default LocationDetailPage