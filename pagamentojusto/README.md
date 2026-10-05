# Pagamento Justo

Aplicação Next.js exportada como site estático e publicada no GitHub Pages.

## Desenvolvimento local

```bash
cd pagamentojusto
npm ci
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Publicação no GitHub Pages

O workflow em `.github/workflows/deploy.yml` compila o projeto e publica a pasta
`pagamentojusto/out` automaticamente ao enviar alterações para a branch `main`.
Também é possível iniciar a publicação manualmente pela aba **Actions**.

Em **Settings > Pages**, selecione **GitHub Actions** como fonte de publicação.
Como este repositório publica em um endereço de projeto, a configuração aplica
o caminho-base `/pagamentojusto` durante o build do GitHub Actions.

O GitHub Pages hospeda apenas arquivos estáticos. Por isso, rotas de API do
Next.js não fazem parte desta publicação.
