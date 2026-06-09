import api from './api';

export type Proveedor = {
  idProveedor: number;  // ← debe coincidir con el backend
  nombre: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  activo: boolean;
}

export const proveedoresService = {
  async getAll(): Promise<Proveedor[]> {
    const response = await api.get('/proveedores');
    return response.data;
  },

  async getOne(id: number): Promise<Proveedor> {
    const response = await api.get(`/proveedores/${id}`);
    return response.data;
  },

  async create(data: { nombre: string; telefono?: string; email?: string; direccion?: string }): Promise<Proveedor> {
    const response = await api.post('/proveedores', data);
    return response.data;
  },

  async update(id: number, data: Partial<Proveedor>): Promise<Proveedor> {
    const response = await api.patch(`/proveedores/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/proveedores/${id}`);
  },
};