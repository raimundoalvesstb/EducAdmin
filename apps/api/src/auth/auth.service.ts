import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioServico } from '../usuarios/usuario.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthServico {
  constructor(
    private usuarioServico: UsuarioServico,
    private jwtService: JwtService,
  ) {}

  async validarUsuario(email: string, senha: string): Promise<any> {
    const usuario = await this.usuarioServico.buscarPorEmail(email);
    if (usuario && bcrypt.compareSync(senha, usuario.senha_hash)) {
      const { senha_hash: _, ...resultado } = usuario;
      return resultado;
    }
    return null;
  }

  async login(usuario: any) {
    const payload = { email: usuario.email, sub: usuario.id, papel: usuario.papel };
    return {
      access_token: this.jwtService.sign(payload),
      usuario,
    };
  }
}
