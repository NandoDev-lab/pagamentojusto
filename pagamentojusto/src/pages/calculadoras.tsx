import { useState } from "react";
import Seo from "../components/seo";
import Navbar from "../components/navbar";
import Valor_hora from "../components/formularios/form_valorHora";
import CalculadoraTrabalhista, {
  calculadorasTrabalhistas,
  type CalculadoraTrabalhistaId,
} from "../components/formularios/calculadoras-trabalhistas";
import styles from "../styles/calculadoras.module.css";

type CalculatorSelection = "valor-hora" | CalculadoraTrabalhistaId;

export default function Calculadora() {
  const [selectedCalculator, setSelectedCalculator] =
    useState<CalculatorSelection>("valor-hora");
  const selectedAdditionalCalculator = calculadorasTrabalhistas.find(
    (calculator) => calculator.id === selectedCalculator,
  );

  return (
    <>
      <Seo
        title="Calculadoras trabalhistas | Pagamento Justo"
        description="Faça estimativas de valor da hora, adicionais, férias, 13º salário e verbas rescisórias."
        path="/calculadoras/"
      />
      <Navbar />
      <main className={styles.page}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Ferramentas práticas</p>
          <h1 className={styles.title}>Calculadoras</h1>
          <p className={styles.description}>
            Faça estimativas de valores relacionados ao seu trabalho e entenda
            melhor a composição da sua remuneração.
          </p>
        </header>

        <div className={styles.layout}>
          <aside className={styles.menu} aria-label="Calculadoras disponíveis">
            <h2 className={styles.menuTitle}>Suas ferramentas</h2>
            <p className={styles.menuHint}>
              Selecione uma calculadora para começar.
            </p>
            <ul className={styles.menuList}>
              <li>
                <button
                  className={`${styles.menuItem} ${selectedCalculator === "valor-hora" ? styles.menuItemActive : ""}`}
                  type="button"
                  aria-pressed={selectedCalculator === "valor-hora"}
                  onClick={() => setSelectedCalculator("valor-hora")}
                >
                  Valor da hora
                </button>
              </li>
              {calculadorasTrabalhistas.map((calculator) => (
                <li key={calculator.id}>
                  <button
                    className={`${styles.menuItem} ${selectedCalculator === calculator.id ? styles.menuItemActive : ""}`}
                    type="button"
                    aria-pressed={selectedCalculator === calculator.id}
                    onClick={() => setSelectedCalculator(calculator.id)}
                  >
                    {calculator.name}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <section
            className={styles.formCard}
            aria-labelledby="calculator-title"
          >
            {selectedCalculator === "valor-hora" ? (
              <>
                <h2 className={styles.formHeading} id="calculator-title">
                  Quanto vale sua hora?
                </h2>
                <p className={styles.formDescription}>
                  Informe seu salário mensal e a carga horária para calcular
                  uma estimativa do valor bruto por hora.
                </p>
                <Valor_hora />
              </>
            ) : selectedAdditionalCalculator ? (
              <>
                <h2 className={styles.formHeading} id="calculator-title">
                  {selectedAdditionalCalculator.title}
                </h2>
                <p className={styles.formDescription}>
                  {selectedAdditionalCalculator.description}
                </p>
                <CalculadoraTrabalhista
                  calculatorId={selectedAdditionalCalculator.id}
                />
              </>
            ) : null}
          </section>
        </div>
      </main>
    </>
  );
}
