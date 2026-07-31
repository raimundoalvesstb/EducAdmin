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
2. Suba a infraestrutura via Docker (ajuste os serviços conforme necessário):
   ```bash
   docker compose up -d postgres redis minio
   ```
3. Rode a API (backend) em modo de desenvolvimento:
   ```bash
   npm run dev:api
   ```
4. Rode o frontend (web) em modo de desenvolvimento:
   ```bash
   npm run dev:web
   ```

## Documentação

Para mais detalhes, consulte a documentação disponível na pasta `docs/`:
- [Guia de Instalação](docs/instalacao.md)
- [Arquitetura do Sistema](docs/arquitetura.md)
- [Guia de Contribuição](docs/contribuicao.md)
