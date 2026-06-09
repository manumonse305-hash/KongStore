import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CrearClienteDto } from './dto/crear-cliente.dto';
import { ActualizarClienteDto } from './dto/actualizar-cliente.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorador';

@Controller('clientes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientesController {
  constructor(private readonly service: ClientesService) {}

  @Roles(1, 2) // ADMIN y VENDEDOR pueden listar clientes
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Roles(1, 2)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Roles(1, 2) // Ambos pueden crear clientes
  @Post()
  create(@Body() dto: CrearClienteDto) {
    return this.service.create(dto);
  }

  @Roles(1,2) // Solo ADMIN puede actualizar
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarClienteDto) {
    return this.service.update(id, dto);
  }

  @Roles(1) // Solo ADMIN puede eliminar (baja lógica)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}