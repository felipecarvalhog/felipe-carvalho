# Ativos de marca — Felipe Carvalho, Psicólogo

Documentação dos arquivos de marca entregues em `public/brand/`, produzidos a partir dos
originais do designer. Todas as medidas deste documento foram **medidas** nos arquivos
(geometria vetorial, bounding boxes reais e censo de pixels), nunca estimadas.

- **Titular:** Felipe Gonzaga de Carvalho Gondim — Psicólogo — CRP 02/23810
- **Conceito da marca:** pensamento, conexão e acolhimento
- **Contrato para o código:** `public/brand/manifest.json`
- **Peso total do conjunto:** 308.019 bytes (300,8 KB), 12 ativos + `manifest.json`

---

## 1. Inventário

| Arquivo final | Arquivo de origem | Formato | Dimensões intrínsecas | Tamanho | Onde usar | Qualidade |
|---|---|---|---|---|---|---|
| `logo-horizontal-color.svg` | SVG mestre (lockup horizontal cores) | SVG | 1375 × 479 (viewBox) | 10.961 B (10,7 KB) | Header desktop, rodapé sobre fundo claro, assinatura de e-mail | Vetor limpo · IoU 99,43 % vs. PNG do designer |
| `logo-vertical-color.svg` | SVG mestre (lockup vertical cores) | SVG | 843 × 629 (viewBox) | 10.726 B (10,5 KB) | Hero, cartão de contato, layouts estreitos, compartilhamento | Vetor limpo · IoU 99,43 % |
| `logo-horizontal-white.svg` | SVG mestre (lockup horizontal branco) | SVG | 1375 × 479 (viewBox) | 13.476 B (13,2 KB) | Header/rodapé sobre fundo escuro ou cobalto `#2B4BA9` | Vetor limpo · IoU 99,13 % |
| `logo-vertical-white.svg` | SVG mestre (lockup vertical branco) | SVG | 843 × 629 (viewBox) | 13.250 B (12,9 KB) | Seções escuras, overlay sobre fotografia | Vetor limpo · IoU 99,17 % |
| `logo-horizontal-negative.png` | `00000032-…NegativoHorizontal.png` | PNG (alfa) | 5501 × 1916 px | 111.985 B (109,4 KB) | Impressão em 1 cor, fax/documento, carimbo — **fundo claro** | Raster · sem versão vetorial disponível |
| `logo-vertical-negative.png` | `00000027-…NegativoVerticalpng.png` | PNG (alfa) | 3369 × 2515 px | 107.046 B (104,5 KB) | Impressão em 1 cor, documentos — **fundo claro** | Raster · sem versão vetorial disponível |
| `symbol.svg` | SVG mestre (traço + formas do lockup vertical cores) | SVG | 490 × 388 (viewBox) | 3.427 B (3,3 KB) | Header mobile, avatar, marca d'água, ícone de app | Vetor limpo · isolado de grupos existentes |
| `symbol-white.svg` | SVG mestre (lockup vertical branco) | SVG | 490 × 388 (viewBox) | 5.920 B (5,8 KB) | Header mobile sobre fundo escuro | Vetor limpo |
| `favicon.svg` | `symbol.svg` centralizado em canvas quadrado | SVG | 490 × 490 (viewBox) | 3.428 B (3,3 KB) | `<link rel="icon" type="image/svg+xml">` | Vetor limpo · ver limitação de tamanho mínimo |
| `favicon.ico` | `favicon.svg` | ICO (PNG interno) | 16×16, 32×32, 48×48 | 4.345 B (4,2 KB) | `/favicon.ico` legado | Ver §7 — ilegível a 16/32 px |
| `favicon-512.png` | `favicon.svg` | PNG (alfa) | 512 × 512 px | 16.282 B (15,9 KB) | Web app manifest, PWA | OK |
| `apple-touch-icon.png` | `favicon.svg` | PNG (alfa) | 180 × 180 px | 5.872 B (5,7 KB) | `<link rel="apple-touch-icon">` | Fundo transparente — ver §8 |
| `manifest.json` | — | JSON | — | 1.301 B (1,3 KB) | Contrato consumido pelo código do site | Validado |

Observações sobre as dimensões:

