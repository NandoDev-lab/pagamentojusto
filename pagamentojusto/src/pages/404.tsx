import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/navbar";
import styles from "../styles/conteudo.module.css";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Página não encontrada | Pagamento Justo</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Navbar />
      <main className={styles.page}>
        <p className={styles.eyebrow}>Erro 404</p>
        <h1 className={styles.title}>Não encontramos esta página</h1>
        <p className={styles.description}>
          O endereço pode ter mudado ou não estar disponível. Você pode voltar
          ao início ou acessar nossas ferramentas.
        </p>
        <section className={styles.panel}>
          <div className={styles.panelIcon} aria-hidden="true">?</div>
          <div>
            <h2>Vamos encontrar outro caminho?</h2>
            <p>
              Consulte a calculadora de valor por hora ou volte para a página
              inicial do Pagamento Justo.
            </p>
            <Link className={styles.link} href="/">
              Voltar ao início <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
