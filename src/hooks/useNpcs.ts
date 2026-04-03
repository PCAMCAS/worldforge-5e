import { useMemo, useState } from 'react'
import { mockNpcs } from '../data/mockNpcs'
import { mockLocations } from '../data/mockLocations'
import type { Npc } from '../types/npc'

interface NpcWithLocation {
  npc: Npc
  locationName: string
}

interface UseNpcsReturn {
  npcs: Npc[]
  search: string
  setSearch: (value: string) => void
  filteredNpcs: NpcWithLocation[]
  totalNpcs: number
}

export function useNpcs(): UseNpcsReturn {
  const [search, setSearch] = useState('')

  const filteredNpcs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return mockNpcs
      .map((npc) => {
        const location = mockLocations.find((item) => item.id === npc.locationId)

        return {
          npc,
          locationName: location?.name ?? 'Sin localización',
        }
      })
      .filter(({ npc, locationName }) => {
        if (!normalizedSearch) return true

        return (
          npc.name.toLowerCase().includes(normalizedSearch) ||
          npc.race.toLowerCase().includes(normalizedSearch) ||
          npc.role.toLowerCase().includes(normalizedSearch) ||
          npc.description.toLowerCase().includes(normalizedSearch) ||
          locationName.toLowerCase().includes(normalizedSearch)
        )
      })
  }, [search])

  return {
    npcs: mockNpcs,
    search,
    setSearch,
    filteredNpcs,
    totalNpcs: mockNpcs.length,
  }
}