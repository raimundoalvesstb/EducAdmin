# Relatório de Análise e Planejamento: Sistema EducAdmin

Este documento apresenta uma análise técnica minuciosa da base de código atual do projeto **EducAdmin** em contraste direto com as definições arquiteturais, legais, visuais e sistêmicas expressas nos documentos *MANUAL_TECNICO_EducAdmin_2.md* e *GPT - DESENVOLVIMENTO DO SISTEMA EDUCADMIN.md*.

O objetivo é expor o status de desenvolvimento real do repositório (o que está pronto), o que falta ser desenvolvido (lacunas e novos recursos a serem implementados), bem como mapear erros, inconsistências, e detalhar as próximas etapas.

---

## 1. Status do Projeto: O que está pronto e o que falta

### Checklist: Recursos Prontos (Total ou Parcialmente)

- [x] **Arquitetura de Monorepo:** Estruturação básica usando NPM Workspaces (apps/api, apps/web).
- [x] **Infraestrutura em Containers (Docker):** Serviços básicos mapeados via `docker-compose.yml` (PostgreSQL 17, Redis 7, MinIO, API, Web, Nginx) sem necessidade de instalação local complexa.
- [x] **Variáveis de Ambiente:** Definições base via `.env.exemplo` para serviços chave.
- [x] **Backend Base (NestJS):** Inicialização do projeto e configuração do banco (TypeORM) com PostgreSQL.
- [x] **Entidades Básicas (Backend):** Modelos definidos no TypeORM para `Tenant`, `Usuario`, `Aluno`, `Turma`, `Matricula`, `Serie`, `Nota`, `Frequencia`, e `Avaliacao`.
- [x] **Autenticação Base (Backend):** JWT Strategy (`jwt.strategy.ts`) inicial, modulo e controllers criados.
- [x] **Controllers Básicos (Backend):** Endpoints REST CRUD base para módulos como Alunos, Notas, Turmas e Usuários.
- [x] **Frontend Base (Next.js):** Inicialização do Next.js (App Router, React 19) e integração com Tailwind CSS v4.
- [x] **Menu Superior (TopMenu):** Componente de barra superior no frontend, implementando animações com Framer Motion (Slide/Move) em substituição a menus laterais clichês, além de suporte inicial para alternância de temas (Claro, Escuro, Alto Contraste).

### Checklist: O que FALTA Desenvolver (Lacunas Críticas)

- [ ] **Integração Real Multi-Tenant:** A extração de `tenant_id` e o isolamento total de dados no banco (seja por schema ou coluna com filtragem global estrita) ainda é superficial. As entidades referenciam Tenants, mas não existe um filtro automatizado global seguro, forçando o controle nos services (risco de vazamento).
- [ ] **Módulo Completo de LGPD:** Faltam fluxos de consentimento, exclusão definitiva/anonimização de dados, gestão de trilha de auditoria para ações de usuários sensíveis e relatórios para titulares de dados.
- [ ] **Mecanismo Robusto de Roles/Permissões:** O sistema de papéis (RolesGuard) tem arquivos declarados (ex: `roles.guard.ts`), mas a injeção nas rotas, testes e granularidade necessária para os múltiplos papéis (Diretor, Coordenador, etc.) está rudimentar.
- [ ] **Design System - "Não pareça um ERP comum":** Apesar do suporte a temas no Tailwind e do TopMenu inicial, a interface das páginas (Dashboard, Alunos, Turmas) ainda não existe. Faltam Bento Grids e estilização Glassmorphism nas telas. A página inicial (`ClientLayout.tsx`) ainda é genérica.
- [ ] **Módulo Escolar Core Conforme MEC:** Falta a regra de negócio para a montagem e progressão do calendário escolar, enturmação real com validação de vagas, geração de Diário de Classe oficial, relatórios de conselho de classe e emissão de Histórico Escolar em PDF assinado.
- [ ] **Motor de Busca Dinâmica e Global:** Indexação e busca transversal (alunos, notas, documentos) no frontend, possivelmente exigindo otimizações no backend.
- [ ] **Testes E2E (Backend e Frontend):** Ausência de cobertura significativa em E2E (o Next.js nem sequer tem comando de teste mapeado, retornando erro de *echo* no `package.json`).

---

## 2. Inconsistências, Erros, Dicas e Observações

Abaixo, detalhamos problemas críticos e não críticos (inconsistências) em comparação com o Manual Técnico:

