import { apiRequest } from './client'
import type { ApiResponse } from '../types/api'
import type { HistoricalEvent } from '../types/event'

export async function getHistoricalEvents(): Promise<HistoricalEvent[]> {
  const response = await apiRequest<ApiResponse<HistoricalEvent[]>>('/events')
  return response.data
}