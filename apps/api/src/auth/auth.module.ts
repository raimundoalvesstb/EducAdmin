import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AuthServico } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsuariosModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || (process.env.NODE_ENV === 'test' ? 'secreta_default_apenas_para_desenvolvimento' : (() => { throw new Error('JWT_SECRET is missing in environment variables'); })()),
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthServico, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
