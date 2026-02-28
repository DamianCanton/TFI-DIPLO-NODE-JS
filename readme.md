# TFI Chat API

API RESTful para un clon de chat desarrollada con Node.js, Express y MongoDB.

## Tecnologias

- **Node.js** - Runtime de JavaScript
- **Express 5** - Framework web
- **MongoDB / Mongoose** - Base de datos NoSQL
- **JWT** - Autenticacion por tokens
- **bcrypt** - Encriptacion de contraseñas
- **dotenv** - Variables de entorno

## Instalacion

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Instalar dependencias
npm install

# Crear archivo .env basandose en .env.example
cp .env.example .env
# Editar .env con tus credenciales de MongoDB y una clave secreta para JWT
```

## Ejecucion

```bash
npm run dev
```

El servidor se inicia en `http://localhost:3000` (o el puerto definido en `.env`).

## Estructura del proyecto

```
src/
  main.js                    # Punto de entrada
  config/
    environment.js           # Variables de entorno
    connectionDB.js          # Conexion a MongoDB
  controllers/
    auth.controller.js       # Registro y login
    user.controller.js       # CRUD de usuarios
    chat.controller.js       # CRUD de chats
    message.controller.js    # Envio y gestion de mensajes
  helper/
    serverError.js           # Clase de error personalizada
    responseHelper.js        # Formato de respuesta estandarizado
  middlewares/
    authorizationMiddleware.js  # Validacion de JWT
    errorMiddleware.js          # Manejo global de errores
  models/
    user.model.js            # Esquema de usuario
    chat.model.js            # Esquema de chat
    message.model.js         # Esquema de mensaje
  repository/
    user.repository.js       # Acceso a datos de usuarios
    chat.repository.js       # Acceso a datos de chats
    message.repository.js    # Acceso a datos de mensajes
  routes/
    auth.router.js           # Rutas de autenticacion
    user.router.js           # Rutas de usuarios
    chat.router.js           # Rutas de chats
    message.router.js        # Rutas de mensajes (anidadas en chats)
```

## Endpoints

### Autenticacion (publicos)

| Metodo | Ruta | Descripcion | Body |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Registrar usuario | `{ name, email, password }` |
| POST | `/api/auth/login` | Iniciar sesion | `{ email, password }` |

### Usuarios (requieren token)

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | `/api/users` | Listar todos los usuarios |
| GET | `/api/users/:id` | Obtener usuario por ID |
| DELETE | `/api/users/:id` | Eliminar usuario |

### Chats (requieren token)

| Metodo | Ruta | Descripcion | Body |
|--------|------|-------------|------|
| POST | `/api/chats` | Crear un chat | `{ participants: ["userId1", "userId2"] }` |
| GET | `/api/chats` | Listar todos los chats | - |
| GET | `/api/chats/:chats_id` | Obtener chat por ID | - |

### Mensajes (requieren token)

| Metodo | Ruta | Descripcion | Body |
|--------|------|-------------|------|
| POST | `/api/chats/:chats_id/messages` | Enviar mensaje a un chat | `{ content }` |
| GET | `/api/chats/:chats_id/messages` | Obtener historial de mensajes | - |
| DELETE | `/api/chats/:chats_id/messages/:messages_id` | Eliminar un mensaje | - |

## Autenticacion

Las rutas protegidas requieren el header `Authorization` con un token JWT:

```
Authorization: Bearer <token>
```

El token se obtiene al hacer login en `/api/auth/login`.

## Formato de respuesta

Todas las respuestas siguen el formato estandarizado:

```json
{
    "success": true,
    "data": { ... },
    "message": "Descripcion del resultado"
}
```

En caso de error:

```json
{
    "success": false,
    "data": null,
    "message": "Descripcion del error"
}
```

## Variables de entorno

| Variable | Descripcion |
|----------|-------------|
| `MONGO_DB_CONNECTION_STRING` | URI de conexion a MongoDB Atlas |
| `PORT` | Puerto del servidor (default: 3000) |
| `JWT_SECRET_KEY` | Clave secreta para firmar tokens JWT |
