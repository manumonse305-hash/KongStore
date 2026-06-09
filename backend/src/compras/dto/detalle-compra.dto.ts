import { IsInt, IsPositive, IsDecimal, Min, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class DetalleCompraDto {
  @IsInt({ message: 'El ID del producto debe ser un número entero.' })
  @IsPositive({ message: 'El ID del producto debe ser positivo.' })
  productoId!: number;

  @IsInt({ message: 'La cantidad debe ser un número entero.' })
  @IsPositive({ message: 'La cantidad debe ser mayor a 0.' })
  cantidad!: number;

 @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El costo unitario debe ser un número con hasta 2 decimales.' })
@Min(0, { message: 'El costo unitario no puede ser negativo.' })
@Type(() => Number)
costoUnitario!: number;
}