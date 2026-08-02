import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DashboardServico } from './dashboard.service';

@UseGuards(AuthGuard('jwt'))
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardServico: DashboardServico) {}

  private getTenantId(req: any): string {
    return req.user?.tenant_id || req.headers['x-tenant-id'];
  }

  @Get('resumo')
  async obterResumo(@Request() req: any) {
    return this.dashboardServico.obterResumo(this.getTenantId(req));
  }
}
