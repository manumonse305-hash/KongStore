import { PartialType } from '@nestjs/mapped-types';
import { CrearServicioDto } from './crear-servicio.dto';
import { IsOptional, IsDateString, IsInt, IsPositive } from 'class-validator';

export class ActualizarServicioDto extends PartialType(CrearServicioDto) {
  @IsOptional()
  @IsInt()
  @IsPositive()
 estadoId?: number;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de entrega debe ser una fecha válida' })
  fechaEntrega?: string;
}