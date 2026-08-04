# EducAdmin
O EducAdmin constitui um sistema de gestão escolar de código aberto (open source) concebido de forma minuciosa para unificar e otimizar os processos administrativos, pedagógicos e financeiros de instituições de ensino.

## Pré-requisitos

Para rodar o projeto localmente, você precisará ter instalado:
- **Node.js**
- **Docker** e **Docker Compose** (para os serviços de infraestrutura como PostgreSQL, Redis, MinIO)

## Instalação e Uso via Docker

Para instalar e rodar o projeto rapidamente usando Docker:

1. Clone o repositório e acesse a pasta do projeto.
2. Configure as variáveis de ambiente:
   ```bash
   cp .env.exemplo .env
   ```
   *(Ajuste o arquivo `.env` conforme necessário)*
3. Inicie os serviços:
   ```bash
   docker compose up -d
   ```

## Desenvolvimento Local

Se você deseja desenvolver no EducAdmin e rodar as aplicações localmente:

1. Instale as dependências na raiz do projeto:
   ```bash
   npm install
   ```
2. Suba a infraestrutura via Docker (ajuste os serviços conforme necessário). Recomendamos fortemente utilizar a versão `postgres:17-alpine` no seu arquivo `docker-compose.yml` para evitar erros de permissão de overlayfs em ambientes restritos:
   ```bash
   docker compose up -d postgres redis minio
   ```
3. Rode a API (backend) em modo de desenvolvimento, mas **ATENÇÃO**: é necessário usar `ts-node` ou compilar antes, devido ao suporte a TypeScript enums no workspaces:
   ```bash
   npm run build --workspace=@educadmin/compartilhado
   npm run build --workspace=api
   npm run start:prod --workspace=api
   ```
4. Rode o frontend (web) em modo de desenvolvimento (porta 3001 por padrão):
   ```bash
   npm run dev:web
   ```

## Utilização e Papéis (Instruções detalhadas de navegação)

O EducAdmin possui um controle avançado de Multi-Tenant e Papéis. Para uso normal e visualização detalhada dos recursos, você pode utilizar os seguintes usuários e perfis:

| Papel | Email | Senha | Acesso Funcional |
| :--- | :--- | :--- | :--- |
| **Administrador** | admin@educadmin.com.br | admin123 | Total (Dashboard completo, Alunos, Turmas, Matrículas, Configurações, Diário) |
| **Diretor** | diretor@educadmin.com.br | diretor123 | Amplo (Dashboard completo, Alunos, Turmas, Matrículas, Diário) |
| **Aluno** | aluno@educadmin.com.br | aluno123 | Restrito (Dashboard simplificado, Diário/Notas apenas do próprio aluno) |

**Exemplo de Fluxo (Vídeos e GIFs)**:
Devido a limitações com headless browser recording em certos sandboxes, caso você queira gerar *GIFs* e capturas de tela interativas da sua simulação de papéis, criamos um script automatizado via Playwright que percorre essas telas e grava o fluxo:

1. Assegure-se que o backend e frontend estão rodando.
2. Instale `Pillow` e `playwright` (`pip install playwright Pillow`, `playwright install chromium`).
3. Escreva um script como fornecido no repositório (`test_screenshots.py`) para iterar nas credenciais acima e gravar imagens por estado (`/login`, `/alunos`, `/turmas`, `/diario`).
4. Utilize `Pillow` para compilar o GIF animado simulando uso por cada papel.

## Documentação

Para mais detalhes, consulte a documentação disponível na pasta `docs/`:
- [Guia de Instalação](docs/instalacao.md)
- [Arquitetura do Sistema](docs/arquitetura.md)
- [Guia de Contribuição](docs/contribuicao.md)
