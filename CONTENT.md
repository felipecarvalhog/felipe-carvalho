# CONTENT.md — Conteúdo editorial

**Projeto:** Landing page + onboarding privado — Felipe Carvalho, Psicólogo — CRP 02/23810
**Escopo deste documento:** todo o texto visível ao usuário, com identificador, texto exato e estado de confirmação.
**Fonte técnica:** cada entrada corresponde a uma string em `src/config/project.config.ts`, cujo `status` é `confirmado` ou `a-confirmar`.

---

## 0. Como usar este documento

### 0.1 Estados

| Estado | Significado | Comportamento em produção |
| --- | --- | --- |
| `confirmado` | Texto aprovado ou derivado diretamente de fato confirmado (ver `SPEC.md`, seção 4). | Renderizado. |
| `a confirmar` | Redação provisória, ainda não validada por Felipe. | Ver tratamento abaixo. |

### 0.2 Três tratamentos possíveis para um item `a confirmar`

| Tratamento | Quando se aplica | Efeito |
| --- | --- | --- |
| `oculto` | O item é opcional. | Não é renderizado em produção. Com `NEXT_PUBLIC_REVIEW_MODE` ativo, aparece marcado como pendência. |
| `fallback` | O item é desejável, mas existe uma versão `confirmado` mais curta que pode ocupar o lugar. | Renderiza o fallback confirmado. |
| `bloqueia seção` | O item é estruturalmente obrigatório (ex.: texto de consentimento). | A seção inteira não vai ao ar enquanto o texto não for aprovado. |

### 0.3 Regra de classificação usada aqui

- Texto que descreve **Felipe** — trajetória, formação, forma de trabalhar, opinião, promessa — só é `confirmado` se constar dos fatos confirmados ou das strings aprovadas.
- Texto que descreve **o produto** — como o formulário funciona, o que ele coleta, o que a página é — é `confirmado` quando corresponde ao comportamento real do sistema.
- Toda redação nova escrita neste documento, sem lastro nos itens acima, é `a confirmar`.

### 0.4 Regras de estilo para toda a copy

- pt-BR claro, próximo e sóbrio. Frases curtas. Voz ativa.
- Primeira pessoa quando Felipe fala de si; terceira pessoa neutra em textos institucionais e de sistema.
- Sem jargão de marketing, sem infantilização, sem exclamação em excesso (regra prática: nenhuma exclamação), sem frase vaga.
- Nada de promessa, garantia, prazo, superioridade ou comparação.
- Grafia padronizada: **`on-line`** com hífen, em 100% das ocorrências. A alternativa `online` fica registrada como preferência pendente (PEND-20) — se Felipe escolher `online`, a troca é global e vale também para este documento.
- Termos com grafia fixa: `Felipe Carvalho` · `Felipe Gonzaga de Carvalho Gondim` · `Psicólogo` · `CRP 02/23810` · `TCC` · `Terapia Cognitivo-Comportamental` · `LGBTQIA+` · `LGBTfobia` · `Google Meet` · `Receita Saúde` · `on-line` · `lista de espera` · `Hudi Pages` · `Hudi Labs`.
- Primeira menção por seção usa `Terapia Cognitivo-Comportamental (TCC)`; menções seguintes usam `TCC`.

---

## 1. Cabeçalho e navegação

| ID | Texto | Estado | Nota |
| --- | --- | --- | --- |
| `HDR-01` | `Felipe Carvalho` | confirmado | Nome público exibido ao lado do logotipo. |
| `HDR-02` | `Psicólogo — CRP 02/23810` | confirmado | Identificação obrigatória. Nunca omitir, nem em mobile. |
| `NAV-01` | `Sobre` | confirmado | Âncora `#sobre`. |
| `NAV-02` | `Abordagem` | confirmado | Âncora `#abordagem`. |
| `NAV-03` | `Como funciona` | confirmado | Âncora `#como-funciona`. |
| `NAV-04` | `Perguntas frequentes` | confirmado | Âncora `#perguntas-frequentes`. Em telas estreitas, pode reduzir para `Dúvidas` — variante `a confirmar`. |
| `NAV-CTA` | `Entrar na lista de espera` | confirmado | CTA primário do cabeçalho. Âncora `#lista-de-espera`. |
| `NAV-MENU-OPEN` | `Abrir menu` | confirmado | `aria-label` do botão de menu mobile. |
| `NAV-MENU-CLOSE` | `Fechar menu` | confirmado | `aria-label` do botão quando aberto. |
| `NAV-SKIP` | `Pular para o conteúdo` | confirmado | Link de salto, visível ao receber foco. |
| `HDR-LOGO-ALT` | `Felipe Carvalho — Psicólogo` | confirmado | `alt` do logotipo. Não incluir a palavra "logotipo". |

---

## 2. Hero

| ID | Texto | Estado | Nota |
| --- | --- | --- | --- |
| `HERO-EYEBROW` | `Psicologia clínica on-line • Adultos` | confirmado | Texto aprovado. O separador `•` é decorativo e deve ser ignorado por leitores de tela. |
| `HERO-H1` | `Psicologia clínica on-line, com escuta acolhedora e prática baseada em evidências.` | confirmado | Texto aprovado. Único `h1` da página. Não alterar. |
| `HERO-SUB` | `Atendimento em Terapia Cognitivo-Comportamental (TCC) e abordagem afirmativa, com foco especial na população LGBTQIA+.` | confirmado | Texto aprovado. Não alterar. |
| `HERO-CTA-1` | `Entrar na lista de espera` | confirmado | CTA primário. Aponta para `#lista-de-espera`. |
| `HERO-CTA-2` | `Conhecer meu trabalho` | confirmado | CTA secundário. Aponta para `#sobre`. |
| `HERO-PHOTO-ALT` | `Felipe Carvalho, psicólogo` | a confirmar · oculto | Só existe quando a foto for aprovada (PEND-01). O `alt` final depende do enquadramento real. |

