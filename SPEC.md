# SPEC.md — Especificação funcional e visual

**Projeto:** Landing page profissional + wizard de onboarding privado
**Profissional:** Felipe Gonzaga de Carvalho Gondim (nome público: Felipe Carvalho) — Psicólogo — CRP 02/23810
**Produto:** Hudi Pages (iniciativa do ecossistema Hudi Labs) — primeiro case de portfólio
**Status do documento:** rascunho de trabalho. Nenhum item deste documento autoriza publicação por si só.
**Circulação:** documento interno, restrito às partes envolvidas. Não deve ser publicado nem versionado em repositório público.

> **Hierarquia de verdade aplicada em todo o documento**
> 1. Fatos declarados no contrato do projeto · 2. Briefing escrito de Felipe · 3. Decisões explícitas registradas em conversas · 4. Respostas futuras do onboarding · 5. Inferências de design (sempre rotuladas como tais).
>
> Todo item carrega um de três estados: **CONFIRMADO** (pode aparecer no MVP) · **A CONFIRMAR** (placeholder, feature flag ou oculto até aprovação) · **NÃO PUBLICAR** (dado privado, impreciso, excessivo ou inadequado).

---

## 1. Visão e objetivo do projeto

O projeto entrega uma página única (one-page) de presença profissional para Felipe Carvalho, psicólogo clínico com atendimento 100% on-line, somada a uma rota privada de onboarding (`/onboarding`) usada para coletar decisões e pendências do próprio cliente.

O projeto tem **duplo propósito**, e os dois precisam conviver sem que um contamine o outro:

| Propósito | Descrição | Como aparece no produto |
| --- | --- | --- |
| Primário — presença profissional | Dar a Felipe uma presença digital sóbria, ética e conforme às normas do CFP, que apresente seu trabalho e capture interesse via lista de espera. | Toda a página. O visitante lê uma página sobre o psicólogo, não sobre a agência. |
| Secundário — case de portfólio Hudi Pages | Demonstrar o padrão de qualidade do Hudi Pages como primeiro case do ecossistema Hudi Labs. | Apenas uma linha discreta no rodapé: `Desenvolvido com Hudi Pages, um projeto Hudi Labs`. Nada mais. |

**Regras de convivência dos dois propósitos:**

- Hudi Pages aparece **exclusivamente no rodapé**, em texto de baixa hierarquia visual, sem logotipo próprio, sem banner, sem selo e sem interrupção da leitura.
- O uso público do site como case (posts, portfólio, apresentações comerciais, métricas, depoimento, imagem ou marca de Felipe) **depende de autorização expressa e separada, que ainda NÃO foi concedida**. Ver `SCOPE.md`, seção 6.
- Nenhuma métrica de Felipe pode ser divulgada como resultado comercial do Hudi Pages sem essa autorização.

**Objetivo de conversão do MVP:** entrada na **lista de espera**. A agenda é limitada; não existe agendamento direto, não existe pagamento e não existe triagem clínica no site.

**Fora do objetivo do MVP:** venda, agendamento, cobrança, atendimento, orientação clínica, urgência e qualquer forma de triagem de sintomas.

---

## 2. Público-alvo e cenários de uso

### 2.1 Personas

| Persona | Quem é | O que precisa da página | Cenário típico |
| --- | --- | --- | --- |
| P1 — Pessoa adulta buscando terapia on-line | Adulto que já decidiu (ou está decidindo) iniciar terapia, pesquisa profissionais e compara. | Entender rapidamente quem é o profissional, se atende on-line, se atende seu perfil, e como entrar em contato. | Chega por link no Instagram, no celular, com pouca paciência para rolagem longa. Lê o hero e decide em segundos se continua. |
| P2 — Pessoa LGBTQIA+ procurando atendimento afirmativo | Pessoa que já teve ou teme ter experiências de despreparo ou preconceito em contextos de saúde. | Sinais concretos e verificáveis de competência afirmativa — não símbolos soltos. | Procura evidência de trajetória real. Se percebe uso decorativo da diversidade, sai. Esta persona é a mais sensível a marketing vazio. |
| P3 — Pessoa que chegou por indicação | Recebeu o nome de Felipe de alguém e quer confirmar registro profissional e legitimidade. | Nome completo, `Psicólogo`, `CRP 02/23810` visíveis e conferíveis. | Escaneia a página procurando identificação formal. Rodapé e cabeçalho precisam responder. |
| P4 — Felipe (dono do conteúdo) | O próprio profissional, responsável ético por tudo que é publicado. | Revisar o conteúdo, ver o que está pendente, decidir o que autoriza. | Usa `/onboarding` para responder pendências e exportar as decisões. Usa `NEXT_PUBLIC_REVIEW_MODE` para ver o que está provisório. |

### 2.2 Cenários de uso

1. **Descoberta rápida no celular (P1/P2).** Entra pelo link da bio, lê hero, rola até "Como funciona", entra na lista de espera. Caminho mais curto: 1 rolagem + 1 formulário.
2. **Verificação de credibilidade (P3).** Entra, procura CRP, confere formações, sai satisfeito sem converter. Cenário legítimo e esperado.
3. **Busca por competência afirmativa (P2).** Lê a seção de compromisso com a população LGBTQIA+ procurando fatos, não bandeiras. As quatro experiências confirmadas são o núcleo dessa seção.
4. **Lista fechada.** Visitante chega quando `availabilityStatus` está em `waitlist-closed`. O formulário não é exibido; a página oferece apenas o canal público disponível.
5. **Revisão interna (P4).** Felipe abre `/onboarding`, responde as etapas A–H, exporta JSON e Markdown e devolve para análise. Nada trafega pela rede.
6. **Pessoa em situação de crise.** Cenário não desejado mas previsível. A página precisa deixar explícito que não atende urgência e apontar para os canais adequados. O texto e os contatos de crise estão **A CONFIRMAR** (ver PEND-14).

---

## 3. Objetivos de negócio e métricas possíveis

### 3.1 Objetivos

| ID | Objetivo | Indicador conceitual |
| --- | --- | --- |
| OB-01 | Estabelecer presença profissional própria, fora de plataformas de terceiros. | Página no ar, indexada, com identificação profissional correta. |
| OB-02 | Concentrar a demanda excedente em uma lista de espera organizada. | Volume de entradas na lista de espera por período. |
| OB-03 | Reduzir contato desqualificado (menores, presencial, urgência, convênio direto). | Proporção de contatos fora de perfil. |
| OB-04 | Comunicar competência afirmativa de forma factual. | Qualitativo: retorno espontâneo das pessoas atendidas. |
| OB-05 | Servir como primeiro case demonstrável do Hudi Pages. | Depende de autorização expressa e separada, ainda não concedida. |

### 3.2 Métricas — estado atual

**Nenhuma ferramenta de analytics está habilitada no MVP.** Não há Google Analytics, Meta Pixel, Hotjar, tag manager, cookie de rastreamento ou script de terceiro. Isso é uma decisão deliberada, não uma omissão:

- Reduz a superfície de tratamento de dados pessoais em um site de contexto de saúde mental, onde a mera visita já é um dado sensível por inferência.
- Evita a necessidade de banner de consentimento, política de cookies e base legal adicional em um MVP que ainda não tem política de privacidade validada.
- As fontes são auto-hospedadas em build (`next/font/google`), justamente para não gerar requisição a terceiro em tempo de execução.

**A própria decisão de medir é uma pendência (PEND-19).** Se Felipe quiser métricas, será necessário antes definir: qual ferramenta, qual base legal, qual abordagem de consentimento, qual retenção e qual atualização da política de privacidade. Enquanto isso não existir, as únicas métricas disponíveis são **manuais e indiretas**:

| Métrica possível hoje | Como obter | Custo de privacidade |
| --- | --- | --- |
| Entradas na lista de espera | Contagem no destino do formulário, quando ele existir (hoje é `mock`). | Baixo — dado já coletado com consentimento. |
| Origem declarada | Só se um campo "como conheceu" for adicionado — **não recomendado no MVP** (aumenta fricção e coleta). | Médio. |
| Alcance dos canais | Métricas nativas do Instagram, fora do site. | Nenhum, para o site. |

**Métricas explicitamente descartadas no MVP:** taxa de conversão automatizada, mapa de calor, gravação de sessão, funil por evento, retargeting.

---

## 4. Fatos confirmados

Somente o que está nesta tabela pode ser tratado como fato. Nada além disto foi confirmado.

| # | Categoria | Fato confirmado |
| --- | --- | --- |
| F-01 | Identificação | Nome completo: Felipe Gonzaga de Carvalho Gondim. |
| F-02 | Identificação | Nome público de exibição: Felipe Carvalho. |
| F-03 | Identificação | Identificação obrigatória em todas as peças: `Psicólogo — CRP 02/23810`. |
| F-04 | Atuação | Atua em Pernambuco (Recife). |
| F-05 | Modalidade | Atendimento 100% on-line. |
| F-06 | Público | Apenas pessoas adultas. |
| F-07 | Formato | Sessões de 50 minutos. |
| F-08 | Plataforma | Google Meet. |
| F-09 | Modelo | Atendimento particular. |
| F-10 | Financeiro | Emite Receita Saúde, que o paciente pode usar para solicitar reembolso a alguns convênios. |
| F-11 | Financeiro | O reembolso **nunca** é prometido nem garantido; depende das regras de cada plano. |
| F-12 | Abordagem | Abordagem principal: Terapia Cognitivo-Comportamental (TCC). |
| F-13 | Abordagem | Postura clínica afirmativa, com foco especial na população LGBTQIA+. |
| F-14 | Formação | Sexologia Clínica (especialização) — **concluída**. |
| F-15 | Formação | 2ª especialização em TCC — **em andamento**. |
| F-16 | Formação | Formação em Psicologia Baseada em Evidências — **em andamento**. |
| F-17 | Formação | Formação em Terapia Cognitivo-Sexual — **em andamento**. |
| F-18 | Trajetória LGBTQIA+ | Desenvolvimento de eventos sobre HIV/AIDS. |
| F-19 | Trajetória LGBTQIA+ | Organização de eventos de combate à LGBTfobia. |
| F-20 | Trajetória LGBTQIA+ | Participação em simpósios, congressos e grupos de apoio à população LGBTQIA+. |
| F-21 | Trajetória LGBTQIA+ | Participação em discussões políticas sobre a implementação do nome social na universidade onde se formou. |
| F-22 | Agenda | A agenda é limitada; a conversão primária é a entrada na lista de espera. |
| F-23 | Canais | Canais desejados: Instagram e WhatsApp (URL e número ainda não confirmados). |
| F-24 | Preferência | Deseja página simples e limpa, sem excesso de informação ou de opções. |
| F-25 | Preferência | Deseja incluir foto profissional própria (ainda não fornecida nem aprovada). |
| F-26 | Identidade | Referência sutil e respeitosa à bandeira Progress Pride é permitida. Diversidade nunca como decoração ou oportunismo. |
| F-27 | Marca | Paleta: brand-mist `#CEE4EA` · brand-lavender-blue `#D0DEED` · brand-slate `#4D576B` · brand-cobalt `#2B4BA9`. |
| F-28 | Marca | Conceito de marca: "pensamento, conexão e acolhimento". |
| F-29 | Marca | Ativos existentes: `Logo_FelipeCarvalho_Final.svg`, lockups horizontal e vertical em cor, branco e negativo, e manual de identidade em PDF de 7 páginas. |
| F-30 | Domínio | Há interesse futuro em domínio próprio. O MVP pode usar provisoriamente um subdomínio legível do ecossistema, **se** essa infraestrutura existir (não confirmado). |
| F-31 | Referência | Reagiu positivamente a `https://saracoutinho.inspira.dev.br` como exemplo de página profissional simples em subdomínio de ecossistema. Uso apenas como referência interna de posicionamento. |

