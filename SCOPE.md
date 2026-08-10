# SCOPE.md — Classificação de escopo Hudi Pages

**Projeto:** Landing page + onboarding privado — Felipe Carvalho, Psicólogo — CRP 02/23810
**Produto:** Hudi Pages, uma iniciativa do ecossistema Hudi Labs
**Natureza deste projeto:** primeiro case de portfólio, desenvolvido sem cobrança

> **Este documento não contém preços.** Nenhum valor, faixa, estimativa, hora, diária ou condição de pagamento aparece aqui — por decisão do produto. O que existe é uma **classificação de complexidade**, usada para conversar sobre esforço antes de qualquer conversa sobre orçamento.

---

## 0. Categorias usadas neste documento

| Categoria | O que significa |
| --- | --- |
| `incluído no escopo-base` | Já faz parte da página-base do Hudi Pages. Não gera análise nem orçamento. |
| `personalização simples` | Ajuste pontual, contido, sem novas dependências, sem novo serviço e sem mudança de arquitetura. |
| `personalização intermediária` | Exige novo componente, nova rota, nova regra de negócio ou integração com um serviço externo já existente. |
| `personalização avançada` | Muda a arquitetura, introduz persistência, autenticação, processamento contínuo, obrigações legais adicionais ou operação recorrente. |
| `custo de terceiro` | Existe um serviço, licença, assinatura, registro ou infraestrutura pago a **outra empresa**. Esse custo nunca está incluído e nunca é absorvido por padrão. |

**As duas dimensões são independentes.** Um item pode ser `personalização simples` **e** ter `custo de terceiro` (o domínio próprio é o exemplo mais claro: a configuração é trabalho pequeno, mas o registro é uma despesa recorrente com terceiro).

---

## 1. Como o Hudi Pages funciona

Em linguagem direta, sem entrelinhas:

**1.1 Existe uma página-base própria, criada e mantida pelo Hudi Pages.** É uma página institucional de uma só tela, simples e reutilizável. Ela foi construída do zero pela própria iniciativa e serve como ponto de partida para diferentes profissionais. Por ser reutilizável, essa base pode ser oferecida gratuitamente ou como peça de demonstração e portfólio.

**1.2 O que sai da base é analisado caso a caso.** Qualquer coisa que exija componente novo, integração, banco de dados, automação, painel, autenticação ou operação recorrente deixa de ser base e passa a ser personalização. Personalizações são analisadas por complexidade e orçadas separadamente. Nada é feito "de quebra".

**1.3 O projeto de Felipe está sendo desenvolvido gratuitamente, como primeiro case de portfólio.** Isso é uma escolha explícita e vale para os dois lados: Felipe recebe uma presença digital profissional sem custo de desenvolvimento; o Hudi Pages ganha um primeiro projeto real, com padrão de qualidade demonstrável. Nenhuma das partes deve a outra nada além do que está descrito neste documento.

**1.4 O uso público do projeto como case depende de autorização expressa e separada — que ainda NÃO foi concedida.** Isso inclui: mostrar o site em portfólio, publicar em redes sociais, usar em apresentação comercial, exibir a marca ou a imagem de Felipe, divulgar métricas do projeto ou reproduzir qualquer depoimento. Ser o primeiro case internamente **não** autoriza uso público. Ver seção 6.

**1.5 Custos de terceiros nunca são apresentados como incluídos sem confirmação.** Compra e renovação de domínio, serviços de formulário, e-mail profissional, agenda, banco de dados, hospedagem paga e ferramentas de terceiros são despesas de outra empresa. Quando um deles for necessário, ele aparece explicitamente marcado como `custo de terceiro`, é comunicado antes e depende de decisão de quem vai pagar.

**1.6 O que este documento não é.** Não é contrato, não é proposta comercial, não é orçamento e não fixa prazos. É o mapa que organiza a conversa sobre o que existe hoje, o que está fora e o que pode ser avaliado depois.

---

## 2. Escopo-base — o que está incluído

Tudo nesta seção é `incluído no escopo-base` e já está contemplado no projeto de Felipe.

