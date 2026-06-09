import api from './api';

export interface DetalleVenta {
  id: number;
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  producto?: {
    idProducto: number;
    nombre: string;
  };
}

export interface Venta {
  id: number;
  usuarioId: number;
  fechaVenta: string;
  total: number;
  costo_total: number;
  ganancia: number;
  usuario?: {
    id: number;
    usuario: string;
  };
  detalles?: DetalleVenta[];
}

export const ventasService = {
  // Obtener todas las ventas
  async getAll(): Promise<Venta[]> {
    const response = await api.get('/ventas');
    return response.data;
  },

  // Obtener una venta por ID
  async getOne(id: number): Promise<Venta> {
    const response = await api.get(`/ventas/${id}`);
    return response.data;
  },

  // Crear nueva venta
 async create(detalles: { productoId: number; cantidad: number; precioUnitario: number }[]): Promise<Venta> {
  const response = await api.post('/ventas', { detalles });
  return response.data;
}
};