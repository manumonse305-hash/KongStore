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

import { ProductosService } from './productos.service';
import { CrearProductoDto } from './dto/crear-producto.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorador';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly service: ProductosService) {}
  @Roles(1, 2)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // 🔐 SOLO ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Post()
  create(@Body() dto: CrearProductoDto) {
    return this.service.create(dto);
  }

  // 🔐 SOLO ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarProductoDto,
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