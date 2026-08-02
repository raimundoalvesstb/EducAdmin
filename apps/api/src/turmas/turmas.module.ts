import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turma } from './turma.entity';
import { TurmaServico } from './turma.service';
import { TurmaController } from './turma.controller';
import { Serie } from '../series/serie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Turma, Serie])],
  providers: [TurmaServico],
  controllers: [TurmaController],
  exports: [TurmaServico],
})
export class TurmasModule {}
