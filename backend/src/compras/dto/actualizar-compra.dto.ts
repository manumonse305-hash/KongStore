import { PartialType } from '@nestjs/mapped-types';
import { CrearCompraDto } from './crear-compra.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DetalleCompraDto } from './detalle-compra.dto';

export class ActualizarCompraDto extends PartialType(CrearCompraDto) {
  @IsArray({ message: 'Los detalles deben ser un array.' })
  @ValidateNested({ each: true })
  @Type(() => DetalleCompraDto)
  detalles!: DetalleCompraDto[];
}