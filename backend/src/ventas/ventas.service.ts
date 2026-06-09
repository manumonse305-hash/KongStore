import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Venta } from './entidades/venta.entity';
import { DetalleVenta } from './entidades/detalle-venta.entity';
import { Producto } from '../productos/entidades/producto.entity';
import { DetalleCompra } from '../compras/detalle-compra.entity';
import { CrearVentaDto } from './dto/crear-venta.dto';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventaRepo: Repository<Venta>,
    @InjectRepository(DetalleVenta)
    private detalleRepo: Repository<DetalleVenta>,
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
    @InjectRepository(DetalleCompra)
    private detalleCompraRepo: Repository<DetalleCompra>,
    private dataSource: DataSource,
  ) {}

  async crearVenta(dto: CrearVentaDto, usuarioId: number) {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    let totalVenta = 0;
    let costoTotalVenta = 0;
    
    // ✅ Tipar explícitamente el array
    const detallesParaGuardar: {
      productoId: number;
      cantidad: number;
      precioUnitario: number;
      subtotal: number;
    }[] = [];

    for (const detalleDto of dto.detalles) {
      const producto = await this.productoRepo.findOne({
        where: { idProducto: detalleDto.productoId },
      });

      if (!producto) {
        throw new NotFoundException(`Producto ${detalleDto.productoId} no encontrado`);
      }
      if (producto.stock < detalleDto.cantidad) {
        throw new BadRequestException(`Stock insuficiente para ${producto.nombre}`);
      }

      // Obtener el último costo de compra del producto
      const ultimoDetalleCompra = await this.detalleCompraRepo.findOne({
        where: { id_producto: detalleDto.productoId },
        order: { idDetalle: 'DESC' },
      });

      const costoUnitarioProducto = ultimoDetalleCompra?.costo_unitario || 0;
      const costoDetalle = detalleDto.cantidad * costoUnitarioProducto;
      costoTotalVenta += costoDetalle;

      const subtotal = detalleDto.cantidad * detalleDto.precioUnitario;
      totalVenta += subtotal;

      // Restar stock
      producto.stock -= detalleDto.cantidad;
      await queryRunner.manager.save(producto);

      detallesParaGuardar.push({
        productoId: detalleDto.productoId,
        cantidad: detalleDto.cantidad,
        precioUnitario: detalleDto.precioUnitario,
        subtotal,
      });
    }

    const ganancia = totalVenta - costoTotalVenta;

    const venta = this.ventaRepo.create({
      usuarioId,
      total: totalVenta,
      costo_total: costoTotalVenta,
      ganancia,
    });
    const ventaGuardada = await queryRunner.manager.save(venta);

    for (const det of detallesParaGuardar) {
      const detalle = this.detalleRepo.create({
        ventaId: ventaGuardada.id,
        productoId: det.productoId,
        cantidad: det.cantidad,
        precioUnitario: det.precioUnitario,
        subtotal: det.subtotal,
      });
      await queryRunner.manager.save(detalle);
    }

    await queryRunner.commitTransaction();
    return {
      mensaje: 'Venta registrada correctamente',
      ventaId: ventaGuardada.id,
      total: totalVenta,
      ganancia,
    };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}

  async findAll() {
    return this.ventaRepo.find({
      relations: {
        detalles: {
          producto: true,
        },
        usuario: true,
      },
      order: {
        fechaVenta: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const venta = await this.ventaRepo.findOne({
      where: { id },
      relations: {
        detalles: {
          producto: true,
        },
        usuario: true,
      },
    });
    if (!venta) throw new NotFoundException('Venta no encontrada');
    return venta;
  }
}