import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { Usuario } from '../usuarios/entidades/usuario.entity';
import { LoginDto } from './dto/login.dto';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,

    private readonly jwtService: JwtService,
    private readonly logsService: LogsService,
  ) {}

  async login(
  dto: LoginDto,
  ip: string,
  browser: string,
) {
  const usuario = await this.usuarioRepo.findOne({
    where: {
      usuario: dto.usuario,
      activo: true,
    },
    relations: {
      rol: true,
    },
  });

  if (!usuario) {
    throw new UnauthorizedException(
      'Usuario o contraseña incorrectos',
    );
  }

  const passwordValida = await bcrypt.compare(
    dto.password,
    usuario.passwordHash,
  );

  if (!passwordValida) {
    throw new UnauthorizedException(
      'Usuario o contraseña incorrectos',
    );
  }

  console.log('=== ANTES DE REGISTRAR INGRESO ===');

  await this.logsService.registrar(
    usuario.idUsuario,
    ip,
    browser,
    'INGRESO',
  );

  console.log('=== DESPUÉS DE REGISTRAR INGRESO ===');

  const payload = {
    sub: usuario.idUsuario,
    usuario: usuario.usuario,
    rolId: usuario.rolId,
  };

  return {
    access_token: this.jwtService.sign(payload),
    usuario: usuario.usuario,
  };
}

  async logout(
  usuarioId: number,
  ip: string,
  browser: string,
) {
  
  await this.logsService.registrar(
    usuarioId,
    ip,
    browser,
    'SALIDA',
  );

  return {
    mensaje: 'Sesión cerrada',
  };
}

 
}