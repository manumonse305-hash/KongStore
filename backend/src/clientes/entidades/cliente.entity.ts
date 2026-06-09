import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  nombre!: string;

  @Column({ length: 150, name: 'apellido_p' })
  apellidoP!: string;

  @Column({ length: 150, name: 'apellido_m' })
  apellidoM!: string;

  @Column({ length: 50, nullable: true })
  telefono?: string;

  @Column({ length: 100, nullable: true })
  email?: string;

  @Column({ default: true })
  activo!: boolean;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn!: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn!: Date;
}