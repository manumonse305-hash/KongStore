import api from './api';

export type Categoria = {
  idCategoria: number;   // ← se llama idCategoria, no id
  nombre: string;
  descripcion?: string;
  activo: boolean;
}

export const categoriasService = {
  async getAll(): Promise<Categoria[]> {
    const response = await api.get('/categorias');
    return response.data;
  },

  async getOne(id: number): Promise<Categoria> {
    const response = await api.get(`/categorias/${id}`);
    return response.data;
  },

  async create(data: { nombre: string; descripcion?: string }): Promise<Categoria> {
    const response = await api.post('/categorias', data);
    return response.data;
  },

  async update(id: number, data: { nombre?: string; descripcion?: string }): Promise<Categoria> {
    const response = await api.patch(`/categorias/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/categorias/${id}`);
  },
};