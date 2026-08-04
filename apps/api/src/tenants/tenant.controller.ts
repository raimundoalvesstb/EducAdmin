import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TenantServico } from './tenant.service';
import { Tenant } from './tenant.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PapelUsuario } from '@educadmin/compartilhado';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantServico: TenantServico) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(PapelUsuario.ADMINISTRADOR)
  async listar(): Promise<Tenant[]> {
    return this.tenantServico.listarTodos();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(PapelUsuario.ADMINISTRADOR)
  async buscarPorId(@Param('id') id: string): Promise<Tenant> {
    return this.tenantServico.buscarPorId(id);
  }
}