| Item | O que é | Observação |
| --- | --- | --- |
| Landing page de uma única tela | Página institucional com navegação por âncoras, sem páginas internas de conteúdo. | Rota `/`. |
| Seções institucionais | Apresentação, forma de trabalhar, formação, compromisso com a população LGBTQIA+, como funciona o atendimento, perguntas frequentes. | Estrutura fixa da base, com conteúdo próprio de cada profissional. |
| Uso da identidade visual existente | Aplicação da paleta, dos logotipos e dos lockups já entregues pelo cliente. | Não inclui criação de identidade nova. Ver seção 3. |
| Responsividade | Funcionamento correto em celular, tablet e desktop. | Verificado em 360, 768, 1024 e 1440 px. |
| Acessibilidade | Navegação por teclado, foco visível, contraste adequado, HTML semântico, respeito a movimento reduzido. | Meta declarada: WCAG 2.2 nível AA. |
| SEO essencial | Título, descrição, canonical, Open Graph, idioma, `sitemap` e `robots` coerentes. | Não inclui estratégia de conteúdo nem otimização contínua. |
| Chamada para ação | CTA primário e secundário conectados às seções da página. | — |
| Links de redes sociais | Espaços prontos para Instagram e WhatsApp, renderizados apenas quando confirmados. | Hoje ocultos: canais não confirmados (PEND-02, PEND-03). |
| Formulário simples de lista de espera | Campos mínimos, validação, estados de envio, proteção contra robô por honeypot e limite de tentativas por IP. | **Sem destino real contratado.** Ver seção 5. |
| Página de política de privacidade | Rota e estrutura prontas, com texto-rascunho. | O texto definitivo depende de revisão jurídica — não incluída. Ver seção 5. |
| Publicação em subdomínio do ecossistema | Colocar o site no ar em um endereço legível do ecossistema, do tipo `[slug-aprovado].inspira.dev.br`. | **Disponibilidade não confirmada.** A existência dessa infraestrutura ainda não foi verificada e não deve ser tratada como garantida (PEND-12). |

---

## 3. Personalizações sujeitas a orçamento

Nenhum item desta tabela está contratado, iniciado ou previsto. A tabela existe para dar previsibilidade à conversa.