---

## 3. Sinais de confiança

Linha de até 4 itens abaixo do hero. Inferência de design INF-03. Todos os itens são fatos confirmados; nenhum é prova social.

| ID | Texto | Estado | Nota |
| --- | --- | --- | --- |
| `TRUST-01` | `Atendimento 100% on-line` | confirmado | F-05. |
| `TRUST-02` | `Sessões de 50 minutos` | confirmado | F-07. |
| `TRUST-03` | `Pela plataforma Google Meet` | confirmado | F-08. |
| `TRUST-04` | `Somente pessoas adultas` | confirmado | F-06. |

Proibido nesta linha: número de pacientes, anos de experiência, nota, avaliação, quantidade de atendimentos, "referência em", "especialista em" fora das credenciais confirmadas.

---

## 4. Sobre

| ID | Texto | Estado | Nota |
| --- | --- | --- | --- |
| `ABOUT-TITLE` | `Sobre mim` | confirmado | — |
| `ABOUT-P1` | `Sou psicólogo clínico, atuo em Pernambuco e ofereço atendimento totalmente on-line. Minha prática é fundamentada na Terapia Cognitivo-Comportamental (TCC), unida a uma postura clínica afirmativa — o que significa que cada pessoa que chega até mim é recebida a partir de quem ela é, sem julgamentos, com espaço genuíno para suas vivências e sua história.` | confirmado | Texto-base aprovado. Editável apenas para concisão ou clareza, nunca alterando fatos. Menciona apenas "Pernambuco"; citar "Recife" depende de PEND-25. |
| `ABOUT-P2` | `Sou especialista em Sexologia Clínica e estou concluindo minha segunda especialização, em TCC. Também sigo me atualizando por meio de formações em Psicologia Baseada em Evidências e Terapia Cognitivo-Sexual, buscando unir rigor técnico a um cuidado verdadeiramente humano.` | confirmado | Texto-base aprovado. `estou concluindo` e `sigo me atualizando` são as formulações que preservam o caráter **em andamento** — não substituir por "sou especialista em TCC" nem por "tenho formação em". |
| `ABOUT-P3` | `Minha trajetória também passa por um compromisso com a população LGBTQIA+: já participei da organização de eventos, simpósios e discussões políticas voltadas à garantia de direitos e ao enfrentamento do preconceito.` | confirmado | Texto-base aprovado, com a frase final destacada em `ABOUT-DESTAQUE`. |
| `ABOUT-DESTAQUE` | `Acredito que terapia é, antes de tudo, um espaço de escuta.` | confirmado | Frase do texto-base aprovado, promovida a destaque visual. Não é slogan de marca e não deve ser repetida em outras seções. |

---

## 5. Abordagem

| ID | Texto | Estado | Nota |
| --- | --- | --- | --- |
| `APR-TITLE` | `Como eu trabalho` | confirmado | — |
| `APR-01-TITLE` | `Terapia Cognitivo-Comportamental (TCC)` | confirmado | F-12. |
| `APR-01-BODY` | `A TCC parte da relação entre pensamentos, emoções e comportamentos. No atendimento, olhamos juntos para os padrões que sustentam o sofrimento e trabalhamos com objetivos definidos e ferramentas que podem ser aplicadas no dia a dia.` | a confirmar · fallback | Redação nova, não validada por Felipe. Enquanto não for aprovada, o bloco exibe apenas o título e a frase-síntese. Não descreve resultado, prazo nem eficácia. |
| `APR-01-FALLBACK` | `Abordagem principal do atendimento.` | confirmado | Linha mínima usada enquanto `APR-01-BODY` não for aprovado. |
| `APR-02-TITLE` | `Postura clínica afirmativa` | confirmado | F-13. |
| `APR-02-BODY` | `Cada pessoa que chega até mim é recebida a partir de quem ela é, sem julgamentos, com espaço genuíno para suas vivências e sua história.` | confirmado | Extraído literalmente do texto-base aprovado (`ABOUT-P1`), o que dispensa nova validação de conteúdo. |
| `APR-SINTESE` | `Um cuidado que une rigor técnico e acolhimento: ferramentas da TCC com uma postura clínica afirmativa, que reconhece e valida a diversidade de identidades e vivências.` | confirmado | Texto aprovado. Fecha a seção. Não alterar. |

---

## 6. Formações e credenciais

Regra inegociável: o rótulo `Concluída` ou `Em andamento` acompanha **sempre** cada item, com peso visual equivalente ao do nome do curso. Nunca usar apenas cor ou apenas ícone para distinguir os dois estados.

| ID | Texto do item | Rótulo | Estado | Nota |
| --- | --- | --- | --- | --- |
| `CRED-TITLE` | `Formação` | confirmado | — | Evitar "Qualificações" e "Certificações", que sugerem inventário maior do que existe. |
| `CRED-01` | `Psicólogo — CRP 02/23810` | `Concluída` | confirmado | F-03. Instituição e ano de graduação não são citados (não informados). |
| `CRED-02` | `Especialização em Sexologia Clínica` | `Concluída` | confirmado | F-14. Única especialização concluída. |
| `CRED-03` | `Segunda especialização em Terapia Cognitivo-Comportamental (TCC)` | `Em andamento` | confirmado | F-15. **Nunca** apresentar como concluída nem chamar Felipe de "especialista em TCC". |
| `CRED-04` | `Formação em Psicologia Baseada em Evidências` | `Em andamento` | confirmado | F-16. |
| `CRED-05` | `Formação em Terapia Cognitivo-Sexual` | `Em andamento` | confirmado | F-17. |
| `CRED-LABEL-DONE` | `Concluída` | — | confirmado | Rótulo visível, não apenas atributo. |
| `CRED-LABEL-WIP` | `Em andamento` | — | confirmado | Rótulo visível, não apenas atributo. |
| `CRED-NOTE` | `Instituições, cargas horárias e datas serão informadas após confirmação.` | a confirmar · oculto | — | Só entra se Felipe decidir publicar esses detalhes (PEND-06). No MVP, nada é exibido no lugar. |

