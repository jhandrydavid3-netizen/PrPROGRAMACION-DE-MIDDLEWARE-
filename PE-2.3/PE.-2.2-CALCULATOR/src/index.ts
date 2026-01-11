// Import the framework and instantiate it
import Fastify from 'fastify'
import { calculatorRoutes } from './routes/calculator.router.js'
import swagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import cookie from '@fastify/cookie'
import helmet from '@fastify/helmet'
import oauthPlugin, { OAuth2Namespace } from '@fastify/oauth2';
import jwt from '@fastify/jwt'



declare module 'fastify' {
  interface FastifyInstance {
    auth0OAuth2: OAuth2Namespace;
    authenticate: (request: any, reply: any) => Promise<void>;
  }
}


if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_CLIENT_ID) {
  console.error("ERROR CRÍTICO: Variables de entorno faltantes.");
  console.error("Asegúrate de tener el archivo .env y de ejecutar con: node --env-file=.env ... o usar 'dotenv'");
  process.exit(1);
}


const fastify = Fastify({
  logger: true
})

const port = 3000

// Cookie
fastify.register(cookie, {
  secret: process.env.COOKIE_SECRET,
  parseOptions: {}
})

// Helmet
fastify.register(helmet, {
  contentSecurityPolicy: {
    directives: {
      default: ["'self'"]
    }
  }
})

fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'supersecret'
})

// 5. Configurar Auth0 OAuth2
fastify.register(oauthPlugin, {
  name: 'auth0OAuth2',
  scope: ['openid', 'profile', 'email'],
  credentials: {
    client: {
      id: process.env.AUTH0_CLIENT_ID || '',
      secret: process.env.AUTH0_CLIENT_SECRET || ''
    },
    auth: {
      tokenHost: `https://${process.env.AUTH0_DOMAIN}`,
      tokenPath: '/oauth/token',
      authorizePath: '/authorize'
    }
  },
  startRedirectPath: '/login',
  callbackUri: 'http://localhost:3000/login/callback'
});

// Swagger
fastify.register(swagger, {
  openapi: {
    info: {
      title: 'MPC para calcular operaciones básicas',
      description: 'API para operaciones aritméticas básicas usadas en MPC',
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
        description: 'Operaciones aritméticas básicas'
      }
    ]
  }
})

fastify.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true
  }
})



// Decorador de autenticación
fastify.decorate('authenticate', async (request: any, reply: any) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Token JWT inválido o no proporcionado. Por favor, autentícate en /login'
    });
  }
});

// Rutas
fastify.get('/', async () => {
  return { message: 'MPC Server corriendo' }
})

fastify.get('/login/callback', async (request, reply) => {
  const token = await fastify.auth0OAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

  // Firmamos nuestro propio JWT
  const jwtToken = fastify.jwt.sign({
    sub: token.token.access_token.substring(0, 10),
    iat: Math.floor(Date.now() / 1000),
  });

  return {
    message: 'Autenticación exitosa. Usa este token en el Header Authorization.',
    jwt_token: jwtToken
  };
});

fastify.register(calculatorRoutes)

// Server
try {
  fastify.listen({ port })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