| Recurso | Categoria de complexidade | Custo de terceiro | O que muda na prática | Dependências |
| --- | --- | --- | --- | --- |
| Domínio próprio e operação de DNS | personalização simples | **sim** | O site passa a ter endereço próprio em vez de subdomínio do ecossistema. Envolve registro, apontamento de DNS, certificado e redirecionamentos. | Definir o domínio, decidir em nome de quem fica registrado e quem assume registro e renovação (PEND-12, PEND-13). |
| Identidade visual nova | personalização avançada | não | Criação de marca do zero: naming visual, logotipo, paleta, tipografia, aplicações e manual. | Não se aplica hoje — Felipe já tem identidade e manual próprios. |
| Redação estratégica extensa | personalização intermediária | não | Pesquisa de posicionamento, entrevistas, arquitetura de mensagem e escrita de volume maior de conteúdo. | O escopo-base já entrega a copy da página. Este item cobre trabalho editorial além disso. |
| Ilustrações personalizadas | personalização intermediária | não | Peças gráficas exclusivas em vez de composição feita com a identidade existente. | Direção de arte definida. |
| Ensaio fotográfico profissional | personalização simples (coordenação) | **sim** | Fotos próprias de alta qualidade para a página. O trabalho fotográfico é de terceiro. | Fotógrafo, estúdio, direção e autorização de uso de imagem (PEND-01, PEND-16). |
| Animações complexas | personalização intermediária | não | Transições encadeadas, animação de rolagem, elementos reativos ao cursor. | Precisa manter `prefers-reduced-motion` e não degradar performance. Contraria o pedido de página simples. |
| Agenda on-line / integração com Google Calendar | personalização avançada | **sim** (conforme serviço) | O visitante marca a sessão direto no site. Muda a natureza do produto: deixa de ser lista de espera. | Conta de agenda, regras de disponibilidade, política de remarcação e cancelamento, revisão ética sobre agendamento automático em contexto clínico. |
| CRM | personalização avançada | **sim** | Gestão de contatos com histórico, etapas e anotações. | Escolha da ferramenta, definição de retenção, contrato de operador de dados, política de privacidade atualizada. |
| WhatsApp API | personalização avançada | **sim** | Mensagens automatizadas e integração oficial, em vez de link simples. | Conta comercial aprovada, número dedicado, análise de privacidade — metadados de conversa em contexto de saúde são especialmente sensíveis. |
| Automações (notificação, fluxo, resposta automática) | personalização intermediária | **sim** (conforme serviço) | Cada nova entrada dispara uma ação: e-mail, mensagem, registro em planilha. | Destino do formulário definido (PEND-08) e responsável operacional (PEND-09). |
| Banco de dados e painel administrativo | personalização avançada | **sim** | O próprio profissional acessa, filtra e gerencia a lista de espera em uma área própria. | Autenticação, backup, criptografia, controle de acesso, plano de resposta a incidente e política de retenção definida. |
| Integração com planilhas | personalização simples | **sim** | Cada envio do formulário vira uma linha em uma planilha. | Conta do serviço, permissões restritas, ciência de que dados pessoais passam a ficar sob um terceiro. |
| CMS ou blog | personalização avançada | **sim** (conforme serviço) | O profissional publica e edita conteúdo sozinho, sem depender de desenvolvimento. | Escolha do CMS, modelagem de conteúdo, fluxo editorial. Em psicologia, conteúdo publicado também está sujeito às regras de publicidade profissional. |
| Múltiplos idiomas | personalização intermediária | **sim** (tradução) | Site em mais de um idioma, com rotas e SEO por idioma. | Tradução profissional e decisão sobre atendimento a pessoas fora do Brasil (PEND-05). |
| Pagamentos on-line | personalização avançada | **sim** | Cobrança pelo site. | Gateway, dados fiscais, política de reembolso e cancelamento e análise das regras de publicidade sobre preço — hoje nenhum valor pode ser exibido. |
| Área autenticada | personalização avançada | **sim** (conforme infraestrutura) | Login para conteúdo restrito ou espaço do paciente. | Autenticação, recuperação de senha, sigilo profissional, LGPD reforçada. Item de risco alto em contexto clínico. |
| Analytics avançado | personalização intermediária | **sim** (conforme ferramenta) | Métricas de uso, funil e comportamento. | Base legal, abordagem de consentimento, política de cookies e atualização da política de privacidade (PEND-19). O MVP não tem analytics por decisão. |
| Testes A/B | personalização avançada | **sim** | Versões diferentes da página exibidas a públicos diferentes, com medição. | Depende de analytics e de volume de tráfego suficiente para significância. Exige cuidado ético: não se testa promessa clínica. |
| Manutenção recorrente | personalização intermediária (recorrente) | não | Atualizações, correções, pequenos ajustes e acompanhamento contínuo. | Combinação de escopo e periodicidade. **Não existe hoje.** Ver seção 5. |
| Migração de site existente | personalização intermediária | **sim** (conforme origem) | Trazer conteúdo, endereços e histórico de outra plataforma, com redirecionamentos. | Acesso à origem e mapeamento de URLs. |
| Requisitos adicionais de segurança ou compliance | personalização avançada | **sim** (conforme exigência) | Registro de auditoria, criptografia em repouso, retenção formalizada, relatório de impacto, resposta a incidentes. | Definição prévia da exigência aplicável e revisão jurídica. |

---

## 4. Classificação do que já está no MVP

Distinção importante: nem tudo que foi entregue faz parte da base reutilizável. Parte foi feita como cortesia e esforço de portfólio, por este ser o primeiro case. Registrar isso agora evita que, no futuro, esses itens sejam presumidos como "sempre incluídos".

### 4.1 Entregue como escopo-base

| Item entregue | Categoria |
| --- | --- |
| Landing page de uma tela com todas as seções institucionais | `incluído no escopo-base` |
| Aplicação da identidade visual existente (paleta, logotipos, lockups) | `incluído no escopo-base` |
| Responsividade nas quatro larguras de referência | `incluído no escopo-base` |
| Acessibilidade com meta WCAG 2.2 AA | `incluído no escopo-base` |
| SEO essencial e metadados | `incluído no escopo-base` |
| Formulário de lista de espera com validação, estados e proteção contra robô | `incluído no escopo-base` |
| Rotas de política de privacidade e termos, com texto-rascunho | `incluído no escopo-base` |
| Espaços prontos para Instagram e WhatsApp, ativáveis por configuração | `incluído no escopo-base` |
| Publicação em subdomínio do ecossistema, se disponível | `incluído no escopo-base` (disponibilidade não confirmada) |

### 4.2 Entregue como cortesia / esforço de portfólio, além da base habitual