---

## 7. Compromisso com a população LGBTQIA+

Esta seção existe porque há trajetória factual, não porque há público-alvo. Se alguma das quatro experiências for retirada por Felipe, a seção encolhe — não é substituída por linguagem genérica de acolhimento.

| ID | Texto | Estado | Nota |
| --- | --- | --- | --- |
| `LGBT-TITLE` | `Compromisso com a população LGBTQIA+` | confirmado | — |
| `LGBT-INTRO` | `Minha atuação com a população LGBTQIA+ vai além do consultório: já participei de eventos, simpósios e discussões políticas voltadas à garantia de direitos e ao enfrentamento do preconceito.` | confirmado | Texto aprovado. Não alterar. |
| `LGBT-EXP-01` | `Desenvolvimento de eventos sobre HIV/AIDS` | confirmado | F-18. Sem nomear evento, instituição ou data. |
| `LGBT-EXP-02` | `Organização de eventos de combate à LGBTfobia` | confirmado | F-19. |
| `LGBT-EXP-03` | `Participação em simpósios, congressos e grupos de apoio à população LGBTQIA+` | confirmado | F-20. |
| `LGBT-EXP-04` | `Participação em discussões políticas sobre a implementação do nome social na universidade onde me formei` | confirmado | F-21, adaptado para primeira pessoa. A universidade não é nomeada. |
| `LGBT-PRIDE-ALT` | `Detalhe gráfico em referência à bandeira Progress Pride` | a confirmar · oculto | Só se o elemento gráfico for informativo. Se for puramente decorativo, usar `alt` vazio e não anunciar (INF-08, PEND-23). |

Proibido nesta seção: bandeira aplicada como adesivo, selo de diversidade, badge de "aliado", palavra "inclusivo" como adjetivo de venda, qualquer afirmação de ser referência ou o melhor para essa população.

---

## 8. Como funciona o atendimento

| ID | Texto | Estado | Nota |
| --- | --- | --- | --- |
| `HOW-TITLE` | `Como funciona o atendimento` | confirmado | — |
| `HOW-STEP-1-TITLE` | `1. Entre na lista de espera` | confirmado | — |
| `HOW-STEP-1-BODY` | `Você deixa seu nome e um contato no formulário desta página. Não é preciso contar o motivo da busca agora.` | confirmado | Descreve o comportamento real do formulário, que não pergunta motivo (INF-11). |
| `HOW-STEP-2-TITLE` | `2. Retorno quando houver vaga` | confirmado | — |
| `HOW-STEP-2-BODY` | `À medida que surgem vagas ou mudanças na agenda, entro em contato para verificar se você ainda tem interesse em iniciar a terapia.` | confirmado | Derivado das strings aprovadas de lista de espera e da FAQ. Nenhum prazo é prometido. |
| `HOW-STEP-3-TITLE` | `3. Primeira sessão on-line` | confirmado | — |
| `HOW-STEP-3-BODY` | `O atendimento acontece pela plataforma Google Meet, em sessões de 50 minutos.` | confirmado | F-07, F-08. |
| `HOW-NOTE-01` | `O atendimento é destinado a pessoas adultas.` | confirmado | F-06. |
| `HOW-NOTE-02` | `O atendimento é particular.` | confirmado | F-09. Sem valor, sem faixa, sem condição de pagamento. |
| `HOW-NOTE-03` | `É emitida Receita Saúde, que pode ser usada para solicitar reembolso a alguns convênios, conforme as regras de cada plano.` | confirmado | F-10. |
| `HOW-NOTE-04` | `O reembolso depende das regras do seu plano de saúde e não é garantido.` | confirmado | F-11. **Nunca** publicar `HOW-NOTE-03` sem `HOW-NOTE-04`. |

---

## 9. Lista de espera

### 9.1 Seção

| ID | Texto | Estado | Nota |
| --- | --- | --- | --- |
| `WL-TITLE` | `Lista de espera` | confirmado | — |
| `WL-SUPPORT` | `No momento, a agenda está com disponibilidade limitada. Deixe seus dados para entrar na lista de espera. Quando surgir uma vaga, entrarei em contato para verificar se você ainda tem interesse em iniciar a terapia.` | confirmado | Texto aprovado. Usado quando `availabilityStatus` for `limited`. Não alterar. |
| `WL-NOT-TRIAGE` | `Entrar na lista de espera não inicia um atendimento e não substitui avaliação profissional.` | a confirmar · fallback | Redação nova. Reforça que a lista não é triagem clínica. Enquanto não aprovada, a função é cumprida pelo aviso de urgência do rodapé. |
| `WL-CLOSED` | `A lista de espera está temporariamente fechada. Você ainda pode conhecer o trabalho de Felipe pelo Instagram.` | confirmado (redação) · bloqueado por PEND-02 | Texto aprovado. Usado quando `availabilityStatus` for `waitlist-closed`. **Só pode ser exibido quando a URL do Instagram existir**, porque cita esse canal. Sem a URL, usar `WL-CLOSED-ALT`. |
| `WL-CLOSED-ALT` | `A lista de espera está temporariamente fechada no momento.` | a confirmar · fallback | Variante sem citação de canal, para o caso de a lista fechar antes de o Instagram ser confirmado. |
| `WL-OPEN` | `A agenda tem vagas disponíveis. Deixe seus dados para que eu entre em contato.` | a confirmar · oculto | Variante para `availabilityStatus: 'open'`. Não usada no MVP (o status é `limited`). |

