import { apiRequest } from './client'
import type { ApiResponse } from '../types/api'
import type { Location } from '../types/location'

export async function getLocations(): Promise<Location[]> {
  const response = await apiRequest<ApiResponse<Location[]>>('/locations')
  return response.data
}