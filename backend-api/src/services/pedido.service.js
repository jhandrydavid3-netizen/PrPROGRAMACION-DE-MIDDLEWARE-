export class PedidoService {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async createPedido(data, clienteId) {
        // Verificar que el servicio existe
        const servicio = await this.prisma.servicio.findUnique({
            where: { id: data.servicioId },
        });

        if (!servicio) {
            throw new Error('Servicio no encontrado');
        }

        if (!servicio.activo) {
            throw new Error('El servicio no está activo');
        }

        // Un usuario NO debería poder pedirse a sí mismo (opcional)
        if (servicio.usuarioId === clienteId) {
            throw new Error('No puedes contratar tu propio servicio');
        }

        return await this.prisma.pedido.create({
            data: {
                servicioId: data.servicioId,
                clienteId: clienteId,
                montoTotal: servicio.precio, // Precio base inicial
                notas: data.notas,
                fechaPedido: new Date(),
                estado: 'PENDIENTE'
            }
        });
    }

    async addResena(pedidoId, data, clienteId) {
        const pedido = await this.prisma.pedido.findUnique({
            where: { id: pedidoId },
        });

        if (!pedido) {
            throw new Error('Pedido no encontrado');
        }

        if (pedido.clienteId !== clienteId) {
            throw new Error('No autorizado para reseñar este pedido');
        }

        // Solo permitir reseñar si está completado (o permitir si ya pasó tiempo?)
        // Por simplicidad, permitimos si existe el pedido.

        // Verificar si ya tiene reseña
        const existingResena = await this.prisma.resena.findUnique({
            where: { pedidoId },
        });

        if (existingResena) {
            throw new Error('Este pedido ya tiene una reseña');
        }

        return await this.prisma.resena.create({
            data: {
                pedidoId,
                calificacion: data.calificacion,
                comentario: data.comentario
            }
        });
    }
}
