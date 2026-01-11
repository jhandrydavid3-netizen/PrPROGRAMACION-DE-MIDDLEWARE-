import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

// Rutas
import productosRoutes from './routes/productos.routes';

// Middlewares
import { errorHandler } from './middleware/errorHandler';

// Variables de entorno
import { env } from './config/env';

// Inicializar dotenv
dotenv.config();

const app: Application = express();

// =====================
// 🔐 Middlewares globales
// =====================
app.use(express.json()); // NECESARIO para leer JSON
app.use(express.urlencoded({ extended: true })); // Para formularios
app.use(helmet()); // Seguridad
app.use(cors({
  origin: env.CORS,
  credentials: true
}));

// =====================
// 🩺 Health Check
// =====================
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    status: 'ok',
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// =====================
// 🚀 Rutas
// =====================
app.use('/api/productos', productosRoutes);

// =====================
// ❌ Middleware 404
// =====================
app.use((req: Request, res: Response) => {
  res.status(404).json({
    ok: false,
    error: 'NOT_FOUND',
    message: 'Ruta no encontrada'
  });
});

// =====================
// 🛑 Manejador de errores (¡ÚLTIMO siempre!)
// =====================
app.use(errorHandler);

// =====================
// 🔥 Inicializar servidor
// =====================
app.listen(env.PORT, () => {
  console.log(`✅ Servidor ejecutándose en puerto ${env.PORT}`);
  console.log(`📝 Documentación: http://localhost:${env.PORT}/api/productos`);
});
