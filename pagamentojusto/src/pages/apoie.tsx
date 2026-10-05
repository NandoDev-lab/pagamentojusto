import Link from "next/link";
import Seo from "../components/seo";
import Navbar from "../components/navbar";
import styles from "../styles/conteudo.module.css";

// Apresenta formas de apoio sem prometer opções que ainda não foram implementadas.
export default function Apoie() {
  return (
    <>
      <Seo
        title="Apoie o Pagamento Justo"
        description="Conheça o projeto Pagamento Justo e ajude a compartilhar informações acessíveis sobre remuneração e direitos trabalhistas."
        path="/apoie/"
        indexable={false}
      />
      <Navbar />
      <main className={styles.page}>
        <p className={styles.eyebrow}>Construído para compartilhar</p>
        <h1 className={styles.title}>Apoie o Pagamento Justo</h1>
        <p className={styles.description}>
          O projeto busca tornar informações sobre remuneração e direitos
          trabalhistas mais fáceis de entender e acessar.
        </p>
        <section className={styles.panel} aria-labelledby="apoie-status">
          <div className={styles.panelIcon} aria-hidden="true">♡</div>
          <div>
            <h2 id="apoie-status">Ajude compartilhando</h2>
            <p>
              Ainda estamos preparando formas de apoio. Por enquanto, você pode
              contribuir compartilhando o projeto com alguém que possa se
              beneficiar destas ferramentas.
            </p>
            <Link className={styles.link} href="/calculadoras">
              Conhecer as ferramentas <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
