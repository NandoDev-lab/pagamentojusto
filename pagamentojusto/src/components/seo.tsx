import Head from "next/head";
import { canonicalUrl } from "../lib/seo";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  indexable?: boolean;
  structuredData?: Record<string, string>;
};

export default function Seo({
  title,
  description,
  path,
  indexable = true,
  structuredData,
}: SeoProps) {
  const url = canonicalUrl(path);
  const jsonLd = structuredData
    ? JSON.stringify(structuredData).replace(/</g, "\\u003c")
    : undefined;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={indexable ? "index, follow, max-image-preview:large" : "noindex, follow"}
      />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Pagamento Justo" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {jsonLd && (
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
    </Head>
  );
}
