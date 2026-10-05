import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <>
      <Head>
        <link
          rel="icon"
          href={`${publicBasePath}/favicon.svg`}
          type="image/svg+xml"
        />
        <meta name="theme-color" content="#f7f9f7" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