- Para SVG, `width`/`height` no manifesto são exatamente as dimensões do `viewBox`.
- O bounding box real da arte é fracionário. O canvas foi arredondado **para cima** e a arte
  **recentralizada**, para que o `viewBox` seja inteiro (exigência do contrato). Isso adiciona
  menos de 1 unidade de margem (< 0,12 % da largura) e **não** aplica escala, recorte ou
  distorção. Bounding boxes exatos da arte: horizontal 1374,90 × 478,61 (cores) e
  1374,90 × 478,93 (branco); vertical 842,21 × 628,44 (cores) e 842,21 × 628,52 (branco);
  símbolo 489,31 × 387,74.
- Como efeito colateral desejável, as variantes cores e branco passaram a ter dimensões
  intrínsecas **idênticas** (1375 × 479 e 843 × 629), o que permite trocar uma pela outra
  sem qualquer reflow de layout.
- Os PNGs negativos mantêm exatamente as dimensões originais do designer. Não houve
  reamostragem, upscale, alteração de proporção nem padding.

---

## 2. Investigação do SVG de 17 MB

**Arquivo:** `00000033-Logo_FelipeCarvalho_Final.svg` — 17.316.423 bytes (16,5 MiB).

**Causa do tamanho: uma única fotografia JPEG embutida em base64.** Não é excesso de nós,
não é precisão de coordenadas e não é fonte embutida.

Evidências medidas:

| Evidência | Valor medido |
|---|---|
| Elementos `<image>` | 1 |
| Blocos base64 | 1, com 17.230.455 caracteres (≈ 16,43 MB) = **99,5 % do arquivo** |
| Payload decodificado | 12.922.836 bytes (12,32 MB), assinatura `FFD8FF` → JPEG |
| Dimensão intrínseca do JPEG | 6776 × 4522 px |
| Posicionamento | `transform="translate(-62.7 3407.1) scale(.3)"` — página final do manual (mockup fotográfico de aplicação) |
| Blocos `@font-face` / elementos `<font>` | 0 / 0 — nenhuma fonte embutida |
| Dados de path (`d=`) somados | 66.106 caracteres (0,06 MB) em 231 paths |
| Total de elementos | 399 (231 `path`, 46 `g`, 44 `tspan`, 30 `circle`, 23 `text`, 15 `rect`, 3 `clipPath`, 1 `image`) |
| Precisão de coordenadas | 12.821 números decimais, **todos com exatamente 1 casa decimal** |
| Tamanho do arquivo com o base64 removido | **85.983 bytes (84 KB)** |

**Conclusão:** o SVG é arte vetorial genuína. Removida a fotografia, o documento inteiro —
os sete conteúdos do manual — pesa 84 KB. A imagem raster é um mockup de aplicação e não tem
relação com os lockups da marca.

**O que a fotografia embutida mostra.** Extraída e inspecionada: é uma cena de interior vazia
— poltrona baixa clara junto a uma janela, cortina de linho e um vaso de zamioculca — usada
como fundo de mockup na última página do manual. Três consequências:

- **Não é um retrato de Felipe Carvalho.** Confirma-se que nenhuma fotografia do titular
  existe no pacote recebido (§8, item 1).
- **Origem e licença desconhecidas.** Tem características de banco de imagens e não veio
  acompanhada de crédito ou licença. Não deve ser publicada no site.
- **Contraria a direção estética definida.** A cena é exatamente o clichê de "divã genérico"
  vetado no briefing. Mesmo que a licença fosse resolvida, o ativo não serviria à página.

**Estrutura do arquivo mestre.** O `viewBox` declarado é `0 0 1920 1080`, mas o conteúdo real
ocupa de x −62,7 a 4239,9 e de y 144,3 a 5040,8: as 7 páginas do manual estão dispostas em
grade de 2 colunas numa única prancheta, e o `viewBox` enquadra apenas a página 1. Lockups
localizados por bounding box real:

