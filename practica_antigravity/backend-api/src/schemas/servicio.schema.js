export const createServicioSchema = {
    body: {
        type: 'object',
        required: ['categoriaId', 'titulo', 'descripcion', 'precio'],
        properties: {
            categoriaId: { type: 'integer' },
            titulo: { type: 'string', minLength: 5 },
            descripcion: { type: 'string', minLength: 10 },
            precio: { type: 'number' },
            tiempoEntrega: { type: 'string' },
            imagenPortada: { type: 'string' },
            contactoWhatsapp: { type: 'string' },
            contactoEmail: { type: 'string', format: 'email' },
            contactoTelefono: { type: 'string' },
        },
    },
};

export const getServiciosSchema = {
    querystring: {
        type: 'object',
        properties: {
            categoriaId: { type: 'integer' },
            search: { type: 'string' },
        },
    },
};
