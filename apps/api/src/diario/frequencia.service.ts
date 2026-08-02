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
    const frequencias = data.map(f => this.frequenciaRepository.create({
      ...f,
      tenant: { id: tenantId },
    }));
    return this.frequenciaRepository.save(frequencias);
  }
}
