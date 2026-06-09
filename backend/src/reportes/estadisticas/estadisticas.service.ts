import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Venta } from '../../ventas/entidades/venta.entity';
import { DetalleVenta } from '../../ventas/entidades/detalle-venta.entity';
import { Producto } from '../../productos/entidades/producto.entity';

@Injectable()
export class EstadisticasService {
  constructor(
    @InjectRepository(Venta)
    private ventaRepo: Repository<Venta>,
    @InjectRepository(DetalleVenta)
    private detalleVentaRepo: Repository<DetalleVenta>,
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
  ) {}

  // Ventas por día de la semana
  async getVentasPorDia() {
    const ventas = await this.ventaRepo.find();
    
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const ventasPorDia: number[] = [0, 0, 0, 0, 0, 0, 0];
    
    for (const venta of ventas) {
      const dia = new Date(venta.fechaVenta).getDay();
      ventasPorDia[dia] += Number(venta.total);
    }
    
    return {
      labels: dias,
      datasets: [
        {
          label: 'Ventas por Día (Bs)',
          data: ventasPorDia,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  }

  // Top 5 productos más vendidos
  async getTopProductos() {
    const detalles = await this.detalleVentaRepo.find({
      relations: { producto: true },
    });
    
    const productosVendidos = new Map<string, number>();
    
    for (const detalle of detalles) {
      const nombre = detalle.producto.nombre;
      const cantidad = productosVendidos.get(nombre) || 0;
      productosVendidos.set(nombre, cantidad + detalle.cantidad);
    }
    
    const top5 = Array.from(productosVendidos.entries())
      .map(([nombre, cantidad]) => ({ nombre, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 5);
    
    return {
      labels: top5.map(p => p.nombre),
      datasets: [
        {
          label: 'Unidades Vendidas',
          data: top5.map(p => p.cantidad),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  // Ventas por mes (últimos 6 meses)
  async getVentasPorMes() {
    const hoy = new Date();
    const meses: string[] = [];
    const ventasPorMes: number[] = [];
    
    for (let i = 5; i >= 0; i--) {
      const fecha = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
      const mesInicio = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
      const mesFin = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);
      
      const total = await this.ventaRepo.sum('total', {
        fechaVenta: Between(mesInicio, mesFin),
      });
      
      const nombreMes = mesInicio.toLocaleString('es', { month: 'long', year: 'numeric' });
      meses.push(nombreMes);
      ventasPorMes.push(total || 0);
    }
    
    return {
      labels: meses,
      datasets: [
        {
          label: 'Ventas por Mes (Bs)',
          data: ventasPorMes,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }

  // Productos con stock bajo (para gráfico de alerta)
  async getStockBajoGrafico() {
    const productos = await this.productoRepo.find({
      where: { activo: true },
    });
    
    const conStock = productos.filter(p => p.stock > p.stock_minimo).length;
    const bajoStock = productos.filter(p => p.stock <= p.stock_minimo && p.stock > 0).length;
    const agotados = productos.filter(p => p.stock === 0).length;
    
    return {
      labels: ['Stock Normal', 'Stock Bajo', 'Agotados'],
      datasets: [
        {
          label: 'Estado de Inventario',
          data: [conStock, bajoStock, agotados],
          backgroundColor: [
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(255, 99, 132, 0.5)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  // Dashboard completo (todos los datos para el frontend)
  async getDashboard() {
    const [ventasPorDia, topProductos, ventasPorMes, stockBajo] = await Promise.all([
      this.getVentasPorDia(),
      this.getTopProductos(),
      this.getVentasPorMes(),
      this.getStockBajoGrafico(),
    ]);
    
    const totalVentas = await this.ventaRepo.sum('total') || 0;
    const totalProductos = await this.productoRepo.count({ where: { activo: true } });
    const gananciaTotal = await this.ventaRepo.sum('ganancia') || 0;
    
    return {
      resumen: {
        totalVentas,
        totalProductos,
        gananciaTotal,
      },
      graficos: {
        ventasPorDia,
        topProductos,
        ventasPorMes,
        stockBajo,
      },
    };
  }
}