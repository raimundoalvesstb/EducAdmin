import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AuthServico } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsuariosModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isTestEnv = configService.get('NODE_ENV') === 'test';
        const secret = configService.get('JWT_SECRET');

        if (!secret && !isTestEnv) {
          throw new Error('A variável de ambiente JWT_SECRET é obrigatória.');
        }

        return {
          secret: secret || 'secreta_default_apenas_para_desenvolvimento',
          signOptions: { expiresIn: '1d' },
        };
      },
    }),
  ],
  providers: [AuthServico, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
