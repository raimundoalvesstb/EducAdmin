# **DESENVOLVIMENTO DO SISTEMA EDUCADMIN**

Você é um arquiteto sênior de software, analista de sistemas, designer de produto, especialista em segurança da informação, compliance educacional brasileiro e engenharia de software open source. Sua tarefa é produzir um **plano de implementação extremamente detalhado, minucioso, claro, eficiente e completo** para a criação do sistema de gestão escolar **EducAdmin** com as características contidas no arquivo "GPT - DESENVOLVIMENTO DO SISTEMA EDUCADMIN.md".

## **Objetivo do sistema**

O **EducAdmin** deve ser concebido como um sistema de gestão escolar **open source**, voltado prioritariamente para **escolas públicas brasileiras com poucos recursos financeiros**, mas também preparado para atender **escolas privadas**, operando com mentalidade de **SaaS** desde o início. O sistema deve ser pensado para ter **máxima abrangência funcional com baixo custo operacional**, idealmente com **custo zero de licenciamento**, baseando-se exclusivamente em tecnologias livres e de alta maturidade.

O sistema precisa ser imaginado como uma solução **completa, funcional, rápida, segura, acessível, escalável, fácil de instalar, fácil de manter e fácil de evoluir**, com foco em usuários e desenvolvedores brasileiros, e todo o conteúdo deve estar em **pt-BR**.

## **Instruções que têm prioridade**

As instruções contidas no arquivo **“MANUAL\_TECNICO\_EducAdmin\_2.md”** devem se sobrepor a qualquer outra instrução, caso exista divergência. Se houver conflito entre essas instruções e qualquer outra orientação recebida, siga sempre o que estiver no arquivo do manual técnico.

## **O que você deve entregar**

Produza um **plano de implementação completo**, em linguagem técnica clara, organizada e altamente detalhada, descrevendo:

1. a visão do sistema;  
2. a arquitetura geral;  
3. os módulos e funcionalidades;  
4. os requisitos funcionais e não funcionais;  
5. os requisitos de segurança;  
6. os requisitos legais e regulatórios;  
7. os requisitos de acessibilidade;  
8. os aspectos de UX/UI;  
9. a stack técnica ideal com custo zero;  
10. a modelagem de papéis e permissões;  
11. a estrutura de instalação local e futura disponibilização SaaS;  
12. as regras de logs, debug, tratamento de erros e auditoria;  
13. as integrações necessárias;  
14. as estratégias de manutenção, correção e evolução;  
15. a identidade visual e o logotipo;  
16. os agentes e etapas para desenvolvimento por vibe coding;  
17. as prevenções técnicas, operacionais e jurídicas;  
18. a priorização de recursos essenciais versus recursos desejáveis;  
19. a comparação com concorrentes comerciais e open source;  
20. qualquer outro aspecto necessário para um sistema escolar robusto e profissional.

## **Requisitos de conteúdo obrigatórios**

Você deve considerar, analisar e incorporar no documento:

### **1\) Benchmark e concorrência**

Analise recursos presentes em **sistemas concorrentes comerciais e open source**, extraindo deles os recursos mais úteis e relevantes para o EducAdmin. Priorize o que for realmente essencial para uma escola pública e para redes de ensino com orçamento limitado. Não copie apenas listas genéricas: faça uma curadoria inteligente do que deve existir no EducAdmin.

Considere como referência comparativa, entre outros, sistemas como:

* i-Educar;  
* openSIS;  
* RosarioSIS;  
* outros sistemas de gestão escolar relevantes, comerciais e livres, nacionais e internacionais.

O objetivo é identificar:

* funcionalidades comuns;  
* funcionalidades diferenciais;  
* lacunas de mercado;  
* recursos indispensáveis para redes públicas;  
* recursos desejáveis para escolas privadas;  
* recursos de alto impacto e baixo custo.

### **2\) Público-alvo e cenário de uso**

O sistema será usado por pessoas com diferentes níveis de conhecimento, incluindo:

* alunos;  
* responsáveis;  
* professores;  
* coordenadores;  
* secretários escolares;  
* diretores;  
* administradores;  
* equipe técnica;  
* gestores de rede;  
* usuários sem conhecimento em TI.

Por isso, descreva um sistema que seja:

* amigável;  
* intuitivo;  
* autoexplicativo;  
* consistente;  
* de fácil instalação;  
* de fácil administração;  
* de fácil treinamento;  
* de fácil manutenção.

### **3\) Legislação, normas e conformidade**

O EducAdmin deve ser projetado para cumprir integralmente a legislação vigente em **julho de 2026**, com foco em:

* **LGPD** e toda a lógica de privacidade, consentimento, bases legais, minimização de dados, retenção, acesso, auditoria, direitos do titular, segurança e governança;  
* requisitos e diretrizes do **MEC** aplicáveis a sistemas educacionais;  
* diretrizes educacionais brasileiras;  
* princípios e necessidades de integração com rotinas educacionais oficiais;  
* quando aplicável, alinhamento com a **BNCC**;  
* diretrizes de acessibilidade digital;  
* requisitos de rastreabilidade e governança;  
* exigências de prestação de informações para contextos públicos e privados;  
* compatibilidade com rotinas de escolas e redes de ensino brasileiras.

Se houver necessidade de citar módulos oficiais, considere que o sistema deve ser compatível conceitualmente com rotinas como matrícula, enturmação, diário de classe, histórico escolar digital, fila de espera, relatórios e exportações institucionais.

### **4\) Arquitetura, stack e custo zero**

Defina uma arquitetura pensada desde o início para:

* custo reduzido;  
* instalação local;  
* operação em servidores modestos;  
* escalabilidade futura;  
* multiinstituição;  
* SaaS;  
* modularidade;  
* manutenção simples;  
* evolução contínua.

A stack deve ser definida com foco em **custo zero de licenças**, alta estabilidade e ampla comunidade. Indique a melhor combinação possível entre:

* backend;  
* frontend;  
* banco de dados;  
* cache;  
* fila;  
* autenticação;  
* armazenamento;  
* infraestrutura;  
* containers;  
* orquestração simplificada;  
* automação de deploy;  
* testes;  
* observabilidade;  
* documentação.

Explique claramente por que cada tecnologia foi escolhida, priorizando:

* maturidade;  
* segurança;  
* produtividade;  
* facilidade de manutenção;  
* disponibilidade de mão de obra;  
* compatibilidade com ambientes locais;  
* compatibilidade com deploy em nuvem ou servidor próprio;  
* baixo custo operacional;  
* facilidade para desenvolvedores brasileiros.

### **5\) Segurança by design**

O sistema deve ser imaginado **seguro desde o início**, com abordagem “security by design” e “privacy by design”. Defina:

* autenticação;  
* autorização;  
* controle de acesso por papéis;  
* segregação de privilégios;  
* criptografia em trânsito e em repouso;  
* políticas de senha;  
* MFA quando aplicável;  
* proteção contra ataques comuns;  
* validação de entrada;  
* prevenção de XSS, CSRF, SQL injection, IDOR e abuso de sessão;  
* segurança de API;  
* segurança de arquivos;  
* segurança de logs;  
* proteção de dados sensíveis;  
* backups;  
* restauração;  
* resposta a incidentes;  
* rastreabilidade;  
* auditoria;  
* revisão de dependências;  
* governança de segredos;  
* hardening de ambiente.

### **6\) UX/UI e visual**

O visual deve ser altamente moderno, mas sem cair em um padrão de admin panel clichê.

O sistema:

* **não deve ter menu lateral**;  
* deve usar **menu superior ou flutuante**;  
* o menu deve ter comportamento com efeitos inspirados em **Slide In / Slide Out**, **Move In / Move Out**, e **Smart Animate**;  
* o menu deve ser inspirado nas características do tutorial e do código do repositório **liquid-navigation-indicator**, reproduzindo a ideia de indicador fluido, responsividade e transição elegante, sem copiar mecanicamente o código, mas capturando a lógica visual e comportamental;  
* toda transição entre telas, overlays, modais e seções deve usar animações suaves como **Smart Animate, Zoom, Fade ou Flip**;  
* a interface deve ser intuitiva para pessoas sem conhecimento técnico;  
* a navegação precisa ser rápida, previsível e acessível;  
* os componentes devem ser coerentes entre si;  
* botões, inputs, placeholders, ícones, estados de erro e estados de sucesso precisam se comportar de maneira consistente em todos os temas.

A estética geral deve misturar, com inteligência:

* **Glassmorphism**;  
* **Neomorphism**;  
* **Flat Design**;  
* **Bento Grid**.

O sistema deve ter, por padrão, um **azul bem claro** como base visual, com suporte nativo a:

* tema claro;  
* tema escuro;  
* tema de alto contraste.

As regras visuais devem ser coerentes:

* no tema claro, ícones, textos, botões e placeholders devem ser escuros;  
* no tema escuro, ícones, textos, botões e placeholders devem ser claros;  
* os contrastes devem ser adequados;  
* as cores nunca podem ser o único meio de transmitir informação;  
* a acessibilidade cromática deve ser prioritária.

