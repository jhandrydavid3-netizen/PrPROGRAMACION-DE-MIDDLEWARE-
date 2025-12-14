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


# TA-2.1 --- Pruebas unitarias con Jest

Se implementaron pruebas unitarias utilizando **Jest** sobre el proyecto
desarrollado en la práctica **PE-2.1**.

El objetivo principal fue validar la lógica de negocio y los esquemas de
validación, asegurando el correcto funcionamiento del código mediante
pruebas automatizadas.

## 1. Configuración de Jest

Para la configuración del entorno de pruebas se realizaron las
siguientes acciones:

-   Instalación de dependencias necesarias:

    npm install -D jest @types/jest ts-jest

-   Creación del archivo `jest.config.js` con soporte para TypeScript.

-   Adición del script `test` en el archivo `package.json`.

-   Creación de la carpeta `src/__tests__` para organizar los archivos
    de prueba.

Esta configuración permite ejecutar pruebas escritas en TypeScript y
generar reportes de cobertura de código.

## 2. Tests del Repository

Archivo implementado:

src/**tests**/producto.repository.test.ts

Se realizaron pruebas unitarias para los métodos CRUD del repositorio de
productos, incluyendo:

-   Creación de productos.
-   Listado completo de productos.
-   Filtrado por categoría.
-   Búsqueda por ID existente.
-   Manejo de IDs inexistentes.
-   Actualización de productos.
-   Eliminación de productos.

Se implementaron más de **8 pruebas**, cumpliendo con los requisitos
establecidos en la actividad.

## 3. Tests de Validación (Zod)

Archivo implementado:

src/**tests**/producto.schema.test.ts

Se realizaron pruebas sobre los esquemas de validación definidos con
**Zod**, cubriendo los siguientes casos:

-   Validación exitosa con datos correctos.
-   Rechazo de nombres demasiado cortos.
-   Rechazo de precios negativos.
-   Rechazo de categorías inválidas.
-   Validación de campos obligatorios.
-   Validación de tipos de datos incorrectos.

Se implementaron **6 pruebas de validación**, cumpliendo con el mínimo
requerido.

## 4. Ejecución de pruebas

Para ejecutar las pruebas unitarias se utilizó el siguiente comando:

npm test

Para generar el reporte de cobertura de código:

npm test -- --coverage

## 5. Reporte de cobertura

El reporte de cobertura fue generado correctamente desde la terminal.

Resultados obtenidos:

-   Statements: 100%
-   Branches: 100%
-   Functions: 100%
-   Lines: 100%

## 5. Capturas
 
![Instalación Jest](/CAPTURAS%20DEBER/image1.png)
 
![Ejecución npm test](/CAPTURAS%20DEBER/image3.png)
 
![Reporte de cobertura](/CAPTURAS%20DEBER/image2.png)



