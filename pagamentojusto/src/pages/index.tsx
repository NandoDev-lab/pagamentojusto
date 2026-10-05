import Link from "next/link";
import Seo from "../components/seo";
import { siteUrl } from "../lib/seo";
import Navbar from "../components/navbar";
import styles from "../styles/home.module.css";

const destinations = [
  {
    href: "/calculadoras",
    number: "01",
    title: "Calculadoras",
    description: "Faça contas de salário e entenda melhor o valor do seu trabalho.",
    action: "Acessar calculadoras",
  },
  {
    href: "/sindicatos",
    number: "02",
    title: "Sindicatos e convenções",
    description: "Em breve, informações para ajudar você a conhecer seus direitos.",
    action: "Explorar conteúdos",
  },
  {
    href: "/noticias",
    number: "03",
    title: "Notícias",
    description: "Acompanhe novidades sobre trabalho, renda e direitos.",
    action: "Ver novidades",
  },
];

export default function Home() {
  return (
    <>
      {/* Dados estruturados descrevem o site para mecanismos de busca. */}
      <Seo
        title="Pagamento Justo | Calcule seu salário e conheça seus direitos"
        description="Calcule o valor da sua hora de trabalho e encontre informações claras sobre remuneração e direitos trabalhistas."
        path="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Pagamento Justo",
          url: `${siteUrl}/`,
          inLanguage: "pt-BR",
          description:
            "Ferramentas e informações acessíveis sobre remuneração e direitos trabalhistas.",
        }}
      />
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              Informação que valoriza o seu trabalho
            </p>
            <h1 className={styles.title}>
              Entenda seus números.
              <span> Conheça seus direitos.</span>
            </h1>
            <p className={styles.description}>
              Ferramentas simples para você calcular, se informar e tomar
              decisões com mais confiança sobre sua vida profissional.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="/calculadoras">
                Explorar calculadoras <span aria-hidden="true">→</span>
              </Link>
              <a className={styles.textAction} href="#explorar">
                Conhecer o projeto
              </a>
            </div>
            <div className={styles.trustNote}>
              <span className={styles.checkmark} aria-hidden="true">✓</span>
              Conteúdo acessível, direto ao ponto e feito para você
            </div>
          </div>
          <div className={styles.visual} aria-hidden="true">
            <div className={styles.orbit} />
            <div className={styles.visualCard}>
              <div className={styles.visualCardTop}>
                <span className={styles.visualIcon}>R$</span>
                <span className={styles.visualLabel}>SEU TRABALHO, SEU VALOR</span>
              </div>
              <div className={styles.visualLine} />
              <div className={styles.visualLineShort} />
              <div className={styles.visualValue}>Mais clareza<span>.</span></div>
              <div className={styles.visualFooter}>
                <span className={styles.visualDot} />
                Informação para decidir melhor
              </div>
            </div>
            <div className={styles.floatingNote}>
              <span className={styles.floatingIcon}>↗</span>
              <span><strong>Valorize</strong><br />seu conhecimento</span>
            </div>
          </div>
          <div className={styles.heroAccent} />
        </section>

        {/* Apresenta as principais áreas em cartões navegáveis. */}
        <section className={styles.destinations} id="explorar">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>Comece por aqui</p>
              <h2 className={styles.sectionTitle}>O que você precisa hoje?</h2>
            </div>
            <p className={styles.sectionDescription}>
              Escolha um caminho e encontre informações úteis para sua rotina.
            </p>
          </div>
          <div className={styles.cardGrid}>
            {destinations.map((destination) => (
              <Link
                className={styles.destinationCard}
                href={destination.href}
                key={destination.href}
              >
                <span className={styles.cardNumber}>{destination.number}</span>
                <h3>{destination.title}</h3>
                <p>{destination.description}</p>
                <span className={styles.cardAction}>
                  {destination.action} <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.closingNote}>
          <div className={styles.closingMark} aria-hidden="true">“</div>
          <p>
            Informação clara é o primeiro passo para reconhecer o valor do seu
            trabalho.
          </p>
          <Link href="/apoie">Saiba mais sobre o projeto <span aria-hidden="true">→</span></Link>
        </section>
      </main>
    </>
  );
}
