import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { Roles } from 'src/auth/decorators/roles.decorador';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
  ) {}

  @Post()
 @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  create(
    @Body()
    dto: CrearUsuarioDto,
  ) {
    return this.usuariosService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  obtenerTodos() {
    return this.usuariosService.obtTodo();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  obtenerUno(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.usuariosService.obtUsuario(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  actualizar(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: ActualizarUsuarioDto,
  ) {
    return this.usuariosService.actualizar(
      id,
      dto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  eliminar(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.usuariosService.elimina(id);
  }
}