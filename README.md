# felipe-carvalho-hudi-pages

Site institucional (MVP) de **Felipe Gonzaga de Carvalho Gondim — Psicólogo — CRP 02/23810**.

Duas entregas em um único projeto:

- **`/`** — landing page pública, indexável, cuja conversão principal é entrar na
  lista de espera.
- **`/onboarding`** — questionário privado (protótipo, sem autenticação) que
  transforma as decisões do profissional em especificação. As respostas ficam
  apenas no navegador.

> **Aviso obrigatório antes de publicar:** este MVP ainda **não** passou por
> revisão ética (CFP) nem jurídica (LGPD) pelo profissional. Política de
> privacidade, termos, textos, títulos, canais de contato e aviso de emergência
> precisam ser revisados e aprovados por ele antes de qualquer publicação. Veja
> [O que bloqueia a produção](#o-que-bloqueia-a-produção).

---

## Requisitos

- Node.js 20 ou superior (validado em **v24.12.0**)
- npm 10 ou superior (validado em **11.6.2**)
- Acesso à rede na primeira build: as fontes do Google são **baixadas em tempo de
  build** e servidas pelo próprio site (nenhuma requisição a terceiros em runtime).

## Instalação e execução

```bash
npm install
cp .env.example .env.local     # PowerShell: Copy-Item .env.example .env.local
npm run dev                    # http://localhost:3210
```

### Scripts

| Script | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento na porta **3210** |
| `npm run build` | Build de produção |
| `npm start` | Servidor de produção na porta **3210** |
| `npm run lint` | ESLint (flat config + `eslint-config-next`) |
| `npm run typecheck` | `tsc --noEmit`, TypeScript em modo estrito |
| `npm test` | Vitest (jsdom + Testing Library), execução única |

---

## Variáveis de ambiente

Todas estão documentadas em `.env.example`. Só variáveis com prefixo
`NEXT_PUBLIC_` chegam ao navegador; as demais existem apenas no servidor.

| Variável | Escopo | Para que serve |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | público | URL canônica usada em metadata, Open Graph, `sitemap.xml` e `robots.txt` |
| `NEXT_PUBLIC_REVIEW_MODE` | público | `true` exibe os marcadores de pendência. **Nunca habilite em produção** |
| `WAITLIST_ADAPTER` | servidor | `mock` ou `webhook` |
| `WAITLIST_WEBHOOK_URL` | servidor | Destino do POST quando o adaptador é `webhook` |
| `WAITLIST_WEBHOOK_TOKEN` | servidor | Bearer token opcional para o webhook |
| `WAITLIST_RATE_LIMIT_MAX` | servidor | Envios permitidos por IP na janela |
| `WAITLIST_RATE_LIMIT_WINDOW_MS` | servidor | Tamanho da janela, em milissegundos |

`src/config/server-env.ts` lança um erro se for importado no navegador, para que
um import acidental falhe alto em vez de silenciosamente.

---

## Como configurar o adaptador da lista de espera

O destino dos dados é trocado sem tocar no handler da rota
(`src/lib/waitlist/adapter.ts`).

**`mock` (padrão)** — não guarda nada e não envia nada. A resposta traz
`persisted: false, simulated: true`, e a tela de sucesso exibe um aviso visível
de que o envio foi simulado. É intencional: o modo de teste nunca finge que um
contato foi salvo.

**`webhook`** — faz um `POST` JSON para `WAITLIST_WEBHOOK_URL`, com
`Authorization: Bearer …` quando `WAITLIST_WEBHOOK_TOKEN` estiver definido, e
timeout de 8 s.

```bash
WAITLIST_ADAPTER=webhook
WAITLIST_WEBHOOK_URL=https://exemplo.com/hooks/lista-de-espera
WAITLIST_WEBHOOK_TOKEN=um-token-forte
```

Corpo enviado:

```json
{
  "fullName": "…",
  "email": "…",
  "phone": "+5581900000000",
  "contactPreference": "email",
  "availability": "manha",
  "referral": "…",
  "consent": true,
  "receivedAt": "2026-01-01T12:00:00.000Z",
  "source": "site-lista-de-espera"
}
```

Para um destino novo (planilha, CRM, e-mail), basta implementar `WaitlistAdapter`
e registrá-lo em `getWaitlistAdapter`.

---

## Como alterar o status da agenda

Em `src/config/project.config.ts`, `service.availabilityStatus` aceita três
valores:

| Valor | Efeito na página |
| --- | --- |
| `open` | Formulário visível, texto padrão |
| `limited` | **Padrão.** Formulário visível com o aviso de disponibilidade limitada |
| `waitlist-closed` | O formulário desaparece e é substituído pelo aviso de lista fechada; o link do Instagram só aparece se estiver configurado |

O número de pessoas atendidas **nunca** é publicado — apenas o status.

---

## Como adicionar foto, Instagram, WhatsApp e e-mail

Tudo vive em `src/config/project.config.ts`. Enquanto um valor for `undefined`,
o elemento correspondente simplesmente não é renderizado — não há placeholder
falso nem link quebrado.

```ts
professional.photo = { src: '/felipe.jpg', width: 1200, height: 1500 };
contact.instagramUrl = 'https://instagram.com/…';
contact.whatsappNumber = '+5581900000000';
contact.email = 'contato@exemplo.com.br';
```

- **Foto:** coloque o arquivo em `public/` e informe `width`/`height` reais.
  Enquanto não existir, o hero mostra uma composição abstrata da marca (e, em
  modo de revisão, um espaço reservado rotulado). Nenhuma pessoa de banco de
  imagens ou rosto gerado é usado em nenhuma hipótese.
- **WhatsApp:** o botão abre apenas a mensagem neutra configurada em
  `contact.whatsappMessage`. Respostas do formulário **nunca** entram no link —
  link não é canal seguro, e codificação de URL não é criptografia.
- **WhatsApp como canal operacional:** se ele for confirmado, o campo de
  telefone do formulário deve passar de opcional para obrigatório em
  `src/lib/waitlist-schema.ts`.
- **Logos:** `public/brand/manifest.json` é mantido pelo pipeline de identidade
  visual. O site lê o manifesto e verifica se cada arquivo existe em disco; se
  não existir, cai no lockup tipográfico acessível.

---

## Modo de revisão

Com `NEXT_PUBLIC_REVIEW_MODE=true`:

- um painel recolhível no topo lista **todos** os itens pendentes, separados
  entre "ausentes" e "textos aguardando aprovação";
- títulos e trechos ainda não aprovados recebem um marcador `◆ a confirmar`;
- o espaço da fotografia aparece rotulado como reservado;
- o rodapé mostra o bloco reservado aos contatos de emergência;
- a tela de sucesso do formulário exibe o aviso de envio simulado.

Cada string do site carrega `status: 'confirmado' | 'a-confirmar'`, e o painel é
gerado percorrendo a configuração — não existe lista mantida à mão.

---

## Formulário da lista de espera: privacidade por design

Campos coletados: nome completo (obrigatório), e-mail (obrigatório), WhatsApp ou
telefone (**opcional**, porque o canal operacional ainda não foi confirmado),
preferência de contato, disponibilidade por turno, como conheceu o trabalho e o
aceite obrigatório da política de privacidade.

**Campos deliberadamente ausentes** — "você já fez terapia antes?", "o que te
motiva a buscar atendimento agora?", diagnóstico, sintomas, medicação, histórico
de saúde, identidade de gênero, orientação sexual e qualquer relato clínico.

Motivo: um formulário público de contato não pode virar triagem clínica. Esses
dados são sensíveis segundo a LGPD, exigiriam base legal, prazo de guarda e
medidas de segurança específicas, e ficariam expostos em qualquer serviço de
terceiro usado como destino — sem qualquer benefício para quem só quer entrar
numa lista de espera. A trava é estrutural em três níveis:

1. `privacy.sensitiveFieldsEnabled` é tipado como o literal `false`, então nem
   dá para ligá-lo sem alterar o tipo;
2. o schema Zod usa `.strict()`, então o servidor **rejeita** qualquer campo
   extra que apareça no corpo da requisição;
3. um teste de guarda quebra a build se algum desses campos aparecer.

Outras decisões:

- schema Zod único, compartilhado entre navegador e servidor;
- máscara de telefone derivada dos dígitos, então colar em qualquer formato
  funciona;
- erros específicos por campo, ligados por `aria-describedby`/`aria-invalid` e
  anunciados em uma região `aria-live="polite"`;
- campo-armadilha (honeypot) que **valida normalmente** e é descartado no
  servidor, respondendo como um sucesso comum — o robô não descobre o que o
  denunciou;
- rate limit em memória por IP e detecção de duplicidade por hash salgado
  (o valor do contato não fica em memória);
- **nenhum valor do formulário é registrado em log**, em analytics, na URL ou em
  qualquer link. O servidor loga apenas `{ scope, at, outcome }`.

---

## Acessibilidade

Meta: WCAG 2.2 AA. O que está implementado: skip link como primeiro elemento
focável, um único `h1` por página, marcos semânticos rotulados, foco visível
próprio, navegação completa por teclado, menu móvel com focus trap e retorno de
foco ao gatilho, acordeão com semântica ARIA correta, rótulos sempre visíveis,
alvos de toque de 44 px, erros e sucesso anunciados, `alt` vazio em decoração,
animação única e lenta desativada sob `prefers-reduced-motion`, e nenhum estado
comunicado só por cor (formação concluída × em andamento usa glifo, estilo de
borda e rótulo escrito).

Os contrastes foram calculados numericamente e estão registrados em comentário no
topo de `src/styles/tokens.css`. Para recalcular após mudar qualquer cor:

```bash
node scripts/contrast.mjs                 # todos os pares
node scripts/contrast.mjs "#3A4356" "#FFFFFF"   # um par específico
```

---

## Estrutura

```
src/
  app/
    (site)/                     landing, política de privacidade, termos
    api/waitlist/route.ts       endpoint POST da lista de espera
    onboarding/                 wizard privado (noindex)
    layout.tsx  robots.ts  sitemap.ts  opengraph-image.tsx
  components/                   brand, layout, sections, faq, waitlist, review, seo, legal
  config/
    types.ts                    contrato tipado do projeto
    project.config.ts           a única fonte de verdade
    content/                    textos, páginas legais, classificação de escopo
    brand-assets.ts             leitura tolerante de public/brand/manifest.json
  lib/                          schema, telefone, adaptadores, rate limit, dedupe
  styles/                       tokens.css (com os contrastes) e globals.css
```

Nenhum texto, URL ou flag é escrito direto em componente: tudo vem da
configuração.

---

## Dependências e justificativas

Runtime: `next`, `react`, `react-dom`, `zod`.

Desenvolvimento: `typescript`, `@types/*`, `eslint`, `eslint-config-next`,
`vitest`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react`,
`@testing-library/user-event`, `@testing-library/jest-dom`.

Adição fora da lista original:

- **`@eslint/eslintrc`** (dev) — `eslint-config-next@15.5.x` ainda só publica
  configuração no formato legado. O bridge `FlatCompat` é necessário para usá-la
  com o ESLint 9 em flat config. É o mesmo pacote que o `create-next-app`
  adiciona. Nenhuma dependência de runtime foi acrescentada.

Decisões de stack:

- **Sem Tailwind, sem CSS-in-JS, sem biblioteca de UI.** CSS Modules mais
  `tokens.css` dão controle total sobre a paleta da marca, mantêm o bundle
  enxuto e evitam que utilitários de terceiros dificultem auditar contraste e
  tamanho de alvo.
- **Sem analytics, sem cookies, sem fontes de terceiros em runtime.** As fontes
  são baixadas na build e servidas pelo próprio domínio, então nenhum IP de
  visitante vaza para um terceiro.
- **`next` foi fixado em 15.5.23**, e não em 15.5.4, porque a versão anterior
  tem vulnerabilidade conhecida (CVE-2025-66478).

---

## Publicação

Nada foi comprado ou configurado ainda.

- **Subdomínio (recomendado para começar):** slug sugerido `felipecarvalho`.
  Basta apontar o subdomínio para o deploy e ajustar `NEXT_PUBLIC_SITE_URL`.
- **Domínio próprio:** ainda não escolhido nem registrado. Antes de migrar,
  defina quem controla o registro, o DNS e a renovação — perder a renovação
  derruba o site inteiro.

Antes de publicar:

1. `NEXT_PUBLIC_REVIEW_MODE=false`;
2. `NEXT_PUBLIC_SITE_URL` com a URL pública real (afeta canonical, Open Graph,
   `sitemap.xml` e `robots.txt`);
3. escolher e testar o adaptador da lista de espera — em `mock`, nenhum contato
   é salvo;
4. confirmar que `/onboarding` continua fora do índice (`robots.txt`, metadata e
   header `X-Robots-Tag` já cobrem isso).

### Limitações conhecidas do MVP

- Rate limit e detecção de duplicidade são **em memória e por processo**: eles
  reiniciam junto com o servidor e não são compartilhados entre instâncias. Em
  ambiente serverless com várias instâncias, a proteção fica mais fraca.
- O adaptador `mock` não persiste nada. Enquanto ele estiver ativo, o site
  funciona, mas nenhum contato é guardado.
- `/onboarding` não tem autenticação. Quem tiver o endereço, entra.

---

## O que bloqueia a produção

- [ ] Revisão e aprovação de todos os textos pelo profissional
- [ ] Revisão jurídica da política de privacidade e dos termos
- [ ] Definição do controlador, do canal de direitos do titular e da base legal
- [ ] Confirmação do prazo de retenção (hoje 180 dias, apenas referência)
- [ ] Fotografia profissional autorizada
- [ ] Arquivos finais de logo em `public/brand/`
- [ ] Instagram, WhatsApp e e-mail profissional confirmados
- [ ] Definição do canal operacional (muda se o telefone é obrigatório)
- [ ] Abrangência geográfica do atendimento on-line
- [ ] Contatos oficiais de emergência validados (nenhum número é publicado sem isso)
- [ ] Domínio ou subdomínio definido e configurado
- [ ] Escolha de um destino real para a lista de espera

## Licença e uso

Projeto sob medida. O conteúdo e a identidade visual pertencem ao profissional e
ao estúdio, conforme acordado entre as partes. Desenvolvido com Hudi Pages, um
projeto Hudi Labs.
