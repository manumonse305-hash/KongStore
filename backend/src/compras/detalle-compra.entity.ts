import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Compra } from './entidades/compra.entity';
import { Producto } from 'src/productos/entidades/producto.entity';


@Entity('detalle_compras')
export class DetalleCompra {
  @PrimaryGeneratedColumn({ name: 'id_detalle' })
  idDetalle!: number;

  @Column()
  id_compra!: number;

  @Column()
  id_producto!: number;

  @Column()
  cantidad!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costo_unitario!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal!: number;

  @ManyToOne(() => Compra, c => c.detalles)
  @JoinColumn({ name: 'id_compra' })
  compra!: Compra;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'id_producto' })
  producto!: Producto;
}