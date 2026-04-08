import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { createLocation } from '../api/locations'
import type { LocationType } from '../types/location'

interface FormValues {
  name: string
  type: LocationType
  description: string
  climate: string
  dangerLevel: number
}

const initialValues: FormValues = {
  name: '',
  type: 'city',
  description: '',
  climate: '',
  dangerLevel: 5,
}

function NewLocationPage() {
  const navigate = useNavigate()

  const [values, setValues] = useState<FormValues>(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  function handleChange<K extends keyof FormValues>(
    key: K,
    value: FormValues[K],
  ) {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }))
  }

  function validateForm() {
    if (values.name.trim().length < 3) {
      return 'El nombre debe tener al menos 3 caracteres.'
    }

    if (values.description.trim().length < 10) {
      return 'La descripción debe tener al menos 10 caracteres.'
    }

    if (values.climate.trim().length < 3) {
      return 'El clima debe tener al menos 3 caracteres.'
    }

    if (values.dangerLevel < 1 || values.dangerLevel > 10) {
      return 'El nivel de peligro debe estar entre 1 y 10.'
    }

    return ''
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationError = validateForm()

    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setIsSubmitting(true)
      setError('')

      const createdLocation = await createLocation({
        name: values.name.trim(),
        type: values.type,
        description: values.description.trim(),
        climate: values.climate.trim(),
        dangerLevel: values.dangerLevel,
      })

      navigate(`/locations/${createdLocation.id}`)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo crear la localización.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/locations"
          className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/20"
        >
          ← Volver a localizaciones
        </Link>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
          Create location
        </span>

        <h1 className="mt-6 text-4xl font-bold text-white">
          Nueva localización
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          Añade un nuevo lugar a tu mundo para ampliar la campaña y registrar su
          información principal.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-slate-900/50 p-8"
      >
        <div className="grid gap-6 md:grid-cols-2">
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
              value={values.name}
              onChange={(event) => handleChange('name', event.target.value)}
              placeholder="Ej. Torre de las Mareas"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40"
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
              value={values.type}
              onChange={(event) =>
                handleChange('type', event.target.value as LocationType)
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-emerald-400/40"
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
              value={values.climate}
              onChange={(event) => handleChange('climate', event.target.value)}
              placeholder="Ej. húmedo"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40"
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
              value={values.description}
              onChange={(event) =>
                handleChange('description', event.target.value)
              }
              placeholder="Describe el lugar, su ambiente, su importancia y sus peligros."
              rows={5}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="dangerLevel"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Nivel de peligro: {values.dangerLevel}/10
            </label>

            <input
              id="dangerLevel"
              type="range"
              min={1}
              max={10}
              value={values.dangerLevel}
              onChange={(event) =>
                handleChange('dangerLevel', Number(event.target.value))
              }
              className="w-full accent-emerald-400"
            />
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/5 px-4 py-3">
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-sm font-medium text-emerald-300 transition hover:bg-emerald-400/20 disabled:opacity-50"
          >
            {isSubmitting ? 'Guardando...' : 'Crear localización'}
          </button>

          <Link
            to="/locations"
            className="rounded-full border border-white/10 bg-slate-900/60 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  )
}

export default NewLocationPage