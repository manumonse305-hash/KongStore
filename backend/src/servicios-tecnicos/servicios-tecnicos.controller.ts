import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ServiciosTecnicosService } from './servicios-tecnicos.service';
import { CrearServicioDto } from './dto/crear-servicio.dto';
import { ActualizarServicioDto } from './dto/actualizar-servicio.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorador';

@Controller('servicios-tecnicos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServiciosTecnicosController {
  constructor(private readonly service: ServiciosTecnicosService) {}

  @Roles(1, 2)
  @Get()
  findAll(@Query('estadoId') estadoId?: string, @Query('clienteId') clienteId?: string) {
    if (estadoId) {
      return this.service.findByEstado(+estadoId);
    }
    if (clienteId) {
      return this.service.findByCliente(+clienteId);
    }
    return this.service.findAll();
  }

  @Roles(1, 2)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Roles(1, 2)
  @Post()
  create(@Body() dto: CrearServicioDto) {
    return this.service.create(dto);
  }

  @Roles(1,2)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarServicioDto) {
    return this.service.update(id, dto);
  }

  @Roles(1)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}