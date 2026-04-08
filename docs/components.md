# Componentes de la aplicación

## Introducción

En WorldForge 5e se han desarrollado componentes reutilizables para representar los distintos elementos del dominio de la aplicación.

El objetivo principal es separar la lógica de negocio de la presentación visual, permitiendo que los componentes sean simples, reutilizables y fáciles de mantener.

---

## Filosofía de diseño

Los componentes siguen estas reglas:

- reciben datos mediante props tipadas
- no contienen lógica de negocio compleja
- no realizan llamadas a la API
- se centran únicamente en renderizar información
- son reutilizables en diferentes partes de la aplicación

Esto permite mantener una arquitectura clara y escalable.

---

## Componentes principales

### LocationCard

Este componente se encarga de mostrar la información de una localización.

#### Props

- `location: Location`

#### Información mostrada

- nombre de la localización
- tipo (reino, bosque, ciudad, etc.)
- descripción
- clima
- nivel de peligro

Se utiliza principalmente en la página `/locations`.

---

### NpcCard

Este componente representa un NPC del mundo.

#### Props

- `npc: Npc`
- `location?: Location`

#### Información mostrada

- nombre del NPC
- raza
- rol
- descripción
- nombre de la localización asociada

Se utiliza en la página `/npcs`.

---

### HistoricalEventCard

Este componente muestra un evento histórico del mundo.

#### Props

- `event: HistoricalEvent`
- `location?: Location`

#### Información mostrada

- título del evento
- época
- descripción
- localización asociada

Se utiliza en la página `/events`.

---

## Componentes auxiliares

### StatCard

Utilizado en el dashboard (`HomePage`) para mostrar estadísticas rápidas:

- número de localizaciones
- número de NPCs
- número de eventos

Es un componente simple que recibe:

- `label: string`
- `value: number`

---

## Uso de composición

Aunque la aplicación es sencilla, se ha aplicado composición de componentes:

- las páginas (`pages/`) combinan múltiples componentes
- cada componente se encarga de una única responsabilidad
- los datos se preparan previamente en hooks

Esto permite construir interfaces complejas a partir de piezas pequeñas.

---

## Tipado con TypeScript

Todos los componentes utilizan props tipadas mediante interfaces.

Ejemplo:

```ts
interface NpcCardProps {
  npc: Npc
  location?: Location
}

Esto aporta:

* autocompletado en el editor
* detección temprana de errores
* mayor claridad en el contrato de datos

### Separación de responsabilidades

Se ha seguido una separación clara:

* Hooks → lógica de datos
* Componentes → renderizado
* Páginas → composición de componentes

Esto evita mezclar responsabilidades y mejora la mantenibilidad.

### Estilos

Los componentes utilizan Tailwind CSS para el diseño.

Se han aplicado:

* layouts con grid
* estilos consistentes (bordes, sombras, colores)
* diseño responsive
* uso de utilidades para mantener el código limpio

### Posibles mejoras

En futuras versiones se podrían añadir:

* componentes de formularios reutilizables
* modales para crear/editar entidades
* sistema de notificaciones
* componentes más avanzados (tablas, filtros dinámicos)
* animaciones

### Conclusión

El sistema de componentes de WorldForge 5e está diseñado para ser simple pero escalable.

Gracias a:

* props tipadas
* separación de lógica
* reutilización

la interfaz es fácil de mantener y ampliar, lo que resulta clave en aplicaciones más grandes.