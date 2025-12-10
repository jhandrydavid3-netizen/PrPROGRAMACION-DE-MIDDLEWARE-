# API Marketplace Agrícola – Gestión de Productos

## 1. Descripción General
Esta API permite registrar, consultar, actualizar y eliminar productos agrícolas mediante un CRUD desarrollado con Node.js, Express y TypeScript. Los datos se validan con Zod y se almacenan en memoria durante la ejecución del servidor. Incluye manejo centralizado de errores, filtros, paginación y una estructura organizada del proyecto.

## 2. Requisitos Previos
- Node.js 18 o superior
- npm
- Cliente REST (Thunder Client )

## 3. Instalación y Ejecución

Instalar dependencias:
```
npm install
```

Ejecutar servidor:
```
npm run dev
```

El servidor se ejecuta en:
```
http://localhost:3000
```

## 4. Estructura del Proyecto
```
src/
│── config/
│── middleware/
│── routes/
│── schemas/
│── types/
│── index.ts
```

## 5. Archivo Principal (index.ts)
Configura Express, middlewares globales, la ruta /health, las rutas de productos y el manejador global de errores. Es el punto de entrada de la API.

## 6. Validaciones (schemas/)
Las validaciones están definidas con Zod y garantizan que cada producto cumpla los requisitos establecidos.

## 7. Tipos de Datos (types/)
Define la interfaz Producto y las categorías permitidas.

## 8. CRUD de Productos (routes/productos.routes.ts)
Rutas implementadas:

| Método | Ruta | Descripción |
|--------|--------------------------|------------------------------|
| POST | /api/productos | Crear producto |
| GET | /api/productos | Listar productos |
| GET | /api/productos/:id | Obtener producto por ID |
| PUT | /api/productos/:id | Actualizar |
| DELETE | /api/productos/:id | Eliminar |

Soporta filtros:
?categoria=  
?productor=  
?pagina=  
?limite=

## 9. Ejemplos de Uso

### Crear producto (POST)
```
{
  "nombre": "Manzana Roja",
  "descripcion": "Manzanas frescas",
  "categoria": "frutas",
  "precioUnitario": 2.50,
  "unidadMedida": "kg",
  "stockDisponible": 40,
  "certificacionOrganica": true,
  "productor": "Jhandry Becerra"
}
```

### Obtener todos los productos (GET)
```
GET /api/productos
```

### Obtener por ID
```
GET /api/productos/:id
```

### Actualizar (PUT)
```
PUT /api/productos/:id
```

### Eliminar (DELETE)
```
DELETE /api/productos/:id
```

## 10. Manejo de Errores
El manejador centralizado devuelve mensajes claros como:
```
{
  "ok": false,
  "error": "NOT_FOUND",
  "message": "Producto no encontrado"
}
```

## 11. Estado del Proyecto
El sistema funciona completamente con almacenamiento en memoria. Está preparado para integrarse con una base de datos real en el futuro.

## 12. Autor
Jhandry Becerra
