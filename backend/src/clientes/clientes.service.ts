import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entidades/cliente.entity';
import { CrearClienteDto } from './dto/crear-cliente.dto';
import { ActualizarClienteDto } from './dto/actualizar-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) {}

  async create(dto: CrearClienteDto) {
    const cliente = this.clienteRepo.create(dto);
    return this.clienteRepo.save(cliente);
  }

  async findAll() {
    return this.clienteRepo.find({
      where: { activo: true },
      order: { apellidoP: 'ASC', apellidoM: 'ASC', nombre: 'ASC' },
    });
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepo.findOne({
      where: { id, activo: true },
    });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    return cliente;
  }

  async update(id: number, dto: ActualizarClienteDto) {
    const cliente = await this.findOne(id);
    Object.assign(cliente, dto);
    return this.clienteRepo.save(cliente);
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);
    cliente.activo = false;
    return this.clienteRepo.save(cliente);
  }
}