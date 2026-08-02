import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';

export enum PapelUsuario {
  ADMINISTRADOR = 'ADMINISTRADOR',
  DIRETOR = 'DIRETOR',
  COORDENADOR = 'COORDENADOR',
  SECRETARIO = 'SECRETARIO',
  PROFESSOR = 'PROFESSOR',
  ALUNO = 'ALUNO',
  RESPONSAVEL = 'RESPONSAVEL',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome_completo' })
  nomeCompleto: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha_hash: string;

  @Column({
    type: 'enum',
    enum: PapelUsuario,
    default: PapelUsuario.ALUNO,
  })
  papel: PapelUsuario;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;
}
