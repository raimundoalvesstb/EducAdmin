# Análise e Planejamento - EducAdmin

Este documento apresenta uma análise detalhada do estado atual do repositório em comparação com as diretrizes estabelecidas nos documentos de referência (`MANUAL_TECNICO_EducAdmin_2.md` e `GPT - DESENVOLVIMENTO DO SISTEMA EDUCADMIN.md`), bem como um plano de ação abrangente para as próximas etapas de desenvolvimento.

---

## 1. O que está pronto (Status Atual)

Atualmente, o projeto possui a estrutura inicial e a fundação técnica básica estabelecidas:

*   **Estrutura de Monorepo:** O projeto está estruturado utilizando NPM Workspaces, contendo `apps/api` (backend), `apps/web` (frontend) e `pacotes/compartilhado` (módulos compartilhados).
*   **Infraestrutura Docker:** Arquivos `docker-compose.yml` e `docker-compose.producao.yml` configurados com os serviços base: PostgreSQL (17), Redis (7), MinIO, API, Web e Nginx.
*   **Variáveis de Ambiente:** Existe um `.env.exemplo` abrangendo Banco de Dados, Redis, JWT, MinIO, Email e Multi-tenant.
*   **Backend Base (NestJS):**
    *   Projeto iniciado com NestJS, TypeORM e PostgreSQL.
    *   Configuração de banco de dados e validações de ambiente não-teste presentes (`database.config.ts`).
    *   Implementação inicial de Guards (`RolesGuard`) para RBAC básico na pasta `backend/src/auth` (inconformidade estrutural, ver abaixo).
*   **Frontend Base (Next.js):**
    *   Projeto iniciado com Next.js (App Router), React 19 e Tailwind CSS.
    *   Componente de Menu Superior básico criado (`TopMenu.tsx`).
*   **Documentação Inicial:**
    *   Arquivos `README.md`, `docs/arquitetura.md`, `docs/instalacao.md` e `docs/contribuicao.md` criados de forma resumida.

---

## 2. Inconformidades Encontradas

Em relação às exigências dos manuais, as seguintes inconformidades foram identificadas no estado atual:

*   **Inconformidade Estrutural (Backend):** O código do NestJS está fragmentado entre `apps/api/src/` e `backend/src/`. O manual especifica que não devem ser movidos arquivos para fora de suas estruturas padrão. Há arquivos isolados como `backend/src/auth/roles.guard.ts` que devem estar dentro de `apps/api/src/` para manter a integridade da aplicação.
*   **Interface Genérica no Frontend:** A tela inicial do Next.js (template padrão com logos Next e Vercel) ainda está presente em `apps/web/src/app/page.tsx`. O manual exige uma interface com identidade visual própria, abandonando clichês e adotando Glassmorphism, Neomorphism, Bento Grid e Flat Design.
*   **Ausência de Design System Rigoroso:** Embora exista suporte para tailwind, não há temas claro/escuro e de alto contraste implementados de forma coesa com a cor azul claro definida. O componente `TopMenu.tsx` é incipiente e não atende às exigências de animações (Slide, Smart Animate, comportamento de indicador líquido).
*   **Ausência de Modelagem de Negócio:** Não existem as entidades core do sistema (Tenant, Instituição, Aluno, Professor, Turma) implementadas no TypeORM ou interfaces compartilhadas.
*   **Falta de Internacionalização Estrita:** Embora o código deva ser em pt-BR (arquivos, variáveis, commits, logs), ainda há nomenclatura padrão do framework, como `.spec.ts` (aceitável para tooling) e algumas configurações geradas automaticamente.

---

## 3. O que falta desenvolver (Lacunas)

A maior parte dos requisitos funcionais, não-funcionais e arquiteturais ainda precisa ser implementada.

### Arquitetura e Segurança
*   **Camada Multi-tenant:** Implementação da segregação de dados por instituição.
*   **Autenticação Robusta:** Implementação real de JWT com refresh tokens e controle rigoroso de sessão.
*   **Auditoria Global:** Mecanismo de Logs para trilhas de auditoria, interceptors de acesso, mascaramento de dados (LGPD) e tratamento de erros padronizado.

### Frontend e UX/UI
*   **Logotipo e Identidade:** Criação do Logotipo em SVG e Design System padronizado.
*   **Menu Principal:** Implementação de Menu Superior fluido e responsivo (inspirado no indicador líquido), proibição absoluta de menus laterais fixos.
*   **Páginas e Animações:** Implementar transições fluidas usando Framer Motion entre rotas e modais.
*   **Acessibilidade e Temas:** Acessibilidade total (WCAG 2.2 AA) e alternância completa entre Claro/Escuro/Alto Contraste.
*   **Motor de Busca Global:** Busca onipresente no frontend comunicando-se de forma eficiente com o backend.

