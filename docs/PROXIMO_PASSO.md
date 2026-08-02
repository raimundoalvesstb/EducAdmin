# Recomendação: Próximo Passo do Desenvolvimento

Com a base estrutural, de testes, segurança e a arquitetura multilocatária (Multi-Tenant) sanadas na camada de infraestrutura backend e frontend, o projeto **EducAdmin** encontra-se em um estado maduro para iniciar o desenvolvimento tangível de produto.

Baseado nas prioridades do `MANUAL_TECNICO_EducAdmin_2.md` e na *Fase 2* descrita no Relatório de Análise (criado anteriormente), o melhor caminho a seguir agora é a **Padronização do Design System e Limpeza da Interface Genérica (Frontend)**.

### Por que este é o melhor próximo passo?

1. **Evitar Retrabalho de UX:** Construir lógicas de negócio no frontend (como páginas de Turmas, Matrículas e Notas) usando interfaces provisórias causará a necessidade de reescrever todo o HTML/CSS posteriormente.
2. **Cumprimento Direto do Manual:** O manual é extremamente rígido quanto ao visual (exige abandono de menus laterais clichês, foco em azul claro, temas Escuro/Alto Contraste, Glassmorphism e Bento Grid). É imperativo que isso seja estruturado em "wrappers" ou "layouts" globais antes das telas existirem.
3. **Visibilidade do SaaS:** O maior impacto imediato para validação de produto é ter a carcaça SaaS da aplicação acessível, navegável, fluida (Framer Motion) e altamente responsiva.

---

### O Que Fazer Exatamente (Tarefas Sugeridas):

1. **Limpeza do App Router (`page.tsx` base):**
   - Substituir a atual tela padrão gerada pelo Next.js (que ainda possui o logotipo do Next/Vercel) por um Dashboard base com a identidade do EducAdmin (Bento Grid layout vazio, preparado para receber Widgets).

2. **Criação do Design System Core (Tailwind + CSS):**
   - Garantir que as variáveis de cor (CSS properties em `globals.css`) reflitam rigorosamente a cor azul claro principal e as variações precisas para os temas Claro, Escuro e Alto Contraste.
   - Criar componentes base reutilizáveis (`Button`, `Input`, `Card/GlassCard`, `Modal`) utilizando as animações exigidas pelo manual (Smart Animate, Slide In/Out, Fade, Zoom) através da biblioteca já instalada `framer-motion`.

3. **Refino do TopMenu e Logotipo:**
   - O `TopMenu` construído está próximo do modelo "Indicador Líquido", mas o projeto requer a construção de um logotipo oficial (preferencialmente SVG inline) versão quadrada (apenas símbolo) e horizontal, integrando-o nativamente à interface e ao favicon.

4. **Teste de Acessibilidade (Frontend):**
   - Junto da criação do Design System, aplicar diretrizes WCAG 2.2 AA (foco visível, navegação por teclado correta), e escrever os testes unitários (`@testing-library/react`) para atestar o funcionamento de botões e transições de tema sem quebra de contraste.

Somente após esta fundação visual estar cimentada, deveremos seguir para a **Fase 3: Construção dos Módulos Funcionais e Relatórios do MEC (Diários de Classe, Histórico Escolar, Matrículas, etc).**