---

## 5. Matriz `CONFIRMADO × A CONFIRMAR × NÃO PUBLICAR`

Esta é a peça central do documento. Nenhum conteúdo entra na página sem constar aqui.

**Legenda de tratamento no MVP:** `publicado` (renderizado ao visitante) · `placeholder` (espaço reservado, visível apenas em modo de revisão) · `feature flag` (código pronto, desligado por configuração) · `oculto` (não renderizado de forma alguma).

### 5.1 Identificação e atuação

| Item | Estado | Fonte | Tratamento no MVP |
| --- | --- | --- | --- |
| Nome completo — Felipe Gonzaga de Carvalho Gondim | CONFIRMADO | Contrato do projeto (F-01) | publicado (rodapé) |
| Nome público — Felipe Carvalho | CONFIRMADO | Contrato do projeto (F-02) | publicado (cabeçalho, hero, textos) |
| Título profissional — Psicólogo | CONFIRMADO | Contrato do projeto (F-03) | publicado |
| Registro — CRP 02/23810 | CONFIRMADO | Contrato do projeto (F-03) | publicado (cabeçalho e rodapé) |
| Atuação em Pernambuco | CONFIRMADO | Contrato do projeto (F-04) | publicado (texto "Sobre") |
| Menção explícita a Recife na página | A CONFIRMAR | Fato confirmado (F-04), mas publicação da cidade não foi decidida | oculto — o texto público usa apenas "Pernambuco" |
| Endereço físico / consultório | NÃO PUBLICAR | Atendimento é 100% on-line; endereço não é necessário nem foi fornecido | oculto |
| CNPJ, razão social ou dados fiscais | NÃO PUBLICAR | Não informado e desnecessário para o MVP | oculto |
| Foto profissional | CONFIRMADO | Fornecida e autorizada por Felipe | publicada — original preservado e derivado 512 × 640 configurado em `professional.photo` |
| Uso de foto de banco de imagens com pessoas | NÃO PUBLICAR | Decisão de projeto: representaria pessoas reais não relacionadas ao trabalho | oculto |

### 5.2 Canais de contato

| Item | Estado | Fonte | Tratamento no MVP |
| --- | --- | --- | --- |
| URL do Instagram | A CONFIRMAR | Canal desejado (F-23), URL não fornecida | feature flag — `instagramUrl: undefined`; link não renderizado |
| Número de WhatsApp | A CONFIRMAR | Canal desejado (F-23), número não fornecido | feature flag — `whatsappNumber: undefined`; botão não renderizado |
| Autorização para publicar o WhatsApp | A CONFIRMAR | Não há decisão registrada; ter o número não equivale a autorizar sua publicação | oculto até autorização escrita |
| Mensagem pré-preenchida do WhatsApp | CONFIRMADO (redação) / A CONFIRMAR (publicação) | Redação aprovada; depende do número | feature flag — texto pronto em `contact.whatsappMessage`, renderizado só com número confirmado |
| E-mail profissional | A CONFIRMAR | Não informado | feature flag — `email: undefined` |
| Telefone fixo ou outro canal | A CONFIRMAR | Não informado | oculto |
| Links para outras redes (LinkedIn, TikTok, YouTube etc.) | A CONFIRMAR | Nunca mencionados | oculto |

### 5.3 Serviço e agenda

| Item | Estado | Fonte | Tratamento no MVP |
| --- | --- | --- | --- |
| Modalidade 100% on-line | CONFIRMADO | F-05 | publicado |
| Público adulto | CONFIRMADO | F-06 | publicado |
| Sessão de 50 minutos | CONFIRMADO | F-07 | publicado |
| Plataforma Google Meet | CONFIRMADO | F-08 | publicado |
| Atendimento particular | CONFIRMADO | F-09 | publicado |
| Receita Saúde emitida | CONFIRMADO | F-10 | publicado |
| Possibilidade de reembolso conforme regras do plano | CONFIRMADO (com ressalva obrigatória) | F-10, F-11 | publicado, sempre acompanhado da ressalva de que o reembolso não é garantido |
| Promessa ou garantia de reembolso | NÃO PUBLICAR | F-11 | oculto |
| Lista de convênios aceitos | NÃO PUBLICAR | Atendimento é particular; não há convênio | oculto |
| Valor da sessão / tabela de preços | NÃO PUBLICAR | Regra de publicidade do CFP: preço não deve ser usado como elemento publicitário | oculto |
| Abrangência geográfica do atendimento (Brasil inteiro? exterior? fuso?) | A CONFIRMAR | Não informado. Sabe-se que ele atua em PE e atende on-line, mas não o alcance aceito | oculto — nenhuma afirmação de alcance é feita; a FAQ não responde essa pergunta até confirmação |
| Status da agenda — disponibilidade limitada | CONFIRMADO | F-22 | publicado via `availabilityStatus: 'limited'` |
| Rótulo exato e critério de troca do status | A CONFIRMAR | Não definido quem troca, quando e com base em quê | placeholder — troca é manual, por configuração |
| Número exato de pessoas atualmente em atendimento | **NÃO PUBLICAR** | Informação privada, declarada como não publicável | oculto — o número não pode constar da página, do código, de comentário, de JSON exportado, de título, de `alt`, de metadado nem de repositório público. **Este documento também não o reproduz**, por coerência com a própria regra. |
| Horários de atendimento | A CONFIRMAR | Não informado | oculto |
| Duração da lista de espera / prazo de retorno | NÃO PUBLICAR | Não é previsível; qualquer prazo seria promessa não sustentada | oculto — a FAQ diz explicitamente que não é possível prever prazo |

### 5.4 Formação e credenciais

| Item | Estado | Fonte | Tratamento no MVP |
| --- | --- | --- | --- |
| Graduação em Psicologia (concluída, implícita no CRP e em F-21) | CONFIRMADO | F-03, F-21 | publicado como `Psicólogo — CRP 02/23810` |
| Instituição e ano da graduação | A CONFIRMAR | Não informados | oculto |
| Especialização em Sexologia Clínica — **concluída** | CONFIRMADO | F-14 | publicado com status "concluída" |
| 2ª especialização em TCC — **em andamento** | CONFIRMADO (como em andamento) | F-15 | publicado com rótulo explícito "em andamento" |
| Formação em Psicologia Baseada em Evidências — **em andamento** | CONFIRMADO (como em andamento) | F-16 | publicado com rótulo explícito "em andamento" |
| Formação em Terapia Cognitivo-Sexual — **em andamento** | CONFIRMADO (como em andamento) | F-17 | publicado com rótulo explícito "em andamento" |
| Instituições, cargas horárias e datas das formações | A CONFIRMAR | Não informadas | oculto |
| Redação exata preferida de cada título | A CONFIRMAR | Não validada por Felipe | placeholder — redação atual é provisória e precisa de aprovação item a item |
| Qualquer formação em andamento apresentada como concluída | **NÃO PUBLICAR** | Regra de publicidade do CFP | oculto — validado por critério de aceite |
| Registro em outros conselhos, títulos de doutor/mestre, docência | A CONFIRMAR | Não informados | oculto |

### 5.5 Compromisso com a população LGBTQIA+

| Item | Estado | Fonte | Tratamento no MVP |
| --- | --- | --- | --- |
| Desenvolvimento de eventos sobre HIV/AIDS | CONFIRMADO | F-18 | publicado |
| Organização de eventos de combate à LGBTfobia | CONFIRMADO | F-19 | publicado |
| Participação em simpósios, congressos e grupos de apoio | CONFIRMADO | F-20 | publicado |
| Discussões políticas sobre nome social na universidade onde se formou | CONFIRMADO | F-21 | publicado |
| Nomes de eventos, instituições, datas ou entidades envolvidas | A CONFIRMAR | Não informados | oculto — as experiências são descritas sem nomear terceiros |
| Referência sutil à bandeira Progress Pride | CONFIRMADO (permissão) / inferência (execução) | F-26 + INF-08 | publicado como detalhe gráfico discreto, nunca como bandeira aplicada de forma decorativa |
| Uso de linguagem de "aliado", selo de diversidade ou badge | NÃO PUBLICAR | F-26 (diversidade nunca como decoração ou oportunismo) | oculto |
| Afirmação de ser referência, especialista ou o melhor para a população LGBTQIA+ | NÃO PUBLICAR | Regra de publicidade do CFP: nada de superioridade | oculto |

### 5.6 Formulário, dados e privacidade

| Item | Estado | Fonte | Tratamento no MVP |
| --- | --- | --- | --- |
| Destino real e seguro do formulário | A CONFIRMAR | Não existe destino contratado | `WAITLIST_ADAPTER=mock` por padrão; o adapter `mock` é explicitamente marcado como teste e **nunca** afirma que um lead foi salvo |
| Credenciais do webhook (`WAITLIST_WEBHOOK_URL`, `WAITLIST_WEBHOOK_TOKEN`) | A CONFIRMAR | Não existem | placeholder — variáveis de ambiente vazias, nenhum segredo no repositório |
| Prazo de retenção dos dados da lista de espera | A CONFIRMAR | Não definido | `retentionDays: 180` como padrão provisório documentado (INF-06), não afirmado ao usuário até validação |
| Processo de exclusão a pedido do titular | A CONFIRMAR | Não definido | oculto — não há promessa de prazo ou canal de exclusão até definição |
| Política de privacidade publicada | A CONFIRMAR | Não redigida nem revisada juridicamente | `policyUrl: undefined`; a rota `/politica-de-privacidade` existe com **rascunho marcado como provisório** |
| Identificação do controlador e canal do titular | A CONFIRMAR | Não definidos | placeholder explícito no rascunho da política |
| Campos sensíveis (saúde, diagnóstico, medicação, orientação sexual, identidade de gênero, raça) | **NÃO PUBLICAR / desabilitado** | Decisão de privacy by design | `privacy.sensitiveFieldsEnabled: false` — não há campo, não há coleta, não há inferência armazenada |
| Campo de mensagem livre no formulário | A CONFIRMAR | Decisão de projeto (INF-11) | desligado no MVP por minimização — a redação está pronta em `CONTENT.md`, mas o campo não é renderizado |
| Campo de telefone | CONFIRMADO como **opcional** (inferência de design INF-07) | INF-07 | publicado como opcional, sem obrigatoriedade, enquanto o canal operacional não estiver confirmado |
| Consentimento LGPD no formulário | CONFIRMADO (necessidade) / A CONFIRMAR (texto final) | Decisão de projeto | publicado com redação provisória sujeita a revisão jurídica |
| Analytics, pixel, cookie de rastreamento | NÃO PUBLICAR (no MVP) | Contrato técnico: sem analytics | oculto |
| Envio de dados do formulário em URL, log, query string ou analytics | **NÃO PUBLICAR** | Contrato técnico | proibido por design e verificado em critério de aceite |

### 5.7 Domínio, hospedagem e infraestrutura