### 9.2 Campos do formulário

| ID | Rótulo | Texto de apoio | Estado | Nota |
| --- | --- | --- | --- | --- |
| `FRM-NAME-LABEL` | `Nome` | — | confirmado | Campo obrigatório. |
| `FRM-NAME-HELP` | — | `Escreva o nome que você usa no dia a dia. Nome social é bem-vindo.` | a confirmar · oculto | Coerente com a postura afirmativa e com F-21, mas é uma declaração de postura: precisa de aprovação de Felipe. Sem ela, o campo aparece sem texto de apoio. |
| `FRM-EMAIL-LABEL` | `E-mail` | — | confirmado | Campo obrigatório. |
| `FRM-EMAIL-HELP` | — | `Uso este e-mail apenas para avisar sobre a lista de espera.` | confirmado | Descreve a finalidade real e única da coleta. Precisa permanecer idêntico à finalidade declarada na política de privacidade. |
| `FRM-PHONE-LABEL` | `Telefone (opcional)` | — | confirmado | Opcional por decisão de design (INF-07). |
| `FRM-PHONE-HELP` | — | `Preencha apenas se preferir ser contatado por telefone.` | a confirmar · oculto | Depende da confirmação do canal (PEND-03). |
| `FRM-CONSENT-LABEL` | Ver `CNS-01` | — | a confirmar · **bloqueia seção** | Ver 9.5. |
| `FRM-MESSAGE-LABEL` | `Mensagem (opcional)` | — | a confirmar · **desligado no MVP** | Campo não renderizado (INF-11, PEND-24). Redação mantida pronta para ativação futura. |
| `FRM-MESSAGE-HELP` | — | `Se quiser, escreva uma mensagem curta. Por segurança, não inclua informações sobre saúde, diagnósticos ou medicamentos.` | a confirmar · **desligado no MVP** | Advertência obrigatória caso o campo seja ativado. |
| `FRM-HONEYPOT` | — | — | confirmado | Campo oculto, sem rótulo visível, fora da ordem de tabulação, `aria-hidden="true"` e `autocomplete="off"`. Nunca anunciado a leitor de tela. |
| `FRM-REQUIRED-NOTE` | — | `Campos marcados com * são obrigatórios.` | confirmado | Exibido uma vez, antes do primeiro campo. |
| `FRM-SUBMIT` | `Entrar na lista de espera` | — | confirmado | Rótulo do botão em estado `idle`. Idêntico ao CTA para manter continuidade. |

### 9.3 Mensagens de validação de campo

| ID | Texto | Estado | Nota |
| --- | --- | --- | --- |
| `VAL-NAME-REQUIRED` | `Informe seu nome.` | confirmado | — |
| `VAL-NAME-SHORT` | `O nome precisa ter pelo menos 2 caracteres.` | confirmado | — |
| `VAL-EMAIL-REQUIRED` | `Informe um e-mail para contato.` | confirmado | — |
| `VAL-EMAIL-INVALID` | `Informe um e-mail válido.` | confirmado | Texto aprovado. Padrão de tom para todas as demais mensagens de campo. |
| `VAL-PHONE-INVALID` | `Informe um telefone válido ou deixe o campo em branco.` | confirmado | — |
| `VAL-CONSENT-REQUIRED` | `É necessário concordar com o uso dos dados para entrar na lista de espera.` | confirmado | — |
| `VAL-SUMMARY` | `Revise os campos destacados para continuar.` | confirmado | Resumo anunciado em `aria-live` quando houver mais de um erro. |

Tom das mensagens de erro: instrução direta, sem culpabilizar. Proibido: "Você errou", "Campo inválido!", "Ops", "Algo deu errado".

### 9.4 Mensagens de estado do formulário

| ID | Estado | Texto | Estado editorial | Nota |
| --- | --- | --- | --- | --- |
| `ST-IDLE` | `idle` | (sem mensagem) | confirmado | O botão exibe `FRM-SUBMIT`. |
| `ST-VALIDATING` | `validating` | `Verificando os dados...` | confirmado | Anunciado em `aria-live="polite"`. |
| `ST-SUBMITTING` | `submitting` | `Enviando...` | confirmado | Rótulo do botão durante o envio; o botão fica desabilitado. |
| `ST-SUBMITTING-SR` | `submitting` | `Enviando seus dados. Aguarde.` | confirmado | Versão anunciada a leitores de tela. |
| `ST-SUCCESS` | `success` | `Recebi seus dados. Quando houver disponibilidade, entrarei em contato para confirmar se você ainda tem interesse.` | confirmado | Texto aprovado. Não alterar. Substitui o formulário; o foco vai para a mensagem. |
| `ST-SUCCESS-MOCK` | `success` (modo `mock`) | `Modo de teste: este envio não registrou nenhum contato real. O formulário ainda não está conectado a um destino.` | confirmado | **Obrigatório** enquanto `WAITLIST_ADAPTER=mock`. Exibido junto de `ST-SUCCESS`, com destaque visual próprio. Sem este aviso, o modo `mock` mente para o usuário (risco R-04). |
| `ST-ERROR` | `error` | `Não foi possível enviar agora. Revise sua conexão ou tente novamente mais tarde.` | confirmado | Texto aprovado. Não alterar. Nunca expor detalhe técnico, código de erro ou resposta do servidor. |
| `ST-DUPLICATE` | `duplicate` | `Você já está na lista de espera. Não é necessário enviar novamente.` | confirmado | Tratado como informação, não como erro: sem cor de alerta, sem ícone de falha. |
| `ST-OFFLINE` | `offline` | `Você parece estar sem conexão. Verifique sua internet e tente novamente.` | confirmado | — |
| `ST-RATE-LIMIT` | `error` (limite de taxa) | `Recebemos muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.` | confirmado | Não revela o limite configurado nem o tempo restante exato. |

