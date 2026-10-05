import { type FormEvent, useState } from "react";
import styles from "../../../styles/formulario.module.css";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function Valor_hora() {
  const [salario, setSalario] = useState("");
  const [horas, setHoras] = useState("");
  const [horasPersonalizadas, setHorasPersonalizadas] = useState("");
  const [valorHora, setValorHora] = useState<number | null>(null);

  function calcular(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const salarioInformado = Number(salario);
    const horasInformadas = Number(
      horas === "custom" ? horasPersonalizadas : horas,
    );
    setValorHora(salarioInformado / horasInformadas);
  }

  return (
    <form className={styles.form} onSubmit={calcular}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="salario">
          Salário mensal bruto
        </label>
        <input
          className={styles.input}
          id="salario"
          name="salario"
          type="number"
          inputMode="decimal"
          min="0.01"
          step="0.01"
          placeholder="Ex.: 2500"
          value={salario}
          onChange={(event) => {
            setSalario(event.target.value);
            setValorHora(null);
          }}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="horas">
          Horas trabalhadas por mês
        </label>
        <select
          className={styles.select}
          id="horas"
          name="horas"
          value={horas}
          onChange={(event) => {
            setHoras(event.target.value);
            setValorHora(null);
          }}
          required
        >
          <option value="" disabled>Selecione sua jornada</option>
          <option value="220">44 horas semanais (220 horas mensais)</option>
          <option value="200">40 horas semanais (200 horas mensais)</option>
          <option value="custom">Informar outra carga horária</option>
        </select>
      </div>

      {horas === "custom" && (
        <div className={styles.field}>
          <label className={styles.label} htmlFor="horas-personalizadas">
            Informe o total de horas no mês
          </label>
          <input
            className={styles.input}
            id="horas-personalizadas"
            name="horas-personalizadas"
            type="number"
            inputMode="decimal"
            min="1"
            step="0.1"
            placeholder="Ex.: 180"
            value={horasPersonalizadas}
            onChange={(event) => {
              setHorasPersonalizadas(event.target.value);
              setValorHora(null);
            }}
            required
          />
          <p className={styles.hint}>
            Preencha com a carga horária prevista para o seu contrato.
          </p>
        </div>
      )}

      <p className={styles.hint}>
        O resultado é uma estimativa bruta (salário dividido pelas horas do
        mês). Confira sua jornada e convenção coletiva.
      </p>
      <button className={styles.button} type="submit">
        Calcular valor por hora
      </button>

      {valorHora !== null && (
        <div className={styles.result} aria-live="polite">
          <p className={styles.resultLabel}>Valor bruto estimado por hora</p>
          <p className={styles.resultValue}>{currency.format(valorHora)}</p>
          <p className={styles.resultHint}>
            Cálculo: {currency.format(Number(salario))} ÷{" "}
            {horas === "custom" ? horasPersonalizadas : horas} horas mensais.
          </p>
        </div>
      )}
    </form>
  );
}