| Item | Estado | Fonte | Tratamento no MVP |
| --- | --- | --- | --- |
| Domínio próprio definitivo | A CONFIRMAR | Interesse futuro declarado (F-30) | oculto — nenhum domínio é anunciado |
| Subdomínio provisório do ecossistema (`[slug-aprovado].inspira.dev.br`) | A CONFIRMAR | Possibilidade condicionada à existência da infraestrutura (F-30) | placeholder — `NEXT_PUBLIC_SITE_URL` fica vazio até definição; o slug precisa ser aprovado por Felipe |
| Existência efetiva da infraestrutura de subdomínio | A CONFIRMAR | Não verificada | oculto — não é apresentada como garantida em nenhum documento voltado ao cliente |
| Titularidade do domínio (em nome de quem é registrado) | A CONFIRMAR | Não definida | oculto — ver PEND-13 |
| Custos de registro, renovação e hospedagem | A CONFIRMAR | Não definidos | `SCOPE.md` classifica como `custo de terceiro`, nunca como incluído |
| Certificado TLS / HTTPS | A CONFIRMAR | Depende da hospedagem escolhida | requisito registrado (RNF-11), não afirmado como pronto |
| Serviço de e-mail profissional | A CONFIRMAR | Não contratado | oculto |

### 5.8 Segurança do visitante e ética

| Item | Estado | Fonte | Tratamento no MVP |
| --- | --- | --- | --- |
| Aviso de que o site não atende urgência | CONFIRMADO (necessidade) / A CONFIRMAR (redação final) | Decisão de projeto + dever ético | publicado no rodapé com redação provisória |
| Contatos de crise / emergência | A CONFIRMAR | Precisam ser verificados em fonte oficial antes de publicar | placeholder — **nenhum número é publicado até validação oficial**; ver PEND-14 |
| Depoimentos de pacientes | NÃO PUBLICAR | Regra de publicidade do CFP | oculto |
| Descrição de casos clínicos | NÃO PUBLICAR | Regra de publicidade do CFP | oculto |
| Promessa de resultado, cura, rapidez ou superioridade | NÃO PUBLICAR | Regra de publicidade do CFP | oculto — reforçado por lista de palavras proibidas em `CONTENT.md` |
| Comparação com outros profissionais ou abordagens | NÃO PUBLICAR | Regra de publicidade do CFP | oculto |
| Linguagem que patologize identidades ou vivências | NÃO PUBLICAR | Postura afirmativa + ética profissional | oculto |
| Conteúdo que sugira triagem ou avaliação clínica pelo site | NÃO PUBLICAR | Decisão de projeto | oculto |

### 5.9 Hudi Pages, marca e case

| Item | Estado | Fonte | Tratamento no MVP |
| --- | --- | --- | --- |
| Crédito discreto no rodapé — `Desenvolvido com Hudi Pages, um projeto Hudi Labs` | CONFIRMADO (redação) | Redação aprovada | publicado — `hudiPages.showCredit: true` |
| Link do crédito para site do Hudi Pages / Hudi Labs | A CONFIRMAR | URL oficial não existe ou não foi informada | feature flag — o crédito é texto simples, sem link, até a URL existir |
| Nomenclatura oficial de "Hudi Pages" e "Hudi Labs" (grafia, relação entre as marcas) | A CONFIRMAR | Não formalizada | placeholder — grafia usada é a do contrato do projeto |
| Consentimento para uso do site como case do Hudi Pages | **A CONFIRMAR — NÃO CONCEDIDO** | Não solicitado nem concedido | `hudiPages.caseStudyConsent: false` — nenhum uso público permitido |
| Consentimento para uso de imagem, marca, métricas ou depoimento de Felipe | **A CONFIRMAR — NÃO CONCEDIDO** | Não solicitado nem concedido | oculto — item separado do anterior, ver `SCOPE.md` seção 6 |
| Classificação comercial do escopo (`scopeClassification[]`) | CONFIRMADO (estrutura) / A CONFIRMAR (validação com o cliente) | Contrato técnico + `SCOPE.md` | interno — não renderizado na landing |
| Preços, valores ou tabelas do Hudi Pages | **NÃO PUBLICAR** | Regra do produto: nenhum preço em documento ou página | oculto |
| Referência a `https://saracoutinho.inspira.dev.br` | **NÃO PUBLICAR** | Referência interna de posicionamento (F-31) | oculto — não citada na página, no repositório público nem em material de divulgação; layout, identidade, copy, componentes e dados pessoais dessa página não são copiados nem descritos como verificados |

### 5.10 Identidade visual e tipografia

| Item | Estado | Fonte | Tratamento no MVP |
| --- | --- | --- | --- |
| Paleta brand-mist / brand-lavender-blue / brand-slate / brand-cobalt | CONFIRMADO | F-27 | publicado como design tokens CSS |
| Conceito "pensamento, conexão e acolhimento" | CONFIRMADO | F-28 | publicado como diretriz interna; não vira slogan na página |
| Logotipos (horizontal/vertical, cor/branco/negativo) e manual de 7 páginas | CONFIRMADO (existência) | F-29 | publicado via `public/brand/` + `manifest.json` |
| Recorte de símbolo e favicon adequados | A CONFIRMAR | Não confirmado que existam nas dimensões necessárias | placeholder no `manifest.json` até validação |
| Otimização do SVG de logo (arquivo original pesado) | A CONFIRMAR | Risco técnico identificado (R-09) | obrigatório otimizar antes de publicar; ver critério de aceite |
| Tipografia Manrope (títulos) + Source Sans 3 (corpo) | **INFERÊNCIA DE DESIGN** | INF-01 | publicado, mas sujeito a substituição se o manual de identidade definir outra família |
| "Fio gráfico" como elemento de assinatura | **INFERÊNCIA DE DESIGN** | INF-02 | publicado |

### 5.11 Funcionalidades futuras

| Item | Estado | Fonte | Tratamento no MVP |
| --- | --- | --- | --- |
| Agendamento on-line / integração com Google Calendar | A CONFIRMAR (futuro) | Nunca solicitado | oculto — classificado em `SCOPE.md` |
| Pagamento on-line | A CONFIRMAR (futuro) | Nunca solicitado | oculto |
| Blog ou CMS | A CONFIRMAR (futuro) | Nunca solicitado | oculto |
| Área autenticada do paciente | A CONFIRMAR (futuro) | Nunca solicitado | oculto |
| WhatsApp API / automações / CRM | A CONFIRMAR (futuro) | Nunca solicitado | oculto |
| Múltiplos idiomas | A CONFIRMAR (futuro) | Nunca solicitado | oculto |
| Lista completa de funcionalidades futuras desejadas por Felipe | A CONFIRMAR | Não levantada | coletada pelo wizard `/onboarding`, etapa H |

---

## 6. Hipóteses e inferências de design

Tudo nesta seção é **inferência**, não fato. Cada item pode ser derrubado por uma decisão de Felipe ou por uma regra do manual de identidade sem que isso caracterize erro.

| ID | Inferência | Racional | O que a derruba |
| --- | --- | --- | --- |
| INF-01 | **Tipografia: Manrope (títulos) + Source Sans 3 (corpo).** | Manrope tem terminações geométricas e humanistas que conversam com o conceito "pensamento e conexão" sem frieza; Source Sans 3 tem altura-x generosa e excelente legibilidade em corpo pequeno e em telas. Ambas são open source e auto-hospedáveis via `next/font/google`, o que atende ao requisito de não fazer requisição a terceiro em runtime. | O manual de identidade de 7 páginas especificar outra família, ou Felipe preferir outra. |
| INF-02 | **"Fio gráfico" como elemento de assinatura.** Uma linha fina e contínua que atravessa a página, conectando as seções, com espessura constante e curvatura suave. | Traduz "pensamento, conexão e acolhimento" em um recurso gráfico que é estrutura, não ornamento: o fio literalmente conecta as partes da narrativa. Custa quase nada em performance (SVG inline ou borda CSS) e dá personalidade sem exigir ilustração. | Manual de identidade definir outro recurso gráfico; ou o fio se mostrar ruidoso em mobile. |
| INF-03 | **Linha de sinais de confiança (trust signals)** logo abaixo do hero, com no máximo 4 itens curtos, todos fatos confirmados: atendimento on-line, sessões de 50 minutos, Google Meet, adultos. | P1 e P3 decidem em segundos. Essa linha responde "isso serve para mim?" sem obrigar a rolagem. Usa só fatos — não é prova social nem promessa. | Felipe considerar que polui o hero; ou preferência por página ainda mais enxuta (F-24). |
| INF-04 | **Fluxo apresentado em três passos:** entrar na lista de espera, receber retorno quando houver vaga, primeira sessão on-line. | Reduz ansiedade de quem nunca fez terapia, define expectativa realista sobre a lista de espera e evita que o formulário pareça um agendamento. Três é o número mínimo que conta a história completa. | Felipe preferir texto corrido; ou o processo real ter mais etapas. |
| INF-05 | **Placeholders de modo de revisão** controlados por `NEXT_PUBLIC_REVIEW_MODE`. Com a flag ligada, cada item pendente é exibido com marcação visível (`[A CONFIRMAR: ...]`) para revisão interna; com a flag desligada (padrão de produção), o item simplesmente não é renderizado. | Permite que Felipe veja exatamente o que está faltando sem risco de um placeholder vazar para o público. Falha em modo seguro: o padrão é ocultar. | Nada previsto. É um mecanismo de segurança, não uma escolha estética. |
| INF-06 | **Retenção padrão de 180 dias** (`retentionDays: 180`). | Precisa haver um número para o sistema não reter indefinidamente por omissão. 180 dias é um intervalo plausível para uma lista de espera de agenda limitada — tempo suficiente para uma vaga surgir, curto o bastante para não acumular dados sem propósito. | Definição real de Felipe (PEND-10). **Esse número não é afirmado ao usuário até ser validado.** |
| INF-07 | **Campo de telefone renderizado como opcional** enquanto o canal operacional não está confirmado. | Sem WhatsApp confirmado (5.2), não existe canal telefônico operante. Tornar o campo obrigatório coletaria um dado que hoje não tem finalidade de uso — o oposto de minimização. Mantê-lo opcional permite que quem prefere esse canal se ofereça, sem impor. | Confirmação do número de WhatsApp + decisão de que o retorno será por telefone. |
| INF-08 | **Referência à Progress Pride** feita por um único gesto discreto: um segmento curto do fio gráfico com transição cromática, em ponto de baixa hierarquia visual. | F-26 autoriza referência sutil e proíbe decoração. Um segmento do elemento estrutural da página é referência integrada; uma bandeira aplicada em canto de tela é adesivo. | Felipe achar sutil demais (não comunica) ou explícito demais (vira selo). Decisão dele. |
| INF-09 | **Ordem das seções** conforme a seção 9 deste documento. | Segue a ordem natural das perguntas do visitante: quem é essa pessoa, posso confiar, como ela pensa, tem preparo para o meu caso, como funciona, como eu entro, e o que sobrou de dúvida. | Feedback de Felipe ou de teste com usuários. |
| INF-10 | **FAQ em acordeão, com o primeiro item fechado.** | Mantém a página curta (F-24) e evita muro de texto no fim. Todos os itens permanecem no DOM para SEO e para busca no navegador. | Preferência por lista aberta. |
| INF-11 | **Campo de mensagem livre desligado no MVP.** | Um campo aberto em site de psicologia é convite involuntário para relato clínico. Desligá-lo é a forma mais eficaz de garantir que a lista de espera não vire triagem e que dado sensível não seja coletado. A redação fica pronta em `CONTENT.md` para quando Felipe decidir. | Felipe decidir que quer o campo, aceitando a advertência explícita de não incluir dados de saúde. |
| INF-12 | **Menu com no máximo 4 itens + 1 CTA.** | F-24 pede simplicidade. Quatro âncoras cobrem a página inteira sem submenu. | Necessidade de nova seção de topo. |

