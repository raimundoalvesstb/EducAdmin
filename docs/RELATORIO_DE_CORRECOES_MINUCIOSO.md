# Relatório Minucioso de Correções: Sistema EducAdmin

Este relatório detalha todas as inconsistências, discrepâncias arquiteturais, falhas de segurança e não-conformidades encontradas na base de código atual do projeto **EducAdmin** em relação às diretrizes estabelecidas no `MANUAL_TECNICO_EducAdmin_2.md` e `GPT - DESENVOLVIMENTO DO SISTEMA EDUCADMIN.md`.

A correção destes pontos é mandatória para garantir o funcionamento do sistema sem erros, com segurança robusta e alinhamento com a visão arquitetural definida (Monorepo, SaaS Multi-Tenant, Conformidade Legal, Design System e Qualidade de Código).

---

## 1. Problemas Estruturais e de Arquitetura (Monorepo)

### 1.1 Diretório `backend` residual
- **Problema:** Existe um diretório `/backend` na raiz do projeto (contendo `src/auth/roles.guard.ts` e `roles.decorator.ts`) que concorre com o diretório oficial da API (`/apps/api`). O arquivo `backend/src/auth/roles.guard.ts` inclusive diverge da implementação em `apps/api/src/auth/guards/roles.guard.ts`.
- **Ação Corretiva:** O diretório `/backend` deve ser completamente removido. Todo o código do backend (NestJS) deve residir exclusivamente dentro de `/apps/api`.

### 1.2 Inconsistência de Tipos Compartilhados (Shared Packages)
- **Problema:** O arquivo `pacotes/compartilhado/index.ts` define o tipo `PapelUsuario` como uma *Union Type* com valores em minúsculo (ex: `'super_admin' | 'admin_escola' | ...`). No entanto, o backend (`apps/api/src/usuarios/usuario.entity.ts`) define `PapelUsuario` como um `Enum` com valores em maiúsculo (ex: `ADMINISTRADOR = 'ADMINISTRADOR'`).
- **Ação Corretiva:** O backend deve consumir o tipo/enum centralizado em `pacotes/compartilhado`, e a nomenclatura/valores deve ser unificada em todo o projeto.

---

## 2. Falhas de Configuração, Ambiente e Portas

### 2.1 Conflito de Portas no Backend (`main.ts` vs `docker-compose.yml`)
- **Problema:** No arquivo `apps/api/src/main.ts`, a aplicação NestJS está configurada para iniciar na porta `3001` (com um comentário afirmando que isso evita conflito com o front em 3000). Porém, no `docker-compose.yml`, a API está mapeada para a porta `3000` (`EDUCADMIN_PORTA_API`) e o Web (Frontend) para a porta `3001` (`EDUCADMIN_PORTA_WEB`). Isso quebra a comunicação e a inicialização.
- **Ação Corretiva:** Em `apps/api/src/main.ts`, o backend deve escutar rigorosamente na porta definida pela variável de ambiente `PORT` ou `EDUCADMIN_PORTA_API` (sendo `3000` o padrão). A política de CORS deve apontar para o frontend dinamicamente (`process.env.CORS_ORIGIN` ou `http://localhost:3001`).

### 2.2 Uso Inadequado de Variáveis de Ambiente no NestJS
- **Problema:** Módulos chave como `AuthModule` (`apps/api/src/auth/auth.module.ts`) e o arquivo `database.config.ts` lêem variáveis de ambiente de forma estática usando `process.env`. O `AppModule` sequer importa o `ConfigModule` do `@nestjs/config`. A lógica com funções inline lançando exceção no import (ex: `(() => { throw new Error(...) })()`) é incorreta e acopla o sistema.
- **Ação Corretiva:**
  1. Instalar e configurar o `@nestjs/config` globalmente no `AppModule`.
  2. Substituir `JwtModule.register` por `JwtModule.registerAsync`, injetando o `ConfigService` para obter os segredos de forma segura.
  3. Ajustar a injeção da configuração do banco de dados para utilizar `TypeOrmModule.forRootAsync` junto com uma `Factory` e o `ConfigService`.

---

## 3. Segurança e SaaS (Multi-Tenant)

### 3.1 Falha no Isolamento Multi-Tenant (Vulnerabilidade Crítica)
- **Problema:** O isolamento de dados das instituições (Tenants) depende de repasses manuais de `tenantId` nos parâmetros dos métodos dos *Services* (ex: `AlunoServico.buscarPorId`). O controller extrai do request e passa pro service. Isso viola o princípio "Security by Design". Se um programador esquecer de passar o `tenantId` na cláusula `where`, ocorrerá vazamento de dados inter-institucional.
- **Ação Corretiva:** Implementar isolamento global no NestJS/TypeORM. Injetar o Tenant na requisição (Request Scoped) e/ou utilizar um mecanismo automático (ex: *TypeORM subscriber* ou injeção de repositórios customizados) para anexar a cláusula `{ tenant: { id: tenantId } }` obrigatoriamente a todas as queries daquela requisição.

