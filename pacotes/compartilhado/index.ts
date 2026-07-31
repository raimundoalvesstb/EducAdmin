export interface IRetornoPadrao<T> {
  sucesso: boolean;
  mensagem: string;
  dados?: T;
  codigo?: string;
}

export type PapelUsuario = 'super_admin' | 'admin_escola' | 'diretor' | 'coordenador' | 'secretario' | 'professor' | 'aluno' | 'responsavel' | 'gestor_rede' | 'tecnico';
