import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsuarioServico } from './usuario.service';
import { Usuario } from './usuario.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioServico: UsuarioServico) {}

  @Get(':id')
  async buscarPorId(@Param('id') id: string): Promise<Partial<Usuario> | null> {
    const usuario = await this.usuarioServico.buscarPorId(id);
    if (!usuario) return null;

    // Não retornar a senha
    const { senha_hash, ...resto } = usuario;
    return resto;
  }
}
