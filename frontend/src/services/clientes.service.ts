import api from './api';

export type Cliente = {
  id: number;
  nombre: string;
  apellidoP: string;
  apellidoM: string;
  telefono?: string;
  email?: string;
  activo: boolean;
  creadoEn: string;
  actualizadoEn: string;
}

export const clientesService = {
  // Obtener todos los clientes
  async getAll(): Promise<Cliente[]> {
    const response = await api.get('/clientes');
    return response.data;
  },

  // Obtener un cliente por ID
  async getOne(id: number): Promise<Cliente> {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  },

  // Crear nuevo cliente
  async create(data: {
    nombre: string;
    apellidoP: string;
    apellidoM: string;
    telefono?: string;
    email?: string;
  }): Promise<Cliente> {
    const response = await api.post('/clientes', data);
    return response.data;
  },

  // Actualizar cliente
  async update(id: number, data: Partial<Cliente>): Promise<Cliente> {
    const response = await api.patch(`/clientes/${id}`, data);
    return response.data;
  },

  // Eliminar cliente (baja lógica)
  async delete(id: number): Promise<void> {
    await api.delete(`/clientes/${id}`);
  },
};