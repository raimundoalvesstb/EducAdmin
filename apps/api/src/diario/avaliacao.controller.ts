import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AvaliacaoServico } from './avaliacao.service';
import { Avaliacao } from './avaliacao.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('avaliacoes')
export class AvaliacaoController {
  constructor(private readonly avaliacaoServico: AvaliacaoServico) {}

  private getTenantId(req: any): string {
    return req.user?.tenant_id;
  }

  @Get('turma/:turmaId')
  async listarPorTurma(@Param('turmaId') turmaId: string, @Request() req: any): Promise<Avaliacao[]> {
    return this.avaliacaoServico.listarPorTurma(turmaId, this.getTenantId(req));
  }

  @Post()
  async criar(@Body() data: Partial<Avaliacao>, @Request() req: any): Promise<Avaliacao> {
    return this.avaliacaoServico.criar(data, this.getTenantId(req));
  }
}
