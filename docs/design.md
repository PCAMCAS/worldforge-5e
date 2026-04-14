# Diseño y arquitectura de la aplicación

## Visión general

WorldForge 5e es una aplicación fullstack diseñada para ayudar a Dungeon Masters de Dungeons & Dragons 5e a gestionar la información de su mundo de campaña.

Permite consultar y organizar localizaciones, NPCs y eventos históricos, además de incluir generadores aleatorios para apoyar la improvisación durante las sesiones.

Tecnologías utilizadas:

* Frontend: React + TypeScript + Tailwind CSS
* Backend: Node.js + Express
* Comunicación: API REST
* Tipado fuerte en toda la aplicación

---

## Arquitectura general

La aplicación sigue un modelo cliente-servidor.

### Frontend

Responsabilidades:

* renderizar la interfaz
* gestionar navegación y rutas
* manejar la interacción del usuario
* consumir la API
* mostrar estados de carga, éxito y error

---

### Backend

Responsabilidades:

* exponer endpoints REST
* centralizar la lógica de negocio
* devolver datos con formato consistente
* actuar como fuente de verdad

---

## Flujo de datos

1. El usuario interactúa con la interfaz
2. Un componente utiliza un custom hook
3. El hook llama al cliente API
4. Se realiza una petición HTTP al backend
5. El backend procesa la solicitud (routes → controllers → services)
6. Se devuelve una respuesta JSON
7. El hook actualiza el estado
8. La UI se renderiza con los datos

Este flujo separa responsabilidades y mejora la escalabilidad.

---

## Estructura del frontend

Organización por responsabilidades:

* `src/api/` → comunicación con backend
* `src/components/` → componentes reutilizables
* `src/hooks/` → lógica reutilizable
* `src/pages/` → páginas principales
* `src/types/` → tipos TypeScript
* `src/context/` → estado global (preparado)
* `src/utils/` → utilidades

---

## Estructura del backend

Arquitectura por capas:

* `server/src/routes/` → endpoints
* `server/src/controllers/` → gestión HTTP
* `server/src/services/` → lógica de negocio
* `server/src/data/` → datos
* `server/src/config/` → configuración
* `server/src/middleware/` → middleware
* `server/src/models/` → modelos (futuro)

---

## Responsabilidad de cada capa

### Routes

Definen endpoints y conectan con controladores.

### Controllers

Gestionan request/response y códigos HTTP.

### Services

Contienen la lógica de negocio.

### Data

Almacenan los datos (mock en esta versión).

---

## Recursos del dominio

### Localizaciones

* reinos
* ciudades
* bosques
* lagos
* mares

---

### NPCs

* personajes no jugadores
* vinculados a una localización mediante `locationId`

---

### Eventos históricos

* sucesos del lore
* vinculados a localizaciones

---

### Generadores

* eventos
* encuentros
* tesoros

---

## Componentes principales

* `LocationCard`
* `NpcCard`
* `HistoricalEventCard`

Características:

* props tipadas
* sin lógica de negocio
* reutilizables

---

## Gestión de estado

Hooks utilizados:

* `useState` → estado local
* `useEffect` → carga de datos
* `useMemo` → optimización

Custom hooks:

* `useLocations`
* `useNpcs`
* `useHistoricalEvents`

Esto separa lógica y presentación.

---

## Estado global

No se ha utilizado Context API en esta versión.

Motivo:

* no hay necesidad real
* cada recurso es independiente

Preparado para futuras mejoras en `context/`.

---

## Navegación y rutas

Implementadas con React Router:

* `/` → dashboard
* `/locations` → localizaciones
* `/npcs` → NPCs
* `/events` → eventos
* `/generators` → generadores
* `*` → 404

---

## Contrato de datos

Tipo común:

```ts
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}
```

Esto garantiza coherencia entre frontend y backend.

---

## Persistencia de datos

Actualmente:

* los datos viven en el backend
* la API es la fuente de verdad

No hay base de datos real todavía, pero la arquitectura lo permite fácilmente.

---

## Decisiones clave

### MVP claro

Se priorizó simplicidad:

* localizaciones
* NPCs
* eventos

---

### Backend primero

Se definió la API antes de integrar completamente el frontend.

---

### Uso de custom hooks

Separación clara entre:

* lógica
* UI

---

### Diseño visual sencillo

Interfaz limpia y funcional.

---

## Mejoras futuras

* formularios completos (POST, PATCH)
* eliminación de recursos (ya implementado parcialmente)
* autenticación
* base de datos real
* múltiples campañas
* relaciones avanzadas
* panel admin
* mapa interactivo
* estado global
* animaciones

---

## Conclusión

WorldForge 5e presenta una arquitectura:

* modular
* escalable
* mantenible

Incluye:

* separación frontend/backend
* backend por capas
* cliente API tipado
* componentes reutilizables
* hooks personalizados
* navegación estructurada

Esto proporciona una base sólida para evolucionar el proyecto a nivel profesional.
