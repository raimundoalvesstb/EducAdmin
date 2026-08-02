import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  const createMockExecutionContext = (user?: any): ExecutionContext => {
    return {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          user: user,
        }),
      }),
    } as unknown as ExecutionContext;
  };

  it('should return true if no roles are required', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
    const context = createMockExecutionContext();

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should return true if requiredRoles is an empty array', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([]);
    const context = createMockExecutionContext();

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should return false if roles are required but there is no user', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['ADMINISTRADOR']);
    const context = createMockExecutionContext(undefined);

    expect(guard.canActivate(context)).toBe(false);
  });

  it('should return false if user has no papel property', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['ADMINISTRADOR']);
    const context = createMockExecutionContext({ id: 1 });

    expect(guard.canActivate(context)).toBe(false);
  });

  it('should return false if user does not have required papel', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['ADMINISTRADOR']);
    const context = createMockExecutionContext({ id: 1, papel: 'PROFESSOR' });

    expect(guard.canActivate(context)).toBe(false);
  });

  it('should return true if user has required papel', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['ADMINISTRADOR', 'PROFESSOR']);
    const context = createMockExecutionContext({ id: 1, papel: 'ADMINISTRADOR' });

    expect(guard.canActivate(context)).toBe(true);
  });
});