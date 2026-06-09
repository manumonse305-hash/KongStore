import { Categoria } from 'src/categorias/entidades/categoria.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn({ name: 'id_producto' })
  idProducto!: number;

  // 🔗 RELACIÓN CON CATEGORÍA
  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'id_categoria' })
  categoria!: Categoria;

  @Column()
  id_categoria!: number;

  @Column({ length: 150 })
  nombre!: string;

  @Column({ type: 'text', nullable: true })
  descripcion!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_venta!: number;

  @Column({ default: 1 })
  stock_minimo!: number;

  @Column({
  type: 'int',
  default: 0,
})
stock!: number;

  @Column({ default: true })
  activo!: boolean;

  @CreateDateColumn()
  creado_en!: Date;

  @UpdateDateColumn()
  actualizado_en!: Date;
}