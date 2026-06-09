import { Controller, Post, Get, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CrearVentaDto } from './dto/crear-venta.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorador';
import { UsuarioActual } from 'src/auth/decorators/usuario-actual.decorador';

@Controller('ventas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VentasController {
  constructor(private readonly service: VentasService) {}

  @Roles(1, 2)
  @Post()
  create(@Body() dto: CrearVentaDto, @UsuarioActual() usuario: any) {
    // ✅ Cambiar usuario.id por usuario.idUsuario
    console.log('Usuario recibido:', usuario); // Debug
    return this.service.crearVenta(dto, usuario.idUsuario);
  }

  @Roles(1,2)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Roles(1, 2)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
}