---

## 7. Requisitos funcionais

Prioridades: `obrigatório para lançamento` · `desejável` · `futuro`.

### 7.1 Estrutura e navegação

| ID | Requisito | Prioridade |
| --- | --- | --- |
| RF-01 | A rota `/` renderiza a landing page completa em página única, indexável. | obrigatório para lançamento |
| RF-02 | O cabeçalho exibe o logotipo (ou `Felipe Carvalho`), a identificação `Psicólogo — CRP 02/23810` e no máximo 4 itens de navegação por âncora, mais o CTA primário. | obrigatório para lançamento |
| RF-03 | Em viewports abaixo de 768 px, a navegação colapsa em menu acionável por toque, mouse e teclado, com foco preso enquanto aberto e fechamento por `Esc`. | obrigatório para lançamento |
| RF-04 | A navegação por âncora rola suavemente até a seção alvo, respeitando `prefers-reduced-motion`, e move o foco para o cabeçalho da seção. | obrigatório para lançamento |
| RF-05 | O rodapé exibe: linha de identificação completa, links legais, aviso de não atendimento de urgência, crédito Hudi Pages (quando `showCredit`) e linha de copyright. | obrigatório para lançamento |

### 7.2 Conteúdo da landing

| ID | Requisito | Prioridade |
| --- | --- | --- |
| RF-06 | O hero exibe eyebrow, H1, subheadline, CTA primário e CTA secundário, todos com os textos aprovados em `CONTENT.md`. | obrigatório para lançamento |
| RF-07 | A linha de sinais de confiança exibe no máximo 4 itens, cada um um fato confirmado da seção 4. | desejável |
| RF-08 | A seção "Sobre" renderiza 3 parágrafos e uma frase em destaque; o slot de foto é renderizado apenas se `professional.photo` estiver definido, sem quebrar o layout quando ausente. | obrigatório para lançamento |
| RF-09 | A seção "Abordagem" apresenta 2 blocos (TCC e postura afirmativa) e a frase-síntese aprovada. | obrigatório para lançamento |
| RF-10 | A seção de credenciais lista os itens de `content.credentials[]`, exibindo de forma visualmente inequívoca o rótulo `concluída` ou `em andamento` de cada um. Nenhum item em andamento pode ser apresentado sem esse rótulo. | obrigatório para lançamento |
| RF-11 | A seção de compromisso com a população LGBTQIA+ apresenta o texto-base aprovado e as 4 experiências confirmadas, sem nomear terceiros, eventos ou instituições. | obrigatório para lançamento |
| RF-12 | A seção "Como funciona" apresenta 3 passos e as notas sobre público adulto, atendimento particular, Receita Saúde e ausência de garantia de reembolso. | obrigatório para lançamento |
| RF-13 | A FAQ apresenta 5 perguntas em acordeão acessível, operável por mouse, toque e teclado, com estado expandido comunicado via `aria-expanded`. | obrigatório para lançamento |
| RF-14 | Toda string de conteúdo vem de `src/config/project.config.ts` com seu `status`; nenhum texto de negócio é escrito diretamente em componente. | obrigatório para lançamento |
| RF-15 | Itens com `status: 'a-confirmar'` não são renderizados em produção; com `NEXT_PUBLIC_REVIEW_MODE` ativo, são renderizados com marcação visível de pendência. | obrigatório para lançamento |

### 7.3 Lista de espera

| ID | Requisito | Prioridade |
| --- | --- | --- |
| RF-16 | A seção de lista de espera exibe título, texto de apoio e formulário quando `availabilityStatus` for `open` ou `limited`. | obrigatório para lançamento |
| RF-17 | Quando `availabilityStatus` for `waitlist-closed`, o formulário não é renderizado e a variante de lista fechada é exibida em seu lugar. | obrigatório para lançamento |
| RF-18 | O formulário coleta: nome (obrigatório), e-mail (obrigatório), telefone (opcional, INF-07) e consentimento LGPD (checkbox obrigatório). | obrigatório para lançamento |
| RF-19 | O formulário inclui um campo honeypot oculto de acessibilidade neutra (fora da ordem de tabulação, `aria-hidden`), cujo preenchimento faz a submissão ser descartada silenciosamente com resposta de sucesso genérica. | obrigatório para lançamento |
| RF-20 | A validação usa um schema zod único compartilhado entre cliente e servidor. O servidor **sempre** revalida, independentemente do resultado no cliente. | obrigatório para lançamento |
| RF-21 | O formulário implementa os estados `idle`, `validating`, `submitting`, `success`, `error`, `duplicate` e `offline`, cada um com mensagem própria definida em `CONTENT.md`. | obrigatório para lançamento |
| RF-22 | Duplo envio é impedido: o botão é desabilitado durante `submitting` e uma submissão em curso bloqueia novas submissões. | obrigatório para lançamento |
| RF-23 | Mudanças de estado do formulário são anunciadas a leitores de tela por região `aria-live="polite"`; erros de campo são associados aos respectivos inputs via `aria-describedby`. | obrigatório para lançamento |
| RF-24 | `POST /api/waitlist` aplica limite de taxa por IP, em memória, configurado por `WAITLIST_RATE_LIMIT_MAX` e `WAITLIST_RATE_LIMIT_WINDOW_MS`. Não há CAPTCHA. | obrigatório para lançamento |
| RF-25 | O envio usa o adapter definido por `WAITLIST_ADAPTER`. O padrão é `mock`, que **nunca** afirma ter salvo um registro real: a interface de sucesso em modo mock indica explicitamente que se trata de um teste. | obrigatório para lançamento |
| RF-26 | Nenhum valor do formulário aparece em URL, query string, log de servidor, log de cliente, mensagem de erro exposta ou ferramenta de analytics. | obrigatório para lançamento |
| RF-27 | Campos sensíveis (saúde, diagnóstico, medicação, orientação sexual, identidade de gênero, raça) estão desabilitados por `privacy.sensitiveFieldsEnabled: false` e não existem no schema. | obrigatório para lançamento |
| RF-28 | O campo de mensagem livre permanece desligado no MVP (INF-11), com redação pronta para ativação futura. | desejável |

### 7.4 Contato e canais

| ID | Requisito | Prioridade |
| --- | --- | --- |
| RF-29 | Links de Instagram, WhatsApp e e-mail são renderizados apenas quando os respectivos campos de `contact` estiverem definidos; ausentes, não deixam espaço vazio nem link quebrado. | obrigatório para lançamento |
| RF-30 | O link de WhatsApp, quando ativo, usa exclusivamente a mensagem neutra aprovada. Nenhuma resposta de formulário, dado pessoal ou informação de saúde é incluída na URL. | obrigatório para lançamento |

### 7.5 Páginas legais e SEO

| ID | Requisito | Prioridade |
| --- | --- | --- |
| RF-31 | `/politica-de-privacidade` e `/termos` existem, são acessíveis pelo rodapé e exibem aviso visível de que o conteúdo é rascunho pendente de revisão jurídica. | obrigatório para lançamento |
| RF-32 | `/` fornece `title`, `meta description`, `canonical`, dados de Open Graph e idioma `pt-BR`. | obrigatório para lançamento |
| RF-33 | Nenhum dado estruturado (JSON-LD) que afirme fato não confirmado — endereço, telefone, faixa de preço, avaliação — é publicado. | obrigatório para lançamento |
| RF-34 | `NEXT_PUBLIC_SITE_URL` alimenta canonical e `sitemap`/`robots`. Com a variável vazia, nenhuma URL absoluta inventada é emitida. | obrigatório para lançamento |

### 7.6 Onboarding privado

| ID | Requisito | Prioridade |
| --- | --- | --- |
| RF-35 | `/onboarding` é uma rota privada marcada `noindex, nofollow` e excluída do `sitemap`. | obrigatório para lançamento |
| RF-36 | O wizard tem 8 etapas (A–H), com indicador de progresso, navegação para frente e para trás e possibilidade de pular etapa. | obrigatório para lançamento |
| RF-37 | O progresso é persistido em `localStorage`, permitindo retomar a sessão. Um controle explícito permite apagar tudo. | obrigatório para lançamento |
| RF-38 | A tela final apresenta: resumo das respostas, lista de pendências remanescentes, matriz de requisitos e ações de exportação. | obrigatório para lançamento |
| RF-39 | A exportação gera JSON e Markdown, com botões de copiar e de baixar. | obrigatório para lançamento |
| RF-40 | **Nada é enviado pela rede.** O wizard não faz requisição a nenhum endpoint, próprio ou de terceiro. | obrigatório para lançamento |
| RF-41 | Um banner permanente identifica `/onboarding` como protótipo interno de coleta de decisões, não como formulário oficial nem como canal clínico. | obrigatório para lançamento |
| RF-42 | Nenhuma resposta do onboarding é exposta na landing pública, em metadado, em log ou em URL. | obrigatório para lançamento |

### 7.7 Futuro

| ID | Requisito | Prioridade |
| --- | --- | --- |
| RF-43 | Troca do adapter `mock` por destino real (webhook) sem alteração de componente de interface. | futuro |
| RF-44 | Publicação da política de privacidade definitiva com controlador e canal do titular identificados. | futuro |
| RF-45 | Exibição de foto profissional aprovada. | futuro |
| RF-46 | Ativação dos canais Instagram e WhatsApp. | futuro |
| RF-47 | Agendamento, pagamento, blog, área autenticada, múltiplos idiomas e automações — todos classificados em `SCOPE.md`. | futuro |

---

## 8. Requisitos não funcionais

