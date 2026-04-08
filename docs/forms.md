# Formularios e interacción de usuario

## Introducción

En WorldForge 5e se han implementado formularios básicos para gestionar la interacción del usuario, principalmente enfocados en la búsqueda y filtrado de datos.

Aunque en esta versión no se han desarrollado formularios completos de creación o edición (CRUD), sí se han aplicado los principios fundamentales de formularios controlados en React.

---

## Formularios controlados

Los inputs de la aplicación se gestionan mediante componentes controlados.

Esto significa que el valor del input está sincronizado con el estado del componente mediante `useState`.

Ejemplo:

```ts
const [search, setSearch] = useState('')

<input
  type="text"
  value={search}
  onChange={(event) => setSearch(event.target.value)}
/>

Este enfoque permite:

* controlar completamente el valor del input
* reaccionar a cambios en tiempo real
* aplicar filtros dinámicos

## Uso en la aplicación

Los formularios actuales se utilizan principalmente para:

### Búsqueda de localizaciones

Permite filtrar por:

* nombre
* tipo
* clima
* descripción

### Búsqueda de NPCs

Permite filtrar por:

* nombre
* raza
* rol
* localización

### Búsqueda de eventos históricos

Permite filtrar por:

* título
* época
* descripción
* localización

### Validación

En esta versión, la validación es básica y se basa en:

* evitar búsquedas vacías (se muestran todos los resultados)
* normalización de texto (toLowerCase)
* eliminación de espacios (trim)

Esto es suficiente para el tipo de interacción implementada.

### Experiencia de usuario

Los formularios ofrecen:

* respuesta inmediata al escribir (filtrado en tiempo real)
* placeholders descriptivos
* estilos claros mediante Tailwind CSS
* integración directa con los datos cargados

Esto mejora la usabilidad y permite una exploración rápida del contenido.

### Limitaciones actuales

La aplicación no incluye aún formularios para:

* crear localizaciones
* editar NPCs
* añadir eventos históricos
* eliminar datos

Esto se debe a que el enfoque del proyecto ha sido construir una MVP centrada en consulta de datos y arquitectura fullstack.

### Posibles mejoras futuras

La arquitectura actual permitiría añadir fácilmente:

* formularios de creación (POST)
* formularios de edición (PATCH / PUT)
* validaciones avanzadas (campos obligatorios, longitud, formatos)
* mensajes de éxito y error
* modales para formularios
* librerías como React Hook Form o Formik

## Conclusión

Aunque los formularios de WorldForge 5e son simples, se han implementado correctamente siguiendo el modelo de componentes controlados de React.

Esto permite una base sólida para futuras ampliaciones donde se podrán incorporar operaciones completas de creación, edición y eliminación de datos.