# Idea del proyecto

## Descripción general

El proyecto consiste en el desarrollo de una aplicación web llamada **WorldForge 5e**, diseñada para ayudar a jugadores y, especialmente, al Dungeon Masters (DM) de *Dungeons & Dragons 5ª edición* a organizar y gestionar la información de sus mundos de campaña.

La aplicación permite centralizar datos como localizaciones, personajes no jugadores (NPCs), eventos históricos y generar contenido aleatorio contextualizado para enriquecer las sesiones de juego.

---

## Problema que intenta resolver

En partidas de rol como Dungeons & Dragons, los Dungeon Masters suelen gestionar una gran cantidad de información:

* Lugares del mundo (ciudades, bosques, reinos, etc.)
* NPCs con roles, historias y relaciones
* Eventos históricos relevantes
* Ideas improvisadas durante la sesión

Habitualmente, esta información se guarda en documentos desorganizados, notas dispersas o herramientas poco especializadas, lo que dificulta:

* Encontrar información rápidamente durante una sesión
* Mantener coherencia narrativa
* Improvisar contenido de forma consistente

WorldForge 5e nace para resolver este problema, ofreciendo una herramienta centralizada, visual y estructurada.

---

## Usuario objetivo

El usuario principal de la aplicación es:

* **Dungeon Masters (DMs)** de Dungeons & Dragons 5e

También puede ser útil para:

* Jugadores que quieran desarrollar su propio mundo
* Creadores de contenido narrativo o worldbuilding

El usuario tiene como objetivo principal organizar su mundo de campaña y generar contenido útil en tiempo real durante las sesiones.

---

## Funcionalidades principales

La aplicación incluye las siguientes funcionalidades clave:

### Gestión de localizaciones

* Listado de localizaciones del mundo
* Búsqueda por nombre, tipo, clima o descripción
* Creación de nuevas localizaciones mediante formulario
* Edición de localizaciones existentes
* Eliminación con confirmación narrativa (modal personalizado)
* Vista de detalle de cada localización

### Relación de datos

* Visualización de NPCs asociados a una localización
* Visualización de eventos históricos relacionados
* Navegación estructurada entre entidades del mundo

### Generadores aleatorios

* Generación de eventos, encuentros y tesoros
* Resultados enriquecidos con:

  * Localización
  * NPC implicado
  * Nivel de peligro
  * Estado (maldito o no)
  * Consecuencia o recompensa
* Generador contextual desde una localización concreta

### Dashboard

* Vista general del mundo con métricas:

  * Número de localizaciones
  * Número de NPCs
  * Número de eventos
  * Generadores disponibles

---

## Funcionalidades opcionales

Estas funcionalidades no son esenciales pero mejoran la experiencia:

* Historial de resultados generados
* Guardado de contenido generado (solo si el usuario lo desea)
* Interfaz visual mejorada con indicadores de peligro
* Mensajes narrativos personalizados (ej. al eliminar contenido)

---

## Posibles mejoras futuras

El proyecto puede evolucionar en múltiples direcciones:

### Persistencia real de datos

* Integración con base de datos (PostgreSQL, MongoDB, etc.)
* Persistencia permanente tras reiniciar el servidor

### Sistema de autenticación

* Usuarios registrados
* Mundos privados por usuario

### Relaciones más complejas

* NPCs con relaciones entre sí
* Eventos encadenados
* Facciones o grupos

### Editor avanzado

* Edición rica de texto (tipo Notion)
* Adjuntar imágenes o mapas

### Generadores más avanzados

* Generación basada en IA
* Personalización de reglas de generación

### Mejora de experiencia de usuario

* Animaciones
* Drag & drop
* Filtros avanzados

---

## Conclusión

WorldForge 5e es una herramienta orientada a mejorar la organización y creatividad en partidas de rol, proporcionando una base sólida para gestionar mundos de campaña y generar contenido dinámico.

El proyecto combina funcionalidades prácticas con una interfaz moderna y una arquitectura escalable, permitiendo futuras ampliaciones sin necesidad de rehacer la base del sistema.
