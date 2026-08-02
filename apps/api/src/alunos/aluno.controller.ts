import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AlunoServico } from './aluno.service';
import { Aluno } from './aluno.entity';
import { CurrentTenant } from '../auth/decorators/current-tenant.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PapelUsuario } from '../usuarios/usuario.entity';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoServico: AlunoServico) {}

  @Get()
  @Roles(PapelUsuario.DIRETOR, PapelUsuario.COORDENADOR, PapelUsuario.SECRETARIO, PapelUsuario.PROFESSOR)
  async listarTodos(@CurrentTenant() tenantId: string): Promise<Aluno[]> {
    return this.alunoServico.listarPorTenant(tenantId);
  }

  @Get(':id')
  @Roles(PapelUsuario.DIRETOR, PapelUsuario.COORDENADOR, PapelUsuario.SECRETARIO, PapelUsuario.PROFESSOR)
  async buscarPorId(
    @Param('id') id: string,
    @CurrentTenant() tenantId: string,
  ): Promise<Aluno> {
    return this.alunoServico.buscarPorId(id, tenantId);
  }

  @Post()
  @Roles(PapelUsuario.DIRETOR, PapelUsuario.SECRETARIO)
  async criar(
    @Body() alunoData: Partial<Aluno>,
    @CurrentTenant() tenantId: string,
  ): Promise<Aluno> {
    return this.alunoServico.criar(alunoData, tenantId);
  }

  @Put(':id')
  @Roles(PapelUsuario.DIRETOR, PapelUsuario.SECRETARIO)
  async atualizar(
    @Param('id') id: string,
    @Body() alunoData: Partial<Aluno>,
    @CurrentTenant() tenantId: string,
  ): Promise<Aluno> {
    return this.alunoServico.atualizar(id, alunoData, tenantId);
  }

  @Delete(':id')
  @Roles(PapelUsuario.DIRETOR, PapelUsuario.SECRETARIO)
  async remover(
    @Param('id') id: string,
    @CurrentTenant() tenantId: string,
  ): Promise<void> {
    return this.alunoServico.remover(id, tenantId);
  }
}