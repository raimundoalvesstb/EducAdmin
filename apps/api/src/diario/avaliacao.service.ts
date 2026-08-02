import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avaliacao } from './avaliacao.entity';

@Injectable()
export class AvaliacaoServico {
  constructor(
    @InjectRepository(Avaliacao)
    private avaliacaoRepository: Repository<Avaliacao>,
  ) {}

  async listarPorTurma(turmaId: string, tenantId: string): Promise<Avaliacao[]> {
    return this.avaliacaoRepository.find({
      where: {
        turma: { id: turmaId },
        tenant: { id: tenantId }
      },
      order: { dataAvaliacao: 'DESC' },
    });
  }

  async criar(data: Partial<Avaliacao>, tenantId: string): Promise<Avaliacao> {
    const novaAvaliacao = this.avaliacaoRepository.create({
      ...data,
      tenant: { id: tenantId },
    });
    return this.avaliacaoRepository.save(novaAvaliacao);
  }
}