| ID | Requisito | Verificação |
| --- | --- | --- |
| RNF-01 | **Acessibilidade WCAG 2.2 nível AA** como meta declarada: contraste mínimo, alvos de toque adequados, foco visível e não obscurecido, ordem de foco lógica, HTML semântico, `alt` significativo, um único `h1`, hierarquia de títulos sem saltos. | Auditoria manual com teclado e leitor de tela + verificação automatizada. |
| RNF-02 | **Responsividade** verificada e correta em 360, 768, 1024 e 1440 px de largura. | Inspeção nas quatro larguras. |
| RNF-03 | **Hero legível a 200% de zoom** sem perda de conteúdo, sobreposição ou corte. | Teste manual. |
| RNF-04 | **Sem rolagem horizontal no formulário a 360 px** — nem no formulário, nem em qualquer outra seção. | Teste manual. |
| RNF-05 | **Performance:** LCP estável, com a imagem/bloco principal do hero priorizado; CLS próximo de zero, com dimensões reservadas para logotipo, foto e áreas de mensagem do formulário; fontes auto-hospedadas com `display: swap` e sem FOIT prolongado. | Medição em build de produção. |
| RNF-06 | **Peso de ativos controlado.** Logotipos otimizados antes da publicação; o SVG original de alta densidade não vai para produção sem otimização. | Verificação de tamanho dos arquivos em `public/brand/`. |
| RNF-07 | **SEO básico correto:** `lang="pt-BR"`, títulos e descrições únicos por rota, canonical, Open Graph, `robots`/`sitemap` coerentes, `/onboarding` fora do índice. | Inspeção do HTML gerado. |
| RNF-08 | **TypeScript em modo strict**, sem `any` implícito e sem `@ts-ignore` não justificado. `npm run typecheck` passa sem erro. | CI local. |
| RNF-09 | **Nenhum segredo no cliente ou no repositório.** Apenas variáveis com prefixo `NEXT_PUBLIC_` chegam ao navegador; `WAITLIST_WEBHOOK_TOKEN` nunca é referenciado em código de cliente. | Revisão de código + busca por padrões de segredo. |
| RNF-10 | **Console limpo:** nenhum erro e nenhum aviso de React, Next.js ou hidratação no carregamento e na interação normal. | Inspeção manual em desenvolvimento e em produção. |
| RNF-11 | **Transporte seguro:** o site é servido exclusivamente por HTTPS. O envio do formulário nunca ocorre por conexão não cifrada. | Verificação na publicação. |
| RNF-12 | **Dependências mínimas e justificadas.** Runtime: `next`, `react`, `react-dom`, `zod`. Desenvolvimento: `typescript`, `eslint`/`eslint-config-next`, `vitest`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`. Sem Tailwind, sem biblioteca de UI, sem analytics. Toda nova dependência exige justificativa escrita. | Revisão de `package.json`. |
| RNF-13 | **Movimento respeitoso:** animações discretas, sempre desativáveis por `prefers-reduced-motion`, sem autoplay, sem paralaxe agressiva, sem elemento que capture rolagem. | Teste com preferência de movimento reduzido ativa. |
| RNF-14 | **Qualidade de código:** `npm run lint`, `npm run typecheck`, `npm run test` e `npm run build` executam sem erro. | Execução completa antes de qualquer publicação. |
| RNF-15 | **Manutenibilidade de conteúdo:** alterar um texto público exige editar apenas `src/config/project.config.ts`, sem tocar em componentes. | Revisão de arquitetura. |
| RNF-16 | **Compatibilidade:** funcionamento correto nas versões atuais de Chrome, Firefox, Safari e Edge, em desktop e mobile. | Teste amostral. |

---

## 9. Arquitetura da informação

### 9.1 Ordem das seções em `/`

| # | Seção | Âncora | Pergunta que responde |
| --- | --- | --- | --- |
| 1 | Cabeçalho | — | Quem é e como navego? |
| 2 | Hero | `#inicio` | O que é isso e serve para mim? |
| 3 | Sinais de confiança | — | Formato, plataforma, público (INF-03) |
| 4 | Sobre | `#sobre` | Quem é essa pessoa? |
| 5 | Abordagem | `#abordagem` | Como ela trabalha? |
| 6 | Formações e credenciais | `#abordagem` (subseção) | Ela tem preparo? |
| 7 | Compromisso com a população LGBTQIA+ | `#abordagem` (subseção) | Ela tem preparo para mim especificamente? |
| 8 | Como funciona o atendimento | `#como-funciona` | O que acontece se eu der o próximo passo? |
| 9 | Lista de espera | `#lista-de-espera` | Como eu entro? |
| 10 | Perguntas frequentes | `#perguntas-frequentes` | E as dúvidas que sobraram? |
| 11 | Rodapé | — | Identificação, legal, urgência, crédito. |

Credenciais e compromisso LGBTQIA+ são blocos visuais próprios, mas compartilham a âncora de "Abordagem" para manter o menu em 4 itens (INF-12).

### 9.2 Navegação

**Menu (máximo 4 itens):** `Sobre` (`#sobre`) · `Abordagem` (`#abordagem`) · `Como funciona` (`#como-funciona`) · `Perguntas frequentes` (`#perguntas-frequentes`).
**CTA do cabeçalho:** `Entrar na lista de espera` → `#lista-de-espera`.

Regras: âncoras internas sem recarregar a página; rolagem suave respeitando `prefers-reduced-motion`; foco movido para o título da seção destino; menu mobile como painel acionável por toque, mouse e teclado, com `Esc` para fechar e foco preso enquanto aberto; nenhum submenu.

### 9.3 Estrutura do cabeçalho

Logotipo (lockup horizontal em cor) · nome público `Felipe Carvalho` · identificação `Psicólogo — CRP 02/23810` · navegação · CTA primário. Em mobile: logotipo + botão de menu; a identificação permanece visível ou é reposicionada logo abaixo do hero, nunca omitida.

### 9.4 Estrutura do rodapé

1. Linha de identificação: `Felipe Gonzaga de Carvalho Gondim — Psicólogo — CRP 02/23810`
2. Links legais: `Política de Privacidade` · `Termos de uso`
3. Aviso de não atendimento de urgência + contatos de crise (**A CONFIRMAR** — hoje placeholder)
4. Canais públicos (renderizados apenas se confirmados)
5. Crédito discreto: `Desenvolvido com Hudi Pages, um projeto Hudi Labs` (texto simples, sem link enquanto a URL oficial não existir)
6. Copyright

### 9.5 Rotas

| Rota | Tipo | Indexação | Observação |
| --- | --- | --- | --- |
| `/` | Landing pública | indexável | Página única. |
| `/onboarding` | Wizard privado | `noindex, nofollow` | Separada da landing. Sem link a partir da navegação pública. Fora do `sitemap`. |
| `/politica-de-privacidade` | Página legal | indexável | Rascunho marcado como provisório. |
| `/termos` | Página legal | indexável | Rascunho marcado como provisório. |
| `POST /api/waitlist` | Endpoint | — | Único endpoint da aplicação. |

---

## 10. Modelo de dados

### 10.1 Contrato `ProjectConfig`

Contrato fixo, definido no projeto. Os nomes de campo abaixo seguem o contrato; a granularidade de tipos auxiliares é detalhamento de implementação.

```ts
// src/config/types.ts

export type ContentStatus = 'confirmado' | 'a-confirmar';
export type AvailabilityStatus = 'open' | 'limited' | 'waitlist-closed';
export type CredentialStatus = 'concluida' | 'em-andamento';

/** Toda string de conteúdo carrega seu próprio estado de confirmação. */
export interface ContentItem {
  id: string;
  text: string;
  status: ContentStatus;
  note?: string;
}

export interface Professional {
  fullName: string;
  displayName: string;
  profession: string;      // 'Psicólogo'
  registration: string;    // 'CRP 02/23810'
  locationLabel?: string;  // 'Pernambuco' — opcional
  photo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export interface BrandLogo {
  src: string;
  width: number;
  height: number;
}

export interface Brand {
  logos: {
    logoHorizontalColor: BrandLogo;
    logoVerticalColor: BrandLogo;
    logoHorizontalWhite: BrandLogo;
    logoHorizontalNegative: BrandLogo;
    symbol: BrandLogo;
    favicon: BrandLogo;
  };
  colors: {
    mist: string;          // '#CEE4EA'
    lavenderBlue: string;  // '#D0DEED'
    slate: string;         // '#4D576B'
    cobalt: string;        // '#2B4BA9'
  };
  concept: string;         // 'pensamento, conexão e acolhimento'
}

export interface Service {
  modality: 'online';
  audience: string;                       // 'Adultos'
  sessionMinutes: number;                 // 50
  platform: string;                       // 'Google Meet'
  availabilityStatus: AvailabilityStatus; // MVP: 'limited'
}

export interface Credential extends ContentItem {
  credentialStatus: CredentialStatus;     // 'concluida' | 'em-andamento'
}

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  status: ContentStatus;
}

export interface HeroContent {
  eyebrow: ContentItem;
  headline: ContentItem;
  subheadline: ContentItem;
  primaryCta: ContentItem;
  secondaryCta: ContentItem;
  trustSignals: ContentItem[];
}

export interface Content {
  hero: HeroContent;
  about: ContentItem[];
  approaches: ContentItem[];
  credentials: Credential[];
  lgbtqCommitment: ContentItem[];
  faq: FaqEntry[];
}

export interface Contact {
  instagramUrl?: string;    // MVP: undefined
  whatsappNumber?: string;  // MVP: undefined
  email?: string;           // MVP: undefined
  whatsappMessage?: string; // texto neutro aprovado; só usado se whatsappNumber existir
}

export interface Privacy {
  policyUrl?: string;             // MVP: undefined
  retentionDays?: number;         // MVP: 180 — A CONFIRMAR (INF-06)
  sensitiveFieldsEnabled: false;  // literal: nunca true no MVP
}

export interface ScopeClassificationEntry {
  item: string;
  category:
    | 'incluido-no-escopo-base'
    | 'personalizacao-simples'
    | 'personalizacao-intermediaria'
    | 'personalizacao-avancada';
  thirdPartyCost: boolean;
}

export interface HudiPages {
  showCredit: boolean;                             // MVP: true
  caseStudyConsent: boolean;                       // MVP: false — não presumir
  scopeClassification: ScopeClassificationEntry[]; // uso interno, não renderizado
}

export interface ProjectConfig {
  professional: Professional;
  brand: Brand;
  service: Service;
  content: Content;
  contact: Contact;
  privacy: Privacy;
  hudiPages: HudiPages;
}
```

**Padrões obrigatórios do MVP:** `service.availabilityStatus: 'limited'` · todos os campos de `contact` (exceto `whatsappMessage`) `undefined` · `professional.photo.src: '/felipe-carvalho-professional.jpg'` · `privacy.policyUrl: undefined` · `privacy.retentionDays: 180` (A CONFIRMAR) · `privacy.sensitiveFieldsEnabled: false` · `hudiPages.showCredit: true` · `hudiPages.caseStudyConsent: false`.

### 10.2 Manifesto de marca

```jsonc
// public/brand/manifest.json
{
  "logoHorizontalColor":    { "src": "/brand/...", "width": 0, "height": 0 },
  "logoVerticalColor":      { "src": "/brand/...", "width": 0, "height": 0 },
  "logoHorizontalWhite":    { "src": "/brand/...", "width": 0, "height": 0 },
  "logoHorizontalNegative": { "src": "/brand/...", "width": 0, "height": 0 },
  "symbol":                 { "src": "/brand/...", "width": 0, "height": 0 },
  "favicon":                { "src": "/brand/...", "width": 0, "height": 0 }
}
```

Larguras e alturas reais devem refletir os arquivos otimizados. Reservar dimensão é o que evita CLS (RNF-05).

### 10.3 Payload da lista de espera

> **INFERÊNCIA (INF-07, INF-11):** o contrato define schema zod compartilhado e honeypot, mas não fixa a lista de campos. A composição abaixo deriva das decisões de minimização deste documento e pode ser ajustada por Felipe.

```ts
// Schema compartilhado cliente + servidor
export const waitlistSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(20).optional(),   // opcional (INF-07)
  consent: z.literal(true),                       // consentimento explícito
  website: z.string().max(0).optional(),          // honeypot: precisa estar vazio
});

export type WaitlistPayload = z.infer<typeof waitlistSchema>;
```

Campos deliberadamente ausentes: mensagem livre (INF-11), data de nascimento, gênero, orientação sexual, motivo da busca, queixa, diagnóstico, uso de medicação, plano de saúde, cidade, CPF. Nenhum deles tem finalidade definida no MVP.

Resposta da API — apenas o suficiente para dirigir a interface, sem eco de dado pessoal:

```ts
export type WaitlistResult =
  | { ok: true; mode: 'mock' | 'webhook' }
  | { ok: false; reason: 'validation' | 'duplicate' | 'rate-limited' | 'server' };
```

