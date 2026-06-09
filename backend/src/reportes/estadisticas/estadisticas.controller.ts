import { Controller, Get, UseGuards } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorador';

@Controller('estadisticas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  @Roles(1, 2)
  @Get('ventas-por-dia')
  getVentasPorDia() {
    return this.estadisticasService.getVentasPorDia();
  }

  @Roles(1, 2)
  @Get('top-productos')
  getTopProductos() {
    return this.estadisticasService.getTopProductos();
  }

  @Roles(1, 2)
  @Get('ventas-por-mes')
  getVentasPorMes() {
    return this.estadisticasService.getVentasPorMes();
  }

  @Roles(1, 2)
  @Get('stock-bajo-grafico')
  getStockBajoGrafico() {
    return this.estadisticasService.getStockBajoGrafico();
  }

  @Roles(1, 2)
  @Get('dashboard')
  getDashboard() {
    return this.estadisticasService.getDashboard();
  }
}