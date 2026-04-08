# Despliegue de la aplicación

## Introducción

El despliegue de WorldForge 5e se ha realizado separando frontend y backend, siguiendo una arquitectura típica de aplicaciones fullstack modernas.

- Frontend → Vercel
- Backend → servicio externo (Render / Railway / Fly.io)

Esto permite escalar cada parte de forma independiente.

---

## Despliegue del frontend

El frontend se ha desplegado utilizando Vercel.

### Pasos realizados

1. Crear una cuenta en Vercel
2. Conectar el repositorio de GitHub
3. Seleccionar el proyecto `worldforge-5e`
4. Configurar el proyecto como aplicación Vite
5. Ejecutar el despliegue automático

Vercel detecta automáticamente:

- `vite`
- script `build`
- carpeta de salida (`dist`)

---

## Variables de entorno

Para conectar el frontend con la API en producción, se debe definir una variable de entorno en Vercel.

Ejemplo en producción:

VITE_API_URL=https://mi-backend.onrender.com/api/v1


Esta URL corresponde al backend desplegado en producción y debe sustituirse por la URL real del servidor.

En desarrollo local se utiliza:

VITE_API_URL=http://localhost:3000/api/v1


Esta variable se utiliza en el cliente API (`src/api/client.ts`) para construir las peticiones de forma dinámica según el entorno.

---

## Despliegue del backend

El backend se puede desplegar en servicios como:

- Render
- Railway
- Fly.io

### Pasos generales

1. Crear una cuenta en el servicio elegido
2. Crear un nuevo servicio web
3. Conectar el repositorio de GitHub
4. Seleccionar la carpeta del backend (`server/`)
5. Configurar:

- Build command: `npm install`
- Start command: `npm run server`

---

## Configuración del servidor

El backend escucha en un puerto definido por la plataforma:

```ts
const PORT = process.env.PORT || 3000

Esto es necesario para que funcione correctamente en producción.

### CORS

Se ha configurado CORS en el backend para permitir peticiones desde el frontend.

En producción:

cors({
  origin: 'https://mi-frontend.vercel.app',
})

En desarrollo:

cors({
  origin: 'http://localhost:5173',
})

### Verificación

Una vez desplegado:

* el frontend debe cargar correctamente
* las peticiones a la API deben funcionar
* no deben aparecer errores de CORS
* los datos deben mostrarse en la interfaz

### Problemas encontrados

Durante el desarrollo se encontraron algunos problemas:

* errores de conexión (ERR_CONNECTION_REFUSED) cuando el backend no estaba activo
* problemas con imports en ES Modules
* configuración incorrecta de rutas en el backend

Todos estos problemas se resolvieron ajustando:

* configuración del servidor
* estructura de exportaciones
* uso de herramientas como tsx

### Mejoras futuras

* uso de base de datos en producción
* despliegue con Docker
* CI/CD automático
* variables de entorno más completas
* control de errores más avanzado

### Conclusión

El despliegue de WorldForge 5e permite ejecutar la aplicación en un entorno real, accesible desde cualquier dispositivo.

La separación entre frontend y backend facilita la escalabilidad y sienta las bases para futuras mejoras en la infraestructura.