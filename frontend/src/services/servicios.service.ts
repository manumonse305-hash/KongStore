import api from './api';

export type EstadoServicio = {
  id: number;
  nombre: string;
}

export type ServicioTecnico = {
  idServicio: number;
  clienteId: number;
  estadoId: number;
  equipo: string;
  problema?: string;
  diagnostico?: string;
  costo?: number;
  fechaIngreso: string;
  fechaEntrega?: string;
  activo: boolean;
  cliente?: {
    id: number;
    nombre: string;
    apellidoP: string;
    apellidoM: string;
  };
  estado?: {
    id: number;
    nombre: string;
  };
}

export const serviciosService = {
  // Obtener todos los servicios
  async getAll(): Promise<ServicioTecnico[]> {
    const response = await api.get('/servicios-tecnicos');
    return response.data;
  },

  // Obtener un servicio por ID
  async getOne(id: number): Promise<ServicioTecnico> {
    const response = await api.get(`/servicios-tecnicos/${id}`);
    return response.data;
  },

  // Crear nuevo servicio
  async create(data: {
    clienteId: number;
    estadoId: number;
    equipo: string;
    problema?: string;
    diagnostico?: string;
    costo?: number;
  }): Promise<ServicioTecnico> {
    const response = await api.post('/servicios-tecnicos', data);
    return response.data;
  },

  // Actualizar servicio
  async update(id: number, data: Partial<ServicioTecnico>): Promise<ServicioTecnico> {
    const response = await api.patch(`/servicios-tecnicos/${id}`, data);
    return response.data;
  },

  // Eliminar servicio (baja lógica)
  async delete(id: number): Promise<void> {
    await api.delete(`/servicios-tecnicos/${id}`);
  },
};