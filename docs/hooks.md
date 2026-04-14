# Hooks de React y lógica de estado

## Introducción

En WorldForge 5e se utiliza el sistema de hooks de React para gestionar el estado, manejar efectos secundarios y organizar la lógica de datos.

Además de los hooks nativos, se han creado custom hooks para separar la lógica de la UI y mantener los componentes limpios.

---

## Hooks utilizados

### useState

Se utiliza para gestionar estado local.

Casos de uso:

* listas de datos (locations, npcs, events)
* inputs de búsqueda
* estados de carga (`isLoading`)
* errores (`error`)

Ejemplo:

```ts
const [search, setSearch] = useState('')
```

---

### useEffect

Se utiliza para ejecutar efectos secundarios, principalmente llamadas a la API al montar el componente.

Ejemplo:

```ts
useEffect(() => {
  async function loadData() {
    const data = await getLocations()
    setLocations(data)
  }

  loadData()
}, [])
```

También se puede usar una bandera (`isMounted`) para evitar actualizar estado tras desmontar el componente.

---

### useMemo

Se utiliza para optimizar cálculos como filtros de listas.

Ejemplo:

```ts
const filteredLocations = useMemo(() => {
  return locations.filter((location) =>
    location.name.toLowerCase().includes(search.toLowerCase())
  )
}, [locations, search])
```

Evita recalcular en cada render.

---

### useCallback

En este proyecto no ha sido necesario utilizar `useCallback`.

No existen funciones que se pasen como props y generen renders innecesarios.

Se podría aplicar en el futuro si la app crece en complejidad.

---

## Custom hooks

Se han creado hooks personalizados para encapsular la lógica de datos.

---

### useLocations

Responsabilidades:

* cargar localizaciones desde la API
* gestionar loading y error
* aplicar filtro de búsqueda
* devolver datos listos para UI

---

### useNpcs

Responsabilidades:

* cargar NPCs y localizaciones
* relacionarlos mediante `locationId`
* aplicar búsqueda
* devolver NPCs enriquecidos

---

### useHistoricalEvents

Responsabilidades:

* cargar eventos y localizaciones
* relacionarlos
* aplicar filtros
* gestionar estados de red

---

## Ventajas de los custom hooks

* separan lógica de UI
* evitan duplicación
* mejoran legibilidad
* facilitan mantenimiento
* permiten reutilización

Las páginas (`pages/`) solo se encargan de renderizar.

---

## Estados de red

Cada hook gestiona:

### loading

La petición está en curso.

### success

Datos cargados correctamente.

### error

Error al obtener datos.

---

## Conclusión

El uso de hooks permite una arquitectura clara y mantenible:

* hooks nativos → estado y efectos
* custom hooks → lógica de negocio

Esto facilita escalar la aplicación sin complicar los componentes.
