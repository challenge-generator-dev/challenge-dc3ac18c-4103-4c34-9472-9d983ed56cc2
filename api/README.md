# Inventory API

API para gestión de inventario con operaciones CRUD en SQL y NoSQL

## Requisitos Previos

- Node.js 22.x
- npm 10.x
- PostgreSQL (base de datos SQL)
- MongoDB (base de datos NoSQL)

## Configuración

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno en `.env`:
```env
# Base de datos SQL (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=inventory

# Base de datos NoSQL (MongoDB)
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_DATABASE=inventory

# Puerto de la aplicación
APP_PORT=3000
```

## Ejecución

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start
```

## Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con coverage
npm run test:cov

# Ejecutar pruebas en modo watch
npm run test:watch
```

## Endpoints de la API

La API expone los siguientes endpoints para la gestión de productos:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /products | Crear un nuevo producto |
| GET | /products | Listar todos los productos |
| GET | /products/:id | Obtener un producto por ID |
| PUT | /products/:id | Actualizar un producto |
| DELETE | /products/:id | Eliminar un producto |

## Documentación Swagger

Una vez iniciada la aplicación, la documentación Swagger está disponible en:
```
http://localhost:3000/api
```

## Arquitectura

El proyecto sigue una arquitectura en capas:

- **Dominio** (`src/domain/`): Entidades y reglas de negocio
- **Aplicación** (`src/application/`): Servicios y casos de uso
- **Infraestructura** (`src/infrastructure/`): Controladores, repositorios y configuración

## Tecnologías

- NestJS 11
- TypeORM
- Mongoose
- PostgreSQL
- MongoDB
- Jest para pruebas