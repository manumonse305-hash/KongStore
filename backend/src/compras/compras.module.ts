import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ComprasService } from './compras.service';
import { ComprasController } from './ComprasController';

import { DetalleCompra } from './detalle-compra.entity';
import { Producto } from '../productos/entidades/producto.entity';
import { Compra } from './entidades/compra.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Compra,
      DetalleCompra,
      Producto,
    ]),
  ],
  controllers: [ComprasController],
  providers: [ComprasService],
})
export class ComprasModule {}