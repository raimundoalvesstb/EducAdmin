# Guia de Instalação e Teste com Papéis (EducAdmin)

O EducAdmin usa a arquitetura SaaS Multi-Tenant. As credenciais padrões estão injetadas na migração ou seed:
- `admin@educadmin.com.br` / `admin123`
- `diretor@educadmin.com.br` / `diretor123`
- `aluno@educadmin.com.br` / `aluno123`

Seja por interface (GIF/vídeos capturados com Playwright) ou visualização em tela, cada papel terá renderizações limitadas a sua `RolesGuard`.
