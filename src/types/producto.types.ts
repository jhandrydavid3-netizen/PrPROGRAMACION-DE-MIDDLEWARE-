// src/types/producto.types.ts
export const CATEGORIAS_PRODUCTOS = [
  'frutas',
  'verduras',
  'lacteos',
  'carnes',
  'panaderia',
  'bebidas',
  'otros'
] as const;

export type CategoriaProducto = typeof CATEGORIAS_PRODUCTOS[number];

export interface Producto {
  id: string;
  nombre: string;
  descripcion?: string;
  categoria: CategoriaProducto;
  precioUnitario: number;
  unidadMedida: string;
  stockDisponible: number;
  certificacionOrganica: boolean;
  productor: string;
  creadoEn: string;
  actualizadoEn?: string;
}
