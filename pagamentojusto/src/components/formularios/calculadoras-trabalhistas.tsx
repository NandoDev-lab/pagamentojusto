import { type FormEvent, useState } from "react";
import styles from "../../styles/formulario.module.css";

export const calculadorasTrabalhistas = [
  {
    id: "adicional-noturno",
    name: "Adicional noturno",
    title: "Estime seu adicional noturno",
    description:
      "Informe o salário e as horas efetivamente trabalhadas no período noturno urbano (das 22h às 5h).",
  },
  {
    id: "ferias-proporcionais",
    name: "Férias proporcionais",
    title: "Calcule férias proporcionais",
    description:
      "Estime o valor bruto das férias proporcionais com o adicional constitucional de um terço.",
  },
  {
    id: "insalubridade",
    name: "Insalubridade",
    title: "Estime o adicional de insalubridade",
    description:
      "Informe a base de cálculo definida para o seu caso e o grau de insalubridade reconhecido.",
  },
  {
    id: "periculosidade",
    name: "Periculosidade",
    title: "Estime o adicional de periculosidade",
    description:
      "Calcule uma estimativa do adicional de 30% sobre a base salarial informada.",
  },
  {
    id: "decimo-terceiro",
    name: "13º salário",
    title: "Calcule o 13º salário proporcional",
    description:
      "Informe o salário bruto e os meses elegíveis no ano para estimar o valor proporcional.",
  },
  {
    id: "rescisao",
    name: "Rescisão",
    title: "Estime verbas de rescisão",
    description:
      "Faça uma estimativa bruta de algumas verbas rescisórias. O cálculo não substitui um termo de rescisão.",
  },
] as const;

export type CalculadoraTrabalhistaId =
  (typeof calculadorasTrabalhistas)[number]["id"];

type Estimate = {
  label: string;
  total: number;
  details: Array<{ label: string; value: number }>;
  note: string;
};

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
};

