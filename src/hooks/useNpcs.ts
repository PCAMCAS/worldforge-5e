import { useEffect, useMemo, useState } from 'react'
import { getLocations } from '../api/locations'
import { getNpcs } from '../api/npcs'
import type { Location } from '../types/location'
import type { Npc } from '../types/npc'

interface NpcWithLocation {
  npc: Npc
  location?: Location
  locationName: string
}

interface UseNpcsReturn {
  npcs: Npc[]
  search: string
  setSearch: (value: string) => void
  filteredNpcs: NpcWithLocation[]
  totalNpcs: number
  isLoading: boolean
  error: string
}

export function useNpcs(): UseNpcsReturn {
  const [npcs, setNpcs] = useState<Npc[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      try {
        setIsLoading(true)
        setError('')

        const [npcsData, locationsData] = await Promise.all([
          getNpcs(),
          getLocations(),
        ])

        if (isMounted) {
          setNpcs(npcsData)
          setLocations(locationsData)
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : 'No se pudieron cargar los NPCs.',
          )
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredNpcs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return npcs
      .map((npc) => {
        const location = locations.find((item) => item.id === npc.locationId)

        return {
          npc,
          location,
          locationName: location?.name ?? 'Sin localización',
        }
      })
      .filter(({ npc, locationName }) => {
        if (!normalizedSearch) {
          return true
        }

        return (
          npc.name.toLowerCase().includes(normalizedSearch) ||
          npc.race.toLowerCase().includes(normalizedSearch) ||
          npc.role.toLowerCase().includes(normalizedSearch) ||
          npc.description.toLowerCase().includes(normalizedSearch) ||
          locationName.toLowerCase().includes(normalizedSearch)
        )
      })
  }, [locations, npcs, search])

  return {
    npcs,
    search,
    setSearch,
    filteredNpcs,
    totalNpcs: npcs.length,
    isLoading,
    error,
  }
}