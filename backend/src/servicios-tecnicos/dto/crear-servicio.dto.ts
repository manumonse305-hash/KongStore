import {
  IsInt,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDecimal,
  Min,
  Length,
  Matches,
  IsNumber,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CrearServicioDto {
  @IsInt({ message: 'El ID del cliente debe ser un número entero' })
  @IsPositive({ message: 'El ID del cliente debe ser positivo' })
  @Type(() => Number)
  clienteId!: number;

  @IsInt({ message: 'El ID del estado debe ser un número entero' })
  @IsPositive({ message: 'El ID del estado debe ser positivo' })
  @Type(() => Number)
  estadoId!: number;

  @IsString({ message: 'El equipo debe ser texto' })
  @IsNotEmpty({ message: 'El equipo es obligatorio' })
  @Matches(/\S+/, { message: 'El equipo no puede estar vacío o contener solo espacios' })
  @Length(3, 150, { message: 'El equipo debe tener entre 3 y 150 caracteres' })
  equipo!: string;

  @IsOptional()
  @IsString({ message: 'El problema debe ser texto' })
  @Matches(/\S+/, { message: 'El problema no puede estar vacío o contener solo espacios' })
  @Length(5, 500, { message: 'El problema debe tener entre 5 y 500 caracteres' })
  problema?: string;

  @IsOptional()
  @IsString({ message: 'El diagnóstico debe ser texto' })
  @Length(0, 500, { message: 'El diagnóstico no puede superar los 500 caracteres' })
  diagnostico?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El costo debe ser un número con hasta 2 decimales' })
  @Min(0, { message: 'El costo no puede ser negativo' })
  @Max(999999.99, { message: 'El costo no puede ser mayor a 999999.99' })
  @Type(() => Number)
  costo?: number;
}