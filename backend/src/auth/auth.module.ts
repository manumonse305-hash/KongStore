import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Usuario } from '../usuarios/entidades/usuario.entity';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';
import { JwtStrategy } from './jwt.strategy';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
    ]),

    PassportModule,

    JwtModule.register({
      secret:
        'mi_clave_super_secreta',

      signOptions: {
        expiresIn: '8h',
      },
    }),
    LogsModule
  ],

  controllers: [
    AuthController,
  ],

  providers: [
    AuthService,
    JwtStrategy,
    RolesGuard,
  ],
})
export class AuthModule {}