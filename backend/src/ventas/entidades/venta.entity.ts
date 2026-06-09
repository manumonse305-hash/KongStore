import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { DetalleVenta } from './detalle-venta.entity';

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'usuario_id' })
  usuarioId!: number;

  @CreateDateColumn({ name: 'fecha_venta' })
  fechaVenta!: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  total!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  costo_total!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  ganancia!: number;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn!: Date;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  @OneToMany(() => DetalleVenta, detalle => detalle.venta)
  detalles!: DetalleVenta[];
}