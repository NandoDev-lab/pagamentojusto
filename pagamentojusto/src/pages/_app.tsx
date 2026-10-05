import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pagamento Justo | Informação que valoriza seu trabalho</title>
        <meta
          name="description"
          content="Ferramentas simples para calcular, se informar e conhecer melhor seus direitos no trabalho."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