| Grupo | Conteúdo | Bounding box (coordenadas do mestre) |
|---|---|---|
| 1 | Lockup vertical cores | `[538,89 · 1365,76]` → 842,21 × 628,44 |
| 2 | Lockup horizontal cores | `[2252,50 · 1440,70]` → 1374,90 × 478,61 |
| 3 | Lockup vertical branco | `[538,89 · 2505,68]` → 842,21 × 628,52 |
| 4 | Lockup horizontal branco | `[2252,50 · 2580,37]` → 1374,90 × 478,93 |
| 5 | Lockup vertical branco reduzido (sobre a foto) | 526,9 × 393,2 — duplicata, não utilizado |
| 6 | Grafismo conceitual da página 1 | 1062,0 × 478,1 — não é lockup, não utilizado |

**Não existe nenhuma versão preta/negativa na arte vetorial.** O único `#000` do arquivo é
uma parada de gradiente do layout do manual.

---

## 3. Estratégia adotada e verificação

### 3.1 Extração dos lockups (SVG)

Cada lockup foi extraído **isolando grupos e elementos já existentes** e ajustando o
`viewBox`. Nenhuma arte foi redesenhada, recortada, escalada de forma não uniforme ou
recolorida. As classes CSS do original eram todas declarações de `fill` puras e foram
resolvidas para atributos `fill` equivalentes — o extrator **aborta** se encontrar qualquer
classe com declaração diferente de `fill` (opacidade, blend mode, clip-path), justamente
para não descartar nada silenciosamente. Verificou-se também que nenhum ancestral dos
lockups possui `transform`, de modo que as coordenadas absolutas são preservadas.

### 3.2 Otimização com SVGO

Configuração conservadora: `removeViewBox` desligado, `<title>` preservado (nome acessível),
`mergePaths` **desligado** (para nunca fundir subpaths com `fill` ou `fill-rule` distintos),
`keepAriaAttrs` e `keepRoleAttr` ativos.

Sobre precisão: o pedido previa reduzir para ~3 casas decimais, mas **o original já vem com
1 casa decimal**, então não havia precisão a reduzir. O ganho real veio da normalização do
`viewBox` para a origem (`0 0 W H`), o que encurta as coordenadas.

| Arquivo | Antes | Depois | Redução | Paths | Círculos | `viewBox` |
|---|---|---|---|---|---|---|
| `logo-vertical-color.svg` | 12.397 B | 10.726 B | −13,5 % | 38 → 38 | 6 → 6 | preservado |
| `logo-horizontal-color.svg` | 12.581 B | 10.961 B | −12,9 % | 38 → 38 | 6 → 6 | preservado |
| `logo-vertical-white.svg` | 15.146 B | 13.250 B | −12,5 % | 49 → 49 | 6 → 6 | preservado |
| `logo-horizontal-white.svg` | 15.387 B | 13.476 B | −12,4 % | 49 → 49 | 6 → 6 | preservado |
| `symbol.svg` | 3.534 B | 3.427 B | −3,0 % | 3 → 3 | 0 → 0 | preservado |
| `symbol-white.svg` | 6.340 B | 5.920 B | −6,6 % | 14 → 14 | 0 → 0 | preservado |

Contagem de paths e círculos **inalterada** em todos os casos.

### 3.3 Verificação de fidelidade

Dois testes independentes, ambos por comparação de pixels:

1. **Antes × depois do SVGO** (mesmo arquivo, renderizado a 1000 px): IoU de 99,95 % a
   100,00 %, delta médio de cor **0,00–0,01** em 765. A otimização não alterou a renderização.
2. **SVG entregue × PNG do designer** (alinhado pelo bounding box de tinta, renderizado a
   1200 px):

| Arquivo entregue | PNG de referência | IoU | Delta médio de cor |
|---|---|---|---|
| `logo-vertical-color.svg` | `…CoresVertical.png` | 99,43 % | 1,01 / 765 |
| `logo-horizontal-color.svg` | `…CoresHorizontal.png` | 99,43 % | 1,75 / 765 |
| `logo-vertical-white.svg` | `…BrancoVertical.png` | 99,17 % | 0,29 / 765 |
| `logo-horizontal-white.svg` | `…BrancoHorizontal.png` | 99,13 % | 0,36 / 765 |

