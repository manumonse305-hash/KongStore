import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { LogsService } from './logs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorador';

@Controller('logs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Roles(1) // Solo ADMIN
  @Get()
  async findAll() {
    return this.logsService.findAll();
  }

  @Roles(1)
  @Get('usuario/:id')
  async findByUser(@Param('id', ParseIntPipe) id: number) {
    return this.logsService.findByUser(id);
  }
}