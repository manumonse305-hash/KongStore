import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearProveedorDto } from './dto/crear-proveedor.dto';
import { Proveedor } from './entidades/proveedor.entity';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly repo: Repository<Proveedor>,
  ) {}

  create(dto: CrearProveedorDto) {
    const proveedor = this.repo.create(dto);
    return this.repo.save(proveedor);
  }

  findAll() {
    return this.repo.find({ where: { activo: true } });
  }

  async findOne(id: number) {
    const proveedor = await this.repo.findOne({
      where: { idProveedor: id, activo: true },
    });

    if (!proveedor) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    return proveedor;
  }

  async update(id: number, dto: CrearProveedorDto) {
    const proveedor = await this.findOne(id);
    Object.assign(proveedor, dto);
    return this.repo.save(proveedor);
  }

  async remove(id: number) {
    const proveedor = await this.findOne(id);
    proveedor.activo = false;
    return this.repo.save(proveedor);
  }
}