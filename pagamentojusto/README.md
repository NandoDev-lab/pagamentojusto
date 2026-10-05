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

## SEO

As páginas públicas usam títulos, descrições, URLs canônicas e metadados para
compartilhamento. O atributo de idioma do documento é `pt-BR`; o sitemap e as
regras para rastreadores ficam em `public/sitemap.xml` e `public/robots.txt`.
Páginas que ainda estão em preparação usam `noindex` e não aparecem no sitemap.

Depois da publicação, o sitemap pode ser enviado ao Google Search Console:
`https://nandodev-lab.github.io/pagamentojusto/sitemap.xml`.
