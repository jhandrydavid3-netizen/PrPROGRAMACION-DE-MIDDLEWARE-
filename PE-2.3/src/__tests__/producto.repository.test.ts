import { v4 as uuidv4 } from 'uuid';
import { Producto } from '../types/producto.types';

describe('Producto Repository (in-memory)', () => {
  let productos: Producto[];

  beforeEach(() => {
    productos = [];
  });

  const create = (data: Omit<Producto, 'id' | 'creadoEn'>): Producto => {
    const nuevo: Producto = {
      id: uuidv4(),
      ...data,
      creadoEn: new Date().toISOString()
    };
    productos.push(nuevo);
    return nuevo;
  };

  const findAll = (categoria?: string): Producto[] => {
    if (categoria) {
      return productos.filter(p => p.categoria === categoria);
    }
    return productos;
  };

  const findById = (id: string): Producto | undefined => {
    return productos.find(p => p.id === id);
  };

  const update = (id: string, data: Partial<Producto>): Producto | null => {
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) return null;

    productos[index] = {
      ...productos[index],
      ...data,
      actualizadoEn: new Date().toISOString()
    };

    return productos[index];
  };

  const remove = (id: string): boolean => {
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) return false;

    productos.splice(index, 1);
    return true;
  };

  // =========================
  // TESTS
  // =========================

  test('create(): debe crear un producto con ID', () => {
    const producto = create({
      nombre: 'Manzana',
      descripcion: 'Manzana roja',
      categoria: 'frutas',
      precioUnitario: 1.5,
      unidadMedida: 'kg',
      stockDisponible: 10,
      certificacionOrganica: false,
      productor: 'Jhandry Becerra'
    });

    expect(producto.id).toBeDefined();
    expect(productos.length).toBe(1);
  });

  test('findAll(): debe retornar todos los productos', () => {
    create({
      nombre: 'Manzana',
      descripcion: 'Manzana roja',
      categoria: 'frutas',
      precioUnitario: 1.5,
      unidadMedida: 'kg',
      stockDisponible: 10,
      certificacionOrganica: false,
      productor: 'Jhandry Becerra'
    });

    expect(findAll().length).toBe(1);
  });

  test('findAll(): debe filtrar por categoría', () => {
    create({
      nombre: 'Manzana',
      descripcion: 'Manzana roja',
      categoria: 'frutas',
      precioUnitario: 1.5,
      unidadMedida: 'kg',
      stockDisponible: 10,
      certificacionOrganica: false,
      productor: 'Jhandry Becerra'
    });

    create({
      nombre: 'Lechuga',
      descripcion: 'Lechuga verde',
      categoria: 'verduras',
      precioUnitario: 0.8,
      unidadMedida: 'unidad',
      stockDisponible: 20,
      certificacionOrganica: true,
      productor: 'Jhandry Becerra'
    });

    expect(findAll('frutas').length).toBe(1);
  });

  test('findById(): debe encontrar un producto existente', () => {
    const producto = create({
      nombre: 'Manzana',
      descripcion: 'Manzana roja',
      categoria: 'frutas',
      precioUnitario: 1.5,
      unidadMedida: 'kg',
      stockDisponible: 10,
      certificacionOrganica: false,
      productor: 'Jhandry Becerra'
    });

    const encontrado = findById(producto.id);
    expect(encontrado).toBeDefined();
  });

  test('findById(): debe retornar undefined si no existe', () => {
    expect(findById('no-existe')).toBeUndefined();
  });

  test('update(): debe actualizar un producto existente', () => {
    const producto = create({
      nombre: 'Manzana',
      descripcion: 'Manzana roja',
      categoria: 'frutas',
      precioUnitario: 1.5,
      unidadMedida: 'kg',
      stockDisponible: 10,
      certificacionOrganica: false,
      productor: 'Jhandry Becerra'
    });

    const actualizado = update(producto.id, { stockDisponible: 50 });
    expect(actualizado?.stockDisponible).toBe(50);
  });

  test('update(): debe retornar null si el producto no existe', () => {
    expect(update('no-existe', { stockDisponible: 5 })).toBeNull();
  });

  test('delete(): debe eliminar un producto existente', () => {
    const producto = create({
      nombre: 'Manzana',
      descripcion: 'Manzana roja',
      categoria: 'frutas',
      precioUnitario: 1.5,
      unidadMedida: 'kg',
      stockDisponible: 10,
      certificacionOrganica: false,
      productor: 'Jhandry Becerra'
    });

    const eliminado = remove(producto.id);
    expect(eliminado).toBe(true);
    expect(productos.length).toBe(0);
  });

  test('delete(): debe retornar false si el producto no existe', () => {
    expect(remove('no-existe')).toBe(false);
  });
});
