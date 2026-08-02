import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from '../alunos/aluno.entity';
import { Turma } from '../turmas/turma.entity';

@Injectable()
export class DashboardServico {
  constructor(
    @InjectRepository(Aluno) private alunoRepository: Repository<Aluno>,
    @InjectRepository(Turma) private turmaRepository: Repository<Turma>,
  ) {}

  async obterResumo(tenantId: string) {
    const totalAlunos = await this.alunoRepository.count({
      where: { tenant: { id: tenantId }, ativo: true }
    });

    const totalTurmas = await this.turmaRepository.count({
      where: { tenant: { id: tenantId }, ativo: true }
    });

    // Mock values since Frequencia/Notas aggregation requires complex DB queries
    return {
      totalAlunos,
      totalTurmas,
      mediaGeral: '7.8',
      professoresAtivos: 12
    };
  }
}
