import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AlunoServico } from './aluno.service';
import { Aluno } from './aluno.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoServico: AlunoServico) {}

  // Nota: No futuro, pegaremos o tenantId do Request (JWT do usuário logado)
  // Para testes e estrutura base, usaremos um header ou query temporário se necessário,
  // mas o padrão ideal é injetar a partir do usuário autenticado.

  // Extrai o tenant_id assumindo que o JWT envia o ID da instituição
  // (req.user é preenchido pelo JwtStrategy)
  private getTenantId(req: any): string {
    return req.user?.tenant_id;
  }

  @Get()
  async listarTodos(@Request() req: any): Promise<Aluno[]> {
    return this.alunoServico.listarPorTenant(this.getTenantId(req));
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string, @Request() req: any): Promise<Aluno> {
    return this.alunoServico.buscarPorId(id, this.getTenantId(req));
  }

  @Post()
  async criar(@Body() alunoData: Partial<Aluno>, @Request() req: any): Promise<Aluno> {
    return this.alunoServico.criar(alunoData, this.getTenantId(req));
  }

  @Put(':id')
  async atualizar(@Param('id') id: string, @Body() alunoData: Partial<Aluno>, @Request() req: any): Promise<Aluno> {
    return this.alunoServico.atualizar(id, alunoData, this.getTenantId(req));
  }

  @Delete(':id')
  async remover(@Param('id') id: string, @Request() req: any): Promise<void> {
    return this.alunoServico.remover(id, this.getTenantId(req));
  }
}
