import { useMemo, useState } from 'react'
import { mockEvents } from '../data/mockEvents'
import { mockLocations } from '../data/mockLocations'
import type { HistoricalEvent } from '../types/event'

interface EventWithLocation {
  event: HistoricalEvent
  locationName: string
}

interface UseHistoricalEventsReturn {
  events: HistoricalEvent[]
  search: string
  setSearch: (value: string) => void
  filteredEvents: EventWithLocation[]
  totalEvents: number
}

export function useHistoricalEvents(): UseHistoricalEventsReturn {
  const [search, setSearch] = useState('')

  const filteredEvents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return mockEvents
      .map((event) => {
        const location = mockLocations.find((item) => item.id === event.locationId)

        return {
          event,
          locationName: location?.name ?? 'Sin localización',
        }
      })
      .filter(({ event, locationName }) => {
        if (!normalizedSearch) {
          return true
        }

        return (
          event.title.toLowerCase().includes(normalizedSearch) ||
          event.era.toLowerCase().includes(normalizedSearch) ||
          event.description.toLowerCase().includes(normalizedSearch) ||
          locationName.toLowerCase().includes(normalizedSearch)
        )
      })
  }, [search])

  return {
    events: mockEvents,
    search,
    setSearch,
    filteredEvents,
    totalEvents: mockEvents.length,
  }
}