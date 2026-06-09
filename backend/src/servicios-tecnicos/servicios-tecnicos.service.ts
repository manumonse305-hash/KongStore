import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicioTecnico } from './entidades/servicio-tecnico.entity';
import { EstadoServicio } from './entidades/estado-servicio.entity';
import { Cliente } from '../clientes/entidades/cliente.entity';
import { CrearServicioDto } from './dto/crear-servicio.dto';
import { ActualizarServicioDto } from './dto/actualizar-servicio.dto';

@Injectable()
export class ServiciosTecnicosService {
  constructor(
    @InjectRepository(ServicioTecnico)
    private servicioRepo: Repository<ServicioTecnico>,
    @InjectRepository(EstadoServicio)
    private estadoRepo: Repository<EstadoServicio>,
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
  ) {}

  async create(dto: CrearServicioDto) {
    // Validar que el cliente exista
    const cliente = await this.clienteRepo.findOne({
      where: { id: dto.clienteId, activo: true },
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${dto.clienteId} no encontrado`);
    }

    // Validar que el estado exista (usando idEstadoServicio)
    const estado = await this.estadoRepo.findOne({
      where: { idEstadoServicio: dto.estadoId },
    });
    if (!estado) {
      throw new NotFoundException(`Estado con ID ${dto.estadoId} no encontrado`);
    }

    const servicio = this.servicioRepo.create({
      clienteId: dto.clienteId,
      estadoId: dto.estadoId,
      equipo: dto.equipo,
      problema: dto.problema,
      diagnostico: dto.diagnostico,
      costo: dto.costo,
    });
    return this.servicioRepo.save(servicio);
  }

  async findAll() {
    return this.servicioRepo.find({
      where: { activo: true },
      relations: {
        cliente: true,
        estado: true,
      },
      order: {
        fechaIngreso: 'DESC',
      },
    });
  }

 async findOne(id: number) {
  const servicio = await this.servicioRepo.findOne({
    where: { idServicio: id, activo: true },
    relations: {
      cliente: true,
      estado: true,  // ← asegurar que la relación está bien
    },
  });
  if (!servicio) {
    throw new NotFoundException(`Servicio técnico con ID ${id} no encontrado`);
  }
  
  // Debug: ver qué está trayendo
  console.log('Servicio encontrado:', {
    idServicio: servicio.idServicio,
    estadoId: servicio.estadoId,
    estado: servicio.estado,
  });
  
  return servicio;
}
 async update(id: number, dto: ActualizarServicioDto) {
  console.log('📝 UPDATE - ID:', id);
  console.log('📦 DTO recibido:', dto);

  // ✅ Actualizar directamente en la base de datos
  const updateData: any = {};

  if (dto.clienteId !== undefined) updateData.clienteId = dto.clienteId;
  if (dto.estadoId !== undefined) updateData.estadoId = dto.estadoId;
  if (dto.equipo !== undefined) updateData.equipo = dto.equipo;
  if (dto.problema !== undefined) updateData.problema = dto.problema;
  if (dto.diagnostico !== undefined) updateData.diagnostico = dto.diagnostico;
  if (dto.costo !== undefined) updateData.costo = dto.costo;
  if (dto.fechaEntrega !== undefined) {
    updateData.fechaEntrega = dto.fechaEntrega ? new Date(dto.fechaEntrega) : null;
  }

  console.log('📝 Datos a actualizar:', updateData);

  // Validar que el cliente existe si se actualiza
  if (dto.clienteId) {
    const cliente = await this.clienteRepo.findOne({
      where: { id: dto.clienteId, activo: true },
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${dto.clienteId} no encontrado`);
    }
  }

  // Validar que el estado existe si se actualiza
  if (dto.estadoId) {
    const estado = await this.estadoRepo.findOne({
      where: { idEstadoServicio: dto.estadoId },
    });
    if (!estado) {
      throw new NotFoundException(`Estado con ID ${dto.estadoId} no encontrado`);
    }
  }

  // ✅ Ejecutar la actualización directamente
  await this.servicioRepo.update({ idServicio: id }, updateData);

  // ✅ Obtener y devolver el servicio actualizado
  const servicioActualizado = await this.findOne(id);
  console.log('✅ Servicio actualizado:', servicioActualizado.idServicio, 'estadoId:', servicioActualizado.estadoId);
  
  return servicioActualizado;
}

  async remove(id: number) {
    const servicio = await this.findOne(id);
    servicio.activo = false;
    return this.servicioRepo.save(servicio);
  }

  async findByEstado(estadoId: number) {
    return this.servicioRepo.find({
      where: { estadoId, activo: true },
      relations: {
        cliente: true,
        estado: true,
      },
      order: {
        fechaIngreso: 'DESC',
      },
    });
  }

  async findByCliente(clienteId: number) {
    return this.servicioRepo.find({
      where: { clienteId, activo: true },
      relations: {
        cliente: true,
        estado: true,
      },
      order: {
        fechaIngreso: 'DESC',
      },
    });
  }
}