import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';
import { Matricula } from '../matriculas/matricula.entity';
import { Avaliacao } from './avaliacao.entity';

@Entity('notas')
export class Nota {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  valor: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;

  @ManyToOne(() => Matricula)
  @JoinColumn({ name: 'matricula_id' })
  matricula: Matricula;

  @ManyToOne(() => Avaliacao)
  @JoinColumn({ name: 'avaliacao_id' })
  avaliacao: Avaliacao;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;
}
