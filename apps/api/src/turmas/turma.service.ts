import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turma } from './turma.entity';

@Injectable()
export class TurmaServico {
  constructor(
    @InjectRepository(Turma)
    private turmaRepository: Repository<Turma>,
  ) {}

  async listarPorTenant(tenantId: string): Promise<Turma[]> {
    return this.turmaRepository.find({
      where: { tenant: { id: tenantId } },
      relations: { serie: true },
      order: { nome: 'ASC' },
    });
  }

  async buscarPorId(id: string, tenantId: string): Promise<Turma> {
    const turma = await this.turmaRepository.findOne({
      where: { id, tenant: { id: tenantId } },
      relations: { serie: true }
    });

    if (!turma) throw new NotFoundException('Turma não encontrada');
    return turma;
  }

  async criar(data: Partial<Turma>, tenantId: string): Promise<Turma> {
    const novaTurma = this.turmaRepository.create({
      ...data,
      tenant: { id: tenantId },
    });
    return this.turmaRepository.save(novaTurma);
  }
}
