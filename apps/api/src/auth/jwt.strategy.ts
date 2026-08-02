import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const isTestEnv = configService.get<string>('NODE_ENV') === 'test';
    let secretOrKey = configService.get<string>('JWT_SECRET');

    if (!secretOrKey) {
      if (isTestEnv) {
        secretOrKey = 'secreta_default_apenas_para_desenvolvimento';
      } else {
        throw new Error('JWT_SECRET is missing in environment variables');
      }
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      papel: payload.papel,
      tenant_id: payload.tenant_id
    };
  }
}