| Item entregue | Equivalência de complexidade, se fosse orçado | Por que está aqui |
| --- | --- | --- |
| **Wizard de onboarding em 8 etapas** (`/onboarding`), com progresso salvo, resumo, pendências, matriz de requisitos e exportação em JSON e Markdown | `personalização intermediária` | É uma aplicação à parte, com rota própria, estado, persistência local e exportação. Não faz parte da página institucional e não é praxe da base. |
| **Configuração central tipada de conteúdo** com estado de confirmação por string | `personalização simples` | Permite trocar qualquer texto sem tocar em código. A base não exige esse nível de parametrização. |
| **Adapter desacoplado de formulário** (`mock` e `webhook`), com schema compartilhado entre cliente e servidor | `personalização simples` | Prepara a troca futura por um destino real sem retrabalho de interface. |
| **Modo de revisão** (`NEXT_PUBLIC_REVIEW_MODE`), que exibe pendências para conferência interna | `personalização simples` | Ferramenta de processo, não requisito do site. |
| **Documentação estendida**: especificação funcional e visual completa, matriz de confirmação item a item, deck editorial com toda a copy identificada e este documento de escopo | `personalização intermediária` | O volume e o rigor desta documentação existem por causa do contexto clínico e das regras de publicidade profissional. Não é o padrão de uma página-base. |
| **Análise de privacidade e conformidade aplicada ao produto** (minimização, desativação de campos sensíveis, ausência de analytics, fontes auto-hospedadas) | `personalização intermediária` | Trabalho de desenho, não de implementação de biblioteca. |

Nada na tabela 4.2 gera cobrança neste projeto. O registro serve para que o escopo-base continue sendo escopo-base em projetos futuros.

---

## 5. O que NÃO está contratado nem incluído hoje

Lista explícita, para não haver presunção em nenhuma direção.

| Item | Situação | Consequência prática hoje |
| --- | --- | --- |
| **Domínio próprio** | Não contratado. `custo de terceiro`. | O site não tem endereço próprio. Nenhum domínio foi registrado, nem em nome de Felipe nem em nome do Hudi Pages (PEND-12, PEND-13). |
| **Hospedagem além de um eventual subdomínio do ecossistema** | Não contratada. `custo de terceiro`. | Não há plano de hospedagem pago, não há garantia de recursos e a própria existência do subdomínio do ecossistema ainda não foi confirmada. |
| **Serviço de e-mail profissional** | Não contratado. `custo de terceiro`. | Não existe endereço de e-mail no domínio do projeto (PEND-04). |
| **Destino real do formulário** (backend, planilha, CRM, e-mail transacional, webhook) | Não contratado. `custo de terceiro`. | O formulário roda em modo de teste. **Nenhum cadastro é armazenado em lugar nenhum.** A tela de sucesso avisa isso explicitamente. O site não deve ser divulgado publicamente nesse estado (PEND-08). |
| **Manutenção recorrente** | Não contratada. | Não há rotina de atualização, correção, monitoramento ou pequenos ajustes após a entrega. Cada demanda futura é analisada individualmente. |
| **SLA, suporte, disponibilidade garantida** | Não contratado. | Não há prazo de resposta comprometido, não há janela de atendimento e não há garantia de tempo no ar. |
| **Revisão jurídica** | Não contratada. `custo de terceiro`. | A política de privacidade, os termos de uso e o texto de consentimento são rascunhos. A revisão precisa ser feita por profissional habilitado, contratado por Felipe (PEND-10, PEND-11). |
| **Revisão ética junto ao conselho profissional** | Não contratada. | A responsabilidade pelo conteúdo publicado em seu nome é de Felipe. As fontes a reconferir estão listadas em `SPEC.md`, seção 12.7. |
| **Fotografia profissional** | Fornecida e autorizada. `incluído no escopo-base`. | Original preservado e derivado 512 × 640 integrado ao hero. |
| **Tradução ou versão em outro idioma** | Não contratada. | Site apenas em pt-BR. |
| **Analytics, métricas e relatórios** | Não contratados. | Nenhuma métrica automatizada existe. Nenhum relatório será entregue (PEND-19). |
| **Produção de conteúdo contínuo** (posts, artigos, newsletter) | Não contratada. | A copy entregue é a da página, uma vez. |

---

## 6. Consentimentos pendentes

Os dois consentimentos abaixo são **separados**. Autorizar um não autoriza o outro. Nenhum dos dois foi concedido, e nenhum é presumido pelo fato de o projeto ser gratuito.

