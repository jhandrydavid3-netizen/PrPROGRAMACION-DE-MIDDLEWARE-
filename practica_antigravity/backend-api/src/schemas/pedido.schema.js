export const createPedidoSchema = {
    body: {
        type: 'object',
        required: ['servicioId'],
        properties: {
            servicioId: { type: 'integer' },
            notas: { type: 'string' },
        },
    },
};

export const createResenaSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer' }
        }
    },
    body: {
        type: 'object',
        required: ['calificacion'],
        properties: {
            calificacion: { type: 'integer', minimum: 1, maximum: 5 },
            comentario: { type: 'string' },
        },
    },
};
