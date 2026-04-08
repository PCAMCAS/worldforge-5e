import { useEffect, useMemo, useState } from 'react'
import { getLocations } from '../api/locations'
import type { Location } from '../types/location'

interface UseLocationsReturn {
  locations: Location[]
  search: string
  setSearch: (value: string) => void
  filteredLocations: Location[]
  totalLocations: number
  isLoading: boolean
  error: string
  reloadLocations: () => Promise<void>
}

export function useLocations(): UseLocationsReturn {
  const [locations, setLocations] = useState<Location[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadLocations() {
    try {
      setIsLoading(true)
      setError('')

      const data = await getLocations()
      setLocations(data)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudieron cargar las localizaciones.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadLocations()
  }, [])

  const filteredLocations = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    if (!normalizedSearch) {
      return locations
    }

    return locations.filter((location) => {
      return (
        location.name.toLowerCase().includes(normalizedSearch) ||
        location.type.toLowerCase().includes(normalizedSearch) ||
        location.climate.toLowerCase().includes(normalizedSearch) ||
        location.description.toLowerCase().includes(normalizedSearch)
      )
    })
  }, [locations, search])

  return {
    locations,
    search,
    setSearch,
    filteredLocations,
    totalLocations: locations.length,
    isLoading,
    error,
    reloadLocations: loadLocations,
  }
}