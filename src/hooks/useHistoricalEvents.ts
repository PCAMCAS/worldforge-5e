import { useEffect, useMemo, useState } from 'react'
import { getHistoricalEvents } from '../api/events'
import { getLocations } from '../api/locations'
import type { HistoricalEvent } from '../types/event'
import type { Location } from '../types/location'

interface EventWithLocation {
  event: HistoricalEvent
  location?: Location
  locationName: string
}

interface UseHistoricalEventsReturn {
  events: HistoricalEvent[]
  search: string
  setSearch: (value: string) => void
  filteredEvents: EventWithLocation[]
  totalEvents: number
  isLoading: boolean
  error: string
}

export function useHistoricalEvents(): UseHistoricalEventsReturn {
  const [events, setEvents] = useState<HistoricalEvent[]>([])
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

        const [eventsData, locationsData] = await Promise.all([
          getHistoricalEvents(),
          getLocations(),
        ])

        if (isMounted) {
          setEvents(eventsData)
          setLocations(locationsData)
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'No se pudieron cargar los eventos históricos.',
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

  const filteredEvents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return events
      .map((event) => {
        const location = locations.find((item) => item.id === event.locationId)

        return {
          event,
          location,
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
  }, [events, locations, search])

  return {
    events,
    search,
    setSearch,
    filteredEvents,
    totalEvents: events.length,
    isLoading,
    error,
  }
}