A diferença residual (< 0,9 %) está inteiramente nas bordas antialiasadas de 1 px; o delta de
cor praticamente nulo confirma que nenhuma cor foi alterada. Proporções conferidas:
vertical 1,3400 (SVG) vs. 1,3405 (PNG); horizontal 2,8717 vs. 2,8706 — diferença de 0,04 %.

### 3.4 Otimização dos PNGs negativos

Foram testadas três codificações estritamente sem perdas e escolhida a menor cujo
round-trip voltou **bit a bit idêntico** ao original (comparação do buffer RGBA cru):

| Arquivo | Antes | Depois | Redução | Sem perdas | EXIF/ICC/XMP |
|---|---|---|---|---|---|
| `logo-horizontal-negative.png` | 137.623 B | 111.985 B | −18,6 % | verificado | removidos |
| `logo-vertical-negative.png` | 132.170 B | 107.046 B | −19,0 % | verificado | removidos |

Dimensões preservadas exatamente (5501 × 1916 e 3369 × 2515).

### 3.5 Por que o negativo continua sendo raster

A versão "Negativo" **não é** a versão em cores achatada para preto — foi medido: a silhueta
do negativo coincide com a da versão em cores em apenas **88,1 % (vertical) e 87,5 %
(horizontal)**, com ~12 % de tinta presente só na versão colorida.

Inspecionando o arquivo: no negativo o traço contínuo é **vazado** (desenhado como espaço
negativo em contorno duplo através das formas pretas), e não como linha sólida. É arte
distinta, com tratamento próprio, que **não existe** no SVG mestre nem no PDF do manual.
Reproduzi-la exigiria recolorir e recriar um knockout — ou seja, redesenhar. Optou-se por
entregar o PNG original do designer, otimizado sem perdas. Ver §8.

Censo de cor dos negativos: **1 única cor opaca, `#000000`, em 100,000 % dos pixels**, sobre
fundo transparente. Por isso só são legíveis sobre fundos claros.

### 3.6 Símbolo

O símbolo foi isolado a partir dos três elementos irmãos que compõem a marca no lockup
vertical em cores — as duas formas de apoio (`#CEE4EA` e `#D0DEED`) e o traço contínuo
(`#2B4BA9`) — deixando de fora logotipo, assinatura e os seis pontos. É isolamento de
elementos existentes, sem redesenho. `symbol-white.svg` foi obtido da mesma forma a partir
do lockup vertical branco (14 paths, pois as formas de apoio estão subdivididas no original).

---

## 4. Verificação da paleta

A página 2 do manual (`00000026-Logo_FelipeCarvalho_Final.pdf`, "Paleta de cores") declara
**exatamente quatro cores**. Comparação com a lista oficial:

| Manual — HEX | CMYK | HSB | RGB | Cor oficial esperada | Resultado |
|---|---|---|---|---|---|
| `#2B4BA9` | 94, 81, 0, 0 | 225, 75 %, 66 % | 43, 75, 169 | `#2B4BA9` brand-cobalt | **confere** |
| `#4D576B` | 82, 71, 49, 7 | 220, 28 %, 42 % | 77, 87, 107 | `#4D576B` brand-slate | **confere** |
| `#D0DEED` | 25, 9, 6, 0 | 211, 12 %, 93 % | 208, 222, 237 | `#D0DEED` brand-lavender-blue | **confere** |
| `#CEE4EA` | 29, 3, 11, 0 | 193, 12 %, 92 % | 206, 228, 234 | `#CEE4EA` brand-mist | **confere** |

**Nenhuma divergência.** As quatro cores oficiais estão corretas. Os valores RGB declarados
também são internamente consistentes com os HEX (43,75,169 = `2B4BA9`; 77,87,107 = `4D576B`;
208,222,237 = `D0DEED`; 206,228,234 = `CEE4EA`).

### 4.1 Cores adicionais usadas na marca mas **não** documentadas na paleta

Os **seis pontos coloridos** aparecem na arte em todas as versões, mas o manual não os
declara em lugar nenhum. Valores extraídos do SVG mestre e confirmados por censo de pixels
nos PNGs do designer (ordem da esquerda para a direita):

