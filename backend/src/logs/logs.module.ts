import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogAcceso } from './entidades/log-acceso.entity';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LogAcceso])],
  controllers: [LogsController],  // ← importante
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}