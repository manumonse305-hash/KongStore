import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

import { Type } from 'class-transformer';

export class ProductoDto {

  @IsString({
    message: 'El nombre debe ser texto'
  })
  @IsNotEmpty({
    message: 'El nombre es obligatorio'
  })
  @Length(3, 150, {
    message: 'El nombre debe tener entre 3 y 150 caracteres'
  })
  nombre: string="";

  @IsOptional()
  @IsString({
    message: 'La descripción debe ser texto'
  })
  @Length(0, 500, {
    message: 'La descripción no puede superar los 500 caracteres'
  })
  descripcion?: string;

  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'El precio debe ser numérico'
    }
  )
  @Min(0.01, {
    message: 'El precio debe ser mayor a 0'
  })
  precioVenta: number=0;

  @Type(() => Number)
  @IsNumber(
    {},
    {
      message: 'El stock mínimo debe ser numérico'
    }
  )
  @Min(1, {
    message: 'El stock mínimo debe ser al menos 1'
  })
  @Max(1000, {
    message: 'El stock mínimo no puede superar 1000'
  })
  stockMinimo: number=0;
}