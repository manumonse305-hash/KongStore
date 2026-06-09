import { PartialType } from '@nestjs/mapped-types';
import { CrearProductoDto } from './crear-producto.dto';
import { IsOptional, IsBoolean, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ActualizarProductoDto extends PartialType(CrearProductoDto) {
  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock?: number;
}