# Context API y estado global

## Introducción

React proporciona la Context API como una forma de compartir estado global entre componentes sin necesidad de pasar props manualmente a través de múltiples niveles (prop drilling).

En aplicaciones grandes, esto permite centralizar información que debe ser accesible desde diferentes partes de la interfaz.

---

## Uso en este proyecto

En la versión actual de WorldForge 5e no se ha implementado un estado global complejo mediante Context API.

Esto se debe a que:

- los datos están claramente separados por recursos (localizaciones, NPCs, eventos)
- cada página gestiona su propio estado mediante custom hooks
- no existe una necesidad real de compartir estado entre múltiples vistas

---

## Alternativa utilizada

En lugar de Context API, se ha optado por:

- custom hooks (`useLocations`, `useNpcs`, `useHistoricalEvents`)
- estado local con `useState`
- carga de datos independiente por página

Este enfoque es más simple y suficiente para el alcance actual del proyecto.

---

## Cuándo sería útil usar Context

Aunque no se ha utilizado en esta versión, la Context API sería útil en escenarios como:

### 1. Usuario autenticado
Compartir información del usuario en toda la aplicación:
- nombre
- permisos
- sesión

---

### 2. Configuración global
Por ejemplo:
- tema (dark/light)
- idioma
- preferencias del usuario

---

### 3. Estado compartido entre páginas
Por ejemplo:
- localización seleccionada globalmente
- filtros persistentes
- campaña activa

---

## Estructura preparada

Aunque no se ha implementado, se ha preparado la carpeta:

src/context/


Esto permite añadir fácilmente un contexto en el futuro sin reorganizar el proyecto.

Ejemplo de posible implementación:

```ts
const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

### Ventajas de Context API
* evita prop drilling
* centraliza estado global
* mejora la organización en apps grandes

### Desventajas
* puede complicar la arquitectura si se usa en exceso
* puede generar renders innecesarios si no se optimiza bien
* no sustituye a soluciones más avanzadas en apps muy grandes

### Decisión de diseño

Se decidió no usar Context API en esta primera versión para:

* mantener la aplicación simple
* evitar complejidad innecesaria
* centrarse en la arquitectura API + hooks

Esta decisión permite construir una base sólida sin sobreingeniería.

### Conclusión

Aunque Context API es una herramienta potente, no siempre es necesaria.

En WorldForge 5e se ha priorizado un enfoque más simple basado en hooks locales, dejando preparada la estructura para introducir estado global en futuras versiones si el proyecto lo requiere.