### 9.5 Consentimento LGPD

| ID | Texto | Estado | Nota |
| --- | --- | --- | --- |
| `CNS-01` | `Concordo que meus dados sejam usados por Felipe Carvalho apenas para contato sobre a lista de espera. Eles não serão usados para outra finalidade nem compartilhados com terceiros.` | a confirmar · **bloqueia seção** | Redação provisória. Depende de revisão jurídica (PEND-11). O formulário não vai ao ar antes da aprovação deste texto. |
| `CNS-02` | `Você pode pedir a exclusão dos seus dados a qualquer momento pelo canal informado na Política de Privacidade.` | a confirmar · oculto | Só pode ser exibido quando existirem canal de contato do titular e processo de exclusão definidos (PEND-04, PEND-10). Prometer exclusão sem canal é promessa vazia. |
| `CNS-03` | `Os dados ficam guardados por [PRAZO A CONFIRMAR] e depois são excluídos.` | a confirmar · oculto | **Nunca publicar com um número não validado.** O padrão técnico de 180 dias (INF-06) é interno e não é afirmado ao usuário. |
| `CNS-LINK` | `Política de Privacidade` | confirmado | Link dentro do texto de consentimento, apontando para `/politica-de-privacidade`. |

---

## 10. Perguntas frequentes

Cinco itens em acordeão. Ordem por frequência esperada de dúvida.

| ID | Pergunta | Resposta | Estado |
| --- | --- | --- | --- |
| `FAQ-TITLE` | `Perguntas frequentes` | — | confirmado |
| `FAQ-01` | `O atendimento é só on-line?` | `Sim. O atendimento é realizado on-line, pela plataforma Google Meet.` | confirmado |
| `FAQ-02` | `Como funciona a lista de espera?` | `À medida que surgem vagas ou mudanças na agenda, Felipe entra em contato para verificar se a pessoa ainda tem interesse.` | confirmado |
| `FAQ-03` | `Você atende convênio ou somente particular?` | `O atendimento é particular. É emitida Receita Saúde, que pode ser usada para solicitar reembolso a alguns convênios, conforme as regras de cada plano.` | confirmado |
| `FAQ-04` | `Quanto tempo demora para eu ser chamado?` | `Não é possível prever um prazo, pois a disponibilidade depende da agenda e do andamento dos atendimentos.` | confirmado |
| `FAQ-05` | `Quem pode ser atendido?` | `Pessoas adultas.` | confirmado |
| `FAQ-06` | `De quais lugares você atende?` | `[A CONFIRMAR — abrangência geográfica não definida]` | a confirmar · oculto |

`FAQ-06` **não entra no MVP**. A abrangência geográfica é pendência (PEND-05) e qualquer resposta hoje seria invenção. `FAQ-05` responde apenas o critério de idade, que é confirmado.

---

## 11. Rodapé

| ID | Texto | Estado | Nota |
| --- | --- | --- | --- |
| `FTR-ID` | `Felipe Gonzaga de Carvalho Gondim — Psicólogo — CRP 02/23810` | confirmado | Texto aprovado. Identificação profissional completa. Sempre visível, nunca em imagem. |
| `FTR-LINK-PRIVACY` | `Política de Privacidade` | confirmado | Aponta para `/politica-de-privacidade`. |
| `FTR-LINK-TERMS` | `Termos de uso` | confirmado | Aponta para `/termos`. |
| `FTR-EMERGENCY` | `Este site é informativo e não realiza atendimento de urgência. Em situação de risco imediato, procure ajuda presencial ou os serviços públicos de emergência.` | a confirmar · **exibido mesmo assim** | Exceção deliberada à regra de ocultar itens `a confirmar`: é item de segurança da pessoa e não pode faltar. A redação segue pendente de validação, mas o aviso entra no ar. |
| `FTR-EMERGENCY-CONTACTS` | `[CONTATOS DE CRISE — A CONFIRMAR EM FONTE OFICIAL]` | a confirmar · oculto | **Nenhum número, sigla ou canal é publicado antes de validação em fonte oficial** (PEND-14). Não preencher de memória. |
| `FTR-CREDIT` | `Desenvolvido com Hudi Pages, um projeto Hudi Labs` | confirmado | Texto aprovado. Discreto, hierarquia visual mais baixa do rodapé, sem logotipo, sem selo. Texto simples enquanto não existir URL oficial (PEND-17). |
| `FTR-COPYRIGHT` | `© {ano} Felipe Gonzaga de Carvalho Gondim. Todos os direitos reservados.` | confirmado | `{ano}` é preenchido dinamicamente. |
| `FTR-SOCIAL-INSTAGRAM` | `Instagram` | a confirmar · oculto | Renderizado apenas com `contact.instagramUrl` definido (PEND-02). |
| `FTR-SOCIAL-WHATSAPP` | `WhatsApp` | a confirmar · oculto | Renderizado apenas com `contact.whatsappNumber` definido e publicação autorizada (PEND-03). |

### 11.1 Mensagem do WhatsApp

| ID | Texto | Estado | Nota |
| --- | --- | --- | --- |
| `WA-MESSAGE` | `Olá, Felipe. Conheci seu trabalho pelo site e gostaria de informações sobre a lista de espera.` | confirmado (redação) · oculto até PEND-03 | Texto aprovado. **Única** mensagem permitida no link. Nenhuma resposta de formulário, nome, e-mail, telefone ou informação de saúde pode ser inserida na URL. Codificar a URL não é proteger o conteúdo. |