| # | HEX | RGB | Descrição |
|---|---|---|---|
| 1 | `#C30B0B` | 195, 11, 11 | vermelho |
| 2 | `#E58B21` | 229, 139, 33 | laranja |
| 3 | `#FAEC37` | 250, 236, 55 | amarelo |
| 4 | `#6CBE2D` | 108, 190, 45 | verde |
| 5 | `#3E63FF` | 62, 99, 255 | azul |
| 6 | `#8F0AC6` | 143, 10, 198 | roxo |

Há ainda **`#7C7C7C`** (cinza), usado na assinatura "PSICÓLOGO | CRP 02/23810" da versão em
cores — também ausente da paleta documentada.

As cores `#444748` e `#254699` aparecem no arquivo, mas pertencem ao **layout do próprio
manual** (títulos das páginas e painel de fundo), não à marca.

> Recomendação: pedir ao designer a formalização dos seis pontos e do cinza `#7C7C7C` na
> paleta, já que são parte visível da identidade e hoje não têm especificação oficial.

---

## 5. Tipografia

**O manual não possui página de tipografia.** Não há qualquer especificação de fonte
institucional nas 7 páginas.

O que foi possível medir no arquivo mestre:

- O **logotipo está totalmente vetorizado** (contornos convertidos em paths). Nenhuma fonte
  está embutida no SVG (`@font-face`: 0, `<font>`: 0) e nenhuma é necessária para renderizar.
- As fontes referenciadas no SVG servem apenas aos **textos do próprio manual**:
  - `Gotham-Bold` e `Gotham-Light` — títulos das páginas ("Conceito", "Paleta de cores") e o
    parágrafo de conceito;
  - `MyriadPro-Regular` e `MyriadPro-Bold` — os valores CMYK/HSB/RGB/HEX da página de paleta.

**Comparação com a escolha provisória do site (Manrope para títulos + Source Sans 3 para
corpo):** como o manual não prescreve nada, **não há conflito nem violação**. A única
tipografia que o designer efetivamente usou em material de marca é a família **Gotham**, uma
sans geométrica; as letras do logotipo são coerentes com esse gênero (sans geométrica com
"a" de andar único), embora isso não possa ser confirmado no arquivo por estarem
vetorizadas. Manrope é uma sans semi-geométrica e combina razoavelmente com esse logotipo.
Nenhum arquivo de código ou de tokens foi alterado — este item é apenas relato.

> Pendência: confirmar com o designer se Gotham é a fonte institucional pretendida. Gotham é
> uma fonte comercial licenciada e exigiria compra para uso em web.

---

## 6. Acessibilidade — texto alternativo

| Uso | `alt` recomendado |
|---|---|
| Lockup completo como identificação principal (header, rodapé) | `alt="Felipe Carvalho — Psicólogo"` |
| Lockup dentro de um link para a home | `alt="Felipe Carvalho — Psicólogo"` (descreve o destino) |
| Símbolo no header mobile, quando é a única marca visível | `alt="Felipe Carvalho — Psicólogo"` |
| Símbolo acompanhado do nome já em texto ao lado | `alt=""` (decorativo, evita leitura duplicada) |
| Marca d'água, grafismo de fundo, elemento ornamental | `alt=""` |
| Favicon / apple-touch-icon | não se aplica |

Os SVGs entregues já trazem `role="img"`, `aria-label` e `<title>` internos. Ao usá-los via
`<img>`, o `alt` do elemento prevalece; ao usá-los inline, o `<title>` já fornece o nome
acessível.

---

## 7. Tamanhos mínimos e espaçamento (medidos)

### 7.1 Tamanhos mínimos

Medições feitas por renderização em escalas crescentes e inspeção visual, mais o cálculo da
espessura real do traço.

**Símbolo / favicon** — a espessura mediana do traço contínuo é **10,04 unidades** num
`viewBox` de 490, ou seja **2,05 % da largura**. Espessura resultante:

| Largura renderizada | Espessura do traço | Legibilidade |
|---|---|---|
| 16 px | 0,33 px | ilegível |
| 24 px | 0,49 px | ilegível |
| 32 px | 0,66 px | ilegível / borrado |
| 48 px | 0,98 px | limite mínimo |
| 64 px | 1,31 px | aceitável |
| 96 px | 1,97 px | bom |
| 128 px | 2,62 px | bom |

