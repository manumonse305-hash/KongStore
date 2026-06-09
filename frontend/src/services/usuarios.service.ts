import api from './api';

export type Usuario = {
  idUsuario: number;
  nombre: string;
  apellidoP: string;
  apellidoM: string;
  usuario: string;
  email?: string;
  rolId: number;
  rol?: {
    id: number;
    nombre: string;
  };
  activo: boolean;
}

export const usuariosService = {
  // Obtener todos los usuarios
  async getAll(): Promise<Usuario[]> {
    const response = await api.get('/usuarios');
    return response.data;
  },

  // Obtener un usuario por ID
  async getOne(id: number): Promise<Usuario> {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },

  // Crear nuevo usuario
  async create(data: {
    nombre: string;
    apellidoP: string;
    apellidoM: string;
    usuario: string;
    email?: string;
    password: string;
    confirmPassword: string;
    idRol: number;
  }): Promise<Usuario> {
    const response = await api.post('/usuarios', data);
    return response.data;
  },

  // Actualizar usuario
  async update(id: number, data: Partial<Usuario>): Promise<Usuario> {
    const response = await api.patch(`/usuarios/${id}`, data);
    return response.data;
  },

  // Eliminar usuario (baja lógica)
  async delete(id: number): Promise<void> {
    await api.delete(`/usuarios/${id}`);
  },
};