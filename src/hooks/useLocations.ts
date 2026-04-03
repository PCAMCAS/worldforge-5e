import { useMemo, useState } from 'react'
import { mockLocations } from '../data/mockLocations'
import type { Location } from '../types/location'

interface UseLocationsReturn {
  locations: Location[]
  search: string
  setSearch: (value: string) => void
  filteredLocations: Location[]
  totalLocations: number
}

export function useLocations(): UseLocationsReturn {
  const [search, setSearch] = useState('')

  const filteredLocations = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    if (!normalizedSearch) {
      return mockLocations
    }

    return mockLocations.filter((location) => {
      return (
        location.name.toLowerCase().includes(normalizedSearch) ||
        location.type.toLowerCase().includes(normalizedSearch) ||
        location.climate.toLowerCase().includes(normalizedSearch) ||
        location.description.toLowerCase().includes(normalizedSearch)
      )
    })
  }, [search])

  return {
    locations: mockLocations,
    search,
    setSearch,
    filteredLocations,
    totalLocations: mockLocations.length,
  }
}