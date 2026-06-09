import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

export abstract class BaseEntity {
 

  @Column({
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
}