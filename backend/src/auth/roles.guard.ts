import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.roles || user.roles.length === 0) {
      return false; // Usuário não autenticado ou sem permissões
    }

    // Otimização de performance: Quando as listas são maiores, converter para Set melhora a performance
    // para tempo O(N). Aqui usamos requiredRoles no Set pois geralmente será a menor lista de permissões
    // exigidas e user.roles iterado. No entanto, o custo de criar o Set para listas pequenas domina.
    // Assim, usamos um fallback:
    if (requiredRoles.length > 5 && user.roles.length > 10) {
      const requiredRolesSet = new Set(requiredRoles);
      return user.roles.some((role: string) => requiredRolesSet.has(role));
    }

    return requiredRoles.some((role: string) => user.roles.includes(role));
  }
}
