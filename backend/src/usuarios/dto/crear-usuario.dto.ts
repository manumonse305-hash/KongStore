import { MENSAJES } from '../../common/messages/messages';

import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
  IsInt,
  Min,
  Matches,
} from 'class-validator';

import { Transform } from 'class-transformer';


export class CrearUsuarioDto {

  @IsString({
    message: 'El nombre debe ser texto.',
  })
  @IsNotEmpty({
    message: MENSAJES.NOMBRE_REQUERIDO,
  })
  @MinLength(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  })
  @MaxLength(150, {
    message: 'El nombre no puede exceder los 150 caracteres.',
  })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios.',
  })
  nombre!: string;

  @IsString({
    message: 'El apellido paterno debe ser texto.',
  })
  @IsNotEmpty({
    message: MENSAJES.APELLIDO_P_REQUERIDO,
  })
  @MinLength(2, {
    message: 'El apellido paterno debe tener al menos 2 caracteres.',
  })
  @MaxLength(150, {
    message: 'El apellido paterno no puede exceder los 150 caracteres.',
  })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El apellido paterno solo puede contener letras y espacios.',
  })
  apellidoP!: string;

  @IsString({
    message: 'El apellido materno debe ser texto.',
  })
  @IsNotEmpty({
    message: MENSAJES.APELLIDO_M_REQUERIDO,
  })
  @MinLength(2, {
    message: 'El apellido materno debe tener al menos 2 caracteres.',
  })
  @MaxLength(150, {
    message: 'El apellido materno no puede exceder los 150 caracteres.',
  })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El apellido materno solo puede contener letras y espacios.',
  })
  apellidoM!: string;

  @IsString({
    message: 'El nombre de usuario debe ser texto.',
  })
  @IsNotEmpty({
    message: MENSAJES.USUARIO_REQUERIDO,
  })
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres.',
  })
  @MaxLength(50, {
    message: 'El nombre de usuario no puede exceder los 50 caracteres.',
  })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'El usuario solo puede contener letras, números y guión bajo.',
  })
  usuario!: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: MENSAJES.EMAIL_INVALIDO,
    },
  )
  @MaxLength(150, {
    message: 'El email no puede exceder los 150 caracteres.',
  })
  email?: string;

  @IsString({
    message: 'La contraseña debe ser texto.',
  })
  @IsNotEmpty({
    message: MENSAJES.PASSWORD_REQUERIDA,
  })
  @MinLength(8, {
    message: MENSAJES.PASSWORD_MINIMA,
  })
  @MaxLength(255, {
    message: 'La contraseña no puede exceder los 255 caracteres.',
  })
  password!: string;

  @IsString({
    message: 'La confirmación de contraseña debe ser texto.',
  })
  @IsNotEmpty({
    message: 'Debe confirmar la contraseña.',
  })
  confirmPassword!: string;

  @IsInt({
    message: MENSAJES.ROL_INVALIDO,
  })
  @Min(1, {
    message: MENSAJES.ROL_INVALIDO,
  })
  @Transform(({ value }) => Number(value))
  idRol!: number;
}