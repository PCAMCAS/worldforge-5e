import { apiRequest } from './client'
import type { ApiResponse } from '../types/api'
import type { HistoricalEvent } from '../types/event'

export interface GeneratorResponse {
  type: 'event' | 'encounter' | 'treasure'
  title: string
  result: string
  location: string
  npc: string
  dangerLevel: number
  cursed: boolean
  rewardOrConsequence: string
}

export async function getHistoricalEvents(): Promise<HistoricalEvent[]> {
  const response = await apiRequest<ApiResponse<HistoricalEvent[]>>('/events')
  return response.data
}

export async function generateEvent(): Promise<GeneratorResponse> {
  const response = await apiRequest<ApiResponse<GeneratorResponse>>(
    '/generators/random-event',
  )
  return response.data
}

export async function generateEncounter(): Promise<GeneratorResponse> {
  const response = await apiRequest<ApiResponse<GeneratorResponse>>(
    '/generators/random-encounter',
  )
  return response.data
}

export async function generateTreasure(): Promise<GeneratorResponse> {
  const response = await apiRequest<ApiResponse<GeneratorResponse>>(
    '/generators/random-treasure',
  )
  return response.data
}

function buildContextQuery(location: string, npcNames: string[]) {
  const params = new URLSearchParams()

  params.set('location', location)

  if (npcNames.length > 0) {
    params.set('npcs', npcNames.join(','))
  }

  return params.toString()
}

export async function generateEventForLocation(
  location: string,
  npcNames: string[],
): Promise<GeneratorResponse> {
  const query = buildContextQuery(location, npcNames)

  const response = await apiRequest<ApiResponse<GeneratorResponse>>(
    `/generators/random-event?${query}`,
  )

  return response.data
}

export async function generateEncounterForLocation(
  location: string,
  npcNames: string[],
): Promise<GeneratorResponse> {
  const query = buildContextQuery(location, npcNames)

  const response = await apiRequest<ApiResponse<GeneratorResponse>>(
    `/generators/random-encounter?${query}`,
  )

  return response.data
}

export async function generateTreasureForLocation(
  location: string,
  npcNames: string[],
): Promise<GeneratorResponse> {
  const query = buildContextQuery(location, npcNames)

  const response = await apiRequest<ApiResponse<GeneratorResponse>>(
    `/generators/random-treasure?${query}`,
  )

  return response.data
}