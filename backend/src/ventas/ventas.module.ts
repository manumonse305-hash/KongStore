import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasController } from './ventas.controller';
import { VentasService } from './ventas.service';
import { Venta } from './entidades/venta.entity';
import { DetalleVenta } from './entidades/detalle-venta.entity';
import { Producto } from '../productos/entidades/producto.entity';
import { DetalleCompra } from '../compras/detalle-compra.entity'; // ← Agregar

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Venta, 
      DetalleVenta, 
      Producto,
      DetalleCompra, 
    ]),
  ],
  controllers: [VentasController],
  providers: [VentasService],
})
export class VentasModule {}