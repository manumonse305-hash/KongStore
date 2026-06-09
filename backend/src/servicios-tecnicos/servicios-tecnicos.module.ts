import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiciosTecnicosController } from './servicios-tecnicos.controller';
import { ServiciosTecnicosService } from './servicios-tecnicos.service';
import { ServicioTecnico } from './entidades/servicio-tecnico.entity';
import { EstadoServicio } from './entidades/estado-servicio.entity';
import { Cliente } from '../clientes/entidades/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServicioTecnico, EstadoServicio, Cliente])],
  controllers: [ServiciosTecnicosController],
  providers: [ServiciosTecnicosService],
})
export class ServiciosTecnicosModule {}