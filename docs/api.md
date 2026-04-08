# API WorldForge 5e

## Base URL

http://localhost:3000/api/v1

---

## Estructura de respuesta

Todas las respuestas siguen este formato:

```json
{
  "success": true,
  "data": ...
}

### En caso de error:

{
  "success": false,
  "message": "Descripción del error"
}

## Endpoints

### GET /locations
Obtiene todas las localizaciones del mundo.

### Response
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

## GET /npcs
Obtiene todos los NPCs.

### Response
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Arthos el Sabio",
      "race": "Humano",
      "role": "Mago de la corte",
      "locationId": "1"
    }
  ]
}

## GET /events
Obtiene los eventos históricos.

### Response
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

## GET /generators/random-event

### Devuelve un evento aleatorio.
{
  "success": true,
  "data": {
    "type": "event",
    "result": "Una tormenta arcana..."
  }
}

## GET /generators/random-encounter

Devuelve un encuentro aleatorio.

## GET /generators/random-treasure

Devuelve un tesoro aleatorio.

## Códigos HTTP
200 OK → petición correcta
400 Bad Request → datos inválidos
404 Not Found → recurso no encontrado
500 Internal Server Error → error del servidor

