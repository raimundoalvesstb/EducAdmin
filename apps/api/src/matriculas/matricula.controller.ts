import { Controller, Get, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MatriculaServico } from './matricula.service';
import { Matricula } from './matricula.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('matriculas')
export class MatriculaController {
  constructor(private readonly matriculaServico: MatriculaServico) {}

  private getTenantId(req: any): string {
    return req.user?.tenant_id || req.headers['x-tenant-id'];
  }

  @Get('turma/:turmaId')
  async listarPorTurma(@Param('turmaId') turmaId: string, @Request() req: any): Promise<Matricula[]> {
    return this.matriculaServico.listarPorTurma(turmaId, this.getTenantId(req));
  }

  @Post()
  async matricular(
    @Body('alunoId') alunoId: string,
    @Body('turmaId') turmaId: string,
    @Request() req: any
  ): Promise<Matricula> {
    return this.matriculaServico.matricular(alunoId, turmaId, this.getTenantId(req));
  }
}
