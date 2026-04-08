# API Client y contrato de tipos

## Objetivo

El frontend de WorldForge 5e no consume los datos directamente desde componentes sueltos, sino a través de una pequeña capa de red organizada en la carpeta `src/api/`.

El objetivo de esta capa es centralizar las peticiones HTTP, tipar correctamente las respuestas y evitar lógica duplicada en los componentes o hooks.

De esta forma, la aplicación es más mantenible, más escalable y más fácil de depurar.

---

## Estructura utilizada

La carpeta `src/api/` se ha organizado de la siguiente manera:

- `client.ts`: función base para realizar peticiones HTTP
- `locations.ts`: funciones relacionadas con localizaciones
- `npcs.ts`: funciones relacionadas con NPCs
- `events.ts`: funciones relacionadas con eventos históricos

Esta separación permite mantener una organización clara por recurso.

---

## Cliente base

El archivo `client.ts` contiene una función genérica llamada `apiRequest`, que recibe un endpoint y realiza una petición con `fetch`.

Esta función:
- compone la URL base de la API
- ejecuta la petición
- comprueba si la respuesta es correcta
- lanza un error si el servidor responde con error
- devuelve el JSON tipado

Ejemplo simplificado:

```ts
const API_BASE_URL = 'http://localhost:3000/api/v1'

export async function apiRequest<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const result = (await response.json()) as T
  return result
}

Este enfoque evita repetir la misma lógica en cada archivo de API.

## Contrato de respuesta

Para mantener coherencia entre frontend y backend, se definió un tipo común de respuesta:

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

Este tipo permite modelar las respuestas del backend de forma uniforme.

Por ejemplo:

ApiResponse<Location[]>
ApiResponse<Npc[]>
ApiResponse<HistoricalEvent[]>

Así, TypeScript conoce exactamente qué estructura debe esperar en cada petición.

## Tipos principales utilizados

Se han definido tipos específicos para cada recurso del dominio de la aplicación:

### Location

Representa una localización del mundo:

* id
* name
* type
* description
* climate
* dangerLevel
* createdAt
* updatedAt

### Npc

Representa un personaje no jugador:

* id
* name
* race
* role
* description
* locationId

### HistoricalEvent

Representa un evento histórico del mundo:

* id
* title
* era
* description
* locationId

Estos tipos se reutilizan tanto en componentes como en hooks y funciones de API.

## Funciones de acceso a datos

Se han creado funciones específicas para cada recurso.

### Localizaciones

export async function getLocations(): Promise<Location[]> {
  const response = await apiRequest<ApiResponse<Location[]>>('/locations')
  return response.data
}

### NPCs

export async function getNpcs(): Promise<Npc[]> {
  const response = await apiRequest<ApiResponse<Npc[]>>('/npcs')
  return response.data
}

### Eventos históricos

export async function getHistoricalEvents(): Promise<HistoricalEvent[]> {
  const response = await apiRequest<ApiResponse<HistoricalEvent[]>>('/events')
  return response.data
}

Estas funciones encapsulan completamente la comunicación con el backend y devuelven directamente los datos ya tipados.

## Integración con hooks

En lugar de llamar a la API directamente desde los componentes de página, se decidió encapsular la lógica en custom hooks:

* useLocations
* useNpcs
* useHistoricalEvents

Cada hook se encarga de:

* lanzar la petición al montar el componente
* almacenar los datos obtenidos
* gestionar el estado de carga
* gestionar posibles errores
* aplicar búsquedas o filtros en memoria

Esto mantiene los componentes más limpios y separados de la lógica de datos.

## Estados de red

La interfaz gestiona los tres estados básicos de una petición HTTP:

### Carga (loading)

Mientras se realiza la petición, la página muestra un bloque informativo indicando que los datos se están cargando.

### Éxito (success)

Si la petición se resuelve correctamente, la información se muestra en pantalla con normalidad.

### Error (error)

Si ocurre un problema, se captura la excepción y se muestra un mensaje de error visible para el usuario.

Esto mejora la experiencia de uso y hace que la interfaz sea más robusta frente a fallos del backend o problemas de conexión.

## Ventajas de esta arquitectura

Este enfoque aporta varias ventajas:

* separa claramente la UI de la lógica de red
* evita duplicar llamadas HTTP
* facilita el mantenimiento
* mejora la legibilidad del código
* aprovecha el tipado fuerte de TypeScript
* hace más sencilla la ampliación futura de la API

Además, permite evolucionar la aplicación con nuevos endpoints sin necesidad de reestructurar el frontend completo.

## Conclusión

La capa de red de WorldForge 5e se ha diseñado para ser sencilla pero sólida.

Aunque el proyecto utiliza una API pequeña, la organización elegida ya sigue un patrón profesional:

* cliente HTTP reutilizable
* contratos de tipos compartidos
* funciones por recurso
* integración mediante custom hooks
* gestión explícita de carga y error

Esta estructura facilita la comunicación entre frontend y backend y sirve como base para seguir ampliando la aplicación en versiones futuras.