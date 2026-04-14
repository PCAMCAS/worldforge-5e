# Testing y validación de la aplicación

## Introducción

Durante el desarrollo de WorldForge 5e se han realizado pruebas manuales para verificar el correcto funcionamiento de la aplicación tanto en el frontend como en el backend.

Aunque no se han implementado tests automatizados en esta versión, se han aplicado prácticas de validación sistemáticas para asegurar la calidad, estabilidad y coherencia del sistema.

---

## Tipos de pruebas realizadas

### 1. Pruebas de la API

Se ha validado el correcto funcionamiento de los endpoints del backend:

* GET `/locations`
* POST `/locations`
* PATCH `/locations/:id`
* DELETE `/locations/:id`
* GET `/npcs`
* GET `/events`
* GET `/generators/random-event`
* GET `/generators/random-encounter`
* GET `/generators/random-treasure`

Se comprobaron:

* códigos de estado HTTP correctos (200, 201, 400, 404)
* estructura uniforme de respuesta (`ApiResponse<T>`)
* manejo de errores en peticiones inválidas
* comportamiento ante rutas inexistentes

---

### 2. Pruebas de integración frontend–backend

Se ha verificado que el frontend consume correctamente la API:

* carga de datos en todas las páginas
* renderizado correcto de listas
* sincronización entre hooks y API
* actualización de la interfaz tras operaciones (crear, editar, eliminar)

También se validó el comportamiento cuando el backend no está disponible.

---

### 3. Pruebas de estados de red

Se han comprobado los tres estados fundamentales:

#### Loading

* se muestra un mensaje de carga durante la petición
* la interfaz evita mostrar datos incompletos

#### Success

* los datos se renderizan correctamente
* la UI refleja el estado actualizado

#### Error

* se muestra un mensaje claro al usuario
* no se rompe la interfaz

Ejemplo validado:

* backend apagado → mensaje de error visible

---

### 4. Pruebas de formularios

Se han validado las operaciones de creación y edición:

* control de inputs mediante React
* validación de campos (longitud mínima, valores numéricos, etc.)
* mensajes de error en formularios
* prevención de envío con datos inválidos

---

### 5. Pruebas de generación de contenido

Se ha comprobado el funcionamiento de los generadores:

* generación de eventos
* generación de encuentros
* generación de tesoros

Validaciones realizadas:

* respuesta correcta del backend
* renderizado del resultado en UI
* persistencia opcional mediante interacción del usuario
* manejo de errores en generación

---

### 6. Pruebas de búsqueda y filtrado

Se ha verificado:

* búsqueda por texto
* coincidencias parciales
* insensibilidad a mayúsculas/minúsculas
* comportamiento con input vacío

---

### 7. Pruebas de navegación

Se ha comprobado:

* navegación entre rutas
* funcionamiento de enlaces
* carga correcta de cada página
* redirecciones tras acciones (ej. eliminar)
* página 404 en rutas inexistentes

---

### 8. Pruebas responsive

Se ha validado la interfaz en distintos dispositivos:

* móvil
* tablet
* escritorio

Se comprobó que:

* los layouts con grid se adaptan correctamente
* el contenido es legible
* los formularios son utilizables
* los modales funcionan correctamente

---

### 9. Pruebas de experiencia de usuario

Se ha validado:

* uso de notificaciones visuales (feedback al usuario)
* confirmación antes de acciones destructivas (modal de eliminación)
* claridad en los mensajes de error
* consistencia visual en toda la aplicación

---

### 10. Pruebas de consola

Se ha verificado que:

* no existen errores en consola en condiciones normales
* los errores de red se capturan correctamente
* no hay warnings críticos

---

## Limitaciones

Actualmente no se han implementado:

* tests unitarios automatizados
* tests de integración automatizados
* tests end-to-end

Esto se debe a que el objetivo principal del proyecto ha sido diseñar y desarrollar la arquitectura fullstack.

---

## Posibles mejoras futuras

### Frontend

* React Testing Library
* tests de componentes
* tests de hooks

---

### Backend

* Jest o Vitest
* tests de endpoints
* validación de servicios

---

### End-to-end

* Cypress o Playwright
* simulación de flujos completos de usuario

---

## Conclusión

Aunque no se han implementado tests automatizados, se han realizado pruebas manuales exhaustivas que garantizan el correcto funcionamiento de la aplicación.

La arquitectura actual permite incorporar testing automatizado fácilmente en futuras versiones, lo que facilitaría la escalabilidad y el mantenimiento del proyecto.
