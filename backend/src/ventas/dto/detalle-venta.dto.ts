import { IsInt, IsPositive, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class DetalleVentaDto {
  @IsInt()
  @IsPositive()
  productoId!: number;

  @IsInt()
  @IsPositive()
  cantidad!: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  precioUnitario!: number;
}