export interface IRetornoPadrao<T> {
  sucesso: boolean;
  mensagem: string;
  dados?: T;
  codigo?: string;
}

export enum PapelUsuario {
  ADMINISTRADOR = 'ADMINISTRADOR',
  DIRETOR = 'DIRETOR',
  COORDENADOR = 'COORDENADOR',
  SECRETARIO = 'SECRETARIO',
  PROFESSOR = 'PROFESSOR',
  ALUNO = 'ALUNO',
  RESPONSAVEL = 'RESPONSAVEL',
}