---

## 12. Metadados das páginas

| ID | Rota | Campo | Texto | Estado |
| --- | --- | --- | --- | --- |
| `META-HOME-TITLE` | `/` | `title` | `Felipe Carvalho — Psicólogo (CRP 02/23810) — Psicologia clínica on-line` | confirmado |
| `META-HOME-DESC` | `/` | `description` | `Atendimento psicológico on-line para pessoas adultas, em Terapia Cognitivo-Comportamental (TCC), com abordagem afirmativa e foco especial na população LGBTQIA+.` | confirmado |
| `META-PRIVACY-TITLE` | `/politica-de-privacidade` | `title` | `Política de Privacidade — Felipe Carvalho` | confirmado |
| `META-TERMS-TITLE` | `/termos` | `title` | `Termos de uso — Felipe Carvalho` | confirmado |
| `META-ONB-TITLE` | `/onboarding` | `title` | `Onboarding — uso interno` | confirmado |
| `META-ONB-ROBOTS` | `/onboarding` | `robots` | `noindex, nofollow` | confirmado |
| `META-OG-IMAGE` | `/` | Open Graph | — | a confirmar · oculto — depende da foto (PEND-01) ou de uma peça de marca aprovada (PEND-22). Sem imagem aprovada, não gerar nenhuma. |

Nenhum dado estruturado que afirme endereço, telefone, faixa de preço ou avaliação é publicado.

---

## 13. Página `/politica-de-privacidade`

**Rascunho. Todo o conteúdo desta página é `a confirmar` e depende de revisão jurídica (PEND-11). A página é publicada apenas com o aviso de rascunho visível no topo.**

| ID | Texto | Estado |
| --- | --- | --- |
| `PRV-BANNER` | `Este texto é um rascunho e ainda passará por revisão. Ele será atualizado antes de o site ser divulgado.` | a confirmar · **exibido mesmo assim** |
| `PRV-TITLE` | `Política de Privacidade` | confirmado |
| `PRV-INTRO` | `Esta página explica quais dados são coletados neste site, para que servem e por quanto tempo ficam guardados.` | a confirmar |
| `PRV-CONTROLLER-TITLE` | `Quem é responsável pelos dados` | a confirmar |
| `PRV-CONTROLLER-BODY` | `Felipe Gonzaga de Carvalho Gondim — Psicólogo — CRP 02/23810. Canal de contato: [A CONFIRMAR].` | a confirmar |
| `PRV-COLLECT-TITLE` | `Quais dados são coletados` | a confirmar |
| `PRV-COLLECT-BODY` | `Apenas os dados que você digita no formulário de lista de espera: nome, e-mail e, se você quiser, telefone. Nenhum outro dado é solicitado.` | a confirmar |
| `PRV-SENSITIVE-BODY` | `Este site não coleta informações sobre saúde, diagnósticos, medicamentos, orientação sexual, identidade de gênero ou raça. Não há campo para esse tipo de informação e ela não deve ser enviada por aqui.` | a confirmar |
| `PRV-PURPOSE-TITLE` | `Para que os dados são usados` | a confirmar |
| `PRV-PURPOSE-BODY` | `Exclusivamente para entrar em contato quando houver disponibilidade na agenda. Os dados não são usados para divulgação, não alimentam nenhuma lista de e-mails e não são vendidos nem compartilhados com terceiros.` | a confirmar |
| `PRV-RETENTION-TITLE` | `Por quanto tempo os dados ficam guardados` | a confirmar |
| `PRV-RETENTION-BODY` | `[PRAZO A CONFIRMAR]` | a confirmar · **placeholder obrigatório** — nenhum número é publicado sem validação (PEND-10) |
| `PRV-RIGHTS-TITLE` | `Seus direitos` | a confirmar |
| `PRV-RIGHTS-BODY` | `Você pode pedir para ver, corrigir ou excluir os seus dados. O canal e o prazo de resposta serão informados aqui assim que definidos.` | a confirmar |
| `PRV-TRACKING-TITLE` | `Cookies e rastreamento` | a confirmar |
| `PRV-TRACKING-BODY` | `Este site não usa cookies de rastreamento, não usa ferramentas de análise de audiência e não envia dados para redes de publicidade. As fontes tipográficas são carregadas do próprio site, sem requisição a serviços de terceiros.` | a confirmar |
| `PRV-SECURITY-TITLE` | `Segurança` | a confirmar |
| `PRV-SECURITY-BODY` | `O envio do formulário ocorre por conexão segura. Os dados digitados não aparecem no endereço da página nem em registros de navegação.` | a confirmar |
| `PRV-CHANGES-BODY` | `Se esta política mudar, a data de atualização será alterada nesta página.` | a confirmar |
| `PRV-UPDATED` | `Atualizado em: [DATA A CONFIRMAR]` | a confirmar · placeholder |

---

## 14. Página `/termos`

**Rascunho. Mesmas condições da política de privacidade.**

