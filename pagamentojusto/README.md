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

## Diretório de sindicatos

O diretório usa arquivos JSON estáticos em `public/data/sindicatos/`, um por
UF. Eles combinam os nomes e sites da lista de sindicatos com município,
endereço, UF e categoria do Cadastro Nacional de Entidades Sindicais do
Ministério do Trabalho e Emprego, com base de 14/04/2025. Os 17.373 registros
foram correspondidos pelo nome e ordem das linhas das duas planilhas; 17.370
possuem UF e três registros sem UF ficam fora das listas estaduais. Sites que
não constavam da lista são omitidos do diretório. Para reduzir o volume
transferido e manter a página compacta, cada arquivo estadual contém somente
os dez primeiros registros da base que têm um site oficial cadastrado; quando
há menos de dez sites para um estado, são exibidos apenas os disponíveis. A
breve descrição de atuação é derivada da categoria registrada e limitada a
220 caracteres.

Como o site é estático, cada estado é carregado diretamente do arquivo JSON
correspondente. Ao atualizar as fontes, regenere os arquivos estaduais e
confira a correspondência dos nomes, UFs e sites antes de publicar; mantenha
apenas os dez primeiros sindicatos com site por estado.

## SEO

As páginas públicas usam títulos, descrições, URLs canônicas e metadados para
compartilhamento. O atributo de idioma do documento é `pt-BR`; o sitemap e as
regras para rastreadores ficam em `public/sitemap.xml` e `public/robots.txt`.
Páginas que ainda estão em preparação usam `noindex` e não aparecem no sitemap.

Depois da publicação, o sitemap pode ser enviado ao Google Search Console:
`https://nandodev-lab.github.io/pagamentojusto/sitemap.xml`.
