import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Rol } from '../../roles/entidades/rol.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({
    name: 'id_usuario',
  })
  idUsuario!: number;

  @Column({
    name: 'nombre',
    length: 150,
  })
  nombre!: string;

  @Column({
    name: 'apellido_p',
    length: 150,
  })
  apellidoP!: string;

  @Column({
    name: 'apellido_m',
    length: 150,
  })
  apellidoM!: string;

  @Column({
    name: 'usuario',
    unique: true,  // ← Solo es único, NO es FK
    length: 50,
  })
  usuario!: string;

  @Column({
  name: 'email',
  type: 'varchar',
  length: 150,
  nullable: true,
    })
email?: string;

  @Column({
    name: 'password_hash',
    length: 255,
  })
  passwordHash!: string;

  // 👇 Esta SÍ es la llave foránea
  @Column({
    name: 'id_rol',
    type: 'int',
  })
  rolId!: number;

  @Column({
    name: 'activo',
    type: 'boolean',
    default: true,
  })
  activo!: boolean;

  @CreateDateColumn({
    name: 'creado_en',
  })
  creadoEn!: Date;

  @UpdateDateColumn({
    name: 'actualizado_en',
  })
  actualizadoEn!: Date;

  // 👇 Relación ManyToOne con Rol (porque id_rol es FK)
  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'id_rol' })  // ← Nombre de la columna FK en usuarios
  rol!: Rol;
}