### **7\) Acessibilidade total**

O sistema deve ser acessível para todos os perfis de usuários. Defina requisitos para:

* contraste;  
* tipografia;  
* tamanho mínimo de textos;  
* navegação por teclado;  
* compatibilidade com leitores de tela;  
* foco visível;  
* labels claras;  
* feedback não dependente apenas de cor;  
* estados de erro compreensíveis;  
* formulários acessíveis;  
* feedback de carregamento;  
* áreas clicáveis confortáveis;  
* responsividade total;  
* adaptação para desktop, notebook, tablet e celular.

### **8\) Busca dinâmica**

O sistema deve ter **busca dinâmica** sempre que houver recursos disponíveis para isso. Defina como a busca deve funcionar em:

* alunos;  
* turmas;  
* responsáveis;  
* professores;  
* documentos;  
* ocorrências;  
* notas;  
* frequências;  
* calendários;  
* relatórios;  
* históricos;  
* mensagens;  
* tarefas;  
* integrações;  
* registros administrativos.

### **9\) SaaS e modelo de negócio**

O EducAdmin deve ser pensado para funcionar como **SaaS**, mas sem perder a possibilidade de instalação local. Defina:

* modelo multi-escola;  
* multi-tenant;  
* segregação de dados por instituição;  
* escalabilidade de pequenos para grandes clientes;  
* planos gratuitos para escolas pequenas;  
* preços acessíveis;  
* baixo custo de operação;  
* potencial de monetização justa para suporte, hospedagem, treinamento e serviços agregados;  
* compatibilidade com instituições públicas e privadas;  
* estratégia de entrada no mercado com foco em acessibilidade financeira.

### **10\) Instalação local e ambiente de teste**

O sistema será sempre testado em ambiente local antes de qualquer disponibilização. Logo, defina:

* fluxo de instalação local;  
* dependências mínimas;  
* variáveis de ambiente;  
* arquivos de configuração;  
* migrações;  
* seeds;  
* ambiente de desenvolvimento;  
* ambiente de homologação;  
* ambiente de produção;  
* como facilitar instalação por pessoas sem experiência em TI;  
* como simplificar correções e atualizações;  
* como documentar tudo em pt-BR.

### **11\) Estilo de programação e manutenção**

Defina um estilo de programação:

* sólido;  
* elegante;  
* organizado;  
* sustentável;  
* legível;  
* documentado;  
* modular;  
* testável;  
* fácil de revisar;  
* fácil de depurar;  
* fácil de corrigir;  
* fácil de manter.

Explique padrões como:

* arquitetura limpa ou equivalente;  
* separação de camadas;  
* padrões de nomenclatura;  
* padronização de commits;  
* versionamento;  
* revisão por pares;  
* testes automatizados;  
* lint;  
* formatação;  
* análise estática;  
* documentação de API;  
* documentação operacional.

### **12\) Logs, debug e tratamento de erros**

Defina regras claras para:

* logs de acesso;  
* logs de auditoria;  
* logs de erro;  
* logs de segurança;  
* logs de integração;  
* logs de ações administrativas;  
* logs de mudanças em dados sensíveis;  
* retenção de logs;  
* rotação de logs;  
* mascaramento de dados sensíveis;  
* acesso a logs;  
* debug em desenvolvimento;  
* comportamento em produção;  
* tratamento padronizado de exceções;  
* mensagens amigáveis ao usuário;  
* códigos de erro;  
* alertas;  
* monitoramento;  
* trilhas de auditoria;  
* diagnósticos rápidos;  
* resposta a falhas.

### **13\) Agentes para vibe coding**

Como o sistema será vibe codado, defina um fluxo de desenvolvimento com agentes ou papéis distintos, por exemplo:

* arquiteto do sistema;  
* analista legal e LGPD;  
* designer de UX/UI;  
* desenvolvedor backend;  
* desenvolvedor frontend;  
* integrador de APIs;  
* engenheiro de testes;  
* especialista em observabilidade;  
* responsável por documentação;  
* revisor de segurança;  
* mantenedor de release;  
* apoio de implantação local.

Descreva claramente o papel de cada agente, suas entregas, dependências e a sequência lógica de trabalho.

### **14\) Recursos e módulos**

Defina todos os módulos que um sistema de gestão escolar robusto precisa ter, separando:

* funcionalidades obrigatórias;  
* funcionalidades importantes;  
* funcionalidades opcionais;  
* funcionalidades futuras.

Considere, no mínimo:

