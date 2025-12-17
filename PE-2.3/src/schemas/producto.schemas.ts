import { z } from 'zod';
import { CATEGORIAS_PRODUCTOS } from '../types/producto.types';

// Primero creamos el enum de Zod
const CategoriaEnum = z.enum(CATEGORIAS_PRODUCTOS);

export const crearProductoSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  descripcion: z.string().optional().default(""),
  categoria: CategoriaEnum.refine(
    val => CATEGORIAS_PRODUCTOS.includes(val), 
    { 
      message: `Categoría debe ser una de: ${CATEGORIAS_PRODUCTOS.join(', ')}` 
    }
  ),
  precioUnitario: z.number().positive("El precio debe ser un número positivo"),
  unidadMedida: z.string().min(1, "Unidad de medida requerida").max(50),
  stockDisponible: z.number().int().nonnegative("Stock no puede ser negativo"),
  certificacionOrganica: z.boolean().default(false),
  productor: z.string().min(2, "El productor debe tener al menos 2 caracteres").max(100)
});

export const actualizarProductoSchema = crearProductoSchema.partial();