function NumberField({
  id,
  label,
  value,
  onChange,
  min = 0.01,
  max,
  step = 0.01,
  hint,
}: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <input
        className={styles.input}
        id={id}
        name={id}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
      />
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <select
        className={styles.select}
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
      >
        <option value="" disabled>Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export default function CalculadoraTrabalhista({
  calculatorId,
}: {
  calculatorId: CalculadoraTrabalhistaId;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [error, setError] = useState("");

  const update = (field: string, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setEstimate(null);
    setError("");
  };

  const number = (field: string) => Number(values[field]);

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    let result: Estimate;
    switch (calculatorId) {
      case "adicional-noturno": {
        const salary = number("salary");
        const monthlyHours = number("monthly-hours");
        const nightHours = number("night-hours");
        if (![salary, monthlyHours, nightHours].every(Number.isFinite) || monthlyHours <= 0) {
          setError("Confira os valores informados para calcular a estimativa.");
          return;
        }
        const amount = (salary / monthlyHours) * nightHours * (60 / 52.5) * 0.2;
        result = {
          label: "Adicional noturno bruto estimado no mês",
          total: amount,
          details: [{ label: "Adicional estimado", value: amount }],
          note: "Estimativa pelo adicional mínimo urbano de 20% e hora noturna reduzida (52min30s). Não inclui reflexos, horas extras ou regras mais favoráveis.",
        };
        break;
      }
      case "ferias-proporcionais": {
        const salary = number("salary");
        const months = number("months");
        if (![salary, months].every(Number.isFinite) || months < 1 || months > 12) {
          setError("Informe valores válidos; os meses devem estar entre 1 e 12.");
          return;
        }
        const vacation = (salary * months) / 12;
        const third = vacation / 3;
        result = {
          label: "Férias proporcionais brutas estimadas",
          total: vacation + third,
          details: [
            { label: "Férias proporcionais", value: vacation },
            { label: "Adicional de 1/3", value: third },
          ],
          note: "Considera apenas férias proporcionais e o adicional de um terço. Não inclui férias vencidas, descontos ou situações específicas de rescisão.",
        };
        break;
      }
      case "insalubridade": {
        const base = number("base");
        const rate = number("rate");
        if (
          ![base, rate].every(Number.isFinite)
          || base <= 0
          || ![10, 20, 40].includes(rate)
        ) {
          setError("Confira a base e o grau de insalubridade selecionados.");
          return;
        }
        const amount = (base * rate) / 100;
        result = {
          label: "Adicional mensal bruto estimado",
          total: amount,
          details: [{ label: `Adicional de ${rate}%`, value: amount }],
          note: "A base de cálculo e o grau dependem da legislação, da perícia e de instrumentos coletivos aplicáveis. Informe a base reconhecida para o seu caso.",
        };
        break;
      }
      case "periculosidade": {
        const base = number("base");
        if (!Number.isFinite(base) || base <= 0) {
          setError("Informe uma base salarial válida.");
          return;
        }
        const amount = base * 0.3;
        result = {
          label: "Adicional mensal bruto estimado",
          total: amount,
          details: [{ label: "Adicional de 30%", value: amount }],
          note: "Estimativa de 30% sobre o salário-base informado. A caracterização do risco e a base podem depender da atividade e das regras aplicáveis.",
        };
        break;
      }
      case "decimo-terceiro": {
        const salary = number("salary");
        const months = number("months");
        if (![salary, months].every(Number.isFinite) || months < 1 || months > 12) {
          setError("Informe valores válidos; os meses devem estar entre 1 e 12.");
          return;
        }
        const amount = (salary * months) / 12;
        result = {
          label: "13º salário bruto proporcional estimado",
          total: amount,
          details: [{ label: `${months}/12 do salário`, value: amount }],
          note: "Cada mês com pelo menos 15 dias de trabalho conta como mês integral. Não inclui médias variáveis, adiantamentos ou descontos.",
        };
        break;
      }
      case "rescisao": {
        const salary = number("salary");
        const workedDays = number("worked-days");
        const thirteenthMonths = number("thirteenth-months");
        const vacationMonths = number("vacation-months");
        const overduePeriods = number("overdue-periods");
        const noticeDays = number("notice-days");
        const fgtsBalance = number("fgts-balance");
        const terminationType = values["termination-type"];
        if (
          ![salary, workedDays, thirteenthMonths, vacationMonths, overduePeriods, noticeDays, fgtsBalance].every(Number.isFinite)
          || salary <= 0 || workedDays < 1 || workedDays > 30
          || thirteenthMonths < 0 || thirteenthMonths > 12
          || vacationMonths < 0 || vacationMonths > 12
          || overduePeriods < 0 || noticeDays < 0 || noticeDays > 90
          || fgtsBalance < 0
          || !["dismissal", "agreement", "resignation"].includes(terminationType)
        ) {
          setError("Confira os valores informados para calcular a estimativa.");
          return;
        }
        const balanceSalary = (salary * workedDays) / 30;
        const thirteenth = (salary * thirteenthMonths) / 12;
        const proportionalVacation = (salary * vacationMonths) / 12;
        const overdueVacation = salary * overduePeriods;
        const noticePay = (salary * noticeDays) / 30;
        const fgtsFineRate =
          terminationType === "dismissal" ? 0.4 : terminationType === "agreement" ? 0.2 : 0;
        const fgtsFine = fgtsBalance * fgtsFineRate;
        const details = [
          { label: "Saldo de salário", value: balanceSalary },
          { label: "13º proporcional", value: thirteenth },
          { label: "Férias proporcionais + 1/3", value: proportionalVacation * (4 / 3) },
          { label: "Férias vencidas + 1/3", value: overdueVacation * (4 / 3) },
          { label: "Aviso-prévio indenizado informado", value: noticePay },
          { label: `Multa estimada do FGTS (${fgtsFineRate * 100}%)`, value: fgtsFine },
        ];
        result = {
          label: "Total bruto estimado das verbas informadas",
          total: details.reduce((sum, item) => sum + item.value, 0),
          details,
          note: "Estimativa simplificada: não calcula descontos, médias variáveis, aviso-prévio devido, projeções no tempo de serviço ou particularidades contratuais. A multa do FGTS foi calculada sobre o saldo informado e não é valor pago diretamente na rescisão.",
        };
        break;
      }
    }
    setEstimate(result);
  }

  const field = (props: Omit<FieldProps, "value" | "onChange"> & { name: string }) => (
    <NumberField
      {...props}
      value={values[props.name] ?? ""}
      onChange={(value) => update(props.name, value)}
    />
  );

  return (
    <form className={styles.form} onSubmit={calculate}>
      {calculatorId === "adicional-noturno" && (
        <>
          {field({ id: "salary", name: "salary", label: "Salário mensal bruto (R$)" })}
          {field({
            id: "monthly-hours",
            name: "monthly-hours",
            label: "Carga horária mensal contratual",
            min: 1,
            step: 1,
            hint: "Ex.: 220 horas mensais para jornada de 44 horas semanais.",
          })}
          {field({
            id: "night-hours",
            name: "night-hours",
            label: "Horas efetivamente trabalhadas entre 22h e 5h no mês",
            min: 0,
            hint: "Informe horas de relógio, antes da conversão da hora noturna reduzida.",
          })}
        </>
      )}

      {calculatorId === "ferias-proporcionais" && (
        <>
          {field({ id: "salary", name: "salary", label: "Salário bruto mensal (R$)" })}
          {field({
            id: "months",
            name: "months",
            label: "Meses elegíveis no período aquisitivo",
            min: 1,
            max: 12,
            step: 1,
            hint: "Conte cada mês com pelo menos 15 dias trabalhados.",
          })}
        </>
      )}

      {calculatorId === "insalubridade" && (
        <>
          {field({
            id: "base",
            name: "base",
            label: "Base de cálculo definida para o seu caso (R$)",
            hint: "Pode ser o salário mínimo ou outra base prevista em norma ou acordo aplicável.",
          })}
          <SelectField
            id="rate"
            label="Grau de insalubridade reconhecido"
            value={values.rate ?? ""}
            onChange={(value) => update("rate", value)}
            options={[
              { value: "10", label: "Mínimo — 10%" },
              { value: "20", label: "Médio — 20%" },
              { value: "40", label: "Máximo — 40%" },
            ]}
          />
        </>
      )}

      {calculatorId === "periculosidade" && (
        <>
          {field({
            id: "base",
            name: "base",
            label: "Salário-base mensal (R$)",
            hint: "Informe a base salarial considerada para o adicional, sem somar o próprio adicional.",
          })}
        </>
      )}

      {calculatorId === "decimo-terceiro" && (
        <>
          {field({ id: "salary", name: "salary", label: "Salário bruto mensal (R$)" })}
          {field({
            id: "months",
            name: "months",
            label: "Meses elegíveis no ano",
            min: 1,
            max: 12,
            step: 1,
            hint: "Conte cada mês com pelo menos 15 dias trabalhados.",
          })}
        </>
      )}

      {calculatorId === "rescisao" && (
        <>
          {field({ id: "salary", name: "salary", label: "Salário bruto mensal (R$)" })}
          <SelectField
            id="termination-type"
            label="Tipo de desligamento"
            value={values["termination-type"] ?? ""}
            onChange={(value) => update("termination-type", value)}
            options={[
              { value: "dismissal", label: "Dispensa sem justa causa" },
              { value: "agreement", label: "Rescisão por acordo" },
              { value: "resignation", label: "Pedido de demissão" },
            ]}
          />
          {field({
            id: "worked-days",
            name: "worked-days",
            label: "Dias trabalhados no mês da saída",
            min: 1,
            max: 30,
            step: 1,
          })}
          {field({
            id: "thirteenth-months",
            name: "thirteenth-months",
            label: "Meses elegíveis para o 13º no ano",
            min: 0,
            max: 12,
            step: 1,
            hint: "Conte cada mês com pelo menos 15 dias trabalhados, incluindo eventual projeção aplicável.",
          })}
          {field({
            id: "vacation-months",
            name: "vacation-months",
            label: "Meses elegíveis de férias proporcionais",
            min: 0,
            max: 12,
            step: 1,
            hint: "Meses do período aquisitivo atual; cada mês deve ter pelo menos 15 dias.",
          })}
          {field({
            id: "overdue-periods",
            name: "overdue-periods",
            label: "Períodos completos de férias vencidas não gozadas",
            min: 0,
            step: 1,
          })}
          {field({
            id: "notice-days",
            name: "notice-days",
            label: "Dias de aviso-prévio indenizado a receber",
            min: 0,
            max: 90,
            step: 1,
            hint: "Informe 0 se não houver aviso indenizado a receber.",
          })}
          {field({
            id: "fgts-balance",
            name: "fgts-balance",
            label: "Saldo do FGTS para estimar a multa (R$)",
            min: 0,
            hint: "Informe o saldo usado para cálculo da multa rescisória; a multa não é paga diretamente na rescisão.",
          })}
        </>
      )}

      <p className={styles.hint}>
        Resultado bruto estimado. Confira seu contrato, demonstrativos e convenção coletiva; esta ferramenta não substitui orientação profissional.
      </p>
      <button className={styles.button} type="submit">Calcular estimativa</button>

      {error && <p className={styles.error} role="alert">{error}</p>}
      {estimate && (
        <div className={styles.result} aria-live="polite">
          <p className={styles.resultLabel}>{estimate.label}</p>
          <p className={styles.resultValue}>{currency.format(estimate.total)}</p>
          <ul className={styles.breakdown}>
            {estimate.details.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <span>{currency.format(item.value)}</span>
              </li>
            ))}
          </ul>
          <p className={styles.resultHint}>{estimate.note}</p>
        </div>
      )}
    </form>
  );
}
