# Rutas y navegación

## Introducción

La navegación en WorldForge 5e se gestiona mediante React Router, que permite construir una aplicación de tipo SPA (Single Page Application).

Esto significa que la navegación entre páginas se realiza sin recargar el navegador, mejorando la experiencia de usuario.

---

## Librería utilizada

Se ha utilizado:

- `react-router`

Esta librería permite:
- definir rutas
- renderizar componentes según la URL
- gestionar navegación entre vistas

---

## Configuración básica

Las rutas se definen en el componente principal de la aplicación (`App.tsx`).

Ejemplo simplificado:

```tsx
import { Routes, Route } from 'react-router'

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/locations" element={<LocationsPage />} />
  <Route path="/npcs" element={<NpcsPage />} />
  <Route path="/events" element={<EventsPage />} />
  <Route path="/generators" element={<GeneratorsPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>

## Estructura de rutas

La aplicación se organiza en las siguientes rutas principales:

/

Dashboard principal con estadísticas del mundo.

### /locations

Listado de localizaciones del mundo:

* reinos
* ciudades
* bosques
* mares
* lagos

Incluye búsqueda y filtrado.

### /npcs

Listado de NPCs:

* nombre
* raza
* rol
* localización asociada

### /events

Listado de eventos históricos:

* título
* época
* descripción
* localización

### /generators

Sección de generadores aleatorios:

* eventos
* encuentros
* tesoros

### (404)

Ruta de fallback para cualquier URL no válida.

Muestra una página de error indicando que la ruta no existe.

## Navegación

La navegación entre páginas se realiza mediante enlaces (Link) de React Router.

Ejemplo:
import { Link } from 'react-router'

<Link to="/locations">Localizaciones</Link>

Esto evita recargar la página y mantiene el estado de la aplicación.

### Ventajas del enfoque SPA
* navegación rápida sin recargas
* mejor experiencia de usuario
* menor consumo de recursos
* transición fluida entre vistas

### Separación por páginas

Cada ruta corresponde a un componente dentro de:

- src/pages/

Esto permite:

* separar responsabilidades
* mantener el código organizado
* facilitar el mantenimiento

### Integración con hooks

Cada página utiliza su propio hook para gestionar los datos:

* /locations → useLocations
* /npcs → useNpcs
* /events → useHistoricalEvents

Esto mantiene una arquitectura consistente entre rutas.

### Posibles mejoras futuras
* rutas protegidas (autenticación)
* parámetros dinámicos (/locations/:id)
* páginas de detalle
* lazy loading con React.lazy
* breadcrumbs de navegación

## Conclusión

El sistema de rutas de WorldForge 5e permite una navegación clara, rápida y organizada.

Gracias a React Router, la aplicación se comporta como una SPA moderna, con una estructura escalable que facilita la incorporación de nuevas funcionalidades en el futuro.