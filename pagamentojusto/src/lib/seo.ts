export const siteUrl = "https://nandodev-lab.github.io/pagamentojusto";

export function canonicalUrl(path: string) {
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`;
  return `${siteUrl}${normalizedPath}`;
}
