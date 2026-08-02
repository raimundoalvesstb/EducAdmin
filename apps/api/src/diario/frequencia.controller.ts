import { Controller, Get, Post, Body, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FrequenciaServico } from './frequencia.service';
import { Frequencia } from './frequencia.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('frequencias')
export class FrequenciaController {
  constructor(private readonly frequenciaServico: FrequenciaServico) {}

  private getTenantId(req: any): string {
    return req.user?.tenant_id || req.headers['x-tenant-id'];
  }

  @Get()
  async listar(
    @Query('turmaId') turmaId: string,
    @Query('dataAula') dataAulaStr: string,
    @Request() req: any
  ): Promise<Frequencia[]> {
    const dataAula = new Date(dataAulaStr);
    return this.frequenciaServico.listarPorTurmaEData(turmaId, dataAula, this.getTenantId(req));
  }

  @Post()
  async registrar(@Body() data: Partial<Frequencia>[], @Request() req: any): Promise<Frequencia[]> {
    return this.frequenciaServico.registrar(data, this.getTenantId(req));
  }
}
