import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class RolDto {
  @Transform(({ value }) => value?.trim())
  @IsString({
    message: 'El nombre debe ser texto.',
  })
  @IsNotEmpty({
    message: 'El nombre es obligatorio.',
  })
  @MinLength(3, {
    message: 'El nombre debe tener al menos 3 caracteres.',
  })
  @MaxLength(50, {
    message: 'El nombre no puede exceder los 50 caracteres.',
  })
  nombre!: string;
}