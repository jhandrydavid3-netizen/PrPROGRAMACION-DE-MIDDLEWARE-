// src/config/database.ts
import { Sequelize } from 'sequelize';
import { env } from './env';

// Configuración de la conexión a la base de datos
export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false  // Desactiva los logs de SQL (cámbialo a true o a una función si necesitas verlos)
});

// Función para probar la conexión
export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('❌ No se pudo conectar a la base de datos:', error);
    }
};