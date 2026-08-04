import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const isTestEnv = configService.get('NODE_ENV') === 'test';
    const secret = configService.get('JWT_SECRET');

    if (!secret && !isTestEnv) {
      throw new Error('A variável de ambiente JWT_SECRET é obrigatória.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret || 'secreta_default_apenas_para_desenvolvimento',
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email, papel: payload.papel, tenant_id: payload.tenant_id };
  }
}
