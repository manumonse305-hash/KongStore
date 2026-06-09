import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import type { Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsuarioActual } from './decorators/usuario-actual.decorador';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}


  @Post('login')
login(
  @Body()
  dto: LoginDto,

  @Req()
  req: Request,
) {
  return this.authService.login(
    dto,
    req.ip || '',
    req.headers['user-agent'] || '',
  );
}


@UseGuards(AuthGuard('jwt'))
@Post('logout')
logout(
  @UsuarioActual() usuario: any,
  @Req() req: Request,
) {
  console.log('USUARIO JWT:', usuario);

  return this.authService.logout(
    usuario.id,
    req.ip || '',
    req.headers['user-agent'] || '',
  );
}
}