import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrearProductoDto } from './dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto'; // ← Importar
import { Producto } from './entidades/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly repo: Repository<Producto>,
  ) {}

  create(dto: CrearProductoDto) {
    const producto = this.repo.create({
      ...dto,
      id_categoria: dto.id_categoria,
      stock: 0, // Stock inicial en 0
    });
    return this.repo.save(producto);
  }

  findAll() {
    return this.repo.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findOne(id: number) {
    const producto = await this.repo.findOne({
      where: { idProducto: id },
      relations: { categoria: true },
    });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    return producto;
  }

  async update(id: number, dto: ActualizarProductoDto) { // ← Cambiar el tipo del DTO
    const producto = await this.findOne(id);

    // Actualizar solo los campos que vienen en el DTO
    if (dto.nombre !== undefined) producto.nombre = dto.nombre;
    if (dto.descripcion !== undefined) producto.descripcion = dto.descripcion;
    if (dto.precio_venta !== undefined) producto.precio_venta = dto.precio_venta;
    if (dto.stock_minimo !== undefined) producto.stock_minimo = dto.stock_minimo;
    if (dto.id_categoria !== undefined) producto.id_categoria = dto.id_categoria;
    if (dto.activo !== undefined) producto.activo = dto.activo;

    return this.repo.save(producto);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    producto.activo = false;
    return this.repo.save(producto);
  }
}