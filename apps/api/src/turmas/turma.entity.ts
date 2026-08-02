import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';
import { Serie } from '../series/serie.entity';

export enum TurnoTurma {
  MATUTINO = 'MATUTINO',
  VESPERTINO = 'VESPERTINO',
  NOTURNO = 'NOTURNO',
  INTEGRAL = 'INTEGRAL',
}

@Entity('turmas')
export class Turma {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ name: 'ano_letivo' })
  anoLetivo: number;

  @Column({ type: 'enum', enum: TurnoTurma })
  turno: TurnoTurma;

  @Column({ default: 40 })
  capacidade: number;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;

  @ManyToOne(() => Serie)
  @JoinColumn({ name: 'serie_id' })
  serie: Serie;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;
}
