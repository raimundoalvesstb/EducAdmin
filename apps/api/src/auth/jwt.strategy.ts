import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || (process.env.NODE_ENV === 'test' ? 'secreta_default_apenas_para_desenvolvimento' : (() => { throw new Error('JWT_SECRET is missing in environment variables'); })()),
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
