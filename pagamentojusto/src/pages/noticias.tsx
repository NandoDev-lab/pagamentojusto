import Link from "next/link";
import Navbar from "./component/navbar";
import styles from "../styles/conteudo.module.css";

export default function Noticias() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <p className={styles.eyebrow}>Informação para o dia a dia</p>
        <h1 className={styles.title}>Notícias e novidades</h1>
        <p className={styles.description}>
          Um espaço para acompanhar assuntos sobre trabalho, renda e direitos
          de um jeito claro e acessível.
        </p>
        <section className={styles.panel} aria-labelledby="noticias-status">
          <div className={styles.panelIcon} aria-hidden="true">✦</div>
          <div>
            <h2 id="noticias-status">Estamos preparando esta área</h2>
            <p>
              Em breve, você encontrará aqui conteúdos selecionados para
              ajudar a entender as mudanças e os temas que impactam sua vida
              profissional.
            </p>
            <Link className={styles.link} href="/calculadoras">
              Enquanto isso, explore as calculadoras <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