### Módulos Funcionais Obrigatórios
1.  **Gestão Institucional:** Cadastro de unidades, calendários, parametrização do MEC.
2.  **Gestão de Pessoas e Acessos:** Alunos, Responsáveis, Professores, Servidores (com RBAC granulado).
3.  **Gestão Pedagógica:** Matrículas, Turmas, Enturmação.
4.  **Diário de Classe & Notas:** Frequência, Registro de Conteúdo, Notas e Pareceres.
5.  **Relatórios e Documentos:** Histórico Escolar, Boletins (PDFs gerados).

### Documentação Legal e Conformidade
*   Implementação de consentimento, anonimização, base legal e gestão de direitos (LGPD).
*   Integrações e modelos seguindo diretrizes do MEC/BNCC.

---

## 4. Plano de Ação (Implementações, Correções e Atualizações)

Para atingir a excelência esperada no EducAdmin, as tarefas serão divididas em fases estratégicas.

### Fase 1: Correção Estrutural e Fundação (Curto Prazo)
1.  **Consolidar estrutura de Backend:** Mover o conteúdo de `backend/src/` para dentro de `apps/api/src/common/auth/` e remover a pasta duplicada para garantir a correta build da API.
2.  **Configurar Logs e Erros:** Implementar um Global Exception Filter customizado em português, logger central e documentação base da API (Swagger).
3.  **Configurar Testes:** Adicionar testes E2E e unitários para as configurações de ambiente existentes para garantir a qualidade base.

### Fase 2: Design System, UI/UX e Frontend Base
1.  **Limpeza do Template:** Substituir `page.tsx` e dependências pelo esqueleto do EducAdmin.
2.  **Temas e Tailwind:** Configurar de maneira estrita o Tailwind para suportar as diretrizes de cores (Azul Claro) e os 3 temas exigidos (Claro, Escuro, Alto Contraste).
3.  **Componentes Fundamentais:** Desenvolver o componente de Top Menu definitivo e os wrappers para Bento Grid, Glassmorphism e transições fluidas (Framer Motion).
4.  **Logotipo:** Incluir e parametrizar o logotipo padrão.

### Fase 3: Core SaaS, Segurança e Multi-tenant
1.  **Modelagem Base (Backend):** Criar entidades de Tenant, Usuário e Perfil.
2.  **Estratégia Multi-tenant:** Implementar a lógica de isolamento no TypeORM para segregar os dados e definir o contexto de conexão.
3.  **Módulo de Autenticação e LGPD:** Endpoint de login, proteção com Guards baseados em Roles, JWT, registro de auditoria inicial e tela de consentimento de privacidade.

### Fase 4: Módulos de Gestão e Pedagógico
1.  **Módulo de Instituição:** Gestão das Escolas e Parâmetros Educacionais.
2.  **Módulo de Matrículas e Turmas:** Processo de registro de alunos e alocação.
3.  **Módulo do Professor (Diário):** Implementar lógicas de Frequência, Lançamento de Notas, e Plano de Aulas.
4.  **Busca Dinâmica:** Implementação da indexação inteligente e UI de pesquisa central no frontend.

### Fase 5: Conformidade, Testes e Refinamento
1.  **Revisão de Acessibilidade:** Executar testes automatizados (Axe) e manuais (Navegação por teclado/Leitores de tela).
2.  **Auditoria Legal:** Revisar todas as requisições, retenção de logs e exclusão de dados com base na LGPD e MEC.
3.  **Testes:** Alcançar alta cobertura (E2E e Unidade) simulando cargas para escolas pequenas e redes.
4.  **Deploy e Empacotamento:** Finalizar scripts Docker para instalação On-Premise simplificada (One-click install/Script sh) e setup do SaaS.

---

## 5. Conclusão

O projeto possui uma infraestrutura base adequada com tecnologias de ponta, aderindo ao princípio de custo zero. No entanto, é necessário um esforço considerável para adequar a arquitetura ao modelo Multi-tenant, implementar a interface altamente qualificada solicitada e, principalmente, desenvolver toda a vasta gama de módulos escolares conforme a legislação vigente, exigindo acompanhamento constante de diretrizes técnicas e legais.