**Mínimo recomendado para o símbolo: 48 px; confortável a partir de 64 px.**

**Lockups** — o fator limitante é a assinatura "PSICÓLOGO | CRP 02/23810" (altura de 33,2 de
479 unidades no horizontal; 27,1 de 629 no vertical):

| Lockup | Ilegível | Limítrofe | Legível | Confortável | **Mínimo recomendado** |
|---|---|---|---|---|---|
| Horizontal | ≤ 140 px | 180 px | 220 px | ≥ 280 px | **240 px de largura** |
| Vertical | ≤ 110 px | 150 px | 190 px | ≥ 240 px | **180 px de largura** |

Abaixo desses valores, use o `symbol.svg` em vez do lockup completo.

### 7.2 Área de respiro (exclusion zone)

**O manual não define área de respiro nem tamanho mínimo.** A regra abaixo é uma
**recomendação** derivada da geometria medida, para uso até que o designer especifique:

> Módulo = diâmetro de um ponto colorido (28,4 unidades no horizontal, 29,0 no vertical).
> Manter, em todos os lados, um respiro livre de **2 módulos** — cerca de **4,1 % da largura**
> no lockup horizontal e **6,9 %** no vertical. Na prática, um lockup horizontal exibido a
> 300 px pede ≈ 12 px livres em volta.

### 7.3 Qual versão usar em cada fundo

| Fundo | Versão | Contraste medido |
|---|---|---|
| Branco / claro (`#FFF`, `#CEE4EA`) | `logo-*-color` | logotipo `#4D576B` sobre branco = **7,26:1**; traço `#2B4BA9` = **7,83:1** |
| Cobalto `#2B4BA9`, escuro, foto escura | `logo-*-white` | branco sobre cobalto = **7,83:1** |
| Impressão 1 cor, documentos, fundo claro | `logo-*-negative` | `#000000` sobre branco = **21:1** |
| Fundo escuro com necessidade de monocromia | *(indisponível)* | ver §8 |

Notas:

- As formas de apoio `#CEE4EA` / `#D0DEED` têm contraste de apenas **1,32:1** sobre branco.
  São elementos decorativos da marca; a legibilidade se apoia no traço cobalto e no
  logotipo. Não usar essas cores para texto.
- A assinatura cinza `#7C7C7C` tem **4,17:1** sobre branco — abaixo de 4,5:1. Como faz parte
  da imagem da marca, logotipos são isentos do critério WCAG 1.4.3, mas isso reforça o
  tamanho mínimo da §7.1.
- Os arquivos `*-negative.png` são **100 % pretos**: nunca aplicá-los sobre fundo escuro.
- Sobre fotografia, prefira `logo-*-white` com um leve escurecimento do fundo.

---

## 8. Pendências e limitações

1. **Fotografia profissional autorizada e integrada.** O arquivo recebido foi preservado em
  `public/felipe-carvalho-original.png` (640 × 641 px). O hero usa o derivado
  `public/felipe-carvalho-professional.jpg` (512 × 640 px, 40.896 B), produzido por recorte
  central sem upscale. O derivado não pertence ao pacote de marca de `public/brand/` e não
  altera as medições das seções anteriores. Banco de imagens, rosto fictício e imagem gerada
  continuam proibidos.

2. **Versão negativa não disponível em vetor.** Como demonstrado na §3.5, o negativo é arte
   distinta (traço vazado), inexistente no SVG mestre e no PDF. Foi entregue como PNG
   otimizado sem perdas. *Solicitar ao designer o negativo em SVG/AI.*

3. **PNGs negativos em resolução muito alta.** 5501 × 1916 e 3369 × 2515 px. Foram mantidos
   nas dimensões originais porque o pedido veda upscale e alteração de proporção, e porque
   reamostrar seria uma decisão de qualidade irreversível. Mesmo comprimidos (≈ 110 KB), eles
   ocupam 40,2 MB e 32,3 MB de memória ao decodificar no navegador. **Exiba-os sempre em
   tamanho CSS muito menor**, ou peça ao designer versões em resolução de tela.

