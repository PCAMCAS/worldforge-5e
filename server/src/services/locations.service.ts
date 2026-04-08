import { historicalEvents } from '../data/events.data.ts'
import { locations } from '../data/locations.data.ts'
import { npcs } from '../data/npcs.data.ts'
import type { Location, LocationType } from '../data/locations.data.ts'

interface CreateLocationInput {
  name: string
  type: LocationType
  description: string
  climate: string
  dangerLevel: number
}

interface UpdateLocationInput {
  name: string
  type: LocationType
  description: string
  climate: string
  dangerLevel: number
}

export function getAllLocations() {
  return locations
}

export function createLocation(input: CreateLocationInput): Location {
  const now = new Date().toISOString()

  const newLocation: Location = {
    id: crypto.randomUUID(),
    name: input.name,
    type: input.type,
    description: input.description,
    climate: input.climate,
    dangerLevel: input.dangerLevel,
    createdAt: now,
    updatedAt: now,
  }

  locations.push(newLocation)

  return newLocation
}

export function updateLocation(
  id: string,
  input: UpdateLocationInput,
): Location | null {
  const location = locations.find((item) => item.id === id)

  if (!location) {
    return null
  }

  location.name = input.name
  location.type = input.type
  location.description = input.description
  location.climate = input.climate
  location.dangerLevel = input.dangerLevel
  location.updatedAt = new Date().toISOString()

  return location
}

export function deleteLocation(id: string): boolean {
  const locationIndex = locations.findIndex((item) => item.id === id)

  if (locationIndex === -1) {
    return false
  }

  locations.splice(locationIndex, 1)

  for (let index = npcs.length - 1; index >= 0; index -= 1) {
    if (npcs[index].locationId === id) {
      npcs.splice(index, 1)
    }
  }

  for (let index = historicalEvents.length - 1; index >= 0; index -= 1) {
    if (historicalEvents[index].locationId === id) {
      historicalEvents.splice(index, 1)
    }
  }

  return true
}