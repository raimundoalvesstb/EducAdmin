import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthServico } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authServico: AuthServico) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: Record<string, any>) {
    const usuario = await this.authServico.validarUsuario(signInDto.email, signInDto.senha);
    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return this.authServico.login(usuario);
  }
}
