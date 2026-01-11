# API Calculator – Documentación
## 1. Operación: Suma (add)
![add](/CAPTURAS/add.png)

## 2. Operación: Resta (subtract)
![substract](/CAPTURAS/substract.png)

## 3. Operación: Multiplicación (multiply)
![multiply](/CAPTURAS/multiply.png)

## 4. Operación: División (divide)
![divide](/CAPTURAS/divide.png)

# API Calculator – D (TA-2.2)

## Resumen de la actividad

## Cambios realizados en `index.ts`

- Se enriqueció la sección **info** de OpenAPI:
  - Título, descripción detallada del servidor MCP
  - Información de contacto
  - Licencia MIT
  - Terms of Service
  - Versión semántica `1.0.0`
- Se configuró Swagger UI correctamente en:
  - `http://localhost:3000/docs`
- Se documentaron esquemas de seguridad:
  - **API Key** (`x-api-key`)
  - **Bearer Token (JWT)**
- Se dejó la seguridad documentada a nivel global (solo documental, no implementada).

## Cambios realizados en `calculator.router.ts`

- Se documentó el endpoint:
  - `POST /tools/calculator`
- Se agregaron ejemplos de request para:
  - Suma
  - Resta
  - Multiplicación
  - División
  - División por cero
- Se documentaron respuestas:
  - **200**: resultado exitoso
  - **400**: error de validación / división por cero
  - **500**: error interno del servidor
- Todos los ejemplos son visibles directamente en Swagger UI.


## Capturas de Swagger UI

### Vista general de Swagger UI
![Swagger Home](/PE.-2.2-CALCULATOR/CAPTURAS/Screenshot%202025-12-16%20215038.png)

### Endpoint documentado con ejemplos
![Endpoint Calculator](/PE.-2.2-CALCULATOR/CAPTURAS/Screenshot%202025-12-16%20215152.png)

### Esquemas de seguridad documentados
![Security Schemes](/PE.-2.2-CALCULATOR/CAPTURAS/Screenshot%202025-12-16%20215213.png)

### Respuestas documentadas (200, 400, 500)
![Responses](/PE.-2.2-CALCULATOR/CAPTURAS/Screenshot%202025-12-16%20215249.png)

