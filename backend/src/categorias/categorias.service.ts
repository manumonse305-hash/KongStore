import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entidades/categoria.entity';
import { CrearCategoriaDto } from './dto/craear-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly repo: Repository<Categoria>,
  ) {}

  create(dto: CrearCategoriaDto) {
    const categoria = this.repo.create(dto);
    return this.repo.save(categoria);
  }

  findAll() {
    return this.repo.find({ where: { activo: true } });
  }

  async findOne(id: number) {
    const cat = await this.repo.findOne({ where: { idCategoria: id } });
    if (!cat) throw new NotFoundException('Categoría no encontrada');
    return cat;
  }

  async update(id: number, dto: CrearCategoriaDto) {
    const cat = await this.findOne(id);
    Object.assign(cat, dto);
    return this.repo.save(cat);
  }

  async remove(id: number) {
    const cat = await this.findOne(id);
    cat.activo = false;
    return this.repo.save(cat);
  }
}