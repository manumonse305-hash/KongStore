import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venta } from './venta.entity';
import { Producto } from '../../productos/entidades/producto.entity';

@Entity('detalle_ventas')
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'venta_id' })
  ventaId!: number;

  @Column({ name: 'producto_id' })
  productoId!: number;

  @Column()
  cantidad!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'precio_unitario' })
  precioUnitario!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal!: number;

  @ManyToOne(() => Venta, venta => venta.detalles)
  @JoinColumn({ name: 'venta_id' })
  venta!: Venta;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'producto_id' })
  producto!: Producto;
}