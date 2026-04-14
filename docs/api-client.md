# API Client

## Objetivo

Centralizar todas las llamadas a la API en una capa común (`src/api`) para evitar lógica duplicada y mantener el código organizado.

---

## Estructura

```
src/api/
├── client.ts
├── locations.ts
├── npcs.ts
└── events.ts
```

* `client.ts`: función base para peticiones HTTP
* `locations.ts`: CRUD de localizaciones
* `npcs.ts`: lectura de NPCs
* `events.ts`: eventos históricos y generadores

---

## Cliente HTTP

Se utiliza una función genérica para todas las peticiones GET:

```ts id="c1"
const API_BASE_URL = 'http://localhost:3000/api/v1'

export async function apiRequest<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}
```

---

## Tipo de respuesta

```ts id="c2"
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}
```

---

## Locations API

```ts id="c3"
export async function getLocations(): Promise<Location[]> {
  const res = await apiRequest<ApiResponse<Location[]>>('/locations')
  return res.data
}
```

```ts id="c4"
export async function createLocation(payload: CreateLocationDto) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) throw new Error('Error creating location')

  const res = await response.json()
  return res.data
}
```

---

## NPCs API

```ts id="c5"
export async function getNpcs(): Promise<Npc[]> {
  const res = await apiRequest<ApiResponse<Npc[]>>('/npcs')
  return res.data
}
```

---

## Events API

```ts id="c6"
export async function getHistoricalEvents(): Promise<HistoricalEvent[]> {
  const res = await apiRequest<ApiResponse<HistoricalEvent[]>>('/events')
  return res.data
}
```

---

## Generators API

```ts id="c7"
export async function generateEvent() {
  const res = await apiRequest<ApiResponse<GeneratorResponse>>(
    '/generators/random-event'
  )
  return res.data
}
```

---

## Generación contextual

```ts id="c8"
function buildQuery(location: string, npcs: string[]) {
  const params = new URLSearchParams()
  params.set('location', location)

  if (npcs.length) {
    params.set('npcs', npcs.join(','))
  }

  return params.toString()
}
```

---

## Integración

Las funciones de API se consumen desde hooks:

* `useLocations`
* `useNpcs`
* `useHistoricalEvents`

---

## Ventajas

* código limpio
* reutilizable
* tipado con TypeScript
* separación clara de responsabilidades
* fácil de mantener
