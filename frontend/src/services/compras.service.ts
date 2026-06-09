import api from './api';

export type DetalleCompra = {
  idDetalle: number;
  id_producto: number;
  cantidad: number;
  costo_unitario: number;
  subtotal: number;
  producto?: {
    idProducto: number;
    nombre: string;
  };
}

export type Compra = {
  compraId: number;
  proveedorId: number;
  usuarioId: number;
  fechaCompra: string;
  total: number;
  proveedor?: {
    id: number;
    nombre: string;
  };
  usuario?: {
    id: number;
    usuario: string;
  };
  detalles?: DetalleCompra[];
}

export const comprasService = {
  // Obtener todas las compras
  async getAll(): Promise<Compra[]> {
    const response = await api.get('/compras');
    return response.data;
  },

  // Obtener una compra por ID
  async getOne(id: number): Promise<Compra> {
    const response = await api.get(`/compras/${id}`);
    return response.data;
  },

  // Crear nueva compra
  async create(data: {
    proveedorId: number;
    detalles: { productoId: number; cantidad: number; costoUnitario: number }[];
  }): Promise<Compra> {
    const response = await api.post('/compras', data);
    return response.data;
  },
};