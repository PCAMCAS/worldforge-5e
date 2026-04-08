# Diseño y arquitectura de la aplicación

## Visión general

WorldForge 5e es una aplicación fullstack diseñada para ayudar a Dungeon Masters de Dungeons & Dragons 5e a gestionar la información de su mundo de campaña.

La aplicación permite consultar y organizar localizaciones, NPCs y eventos históricos, además de incluir generadores aleatorios para ayudar a improvisar durante las sesiones.

Desde el punto de vista técnico, el proyecto se ha construido con una separación clara entre frontend y backend:

- Frontend en React + TypeScript + Tailwind CSS
- Backend en Node.js + Express
- Comunicación mediante una API REST
- Tipado fuerte en toda la aplicación

---

## Arquitectura general

La arquitectura sigue un modelo cliente-servidor.

### Frontend
El frontend es responsable de:
- renderizar la interfaz
- gestionar navegación y rutas
- recoger interacción del usuario
- consultar la API
- mostrar estados de carga, éxito y error

### Backend
El backend es responsable de:
- exponer endpoints REST
- centralizar la lógica de negocio
- devolver datos con formato consistente
- actuar como fuente de verdad para los recursos del mundo

---

## Flujo de datos

El flujo de datos principal de la aplicación es el siguiente:

1. El usuario navega por la interfaz
2. Un componente de página utiliza un custom hook
3. El hook llama a una función del cliente API
4. La función realiza una petición HTTP al backend
5. El backend resuelve la petición a través de rutas, controladores y servicios
6. El backend devuelve una respuesta JSON tipada
7. El hook actualiza el estado
8. La UI se renderiza con los datos recibidos

Este flujo mantiene separadas las responsabilidades y facilita la escalabilidad del proyecto.

---

## Estructura del frontend

El frontend se ha organizado en carpetas según su responsabilidad:

- `src/api/`: funciones de acceso a la API
- `src/components/`: componentes reutilizables
- `src/hooks/`: hooks personalizados y lógica reutilizable
- `src/pages/`: páginas principales de la aplicación
- `src/types/`: tipos e interfaces TypeScript
- `src/context/`: reservado para estado global
- `src/utils/`: funciones auxiliares

Esta organización hace que cada parte del frontend tenga un propósito claro.

---

## Estructura del backend

El backend se ha organizado siguiendo arquitectura por capas:

- `server/src/routes/`: definición de endpoints
- `server/src/controllers/`: manejo de petición y respuesta HTTP
- `server/src/services/`: lógica de negocio
- `server/src/data/`: datos utilizados por la API
- `server/src/config/`: configuración del servidor
- `server/src/middleware/`: middleware reutilizable
- `server/src/models/`: reservado para modelos y contratos

### Responsabilidad de cada capa

#### Routes
Definen las rutas disponibles de la API y conectan cada endpoint con su controlador.

#### Controllers
Reciben la petición HTTP, llaman al servicio adecuado y devuelven la respuesta con el código correspondiente.

#### Services
Contienen la lógica de acceso y transformación de datos.

#### Data
En esta primera versión, los datos se almacenan en estructuras simples dentro del backend, actuando como fuente de verdad.

---

## Recursos principales del dominio

En la versión actual de la aplicación se han modelado tres recursos principales:

### Localizaciones
Representan lugares del mundo como reinos, bosques, lagos, mares, ciudades o poblados.

### NPCs
Representan personajes no jugadores del mundo y se asocian a una localización mediante `locationId`.

### Eventos históricos
Representan hechos relevantes del lore y también se asocian a una localización mediante `locationId`.

Además, la API incluye generadores aleatorios para:
- eventos
- encuentros
- tesoros

---

## Componentes principales

Se han definido varios componentes reutilizables para representar la información del dominio:

- `LocationCard`
- `NpcCard`
- `HistoricalEventCard`

Cada uno de ellos recibe props tipadas y se encarga únicamente de representar datos.

De esta forma:
- la lógica queda en hooks o páginas
- la presentación queda en componentes reutilizables

---

## Gestión de estado

La aplicación utiliza principalmente estado local mediante hooks de React:

- `useState` para estado de datos, búsqueda, carga y error
- `useEffect` para cargar datos desde la API
- `useMemo` para filtrar listas y evitar cálculos innecesarios

También se han creado custom hooks para encapsular la lógica de datos:

- `useLocations`
- `useNpcs`
- `useHistoricalEvents`

Esto permite reutilizar lógica y mantener las páginas más limpias.

---

## Estado global

En esta versión del proyecto no se ha necesitado un estado global complejo, ya que los datos se cargan por recurso y se consumen localmente en cada vista.

Aun así, se dejó preparada la carpeta `context/` para futuras ampliaciones, por ejemplo:
- localización seleccionada
- filtros compartidos
- preferencias globales del usuario
- estado de autenticación en versiones futuras

---

## Navegación y rutas

La aplicación utiliza React Router para gestionar la navegación entre páginas.

Las rutas principales son:

- `/` → dashboard principal
- `/locations` → listado de localizaciones
- `/npcs` → listado de NPCs
- `/events` → listado de eventos históricos
- `/generators` → generadores aleatorios
- `*` → página 404

Este esquema permite separar claramente las secciones funcionales de la aplicación.

---

## Contrato de datos

El frontend y el backend comparten un contrato de datos consistente gracias al uso de TypeScript.

Se ha definido también una respuesta genérica:

```ts
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

Esto garantiza coherencia entre capas y simplifica el consumo de la API.

## Persistencia de datos

En esta primera versión, los datos viven en el backend y no en LocalStorage. Esto permite que la API actúe como fuente de verdad, cumpliendo uno de los requisitos del ejercicio.

Aunque todavía no se ha incorporado una base de datos real, la estructura del backend está preparada para sustituir fácilmente la capa data/ por una persistencia más avanzada en el futuro.

## Decisiones de diseño más importantes

Durante el desarrollo se tomaron varias decisiones clave:

### 1. Reducir el alcance a una MVP clara

En lugar de intentar crear un gestor de campaña enorme, se priorizó una primera versión centrada en localizaciones, NPCs y eventos.

### 2. Construir el backend antes de integrar completamente el frontend

Esto permitió definir bien los contratos de datos y evitar rehacer componentes al conectar la API.

### 3. Usar custom hooks para separar lógica y presentación

La carga de datos, los errores y los filtros no están mezclados con el renderizado visual.

### 4. Mantener un diseño visual claro pero no excesivamente complejo

Se priorizó una interfaz limpia y legible, funcional para demostrar la arquitectura del proyecto.

## Posibles mejoras futuras

La arquitectura actual permitiría incorporar fácilmente:

* creación y edición de recursos mediante formularios conectados a POST y PATCH
* borrado de recursos
* autenticación de usuarios
* base de datos real
* múltiples campañas
* relaciones más complejas entre entidades
* panel de administración
* mapa interactivo
* estado global con Context API

## Conclusión

La arquitectura de WorldForge 5e se ha diseñado para ser clara, modular y escalable.

Aunque se trata de una primera versión reducida, la aplicación ya demuestra:

separación entre frontend y backend
organización por capas en el servidor
cliente de API tipado
componentes reutilizables
hooks personalizados
navegación estructurada
base técnica sólida para futuras ampliaciones

Esto permite que el proyecto no solo funcione, sino que además esté construido con una lógica de desarrollo profesional y mantenible.