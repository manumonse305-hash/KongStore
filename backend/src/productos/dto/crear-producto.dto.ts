import { IsNotEmpty, IsString, Length, IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CrearProductoDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  id_categoria!: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  nombre!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNumber()
  @Min(0.01)
  @Type(() => Number)
  precio_venta!: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  stock_minimo?: number;
}