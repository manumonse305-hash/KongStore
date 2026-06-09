import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { DetalleCompra } from './detalle-compra.entity';
import { CrearCompraDto } from './dto/crear-compra.dto';
import { Compra } from './entidades/compra.entity';
import { Producto } from 'src/productos/entidades/producto.entity';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(Compra)
    private compraRepo: Repository<Compra>,

    @InjectRepository(DetalleCompra)
    private detalleRepo: Repository<DetalleCompra>,

    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,

    private dataSource: DataSource,
  ) {}

  async crearCompra(dto: CrearCompraDto, usuarioId: number) {
  // Crear la compra con total temporal 0
  const compra = this.compraRepo.create({
    proveedorId: dto.proveedorId,
    usuarioId: usuarioId,
    total: 0, // ← Temporal, se actualizará después
  });

  const compraGuardada = await this.compraRepo.save(compra);
  
  let totalCompra = 0;

  for (const detalleDto of dto.detalles) {
    const producto = await this.productoRepo.findOne({
      where: { idProducto: detalleDto.productoId },
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${detalleDto.productoId} no encontrado`);
    }

    producto.stock = (producto.stock ?? 0) + detalleDto.cantidad;
    await this.productoRepo.save(producto);

    const subtotal = detalleDto.cantidad * detalleDto.costoUnitario;
    totalCompra += subtotal;

    const detalle = this.detalleRepo.create({
      id_compra: compraGuardada.compraId,
      id_producto: detalleDto.productoId,
      cantidad: detalleDto.cantidad,
      costo_unitario: detalleDto.costoUnitario,
      subtotal: subtotal,
    });

    await this.detalleRepo.save(detalle);
  }

  // ✅ Actualizar el total de la compra
  compraGuardada.total = totalCompra;
  await this.compraRepo.save(compraGuardada);

  return {
    mensaje: 'Compra registrada correctamente',
    id: compraGuardada.compraId,
    total: totalCompra,
  };
}

  // ✅ Agregar este método
  async findAll() {
    return this.compraRepo.find({
      relations: {
        proveedor: true,
        usuario: true,
        detalles: {
          producto: true,
        },
      },
      order: {
        fechaCompra: 'DESC',
      },
    });
  }

  // ✅ Agregar este método
  async findOne(id: number) {
    const compra = await this.compraRepo.findOne({
      where: { compraId: id },
      relations: {
        proveedor: true,
        usuario: true,
        detalles: {
          producto: true,
        },
      },
    });
    
    if (!compra) {
      throw new NotFoundException('Compra no encontrada');
    }
    return compra;
  }
}