4. **Não existe versão monocromática branca "chapada".** A versão "Branco" mantém as formas
   de apoio em azul-claro e os seis pontos coloridos — não é branco puro. Para contextos que
   exijam uma única cor sobre fundo escuro (gravação, bordado, marca d'água), falta o ativo.
   *Solicitar ao designer.*

5. **Favicon ilegível nos tamanhos clássicos.** A 16 e 32 px o traço fica com 0,33 e 0,66 px
   e desaparece (§7.1). O `favicon.ico` foi gerado assim mesmo para compatibilidade, mas o
   ideal é uma **versão simplificada do símbolo** desenhada pelo designer para ícones
   pequenos. Não foi criada aqui porque exigiria redesenhar a marca.

6. **`apple-touch-icon.png` tem fundo transparente.** O iOS compõe esse ícone sobre preto,
   o que prejudica o traço cobalto. Definir uma cor de fundo seria decisão de design, então
   não foi feito. *Solicitar ao designer a cor de fundo do ícone de app* (a recomendação
   natural seria branco ou `#2B4BA9` com o símbolo branco).

7. **Imagem Open Graph não foi produzida.** Uma OG exige composição 1200 × 630 com fundo,
   enquadramento e eventualmente texto — decisões de design fora do escopo de empacotamento.
   Redes sociais não aceitam SVG. *Necessário: uma OG desenhada, ou autorização explícita
   para compor uma simples (lockup horizontal centralizado sobre fundo branco).*

8. **Arquivo-fonte original não disponibilizado.** Não há `.ai` editável. O SVG mestre é uma
   exportação com o logotipo já vetorizado, o que impede qualquer ajuste tipográfico. Para
   novas variações, *solicitar o `.ai` original*.

9. **Sem especificação oficial de respiro, tamanho mínimo e uso indevido.** O manual tem
   apenas conceito, paleta e apresentações. As regras da §7 são recomendações derivadas de
   medição, não normas do designer.

10. **Seis pontos e cinza `#7C7C7C` sem documentação oficial** — ver §4.1.

11. **Ambiguidade no nome "Negativo".** Em português, "versão negativa" costuma designar a
    versão para fundos escuros, mas os arquivos assim nomeados são 100 % pretos e só
    funcionam sobre fundos claros. Os nomes de arquivo entregues seguem a nomenclatura do
    designer; *vale confirmar a intenção com ele* para evitar aplicação errada.

---

## 9. Arquivos `.ps` não processados

`00000034-Logo_FelipeCarvalho_Final.ps` e `00000035-Logo_FelipeCarvalho_Final.ps` —
221.885.130 bytes cada (211,6 MiB; ≈ 423 MB somados) — **não foram processados**. Motivos:

- **São duplicatas exatas.** SHA-256 idêntico nos dois:
  `E76FA5B6035DE59FFA9BAF05A6B62374264DBCD50A412B5FE24BDF5EF5E14ECB`.
- **Não contêm nada de novo.** O cabeçalho identifica `%!PS-Adobe-3.1 EPSF-3.0`, gerado pelo
  `Adobe Illustrator(R) 30.0` — a mesma versão que gerou o SVG mestre — com
  `%%HiResBoundingBox: 0 0 3928.1058 4436.4087`. É a mesma arte, empacotada como EPS com
  fluxo privado AI embutido.
- **O SVG já resolveu o problema.** A arte vetorial foi extraída do SVG com fidelidade
  verificada de 99,1 %–99,4 % (§3.3). Não havia ganho em processar o EPS.
- Extrair vetores do EPS exigiria Ghostscript e conversão intermediária, com risco de perda
  de precisão maior do que a rota já validada.

---

## 10. Reprodutibilidade

- **Origem:** exportações do designer recebidas por WhatsApp (prefixos numéricos nos nomes).
- **Ferramentas:** Node.js 24.12.0, `svgo` (otimização SVG) e `sharp` (rasterização,
  verificação por pixel e recodificação PNG sem perdas), instaladas fora do projeto.
- **Nenhuma dependência foi adicionada ao projeto**; `package.json` não foi tocado.
- **Escopo de escrita:** apenas `public/brand/` e este documento.
- Bounding boxes foram calculados com resolução analítica dos extremos de curvas de Bézier
  (não por amostragem), garantindo `viewBox` justo e correto.
