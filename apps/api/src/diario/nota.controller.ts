import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotaServico } from './nota.service';
import { Nota } from './nota.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('notas')
export class NotaController {
  constructor(private readonly notaServico: NotaServico) {}

  private getTenantId(req: any): string {
    return req.user?.tenant_id || req.headers['x-tenant-id'];
  }

  @Get('avaliacao/:avaliacaoId')
  async listarPorAvaliacao(@Param('avaliacaoId') avaliacaoId: string, @Request() req: any): Promise<Nota[]> {
    return this.notaServico.listarPorAvaliacao(avaliacaoId, this.getTenantId(req));
  }

  @Post()
  async registrar(@Body() data: Partial<Nota>[], @Request() req: any): Promise<Nota[]> {
    return this.notaServico.registrar(data, this.getTenantId(req));
  }
}
