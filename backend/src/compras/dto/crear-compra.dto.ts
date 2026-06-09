import {
  IsInt,
  IsPositive,
  IsOptional,
  Min,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DetalleCompraDto } from './detalle-compra.dto';

export class CrearCompraDto {
  @IsInt({ message: 'El ID del proveedor debe ser un número entero.' })
  @IsPositive({ message: 'El ID del proveedor debe ser un número positivo.' })
  @Type(() => Number)
  proveedorId!: number;

  @IsOptional()
@IsNumber({ maxDecimalPlaces: 2 }, { message: 'El total debe ser un número con hasta 2 decimales.' })
@Min(0, { message: 'El total no puede ser negativo.' })
@Type(() => Number)
total?: number;

  @IsArray({ message: 'Los detalles deben ser un array.' })
  @ValidateNested({ each: true })
  @Type(() => DetalleCompraDto)
  detalles!: DetalleCompraDto[];
}