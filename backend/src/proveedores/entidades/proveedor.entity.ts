import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn({ name: 'id_proveedor' })
  idProveedor!: number;

  @Column({ length: 150 })
  nombre!: string;

  @Column({ nullable: true, length: 50 })
  telefono!: string;

  @Column({ nullable: true, length: 100 })
  email!: string;

  @Column({ nullable: true, length: 255 })
  direccion!: string;

  @Column({ default: true })
  activo!: boolean;

  @CreateDateColumn()
  creado_en!: Date;

  @UpdateDateColumn()
  actualizado_en!: Date;
}