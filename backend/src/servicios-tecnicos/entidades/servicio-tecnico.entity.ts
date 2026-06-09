import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cliente } from '../../clientes/entidades/cliente.entity';
import { EstadoServicio } from './estado-servicio.entity';

@Entity('servicios_tecnicos')
export class ServicioTecnico {
  @PrimaryGeneratedColumn({ name: 'id_servicio' })
  idServicio!: number;

  @Column({ name: 'cliente_id' })
  clienteId!: number;

  @Column({ name: 'estado_id' })
  estadoId!: number;  // ← solo esta columna

  @Column({ length: 150 })
  equipo!: string;

  @Column({ type: 'text', nullable: true })
  problema?: string;

  @Column({ type: 'text', nullable: true })
  diagnostico?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  costo?: number;

  @CreateDateColumn({ name: 'fecha_ingreso' })
  fechaIngreso!: Date;

  @Column({ name: 'fecha_entrega', type: 'datetime', nullable: true })
  fechaEntrega?: Date;

  @Column({ default: true })
  activo!: boolean;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn!: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn!: Date;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente!: Cliente;

  @ManyToOne(() => EstadoServicio)
  @JoinColumn({ name: 'estado_id' })
  estado!: EstadoServicio;
}