O cliente traduz `reason` em mensagem; o servidor nunca devolve texto de erro cru nem os valores recebidos.

### 10.4 Exportação do onboarding

> **INFERÊNCIA:** o contrato define 8 etapas A–H, resumo, pendências, matriz de requisitos e exportação em JSON e Markdown, mas não fixa os nomes das etapas nem o formato do arquivo. A proposta abaixo é de design.

Etapas propostas: **A** Identificação e dados profissionais · **B** Contatos e canais públicos · **C** Conteúdo e textos do site · **D** Formações e credenciais · **E** Atendimento e agenda · **F** Privacidade e dados · **G** Domínio, hospedagem e custos · **H** Personalizações desejadas e consentimentos.

```ts
export interface OnboardingAnswer {
  questionId: string;
  stepId: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
  value: string | string[] | boolean | null;
  decision?: 'quero-agora' | 'talvez-depois' | 'nao-quero';
  skipped: boolean;
}

export interface OnboardingPending {
  id: string;                 // 'PEND-01'
  label: string;
  blocks: string;             // o que fica bloqueado enquanto pendente
  provisionalDefault: string; // o padrão seguro em vigor
}

export interface OnboardingExport {
  schemaVersion: 1;
  generatedAt: string;        // ISO 8601, gerado no dispositivo
  project: 'felipe-carvalho-hudi-pages';
  answers: OnboardingAnswer[];
  pendings: OnboardingPending[];
  requirementMatrix: Array<{
    requirementId: string;    // 'RF-18'
    status: 'atendido' | 'parcial' | 'bloqueado' | 'nao-aplicavel';
    note?: string;
  }>;
}
```

O arquivo é gerado inteiramente no navegador. Não há upload, não há chamada de rede, não há identificador de dispositivo. `localStorage` guarda apenas o rascunho, e um controle explícito permite apagá-lo.

---

## 11. Integrações

**Estado atual: nenhuma integração está ativa. Não existe conta, credencial, token, chave ou contrato com nenhum serviço de terceiro.** Nada neste projeto envia dados para fora do próprio servidor da aplicação.

### 11.1 Adapter da lista de espera

| Adapter | Quando é usado | Comportamento | Estado |
| --- | --- | --- | --- |
| `mock` | Padrão do MVP (`WAITLIST_ADAPTER=mock`) | Valida o payload, não persiste nada e devolve sucesso **explicitamente identificado como teste** na interface. Nunca afirma que um contato foi registrado. | Ativo |
| `webhook` | Quando `WAITLIST_ADAPTER=webhook` | Faz `POST` autenticado para `WAITLIST_WEBHOOK_URL` com `WAITLIST_WEBHOOK_TOKEN`. | Implementado, **não configurado** — não há URL nem token |

A troca de adapter é uma mudança de variável de ambiente. Nenhum componente de interface muda (RF-43).

### 11.2 Variáveis de ambiente

| Variável | Exposta ao cliente | Finalidade | Estado no MVP |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | sim | URL canônica, `sitemap`, Open Graph | vazia até o domínio ser definido |
| `NEXT_PUBLIC_REVIEW_MODE` | sim | Exibe marcações de pendência para revisão interna (INF-05) | desligada em produção |
| `WAITLIST_ADAPTER` | não | `mock` ou `webhook` | `mock` |
| `WAITLIST_WEBHOOK_URL` | não | Destino do webhook | vazia |
| `WAITLIST_WEBHOOK_TOKEN` | não | Autenticação do webhook | vazia — **nunca versionada** |
| `WAITLIST_RATE_LIMIT_MAX` | não | Máximo de submissões por janela, por IP | configurável |
| `WAITLIST_RATE_LIMIT_WINDOW_MS` | não | Duração da janela do limite | configurável |

### 11.3 Integrações possíveis no futuro

Todas classificadas comercialmente em `SCOPE.md`. Nenhuma está prevista, contratada ou estimada.

| Integração | O que passaria a existir | Implicação de privacidade |
| --- | --- | --- |
| E-mail transacional | Notificação a Felipe a cada nova entrada | Dado pessoal passa a trafegar por terceiro; exige base legal, contrato de operador e atualização da política |
| Planilha (Google Sheets ou equivalente) | Destino simples e legível dos registros | Idem, com atenção a compartilhamento e permissões |
| CRM | Gestão da lista de espera com histórico | Aumenta retenção e superfície de risco; exige política de retenção definida |
| Google Calendar / agendamento | Marcação direta de sessões | Muda a natureza do site: deixa de ser lista de espera |
| WhatsApp API | Automação de retorno | Terceiro com acesso a metadados de conversa em contexto de saúde |
| Analytics | Métricas de uso | Exige abordagem de consentimento; ver seção 3.2 |
| Banco de dados próprio | Persistência controlada | Exige backup, criptografia, controle de acesso e plano de resposta a incidente |

Nenhuma dessas integrações deve ser apresentada a Felipe como pronta, incluída ou de custo zero.

---

## 12. Privacidade, LGPD e ética profissional

> **Aviso:** esta seção descreve obrigações em termos gerais e orienta o desenho do produto. **Não é parecer jurídico.** Nenhum número de artigo, texto de dispositivo ou conclusão legal é afirmado aqui. Revisão jurídica e validação pelo próprio profissional continuam necessárias antes da publicação.

### 12.1 Princípios aplicados ao produto

| Princípio | Como aparece concretamente neste projeto |
| --- | --- |
| **Minimização** | O formulário coleta nome, e-mail, telefone opcional e consentimento. Nada além. Campo de mensagem livre desligado (INF-11). Sem CPF, sem data de nascimento, sem cidade, sem motivo da busca. |
| **Finalidade** | Um único propósito, declarado na própria página: entrar em contato quando surgir vaga na agenda. Nenhum uso secundário — sem newsletter, sem remarketing, sem enriquecimento de base. |
| **Necessidade** | Cada campo precisa justificar sua existência. O telefone só é opcional porque nem o canal de retorno está confirmado (INF-07). |
| **Transparência** | O texto de consentimento diz o que é coletado, para quê e por quanto tempo. Enquanto a retenção não estiver definida, o texto **não afirma um prazo**. |
| **Segurança** | Transporte por HTTPS (RNF-11); segredos apenas no servidor (RNF-09); limite de taxa por IP (RF-24); honeypot (RF-19); nenhum dado em log, URL ou analytics (RF-26). |
| **Prevenção** | Campos sensíveis desabilitados por padrão de código (`sensitiveFieldsEnabled: false`), não por convenção. Adapter padrão que não persiste nada. Fontes auto-hospedadas para eliminar requisição a terceiro em runtime. |
| **Não discriminação** | Nenhum dado que permita segmentar por identidade, orientação, raça ou condição de saúde é coletado — nem sequer inferido. |

### 12.2 Por que os campos sensíveis estão desligados

Dados sobre saúde, vida sexual, orientação sexual, identidade de gênero e origem racial recebem proteção reforçada na legislação brasileira de proteção de dados. Coletá-los em um formulário público exigiria base legal específica, controles de segurança adicionais, política de retenção definida e um propósito claro — nada disso existe neste MVP.

Mais importante: **eles não são necessários.** A finalidade do formulário é avisar alguém quando surgir uma vaga. Nome e um meio de contato bastam. Tudo além disso seria coleta sem propósito, e em contexto de saúde mental a coleta sem propósito é risco puro, sem contrapartida.

A configuração `privacy.sensitiveFieldsEnabled: false` é tipada como literal `false` justamente para que ligá-la exija uma decisão deliberada de código, revisão e atualização da política — nunca um descuido.

### 12.3 Por que a lista de espera não é triagem clínica

O formulário **não** pergunta motivo da busca, sintomas, diagnóstico, histórico, medicação, urgência ou gravidade. Isso é deliberado e tem três razões:

1. **Ética.** Avaliação clínica acontece em contexto clínico, com o profissional presente. Um formulário web não avalia ninguém, e não pode dar a impressão de que avalia.
2. **Risco.** Um campo aberto pode receber relato de sofrimento agudo ou de risco. Sem um processo de leitura, prazo de resposta e protocolo definido, criar esse canal é criar uma expectativa de socorro que o site não tem como cumprir.
3. **Privacidade.** Todo relato desses é dado sensível. Não coletar é a proteção mais forte que existe.

Consequência de produto: o site precisa dizer explicitamente que **não atende urgência** e apontar para os canais adequados (rodapé, PEND-14). O texto de apoio do formulário deixa claro que a entrada na lista não é início de atendimento e não estabelece vínculo terapêutico.

### 12.4 Retenção e exclusão

**Ambas pendentes.** O padrão técnico de `180 dias` (INF-06) existe para impedir retenção indefinida por omissão, não porque foi decidido.

Enquanto não houver definição:
- Nenhum prazo é afirmado ao usuário na página.
- O rascunho da política de privacidade traz placeholder visível no lugar do prazo.
- O adapter `mock` não persiste nada, então hoje não há base a expirar.

Quando o destino real existir, precisam existir junto: prazo definido, rotina de descarte, canal para o titular pedir exclusão, prazo de resposta a esse pedido e responsável identificado (PEND-10, PEND-11).

### 12.5 Regras técnicas invioláveis

| Regra | Motivo |
| --- | --- |
| **Codificação de URL nunca é chamada de criptografia.** Nenhum documento, comentário de código ou texto de interface pode sugerir que dados em uma URL estejam protegidos. `encodeURIComponent` é formatação, não segurança. | Impedir falsa sensação de proteção. |
| **Nenhuma resposta de formulário entra em link `wa.me`.** O link de WhatsApp usa exclusivamente a mensagem neutra aprovada. | Conteúdo de URL fica em histórico, prévia de link e log de intermediários. |
| **Nenhum valor de formulário em URL, query string, log, mensagem de erro ou analytics.** | RF-26. |
| **Nenhum dado pessoal no repositório**, inclusive em fixture de teste, comentário, mock ou captura de tela. | O repositório pode se tornar público. |
| **O fato privado sobre o número atual de pessoas atendidas não existe em lugar nenhum do código**, nem em comentário, nem em JSON de exemplo, nem em texto de teste. | NÃO PUBLICAR, sem exceção. |
| **`/onboarding` nunca é indexado e nunca envia resposta pela rede.** | RF-35, RF-40. |

### 12.6 Regras de publicidade profissional (CFP)

As regras abaixo são traduzidas em restrições concretas de conteúdo e verificadas nos critérios de aceite. São descritas **em termos gerais**; o texto normativo deve ser reconferido nas fontes antes da publicação.

| Regra aplicada | Efeito prático no site |
| --- | --- |
| Identificação profissional completa | `Felipe Gonzaga de Carvalho Gondim — Psicólogo — CRP 02/23810` no rodapé; `Psicólogo — CRP 02/23810` também no cabeçalho. |
| Só qualificações reais | Somente F-14 a F-17. Nenhuma formação, título, curso, prêmio ou filiação além dessas. |
| Distinção entre concluído e em andamento | Sexologia Clínica aparece como **concluída**; as outras três aparecem com rótulo explícito **em andamento**, com peso visual equivalente ao do nome do curso. |
| Preço não é elemento publicitário | Nenhum valor, faixa, promoção, desconto, pacote ou condição de pagamento na página. |
| Sem promessa de resultado | Nenhuma frase que garanta melhora, prazo, eficácia ou transformação. |
| Sem alegação de cura, garantia, rapidez ou superioridade | Lista de palavras proibidas em `CONTENT.md`, verificada em revisão. |
| Sem ataque ou comparação | Nenhuma menção a outros profissionais, abordagens ou serviços, nem por contraste implícito. |
| Sem depoimento de paciente ou caso clínico | Nenhuma prova social. Os sinais de confiança são fatos operacionais (formato, plataforma, público), não opiniões. |
| Sem sensacionalismo ou patologização | Linguagem sóbria; nenhuma vivência ou identidade descrita como problema. |
| Atendimento on-line conforme regulamentação vigente | Modalidade, plataforma e público descritos de forma factual, sem afirmar conformidade que não foi verificada. |

