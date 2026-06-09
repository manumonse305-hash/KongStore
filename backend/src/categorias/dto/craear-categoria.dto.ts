import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class CrearCategoriaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  descripcion?: string;
}