import { apiRequest } from './client'
import type { ApiResponse } from '../types/api'
import type { Location, LocationType } from '../types/location'

interface CreateLocationDto {
  name: string
  type: LocationType
  description: string
  climate: string
  dangerLevel: number
}

export interface UpdateLocationDto {
  name: string
  type: LocationType
  description: string
  climate: string
  dangerLevel: number
}

const API_BASE_URL = 'http://localhost:3000/api/v1/locations'

export async function getLocations(): Promise<Location[]> {
  const response = await apiRequest<ApiResponse<Location[]>>('/locations')
  return response.data
}

export async function createLocation(
  payload: CreateLocationDto,
): Promise<Location> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const result = (await response.json()) as ApiResponse<Location>
  return result.data
}

export async function updateLocation(
  id: string,
  payload: UpdateLocationDto,
): Promise<Location> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const result = (await response.json()) as ApiResponse<Location>
  return result.data
}

export async function deleteLocation(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
}