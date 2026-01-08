import { AuthController } from '../controllers/auth.controller.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

export default async function authRoutes(fastify, opts) {
    const controller = new AuthController(fastify);

    fastify.post('/register', { schema: registerSchema }, (req, rep) => controller.register(req, rep));
    fastify.post('/login', { schema: loginSchema }, (req, rep) => controller.login(req, rep));

    fastify.get('/me', { onRequest: [fastify.authenticate] }, async (request, reply) => {
        return request.user;
    });
}
