import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Rol } from './entidades/rol.entity';
import { RolDto } from './dto/rol.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly repositorio: Repository<Rol>,
  ) {}

  async crear(dto: RolDto) {
    const existe = await this.repositorio.findOne({
      where: {
        nombre: dto.nombre,
      },
    });

    if (existe) {
      throw new BadRequestException(
        'El rol ya existe',
      );
    }

    const rol = this.repositorio.create({
      nombre: dto.nombre.trim(),
    });

    return await this.repositorio.save(rol);
  }

  async obtenerTodos() {
    return await this.repositorio.find({
      where: {
        activo: true,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async obtenerUno(id: number) {
    const rol = await this.repositorio.findOne({
      where: {
        id,
        activo: true,
      },
    });

    if (!rol) {
      throw new NotFoundException(
        'Rol no encontrado',
      );
    }

    return rol;
  }

  async actualizar(
    id: number,
    dto: RolDto,
  ) {
    const rol = await this.obtenerUno(id);

    const existe = await this.repositorio.findOne({
      where: {
        nombre: dto.nombre,
      },
    });

    if (
      existe &&
      existe.id !== id
    ) {
      throw new BadRequestException(
        'Ya existe un rol con ese nombre',
      );
    }

    rol.nombre = dto.nombre.trim();

    await this.repositorio.save(rol);

    return {
      mensaje: 'Rol actualizado',
    };
  }

  async eliminar(id: number) {
    const rol = await this.obtenerUno(id);

    rol.activo = false;

    await this.repositorio.save(rol);

    return {
      mensaje: 'Rol eliminado correctamente',
    };
  }
}