| Recurso / Módulo | Descrição do Problema / Inconsistência | Erro ou Desvio da Regra | Dicas / Observações / Correções Recomendadas |
| :--- | :--- | :--- | :--- |
| **Pasta Backend vs. apps/api** | Estruturação de diretórios confusa. No log inicial e no `list_files`, percebe-se resquícios de arquivos soltos na raiz ou em pastas nomeadas `backend/` separadas da workspace `apps/api/`. | **Arquitetural.** Foge do padrão de monorepo onde a API inteira deve estar sob `apps/api`. | Mover todos os artefatos NestJS da pasta solta `backend/` e unificar dentro de `apps/api/src/`. Apagar diretórios redundantes. |
| **Proteção Multi-Tenant (Service)** | Os services, como `aluno.service.ts`, recebem o `tenantId` nos parâmetros de métodos (`buscarPorId`). O Controller chama `getTenantId(req)` que retira do JWT. | **Vulnerabilidade/Manutenção.** Pode haver esquecimento e vazamento de dados. | Implementar injeção global de tenant (Scoped provider) ou interceptor/subscriber do TypeORM para isolar o `tenant_id` magicamente nas queries, evitando código repetitivo e prevenindo falhas humanas de isolamento (SaaS compliance). |
| **JWT Secret em Produção** | No `auth.module.ts`, o `JWT_SECRET` lança erro caso ausente, porém a lógica da função throw inline (`(() => { throw new Error(...) })()`) é sintaticamente desajeitada no provider estático do Nest. | **Código Limpo/Padrões.** O módulo precisa usar `ConfigModule` dinâmico (`JwtModule.registerAsync`) ao invés de ler `process.env` no momento do import. | Refatorar para `JwtModule.registerAsync({ imports: [ConfigModule], inject: [ConfigService], useFactory: (config) => ({ secret: config.get('JWT_SECRET'), ... }) })` para seguir as boas práticas NestJS. |
| **Testes no Frontend** | No `package.json` de `apps/web`, o script `test` diz `"echo \"No tests specified for frontend yet\""`. | **Regra Não Atendida.** Os manuais exigem testes para cada desenvolvimento. | Configurar o Jest com `@testing-library/react` na pasta `apps/web` e escrever testes para o `TopMenu` e layouts. |
| **Idiomas Mistos** | Alguns arquivos misturam nomenclatura. O manual pede português brasileiro. Pastas usam `auth`, `common`, `dashboard`, mas as entidades usam `diario`, `usuarios`, `alunos`. | **Conformidade de Nomenclatura.** Mistura inglês/português. | Padronizar as pastas para `autenticacao`, `comum`, `painel`, etc., mantendo exceções apenas para nomes restritos a framework. |
| **CORS e Next.js URLs** | O `main.ts` no backend usa CORS apontando para `http://localhost:3001` quando o Frontend padrão do docker usa as vezes a mesma porta. No docker compose: frontend=3001, backend=3000. No main.ts: backend=3001. | **Conflito de Porta.** Falha de conexão entre Front e Back devido à divergência de portas hardcoded no código vs. Docker. | Consertar `main.ts` do backend para rodar na porta 3000 (ou pegar rigorosamente do `process.env.PORT`), enquanto o Next.js roda na 3001. Corrigir as URLs de API e CORS baseando-se estritamente nas env vars do Compose. |

---

## 3. Próximo Passo Sugerido

Com base na filosofia de desenvolvimento, nas prioridades do manual e para resolver as inconsistências sistêmicas críticas primeiro (garantindo estabilidade antes de construir novas telas):

**Próximo Passo (Obrigatório e Prioritário):**
*Refatorar o Core do Backend (SaaS Multi-tenant e Segurança).*

1.  **Resolver Conflitos de Ambiente:** Corrigir as portas hardcoded em `main.ts` (API deve escutar na porta 3000, e o Frontend na 3001), alinhando com as configurações do `docker-compose.yml`. Atualizar o CORS dinamicamente com base em variáveis.
2.  **Unificar Monorepo:** Deletar qualquer pasta residual (ex: diretório `backend/` na raiz) garantindo que 100% da lógica server-side esteja exclusivamente em `apps/api`.
3.  **Configuração Dinâmica NestJS:** Refatorar o `AppModule`, `AuthModule` e Database para usar obrigatoriamente o `@nestjs/config` com `registerAsync`, eliminando o acesso estático não testável a `process.env`.
4.  **Isolamento Global Tenant (SaaS):** Refatorar os controllers/serviços de forma a injetar o Tenant via Request Scope ou implementar um filtro global no TypeORM, removendo a necessidade de passar o `tenantId` manualmente em todo e qualquer método, o que é altamente suscetível a erros de vazamento de dados.

Uma vez que esse pilar arquitetônico for validado (rodando os testes em seguida), a etapa posterior será a concepção do Design System no Frontend.
