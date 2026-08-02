import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Frequencia } from './frequencia.entity';

@Injectable()
export class FrequenciaServico {
  constructor(
    @InjectRepository(Frequencia)
    private frequenciaRepository: Repository<Frequencia>,
  ) {}

  async listarPorTurmaEData(turmaId: string, dataAula: Date, tenantId: string): Promise<Frequencia[]> {
    return this.frequenciaRepository.find({
      where: {
        matricula: { turma: { id: turmaId } },
        dataAula: dataAula,
        tenant: { id: tenantId }
      },
      relations: { matricula: { aluno: true } },
    });
  }

  async registrar(data: Partial<Frequencia>[], tenantId: string): Promise<Frequencia[]> {
    const frequenciasSalvas: Frequencia[] = [];

    for (const item of data) {
      const matriculaId = item.matricula?.id;
      const dataAula = item.dataAula;

      if (!matriculaId || !dataAula) continue;

      let freqExistente = await this.frequenciaRepository.findOne({
        where: {
          matricula: { id: matriculaId },
          dataAula: dataAula,
          tenant: { id: tenantId }
        }
      });

      if (freqExistente) {
        freqExistente.presenca = item.presenca!;
        freqExistente.observacao = item.observacao || freqExistente.observacao;
        frequenciasSalvas.push(await this.frequenciaRepository.save(freqExistente));
      } else {
        const novaFreq = this.frequenciaRepository.create({
          ...item,
          tenant: { id: tenantId },
        });
        frequenciasSalvas.push(await this.frequenciaRepository.save(novaFreq));
      }
    }

    return frequenciasSalvas;
  }
}
