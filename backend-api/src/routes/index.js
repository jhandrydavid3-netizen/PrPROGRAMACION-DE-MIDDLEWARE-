import authRoutes from './auth.routes.js';
import servicioRoutes from './servicio.routes.js';
import pedidoRoutes from './pedido.routes.js';

export default async function routes(fastify, opts) {
    await fastify.register(authRoutes, { prefix: '/api/auth' });
    await fastify.register(servicioRoutes, { prefix: '/api/servicios' });
    await fastify.register(pedidoRoutes, { prefix: '/api/pedidos' });
}
