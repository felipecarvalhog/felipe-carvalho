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

1. No repositório, crie a variável Actions `NEXT_PUBLIC_WAITLIST_ENDPOINT` com a URL HTTPS da Worker terminada em `/waitlist`.
2. Em **Settings > Pages**, escolha **GitHub Actions** como fonte.
3. Verifique `hudilabs.com` na organização/conta GitHub.
4. No DNS, crie o CNAME `psicologogay` apontando para o host Pages da conta, como `usuario-ou-org.github.io`.
5. Execute o workflow `Deploy GitHub Pages` e habilite **Enforce HTTPS** quando o certificado estiver pronto.

O workflow interrompe o build se a URL da Worker não estiver configurada e publica exclusivamente `out/`. O artefato não contém `/api` nem `/onboarding`.

## 4. Rotação e recuperação

Para rotacionar a credencial Google, crie uma nova chave, atualize `GOOGLE_PRIVATE_KEY`, valide um envio e revogue a chave anterior. Para interromper a coleta, remova o acesso da service account à planilha ou faça rollback da Worker no painel Cloudflare. Nunca registre payloads, tokens ou dados pessoais nos logs.
