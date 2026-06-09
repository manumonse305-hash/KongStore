import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { Usuario } from './entidades/usuario.entity';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { evaluarPassword } from '../common/utils/password-strength.util';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repositorio: Repository<Usuario>,
  ) {}

  async obtTodo() {
    return await this.repositorio.find({
      where: { activo: true },
    });
  }

  async obtUsuario(id: number): Promise<Usuario> {
    const usuario = await this.repositorio.findOne({
      where: {
        idUsuario: id,
        activo: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException(
        'Usuario no encontrado',
      );
    }

    return usuario;
  }

  async create(dto: CrearUsuarioDto) {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException(
        'Las contraseñas no coinciden',
      );
    }

    const existe = await this.repositorio.findOne({
      where: {
        usuario: dto.usuario,
      },
    });

    if (existe) {
      throw new BadRequestException(
        'El nombre de usuario ya existe',
      );
    }

    

    const fortaleza = evaluarPassword(
      dto.password,
    );
    if (fortaleza === 'DEBIL') {
    throw new BadRequestException(
      'La contraseña es demasiado débil. Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.'
    );
  }


    const passwordHash = await bcrypt.hash(
      dto.password,
      10,
    );

    const usuario = this.repositorio.create({
      nombre: dto.nombre,
      apellidoP: dto.apellidoP,
      apellidoM: dto.apellidoM,
      usuario: dto.usuario,
      email: dto.email ,
      passwordHash,
      rolId: dto.idRol,
      activo: true,
    });

    const guardado = await this.repositorio.save(
      usuario,
    );

    return {
      mensaje: 'Usuario creado',
      fortaleza,
      id: guardado.idUsuario,
    };
  }

  async elimina(id: number) {
    const usuario = await this.obtUsuario(id);

    usuario.activo = false;

    await this.repositorio.save(usuario);

    return {
      mensaje: 'Usuario eliminado',
    };
  }

  async actualizar(
  id: number,
  dto: ActualizarUsuarioDto,
) {
  const usuario =
    await this.obtUsuario(id);

  if (dto.nombre) {
    usuario.nombre = dto.nombre;
  }

  if (dto.apellidoP) {
    usuario.apellidoP = dto.apellidoP;
  }

  if (dto.apellidoM) {
    usuario.apellidoM = dto.apellidoM;
  }

  if (dto.usuario) {
    usuario.usuario = dto.usuario;
  }

  if (dto.email !== undefined) {
    usuario.email = dto.email;
  }

  if (dto.idRol) {
    usuario.rolId = dto.idRol;
  }

  if (dto.password) {
    if (
      dto.password !==
      dto.confirmPassword
    ) {
      throw new BadRequestException(
        'Las contraseñas no coinciden',
      );
    }

    usuario.passwordHash =
      await bcrypt.hash(
        dto.password,
        10,
      );
  }

  await this.repositorio.save(
    usuario,
  );

  return {
    mensaje:
      'Usuario actualizado correctamente',
  };
}
}