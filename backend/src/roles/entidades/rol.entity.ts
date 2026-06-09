import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Usuario } from '../../usuarios/entidades/usuario.entity';

@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id!: number;

  @Column({
    name: 'nombre',
    length: 50,
    unique: true,
  })
  nombre!: string;

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

  @OneToMany(
    () => Usuario,
    (usuario) => usuario.rol,
  )
  usuarios!: Usuario[];
}