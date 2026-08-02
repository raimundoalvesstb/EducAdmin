import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from './aluno.entity';

@Injectable()
export class AlunoServico {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
  ) {}

  async listarPorTenant(tenantId: string): Promise<Aluno[]> {
    return this.alunoRepository.find({
      where: { tenant: { id: tenantId } },
      order: { nomeCompleto: 'ASC' },
    });
  }

  async buscarPorId(id: string, tenantId: string): Promise<Aluno> {
    const aluno = await this.alunoRepository.findOne({
      where: { id, tenant: { id: tenantId } }
    });

    if (!aluno) {
      throw new NotFoundException(`Aluno não encontrado no sistema desta instituição.`);
    }
    return aluno;
  }

  async criar(alunoData: Partial<Aluno>, tenantId: string): Promise<Aluno> {
    const novoAluno = this.alunoRepository.create({
      ...alunoData,
      tenant: { id: tenantId },
    });
    return this.alunoRepository.save(novoAluno);
  }

  async atualizar(id: string, alunoData: Partial<Aluno>, tenantId: string): Promise<Aluno> {
    const aluno = await this.buscarPorId(id, tenantId);
    Object.assign(aluno, alunoData);
    return this.alunoRepository.save(aluno);
  }

  async remover(id: string, tenantId: string): Promise<void> {
    const aluno = await this.buscarPorId(id, tenantId);
    await this.alunoRepository.remove(aluno);
  }
}
