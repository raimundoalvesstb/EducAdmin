import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from './nota.entity';

@Injectable()
export class NotaServico {
  constructor(
    @InjectRepository(Nota)
    private notaRepository: Repository<Nota>,
  ) {}

  async listarPorAvaliacao(avaliacaoId: string, tenantId: string): Promise<Nota[]> {
    return this.notaRepository.find({
      where: {
        avaliacao: { id: avaliacaoId },
        tenant: { id: tenantId }
      },
      relations: { matricula: { aluno: true } },
    });
  }

  async registrar(data: Partial<Nota>[], tenantId: string): Promise<Nota[]> {
    const notas = data.map(n => this.notaRepository.create({
      ...n,
      tenant: { id: tenantId },
    }));
    // TODO: Ideally, we should perform an upsert here to avoid duplicate grades
    return this.notaRepository.save(notas);
  }
}
