import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TenantServico } from './tenant.service';
import { Tenant } from './tenant.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantServico: TenantServico) {}

  @Get()
  async listarTodos(): Promise<Tenant[]> {
    return this.tenantServico.listarTodos();
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string): Promise<Tenant> {
    return this.tenantServico.buscarPorId(id);
  }
}
