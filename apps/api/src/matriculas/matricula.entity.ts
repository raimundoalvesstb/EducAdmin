import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';
import { Aluno } from '../alunos/aluno.entity';
import { Turma } from '../turmas/turma.entity';

export enum StatusMatricula {
  ATIVA = 'ATIVA',
  INATIVA = 'INATIVA',
  TRANSFERIDO = 'TRANSFERIDO',
  CONCLUIDA = 'CONCLUIDA',
}

@Entity('matriculas')
export class Matricula {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'data_matricula', type: 'date' })
  dataMatricula: Date;

  @Column({ type: 'enum', enum: StatusMatricula, default: StatusMatricula.ATIVA })
  status: StatusMatricula;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;

  @ManyToOne(() => Aluno)
  @JoinColumn({ name: 'aluno_id' })
  aluno: Aluno;

  @ManyToOne(() => Turma)
  @JoinColumn({ name: 'turma_id' })
  turma: Turma;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;
}