### 6.1 Uso do site como case do Hudi Pages

- **Status atual: NÃO CONCEDIDO.** No código, `hudiPages.caseStudyConsent: false`.
- **O que a autorização cobriria:** exibir o projeto em portfólio, publicar em redes sociais do Hudi Pages ou do Hudi Labs, apresentar em material comercial, citar em propostas, incluir em apresentações.
- **O que fica bloqueado enquanto não houver autorização:** absolutamente todo uso público. O projeto pode ser mencionado internamente, entre as partes envolvidas, e nada mais.
- **Como deve ser obtida:** por escrito, de forma específica, indicando onde e como o projeto pode ser mostrado, com possibilidade de revogação.
- **Referência:** PEND-15.

### 6.2 Uso de imagem, marca, métricas ou depoimento

- **Status atual: NÃO CONCEDIDO.**
- **O que a autorização cobriria:** usar a fotografia de Felipe, aplicar a marca `Felipe Carvalho` em material do Hudi Pages, divulgar qualquer número relacionado ao projeto (acessos, cadastros, conversões) ou reproduzir declaração ou depoimento seu.
- **O que fica bloqueado enquanto não houver autorização:** todos esses usos, inclusive dentro de um material que já tenha a autorização da seção 6.1. Mostrar o site é uma coisa; usar o rosto, a marca, os números ou a fala de Felipe é outra.
- **Como deve ser obtida:** por escrito, separadamente, item a item, com possibilidade de revogação.
- **Referência:** PEND-16.

### 6.3 Regra geral

Enquanto os dois consentimentos não existirem por escrito, valem estas restrições:

- O crédito no rodapé do site (`Desenvolvido com Hudi Pages, um projeto Hudi Labs`) é o **único** uso permitido da relação entre as partes, e ele acontece dentro do próprio site de Felipe.
- Nenhuma métrica do projeto é divulgada.
- Nenhuma captura de tela circula fora das conversas entre as partes.
- O nome de Felipe não aparece em nenhuma lista de clientes, portfólio ou material comercial.

---

## 7. Como solicitar uma personalização

O caminho é o mesmo para qualquer item da seção 3, do menor ajuste à funcionalidade mais complexa.

**Passo 1 — Abrir o wizard.** Acesse a rota `/onboarding` do próprio site. É uma página privada, não indexada, feita para registrar decisões. Nada do que você escrever ali é enviado pela internet: as respostas ficam apenas no seu navegador.

**Passo 2 — Percorrer as etapas.** São oito etapas curtas (A a H). É possível pular etapas e voltar depois; o rascunho fica salvo no navegador.

**Passo 3 — Marcar cada item desejado.** Na etapa H, cada personalização recebe uma marcação:

| Marcação | Significado |
| --- | --- |
| `Quero agora` | Entra na análise imediata de complexidade. |
| `Talvez depois` | Fica registrado como interesse futuro, sem análise no momento. |
| `Não quero` | Sai do radar. |

**Passo 4 — Exportar.** Na tela final, use `Baixar JSON` e `Baixar Markdown` (ou os botões de copiar). O JSON é o formato que a análise consome; o Markdown é a versão legível, para você guardar e conferir.

**Passo 5 — Enviar para análise.** Encaminhe o arquivo exportado pelo canal combinado. Cada item marcado como `Quero agora` recebe: a categoria de complexidade, a indicação de haver ou não `custo de terceiro`, as dependências que precisam ser resolvidas antes e o que muda na prática no site.

**Passo 6 — Decidir.** Só depois dessa análise existe conversa sobre orçamento. Nada é iniciado sem sua aprovação explícita.

### 7.1 O MVP continua funcionando durante a análise

Solicitar uma personalização **não** altera o site. A página no ar permanece exatamente como está enquanto o pedido é avaliado, e continua assim mesmo que a personalização não seja aprovada. Não existe alteração automática, não existe cobrança automática, e nenhuma funcionalidade é ativada sem decisão sua.

### 7.2 Antes de qualquer personalização

Vale reforçar o que está pendente hoje e independe de personalização — são pendências de conteúdo e de decisão, não de desenvolvimento: destino real do formulário, revisão jurídica da política de privacidade, prazo de guarda dos dados, contatos de crise validados em fonte oficial, confirmação das formações e definição do endereço final do site. A lista completa está em `SPEC.md`, seção 15.
