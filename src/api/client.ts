const API_BASE_URL = 'http://localhost:3000/api/v1'

export async function apiRequest<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const result = (await response.json()) as T
  return result
}