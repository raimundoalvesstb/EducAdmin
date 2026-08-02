import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';
import { Matricula } from '../matriculas/matricula.entity';

export enum TipoPresenca {
  PRESENTE = 'PRESENTE',
  FALTA = 'FALTA',
  FALTA_JUSTIFICADA = 'FALTA_JUSTIFICADA',
}

@Entity('frequencias')
export class Frequencia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'data_aula', type: 'date' })
  dataAula: Date;

  @Column({ type: 'enum', enum: TipoPresenca, default: TipoPresenca.PRESENTE })
  presenca: TipoPresenca;

  @Column({ nullable: true })
  observacao: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;

  @ManyToOne(() => Matricula)
  @JoinColumn({ name: 'matricula_id' })
  matricula: Matricula;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;
}
