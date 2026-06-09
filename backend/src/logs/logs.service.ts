import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LogAcceso } from './entidades/log-acceso.entity';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(LogAcceso)
    private readonly repo: Repository<LogAcceso>,
  ) {}

  async registrar(
    usuarioId: number,
    ip: string,
    browser: string,
    evento: 'INGRESO' | 'SALIDA',
  ) {
    console.log('=== ENTRÓ A LOGSSERVICE ===');

    console.log({
      usuarioId,
      ip,
      browser,
      evento,
    });

    const log = this.repo.create({
      usuarioId,
      ip,
      browser,
      evento,
    });

    console.log('LOG CREADO:', log);

    try {
      const resultado = await this.repo.save(log);

      console.log('LOG GUARDADO:', resultado);

      return resultado;
    } catch (error) {
      console.error('ERROR AL GUARDAR LOG:', error);
      throw error;
    }
  }

  async findAll() {
    return this.repo.find({
      order: {
        fechaHora: 'DESC',
      },
    });
  }

  async findByUser(usuarioId: number) {
    return this.repo.find({
      where: {
        usuarioId,
      },
      order: {
        fechaHora: 'DESC',
      },
    });
  }
}