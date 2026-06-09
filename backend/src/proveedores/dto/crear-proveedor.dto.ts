import {
  IsString,
  IsOptional,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CrearProveedorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nombre!: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  direccion?: string;
}