# Context API y estado global

## Introducción

React proporciona la Context API como una forma de compartir estado global entre componentes sin necesidad de pasar props manualmente a través de múltiples niveles (prop drilling).

Esto permite centralizar información accesible desde diferentes partes de la aplicación.

---

## Uso en este proyecto

En WorldForge 5e no se ha implementado un estado global complejo mediante Context API.

Motivos:

* los datos están separados por recursos (localizaciones, NPCs, eventos)
* cada página gestiona su propio estado con custom hooks
* no existe necesidad real de compartir estado entre vistas

---

## Alternativa utilizada

En su lugar se ha optado por:

* custom hooks (`useLocations`, `useNpcs`, `useHistoricalEvents`)
* estado local con `useState`
* carga independiente por página

Este enfoque es más simple y suficiente para el proyecto.

---

## Cuándo usar Context API

Sería útil en escenarios como:

### Usuario autenticado

* nombre
* permisos
* sesión

---

### Configuración global

* tema (dark/light)
* idioma
* preferencias

---

### Estado compartido

* localización seleccionada
* filtros persistentes
* campaña activa

---

## Estructura preparada

Se ha preparado la carpeta:

```id="ctx1"
src/context/
```

Esto permite añadir Context fácilmente en el futuro.

Ejemplo:

```ts id="ctx2"
const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}
```

---

## Ventajas

* evita prop drilling
* centraliza estado global
* mejora organización

---

## Desventajas

* puede añadir complejidad innecesaria
* puede generar renders extra
* no sustituye soluciones más avanzadas en apps grandes

---

## Decisión de diseño

Se decidió no usar Context API en esta versión para:

* mantener la aplicación simple
* evitar sobreingeniería
* centrarse en API + hooks

---

## Conclusión

Context API es útil, pero no siempre necesaria.

En este proyecto se ha priorizado un enfoque simple con hooks, dejando preparada la estructura para futuras mejoras.