### 12.7 Fontes a reconferir antes da publicação

Consultar diretamente as fontes abaixo, na versão vigente na data da publicação. Este documento **não** reproduz nem interpreta o texto normativo.

- Orientações do CFP sobre publicidade nas redes sociais — https://site.cfp.org.br/cfp-divulga-orientacoes-a-categoria-sobre-publicidade-nas-redes-sociais/
- Nota Técnica CFP 1/2022, sobre uso profissional das redes sociais, publicidade e cuidados éticos — https://site.cfp.org.br/documentos/nota-tecnica-sobre-uso-profissional-das-redes-sociais-publicidade-e-cuidados-eticos/
- Resolução CFP 9/2024, sobre orientação psicológica pela internet — https://atosoficiais.com.br/lei/orientacao-psicologica-pela-internet-cfp
- LGPD — Lei 13.709/2018 — https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm

**Revisão jurídica e validação pelo próprio profissional permanecem necessárias.** A equipe de desenvolvimento não é a responsável ética pelo conteúdo publicado.

---

## 13. Riscos e mitigações

| ID | Risco | Categoria | Impacto | Mitigação no MVP |
| --- | --- | --- | --- | --- |
| R-01 | **Diversidade usada como decoração.** Referência à Progress Pride ou à população LGBTQIA+ percebida como oportunismo de marketing. | Ético / reputacional | Alto — atinge exatamente o público que o site pretende acolher | A seção LGBTQIA+ é construída sobre 4 experiências factuais e verificáveis (F-18 a F-21). A referência gráfica é um único gesto integrado ao fio gráfico (INF-08), nunca um selo. Nenhuma linguagem de "aliado" ou badge. |
| R-02 | **Formação em andamento lida como título concluído.** Visitante entende que Felipe já é especialista em TCC. | Ético / legal | Alto — risco disciplinar | Rótulo `em andamento` obrigatório e com peso visual equivalente (RF-10); `credentialStatus` tipado no config; item específico no checklist de aceite. |
| R-03 | **Formulário vira triagem clínica.** Alguém escreve sofrimento agudo esperando resposta. | Ético / segurança da pessoa | Crítico | Sem campo de mensagem livre (INF-11); sem pergunta sobre motivo ou sintoma; texto de apoio explícito de que não é início de atendimento; aviso de não atendimento de urgência no rodapé. |
| R-04 | **Adapter `mock` confundido com destino real.** Alguém se cadastra achando que entrou na lista, e ninguém recebe nada. | Operacional / reputacional | Crítico | O modo `mock` marca a tela de sucesso explicitamente como teste (RF-25); documentado em `README` e em `SCOPE.md`; item de aceite antes de qualquer divulgação. **O site não deve ser divulgado publicamente enquanto o adapter for `mock`.** |
| R-05 | **Publicação sem política de privacidade válida.** | Legal | Alto | `/politica-de-privacidade` existe com aviso visível de rascunho; `policyUrl: undefined`; pendência bloqueante (PEND-11). |
| R-06 | **Prazo de retenção inventado.** Página afirmar "180 dias" como se fosse decisão. | Legal / confiança | Médio | O número existe só como padrão técnico (INF-06) e **nunca** é exibido ao usuário até validação. |
| R-07 | **Dado pessoal vazando em URL, log ou histórico.** | Legal / privacidade | Alto | Regras da seção 12.5; verificação nos critérios de aceite; mensagem de WhatsApp fixa e neutra. |
| R-08 | **Vazamento do fato privado sobre o número de pessoas atendidas** (código, comentário, JSON, captura de tela, conversa). | Confiança / privacidade | Alto | Marcado NÃO PUBLICAR na matriz; proibido em qualquer artefato do projeto; item de revisão antes de cada entrega. |
| R-09 | **SVG de logotipo não otimizado (arquivo original de altíssima densidade, na ordem de dezenas de MB) indo para produção.** | Técnico / performance | Alto — destrói LCP em conexão móvel | Otimização obrigatória antes da publicação; `manifest.json` aponta apenas para ativos otimizados; verificação de peso nos critérios de aceite (RNF-06). |
| R-10 | **Custo de domínio e hospedagem presumido como incluído.** | Comercial | Alto — gera frustração e desgaste | `SCOPE.md` classifica explicitamente como `custo de terceiro`; nenhum documento afirma que a infraestrutura de subdomínio existe; titularidade e custos são pendências (PEND-13). |
| R-11 | **Uso do site como case sem autorização.** | Ético / jurídico / relacional | Alto | `caseStudyConsent: false`; dois consentimentos separados e explícitos em `SCOPE.md` seção 6; nenhum uso público antes de autorização escrita. |
| R-12 | **Cópia involuntária da página de referência** (`saracoutinho.inspira.dev.br`). | Ético / jurídico | Médio | Referência usada apenas como posicionamento; layout, identidade, copy, componentes e dados pessoais não são reproduzidos; a página não é citada em material público nem descrita como verificada. |
| R-13 | **Excesso de conteúdo**, contrariando o pedido de página simples (F-24). | Produto | Médio | Máximo 4 itens de menu; FAQ em acordeão; sinais de confiança limitados a 4; nenhuma seção nova sem remover outra. |
| R-14 | **Canais publicados sem autorização** (WhatsApp exposto sem consentimento explícito de publicação). | Privacidade do próprio profissional | Médio | Ter o número não é autorizar sua publicação — são pendências separadas (PEND-03); renderização condicionada por feature flag. |
| R-15 | **Contatos de crise incorretos ou desatualizados** publicados no rodapé. | Segurança da pessoa | Crítico | **Nenhum número é publicado antes de validação em fonte oficial** (PEND-14). O aviso de não atendimento de urgência entra sem números até lá. |
| R-16 | **Deriva de escopo silenciosa** — pedidos pontuais viram trabalho não classificado. | Comercial | Médio | Todo pedido passa por `/onboarding` e é classificado em `SCOPE.md`; o MVP continua funcionando sem alteração enquanto uma personalização é avaliada. |
| R-17 | **Dependência de terceiro entrando no projeto sem justificativa.** | Técnico | Médio | RNF-12: lista fechada de dependências, justificativa escrita obrigatória. |
| R-18 | **Conteúdo publicado sem validação do profissional.** | Ético / legal | Crítico | Itens `a-confirmar` não renderizam em produção (RF-15); nota final da seção 16; checklist de aceite exige varredura por conteúdo inventado. |
| R-19 | **Ausência de responsável operacional pela lista de espera.** Pessoas se cadastram e ninguém retorna. | Operacional / reputacional | Alto | Definir responsável e rotina de verificação é pendência bloqueante (PEND-09) antes de divulgar o site. |
| R-20 | **Tipografia inferida conflita com o manual de identidade.** | Design | Baixo | INF-01 rotulada como inferência; a troca custa uma linha de configuração de fonte. |

---

## 14. Critérios de aceite

Checklist testável. Todo item precisa estar marcado antes da publicação.

### 14.1 Navegação e links

- [ ] Todos os links do cabeçalho, do corpo e do rodapé funcionam; nenhum `href="#"` vazio ou link morto.
- [ ] Todas as âncoras (`#sobre`, `#abordagem`, `#como-funciona`, `#perguntas-frequentes`, `#lista-de-espera`) levam à seção correta.
- [ ] Após navegar por âncora, o foco vai para o título da seção destino.
- [ ] O menu tem no máximo 4 itens, mais o CTA.
- [ ] Links externos (quando existirem) abrem com `rel` adequado; nenhum link externo aponta para URL inventada.

### 14.2 Menu mobile e acordeão

- [ ] O menu mobile abre e fecha por clique de mouse.
- [ ] O menu mobile abre e fecha por toque em dispositivo real ou emulado.
- [ ] O menu mobile abre e fecha por teclado (`Enter`/`Espaço`), fecha com `Esc` e mantém o foco preso enquanto aberto.
- [ ] O acordeão da FAQ abre e fecha por mouse, por toque e por teclado, com `aria-expanded` correto.
- [ ] Nenhum conteúdo da FAQ fica inacessível a leitor de tela quando recolhido.

### 14.3 Formulário

- [ ] Validação de campo obrigatório dispara corretamente para nome, e-mail e consentimento.
- [ ] E-mail inválido produz a mensagem `Informe um e-mail válido.`
- [ ] Mensagem de erro é associada ao campo por `aria-describedby` e anunciada por região `aria-live`.
- [ ] Submissão bem-sucedida exibe a mensagem de sucesso aprovada.
- [ ] Em modo `mock`, a tela de sucesso indica explicitamente que se trata de um teste e **não** afirma que um contato foi salvo.
- [ ] Falha de rede exibe o estado `offline`; falha de servidor exibe o erro genérico aprovado.
- [ ] Envio duplicado exibe o estado `duplicate`, sem tratar o usuário como erro.
- [ ] O estado de carregamento é visível e o botão fica desabilitado durante `submitting`.
- [ ] Clicar duas vezes rapidamente não gera duas submissões.
- [ ] O honeypot preenchido resulta em descarte silencioso com resposta genérica.
- [ ] O limite de taxa por IP funciona e devolve resposta adequada.
- [ ] Com `availabilityStatus: 'waitlist-closed'`, o formulário não é renderizado e a variante de lista fechada aparece.

### 14.4 Privacidade

- [ ] Nenhum valor do formulário aparece na URL ou em query string, em nenhum momento.
- [ ] Nenhum valor do formulário aparece em log de servidor ou de cliente.
- [ ] Não há nenhuma chamada a ferramenta de analytics, pixel ou script de terceiro.
- [ ] Nenhuma requisição de rede a terceiro ocorre em runtime (inclusive fontes).
- [ ] O link de WhatsApp, quando ativo, contém **apenas** a mensagem neutra aprovada, sem dado pessoal.
- [ ] Nenhum campo sensível existe no formulário nem no schema.
- [ ] `/onboarding` não é indexado, não aparece no `sitemap` e não faz nenhuma requisição de rede.
- [ ] Nenhuma resposta do onboarding é exposta na landing, em metadado, em log ou em URL.
- [ ] Nenhum segredo aparece no bundle do cliente.

### 14.5 Acessibilidade e visual

- [ ] Contraste de texto e de componentes de interface atende ao nível AA em todos os pares de cor usados.
- [ ] O foco é visível em todos os elementos interativos e não fica obscurecido por elementos fixos.
- [ ] `prefers-reduced-motion` desativa todas as transições e rolagens animadas.
- [ ] A página funciona corretamente em 360, 768, 1024 e 1440 px.
- [ ] Não há rolagem horizontal em nenhuma largura, especialmente no formulário a 360 px.
- [ ] O hero permanece legível e completo a 200% de zoom.
- [ ] Logotipos aparecem sem distorção, sem esticamento e com proporção original em todas as variantes usadas.
- [ ] Ativos de marca estão otimizados; nenhum arquivo pesado não otimizado vai para produção.
- [ ] Existe um único `h1` e a hierarquia de títulos não tem saltos.
- [ ] Toda imagem informativa tem `alt` significativo; toda imagem decorativa tem `alt` vazio.

