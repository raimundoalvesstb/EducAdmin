import { Controller, Get, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TurmaServico } from './turma.service';
import { Turma } from './turma.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('turmas')
export class TurmaController {
  constructor(private readonly turmaServico: TurmaServico) {}

  private getTenantId(req: any): string {
    return req.user?.tenant_id || req.headers['x-tenant-id'];
  }

  @Get()
  async listarTodos(@Request() req: any): Promise<Turma[]> {
    return this.turmaServico.listarPorTenant(this.getTenantId(req));
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string, @Request() req: any): Promise<Turma> {
    return this.turmaServico.buscarPorId(id, this.getTenantId(req));
  }

  @Post()
  async criar(@Body() data: Partial<Turma>, @Request() req: any): Promise<Turma> {
    return this.turmaServico.criar(data, this.getTenantId(req));
  }
}
