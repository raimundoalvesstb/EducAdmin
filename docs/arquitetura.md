# Arquitetura do EducAdmin

A arquitetura utiliza:
- **Backend**: NestJS (TypeScript) com PostgreSQL e TypeORM, Redis e BullMQ.
- **Frontend**: Next.js 15+ (App Router).
- **Implantação**: Docker e Docker Compose, projetado para uso multi-tenant no esquema de schemas por banco.

## Princípios
- Clean Architecture
- DDD
- Acessibilidade (WCAG)
- Design fluido e adaptável (pt-BR)