### 3.2 Lógica de Roles (Guards) Inconsistente
- **Problema:** A validação de papéis em `apps/api/src/auth/guards/roles.guard.ts` possui um bypass global `if (user?.papel === PapelUsuario.ADMINISTRADOR) { return true; }`. Essa abordagem hardcoded pode causar problemas de manutenção quando o SaaS expandir para diferentes níveis hierárquicos. Além disso, as rotas atuais não estão decoradas rigorosamente.
- **Ação Corretiva:** Estabelecer um sistema de permissões mais modular. Reavaliar a injeção do RolesGuard no nível global ou nos controladores e padronizar as anotações `@Roles()`.

---

## 4. Frontend (Next.js, UX/UI e Testes)

### 4.1 Falta de Testes Automatizados no Frontend
- **Problema:** O `package.json` de `apps/web` possui o script `"test": "echo \"No tests specified for frontend yet\""`, desrespeitando frontalmente a diretriz de desenvolvimento guiado por testes.
- **Ação Corretiva:** Configurar e implementar testes com Jest e React Testing Library (`@testing-library/react`) na workspace `apps/web`. A pipeline não deve passar sem testes básicos de renderização (ex: do componente `TopMenu`).

### 4.2 Falhas no Design System e Temas
- **Problema:** Apesar do manual especificar estilos visuais baseados em *Glassmorphism*, *Neomorphism*, *Flat Design* e *Bento Grid*, e o suporte obrigatório para tema Claro, Escuro e Alto Contraste, as páginas (ex: `apps/web/src/app/page.tsx`) não refletem os padrões visuais exigidos. O layout padrão ainda possui elementos genéricos e falta coerência temática estrita no Tailwind.
- **Ação Corretiva:**
  1. Implementar provedores de tema consistentes para suportar Claro, Escuro e Alto Contraste via Tailwind CSS.
  2. Estruturar os componentes de UI (`apps/web/src/components/ui/`) e refatorar as páginas para utilizar a estrutura de Bento Grid e Glassmorphism conforme idealizado.

### 4.3 Comunicação Frontend -> Backend
- **Problema:** Em instâncias locais ou docker, as requisições API estão despadronizadas ou ausentes de configurações centrais dinâmicas.
- **Ação Corretiva:** Garantir que todos os *fetches* e requisições do Next.js utilizem o `process.env.NEXT_PUBLIC_API_URL` definido no `.env` do ambiente, lidando corretamente com o roteamento estático (Server Components) e dinâmico (Client Components).

---

## 5. Falhas de Negócio e Funcionalidades Ausentes (LGPD e MEC)

### 5.1 Ausência de Recursos Críticos da LGPD
- **Problema:** A LGPD exige anonimização, direito de esquecimento e log de auditoria. Tais logs (trilhas de auditoria) não foram previstos na arquitetura base das Entidades do backend.
- **Ação Corretiva:** Criar módulo/tabela de `Auditoria` (ou Log de Sistema) para gravar alterações em dados sensíveis. Implementar endpoints/serviços de exportação de dados do titular e rotinas de ofuscação/anonimização de registros em vez de deleção bruta, mantendo a integridade do banco.

### 5.2 Lógica Pedagógica Incompleta
- **Problema:** As entidades `Diario` (Nota, Frequencia, Avaliacao) estão simplificadas. Faltam regras para enturmação, calendário letivo, e aprovação/reprovação conforme diretrizes do MEC (BNCC).
- **Ação Corretiva:** Modelar as regras de negócio de `Bimestre/Semestre`, `Calendario Letivo`, `Componente Curricular (Materia)`, bem como lógica de upsert (para evitar frequências/notas duplicadas em caso de reenvio de dados).

---

## Conclusão e Priorização

**Ação Imediata (Bloqueante):**
1. Apagar o diretório `/backend` legado.
2. Sincronizar o Enum/Tipagem entre `pacotes/compartilhado` e `apps/api`.
3. Arrumar as portas em `main.ts` e `docker-compose.yml`.
4. Refatorar a configuração do `AppModule` do NestJS para usar `@nestjs/config` corretamente, eliminando `process.env` hardcoded.
5. Inserir a biblioteca de testes no `apps/web`.

Após estas correções fundamentais, deve-se prosseguir com o isolamento global de Tenant e a adequação visual no Next.js.
