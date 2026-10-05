import Link from "next/link";
import Seo from "../components/seo";
import Navbar from "../components/navbar";
import styles from "../styles/conteudo.module.css";

export default function Sindicatos() {
  return (
    <>
      <Seo
        title="Sindicatos e convenções coletivas | Pagamento Justo"
        description="Entenda a importância das convenções coletivas e encontre orientações sobre direitos da sua categoria."
        path="/sindicatos/"
        indexable={false}
      />
      <Navbar />
      <main className={styles.page}>
        <p className={styles.eyebrow}>Seus direitos, sem complicação</p>
        <h1 className={styles.title}>Sindicatos e convenções</h1>
        <p className={styles.description}>
          Convenções coletivas podem definir condições específicas para cada
          categoria. Conhecer esses acordos é parte importante de entender os
          seus direitos.
        </p>
        <section className={styles.panel} aria-labelledby="sindicatos-status">
          <div className={styles.panelIcon} aria-hidden="true">＋</div>
          <div>
            <h2 id="sindicatos-status">Estamos organizando este conteúdo</h2>
            <p>
              Esta área está em preparação. Quando estiver disponível, reunirá
              orientações para ajudar você a encontrar informações da sua
              categoria e região.
            </p>
            <Link className={styles.link} href="/calculadoras">
              Acessar calculadoras <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
