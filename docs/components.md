# Componentes de la aplicación

## Introducción

En WorldForge 5e se utilizan componentes reutilizables para representar los distintos elementos del dominio.

El objetivo es separar la lógica de negocio de la presentación, manteniendo componentes simples, reutilizables y fáciles de mantener.

---

## Filosofía de diseño

Los componentes siguen estas reglas:

* reciben datos mediante props tipadas
* no contienen lógica de negocio compleja
* no realizan llamadas a la API
* se centran en renderizar información
* son reutilizables

Esto permite una arquitectura clara y escalable.

---

## Componentes principales

### LocationCard

Muestra la información de una localización.

Props:

* `location: Location`

Muestra:

* nombre
* tipo
* descripción
* clima
* nivel de peligro

Uso: `/locations`

---

### NpcCard

Representa un NPC.

Props:

* `npc: Npc`
* `location?: Location`

Muestra:

* nombre
* raza
* rol
* descripción
* localización

Uso: `/npcs`

---

### HistoricalEventCard

Muestra un evento histórico.

Props:

* `event: HistoricalEvent`
* `location?: Location`

Muestra:

* título
* época
* descripción
* localización

Uso: `/events`

---

## Componentes auxiliares

### StatCard

Usado en el dashboard (`HomePage`).

Props:

* `label: string`
* `value: number`

Muestra estadísticas como:

* localizaciones
* NPCs
* eventos

---

## Composición de componentes

Se utiliza composición:

* las páginas combinan múltiples componentes
* cada componente tiene una única responsabilidad
* los datos vienen preparados desde hooks

Esto permite construir interfaces complejas a partir de piezas simples.

---

## Tipado con TypeScript

Todos los componentes usan props tipadas.

Ejemplo:

```ts id="z1k3n2"
interface NpcCardProps {
  npc: Npc
  location?: Location
}
```

Ventajas:

* autocompletado
* detección de errores
* contratos claros

---

## Separación de responsabilidades

* Hooks → lógica de datos
* Componentes → renderizado
* Pages → composición

Esto evita mezclar responsabilidades.

---

## Estilos

Se utiliza Tailwind CSS:

* layouts con grid
* estilos consistentes
* diseño responsive
* clases utilitarias

---

## Posibles mejoras

* formularios reutilizables
* modales
* sistema de notificaciones
* componentes más complejos (tablas, filtros)
* animaciones

---

## Conclusión

El sistema de componentes es simple pero escalable.

Gracias a:

* props tipadas
* separación de lógica
* reutilización

la interfaz es fácil de mantener y ampliar.
