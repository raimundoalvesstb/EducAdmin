import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentTenant = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // O tenant_id é populado na request pelo JwtStrategy via validate(payload)
    return request.user?.tenant_id;
  },
);