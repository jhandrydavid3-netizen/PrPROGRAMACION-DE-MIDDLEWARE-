import path from 'node:path';
import { fileURLToPath } from 'node:url';
import AutoLoad from '@fastify/autoload';
import Cors from '@fastify/cors';
import Swagger from '@fastify/swagger';
import SwaggerUI from '@fastify/swagger-ui';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function (fastify, opts) {
    // Core Plugins
    await fastify.register(Cors, {
        origin: '*', // Adjust in production
    });

    // Swagger Documentation
    await fastify.register(Swagger, {
        swagger: {
            info: {
                title: 'API Portal de Servicios Estudiantiles',
                description: 'Documentación del API REST',
                version: '1.0.0',
            },
            host: 'localhost:3000',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
        },
    });

    await fastify.register(SwaggerUI, {
        routePrefix: '/documentation',
        uiConfig: {
            docExpansion: 'list',
            deepLinking: false,
        },
    });

    // Auto-load Plugins (Database, Utils, Auth strategies)
    await fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts),
    });

    // Register Application Routes
    await fastify.register(import('./routes/index.js'));

    // Friendly Root Route
    fastify.get('/', async (request, reply) => {
        return {
            message: 'Bienvenido al API de Servicios Estudiantiles',
            status: 'Online',
            docs: '/documentation'
        };
    });
}
