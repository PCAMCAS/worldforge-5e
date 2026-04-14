const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

export async function apiRequest<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`

    try {
      const errorData = await response.json()
      if (errorData?.message) {
        message = errorData.message
      }
    } catch {
      // si no hay JSON, usamos mensaje por defecto
    }

    throw new Error(message)
  }

  const result = (await response.json()) as T
  return result
}