### 14.6 Qualidade técnica

- [ ] `npm run lint` sem erro.
- [ ] `npm run typecheck` sem erro.
- [ ] `npm run test` sem falha.
- [ ] `npm run build` sem erro e sem aviso relevante.
- [ ] Console do navegador sem erro e sem aviso em produção.
- [ ] Nenhuma dependência fora da lista aprovada (RNF-12).

### 14.7 Conteúdo, terminologia e ética

- [ ] Nenhum conteúdo inventado: cada afirmação da página tem correspondência na seção 4 ou em `CONTENT.md` com status `confirmado`.
- [ ] Nenhum item `a-confirmar` renderizado em produção.
- [ ] Todas as pendências estão listadas na seção 15 e refletidas no wizard.
- [ ] Grafia consistente: `Felipe Carvalho`, `Psicólogo`, `CRP 02/23810`, `TCC`, `LGBTQIA+`, `Google Meet`, `Receita Saúde`, `on-line`, `lista de espera`, `Hudi Pages`, `Hudi Labs`.
- [ ] `on-line` grafado com hífen em 100% das ocorrências visíveis.
- [ ] Formações em andamento sempre rotuladas como em andamento.
- [ ] Nenhum preço, valor, faixa, promoção ou condição de pagamento.
- [ ] Nenhuma promessa de resultado, cura, garantia, rapidez ou superioridade.
- [ ] Nenhum depoimento, caso clínico ou prova social.
- [ ] Nenhuma comparação com outros profissionais ou abordagens.
- [ ] Nenhuma palavra da lista de proibidas de `CONTENT.md` aparece na página.
- [ ] Reembolso sempre mencionado com a ressalva de que não é garantido.
- [ ] Crédito Hudi Pages presente, discreto, no rodapé, sem logotipo e sem destaque.
- [ ] `caseStudyConsent` permanece `false`; nenhum uso público do projeto como case foi feito.
- [ ] O fato privado sobre o número de pessoas atendidas não aparece em nenhum artefato do projeto.
- [ ] A página de referência `saracoutinho.inspira.dev.br` não é citada, linkada nem reproduzida.

---

## 15. Pendências

Cada pendência traz: o que falta, quem fornece, o que bloqueia e o padrão provisório seguro em vigor.
**Bloqueante** = impede a publicação pública do site.

| ID | O que falta | Quem fornece | O que bloqueia | Padrão provisório em vigor |
| --- | --- | --- | --- | --- |
| PEND-01 — RESOLVIDO | **Foto profissional** aprovada, em boa resolução, com enquadramento e recorte definidos. | Felipe | Hero com retrato autorizado. | Original 640 × 641 preservado; derivado 512 × 640 publicado sem upscale. |
| PEND-02 | **URL do Instagram.** | Felipe | Link social no cabeçalho/rodapé; variante de lista fechada, que hoje menciona o Instagram. | `instagramUrl: undefined`; link não renderizado; a variante de lista fechada só é ativada quando houver um canal real. |
| PEND-03 | **Número de WhatsApp + autorização expressa para publicá-lo.** São duas coisas distintas. | Felipe | Botão de WhatsApp; uso da mensagem neutra aprovada. Não bloqueante. | `whatsappNumber: undefined`; botão oculto; `whatsappMessage` fica pronta mas inerte. |
| PEND-04 | **E-mail profissional** para contato público e/ou canal do titular de dados. | Felipe | Canal alternativo de contato; identificação do canal para exercício de direitos na política de privacidade. | `email: undefined`; nenhum e-mail exibido. |
| PEND-05 | **Abrangência geográfica aceita** (todo o Brasil? apenas Pernambuco? brasileiros no exterior? restrições de fuso?). | Felipe | Resposta de FAQ sobre quem pode ser atendido de onde; eventual menção a Recife. | Nenhuma afirmação de alcance é feita; a FAQ responde apenas "Pessoas adultas."; o texto público diz "Pernambuco" apenas como local de atuação do profissional. |
| PEND-06 | **Confirmação de cada credencial** (F-14 a F-17) e da redação exata preferida, com decisão sobre citar ou não instituição, carga horária e ano. | Felipe | Seção de formações validada. **Bloqueante** — publicar credencial sem validação é risco disciplinar. | Redação provisória com rótulo explícito `concluída`/`em andamento`; nenhuma instituição, data ou carga horária citada. |
| PEND-07 | **Status exato da agenda** a ser exibido na publicação, mais o critério e o responsável pela troca de status. | Felipe | Texto da seção de lista de espera; decisão entre `open`, `limited` e `waitlist-closed`. | `availabilityStatus: 'limited'`, coerente com F-22; troca manual por configuração. |
| PEND-08 | **Destino seguro do formulário** (URL do webhook, token e serviço escolhido). | Felipe + Hudi Pages | Funcionamento real da lista de espera. **Bloqueante para divulgação pública** — sem destino real, cadastros se perdem. | `WAITLIST_ADAPTER=mock`, com sucesso marcado explicitamente como teste. |
| PEND-09 | **Responsável operacional e rotina de verificação** da lista de espera (quem lê, com que frequência, em quanto tempo retorna). | Felipe | Cumprimento da promessa feita na página ("entrarei em contato"). **Bloqueante para divulgação pública.** | Nenhum prazo de retorno é prometido; a FAQ diz explicitamente que não é possível prever prazo. |
| PEND-10 | **Prazo de retenção dos dados e processo de exclusão** (prazo, rotina de descarte, canal e prazo de resposta ao titular). | Felipe + revisão jurídica | Texto de consentimento definitivo e política de privacidade. **Bloqueante** junto de PEND-11. | `retentionDays: 180` como padrão técnico não exibido (INF-06); nenhum prazo afirmado ao usuário. |
| PEND-11 | **Política de privacidade revisada** e **identificação do controlador** com canal de contato do titular. | Felipe + revisão jurídica | Publicação do site com coleta de dados. **Bloqueante.** | `/politica-de-privacidade` com rascunho e aviso visível de conteúdo provisório; `policyUrl: undefined`. |
| PEND-12 | **Domínio ou subdomínio final**, incluindo o slug aprovado e a confirmação de que a infraestrutura de subdomínio do ecossistema realmente existe. | Felipe + Hudi Pages | URL canônica, Open Graph, `sitemap`, divulgação. **Bloqueante.** | `NEXT_PUBLIC_SITE_URL` vazio; nenhuma URL absoluta emitida; nenhum domínio anunciado como certo. |
| PEND-13 | **Titularidade e custos** de domínio, renovação e hospedagem — em nome de quem fica registrado e quem paga o quê. | Felipe + Hudi Pages | Continuidade do site e clareza comercial. **Bloqueante para publicação em domínio próprio.** | `SCOPE.md` classifica como `custo de terceiro`, nunca como incluído. |
| PEND-14 | **Texto de emergência e contatos de crise validados em fonte oficial.** | Felipe (com validação em fonte oficial) | Rodapé completo. **Bloqueante** — é item de segurança da pessoa. | Aviso de que o site não atende urgência, **sem nenhum número**, até validação. Nenhum contato é publicado por memória ou suposição. |
| PEND-15 | **Autorização separada e por escrito para uso do projeto como case do Hudi Pages.** | Felipe | Qualquer divulgação pública do projeto como case. | `caseStudyConsent: false`; nenhum uso público. |
| PEND-16 | **Autorização separada para uso de imagem, marca, métricas ou depoimento** de Felipe. | Felipe | Uso do retrato, do logotipo ou de qualquer número em material do Hudi Pages. | Não concedida; nada é usado. |
| PEND-17 | **Nomenclatura oficial de "Hudi Pages" e "Hudi Labs" e o link oficial**, se houver. | Hudi Labs | Crédito do rodapé com link; consistência de marca. | Crédito em texto simples, sem link, com a grafia definida no contrato do projeto. |
| PEND-18 | **Funcionalidades futuras desejadas** (agenda, pagamento, blog, área do paciente, automações, idiomas). | Felipe | Planejamento de roadmap e classificação comercial. | Coletadas pelo wizard `/onboarding`, etapa H; nada implementado. |
| PEND-19 | **Decisão sobre medição/analytics**: se haverá, qual ferramenta, qual base legal, qual abordagem de consentimento. | Felipe + revisão jurídica | Qualquer métrica automatizada. | Nenhum analytics. Nenhum cookie de rastreamento. Nenhum banner. |
| PEND-20 | **Preferência de grafia:** `on-line` (padrão atual) ou `online`. | Felipe | Consistência textual em todo o site. | Padronizado como `on-line`. |
| PEND-21 | **Confirmação da tipografia** contra o manual de identidade de 7 páginas. | Felipe / manual de identidade | Fechamento do sistema tipográfico. | Manrope + Source Sans 3 como inferência de design (INF-01). |
| PEND-22 | **Ativos de marca otimizados** e confirmação de que existem recortes adequados de símbolo e favicon. | Felipe / Hudi Pages | `manifest.json` completo, performance e favicon correto. | Placeholders no `manifest.json`; obrigatório otimizar antes de publicar. |
| PEND-23 | **Aprovação da execução gráfica da referência à Progress Pride** (INF-08) — se comunica bem sem virar decoração. | Felipe | Fechamento visual da seção LGBTQIA+. | Gesto único e discreto integrado ao fio gráfico. |
| PEND-24 | **Decisão sobre o campo de mensagem livre** no formulário (INF-11). | Felipe | Composição final do formulário. | Desligado por minimização; redação pronta em `CONTENT.md`. |
| PEND-25 | **Decisão sobre mencionar Recife** (e não apenas Pernambuco) no texto público. | Felipe | Precisão do texto "Sobre". | O texto público diz apenas "Pernambuco". |

**Total: 25 pendências.** Bloqueantes para publicação pública: PEND-06, PEND-08, PEND-09, PEND-10, PEND-11, PEND-12, PEND-13 (se domínio próprio) e PEND-14.

---

## 16. Nota final

Este documento é uma especificação de produto. **Não é parecer jurídico, não é parecer ético e não substitui a responsabilidade profissional de Felipe Gonzaga de Carvalho Gondim sobre o que é publicado em seu nome.**

Antes de qualquer publicação pública:

1. **Revisão jurídica** do texto de consentimento, da política de privacidade, dos termos de uso, da retenção de dados e da identificação do controlador.
2. **Validação ética e profissional pelo próprio Felipe**, item a item, de todo conteúdo que descreva sua formação, sua atuação, sua trajetória e sua forma de trabalho — especialmente das credenciais em andamento e da seção sobre a população LGBTQIA+.
3. **Verificação direta das fontes** listadas na seção 12.7, na versão vigente na data da publicação. Nenhuma conclusão normativa deste documento deve ser usada sem essa conferência.
4. **Resolução das pendências bloqueantes** da seção 15.
5. **Validação em fonte oficial dos contatos de crise** antes de publicá-los (PEND-14).

Enquanto esses passos não estiverem concluídos, o produto deve permanecer em revisão interna, com `NEXT_PUBLIC_REVIEW_MODE` disponível para inspeção e sem divulgação pública do endereço.