| ID | Texto | Estado |
| --- | --- | --- |
| `TRM-BANNER` | `Este texto é um rascunho e ainda passará por revisão. Ele será atualizado antes de o site ser divulgado.` | a confirmar · **exibido mesmo assim** |
| `TRM-TITLE` | `Termos de uso` | confirmado |
| `TRM-PURPOSE-TITLE` | `Sobre este site` | a confirmar |
| `TRM-PURPOSE-BODY` | `Este site apresenta o trabalho de Felipe Gonzaga de Carvalho Gondim, Psicólogo, CRP 02/23810, e permite a entrada em uma lista de espera para atendimento.` | a confirmar |
| `TRM-NOT-CARE-TITLE` | `O que este site não é` | a confirmar |
| `TRM-NOT-CARE-BODY` | `Este site não realiza atendimento, avaliação, diagnóstico ou orientação clínica. O conteúdo publicado aqui é informativo e não substitui consulta com profissional de saúde.` | a confirmar |
| `TRM-EMERGENCY-BODY` | `Este site não atende situações de urgência. Em caso de risco imediato, procure ajuda presencial ou os serviços públicos de emergência.` | a confirmar · **exibido mesmo assim** |
| `TRM-WAITLIST-BODY` | `Entrar na lista de espera não garante vaga, não estabelece vínculo terapêutico e não define prazo de retorno. O contato é feito quando houver disponibilidade na agenda.` | a confirmar |
| `TRM-CONTENT-BODY` | `Os textos, a identidade visual e as imagens deste site pertencem aos seus respectivos titulares e não podem ser reproduzidos sem autorização.` | a confirmar |
| `TRM-CHANGES-BODY` | `Estes termos podem ser atualizados. A data de atualização será informada nesta página.` | a confirmar |
| `TRM-UPDATED` | `Atualizado em: [DATA A CONFIRMAR]` | a confirmar · placeholder |

---

## 15. Wizard de onboarding (`/onboarding`)

Ferramenta interna de coleta de decisões. Não é canal clínico, não é formulário oficial e não envia nada pela rede.

### 15.1 Banner e cabeçalho

| ID | Texto | Estado |
| --- | --- | --- |
| `ONB-BANNER` | `Protótipo interno. Esta página serve para registrar decisões sobre o site. Nada aqui é enviado pela internet: suas respostas ficam apenas neste navegador, e você exporta o resultado no final.` | confirmado |
| `ONB-TITLE` | `Onboarding do projeto` | confirmado |
| `ONB-SUBTITLE` | `Oito etapas curtas para fechar as pendências do site. Você pode parar e voltar depois.` | confirmado |
| `ONB-PROGRESS` | `Etapa {atual} de 8` | confirmado |
| `ONB-NOT-CLINICAL` | `Esta página não é um canal de atendimento e não deve receber informações de pacientes.` | confirmado |

### 15.2 Etapas A–H

> **INFERÊNCIA DE DESIGN:** o contrato define oito etapas nomeadas A a H, mas não os títulos. Os títulos abaixo são proposta.

| ID | Etapa | Título | Texto de ajuda | Estado |
| --- | --- | --- | --- | --- |
| `ONB-A` | A | `Identificação e dados profissionais` | `Confirme como seu nome, seu título e seu CRP devem aparecer no site.` | a confirmar |
| `ONB-B` | B | `Contatos e canais públicos` | `Instagram, WhatsApp e e-mail. Informe o que existe e, separadamente, o que você autoriza publicar.` | a confirmar |
| `ONB-C` | C | `Conteúdo e textos do site` | `Leia os textos propostos e aprove, ajuste ou recuse cada um.` | a confirmar |
| `ONB-D` | D | `Formações e credenciais` | `Confirme cada formação e se ela está concluída ou em andamento. Nada é publicado sem essa confirmação.` | a confirmar |
| `ONB-E` | E | `Atendimento e agenda` | `Público, formato, plataforma, status da agenda e abrangência geográfica.` | a confirmar |
| `ONB-F` | F | `Privacidade e dados` | `Destino do formulário, prazo de guarda dos dados, canal para pedidos de exclusão e responsável pelos dados.` | a confirmar |
| `ONB-G` | G | `Domínio, hospedagem e custos` | `Endereço do site, em nome de quem o domínio fica registrado e quem assume os custos de terceiros.` | a confirmar |
| `ONB-H` | H | `Personalizações e consentimentos` | `O que você quer adicionar no futuro e o que você autoriza (ou não) em relação ao uso do projeto como case.` | a confirmar |

### 15.3 Controles

| ID | Texto | Estado |
| --- | --- | --- |
| `ONB-NEXT` | `Avançar` | confirmado |
| `ONB-BACK` | `Voltar` | confirmado |
| `ONB-SKIP` | `Pular esta etapa` | confirmado |
| `ONB-SAVED` | `Rascunho salvo neste navegador.` | confirmado |
| `ONB-CLEAR` | `Apagar todas as respostas` | confirmado |
| `ONB-CLEAR-CONFIRM` | `Isso apaga todas as respostas salvas neste navegador. Não é possível desfazer.` | confirmado |
| `ONB-DECISION-NOW` | `Quero agora` | confirmado |
| `ONB-DECISION-LATER` | `Talvez depois` | confirmado |
| `ONB-DECISION-NO` | `Não quero` | confirmado |

### 15.4 Tela final

| ID | Texto | Estado |
| --- | --- | --- |
| `ONB-END-TITLE` | `Resumo das suas respostas` | confirmado |
| `ONB-END-INTRO` | `Confira o resumo abaixo. Se estiver tudo certo, exporte o arquivo e envie para análise.` | confirmado |
| `ONB-END-PENDING-TITLE` | `Pendências que continuam abertas` | confirmado |
| `ONB-END-PENDING-INTRO` | `Estes itens ainda bloqueiam ou limitam alguma parte do site. Cada um mostra o que está faltando e o que está valendo enquanto isso.` | confirmado |
| `ONB-END-MATRIX-TITLE` | `Matriz de requisitos` | confirmado |
| `ONB-END-MATRIX-INTRO` | `Situação de cada requisito do projeto com base nas suas respostas.` | confirmado |
| `ONB-EXPORT-JSON` | `Baixar JSON` | confirmado |
| `ONB-EXPORT-MD` | `Baixar Markdown` | confirmado |
| `ONB-COPY-JSON` | `Copiar JSON` | confirmado |
| `ONB-COPY-MD` | `Copiar Markdown` | confirmado |
| `ONB-COPIED` | `Copiado.` | confirmado |
| `ONB-EXPORT-NOTE` | `O arquivo é gerado no seu próprio dispositivo. Nada foi enviado pela internet.` | confirmado |
| `ONB-EXPORT-SEND` | `Envie o arquivo exportado pelo canal combinado para que as pendências sejam analisadas.` | confirmado |
| `ONB-NO-ANSWERS` | `Nenhuma resposta registrada ainda.` | confirmado |

