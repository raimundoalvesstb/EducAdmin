import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioServico } from './usuario.service';
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuarioServico],
  controllers: [UsuarioController],
  exports: [UsuarioServico],
})
export class UsuariosModule {}
