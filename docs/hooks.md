# Hooks de React y lógica de estado

## Introducción

En WorldForge 5e se ha utilizado el sistema de hooks de React para gestionar el estado de la aplicación, manejar efectos secundarios y optimizar el rendimiento.

Además de los hooks nativos de React, se han creado custom hooks para encapsular la lógica de acceso a datos y mantener los componentes limpios y reutilizables.

---

## Hooks utilizados

### useState

Se utiliza para gestionar el estado local de los componentes y hooks.

Ejemplos de uso:

- almacenar listas de datos (localizaciones, NPCs, eventos)
- controlar el valor de los inputs de búsqueda
- gestionar estados de carga (`isLoading`)
- almacenar errores (`error`)

Ejemplo:

```ts
const [search, setSearch] = useState('')

### useEffect

Se utiliza para ejecutar efectos secundarios, principalmente para cargar datos desde la API cuando el componente se monta.

Ejemplo:

useEffect(() => {
  async function loadData() {
    const data = await getLocations()
    setLocations(data)
  }

  loadData()
}, [])

También se utiliza una bandera isMounted para evitar actualizar el estado si el componente se desmonta antes de que termine la petición.

### useMemo

Se utiliza para optimizar cálculos que pueden ser costosos, como el filtrado de listas.

En lugar de recalcular en cada render, solo se recalcula cuando cambian las dependencias.

Ejemplo:

const filteredLocations = useMemo(() => {
  return locations.filter((location) =>
    location.name.toLowerCase().includes(search.toLowerCase()),
  )
}, [locations, search])

Esto mejora el rendimiento en listas grandes.

### useCallback

En esta versión del proyecto no ha sido necesario utilizar useCallback, ya que no existen funciones que se pasen como props a múltiples componentes generando renders innecesarios.

Sin embargo, se podría incorporar en futuras versiones para optimizar componentes más complejos.

## Custom hooks

Para separar la lógica de datos de la UI, se han creado varios hooks personalizados.

### useLocations

Responsabilidades:

* cargar localizaciones desde la API
* gestionar estado de carga y error
* aplicar filtro de búsqueda
* devolver datos listos para renderizar

useNpcs

### Responsabilidades:

* cargar NPCs y localizaciones
* combinar datos mediante locationId
* gestionar búsqueda
* devolver NPCs enriquecidos con el nombre de su localización

### useHistoricalEvents

Responsabilidades:

* cargar eventos históricos y localizaciones
* relacionar eventos con su ubicación
* aplicar filtros de búsqueda
* gestionar estados de red

### Ventajas de usar custom hooks

El uso de custom hooks aporta varias ventajas:

* separa la lógica de negocio de los componentes visuales
* evita duplicar código
* mejora la legibilidad del código
* facilita el testing
* permite reutilizar lógica en múltiples páginas

Gracias a esto, las páginas (pages/) se centran únicamente en renderizar la UI.

## Gestión de estados de red

Cada custom hook gestiona tres estados clave:

### loading

Indica que la petición está en curso.

### success

Los datos se han cargado correctamente.

### error

Ha ocurrido un problema al obtener los datos.

Este patrón mejora la experiencia de usuario y hace que la aplicación sea más robusta.

## Conclusión

El uso de hooks en WorldForge 5e permite construir una aplicación modular y mantenible.

La combinación de:

* hooks nativos (useState, useEffect, useMemo)
* custom hooks especializados

permite mantener una separación clara entre lógica y presentación, lo que facilita el crecimiento del proyecto en futuras versiones.