---

## 16. Palavras e frases proibidas

Nenhum item abaixo pode aparecer em qualquer texto público do projeto — página, metadado, `alt`, título de link, legenda ou material de divulgação.

### 16.1 Promessa, garantia e resultado

`garantia de resultado` · `resultados garantidos` · `cura` · `curar` · `tratamento definitivo` · `solução definitiva` · `transforme sua vida` · `mude sua vida em X sessões` · `em poucas sessões você` · `alta em X meses` · `método infalível` · `funciona sempre` · `100% de eficácia` · `você vai superar` · `livre-se da ansiedade` · `elimine a depressão`

### 16.2 Superioridade e comparação

`o melhor psicólogo` · `referência em` · `líder em` · `número 1` · `mais qualificado que` · `diferente dos outros profissionais` · `ao contrário de outras abordagens` · `terapia tradicional não funciona` · `abordagem superior`

### 16.3 Credenciais indevidas

`especialista em TCC` (a segunda especialização está **em andamento**) · `mestre` · `doutor` · `PhD` · `certificado internacional` · `formação completa em` aplicado a curso em andamento · qualquer titulação, prêmio, filiação ou instituição não confirmados

### 16.4 Preço e comercial

`valor da sessão` · `a partir de R$` · `promoção` · `desconto` · `pacote de sessões` · `primeira sessão grátis` · `condições especiais` · `parcelamos` · `melhor custo-benefício` · qualquer cifra

### 16.5 Convênio e reembolso

`aceito convênio` · `atendo por plano de saúde` · `reembolso garantido` · `seu plano cobre` · `você recebe o valor de volta` · `reembolso integral` · menção a `Receita Saúde` **sem** a ressalva de que o reembolso não é garantido

### 16.6 Prova social e caso clínico

`meus pacientes dizem` · qualquer depoimento · qualquer relato de caso, mesmo anonimizado · `mais de X pacientes atendidos` · `X anos de experiência` (não confirmado) · nota, estrela, avaliação · print de mensagem de paciente

### 16.7 Urgência e pressão

`últimas vagas` · `corra` · `não perca` · `aproveite agora` · `vagas limitadas` como chamada de venda · contagem regressiva · escassez fabricada
*Observação:* dizer que a agenda tem **disponibilidade limitada** é informação factual (F-22) e é permitido; usar a escassez como gatilho de venda não é.

### 16.8 Diversidade como decoração

`somos inclusivos` · `espaço seguro` como selo sem lastro · `amigo da comunidade` · `aliado LGBT` · `LGBT friendly` · bandeira usada como adesivo · badge, selo ou emblema de diversidade · `atendo todo mundo, sem preconceito` como slogan
*Observação:* a competência afirmativa é comunicada pelas quatro experiências factuais da seção 7, não por adjetivos.

### 16.9 Patologização e linguagem inadequada

Qualquer termo que trate identidade de gênero ou orientação sexual como transtorno, problema, escolha, opção ou fase · `paciente LGBT` como categoria clínica · `homossexualismo` · `opção sexual` · `identidade de gênero` descrita como preferência · linguagem que sugira correção, conversão ou ajuste de identidade

### 16.10 Sigilo e informação privada

Qualquer menção ao número atual de pessoas atendidas · qualquer detalhe que permita identificar paciente · nome de universidade, evento ou instituição não confirmado · `saracoutinho.inspira.dev.br` ou qualquer referência a essa página

### 16.11 Vícios de linguagem

`Ops` · `Algo deu errado` · `Oops` · `Bem-vindo(a)!` com exclamação · `Estamos aqui por você!` · `Você não está sozinho!` · `Dê o primeiro passo rumo à sua melhor versão` · `jornada de autoconhecimento` como chamada de venda · `mindset` · `desbloquear seu potencial` · `terapia é para todos` como slogan · emoji em qualquer texto da página

---

## 17. Registro de decisões editoriais pendentes

| ID | Decisão | Opções | Padrão em vigor | Pendência |
| --- | --- | --- | --- | --- |
| `DEC-01` | Grafia de "on-line" | `on-line` · `online` | `on-line` | PEND-20 |
| `DEC-02` | Menção a Recife além de Pernambuco | citar · não citar | não citar | PEND-25 |
| `DEC-03` | Campo de mensagem livre no formulário | ativar · manter desligado | desligado | PEND-24 |
| `DEC-04` | Texto de apoio do campo Nome (nome social) | publicar · não publicar | não publicar | PEND-06 (validação de postura por Felipe) |
| `DEC-05` | Detalhamento das formações (instituição, ano, carga horária) | publicar · não publicar | não publicar | PEND-06 |
| `DEC-06` | Rótulo abreviado do menu em telas estreitas | `Perguntas frequentes` · `Dúvidas` | `Perguntas frequentes` | — |
| `DEC-07` | Texto e contatos do aviso de emergência | — | aviso sem números | PEND-14 |
| `DEC-08` | Redação final do consentimento LGPD | — | rascunho `CNS-01`, bloqueia publicação do formulário | PEND-11 |
