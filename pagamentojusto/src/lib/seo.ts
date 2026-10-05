export const siteUrl = "https://nandodev-lab.github.io/pagamentojusto";

export function canonicalUrl(path: string) {
  // Padroniza as URLs para evitar canônicas duplicadas com barras diferentes.
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`;
  return `${siteUrl}${normalizedPath}`;
}
