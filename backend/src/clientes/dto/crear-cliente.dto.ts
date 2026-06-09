import {
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
  IsEmail,
  Matches,
} from 'class-validator';

export class CrearClienteDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Matches(/\S+/, { message: 'El nombre no puede estar vacío o contener solo espacios' })
  @Length(2, 150, { message: 'El nombre debe tener entre 2 y 150 caracteres' })
  nombre!: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido paterno es obligatorio' })
  @Matches(/\S+/, { message: 'El apellido paterno no puede estar vacío o contener solo espacios' })
  @Length(2, 150, { message: 'El apellido paterno debe tener entre 2 y 150 caracteres' })
  apellidoP!: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido materno es obligatorio' })
  @Matches(/\S+/, { message: 'El apellido materno no puede estar vacío o contener solo espacios' })
  @Length(2, 150, { message: 'El apellido materno debe tener entre 2 y 150 caracteres' })
  apellidoM!: string;

  @IsOptional()
  @IsString()
  @Length(8, 8, { message: 'El celular debe tener exactamente 8 dígitos' })
  @Matches(/^[0-9]+$/, { message: 'El celular solo debe contener números' })
  telefono?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El email no es válido' })
  email?: string;
}