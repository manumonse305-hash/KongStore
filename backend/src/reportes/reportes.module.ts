import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportesController } from './reportes.controller';
import { ReportesService } from './reportes.service';
import { Venta } from '../ventas/entidades/venta.entity';
import { DetalleVenta } from '../ventas/entidades/detalle-venta.entity';
import { Producto } from '../productos/entidades/producto.entity';
import { EstadisticasService } from './estadisticas/estadisticas.service';
import { EstadisticasController } from './estadisticas/estadisticas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, DetalleVenta, Producto])],
  controllers: [ReportesController, EstadisticasController],
  providers: [ReportesService, EstadisticasService],
})
export class ReportesModule {}