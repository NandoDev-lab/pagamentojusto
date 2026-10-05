import Seo from "../components/seo";
import Navbar from "../components/navbar";
import Valor_hora from "../components/formularios/form_valorHora";
import styles from "../styles/calculadoras.module.css";

const upcomingCalculators = [
  "Adicional noturno",
  "Férias proporcionais",
  "Insalubridade",
  "Periculosidade",
  "13º salário",
  "Rescisão",
];

export default function Calculadora() {
  return (
    <>
      <Seo
        title="Calculadora de salário e valor da hora | Pagamento Justo"
        description="Calcule o valor bruto estimado da sua hora de trabalho a partir do salário mensal e da carga horária."
        path="/calculadoras/"
      />
      <Navbar />
      <main className={styles.page}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Ferramentas práticas</p>
          <h1 className={styles.title}>Calculadoras</h1>
          <p className={styles.description}>
            Faça uma estimativa rápida e entenda melhor como o seu salário se
            relaciona com as horas trabalhadas.
          </p>
        </header>

        <div className={styles.layout}>
          <aside className={styles.menu} aria-label="Calculadoras disponíveis">
            <h2 className={styles.menuTitle}>Suas ferramentas</h2>
            <p className={styles.menuHint}>
              Mais ferramentas serão adicionadas em breve.
            </p>
            <ul className={styles.menuList}>
              <li>
                <span className={`${styles.menuItem} ${styles.menuItemActive}`}>
                  Valor da hora
                </span>
              </li>
              {/* Indica funcionalidades planejadas sem apresentá-las como disponíveis. */}
              {upcomingCalculators.map((name) => (
                <li key={name}>
                  <span className={styles.menuItem}>
                    {name}
                    <span className={styles.comingSoon}>EM BREVE</span>
                  </span>
                </li>
              ))}
            </ul>
          </aside>

          <section className={styles.formCard} aria-labelledby="valor-hora-title">
            <h2 className={styles.formHeading} id="valor-hora-title">
              Quanto vale sua hora?
            </h2>
            <p className={styles.formDescription}>
              Informe seu salário mensal e a carga horária para calcular uma
              estimativa do valor bruto por hora.
            </p>
            <Valor_hora />
          </section>
        </div>
      </main>
    </>
  );
}
