import { crearProductoSchema } from '../schemas/producto.schemas';

describe('Validación de esquema Producto (Zod)', () => {

  const productoValido = {
    nombre: 'Manzana Roja',
    descripcion: 'Manzanas frescas',
    categoria: 'frutas',
    precioUnitario: 2.5,
    unidadMedida: 'kg',
    stockDisponible: 50,
    certificacionOrganica: true,
    productor: 'Jhandry Becerra'
  };

  test('Debe validar correctamente un producto válido', () => {
    const result = crearProductoSchema.safeParse(productoValido);
    expect(result.success).toBe(true);
  });

  test('Debe fallar si el nombre es muy corto', () => {
    const result = crearProductoSchema.safeParse({
      ...productoValido,
      nombre: 'A'
    });
    expect(result.success).toBe(false);
  });

  test('Debe fallar si el precio es negativo', () => {
    const result = crearProductoSchema.safeParse({
      ...productoValido,
      precioUnitario: -5
    });
    expect(result.success).toBe(false);
  });

  test('Debe fallar si la categoría es inválida', () => {
    const result = crearProductoSchema.safeParse({
      ...productoValido,
      categoria: 'electronica'
    });
    expect(result.success).toBe(false);
  });

  test('Debe fallar si falta un campo obligatorio', () => {
    const { nombre, ...sinNombre } = productoValido;
    const result = crearProductoSchema.safeParse(sinNombre);
    expect(result.success).toBe(false);
  });

  test('Debe fallar si el tipo de dato es incorrecto', () => {
    const result = crearProductoSchema.safeParse({
      ...productoValido,
      stockDisponible: 'mucho'
    });
    expect(result.success).toBe(false);
  });

});
