import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Proveedor } from '../../proveedores/entidades/proveedor.entity';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { DetalleCompra } from '../detalle-compra.entity';

@Entity('compras')
export class Compra {
  @PrimaryGeneratedColumn()
  compraId!: number;

  @Column({ name: 'proveedor_id' })
  proveedorId!: number;

  @Column({ name: 'usuario_id' })
  usuarioId!: number;

  @CreateDateColumn({ name: 'fecha_compra' })
  fechaCompra!: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  total!: number;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn!: Date;

  @ManyToOne(() => Proveedor)
  @JoinColumn({ name: 'proveedor_id' })
  proveedor!: Proveedor;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  @OneToMany(() => DetalleCompra, detalle => detalle.compra)
  detalles!: DetalleCompra[];
}