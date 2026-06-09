import { Controller, Get, Res, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { ReportesService } from './reportes.service';
import { Roles } from 'src/auth/decorators/roles.decorador';
import type { Response } from 'express';
import * as PdfPrinter from 'pdfmake';

@Controller('reportes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Roles(1, 2)
  @Get('ventas/dia')
  async reporteVentasDia(@Res() res: Response) {
    const pdfDoc = await this.reportesService.generarReporteVentasDia();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=ventas-dia.pdf');
    
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Roles(1,2)
  @Get('stock-bajo')
  async reporteStockBajo(@Res() res: Response) {
    const pdfDoc = await this.reportesService.generarReporteStockBajo();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=stock-bajo.pdf');
    
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Roles(1, 2)
  @Get('total-vendido')
  async reporteTotalVendido(
    @Res() res: Response,
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
  ) {
    const pdfDoc = await this.reportesService.generarReporteTotalVendido(fechaInicio, fechaFin);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=total-vendido.pdf');
    
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}