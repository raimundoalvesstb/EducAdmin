import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matricula } from './matricula.entity';
import { MatriculaServico } from './matricula.service';
import { MatriculaController } from './matricula.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Matricula])],
  providers: [MatriculaServico],
  controllers: [MatriculaController],
  exports: [MatriculaServico],
})
export class MatriculasModule {}
