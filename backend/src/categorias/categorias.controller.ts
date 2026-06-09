import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { CategoriasService } from './categorias.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorador';
import { CrearCategoriaDto } from './dto/craear-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly service: CategoriasService) {}

  // 🔓 TODOS AUTENTICADOS PUEDEN VER
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // 🔐 SOLO ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Post()
  create(@Body() dto: CrearCategoriaDto) {
    return this.service.create(dto);
  }

  // 🔐 SOLO ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CrearCategoriaDto,
  ) {
    return this.service.update(id, dto);
  }

  // 🔐 SOLO ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}