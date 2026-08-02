import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Matricula, StatusMatricula } from './matricula.entity';

@Injectable()
export class MatriculaServico {
  constructor(
    @InjectRepository(Matricula)
    private matriculaRepository: Repository<Matricula>,
  ) {}

  async listarPorTurma(turmaId: string, tenantId: string): Promise<Matricula[]> {
    return this.matriculaRepository.find({
      where: {
        turma: { id: turmaId },
        tenant: { id: tenantId }
      },
      relations: { aluno: true },
      order: { aluno: { nomeCompleto: 'ASC' } },
    });
  }

  async matricular(alunoId: string, turmaId: string, tenantId: string): Promise<Matricula> {
    const novaMatricula = this.matriculaRepository.create({
      aluno: { id: alunoId },
      turma: { id: turmaId },
      tenant: { id: tenantId },
      dataMatricula: new Date(),
      status: StatusMatricula.ATIVA
    });
    return this.matriculaRepository.save(novaMatricula);
  }
}
