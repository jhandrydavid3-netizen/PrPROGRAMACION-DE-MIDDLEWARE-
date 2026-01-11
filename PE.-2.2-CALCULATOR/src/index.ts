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
      title: 'MCP Calculator Server',
      description: `
Servidor MCP para operaciones aritméticas básicas.
Este API permite realizar operaciones de suma, resta, multiplicación y división
siguiendo buenas prácticas de diseño de APIs.
      `,
      version: '1.0.0',
      termsOfService: 'https://example.com/terms',
      contact: {
        name: 'Jhandry Becerra',
        url: 'https://github.com/jhandrydavid3-netizen',
        email: 'jhandry@example.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
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
        description: 'Operaciones aritméticas básicas del MCP Calculator'
      }
    ],

    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key',
          description:
            'Autenticación mediante API Key para prevenir uso malicioso del MCP (Tool Poisoning).'
        },
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'Autenticación mediante token JWT para control de acceso y auditoría.'
        }
      }
    },

    security: [
      { ApiKeyAuth: [] },
      { BearerAuth: [] }
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