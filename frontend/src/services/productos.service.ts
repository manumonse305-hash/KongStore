import api from './api';

export type Producto = {
  idProducto: number;
  nombre: string;
  descripcion?: string;
  precio_venta: number;
  stock: number;
  stock_minimo: number;
  id_categoria: number;  // ← el campo en el producto es id_categoria
  categoria?: {
    idCategoria: number;  // ← el ID viene como idCategoria
    nombre: string;
  };
  activo: boolean;
}

export const productosService = {
  // Obtener todos los productos
  async getAll(): Promise<Producto[]> {
    const response = await api.get('/productos');
    return response.data;
  },

  // Obtener un producto por ID
  async getOne(id: number): Promise<Producto> {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  // Crear nuevo producto
  async create(data: {
    nombre: string;
    descripcion?: string;
    precio_venta: number;
    stock: number;
    stock_minimo: number;
    id_categoria: number;
  }): Promise<Producto> {
    const response = await api.post('/productos', data);
    return response.data;
  },

  // Actualizar producto
  async update(id: number, data: Partial<Producto>): Promise<Producto> {
    const response = await api.patch(`/productos/${id}`, data);
    return response.data;
  },

  // Eliminar producto (baja lógica)
  async delete(id: number): Promise<void> {
    await api.delete(`/productos/${id}`);
  },
};