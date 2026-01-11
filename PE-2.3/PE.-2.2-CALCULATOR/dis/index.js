"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the framework and instantiate it
const fastify_1 = __importDefault(require("fastify"));
const calculator_router_1 = require("./routes/calculator.router");
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const fastify = (0, fastify_1.default)({
    logger: true
});
// Swagger configuration
fastify.register(swagger_1.default, {
    openapi: {
        info: {
            title: 'MPC para calcular operaciones basicas',
            description: 'API para operaciones aritmeticas basicas usadas en MPC',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo'
            }
        ],
        tags: [
            {
                name: 'calculator',
                description: 'Operaciones aritmeticas basicas'
            }
        ]
    }
});
fastify.register(swagger_ui_1.default, {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: true
    },
});
const start = async () => { };
// Run the server!
try {
    fastify.listen({ port: 3000 });
}
catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
fastify.get('/', async (request, reply) => {
    return { message: 'MPC Server corriendo' };
});
fastify.register(calculator_router_1.calculatorRoutes);
start();
