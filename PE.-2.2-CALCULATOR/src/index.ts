// Import the framework and instantiate it
import Fastify from 'fastify'
import { calculatorRoutes } from './routes/calculator.router';
import swagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

const fastify = Fastify({
  logger: true
})
// Swagger configuration

fastify.register(swagger, {
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

fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true
    },
  
});

const start = async () => {}
// Run the server!
try {
fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}


fastify.get('/', async (request, reply) => {
  return { message: 'MPC Server corriendo' }
})

fastify.register(calculatorRoutes);



start()