# API WorldForge 5e

## Base URL

http://localhost:3000/api/v1

---

## Estructura general de respuesta

Todas las respuestas de la API siguen una estructura común.

### Respuesta correcta

```json
{
  "success": true,
  "data": {}
}
```

### Respuesta de error

```json
{
  "success": false,
  "message": "Descripción del error"
}
```

---

## Endpoints

### GET /locations

Obtiene todas las localizaciones del mundo.

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Reino de Valoria",
      "type": "kingdom",
      "description": "Un reino próspero...",
      "climate": "templado",
      "dangerLevel": 3
    }
  ]
}
```

---

### POST /locations

Crea una nueva localización.

#### Body

```json
{
  "name": "Torre de las Mareas",
  "type": "city",
  "description": "Una torre costera mágica...",
  "climate": "marítimo",
  "dangerLevel": 6
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Torre de las Mareas",
    "type": "city",
    "description": "Una torre costera mágica...",
    "climate": "marítimo",
    "dangerLevel": 6
  }
}
```

---

### PATCH /locations/:id

Actualiza una localización.

#### Body

```json
{
  "name": "Nuevo nombre",
  "type": "city",
  "description": "Nueva descripción",
  "climate": "frío",
  "dangerLevel": 7
}
```

---

### DELETE /locations/:id

Elimina una localización.

---

### GET /npcs

Obtiene todos los NPCs.

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Arthos el Sabio",
      "race": "Humano",
      "role": "Mago",
      "locationId": "1"
    }
  ]
}
```

---

### GET /events

Obtiene eventos históricos.

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "La Gran Guerra",
      "era": "Hace 200 años",
      "locationId": "1"
    }
  ]
}
```

---

### GET /generators/random-event

Genera un evento aleatorio.

#### Response

```json
{
  "success": true,
  "data": {
    "type": "event",
    "title": "Evento arcano",
    "result": "Una tormenta mágica...",
    "location": "Bosque",
    "npc": "NPC aleatorio",
    "dangerLevel": 5,
    "cursed": false,
    "rewardOrConsequence": "Descubres un secreto oculto"
  }
}
```

---

### GET /generators/random-encounter

Genera un encuentro aleatorio.

---

### GET /generators/random-treasure

Genera un tesoro aleatorio.

---

## Códigos HTTP

* 200 OK → petición correcta
* 201 Created → recurso creado
* 400 Bad Request → datos inválidos
* 404 Not Found → recurso no encontrado
* 500 Internal Server Error → error del servidor

---

## Notas

* Arquitectura por capas: rutas, controladores, servicios
* Datos en memoria (no persistentes)
* Generadores con contexto opcional (location + npcs)
