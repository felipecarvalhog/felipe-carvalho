# QA final — Hudi Pages

Data da execução: 8 de agosto de 2026.

## Resultado

**Aprovado no ambiente local de revisão.** Nenhuma regressão bloqueante foi encontrada.

## Qualidade de código

| Check | Resultado |
|---|---|
| ESLint | aprovado, zero erros |
| TypeScript (`tsc --noEmit`) | aprovado, zero erros |
| Vitest | 88 testes aprovados |
| Build Next.js | aprovado |

## Navegadores e viewports

Auditoria externa executada com Playwright 1.62.1 e Chromium 151, sem adicionar dependências ao produto.

Viewports: 360 × 800, 768 × 1024, 1024 × 768 e 1440 × 900. Também foi validado zoom de 200% em viewport CSS de 640 × 400.

- Sem rolagem horizontal em qualquer viewport.
- Sem sobreposição no hero em zoom de 200%.
- Foto renderizada em proporção 0,8 (512:640), sem distorção.
- Logotipos renderizados com desvio inferior a 0,02% da proporção intrínseca.
- 27 a 31 controles verificados por viewport; nenhum alvo abaixo de 44 × 44 px.
- Header estável em 72 px de conteúdo / 73 px total.

O overflow geométrico detectado pertence ao grafismo decorativo e ao honeypot. Ambos estão ocultos por seus contêineres, não aumentam `scrollWidth` e não criam rolagem horizontal.

## Acessibilidade

- Zero violações axe em `/`, `/onboarding`, `/politica-de-privacidade` e `/termos`.
- Contraste medido sem falhas; menor razão relevante: 5,95:1 para texto normal.
- Skip link é o primeiro foco, fica visível e move o foco para `main`.
- Ordem de tabulação sem contradições e foco visível nos controles do produto.
- Menu mobile mantém foco dentro do painel, fecha com Escape e restaura o foco.
- Cinco itens de FAQ abrem e fecham por Enter, Espaço e clique.
- Um único `h1`, sem saltos de hierarquia; `lang="pt-BR"` e landmarks presentes.

Os casos de contraste marcados como incompletos pelo axe foram medidos separadamente. Todos passaram; os demais casos eram gradientes, elementos decorativos ou pixels não BMP que exigem revisão manual.

## Formulário e privacidade

- Campos sensíveis continuam ausentes.
- Envio vazio não dispara POST e direciona o foco para o primeiro erro.
- Consentimento não marcado bloqueia o envio.
- Telefone digitado ou colado resulta em `(81) 99999-8888`.
- Duplo clique produz apenas um POST.
- Sucesso exibe explicitamente o aviso de modo simulado.
- Duplicata retorna 409 e mensagem sem ecoar dados pessoais.
- Nenhum dado submetido aparece em URL, query string, cookies, `localStorage` ou `sessionStorage`.
- Nenhuma requisição de terceiros foi observada.

## Onboarding e rotas

- Respostas persistem após recarregar a página.
- Exportações JSON e Markdown são válidas e usam `felipe-carvalho-hudi-pages`.
- Exportação não envia dados pela rede.
- `/onboarding` permanece `noindex, nofollow, nocache` e fora do sitemap.
- `robots.txt`, `sitemap.xml`, imagem Open Graph e páginas legais retornam 200.
- Rota inexistente retorna 404.
- Nenhum erro de console, página, request ou resposta HTTP inesperada foi observado.

## Assets e evidências

Todos os 12 assets do manifesto de marca retornaram 200. A fotografia publicada foi validada visualmente em desktop e mobile.

Foram regeneradas 31 capturas em `docs/screenshots/`, cobrindo hero, página completa, seções, menu mobile, estados do formulário, onboarding, páginas legais, Open Graph e zoom de 200%.

## Limites de publicação

O resultado está aprovado como MVP local de revisão, mas não deve ser divulgado como produção enquanto o destino real da waitlist, domínio, textos pendentes e revisão jurídica não forem resolvidos. O consentimento para uso como case permanece separado e desativado.