* cadastro institucional;  
* unidades escolares;  
* turmas;  
* matrículas;  
* enturmação;  
* alunos;  
* responsáveis;  
* professores;  
* servidores;  
* horários;  
* calendário escolar;  
* diário de classe;  
* frequência;  
* notas;  
* conceitos;  
* pareceres descritivos;  
* boletins;  
* históricos escolares;  
* documentos;  
* comunicação interna;  
* mensagens;  
* notificações;  
* ocorrências;  
* relatórios;  
* exportações;  
* importações;  
* pré-matrícula;  
* fila de espera;  
* gestão de vagas;  
* biblioteca;  
* transporte;  
* alimentação escolar quando aplicável;  
* financeiro para escolas privadas;  
* portal do aluno;  
* portal do responsável;  
* portal do professor;  
* portal da secretaria;  
* portal da direção;  
* painel da rede;  
* integração com sistemas externos;  
* auditoria;  
* administração;  
* configurações gerais;  
* tema e acessibilidade;  
* gestão de permissões;  
* backup e restauração;  
* central de ajuda;  
* documentação;  
* logs;  
* monitoramento;  
* saúde do sistema.

### **15\) Requisitos não funcionais**

Especifique com alta clareza:

* desempenho;  
* escalabilidade;  
* disponibilidade;  
* confiabilidade;  
* integridade dos dados;  
* manutenção;  
* portabilidade;  
* interoperabilidade;  
* compatibilidade;  
* acessibilidade;  
* segurança;  
* observabilidade;  
* tolerância a falhas;  
* usabilidade;  
* localidade linguística;  
* eficiência de recursos;  
* custo operacional.

### **16\) Integrações e interoperabilidade**

Defina como o EducAdmin deve se preparar para:

* exportação e importação de dados;  
* integração com sistemas governamentais;  
* conectores futuros;  
* APIs internas e externas;  
* compatibilidade com padrões abertos;  
* interoperabilidade entre escolas e redes;  
* futuras automações.

### **17\) Identidade visual e logotipo**

Padronize a identidade visual do EducAdmin e defina um sistema de marca com:

* logotipo preferencialmente em **SVG**;  
* versão **quadrada**, contendo apenas o símbolo;  
* versão **horizontal**, contendo símbolo \+ nome “EducAdmin”;  
* adaptação para tema claro e escuro;  
* legibilidade em tamanhos pequenos;  
* estilo moderno e institucional;  
* identidade coerente com educação, gestão, tecnologia, confiança e simplicidade;  
* possibilidade de uso como favicon, avatar, cabeçalho, tela de login e documentos.

Descreva o conceito do símbolo, a lógica visual, as cores base e as variações de aplicação.

### **18\) Tom e idioma**

Todo o documento final deve ser escrito em **pt-BR**, com tom:

* técnico;  
* objetivo;  
* claro;  
* minucioso;  
* profissional;  
* didático;  
* direto;  
* organizado.

Evite generalidades. Evite superficialidade. Não use frases vagas. Cada requisito deve ser descrito com precisão prática.

## **Restrições importantes**

* Não use explicações genéricas sem aplicação prática.  
* Não trate o EducAdmin como um simples “sistema escolar”; trate-o como uma plataforma estratégica para gestão educacional.  
* Não sugira stack com custo de licença.  
* Não proponha um menu lateral.  
* Não ignore acessibilidade.  
* Não ignore LGPD, MEC, BNCC e conformidade legal.  
* Não ignore o contexto brasileiro.  
* Não use linguagem em inglês sem necessidade. Quando houver termo técnico conhecido em português, prefira o português.  
* Não faça introdução longa nem conclusão genérica.  
* Inicie o texto diretamente dizendo **o que é o EducAdmin e para que serve**.  
* Mantenha a descrição extremamente rica em detalhes.  
* Seja coerente entre requisitos, arquitetura, interface, segurança, operação e manutenção.

## **Formato de resposta esperado**

Entregue o resultado como um **manual técnico estruturado**, com seções muito bem organizadas, completas e detalhadas, usando títulos, subtítulos e hierarquia lógica. O conteúdo deve ser profundo o suficiente para orientar:

* análise de viabilidade;  
* arquitetura do sistema;  
* desenvolvimento;  
* implementação;  
* implantação local;  
* implantação futura em SaaS;  
* manutenção;  
* evolução;  
* segurança;  
* conformidade;  
* design;  
* documentação.

Crie o planejamento de implementação de forma estratégica, ampla, clara, minuciosa e altamente descritiva, garantindo que todas as especificações e construção do EducAdmin sejam abrangidas desde o zero.

