# Handoff — Felipe Carvalho / Hudi Pages

## Estado

A nomenclatura Hudi Pages/Hudi Labs está aplicada no código, conteúdo, configuração e documentação. O contrato central usa `projectConfig.hudiPages`.

A fotografia autorizada está integrada ao hero:

- original preservado: `public/felipe-carvalho-original.png` (640 × 641 px);
- derivado publicado: `public/felipe-carvalho-professional.jpg` (512 × 640 px);
- recorte central, sem upscale;
- `alt`: `Felipe Carvalho, psicólogo`.

## Guardrails mantidos

- `hudiPages.caseStudyConsent: false`;
- `brand.progressPrideReferenceApproved: false`;
- `privacy.sensitiveFieldsEnabled: false`;
- contatos públicos permanecem indefinidos;
- crédito sem URL externa;
- waitlist continua em adapter mock até existir destino real;
- nenhuma métrica, promessa, preço ou depoimento foi publicado.

## Operação

Abra como workspace a raiz final:

`C:\Users\atene.adm\Downloads\felipe-carvalho-hudi-pages`

```powershell
npm ci
npm run dev
```

Servidor local: `http://localhost:3210`.

Validação completa:

```powershell
npm run lint
npm run typecheck
npm run test
npm run build
```

Os resultados finais e o QA visual ficam em `FINAL-REPORT.md` e `docs/QA.md`.

O pacote foi validado nessa raiz com lint, typecheck, 88 testes, build de 10 páginas e smoke Playwright de produção. O `.env.local` da raiz anterior não foi copiado.

## Pendências de publicação

- Configurar destino real e seguro para a lista de espera.
- Definir URL canônica/domínio e responsabilidades de hospedagem.
- Confirmar URL oficial do Hudi Pages/Hudi Labs antes de tornar o crédito clicável.
- Obter consentimento separado antes de divulgar o projeto como case.
- Manter separado o consentimento para uso externo de imagem, marca, métricas ou depoimento.
