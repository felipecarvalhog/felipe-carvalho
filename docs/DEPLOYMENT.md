# Publicação: GitHub Pages, Cloudflare Worker e Google Sheets

## 1. Google Sheets

1. Crie uma planilha privada e uma aba chamada `Waitlist`.
2. Na primeira linha, use as colunas: `id`, `receivedAt`, `fullName`, `email`, `phone`, `contactPreference`, `availability`, `referral`, `consentAt`, `source`.
3. Em um projeto Google Cloud dedicado, habilite somente a Google Sheets API e crie uma service account.
4. Compartilhe a planilha como editora somente com o e-mail da service account.

## 2. Cloudflare Worker

Crie o namespace KV e substitua `REPLACE_WITH_KV_NAMESPACE_ID` em `wrangler.jsonc` pelo ID retornado:

```powershell
npx wrangler kv namespace create WAITLIST_KV
```

Cadastre os segredos sem colocá-los em arquivos ou no GitHub:

```powershell
npx wrangler secret put GOOGLE_SERVICE_ACCOUNT_EMAIL
npx wrangler secret put GOOGLE_PRIVATE_KEY
npx wrangler secret put GOOGLE_SHEET_ID
npx wrangler secret put DEDUPE_SALT
```

A chave privada deve ser o PEM completo da service account. Use um `DEDUPE_SALT` aleatório e longo. Confirme `GOOGLE_SHEET_RANGE` em `wrangler.jsonc` e publique:

```powershell
npm run worker:deploy
```

Depois, teste `OPTIONS /waitlist`, uma origem recusada e um envio piloto autorizado. O envio só é bem-sucedido quando a Sheets API confirma o append.

## 3. GitHub Pages

### Revisão pública atual

1. Em **Settings > Pages**, escolha **GitHub Actions** como fonte.
2. Verifique `hudilabs.com` na organização/conta GitHub.
3. No DNS, crie o CNAME `psicologogay` apontando para o host Pages da conta, como `usuario-ou-org.github.io`.
4. Execute o workflow `Deploy GitHub Pages` e habilite **Enforce HTTPS** quando o certificado estiver pronto.

O workflow atual usa `NEXT_PUBLIC_REVIEW_MODE=true`, mantém a lista fechada e
publica `robots.txt`, sitemap e metadados sem indexação. Ele não exige uma URL
da Worker porque nenhum formulário é renderizado.

### Passagem para produção

1. Conclua a revisão editorial, ética e jurídica registrada no README.
2. Configure e teste Google Sheets, service account, KV e Cloudflare Worker.
3. No repositório, crie a variável Actions `NEXT_PUBLIC_WAITLIST_ENDPOINT` com a URL HTTPS da Worker terminada em `/waitlist`.
4. Em `src/config/project.config.ts`, mude `availabilityStatus` de `waitlist-closed` para `limited` ou `open`.
5. Em `.github/workflows/deploy-pages.yml`, restaure a validação obrigatória de `NEXT_PUBLIC_WAITLIST_ENDPOINT`, passe a variável para a build e defina `NEXT_PUBLIC_REVIEW_MODE=false`.
6. Execute lint, typecheck, testes, build e um envio piloto antes do novo deploy.

O workflow publica exclusivamente `out/`. O artefato não contém `/api` nem `/onboarding`.

## 4. Rotação e recuperação

Para rotacionar a credencial Google, crie uma nova chave, atualize `GOOGLE_PRIVATE_KEY`, valide um envio e revogue a chave anterior. Para interromper a coleta, remova o acesso da service account à planilha ou faça rollback da Worker no painel Cloudflare. Nunca registre payloads, tokens ou dados pessoais nos logs.
