import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from '../alunos/aluno.entity';
import { Turma } from '../turmas/turma.entity';
import { DashboardServico } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno, Turma])],
  providers: [DashboardServico],
  controllers: [DashboardController],
})
export class DashboardModule {}
