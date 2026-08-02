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
    const notasSalvas: Nota[] = [];

    for (const item of data) {
      const matriculaId = item.matricula?.id;
      const avaliacaoId = item.avaliacao?.id;

      if (!matriculaId || !avaliacaoId) continue;

      let notaExistente = await this.notaRepository.findOne({
        where: {
          matricula: { id: matriculaId },
          avaliacao: { id: avaliacaoId },
          tenant: { id: tenantId }
        }
      });

      if (notaExistente) {
        notaExistente.valor = item.valor!;
        notasSalvas.push(await this.notaRepository.save(notaExistente));
      } else {
        const novaNota = this.notaRepository.create({
          ...item,
          tenant: { id: tenantId },
        });
        notasSalvas.push(await this.notaRepository.save(novaNota));
      }
    }

    return notasSalvas;
  }
}
