import { Controller, UseGuards, Post, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorador';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { ComprasService } from './compras.service';
import { CrearCompraDto } from './dto/crear-compra.dto';
import { UsuarioActual } from 'src/auth/decorators/usuario-actual.decorador';

@Controller('compras')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ComprasController {
  constructor(private readonly service: ComprasService) {}

  @Roles(1, 2) // ADMIN y VENDEDOR pueden ver
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Roles(1, 2)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Roles(1,2) // Solo ADMIN puede crear compras
  @Post()
  create(@Body() dto: CrearCompraDto, @UsuarioActual() usuario: any) {
    return this.service.crearCompra(dto, usuario.idUsuario);
  }
}