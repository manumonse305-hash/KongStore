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

import { RolesService } from './roles.service';
import { RolDto } from './dto/rol.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorador';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
  ) {}

  @Post()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(1)
  crear(
    @Body() dto: RolDto,
  ) {
    return this.rolesService.crear(dto);
  }

  @Get()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(1)
  obtenerTodos() {
    return this.rolesService.obtenerTodos();
  }

  @Get(':id')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(1)
  obtenerUno(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.rolesService.obtenerUno(id);
  }

  @Patch(':id')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(1)
  actualizar(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: RolDto,
  ) {
    return this.rolesService.actualizar(
      id,
      dto,
    );
  }

  @Delete(':id')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(1)
  eliminar(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.rolesService.eliminar(id);
  }
}