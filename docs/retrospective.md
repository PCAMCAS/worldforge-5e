# Retrospectiva del proyecto

## Introducción

Durante el desarrollo de WorldForge 5e se ha construido una aplicación fullstack completa, integrando frontend con React + TypeScript y backend con Node.js + Express.

El objetivo no ha sido únicamente implementar funcionalidades, sino aplicar una arquitectura clara, mantener una organización profesional del código y comprender en profundidad la comunicación entre cliente y servidor.

Este proyecto ha servido como una aproximación real al desarrollo de aplicaciones modernas.

---

## Qué he aprendido

### Integración frontend–backend

Uno de los aprendizajes más importantes ha sido entender cómo se conecta un frontend con un backend mediante una API REST.

Se ha trabajado con:

* endpoints bien definidos
* contratos de datos consistentes
* gestión de estados de red

Esto ha permitido comprender cómo fluye la información en una aplicación real y cómo desacoplar correctamente ambas capas.

---

### Arquitectura por capas en backend

Se ha implementado una arquitectura organizada en:

* routes
* controllers
* services
* data

Esto ha facilitado:

* separar responsabilidades
* mejorar la mantenibilidad
* preparar el proyecto para escalar

---

### Uso de TypeScript

TypeScript ha sido una herramienta clave para:

* definir contratos claros entre frontend y backend
* detectar errores antes de ejecución
* mejorar la legibilidad y el mantenimiento

Su uso en ambas capas ha permitido mantener coherencia en todo el sistema.

---

### Uso de custom hooks

Se han creado hooks personalizados como:

* `useLocations`
* `useNpcs`
* `useHistoricalEvents`

Esto ha permitido:

* separar lógica de datos y presentación
* reutilizar código
* simplificar los componentes

---

### Gestión de estados de red

Se ha aprendido a gestionar correctamente:

* loading
* success
* error

Esto es esencial para construir interfaces robustas que dependen de una API.

---

### Organización del proyecto

El uso de una estructura clara tanto en frontend como en backend ha permitido:

* localizar rápidamente el código
* trabajar de forma ordenada
* evitar dependencias innecesarias

---

## Problemas encontrados

### Errores de conexión con la API

Errores como:

```text
ERR_CONNECTION_REFUSED
```

aparecían cuando el backend no estaba activo.

Esto ayudó a comprender mejor la dependencia entre frontend y backend.

---

### Problemas con módulos y TypeScript

Se encontraron errores relacionados con:

* imports incorrectos
* exportaciones mal definidas
* diferencias entre CommonJS y ES Modules

Se resolvieron ajustando configuración y utilizando herramientas como `tsx`.

---

### Sincronización de datos

El uso inicial de datos mock generó inconsistencias al integrar la API real.

Se solucionó eliminando completamente los mocks y utilizando la API como única fuente de verdad.

---

### Gestión de errores

Inicialmente no se gestionaban correctamente los errores de red.

Se solucionó implementando:

* estados de error visibles
* mensajes claros en la interfaz

---

## Uso de inteligencia artificial

La inteligencia artificial se ha utilizado como herramienta de apoyo para:

* estructurar la arquitectura
* resolver problemas técnicos
* mejorar la calidad del código
* generar documentación

Su uso ha sido guiado y consciente, sirviendo como apoyo al aprendizaje y no como sustituto del razonamiento.

---

## Decisiones clave

### Definir un MVP claro

Se priorizó una versión funcional centrada en:

* localizaciones
* NPCs
* eventos

Esto permitió evitar sobrecargar el proyecto.

---

### Priorizar arquitectura sobre complejidad

Se dio más importancia a:

* organización
* claridad
* separación de responsabilidades

en lugar de añadir funcionalidades innecesarias.

---

### Uso de la API como fuente de verdad

Se eliminó la persistencia local para asegurar:

* coherencia de datos
* alineación con el backend
* cumplimiento de requisitos del ejercicio

---

## Qué mejoraría en el futuro

Si el proyecto continuase, se podrían añadir:

* CRUD completo sin recargas
* base de datos real
* autenticación de usuarios
* múltiples campañas
* mapa interactivo
* relaciones avanzadas entre entidades
* estado global con Context API
* testing automatizado
* optimización de rendimiento

---

## Valoración personal

Este proyecto ha supuesto un salto importante en la comprensión del desarrollo fullstack.

Se ha pasado de trabajar con componentes aislados a construir un sistema completo, donde frontend y backend interactúan de forma coordinada.

Además, ha permitido entender la importancia de:

* la arquitectura
* el tipado
* la organización del código
* la gestión de errores

---

## Conclusión

WorldForge 5e no solo es una aplicación funcional, sino una base sólida construida con criterios profesionales.

El proyecto demuestra:

* integración real entre frontend y backend
* uso consistente de TypeScript
* arquitectura modular
* separación de responsabilidades
* gestión adecuada de estados de red

Más allá del resultado final, el mayor aprendizaje ha sido entender cómo diseñar y desarrollar una aplicación mantenible, escalable y preparada para evolucionar.
