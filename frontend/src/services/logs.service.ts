import api from './api';

export type LogAcceso = {
  id: number;
  usuarioId: number;
  ip: string;
  browser: string;
  evento: 'INGRESO' | 'SALIDA';
  fechaHora: string;
  usuario?: {
    idUsuario: number;
    nombre: string;
    apellidoP: string;
    apellidoM: string;
    usuario: string;
  };
}

export const logsService = {
  // Obtener todos los logs
  async getAll(): Promise<LogAcceso[]> {
    const response = await api.get('/logs');
    return response.data;
  },

  // Obtener logs por usuario
  async getByUser(usuarioId: number): Promise<LogAcceso[]> {
    const response = await api.get(`/logs/usuario/${usuarioId}`);
    return response.data;
  },
};