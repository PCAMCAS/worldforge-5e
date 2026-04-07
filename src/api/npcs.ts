import { apiRequest } from './client'
import type { ApiResponse } from '../types/api'
import type { Npc } from '../types/npc'

export async function getNpcs(): Promise<Npc[]> {
  const response = await apiRequest<ApiResponse<Npc[]>>('/npcs')
  return response.data
}