import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './aluno.entity';
import { AlunoServico } from './aluno.service';
import { AlunoController } from './aluno.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno])],
  providers: [AlunoServico],
  controllers: [AlunoController],
  exports: [AlunoServico],
})
export class AlunosModule {}
