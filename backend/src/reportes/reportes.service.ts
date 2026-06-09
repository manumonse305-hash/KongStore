import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Venta } from '../ventas/entidades/venta.entity';
import { DetalleVenta } from '../ventas/entidades/detalle-venta.entity';
import { Producto } from '../productos/entidades/producto.entity';

// Importación correcta de pdfmake
const PdfPrinter = require('pdfmake/src/printer');

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Venta)
    private ventaRepo: Repository<Venta>,
    @InjectRepository(DetalleVenta)
    private detalleVentaRepo: Repository<DetalleVenta>,
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
  ) {}

  async generarReporteVentasDia() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);

    const ventas = await this.ventaRepo.find({
      where: {
        fechaVenta: Between(hoy, manana),
      },
      // CORREGIDO: usar objeto para relaciones, no array
      relations: {
        detalles: {
          producto: true,
        },
        usuario: true,
      },
    });

    const totalVentas = ventas.reduce((sum, v) => sum + Number(v.total), 0);
    const totalGanancia = ventas.reduce((sum, v) => sum + Number(v.ganancia), 0);

    const bodyTabla = [
      ['ID', 'Usuario', 'Total', 'Ganancia', 'Fecha'],
    ];

    for (const venta of ventas) {
      bodyTabla.push([
        venta.id.toString(),
        venta.usuario?.usuario || 'N/A',
        `Bs ${Number(venta.total).toFixed(2)}`,
        `Bs ${Number(venta.ganancia).toFixed(2)}`,
        new Date(venta.fechaVenta).toLocaleString(),
      ]);
    }

   const fonts = {
  Roboto: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique',
  },
};
    const printer = new PdfPrinter(fonts);

    const docDefinition = {
      content: [
        { text: 'Reporte de Ventas del Día', style: 'header', alignment: 'center' },
        { text: `Fecha: ${new Date().toLocaleDateString()}`, alignment: 'center', margin: [0, 0, 0, 20] },
        { text: `Total Ventas: Bs ${totalVentas.toFixed(2)}`, style: 'subheader' },
        { text: `Ganancia Total: Bs ${totalGanancia.toFixed(2)}`, style: 'subheader', margin: [0, 0, 0, 20] },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto', 'auto'],
            body: bodyTabla,
          },
        },
        { text: `Total de ventas registradas: ${ventas.length}`, margin: [0, 20, 0, 0] },
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
      },
    };

    return printer.createPdfKitDocument(docDefinition);
  }

  async generarReporteStockBajo() {
    const productos = await this.productoRepo.find({
      where: { activo: true },
      // CORREGIDO: usar objeto para relaciones
      relations: {
        categoria: true,
      },
    });

    const productosBajoStock = productos.filter(p => p.stock <= p.stock_minimo);
    productosBajoStock.sort((a, b) => a.stock - b.stock);

    const bodyTabla = [
      ['ID', 'Producto', 'Categoría', 'Stock Actual', 'Stock Mínimo', 'Estado'],
    ];

    for (const p of productosBajoStock) {
      bodyTabla.push([
        p.idProducto.toString(),
        p.nombre,
        p.categoria?.nombre || 'N/A',
        p.stock.toString(),
        p.stock_minimo.toString(),
        p.stock === 0 ? 'AGOTADO' : 'BAJO STOCK',
      ]);
    }

    const fonts = {
  Roboto: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique',
  },
};
    const printer = new PdfPrinter(fonts);

    const docDefinition = {
      content: [
        { text: 'Reporte de Productos con Stock Bajo', style: 'header', alignment: 'center' },
        { text: `Fecha: ${new Date().toLocaleDateString()}`, alignment: 'center', margin: [0, 0, 0, 20] },
        { text: `Productos agotados: ${productosBajoStock.filter(p => p.stock === 0).length}`, margin: [0, 5, 0, 5] },
        { text: `Total productos en alerta: ${productosBajoStock.length}`, margin: [0, 5, 0, 20] },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*', 'auto', 'auto', 'auto'],
            body: bodyTabla,
          },
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
      },
    };

    return printer.createPdfKitDocument(docDefinition);
  }

  async generarReporteTotalVendido(fechaInicio?: string, fechaFin?: string) {
  try {
    let whereVentaCondition: any = {};
    
    if (fechaInicio && fechaFin) {
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);
      fin.setHours(23, 59, 59, 999);
      whereVentaCondition = { fechaVenta: Between(inicio, fin) };
    }

    // ✅ Formato correcto de relaciones
    const ventas = await this.ventaRepo.find({
      where: whereVentaCondition,
      relations: {
        detalles: {
          producto: true,
        },
      },
    });

    const detalles = ventas.flatMap(v => v.detalles || []);

    if (detalles.length === 0) {
      const fonts = {
        Roboto: {
          normal: 'Helvetica',
          bold: 'Helvetica-Bold',
          italics: 'Helvetica-Oblique',
          bolditalics: 'Helvetica-BoldOblique',
        },
      };
      const printer = new PdfPrinter(fonts);
      
      const docDefinition = {
        content: [
          { text: 'Reporte de Productos Vendidos', style: 'header', alignment: 'center' },
          { text: `Fecha: ${new Date().toLocaleDateString()}`, alignment: 'center', margin: [0, 0, 0, 20] },
          { text: `Período: ${fechaInicio || 'Inicio'} - ${fechaFin || 'Hoy'}`, margin: [0, 5, 0, 5] },
          { text: 'No hay ventas registradas en este período', style: 'subheader', alignment: 'center', margin: [0, 20, 0, 20] },
        ],
        styles: {
          header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
          subheader: { fontSize: 14, bold: true },
        },
      };
      
      return printer.createPdfKitDocument(docDefinition);
    }

    const productosVendidos = new Map();
    
    for (const detalle of detalles) {
      const nombre = detalle.producto?.nombre || `Producto #${detalle.productoId}`;
      const cantidad = detalle.cantidad || 0;
      const subtotal = Number(detalle.subtotal) || 0;
      
      if (productosVendidos.has(nombre)) {
        const existing = productosVendidos.get(nombre);
        productosVendidos.set(nombre, {
          cantidad: existing.cantidad + cantidad,
          total: existing.total + subtotal,
        });
      } else {
        productosVendidos.set(nombre, {
          cantidad: cantidad,
          total: subtotal,
        });
      }
    }

    const productosArray = Array.from(productosVendidos.entries()).map(([nombre, data]) => ({
      nombre,
      cantidad: data.cantidad,
      total: data.total,
    }));

    productosArray.sort((a, b) => b.total - a.total);

    const bodyTabla = [
      ['Producto', 'Cantidad Vendida', 'Total Vendido (Bs)'],
    ];

    const topProductos = productosArray.slice(0, 20);
    for (const p of topProductos) {
      bodyTabla.push([p.nombre, p.cantidad.toString(), `Bs ${p.total.toFixed(2)}`]);
    }

    const totalGeneral = productosArray.reduce((sum, p) => sum + p.total, 0);
    const cantidadTotal = productosArray.reduce((sum, p) => sum + p.cantidad, 0);

    const fonts = {
      Roboto: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    };
    const printer = new PdfPrinter(fonts);

    const docDefinition = {
      content: [
        { text: 'Reporte de Productos Vendidos', style: 'header', alignment: 'center' },
        { text: `Fecha: ${new Date().toLocaleDateString()}`, alignment: 'center', margin: [0, 0, 0, 20] },
        { text: `Período: ${fechaInicio || 'Inicio'} - ${fechaFin || 'Hoy'}`, margin: [0, 5, 0, 5] },
        { text: `Total de unidades vendidas: ${cantidadTotal}`, style: 'subheader' },
        { text: `Total vendido: Bs ${totalGeneral.toFixed(2)}`, style: 'subheader', margin: [0, 5, 0, 20] },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto'],
            body: bodyTabla,
          },
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        subheader: { fontSize: 14, bold: true },
      },
    };

    return printer.createPdfKitDocument(docDefinition);
  } catch (error) {
    console.error('❌ Error generando reporte total vendido:', error);
    throw error;
  }
}
}